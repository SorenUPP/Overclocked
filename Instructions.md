# Overclocked — UI Fixes

## Overview

The foundation is good: the product is immediately understandable, the copy is restrained, and the “curated builds rather than infinite combinations” positioning is strong.

The main issue is that the UI currently feels more like a **well-designed landing page prototype** than a polished PC-building product.

The goal should be to shift the visual design from:

> “A website explaining a PC-building service”

to:

> “A PC-building tool that happens to have a beautiful landing page.”

---

## P0 — Fix These First

### 1. Make the primary CTA much more visually dominant

**Current issue:**  
“Build my PC” should clearly be the #1 action, but it doesn't stand out enough from the rest of the navigation/content.

**Fix:**
- Give **Build my PC** a stronger button treatment.
- Make it visually distinct from informational navigation links.
- Repeat the CTA after the hero/value proposition.
- Keep the CTA copy action-oriented.

**Priority:** 🔴 P0

---

### 2. Give the hero more visual impact

**Current issue:**  
The hero is heavily text-driven.

**Fix:**  
Add a strong visual representation of the recommended PC/build, such as:
- GPU/CPU imagery
- A polished build card
- A “recommended build” panel
- A visual performance summary

The existing data is already strong hero material:

- Ryzen 7 7700
- RTX 5070
- 112 FPS
- €1,597

Use this data visually instead of relying on text alone.

**Priority:** 🔴 P0

---

### 3. Turn the featured build into a proper product card

Instead of presenting the information as a simple block:

- Core 1440p
- CORE-07
- Ryzen 7 7700
- GeForce RTX 5070
- Estimated 1440p: 112 FPS
- Reference: €1,597
- Checks: 6 / 6

Make it feel like an actual recommendation.

### Suggested structure

**CORE-07**  
1440p / 144 FPS

**CPU**  
Ryzen 7 7700

**GPU**  
GeForce RTX 5070

**Performance**  
112 FPS

**Price**  
€1,597 reference

**Compatibility**  
✓ 6/6 checks

**[ View build → ]**

**Priority:** 🔴 P0

---

### 4. Improve the visual hierarchy of the stats

Current stats:

- 95 tracked components
- 24,800 benchmark data points
- 88 compatibility rules

These currently read more like footer metadata than product trust signals.

**Fix:**

Display them prominently:

**95**  
Components tracked

**24.8k**  
Benchmark data points

**88**  
Compatibility checks

Use large numbers and smaller explanatory labels.

**Priority:** 🔴 P0

---

### 5. Improve navigation hierarchy

Current navigation:

- Build a PC
- Builds
- Components
- How it works

**Recommended hierarchy:**

**Build my PC** → primary button  
Builds  
Components  
How it works

The user's primary action should not look identical to informational navigation.

**Priority:** 🔴 P0

---

# P1 — Important Polish

## 6. Give sections more visual separation

The page currently feels relatively flat.

Introduce subtle differences between:

- Hero
- Featured build
- How it works
- Trust/data section
- Final CTA

You don't need large background changes.

Consider:
- Subtle borders
- Cards
- More intentional spacing
- Slight tonal shifts
- Section dividers

Avoid excessive visual effects.

**Priority:** 🟠 P1

---

## 7. Make the “01–04” process section more interactive

The four-step process is good content, but visually it currently reads as four text blocks.

**Fix:**
- Numbered cards
- Connecting line
- Small icons
- Simple diagrams
- Hover states
- More obvious progression

The section should feel like a **process**, not four paragraphs.

**Priority:** 🟠 P1

---

## 8. Add component imagery

For a PC-building product, the page is relatively image-light.

Consider tasteful imagery for:

- GPU
- CPU
- Motherboard
- RAM
- Complete PC builds

Keep the imagery clean and premium rather than going for stereotypical gaming/RGB visuals.

**Priority:** 🟠 P1

---

## 9. Add a “Why trust this recommendation?” section

One of the strongest product differentiators is:

> “tested builds, not endless combinations.”

This should be visually emphasized.

### Example

**Why this build?**

✓ 6/6 compatibility checks  
✓ Tested configuration  
✓ 1440p benchmark data  
✓ Fits your €1,600 budget

This communicates that the product isn't just generating arbitrary component combinations.

**Priority:** 🟠 P1

---

## 10. Make compatibility status more prominent

