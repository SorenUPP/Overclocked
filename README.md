# Overclocked

A PC build recommendation tool. The user gives a budget, the games they want to
play, and a target FPS. The app returns a full PC build (components + reference
pricing) that hits that target.

No live AI and no paid APIs. Recommendations come from a small hand-curated
dataset and deterministic rules.

## Stack

- **Frontend:** Next.js (App Router), styled-components
- **Backend:** Node.js (Next.js server), Firebase (Firestore)
- **Data layer:** curated JSON in `src/data` — see `src/data/README.md`

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional — fill in Firebase values
npm run dev
```

Open http://localhost:3000.

## Screens

| Route | What it is |
|---|---|
| `/` | Marketing home — hero, value props, the "curated not combinatorial" principle |
| `/build` | Five-step wizard: games, resolution, FPS target, budget, preferences |
| `/build/result` | The matched build — parts, per-game FPS estimates, budget split, compatibility, tier comparison |

The full requirement set lives in the `/build/result` query string, so a build
is shareable with no account.

## Project layout

```
src/
  app/                  Next.js routes (App Router)
  components/
    layout/             Header, Footer
    ui/                 Button, primitives (Container, Mono, Panel, Hatch…)
    home/               home page sections
    build/              wizard + step components
    result/             result page sections
  data/                 curated JSON dataset + schema docs (src/data/README.md)
  lib/
    recommend.js        the deterministic matcher + FPS estimator
    build-params.js     URL <-> selection state
    data.js             single import point for the dataset
    firebase/           client + admin SDK setup (not yet wired to a feature)
    registry.js         styled-components SSR registry
  styles/               theme + global styles
```

## How the recommendation works

`src/lib/recommend.js` is pure and deterministic:

- Each build carries a `score` (a performance budget). Each game carries a
  `load` multiplier and each resolution a `factor`.
- `estFps = build.score * resolution.factor / game.load`, rounded to even.
- The budget picks the build tier directly; compatibility checks and the budget
  split are derived from that build's part list.

No combinatorial search, no live pricing, no benchmark API.
