#!/usr/bin/env node
/**
 * AI-assisted opportunity refresh (opt-in).
 *
 * Uses the Anthropic API (Claude + web search) to re-verify the current
 * opportunities and propose an updated list, then writes opportunities.json.
 * The GitHub workflow runs this only when ANTHROPIC_API_KEY is set, and opens a
 * PR for human review — nothing reaches the live site without a merge.
 *
 * Requires: @anthropic-ai/sdk (the workflow installs it), ANTHROPIC_API_KEY.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-4-8'; // swap to 'claude-sonnet-4-6' to cut cost if you prefer
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

const SYSTEM = `You curate a list of REAL, verifiable opportunities for Nepali youth for the Anubhuti platform. Use web search to verify links and deadlines. Never invent programs, organisations, URLs, or specific deadlines. Today is ${today}.`;

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

Return ONLY the final JSON array — start your reply with [ and end with ]. No prose, no markdown fences.`;

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

async function run() {
  const client = new Anthropic();
  let messages = [{ role: 'user', content: USER }];
  let response;

  // Server-side web search runs a loop; resume on pause_turn.
  for (let i = 0; i < 6; i++) {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: SYSTEM,
      tools: [{ type: 'web_search_20260209', name: 'web_search' }],
      messages,
    });
    if (response.stop_reason === 'refusal') throw new Error('Model refused the request');
    if (response.stop_reason !== 'pause_turn') break;
    messages = [...messages, { role: 'assistant', content: response.content }];
  }

  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n');

  const refreshed = validate(extractJsonArray(text));
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
