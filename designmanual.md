# Design Manual — UI/UX Review

Reviewed by reading the live source (components, data, and the recommender
logic), not just the rendered page — so every finding is traceable to an
exact file and, where relevant, a number that can be checked against the
data itself. Two passes so far; iteration 1's fixes are folded in below
rather than kept as a separate history — see git log for the exact diffs.

> **Note:** step 1 of this task ("read aibehaviormanual before coding")
> could not be completed — no file by that name exists anywhere in this
> repo or on the machine. Proceeding under the repo's own conventions
> (recent commit history, `Instructions.md`) in its place.

## Fixed in iteration 1

1. **"48 curated builds" claimed, 5 shipped.** `siteStats.curatedBuilds` was
   a hardcoded, stale JSON number, falsifiable in one click to `/builds`.
   Now derived from `builds.length`, the same pattern `trackedComponents`
   already used.
2. **Deselecting every game silently substituted 4 unrelated default
   titles**, with no warning — `toQuery()` drops the `games` param when
   empty, so the result page's `parseSelection()` backfilled its own
   defaults, undetected. The wizard now blocks "Continue"/"See the build"
   whenever zero games are selected, with an inline explanation.
3. **`textFaint` / `textGhost` measured ~3.85:1 and ~2.27:1 contrast**
   against `bg`, both under WCAG AA's 4.5:1 for normal text, on copy used
   throughout the site (footer disclaimers, spec text, tags). Both bumped
   to pass 4.5:1.

## Fixed in iteration 2

**4. Defaults were indistinguishable from deliberate picks.**
Games and Preferences both start pre-populated by the app (4 games,
`nvidia`+`wifi`), and nothing marked a step as "still the starting default."
Combined with finding #2 above, someone could open `/build`, skip straight
to Budget via the step chips, and ship a build based on 4 games they never
looked at. The wizard now tracks which steps the user has actually
interacted with and shows a small warning dot on the step chip plus an
inline note on the step itself until it's touched.

**5. `siteStats.compatibilityRules` (88) never matched anything a visitor
could check.** The Hero's lead paragraph cited "88 compatibility rules," but
every build result only ever surfaces 6 fixed checks
(`compatibilityChecks()` in `recommend.js`) — 88 wasn't 6, wasn't 6 × the
build count, and wasn't documented anywhere as meaning something else. It
had exactly the same shape as finding #1: an unverifiable trust number.
Now derived as `CHECKS_PER_BUILD × builds.length` (30, currently) from the
same source the result page's checks come from, so the two can never
diverge again.

## Open findings (not yet fixed)

**Medium — no real product photography.** Component and build imagery is
still a monochrome generated glyph per category, not an actual photo. Well
documented in `PartImage.js` as a sourcing limitation (manufacturer sites
don't render for a fetch; free image archives only cover flagship SKUs),
so this is a data-acquisition problem, not a quick code fix — kept low
priority for that reason, but still the most visually "unfinished" part of
the site next to real product listings.

**Low — "Check price ↗" always opens a generic Google search.**
Reasonable given there's no live pricing feed (and it's transparent about
why, per the comment in `retailer.js`), but a single named, consistent
destination — a price-comparison search rather than a bare web search —
would read as more deliberate and less like a placeholder link.

**Low — `preferences.json`'s "optional, default off" framing doesn't match
its actual default.** `PreferencesStep`'s copy says "Leave them off for the
balanced default," but `DEFAULT_SELECTION.prefs` in `build-params.js` ships
with `nvidia` and `wifi` pre-checked, not empty. Minor, but worth aligning
copy and default state so "off" and "default" mean the same thing.
