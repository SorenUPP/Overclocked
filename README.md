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
cp .env.local.example .env.local   # fill in Firebase values
npm run dev
```

Open http://localhost:3000.

## Project layout

```
src/
  app/            Next.js routes (App Router)
  components/     shared UI components
  data/           curated JSON dataset + schema docs
  lib/            Firebase clients, data access, styled-components setup
  styles/         theme + global styles
```
