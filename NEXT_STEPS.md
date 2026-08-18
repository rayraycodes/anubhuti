# Anubhuti — Next Steps

Reviewed: 2026-08-18

Anubhuti is a live, source-linked youth-opportunity marketing site. The immediate priority is
data trust and conversion readiness, followed by a deliberate decision about whether to build
the deferred platform experience.

## Current baseline

- Production site: <https://reganmaharjan.com.np/anubhuti/>
- Source: Vite + React 18 + TypeScript, CSS Modules, Vitest
- Typecheck passes.
- `npm test` passes: 1 test file, 14 tests.
- `npm run build` passes: Vite production bundle generated successfully.
- `npm run data:check` currently reports 1 link issue and 1 expired deadline.
- The local dependency installation had incomplete macOS optional binaries for Rollup, Rolldown,
  and esbuild. The install was repaired in `node_modules` without changing the lockfile or source.
- `data-health-report.md` is current as of 2026-08-16; it records 1 link issue and 1 expired deadline.
- A daily improvement loop is scheduled for 09:00 America/New_York; it selects one bounded step,
  updates this plan and the brain, checks Notion, and records blockers.
- GitHub access is working: `gh` is authenticated as `rayraycodes`, the SSH remote responds, and
  the account has `ADMIN` permission on `rayraycodes/anubhuti`.

## Priority 0 — Restore a trustworthy baseline

1. Recheck the two data-health findings.
   - Verify the National Youth Conference URL and replace it only with a confirmed canonical URL,
     or mark the opportunity unavailable with a source note.
   - Confirm the Glocal Teen Hero deadline and update its status/deadline from an authoritative
     source. Do not extend or invent a date. **Completed 2026-08-17:** the official 2026 site is
     live and updated, but does not publish a verifiable deadline; the stale `2026-07-25` value
     was removed and the opportunity now has a null deadline. `npm run data:check` reports 0
     expired deadlines.
   - Refresh `data-health-report.md` again after either finding is resolved.

## Priority 1 — Make the current product shippable

3. Replace `PROJECT_FORM_URL` in `src/data/projects.ts` with the real Google Form URL, then test
   both “Post a project” and “Express interest” from the Projects page.
4. Audit every external CTA and opportunity link for a visible, accessible failure state. A dead
   source should not look like a valid application path.
5. Run a focused accessibility pass across Landing, Browse, Projects, About, and Circle:
   keyboard-only navigation, focus order, dialog escape/focus return, headings, link names,
   contrast, 320px reflow, and screen-reader announcements for filters/result counts.
6. Verify the GitHub Pages deployment path and deep-link behaviour. Decide whether the current
   in-page router is sufficient or whether the hosting strategy should change before adding more
   routes.

## Priority 2 — Decide the product boundary

7. Choose one of two explicit paths:

   - **Marketing-first:** keep the current site focused on discovery and route platform CTAs to a
     documented waitlist or interest form.
   - **Platform build:** define the smallest vertical slice for accounts, opportunity submission,
     moderation, saved opportunities, and a real backend before implementing the deferred platform
     kit.

   Document the decision in the Anubhuti project page and update the README scope notes.

## Priority 3 — Improve the data operating model

8. Keep the weekly health check as the gate for stale links and deadlines. Enable the GitHub
   Actions permission required for the refresh workflow to open/update pull requests, if the
   free Gemini refresh is still desired.
9. Add a small review checklist to data changes: source URL, retrieved date, deadline evidence,
   eligibility, status, and reviewer decision. AI may propose changes; it must not auto-merge them.
10. Add a small regression fixture set for filtering, sorting, rolling deadlines, closed items,
    and user-posted opportunities.

## Suggested next session

Start with Priority 0. Resolve the two data-health findings, then replace the project-form
placeholder and run the focused accessibility pass.

## Decisions needed from Regan

- What is the real Google Form URL for project submissions?
- Should Anubhuti remain marketing/discovery-first for now, or should we scope the platform slice?
- Should a temporarily unavailable opportunity remain visible with an explanation, or be hidden
  until its source is confirmed?
- Keep the daily loop conservative when pushing: commit only focused, checked changes; never
  force-push or merge automatically.

Source: repository README, package scripts, source scan, and checks run on 2026-08-16.

## Latest loop result — 2026-08-17

- Completed: rechecked the official Glocal Teen Hero 2026 site and removed the unverifiable,
  expired `2026-07-25` deadline from `src/data/opportunities.json`; refreshed
  `data-health-report.md`.
- Checks: `npm run data:check` passed with one NYCA HTTP 500 link and zero expired deadlines;
  `npm test` passed (14/14), `npm run typecheck` passed, and `npm run build` passed. Vitest
  emitted only existing Vite deprecation warnings.
- GitHub: issue #6 remains open for the single NYCA source failure; `main` was up to date before
  this run. Branch protection is not configured; GitHub Project listing is blocked by the token's
  missing `read:project` scope.
- Notion: update unavailable in this environment; the local plan and brain remain authoritative.
- Next granular task: verify the NYCA canonical article or mark the opportunity unavailable with a
  source note, without replacing it based only on a parent navigation link.

## Previous loop result — 2026-08-16

- Completed: repaired incomplete optional macOS native dependencies for Rollup, Rolldown, and
  esbuild in `node_modules` without changing `package-lock.json` or source files.
- Checks: `npm test` passed (14/14), `npm run typecheck` passed, `npm run build` passed, and
  `npm run data:check` found one HTTP 500 source and one expired deadline.
- GitHub: authenticated as `rayraycodes`; no source commit was needed for the dependency repair.
- Next granular task: verify the National Youth Conference source and the Glocal Teen Hero deadline
  from authoritative sources before changing opportunity data.

## Latest loop result — 2026-08-18

- Blocked: the exact NYCA conference article still returns HTTP 500, while the official
  `https://www.nyca.net.np/` homepage returns HTTP 200. No authoritative canonical conference
  article or current availability was published on the homepage, so the source URL was not
  replaced and the opportunity was not marked unavailable without a source note.
- Completed safe slice: refreshed `data-health-report.md` and verified the current findings.
- Checks: `npm run data:check` reports one NYCA HTTP 500 and zero expired deadlines; `npm test`
  passed (14/14); `npm run typecheck` passed; `npm run build` passed. Existing Vite deprecation
  warnings only.
- GitHub: issue #6 remains open; the finding was rechecked on 2026-08-18. Branch protection is
  not configured; GitHub Project listing remains blocked by the token's missing `read:project`
  scope.
- Notion: update unavailable in this environment; local Markdown remains authoritative.
- Next granular task: obtain an authoritative NYCA canonical article/availability decision, or
  proceed with the next safe Priority 1 accessibility audit slice.