`Checks 6 / 6` is one of the strongest pieces of information on the page.

Turn it into a recognizable verification badge:

**✓ 6/6 compatibility checks**

The badge should visually communicate **verified**.

Green is optional; the important part is the visual language of verification.

**Priority:** 🟠 P1

---

# P2 — Nice-to-Have Improvements

## 11. Add hover and focus states

Add clear interaction states to:

- Navigation links
- CTA buttons
- Build cards
- Component cards

Focus states are especially important for keyboard accessibility.

**Priority:** 🟡 P2

---

## 12. Add subtle motion

Keep animation restrained and premium.

Possible interactions:

- Cards lift 2–4px on hover
- Buttons respond to hover/press
- Metrics fade in
- Hero build card enters smoothly
- Process steps animate as they enter the viewport

Avoid excessive animations or gaming-style effects.

**Priority:** 🟡 P2

---

## 13. Improve mobile hierarchy

On mobile, prioritize the core product journey:

1. **Build the PC you actually need.**
2. Short explanation
3. **[ Build my PC ]**
4. Featured build
5. How it works
6. Trust metrics
7. **[ Build my PC ]**

The primary action should remain obvious without requiring the user to scroll through lots of supporting information.

**Priority:** 🟡 P2

---

## 14. Give the footer more utility

The current footer is very minimal.

Consider adding:

- Build a PC
- Builds
- Components
- How it works
- Pricing methodology
- Data / benchmarks
- About / contact

**Priority:** 🟡 P2

---

## 15. Add “last updated” context to pricing

The site already communicates that pricing is reference pricing and includes a revision indicator.

Bring that context closer to the price itself.

### Suggested format

**€1,597 reference price**  
Updated Sep 2026

This makes the pricing methodology clearer and builds trust.

**Priority:** 🟡 P2

---

# Overall Design Direction

The strongest direction is **premium, restrained, and product-focused**.

Do **not** solve the visual shortcomings by adding:

- Excessive gradients
- RGB everywhere
- Gaming clichés
- Heavy glow effects
- Excessive glassmorphism
- Overly aggressive animations

The current restrained aesthetic is a good foundation.

The goal is to make it feel:

**More premium.**  
**More tangible.**  
**More trustworthy.**  
**More like a real PC-building product.**

---

# Priority Checklist

| Priority | Fix |
|---|---|
| 🔴 P0 | Stronger **Build my PC** CTA |
| 🔴 P0 | More visually impressive hero |
| 🔴 P0 | Turn featured build into a real recommendation card |
| 🔴 P0 | Stronger visual hierarchy for FPS / price / compatibility |
| 🔴 P0 | Make trust/verification much more prominent |
| 🟠 P1 | Add visual separation between sections |
| 🟠 P1 | Make 01–04 process more visual |
| 🟠 P1 | Add PC/component imagery |
| 🟠 P1 | Add “Why trust this recommendation?” |
| 🟠 P1 | Improve compatibility badge |
| 🟡 P2 | Add hover/focus states |
| 🟡 P2 | Add subtle motion |
| 🟡 P2 | Improve mobile hierarchy |
| 🟡 P2 | Expand footer utility |
| 🟡 P2 | Add pricing update context |

---

# Recommended Implementation Order

If you want to work through the changes efficiently, do them in this order:

### Phase 1 — Core conversion

1. Redesign the primary CTA
2. Redesign the hero
3. Build the featured recommendation card
4. Make FPS, price, and compatibility visually dominant

### Phase 2 — Trust

5. Redesign the data/trust metrics
6. Add compatibility verification
7. Add the “Why this build?” section
8. Add pricing freshness/methodology

### Phase 3 — Visual polish

9. Improve section separation
10. Redesign the 01–04 process
11. Add component/build imagery
12. Add hover and focus states
13. Add restrained motion

### Phase 4 — Responsive polish

14. Rework mobile hierarchy
15. Test CTA visibility
16. Check spacing and typography across breakpoints
17. Refine the footer

---

# The Single Biggest Change

The page should make the **actual product** the star.

The strongest product flow is:

**Games → Resolution → FPS target → Budget → Recommended build**

Make that journey the central visual interaction rather than merely a CTA leading somewhere else.

The content and positioning are already strong. The next step is making the UI communicate that value with the same clarity.
