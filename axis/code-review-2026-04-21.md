# Axis Modular — Code Review Report

**Run:** 2026-04-21 (scheduled autonomous task)
**Scope:** All HTML files in `/Axis Modular/` and `/Axis Modular/blueprints/`

---

## Summary

29 HTML files reviewed end-to-end. **4 fixes applied, 0 bugs left.** The remaining items are a style-guide drift between V1 and V2 that needs a human decision, not a code change.

---

## Fixes applied

**`blueprints/S-102-pier-plan.html`** — four OBC citation errors corrected
- Lines 344, 426, 471, 482: `OBC 9.8.3` (stair code) → `OBC 9.12.2.2` (foundation frost depth). The same sheet correctly cited `OBC 9.12.2.2` elsewhere, so these were clear typos. Duplicate bullet at former line 484 was merged into the corrected citation.

No other repairs were warranted. All other files were valid.

---

## Verified clean (no changes)

**Blueprints (21 sheets + index)**
- HTML/SVG valid: DOCTYPE, `<html lang="en">`, `aria-label`, balanced tags across all 21 sheets.
- No duplicate SVG ids within any sheet.
- No broken `url(#…)` or `href="#…"` references.
- All 15 `index.html` card links resolve to real files.

**Root-level HTML**
- `Axis Modular SIP Series - Shop Drawings.html` — valid, all url(#…) resolve.
- `axis-modular-sip-foundation-envelope.html` — valid.
- `dimension-toggle-mockups.html` — valid.
- `rendering-samples.html` — Three.js demo, script references all resolve.
- `sky-siding-mockups.html` — valid, per-SVG id scoping correct.
- `texture-mockups.html` — valid. ("colour" appears only in prose content, not CSS.)
- `ui-mockups.html` — 36 SVGs, all balanced, all buttons labeled.

**`index.html` (1.0 MB, 17,431 lines)**
- 23 style blocks: all braces balanced, no typo'd properties.
- 390 KB main inline script: parses clean under `node --check`; all ~40 `onclick` handlers resolve to defined functions.
- All 28 `url(#…)` SVG references resolve. Duplicate ids across embedded sheets are scoped per-embed (not live-DOM conflicts).
- 20 `data-bp="blueprints/…"` embedded sheets all map to real files.
- Only `<img>` source and download `href` are set from JS; both probe `renders/single.png`, which exists.
- No TODO/FIXME/HACK markers. All buttons have text or `aria-label`.

---

## Flagged — human decision needed (not fixed)

### 1. Rev/date drift between blueprints and index (cross-cutting)
All 21 blueprint sheets ship as `Rev. 02 · 2026-04-19`, but `blueprints/index.html:41` still advertises `Rev. 01 · 2026-04-18`. The old `_STYLE_GUIDE.md` (V1) prescribes Rev 01; `_STYLE_GUIDE_V2.md` exists alongside it. The sheets are internally consistent with each other — the index is the odd one out.

**Recommendation:** update `blueprints/index.html` header to `Rev. 02 · 2026-04-19` and mark `_STYLE_GUIDE.md` as superseded by V2.

### 2. Five plan-view sheets missing from the index
`index.html` lists only the original 15 sheets. These five are on disk but not linked:
- `S-102-pier-plan.html`
- `S-202-framing-plan.html`
- `A-101-floor-plan.html`
- `A-102-roof-plan.html`
- `M-101-mep-plan.html`

No broken links — just orphans.

### 3. Scale values differ from V1 style-guide table
Several sheets use scales that don't match `_STYLE_GUIDE.md`'s sheet-numbering table:

| Sheet | Current | V1 table |
|---|---|---|
| S-101 | 1 : 20 | 1 : 25 |
| S-201 | 1 : 10 / 1 : 25 | 1 : 20 |
| S-301 | 1 : 50 / 1 : 10 | 1 : 20 |
| P-501 | 1 : 25 | 1 : 20 |
| A-402 | 1 : 20 | 1 : 10 |
| M-601 | 1 : 20 | 1 : 10 |
| M-602 | 1 : 50 | 1 : 20 |

Current values look appropriate for the drawing content (plan sheets need broader scales). Likely intentional V2 changes — flagged so the style guide can be updated to match.

### 4. Shop Drawings S-05 — abandoned sketch markup
`Axis Modular SIP Series - Shop Drawings.html:1019-1035` contains a `<g>` block with dev-comments ("Redrawing — let me restart with cleaner layout", "CLEAR and draw properly"). A cream `<rect>` at line 1035 covers it, so the page renders correctly. Safe to delete, but per the "don't rewrite working code" policy it was left alone.

---

## Cross-cutting notes

- The blueprint set has been uniformly upgraded to V2 conventions except for `index.html` and the V1 style guide. Reconciling those two will close the drift described in items 1 and 3.
- Embedded blueprint SVGs in `index.html` reuse pattern ids (`earth`, `grid`, `leader`, …) across sheets. Safe as long as the viewer keeps them in separate document scopes (current behaviour). If the viewer ever inlines two embeds into the live DOM at once, only the first-defined pattern would render. Worth a note before any viewer changes.
- The main `index.html` ships ~390 KB of inline JS. It's lint-clean today, but future edits should run through a linter before commit.
