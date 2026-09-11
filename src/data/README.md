# Curated data layer

Every recommendation the app makes is assembled from these files. Nothing is
fetched from a live API. See `ProjectInstructions.md` (repo root, git-ignored)
for the reasoning.

Refresh cadence: update `builds.json` by hand whenever a major CPU/GPU
generation launches.

## Files

### `games.json` — selectable games
```
{ "id": "cyberpunk-2077", "name": "Cyberpunk 2077", "tag": "RT heavy", "load": 1.9, "poster": "https://..." }
```
`load` is a relative GPU-cost multiplier. Higher = harder to run. Used by the
FPS estimator: `estFps = build.score * resolution.factor / game.load`.

`poster` is optional — a real cover-art URL (Steam's `library_600x900.jpg`
CDN asset, verified to resolve before adding). Omit it for a title with no
official art we can hotlink (not on Steam, or unreleased); `GamesStep`
falls back to a plain matte tile with the name and tag. When adding a new
game, look up its Steam app id and use
`https://cdn.akamai.steamstatic.com/steam/apps/<appid>/library_600x900.jpg`
— check the URL actually resolves to an image before committing it.

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
