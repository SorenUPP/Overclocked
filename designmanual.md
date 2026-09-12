# Design Manual — UI/UX Review (Iteration 1)

Reviewed by reading the live source (components, data, and the recommender
logic), not just the rendered page — so every finding below is traceable to
an exact file and, where relevant, a number that can be checked against the
data itself.

> **Note:** step 1 of this task ("read aibehaviormanual before coding") could
> not be completed — no file by that name exists anywhere in this repo or on
> the machine. Proceeding with the review under the repo's own conventions
> (see recent commit history and `Instructions.md`) in its place.

## High priority

**1. The homepage claims "48 curated builds" — the site ships 5.**
`src/data/site-stats.json` hardcodes `curatedBuilds: 48`, and both the Hero
kicker ("48 curated builds, updated 2026.09") and `WhyTrust`'s copy ("one of
48 builds a person put together and checked") read straight from it. But
`src/data/builds.json` contains exactly 5 builds, and `/builds` lists exactly
5 cards. This is the single most damaging inconsistency on the site: the
entire pitch is "a short, honestly-sized list, not endless combinations,"
and a visitor can falsify the headline number in one click to `/builds`.
`trackedComponents` already avoids this trap — `src/lib/data.js` recomputes
it from the real catalogue length instead of trusting the static JSON.
`curatedBuilds` needs the same treatment.

**2. Deselecting every game silently swaps in 4 games you never picked, with no warning.**
`GamesStep` lets you uncheck all games — the footer correctly shows "0 games
selected." But `toQuery()` (`src/lib/build-params.js`) only writes a `games`
param when the list is non-empty, so an empty selection produces a URL with
no `games` param at all. `parseSelection()` on the result page then falls
back to `DEFAULT_SELECTION.games` — 4 specific titles (Cyberpunk 2077, CS2,
Fortnite, RDR2) nobody asked for. The user's explicit choice (nothing) is
silently discarded and replaced with an unrelated preset, and the result
page gives no indication this happened. `recommend.js`'s own fallback to
`['cyberpunk-2077']` never even runs in this path, since `parseSelection`
already backfilled 4 games before `recommend()` sees them.

## Medium priority

**3. Several secondary-text colors fail WCAG AA contrast against the matte-black background.**
`theme.colors.textFaint` (`#6C6C74`) measures ≈3.85:1 against `bg` (`#08080A`),
and `textGhost` (`#4A4A52`) measures ≈2.27:1 — both below the 4.5:1 minimum
for normal-size text (WCAG 2.1 SC 1.4.3). These aren't decorative flourishes:
`textGhost` is the footer's "Reference pricing only" / "Benchmark data rev."
line on every page, and `textFaint` covers spec text, group counts, card tags
and stat sublabels sitewide — i.e. a meaningful fraction of the site's small
type is under-contrast for low-vision readers.

**4. Wizard step chips let you jump straight to "See the build" with unconfirmed defaults, and nothing marks a step as still-default.**
The step chips (`Wizard.js`) are freely clickable in any order, and Games /
Preferences both start pre-populated with app-chosen defaults (4 games,
`nvidia`+`wifi`) that look identical to a deliberate pick. Combined with #2,
someone can open `/build`, skip straight to Budget, hit "See the build," and
never notice the result is based on 4 games and 2 preferences they never
actively chose. There's no "default, not yet reviewed" affordance anywhere
in the flow.

**5. `siteStats.compatibilityRules` (88) never appears anywhere a visitor can verify it.**
The Hero's lead paragraph promises "88 compatibility rules," but every build
result only ever shows 6 checks (`compatibilityChecks()` in `recommend.js`
returns a fixed list of 6, regardless of build). Whether 88 means something
real (e.g. distinct rule variants across the whole catalogue) or is another
stale figure like finding #1, the page never explains the gap, so it reads
as one more unverifiable trust number next to one that turned out to be
false.

## Lower priority / polish

- Component and build imagery is still monochrome generated glyphs, not real
  product photos (this was already flagged in the prior UX pass and is
  well-documented in `PartImage.js` as a sourcing limitation, not an
  oversight — kept low priority since it's a data problem, not a code one).
- "Check price ↗" / "Check current price" links all resolve to a generic
  Google search for the part name (`retailer.js`) rather than a specific
  retailer or price-comparison site. Reasonable given no live pricing feed,
  but a named, consistent destination (e.g. a price-comparison search) would
  feel less like a placeholder.

## This iteration's fixes

Implemented, most damaging first:

1. `curatedBuilds` now computed from the real build count (matches the
   `trackedComponents` pattern already in `src/lib/data.js`) instead of a
   stale static number.
2. The wizard now blocks continuing past the Games step with zero games
   selected, with an inline hint — so the silent default-swap in finding #2
   can no longer happen.
3. `textFaint` and `textGhost` bumped to pass 4.5:1 against `bg`.

Findings #4 and #5, and the polish items, are carried forward to the next
iteration.
