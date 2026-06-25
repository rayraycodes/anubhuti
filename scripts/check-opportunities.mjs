#!/usr/bin/env node
/**
 * Opportunity data health-check.
 * - Verifies every opportunity URL still resolves (lenient: bot-blocked but live
 *   servers are treated as OK; only 404/410/5xx and connection failures count).
 * - Flags opportunities whose deadline has passed.
 *
 * Writes a markdown report to stdout + data-health-report.md, and exports
 * `has_findings` / `summary` to $GITHUB_OUTPUT when run in GitHub Actions.
 * Always exits 0 — the workflow decides what to do with the findings.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { appendFileSync } from 'node:fs';

const DATA_URL = new URL('../src/data/opportunities.json', import.meta.url);
const opps = JSON.parse(readFileSync(DATA_URL, 'utf8'));

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const TIMEOUT_MS = 20_000;
// Server responded but is blocking the bot — the link is almost certainly live.
const ALIVE_BUT_BLOCKED = new Set([401, 403, 405, 406, 408, 429, 999]);

async function checkUrl(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: '*/*' },
    });
    if (res.ok || res.status < 400 || ALIVE_BUT_BLOCKED.has(res.status)) {
      return { ok: true, status: res.status };
    }
    return { ok: false, status: res.status, reason: `HTTP ${res.status}` };
  } catch (err) {
    // A timeout means the host is reachable but slow (e.g. Cloudflare-fronted
    // sites) — treat it as alive to avoid false positives. Only genuine
    // connection / DNS / TLS failures count as dead links.
    if (err.name === 'AbortError') return { ok: true, status: 0, reason: 'slow' };
    return { ok: false, status: 0, reason: err.cause?.code || err.message };
  } finally {
    clearTimeout(t);
  }
}

function isExpired(deadline) {
  if (!deadline) return false;
  const end = new Date(deadline + 'T23:59:59');
  if (Number.isNaN(end.getTime())) return false;
  return end.getTime() < Date.now();
}

const linkResults = await Promise.all(
  opps.map(async (o) => ({ o, link: await checkUrl(o.url) })),
);

const deadLinks = linkResults.filter((r) => !r.link.ok);
const expired = opps.filter((o) => isExpired(o.deadline));

const lines = [];
lines.push(`# Opportunity data health — ${new Date().toISOString().slice(0, 10)}`);
lines.push('');
lines.push(
  `Checked **${opps.length}** opportunities · **${deadLinks.length}** link issue(s) · **${expired.length}** expired deadline(s).`,
);
lines.push('');

if (deadLinks.length) {
  lines.push('## 🔗 Links to review');
  lines.push('');
  for (const { o, link } of deadLinks) {
    lines.push(`- **${o.title}** (${o.org}) — ${link.reason} — ${o.url}`);
  }
  lines.push('');
}

if (expired.length) {
  lines.push('## ⏳ Expired deadlines');
  lines.push('');
  for (const o of expired) {
    lines.push(`- **${o.title}** (${o.org}) — deadline \`${o.deadline}\` has passed`);
  }
  lines.push('');
}

if (!deadLinks.length && !expired.length) {
  lines.push('✅ All links resolve and no deadlines have passed.');
  lines.push('');
}

const report = lines.join('\n');
console.log(report);
writeFileSync(new URL('../data-health-report.md', import.meta.url), report);

const hasFindings = deadLinks.length > 0 || expired.length > 0;
const summary = `${deadLinks.length} link issue(s), ${expired.length} expired`;

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `has_findings=${hasFindings}\n`);
  appendFileSync(process.env.GITHUB_OUTPUT, `summary=${summary}\n`);
}
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n');
}

process.exit(0);
