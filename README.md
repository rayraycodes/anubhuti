# Anubhuti — Marketing site

The marketing front of **Anubhuti** (अनुभूति — *"to realise, to feel deeply"*), a youth
opportunity platform for Nepal. This is a production implementation of the
`ui_kits/marketing/index.html` design from the **Anubhuti Design System** handoff
(Claude Design), built as a real React app.

It renders two pages with in-page navigation, exactly as the source prototype does:

- **Landing** — hero + search, category row, deadline feed & live-projects marketplace,
  the four-move model, stats & partners, and a CTA band.
- **About** — story hero, vision band, the problem, the four-move approach, values, and a CTA.

## Stack

- **Vite** + **React 18** + **TypeScript** (strict)
- **CSS Modules** per component/page, driven entirely by the design-system tokens
- **lucide-react** (pinned to `0.379.0` to match the design system's icon set — later
  Lucide releases dropped the brand/social glyphs the footer uses)

## Getting started

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # type-check only
```

## Project structure

```
src/
  main.tsx                # React entry
  App.tsx                 # in-page nav: switches Landing ↔ About
  types.ts                # NavTarget / OnNav
  styles/
    global.css            # token @imports + base/reset + .container
    tokens/               # colors, typography, fonts, spacing, effects (verbatim from the DS)
  components/             # Button, Badge, Eyebrow, Nav, Footer, OppCard, Icon
  pages/                  # Landing, About (+ .module.css each)
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

- This build covers the **marketing kit only** (Landing + About), per the requested
  `ui_kits/marketing/index.html`. The separate **platform / Browse** kit
  (`ui_kits/platform/`) is **not** included.
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
