# UX/UI Review — overclocked-sigma.vercel.app (PC Builder)

Reviewed as a senior product designer would review a launch-ready MVP: content, information architecture, copy, trust signals, and interaction patterns. One methodology note up front, since it affects how much weight to put on a couple of these points.

**Method note:** the `/build` wizard and `/build/result` pages are client-rendered in the browser, so a text-based fetch of the page only returns the shared header/footer shell, not the actual form or results content. Everything below about those two pages is inferred from the homepage's embedded example, the `/builds` and `/components` listings, and `/how-it-works`. A full pass with actual screenshots of the wizard steps and result page would likely surface additional layout, spacing, and mobile issues that this review cannot see.

## What's working

- The positioning is genuinely differentiated. "No AI, no live pricing feed, just checked data and fixed rules" is an honest, specific claim in a space full of vague AI-washing. Keep this front and center.
- The core mental model (games + resolution + FPS target + budget → one build) is explained clearly and repeated consistently across the homepage, the four-step "how it works" section, and the dedicated `/how-it-works` page.
- The `/builds` page is well structured: one card per tier, consistent fields (name, resolution/FPS target, CPU, GPU, reference price), easy to scan top to bottom.
- The FPS formula and the "why a short list instead of a live catalogue" explanation are transparent and build credibility rather than hiding the tool's limitations.

## High priority issues

**1. "PREVIEW" label on every single component card looks like an unfinished dev artifact.**
On `/components`, all 95 entries are tagged "PREVIEW" with no explanation anywhere on the page of what that word means. If it is meant to signal "image preview not yet available," it needs to say that, or be replaced with an actual thumbnail once images exist. As it stands, it reads like a leftover placeholder state shipped to production, and it undermines the credibility the rest of the page is trying to build.

**2. The demo build's FPS target and its shown result don't visibly agree.**
The homepage example is labeled "1440p · 144 FPS" but the displayed benchmark is "~110 FPS (Cyberpunk 2077, 1440p)." A first-time visitor's eye lands on "144" and then "110" a few lines later with nothing bridging the gap. Even if the underlying logic is correct (144 is a headroom target, 110 is one demanding title's actual number), the page needs one line of microcopy making that explicit, e.g. "144 FPS in competitive titles, ~110 FPS in the heaviest AAA games." Without it, the number that's supposed to build trust does the opposite.

**3. No component images anywhere.**
This is a hardware selection tool, and the components page and build results are pure text and spec strings. People shopping for PC parts are used to recognizing GPUs and cases by sight, and a wall of "AMD Ryzen 5 7600 · 6C/12T · 5.1 GHz boost · AM5 · 65 W" rows is harder to scan and feels less finished than the rest of the copy. Even simple manufacturer stock photos would substantially raise perceived quality.

**4. "Check price ↗" repeated ~95 times with identical link text.**
Every single component row uses the exact same link label. For screen reader users navigating by link list (a very common assistive-tech workflow), this reads as "Check price, check price, check price..." with zero way to tell which link goes where. Each link needs an accessible name that includes the component ("Check price for AMD Ryzen 5 7600"), even if the visible label stays short.

## Medium priority issues

**5. The homepage's featured build risks being mistaken for a personalized result.**
A visitor who hasn't filled in the wizard yet sees a fully specified build (CPU, GPU, FPS, price) appear right under the hero. Without a clear "example build" or "most popular pick" label, it can look like the tool already knows what to recommend, which sets the wrong expectation before the person has entered anything.

**6. Duplicate nav markup in the fetched HTML.**
The header links (Builds / Components / How it works / Build my PC) appear twice in a row in the page source. This is common when a desktop nav and a mobile drawer both exist in the DOM, which is fine visually, but if the hidden copy isn't properly marked `aria-hidden` or `inert`, screen reader and keyboard users will tab through every nav link twice per page. Worth a quick audit of the actual markup.

**7. No filtering or sorting on `/components`.**
95 parts across 6 categories with a static "All · 95 / CPU · 18 / GPU · 17..." breakdown implies filtering, but there's no visible way to sort by price, brand, or socket within a category. For a page whose entire purpose is comparison, this is a missed opportunity.

**8. The site-wide footer blurb is repeated verbatim on every page.**
Not wrong, just a flat repetition of the same sentence ("One curated build matched to your games, resolution, frame-rate target and budget...") on the homepage hero, every page's footer, and the `/how-it-works` intro. Consider varying it slightly per page so returning visitors don't read the identical sentence four times in one session.

## Lower priority / polish

- "Reference pricing only" and "Benchmark data rev. Sep 2026" sit in the footer in small text on every page. Given how central "these are not live prices" is to the trust story, this deserves slightly more visual weight, not just a footer disclaimer.
- Tier names are inconsistent in format across pages: "Sweet-spot tier" on the homepage vs. "Core 1440p·144" on `/builds`. Consider deciding on one canonical name per tier and using it everywhere (nav breadcrumb, card title, page title).
- The stats block (95 components tracked / 24.8k benchmark data points / 88 compatibility checks) appears with different figures than the components page total in places; worth double-checking these numbers stay in sync as the catalogue grows, since a mismatch would quietly damage the "verified data" pitch.

## Recommended next step

Since the wizard (`/build`) and results page (`/build/result`) are the actual conversion path and couldn't be reviewed here, that flow deserves the next audit pass: form step count and labels, validation and error states, loading state while a build is matched, and how the result page presents the compatibility checks and per-game FPS table on mobile.
