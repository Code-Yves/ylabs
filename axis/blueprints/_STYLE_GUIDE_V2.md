# Axis Modular SIP Series — Blueprint Style Guide V2 (Engineering Shop-Drawing Standard)

**Supersedes V1.** V1 had systemic issues: U-value math errors, brand-name drift, non-standard keynote notation, north arrows on section details, and visually weak linework/hatching. V2 is the authoritative spec for all 15 sheets.

---

## Deliverable envelope

- **File naming:** `<code>-<slug>.html` at `/blueprints/`.
- **Self-contained:** no external CSS/JS, no external fonts beyond system stack.
- **ViewBox:** exactly `viewBox="0 0 900 620"` — every sheet.
- **Aspect:** 900×620 in SVG units; the HTML wrapper caps width at 1100 px.

---

## 1. HTML skeleton (copy verbatim, change only the marked `{...}` fields)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Axis Modular — {SHEET NO.} — {DETAIL TITLE}</title>
<style>
  :root { --ink:#1a1a1a; --accent:#0b3d91; --stamp:#9c2a2a; --rule:#d0d0d0; --bg:#f4f4ee; --grid:#e8e8e2; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; margin:0; padding:1.25rem; background:#e8ebee; color:var(--ink); }
  .sheet-wrap { max-width:1100px; margin:0 auto; }
  header.sheet-header { display:flex; justify-content:space-between; align-items:baseline; padding-bottom:.5rem; border-bottom:2px solid var(--ink); margin-bottom:.75rem; }
  header.sheet-header h1 { margin:0; font-size:1rem; letter-spacing:.7px; text-transform:uppercase; }
  header.sheet-header .meta { font-size:.75rem; color:#555; letter-spacing:.4px; }
  svg.sheet { display:block; width:100%; height:auto; background:#fff; border:1px solid #888; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
  details { margin:1rem 0 0; border:1px solid var(--rule); border-radius:6px; padding:.65rem 1rem; background:#fff; }
  details summary { cursor:pointer; font-weight:600; color:var(--accent); }
  details ul { margin:.5rem 0 0 1rem; }
  details li { margin-bottom:.25rem; font-size:.9rem; }
  .tech-note { margin-top:1rem; padding:.85rem 1rem; background:var(--bg); border-left:4px solid #9c7a00; font-size:.85rem; }
  code.ref { background:#eaeaea; padding:1px 5px; border-radius:3px; font-size:.85em; font-family: "SF Mono", Menlo, monospace; }
</style>
</head>
<body>
<div class="sheet-wrap">
  <header class="sheet-header">
    <h1>Axis Modular SIP Series · {SHEET NO.} — {DETAIL TITLE}</h1>
    <div class="meta">Rev. 02 · 2026-04-19 · <span style="color:var(--stamp);font-weight:600;">ISSUED FOR CONSTRUCTION</span></div>
  </header>

  <svg class="sheet" viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg" aria-label="{SHEET NO.} {DETAIL TITLE}">
    {DEFS}
    {OUTER FRAME + INNER GRID}
    {DRAWING TITLE BANNER}
    {DRAWING CONTENT}
    {DIMENSIONS}
    {KEYNOTE BUBBLES + LEADERS}
    {SECTION MARKERS (if any)}
    {SCALE BAR}
    {TITLE BLOCK}
  </svg>

  <details open>
    <summary>{SHEET NO.}: {one-line headline with key metric} · Expand for full spec</summary>
    <ul>
      {bullet spec list: 6–10 bullets}
    </ul>
  </details>

  <section class="tech-note">
    <h3 style="margin:0 0 .3rem;font-size:.9rem;">Technical Note — Code &amp; Reference</h3>
    <ul style="margin:0 0 0 1rem;padding:0;">
      {OBC / CSA / CCMC references — accurate, spelled out}
    </ul>
  </section>
</div>
</body>
</html>
```

---

## 2. Sheet layout regions (SVG coordinates)

| Region | Coords | Purpose |
|---|---|---|
| Outer border (heavy) | `x=8  y=8  w=884 h=604` `stroke-width="2"` | Sheet edge |
| Inner frame (light) | `x=14 y=14 w=872 h=592` `stroke-width="0.6"` | Separates margin |
| Drawing area | `x=30 y=40 w=530 h=520` | All detail geometry and hatches |
| Drawing-area frame | same `stroke-width="0.8"` | Thin outline |
| Drawing-area grid | inside drawing area, 20 px pitch, `stroke="var(--grid)"` `stroke-width="0.3"` | Behind everything |
| Drawing banner | `x=30 y=24 w=530 h=14` | Title + scale + view name |
| Title block | `x=580 y=30 w=300 h=560` `stroke-width="1.5"` | Right sidebar, full layout below |
| Scale bar | inside drawing area, bottom-center | See §9 |
| Section marker (if needed) | inside drawing area | See §8 |

The drawing area (x=30–560) is where everything lives except the title block. **Do not** place callout text outside this region — callouts sit on the drawing side, title block stays on the right.

---

## 3. Required `<defs>` block (paste exactly into every sheet)

```svg
<defs>
  <!-- Earth: 45° diagonal fine-line hatch -->
  <pattern id="earth" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="9" stroke="#6b5a3d" stroke-width="0.55"/>
  </pattern>

  <!-- Steel cross-hatch, dense -->
  <pattern id="steelXH" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="5" stroke="#2a2a2a" stroke-width="0.5"/>
    <line x1="0" y1="0" x2="5" y2="0" stroke="#2a2a2a" stroke-width="0.5"/>
  </pattern>

  <!-- Solid steel (for thin HSS sections viewed in full-section) -->
  <pattern id="steelSolid" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
    <rect width="4" height="4" fill="#3a3a3a"/>
  </pattern>

  <!-- Insulation: proper continuous squiggle -->
  <pattern id="insul" patternUnits="userSpaceOnUse" width="18" height="12">
    <path d="M 0 6 Q 4.5 0 9 6 T 18 6" stroke="#1a1a1a" stroke-width="0.7" fill="none"/>
    <path d="M 0 6 Q 4.5 12 9 6 T 18 6" stroke="#1a1a1a" stroke-width="0.4" fill="none" opacity="0.55"/>
  </pattern>

  <!-- Rigid foam EPS (diagonal stripes + dot) -->
  <pattern id="eps" patternUnits="userSpaceOnUse" width="8" height="8">
    <rect width="8" height="8" fill="#f5f0de"/>
    <circle cx="2" cy="2" r="0.5" fill="#8a7a4d"/>
    <circle cx="6" cy="6" r="0.4" fill="#8a7a4d"/>
  </pattern>

  <!-- OSB sheathing (speckle + line) -->
  <pattern id="osb" patternUnits="userSpaceOnUse" width="10" height="10">
    <rect width="10" height="10" fill="#d6b56a" opacity="0.25"/>
    <circle cx="2" cy="3" r="0.45" fill="#8a5a2b"/>
    <circle cx="7" cy="7" r="0.4" fill="#8a5a2b"/>
    <circle cx="5" cy="2" r="0.3" fill="#8a5a2b"/>
    <circle cx="8" cy="4" r="0.3" fill="#8a5a2b"/>
  </pattern>

  <!-- Wood (framing/joist) — horizontal grain -->
  <pattern id="wood" patternUnits="userSpaceOnUse" width="24" height="10">
    <rect width="24" height="10" fill="#e9d9b0" opacity="0.4"/>
    <path d="M 0 3 Q 6 2 12 3 T 24 3" stroke="#8a5a2b" stroke-width="0.4" fill="none"/>
    <path d="M 0 7 Q 6 6 12 7 T 24 7" stroke="#8a5a2b" stroke-width="0.3" fill="none"/>
  </pattern>

  <!-- Concrete (dots + triangles) -->
  <pattern id="concrete" patternUnits="userSpaceOnUse" width="20" height="20">
    <rect width="20" height="20" fill="#eaeaea"/>
    <circle cx="4" cy="5" r="1"   fill="#6b6b6b"/>
    <circle cx="14" cy="12" r="0.8" fill="#6b6b6b"/>
    <polygon points="9,16 12,16 10.5,13" fill="#6b6b6b"/>
  </pattern>

  <!-- Gypsum (light stipple) -->
  <pattern id="gyp" patternUnits="userSpaceOnUse" width="5" height="5">
    <rect width="5" height="5" fill="#fafafa"/>
    <circle cx="1" cy="1" r="0.35" fill="#9a9a9a"/>
    <circle cx="3.5" cy="3" r="0.3" fill="#9a9a9a"/>
  </pattern>

  <!-- Drawing-area background grid -->
  <pattern id="grid" patternUnits="userSpaceOnUse" width="20" height="20">
    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8e8e2" stroke-width="0.3"/>
  </pattern>

  <!-- Dimension arrowhead (filled triangle, small) -->
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
  </marker>

  <!-- Open arrowhead for leaders (smaller) -->
  <marker id="leader" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M 0 0 L 8 4 L 0 8 z" fill="#1a1a1a"/>
  </marker>
</defs>
```

---

## 4. Linework weights (strictly enforce)

| Element | stroke-width | Color |
|---|---|---|
| Sheet outer border | 2.0 | `#1a1a1a` |
| Drawing-area frame | 0.8 | `#1a1a1a` |
| Grid | 0.3 | `#e8e8e2` |
| **Cut-line / primary structure silhouette** | **2.5–3.0** | `#1a1a1a` |
| Secondary structure outline | 1.8 | `#1a1a1a` |
| Hatch fill outline | 0.6 | `#1a1a1a` |
| Dimension lines | 0.5 | `#1a1a1a` |
| Leader lines | 0.5 | `#1a1a1a` |
| Break lines | 1.0 | `#1a1a1a` |
| Hidden / dashed (below-grade, behind) | 0.8, `stroke-dasharray="5 2"` | `#1a1a1a` |
| Frost / grade datum | 0.8, `stroke-dasharray="6 3"` | `#0b3d91` |
| Centerlines | 0.5, `stroke-dasharray="8 2 2 2"` | `#1a1a1a` |

**Rule:** cut elements (anything sliced by the section plane) must be the heaviest line on the sheet. Everything behind the section is lighter. Everything dimensional/annotation is the lightest.

---

## 5. Keynote system (engineering shop-drawing — circled numbers)

Every labeled element uses a **circled number** keynote, with a leader line and a per-sheet keynote legend in a numbered list on the drawing side.

```svg
<!-- Keynote bubble template — place at label position -->
<g>
  <circle cx="{nx}" cy="{ny}" r="9" fill="#fff" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="{nx}" y="{ny + 3.5}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#1a1a1a">{N}</text>
</g>

<!-- Leader line from bubble edge to element -->
<line x1="{nx_side}" y1="{ny}" x2="{element_x}" y2="{element_y}" stroke="#1a1a1a" stroke-width="0.5"/>
<circle cx="{element_x}" cy="{element_y}" r="1.5" fill="#1a1a1a"/>
```

**Leader rules:**
- Leader terminates with a **solid 1.5-radius dot** at the element edge (not inside the element).
- Leader exits the bubble at the side nearest the target (left, right, top, or bottom edge at r=9).
- Never cross another leader; detour horizontally then vertically if needed (no diagonals crossing geometry).
- No leader lands inside a hatch — always on a clean outline.

**Keynote legend** (placed along bottom or right side of drawing area, outside the primary detail):

```svg
<g transform="translate(50, 480)">
  <text x="0" y="0" font-family="Arial" font-size="10" font-weight="700">KEYNOTES</text>
  <line x1="0" y1="4" x2="200" y2="4" stroke="#1a1a1a" stroke-width="0.5"/>
  <!-- Each note row: -->
  <g transform="translate(0, 18)">
    <circle cx="8" cy="-3" r="7" fill="#fff" stroke="#1a1a1a" stroke-width="1"/>
    <text x="8" y="0" text-anchor="middle" font-family="Arial" font-size="8" font-weight="700">1</text>
    <text x="22" y="0" font-family="Arial" font-size="9.5" font-weight="600">{HEADLINE}</text>
    <text x="22" y="11" font-family="Arial" font-size="8.5" fill="#555">{description with spec values}</text>
  </g>
  <!-- Repeat for each keynote, +22 px per row -->
</g>
```

**Sheet limit: 6 keynotes max per view.** If you have more than 6, group logically or split into two views.

---

## 6. Dimensions

```svg
<!-- Horizontal dim with witness/extension lines -->
<line x1="{x1}" y1="{y1}" x2="{x1}" y2="{y_dim + 6}" stroke="#1a1a1a" stroke-width="0.4"/>
<line x1="{x2}" y1="{y1}" x2="{x2}" y2="{y_dim + 6}" stroke="#1a1a1a" stroke-width="0.4"/>
<line x1="{x1}" y1="{y_dim}" x2="{x2}" y2="{y_dim}" stroke="#1a1a1a" stroke-width="0.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
<text x="{(x1+x2)/2}" y="{y_dim - 4}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="500">{N}</text>
```

**Rules:**
- Witness lines extend 3 mm past the dim line.
- Arrow tips meet at the witness.
- Number is centered above the dim line, never touching it.
- All values in **mm**, no comma separators (use spaces for ≥1000: `1 200`, or omit — pick one convention per sheet and stay with it. Prefer no separator; e.g., `1200`).

---

## 7. Symbols (replace V1 Unicode with proper SVG glyphs)

### Grade / finished floor — inverted triangle with horizontal line

```svg
<g transform="translate({x},{y})">
  <polygon points="0,0 -6,10 6,10" fill="#1a1a1a"/>
  <line x1="-30" y1="0" x2="30" y2="0" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="-2" font-family="Arial" font-size="9" font-weight="600">GRADE</text>
</g>
```

### Finished floor elevation — double triangle

```svg
<g transform="translate({x},{y})">
  <polygon points="0,0 -5,8 5,8" fill="#fff" stroke="#1a1a1a" stroke-width="1"/>
  <polygon points="0,0 -5,8 5,8" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <polygon points="0,0 -3,5 3,5" fill="#1a1a1a"/>
  <line x1="-25" y1="0" x2="25" y2="0" stroke="#1a1a1a" stroke-width="1"/>
  <text x="12" y="-2" font-family="Arial" font-size="9" font-weight="600">F.F.</text>
</g>
```

### Centerline — alternate long-short-long dash

```svg
<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="10 3 2 3"/>
<text x="{x}" y="{y1 - 4}" text-anchor="middle" font-family="Arial" font-size="9" font-style="italic">C&#x0338;L</text>
```

(`C&#x0338;L` renders as `C̸L` — the combining short-solidus gives a proper centerline glyph in any font.)

### Break line — proper zig-zag (sharper)

```svg
<!-- Horizontal break line on a shaft/element: the small zig-zag "Z" shape -->
<path d="M {x} {y} L {x+15} {y} L {x+20} {y-6} L {x+25} {y+6} L {x+30} {y} L {x+w} {y}"
      stroke="#1a1a1a" stroke-width="1" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
```

For a **short break (freehand squiggle)** on a continuous element:

```svg
<path d="M {x} {y} q 2 -4 4 0 t 4 0 t 4 0 t 4 0" stroke="#1a1a1a" stroke-width="0.9" fill="none"/>
```

### Section cut marker — filled circle + bold letter + arrow

```svg
<g transform="translate({x},{y})">
  <line x1="-25" y1="0" x2="25" y2="0" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="6 2"/>
  <circle cx="0" cy="0" r="10" fill="#1a1a1a"/>
  <text x="0" y="4" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#fff">{A}</text>
  <polygon points="10,0 18,-4 18,4" fill="#1a1a1a"/>
</g>
```

### Diameter / Ø — use the Unicode `Ø` directly, SVG `font-size` renders it fine. For safer cross-font rendering use `&#216;` HTML entity in text nodes.

---

## 8. Drawing banner (above the drawing area, inside the drawing region)

```svg
<g>
  <rect x="30" y="24" width="530" height="14" fill="#1a1a1a"/>
  <text x="40"  y="35" font-family="Arial" font-size="10" font-weight="700" fill="#fff">{VIEW LABEL — e.g. SECTION A-A}</text>
  <text x="555" y="35" text-anchor="end" font-family="Arial" font-size="9" fill="#fff">SCALE {X : X}</text>
</g>
```

---

## 9. Scale bar (bottom of drawing area, x ≈ 280 y ≈ 575)

```svg
<g transform="translate(280, 575)">
  <text x="50" y="-4" font-family="Arial" font-size="9" text-anchor="middle" font-weight="600">{SCALE}</text>
  <rect x="0"  y="0" width="25" height="5" fill="#1a1a1a"/>
  <rect x="25" y="0" width="25" height="5" fill="#fff" stroke="#1a1a1a" stroke-width="0.4"/>
  <rect x="50" y="0" width="25" height="5" fill="#1a1a1a"/>
  <rect x="75" y="0" width="25" height="5" fill="#fff" stroke="#1a1a1a" stroke-width="0.4"/>
  <text x="-3"  y="16" font-family="Arial" font-size="7.5">0</text>
  <text x="47"  y="16" font-family="Arial" font-size="7.5" text-anchor="middle">{half}</text>
  <text x="103" y="16" font-family="Arial" font-size="7.5">{full} mm</text>
</g>
```

For 1:5 → full = 500 mm; for 1:10 → 1000 mm; for 1:20 → 2000 mm; for 1:25 → 2500 mm.

---

## 10. No north arrow on section details

**REMOVE the north arrow from all section, elevation, and detail drawings.** North arrows appear only on plan views. Sheets that are plan views (e.g. S-201 if drawn as plan, S-301 if plan, P-501 if plan, M-602 if plan) may keep it, placed inside the drawing area top-left at `(55, 65)` with r=16.

---

## 11. Title block (right sidebar, x=580 y=30 w=300 h=560)

```svg
<!-- Outer border of title block -->
<rect x="580" y="30" width="300" height="560" fill="#fff" stroke="#1a1a1a" stroke-width="1.5"/>

<!-- Issued-for-construction stamp -->
<g transform="translate(592, 45)">
  <rect x="0" y="0" width="150" height="40" fill="none" stroke="#9c2a2a" stroke-width="1.5"/>
  <text x="75" y="17" font-family="Arial" font-size="10" font-weight="bold" fill="#9c2a2a" text-anchor="middle">ISSUED FOR</text>
  <text x="75" y="32" font-family="Arial" font-size="12" font-weight="bold" fill="#9c2a2a" text-anchor="middle">CONSTRUCTION</text>
</g>
<text x="755" y="55" font-family="Arial" font-size="9">Rev: 02</text>
<text x="755" y="70" font-family="Arial" font-size="9">2026-04-19</text>

<line x1="590" y1="100" x2="870" y2="100" stroke="#1a1a1a" stroke-width="0.8"/>
<text x="600" y="124" font-family="Arial" font-size="10" font-weight="bold">PROJECT</text>
<text x="600" y="141" font-family="Arial" font-size="12">AXIS MODULAR — SIP SERIES</text>
<text x="600" y="155" font-family="Arial" font-size="9" fill="#555">42&#8242; &#215; 12&#8242; · ≈504 SF · 1 BDRM · Grid-Connected</text>

<line x1="590" y1="168" x2="870" y2="168" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="188" font-family="Arial" font-size="10" font-weight="bold">DETAIL</text>
<text x="600" y="205" font-family="Arial" font-size="12">{DETAIL TITLE}</text>
<text x="600" y="219" font-family="Arial" font-size="10" fill="#555">{discipline} · {OBC Part 9 reference}</text>

<line x1="590" y1="233" x2="870" y2="233" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="253" font-family="Arial" font-size="10" font-weight="bold">GENERAL NOTES</text>
<!-- Up to 5 one-line notes @ y=270,283,296,309,322 -->
<text x="600" y="270" font-family="Arial" font-size="9">1. {note}</text>
<text x="600" y="283" font-family="Arial" font-size="9">2. {note}</text>
<text x="600" y="296" font-family="Arial" font-size="9">3. {note}</text>
<text x="600" y="309" font-family="Arial" font-size="9">4. {note}</text>
<text x="600" y="322" font-family="Arial" font-size="9">5. {note}</text>

<line x1="590" y1="360" x2="870" y2="360" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="380" font-family="Arial" font-size="10" font-weight="bold">DRAWN</text>
<text x="660" y="380" font-family="Arial" font-size="10">AXIS — BIM</text>
<text x="600" y="395" font-family="Arial" font-size="10" font-weight="bold">CHECKED</text>
<text x="660" y="395" font-family="Arial" font-size="10">LMB, P.Eng.</text>
<text x="600" y="410" font-family="Arial" font-size="10" font-weight="bold">APPROVED</text>
<text x="660" y="410" font-family="Arial" font-size="10">[stamp required]</text>

<line x1="590" y1="425" x2="870" y2="425" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="445" font-family="Arial" font-size="10" font-weight="bold">SCALE</text>
<text x="660" y="445" font-family="Arial" font-size="10">{SCALE}</text>
<text x="600" y="462" font-family="Arial" font-size="10" font-weight="bold">SHEET</text>
<text x="660" y="462" font-family="Arial" font-size="10">{SHEET NO.}</text>
<text x="600" y="479" font-family="Arial" font-size="10" font-weight="bold">PROJECT NO.</text>
<text x="690" y="479" font-family="Arial" font-size="10">2026-042</text>
<text x="600" y="496" font-family="Arial" font-size="10" font-weight="bold">REV</text>
<text x="660" y="496" font-family="Arial" font-size="10">02 — IFC</text>

<line x1="590" y1="515" x2="870" y2="515" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="535" font-family="Arial" font-size="8" fill="#555">© 2026 Axis Modular Homes</text>
<text x="600" y="548" font-family="Arial" font-size="8" fill="#555">All dimensions in mm U.N.O.</text>
<text x="600" y="561" font-family="Arial" font-size="8" fill="#555">Do not scale from drawing</text>
<text x="600" y="574" font-family="Arial" font-size="8" fill="#555">Drop &amp; Go modular chassis</text>
```

---

## 12. Data accuracy rules (critical — do not violate)

1. **U-value and R-value math:**
   - In SI: `U [W/m²·K] = 1 / R_SI` where `R_SI [m²·K/W] = R_imp × 0.1761`.
   - Example: R-32 imperial → R_SI = 5.64 → **U = 0.177 W/m²·K** (not 0.032; 0.032 is the *conductivity* λ of graphite EPS).
   - R-30 SIP wall (6.5" panel, graphite EPS λ=0.031) → R_SI ≈ 5.28 → **U ≈ 0.189 W/m²·K**.
   - R-40 roof SIP (10.25" panel) → R_SI ≈ 7.04 → **U ≈ 0.142 W/m²·K**.

2. **No brand names.** Use generic specifiers only:
   - Wood I-joist / engineered I-joist (not TJI, Parallam, etc.)
   - Mineral-fibre batt (not Rockwool, Roxul)
   - OSB (APA-rated; do not name manufacturer)
   - SIP panel (generic — cite CCMC evaluation of panel type, not brand)
   - Helical pier (not Techno-Pieux, Postech)
   - HDG helical screw pile (CCMC reference only)
   - Mini-split heat pump (not Mitsubishi/Daikin)
   - HRV (not Venmar/Lifebreath)

3. **Code references — use these exactly:**
   - `OBC 9.12.2.2` — Foundations below frost line; cite **Table 9.12.2.2** for site-specific depth.
   - `OBC 9.15.1.3` — Alternative/engineered foundations.
   - `OBC 9.23.6` — Anchorage of the building to foundation.
   - `OBC 9.25.3` — Air barrier systems.
   - `OBC 9.25.4` — Vapour barriers on warm-in-winter side.
   - `OBC 9.25.5` — Thermal insulation continuity.
   - `OBC 9.26.1` — Roofing materials.
   - `OBC 9.26.4` — Low-slope roofing.
   - `OBC 9.26.6` — Flashing.
   - `OBC 9.32.3` — Mechanical ventilation (HRV).
   - `OBC 9.33` — Heating and air-conditioning.
   - `OBC 9.36.2.6 / 9.36.2.8` — Effective thermal resistance, Climate Zone 6.
   - `OBC 9.10.9.14 / 9.10.9.16` — Fire separations between dwelling units.
   - `OBC 9.8.10` — Handrails.
   - `OBC 9.8.3` — Stair dimensions.
   - `CSA A440.2` — Window/door energy performance.
   - `CSA G40.21 350W` — Structural steel grade.
   - `CSA G164` — Hot-dip galvanizing.
   - `CSA W47.1 / W59` — Welding qualification.
   - `CSA O437` — OSB.
   - `CSA F326` — HRV airflow.
   - `CCMC xxxxx-R` — cite as "reference evaluation; verify active listing" — never state as actively listed without verification.

4. **Site-specific values get `[TBD per Site Engineer]`:**
   - Frost depth (use `[1.2–1.8 m per OBC 9.12.2.2 Table; confirm site]` instead of a single number).
   - Geotechnical bearing capacity.
   - Lift-eye SWL.
   - Final fastener schedule if structurally governed.

5. **Never state `U = λ`.** Conductivity (W/m·K) and U-value (W/m²·K) are different quantities.

6. **Torque/capacity for helical piers:**
   - Use generic torque-to-capacity correlation factor `Kt` per AC358 / ICC-ES guidance; flag `Kt = [TBD per geotech / pile manufacturer]` rather than fixing Kt=10.
   - Common specifier: *"Ø 73 mm shaft, torque-to-capacity factor Kt per CCMC-listed pile evaluation"*.

---

## 13. Content-area layout patterns (by sheet type)

### Section details (S-101, A-201, A-301, A-302, A-303, A-304, A-305, A-306, A-401)
- Primary section on left (x ≈ 60–320), vertical axis.
- Keynote legend on right-center of drawing (x ≈ 370–550, y ≈ 60–400).
- Dimensions between section and keynote legend.
- Banner at top reads `SECTION A-A` or `DETAIL 01`.

### Plan drawings (S-201 floor plan, S-301 chassis plan, P-501 rough-in plan, M-602 duct plan)
- Plan occupies x ≈ 40–520, y ≈ 50–480.
- Legend and keynotes below or in a small box inside the drawing area.
- **North arrow allowed** at x=55 y=65 r=16.

### Elevation (A-303 door, A-402 stair)
- Elevation on left, cross-section inset on right.
- Both in the drawing area; one banner per view with sub-scales.

---

## 14. Sheet-by-sheet content spec (what each sheet MUST contain)

| # | Sheet | View | Must show | Key callouts |
|---|---|---|---|---|
| 01 | S-101 | Section | Saddle cap, Ø73 mm shaft, break line, helix plate Ø254 mm, earth + grade, frost datum, embedment dim | 1 Saddle cap · 2 HDG shaft · 3 Break · 4 Helix · 5 Frost · 6 Embedment |
| 02 | S-201 | Section + partial plan | I-joist section A-A, rim joist, blocking, span, spacing | 1 Joist · 2 Rim · 3 Blocking · 4 Subfloor · 5 Span · 6 Spacing |
| 03 | A-201 | Section | Full subfloor stackup from finish down to soffit, R-value, VB | 1 LVP · 2 OSB subfloor · 3 Poly VB · 4 Joist · 5 Mineral batt · 6 Gyp soffit |
| 04 | S-301 | Section + plan | HSS chassis cross-section, outriggers, weld callouts, lift-eye location | 1 HSS perimeter · 2 Outrigger · 3 Weld · 4 Lift eye · 5 Anchor to pier · 6 Bolt schedule |
| 05 | A-301 | Section | 6.5" SIP panel with EPS core, OSB skins, spline, top/bottom plate | 1 OSB skin · 2 EPS core · 3 Spline · 4 Plate · 5 Fastener · 6 Sealant |
| 06 | A-302 | Section (head/jamb/sill, 3 sub-details) | Triple-pane IGU, thermal break, flashing, sill pan | 1 IGU · 2 Frame · 3 Thermal break · 4 Head flashing · 5 Sill pan · 6 Sealant |
| 07 | A-303 | Elevation + plan section | Door, threshold, head, hinge side, knock-down jamb | 1 Door slab · 2 Weather strip · 3 Threshold · 4 Sill pan · 5 Head flashing · 6 Lock |
| 08 | A-304 | Section | 10.25" Roof SIP, membrane edge, drip, termination | 1 OSB skin · 2 EPS core · 3 Membrane · 4 Drip edge · 5 Termination bar · 6 Fastener |
| 09 | A-305 | Section | Parapet framing, continuous membrane, coping, blocking | 1 Blocking · 2 Membrane turn-up · 3 Coping · 4 Fastener · 5 Backer rod/sealant · 6 Drip |
| 10 | A-306 | Section | Perimeter skirt, vent louver, insulation, termination | 1 Panel · 2 Louver · 3 Flashing · 4 Insulation · 5 Anchor · 6 Screed |
| 11 | A-401 | Section | Interior partition: studs, STC insulation, gyp both sides | 1 Stud · 2 Top plate · 3 Bottom plate · 4 Insulation · 5 Gyp · 6 Fastener |
| 12 | P-501 | Plan | Bathroom plumbing rough-in: WC, lav, tub/shower, supply/waste | 1 WC rough · 2 Lav · 3 Tub · 4 Vent stack · 5 Supply manifold · 6 Cleanout |
| 13 | A-402 | Elevation | Entry stair, riser/tread, handrail, landing | 1 Stringer · 2 Riser · 3 Tread · 4 Handrail · 5 Guard · 6 Landing |
| 14 | M-601 | Plan + elevation | Mini-split outdoor unit, wall mount, line-set, condensate | 1 Outdoor unit · 2 Line-set · 3 Condensate drain · 4 Mount bracket · 5 Penetration · 6 Electrical |
| 15 | M-602 | Plan | HRV unit, supply/return, ducts, balance damper | 1 HRV · 2 Supply · 3 Return · 4 Exhaust · 5 Intake · 6 Damper |

---

## 15. Agent self-check before returning a sheet

Before finalizing, verify:

- [ ] `<svg viewBox="0 0 900 620">` and no other viewBox.
- [ ] Outer border `x=8 y=8 w=884 h=604 stroke-width=2`.
- [ ] Title block at `x=580 y=30 w=300 h=560`.
- [ ] Drawing banner present at top of drawing area.
- [ ] Circled-number keynotes with a legend (not `[1]` brackets).
- [ ] Leaders land on element edges with 1.5-radius dots.
- [ ] No north arrow on section/elevation sheets.
- [ ] Scale bar present, matches sheet scale.
- [ ] All U-values math-checked: `U = 1/(R_imp × 0.1761)`.
- [ ] No brand names.
- [ ] OBC references specific and correctly cited.
- [ ] `[TBD per Site Engineer]` for site-specific values.
- [ ] Break line is a proper zig-zag, not a scribble.
- [ ] Grade/CL/F.F. use SVG glyphs, not Unicode that may not render.
- [ ] Drawing area uses the full x=30–560 range; no large empty regions in upper/lower half.
- [ ] `<details>` bullet list accurate to the drawing.
- [ ] Tech note references accurate.
