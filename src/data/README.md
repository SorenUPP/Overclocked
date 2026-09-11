# Curated data layer

Every recommendation the app makes is assembled from these files. Nothing is
fetched from a live API. See `ProjectInstructions.md` (repo root, git-ignored)
for the reasoning.

Refresh cadence: update `builds.json` by hand whenever a major CPU/GPU
generation launches.

**Prices drift — check them against real listings periodically, not just
once.** As of 2026-09-11 every price in `builds.json` and `components.json`
was corrected using a per-category multiplier (`CPU` 1.15, `GPU` 1.40,
`Motherboard` 1.35, `Memory` 1.55, `Storage` 1.85, `Power Supply` 1.15,
`Case` 1.10) applied to the pre-currency-conversion USD baseline, calibrated
against one real EU listing per category (Geizhals/Amazon.de/Mindfactory).
Memory and Storage got the biggest correction because of a 2026 DRAM/NAND
price shock — those two are the most likely to drift out of date again and
worth re-checking first. Tier `budget`/`budgetLabel` values were rebalanced
to sit just above each tier's actual parts total (so the "budget note" isn't
constantly flagging every build as over) — if you touch part prices again,
recheck these too, not just the individual parts.

## Files

### `games.json` — selectable games
```
{ "id": "cyberpunk-2077", "name": "Cyberpunk 2077", "tag": "RT heavy", "load": 1.9, "poster": "https://..." }
```
`load` is a relative GPU-cost multiplier. Higher = harder to run. Used by the
FPS estimator: `estFps = build.score * resolution.factor / game.load`.

`poster` is optional, and comes from one of three sources depending on what
the title actually has, in order of preference:
1. **Steam cover art** — `https://cdn.akamai.steamstatic.com/steam/apps/<appid>/library_600x900.jpg`.
   Covers most titles. Verify the URL resolves to an image before committing it.
2. **First-party publisher art**, for a title with no Steam page (unreleased,
   or platform-exclusive) — a hero/key-art image hosted on the game's own
   official site (e.g. Rockstar's or CD Projekt Red's own domain). These URLs
   are often build-hashed Next.js asset paths and **can break on the
   publisher's next site redeploy** — `GameArt` in `GamesStep.js` catches the
   image `onError` and falls back gracefully, but expect to have to re-find
   these occasionally.
3. **A free-licensed wordmark from Wikimedia Commons**, for live-service /
   launcher-exclusive titles with no cover art at all (Fortnite, Minecraft,
   Valorant, League of Legends). URL ends in `.svg` — `GamesStep` detects
   that and renders it centered on a plain tile instead of full-bleed,
   inverted to solid white by default for the monochrome palette. Add
   `"posterNativeColor": true` on the game if the mark relies on two colours
   for shading/legibility (Minecraft's blocky lettering) — inverting a
   single flat colour to white works, but crushes a two-tone mark into an
   illegible blob, so those keep their real colours instead.

**Do not hotlink a Wikipedia article's own game-cover-art image** — those are
almost always uploaded under a non-free/fair-use rationale for Wikipedia's
own editorial use (`/wikipedia/en/...` in the URL, not `/wikipedia/commons/`),
and reusing them elsewhere isn't covered by that license. Only pull from
`commons.wikimedia.org` (or check the file's own page confirms a free
license), and prefer options 1 or 2 above when they exist.

Omit `poster` entirely for a title with no defensible source under any of
the above; `GamesStep` falls back to a plain matte tile with just the name
and tag.

### `resolutions.json` — resolution options
```
{ "id": "1440p", "pixels": "2560 × 1440", "factor": 0.72, "desc": "..." }
```
`factor` scales the performance budget. 1080p = 1.0, higher res = lower factor.

### `fps-targets.json` — frame-rate target options
```
{ "value": 144, "label": "144", "tag": "high refresh" }
```

### `preferences.json` — optional constraint toggles
```
{ "id": "amd_cpu", "label": "AMD CPU", "tag": "platform" }
```

### `builds.json` — the curated builds (one per budget tier)
```
{
  "id": "core-07",
  "code": "CORE-07",
  "budget": 1032,
  "budgetLabel": "€1,032",
  "tierTag": "sweet spot",
  "tierName": "Sweet-spot tier",
  "name": "Core 1440p·144",
  "blurb": "...",
  "score": 290,                 // performance budget for the FPS estimator
  "parts": [
    {
      "category": "CPU",
      "brand": "AMD",
      "name": "Ryzen 7 7700",
      "specs": "8C/16T · 5.3 GHz boost · AM5 · 65 W",
      "price": 206,             // EUR reference price, not a live quote
      "why": "...",             // shown in the "Why this part?" expander
      "perfImpact": "Moderate"  // Primary | High | Moderate | Low | Support | Thermal
    }
  ]
}
```
Parts are ordered CPU, GPU, Motherboard, Memory, Storage, Power Supply, Case.
The compatibility checks in `src/lib/recommend.js` assume that order.

### `site-stats.json` — headline numbers shown on the marketing pages
```
{ "indexRev": "2026.09", "curatedBuilds": 42, "trackedComponents": 318, ... }
```
