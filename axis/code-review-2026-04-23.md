# Axis Modular — Code Review Report

**Run:** 2026-04-23 (scheduled autonomous task)
**Scope:** Files changed or added since the 2026-04-21 review

---

## Summary

Four files have been added or modified since the last review: two new U-shape floor-plan sheets, the brand-header mockup page, and the main interactive viewer. **2 fixes applied, 0 bugs left.** The remaining items are orphan files and a style-guide drift that need a human decision, not code changes.

---

## Fixes applied

**`blueprints/A-103-floor-plan-u-shape.html`** — enclosed-area arithmetic error corrected
- Line 687 (title block): `≈1998 SF encl.` → `≈1620 SF encl.`
- Line 770 (spec list): `≈1 998 SF gross (12' × 21' connector + 2 × 12' × 45' wings)` → `≈1 620 SF gross (45' × 12' north connector + 2 × 12' × 45' south wings). Courtyard: ≈945 SF open-air (21' × 45')`

The 1998 figure did not match either the drawn geometry or the rest of the project. Correct math: 45' × 57' outer envelope = 2565 SF, minus the 21' × 45' south-opening courtyard = 945 SF, leaves **1620 SF** enclosed. The decomposition 45' × 12' connector (540 SF) + two 12' × 45' wings (1080 SF) also sums to 1620 SF. This matches `index.html`'s viewer metadata which already advertises the U-shape as `45′ × 57′ · 1,620 SF · 2 Beds · 2 Baths`, so the sheet is now internally consistent with the rest of the project.

No other repairs were warranted.

---

## Verified clean (no changes)

**`blueprints/A-101U-floor-plan-ushape.html`** (new, Rev. 04 · 2026-04-21, 607 lines)
- Valid HTML/SVG: DOCTYPE, `<html lang="en">`, `aria-label`, balanced tags.
- All `url(#…)` refs resolve (`grid`, `shwr`, `courtPaver`, `arrow`).
- No duplicate SVG ids.
- Geometry is self-consistent: outer polygon and rect-cutout void placement produce the advertised U-shape envelope.

**`blueprints/A-103-floor-plan-u-shape.html`** (new, Rev. 03 · 2026-04-21, 800 lines, post-fix)
- Valid HTML/SVG; wall ring uses `fill-rule="evenodd"` on outer+inner polygons.
- All `url(#…)` refs resolve (SIP / gyp / tile / paver / shower / grid patterns).
- No duplicate SVG ids.
- Title block, sheet title, and spec list now internally consistent at 1620 SF.

**`sidebar-brand-mockups.html`** (417 lines)
- Six brand-header variants over a 200 px sidebar mock.
- HTML/CSS valid, no duplicate ids, no broken references.

**`index.html`** (1.0 MB, 17,893 lines)
- All 23 style blocks: braces balanced, no typo'd properties.
- ~390 KB main inline script: extracted and passes `node --check` cleanly.
- All 34 unique `onclick` handler names resolve to defined functions (verified by substring search over `function <name>(`, `<name> = function`, `window.<name> =` forms).
- `BP_BLUEPRINT_MAP` (lines 5445–5463 and 6220–6239): 20 sheets, every target file exists on disk.
- All 20 `data-bp="blueprints/…"` embedded sheets correspond to `BP_BLUEPRINT_MAP` entries.
- All `url(#…)` SVG references resolve. Duplicate ids across embedded sheets remain scoped per-embed — safe under the current viewer behavior.
- No TODO/FIXME/HACK markers. All buttons have text or `aria-label`.

---

## Flagged — human decision needed (not fixed)

### 1. Two new U-shape blueprints are orphans

`A-101U-floor-plan-ushape.html` and `A-103-floor-plan-u-shape.html` are on disk and valid, but neither is wired into `index.html`'s `BP_BLUEPRINT_MAP` and neither appears in `blueprints/index.html`'s card grid. They'll render standalone if opened directly, but the main viewer won't reach them.

Per prior precedent (the 2026-04-21 review flagged five similar orphans without auto-wiring), these were left alone. The two blueprints also overlap in scope — `A-101U` is a simpler U-shape plan, `A-103` is a more detailed one — so a decision is needed on which is canonical before wiring.

**Recommendation:** decide which of the two is the production sheet, then add it to `BP_BLUEPRINT_MAP` and `blueprints/index.html`. If both should be kept, they need distinct, non-colliding sheet numbers (right now both claim U-shape floor plans).

### 2. Rev/date drift between blueprints and `blueprints/index.html` — unchanged since last review

Status quo from 2026-04-21 still holds: the original sheets ship as `Rev. 02 · 2026-04-19`, the two new U-shape sheets ship as `Rev. 03/04 · 2026-04-21`, and `blueprints/index.html:41` still advertises `Rev. 01 · 2026-04-18`. The V1 style guide (`_STYLE_GUIDE.md`) also still sits alongside `_STYLE_GUIDE_V2.md` without a superseded marker.

**Recommendation:** unchanged — bring `blueprints/index.html`'s header in line with the sheets, and mark V1 as superseded.

### 3. Plan-view sheets still missing from `blueprints/index.html`

Also unchanged: `S-102-pier-plan`, `S-202-framing-plan`, `A-101-floor-plan`, `A-102-roof-plan`, `M-101-mep-plan` are on disk but not linked from the blueprint index. No broken links; still orphans.

---

## Cross-cutting notes

- The main viewer is the source of truth for the U-shape's enclosed-area figure (1620 SF). The A-103 fix above brings that sheet into agreement. Before A-101U is ever wired into the viewer, verify it doesn't introduce a conflicting figure (it currently shows no SF value at all, which is fine).
- The orphan count is growing (7 total now: 5 from last review + 2 new U-shape sheets). A one-time reconciliation pass — deciding which sheets are canonical and wiring them into both `BP_BLUEPRINT_MAP` and `blueprints/index.html` — would clear the backlog.
- `index.html`'s ~390 KB inline script is lint-clean today, but the file has grown by ~460 lines since the last review. Worth running through a linter on future edits.
