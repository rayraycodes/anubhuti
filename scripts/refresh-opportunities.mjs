#!/usr/bin/env node
/**
 * AI-assisted opportunity refresh (opt-in, FREE).
 *
 * Uses Google's Gemini API (free tier) with Google Search grounding to re-verify
 * the current opportunities and propose an updated list, then writes
 * opportunities.json. The GitHub workflow runs this only when GEMINI_API_KEY is
 * set, and opens a PR for human review — nothing reaches the live site without a
 * merge.
 *
 * Get a free key at https://aistudio.google.com/apikey (no billing required).
 * Uses the REST API + built-in fetch — no npm dependency to install.
 */
import { readFileSync, writeFileSync } from 'node:fs';

// Free-tier models, tried in order — falls back to the second if the first is busy.
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]); // transient — worth retrying
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('GEMINI_API_KEY not set — nothing to do.');
  process.exit(1);
}

const CATEGORIES = [
  'Scholarships',
  'Fellowships',
  'Internships',
  'Competitions',
  'Conferences',
  'Exchange',
  'Workshops',
  'Volunteering',
  'Awards',
];
const REGION_HINT =
  'a real Nepali place (Kathmandu, Lalitpur, Bhaktapur, Pokhara, Chitwan, Biratnagar, Butwal, Nepal) or "Online" or "Global"';

const DATA_URL = new URL('../src/data/opportunities.json', import.meta.url);
const current = JSON.parse(readFileSync(DATA_URL, 'utf8'));
const today = new Date().toISOString().slice(0, 10);

const SYSTEM = `You curate a list of REAL, verifiable opportunities for Nepali youth for the Anubhuti platform. Use Google Search to verify links and deadlines. Never invent programs, organisations, URLs, or specific deadlines. Today is ${today}.`;

const USER = `Here is the current opportunities list (JSON):

${JSON.stringify(current, null, 2)}

Refresh it:
- Verify each opportunity still exists; fix any broken "url"; drop ones that no longer exist.
- Update "deadline" to the real upcoming date (YYYY-MM-DD) where you can confirm one; otherwise set it null. Never invent a date. If a program's cycle has clearly closed for good, drop it.
- Add a few new, real, currently-relevant opportunities for Nepali youth if you find them.
- Keep roughly 20-26 items with a good spread across categories.

Each item must have EXACTLY these fields:
- "id": short kebab-case slug (unique)
- "title": string
- "org": string
- "category": one of ${JSON.stringify(CATEGORIES)}
- "region": ${REGION_HINT}
- "funded": boolean
- "deadline": "YYYY-MM-DD" or null
- "url": real official link (https)
- "summary": one concise sentence (max ~18 words)

Return ONLY the final JSON array — start with [ and end with ]. No prose, no markdown fences.`;

function extractJsonArray(text) {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) throw new Error('No JSON array in model output');
  return JSON.parse(text.slice(start, end + 1));
}

function validate(items) {
  if (!Array.isArray(items)) throw new Error('Model output is not an array');
  const seen = new Set();
  const clean = [];
  for (const o of items) {
    if (!o || typeof o !== 'object') continue;
    if (typeof o.title !== 'string' || typeof o.org !== 'string') continue;
    if (!CATEGORIES.includes(o.category)) continue;
    if (typeof o.url !== 'string' || !/^https?:\/\//.test(o.url)) continue;
    if (o.deadline !== null && !/^\d{4}-\d{2}-\d{2}$/.test(o.deadline)) continue;
    let id = typeof o.id === 'string' && o.id ? o.id : o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    while (seen.has(id)) id += '-x';
    seen.add(id);
    clean.push({
      id,
      title: o.title.trim(),
      org: o.org.trim(),
      category: o.category,
      region: typeof o.region === 'string' && o.region ? o.region : 'Nepal',
      funded: Boolean(o.funded),
      deadline: o.deadline ?? null,
      url: o.url.trim(),
      summary: typeof o.summary === 'string' ? o.summary.trim() : '',
    });
  }
  return clean;
}

function buildBody(model) {
  const generationConfig = { temperature: 0.2, maxOutputTokens: 8192 };
  // Gemini 2.5 models "think" by default, which eats the output-token budget and
  // can leave no room for the JSON. Disable it for the extraction task.
  if (model.includes('2.5')) generationConfig.thinkingConfig = { thinkingBudget: 0 };
  return JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents: [{ role: 'user', parts: [{ text: USER }] }],
    tools: [{ google_search: {} }], // web-search grounding
    generationConfig,
  });
}

// Call Gemini, retrying transient errors and falling back across models.
async function generate() {
  let lastErr = 'no attempt made';
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) {
        const wait = 8000 * attempt; // 8s, then 16s
        console.log(`  ${lastErr} — retrying ${model} in ${wait / 1000}s`);
        await sleep(wait);
      }
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: buildBody(model),
      });
      if (res.ok) return res.json();
      lastErr = `${model} HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`;
      if (!RETRY_STATUSES.has(res.status)) break; // non-transient → try the next model
    }
  }
  throw new Error(`Gemini unavailable after retries — ${lastErr}`);
}

async function run() {
  const data = await generate();
  const cand = data.candidates?.[0];
  if (!cand) throw new Error(`No candidate returned (${JSON.stringify(data).slice(0, 300)})`);

  const text = (cand.content?.parts ?? [])
    .map((p) => p.text)
    .filter(Boolean)
    .join('\n');
  if (!text) throw new Error(`Empty model output (finishReason: ${cand.finishReason})`);

  let refreshed;
  try {
    refreshed = validate(extractJsonArray(text));
  } catch (e) {
    // Surface what the model actually returned so failures are diagnosable.
    throw new Error(
      `${e.message} (finishReason: ${cand.finishReason}; output starts: ${JSON.stringify(
        text.slice(0, 220),
      )} … ends: ${JSON.stringify(text.slice(-220))})`,
    );
  }
  if (refreshed.length < 8) {
    throw new Error(`Refusing to write — only ${refreshed.length} valid items parsed (looks wrong)`);
  }

  writeFileSync(DATA_URL, JSON.stringify(refreshed, null, 2) + '\n');
  console.log(`Wrote ${refreshed.length} opportunities (was ${current.length}).`);
}

run().catch((err) => {
  console.error('refresh-opportunities failed:', err.message);
  process.exit(1);
});
