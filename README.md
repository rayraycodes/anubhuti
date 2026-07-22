# Anubhuti — Marketing site

The marketing front of **Anubhuti** (अनुभूति — *"to realise, to feel deeply"*), a youth
opportunity platform for Nepal. This is a production implementation of the
`ui_kits/marketing/index.html` design from the **Anubhuti Design System** handoff
(Claude Design), built as a real React app.

It renders five pages with in-page navigation; the active nav tab is highlighted
(`aria-current="page"`):

- **Landing** (`home`) — hero with a working search (query + region), real category
  tiles, the open-opportunities feed, the four-move model, derived stats & partners.
- **Opportunities** (`browse`) — the explorer: live text search, region filter, category
  chips, a result count, and an apply-at-source detail dialog.
- **Projects** (`projects`) — the project marketplace: sample projects with status, skill
  tags, location and deadlines, plus a "post a project" CTA.
- **About** (`about`) — story hero, vision band, the gaps we want to close, the four-move
  approach, values, and a CTA.
- **Circle** (`circle`) — the partner network (Rotary, Rotaract, Leo, Lions, Toastmasters,
  OLE Nepal), derived figures, the diaspora-mentor band, a free+fast viral community playbook
  (14-day sprint, referral rewards, growth loop, weekly metrics), and a CTA.

The Landing + About pages mirror the design system's `Landing.jsx` / `About.jsx`; the
Opportunities, Projects and Circle pages extend the kit using the same DS primitives.

## Data & interactivity

- **Real opportunities.** `src/data/opportunities.ts` holds ~22 real, source-linked
  programs relevant to Nepali youth (Teach For Nepal, Daayitwa, Fulbright/USEF, Chevening,
  Kathmandu/Tribhuvan University, Hult Prize Nepal, DeerHack, Glocal, VIN, UNDP, …).
  Deadlines are the real dates where known, else `null` (rolling/annual) — never invented.
  Days-left, "Rolling" and "Closed" are computed at runtime from the real date.
- **Search & filter.** `filterOpportunities` / `sortByDeadline` power the explorer and the
  Landing feed; the hero search and category tiles deep-link into the explorer with filters
  pre-applied.
- **Post an opportunity.** The post dialog adds an opportunity to the list (shown with a
  *Posted* badge) and persists it to `localStorage` — no backend required.
- **Honest numbers.** Headline stats and category counts are derived from the data, not
  hard-coded vanity figures.
- **Projects.** `src/data/projects.ts` holds the sample marketplace projects; clicking one
  opens a detail dialog. **Submitting a project** (and "Express interest") opens a Google
  Form — set the link in `PROJECT_FORM_URL` (currently a placeholder to replace).

## Stack

- **Vite** + **React 18** + **TypeScript** (strict)
- **CSS Modules** per component/page, driven entirely by the design-system tokens
- **lucide-react** (pinned to `0.379.0` to match the design system's icon set — later
  Lucide releases dropped the brand/social glyphs the footer uses)

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173/anubhuti/)
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # type-check only
npm test           # run the Vitest unit tests (data helpers)
npm run data:check # check opportunity links + flag expired deadlines
npm run deploy     # build + publish dist/ to gh-pages (manual fallback; CI does this)
```

## Deployment

Live at **https://reganmaharjan.com.np/anubhuti/** via GitHub Pages.

- Hosted as a **project site** of `rayraycodes/anubhuti`, served under the custom
  domain configured on the user's `rayraycodes.github.io` site — so it lives at the
  `/anubhuti/` subpath and `vite.config.ts` sets `base: '/anubhuti/'` accordingly.
- `main` holds the source; the **`Deploy` GitHub Action** builds, tests and pushes
  `dist/` to the **`gh-pages`** branch (the Pages source) on every push to `main`.
  A `public/.nojekyll` file ships in the build so Pages serves Vite's output verbatim.
- The custom domain is inherited from the user site, so this repo intentionally has
  **no `CNAME` file**.

**To ship an update: just push to `main`** — it auto-deploys. (`npm run deploy` is a
manual fallback if you ever need to publish without CI.)

## Automation (GitHub Actions)

Three workflows in `.github/workflows/`:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `deploy.yml` | push to `main`, manual | `npm ci` → test → build → publish to `gh-pages` |
| `ci.yml` | pull requests, feature branches | type-check + test + build (no deploy) |
| `data-upkeep.yml` | weekly (Mon 06:00 UTC), manual | data freshness — see below |

**Data upkeep** keeps the opportunities honest as deadlines pass and links rot:

- **Health-check** (`scripts/check-opportunities.mjs`) verifies every opportunity URL
  resolves and flags expired deadlines, then opens/updates a single GitHub issue
  labelled `data-health`. It never edits data — it just tells you what's stale.
- **AI refresh** (`scripts/refresh-opportunities.mjs`) is **opt-in and free**: it runs only
  if a `GEMINI_API_KEY` repo secret is set. It asks **Google Gemini** (free tier, with web
  search grounding so it verifies real programs) to re-verify the list and opens a **pull
  request** for review — it never auto-merges and never fabricates data into production. To
  enable: grab a free key at <https://aistudio.google.com/apikey> (no billing) and add it
  under *Settings → Secrets and variables → Actions*. A weekly run sits comfortably inside
  the free quota, and the script uses the REST API + built-in `fetch` (no dependency).

## Project structure

```
src/
  main.tsx                # React entry
  App.tsx                 # in-page router + posted-opportunity state + modals
  app-actions.ts          # AppActions (onNav / goBrowse / openDetail / openPost)
  types.ts                # NavTarget / Page / OnNav
  data/                   # opportunities.ts (real data + helpers), partners.ts
  styles/
    global.css            # token @imports + base/reset + .container
    tokens/               # colors, typography, fonts, spacing, effects (verbatim from the DS)
  components/             # Button, Badge, Eyebrow, Nav, Footer, Icon, OppCard,
                          #   OpportunityCard, Modal, OpportunityModal, PostOpportunityModal
  pages/                  # Landing, Browse, Projects, About, Circle (+ .module.css each)
  assets/                 # brand SVGs (hero, ridgeline, prayer flags, wordmarks)
public/
  favicon.svg            # Anubhuti logo mark
```

## Design fidelity & tokens

All colour, type, spacing, radius, shadow and motion values come from the design-system
token files under `src/styles/tokens/` (copied verbatim from the handoff) and are referenced
as CSS custom properties — no values are hard-coded. Fonts (Bricolage Grotesque, Mukta,
Space Mono) load from the Google Fonts CDN, matching the design system.

The components under `src/components/` are faithful recreations of the design system's
marketing primitives (the prototype's `Shared.jsx`), and the two pages mirror `Landing.jsx`
and `About.jsx`.

## Scope notes

- This build covers the **marketing kit** (Landing, Projects, About, Circle). The
  separate **platform / Browse** kit (`ui_kits/platform/`) is **not** included.
- CTAs that the prototype routes to the platform kit ("Sign in", "Post an opportunity",
  "Explore", "Get started free", "Become a partner", footer links) are intentionally inert
  here. Wire them to the platform route in `src/App.tsx` (`onNav`, the `'platform'` branch)
  once that kit exists.
- Light responsive behaviour was added (grids collapse on narrow viewports) since the
  prototype was authored at a fixed 1320px desktop viewport; the desktop layout is unchanged.

## Source of truth

The original design handoff lives in `anubhuti-design-system/` (git-ignored). It is the
reference for any future component or token changes — update tokens there and re-copy into
`src/styles/tokens/` to keep them in sync.
