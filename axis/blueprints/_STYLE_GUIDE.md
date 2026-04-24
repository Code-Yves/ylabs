# Axis Modular SIP Series — Blueprint Sheet Style Guide

**Every sheet MUST follow this exact spec so all 15 drawings read as one drawing set.**

## File naming

`<code>-<slug>.html` at the root of `/blueprints/`. Examples:
- `S-101-piers.html`
- `A-201-subfloor.html`
- `M-602-hrv.html`

## HTML skeleton (every file uses this shell verbatim)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Axis Modular — {SHEET NO.} — {DETAIL TITLE}</title>
<style>
  :root { --ink:#1a1a1a; --accent:#0b3d91; --stamp:#9c2a2a; --rule:#d0d0d0; --bg:#f4f4ee; }
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
    <div class="meta">Rev. 01 · 2026-04-18 · <span style="color:var(--stamp);font-weight:600;">ISSUED FOR CONSTRUCTION</span></div>
  </header>

  <svg class="sheet" viewBox="0 0 900 620" xmlns="http://www.w3.org/2000/svg" aria-label="{SHEET NO.} {DETAIL TITLE}">
    <!-- SVG content per spec below -->
  </svg>

  <details open>
    <summary>{SHEET NO.}: {one-line summary with the key metric} · Expand for full spec</summary>
    <ul>
      <!-- bullet spec list -->
    </ul>
  </details>

  <section class="tech-note">
    <h3 style="margin:0 0 .3rem;font-size:.9rem;">Technical Note — Code &amp; Reference</h3>
    <ul style="margin:0 0 0 1rem;padding:0;">
      <!-- OBC, CSA, CCMC references -->
    </ul>
  </section>
</div>
</body>
</html>
```

## SVG layout spec (all sheets use `viewBox="0 0 900 620"`)

| Region | Coordinates | Contents |
|---|---|---|
| Outer border | `x=10 y=10 w=880 h=600` | `stroke-width="1.5"` |
| Main drawing area | `x=30-560 y=30-590` | Detail, callouts, dimensions, hatches |
| Title block | `x=580-870 y=30-590` | Fixed layout, see below |
| North arrow | `x≈85 y≈540-560` | Circle Ø 40 with N-pointing triangle |
| Scale bar | `x≈180-320 y≈568-590` | Alternating black/white blocks |

## Title block (identical on every sheet — change only the DETAIL TITLE, SHEET NO., SCALE, and KEY NOTES)

```svg
<rect x="580" y="30" width="300" height="560" fill="#fff" stroke="#1a1a1a" stroke-width="1.5"/>

<!-- Issued for Construction stamp -->
<g transform="translate(592,45)">
  <rect x="0" y="0" width="150" height="40" fill="none" stroke="#9c2a2a" stroke-width="1.5"/>
  <text x="75" y="17" font-family="Arial" font-size="10" font-weight="bold" fill="#9c2a2a" text-anchor="middle">ISSUED FOR</text>
  <text x="75" y="32" font-family="Arial" font-size="12" font-weight="bold" fill="#9c2a2a" text-anchor="middle">CONSTRUCTION</text>
</g>
<text x="755" y="55" font-family="Arial" font-size="9" fill="#1a1a1a">Rev: 01</text>
<text x="755" y="70" font-family="Arial" font-size="9" fill="#1a1a1a">2026-04-18</text>

<line x1="590" y1="100" x2="870" y2="100" stroke="#1a1a1a" stroke-width="0.8"/>
<text x="600" y="124" font-family="Arial" font-size="10" font-weight="bold">PROJECT</text>
<text x="600" y="141" font-family="Arial" font-size="12">AXIS MODULAR — SIP SERIES</text>
<text x="600" y="155" font-family="Arial" font-size="9" fill="#555">42' × 12' · ≈504 SF · 1 BDRM · Grid-Connected</text>

<line x1="590" y1="168" x2="870" y2="168" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="188" font-family="Arial" font-size="10" font-weight="bold">DETAIL</text>
<text x="600" y="205" font-family="Arial" font-size="12">{DETAIL TITLE}</text>
<text x="600" y="219" font-family="Arial" font-size="10" fill="#555">{Component category · Section ##}</text>

<line x1="590" y1="233" x2="870" y2="233" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="253" font-family="Arial" font-size="10" font-weight="bold">KEY NOTES</text>
<!-- Up to 6 lines of short key notes, 9px text, starting y=270, +13px per line -->
<text x="600" y="270" font-family="Arial" font-size="9">1. {note}</text>
<text x="600" y="283" font-family="Arial" font-size="9">2. {note}</text>
<text x="600" y="296" font-family="Arial" font-size="9">3. {note}</text>
<text x="600" y="309" font-family="Arial" font-size="9">4. {note}</text>

<line x1="590" y1="360" x2="870" y2="360" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="380" font-family="Arial" font-size="10" font-weight="bold">DRAWN BY</text>
<text x="600" y="395" font-family="Arial" font-size="10">AXIS — BIM / AT</text>
<text x="600" y="420" font-family="Arial" font-size="10" font-weight="bold">CHECKED BY</text>
<text x="600" y="435" font-family="Arial" font-size="10">LMB, P.Eng. — [stamp]</text>

<line x1="590" y1="450" x2="870" y2="450" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="475" font-family="Arial" font-size="10" font-weight="bold">SCALE</text>
<text x="665" y="475" font-family="Arial" font-size="10">{SCALE}</text>
<text x="600" y="495" font-family="Arial" font-size="10" font-weight="bold">SHEET</text>
<text x="665" y="495" font-family="Arial" font-size="10">{SHEET NO.}</text>
<text x="600" y="515" font-family="Arial" font-size="10" font-weight="bold">PROJECT NO.</text>
<text x="680" y="515" font-family="Arial" font-size="10">2026-042</text>

<line x1="590" y1="530" x2="870" y2="530" stroke="#1a1a1a" stroke-width="0.5"/>
<text x="600" y="550" font-family="Arial" font-size="8" fill="#555">© 2026 Axis Modular Homes</text>
<text x="600" y="563" font-family="Arial" font-size="8" fill="#555">All dimensions in mm U.N.O.</text>
<text x="600" y="576" font-family="Arial" font-size="8" fill="#555">Drop &amp; Go modular chassis</text>
```

## Shared SVG `<defs>` block (paste into every sheet's `<defs>`)

```svg
<defs>
  <!-- Earth: 45° diagonal lines -->
  <pattern id="earth" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="10" stroke="#5a4a2e" stroke-width="0.5"/>
  </pattern>
  <!-- Steel cross-hatch -->
  <pattern id="steelXH" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="6" stroke="#333" stroke-width="0.45"/>
    <line x1="0" y1="0" x2="6" y2="0" stroke="#333" stroke-width="0.45"/>
  </pattern>
  <!-- Insulation squiggle -->
  <pattern id="insulSquig" patternUnits="userSpaceOnUse" width="16" height="14">
    <path d="M 0 7 Q 4 0 8 7 T 16 7" stroke="#1a1a1a" stroke-width="0.6" fill="none"/>
  </pattern>
  <!-- Wood grain -->
  <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="22" height="7">
    <line x1="0" y1="3" x2="22" y2="3" stroke="#8a5a2b" stroke-width="0.4"/>
    <path d="M 0 5 Q 5 6 10 5 T 22 5" stroke="#8a5a2b" stroke-width="0.3" fill="none"/>
  </pattern>
  <!-- Concrete: dots + triangles -->
  <pattern id="concrete" patternUnits="userSpaceOnUse" width="18" height="18">
    <circle cx="4" cy="4" r="0.9" fill="#666"/>
    <circle cx="13" cy="11" r="0.6" fill="#666"/>
    <polygon points="8,14 11,14 9.5,11" fill="#666"/>
  </pattern>
  <!-- Gypsum (light stipple) -->
  <pattern id="gyp" patternUnits="userSpaceOnUse" width="5" height="5">
    <circle cx="1" cy="1" r="0.3" fill="#aaa"/>
    <circle cx="3.5" cy="3" r="0.25" fill="#aaa"/>
  </pattern>
  <!-- Arrowhead marker -->
  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a"/>
  </marker>
</defs>
```

## Linework rules

- **Structural outlines** (HSS, SIP skins, rim beams): `stroke-width="2"` to `2.5"`.
- **Dimension lines, leader lines, hatching**: `stroke-width="0.5"` (light).
- **Break lines**: zig-zag with `stroke-width="0.8"`.
- **Dashed callouts / frost line**: `stroke-dasharray="6 3"`.

## Callout pattern

```svg
<line x1="{origin_x}" y1="{origin_y}" x2="{label_x - 5}" y2="{label_y}" stroke="#1a1a1a" stroke-width="0.5"/>
<circle cx="{origin_x}" cy="{origin_y}" r="2.4" fill="#1a1a1a"/>
<text x="{label_x}" y="{label_y}" font-family="Arial" font-size="11" font-weight="600">{HEADLINE}</text>
<text x="{label_x}" y="{label_y + 13}" font-family="Arial" font-size="9" fill="#555">{detail}</text>
```

## Dimension pattern

```svg
<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#1a1a1a" stroke-width="0.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
<!-- small tick marks at ends, 90° to the dim line -->
<text x="{mid}" y="{y1 - 5}" font-family="Arial" font-size="10" text-anchor="middle">{mm value}</text>
```

## Symbology

- `▽` for grade / finished floor.
- `Ø` for diameter.
- `CL` centered above element with short dashed vertical tick.
- Break line: zig-zag 6-wave pattern.

## Scale bar (bottom-left of drawing area)

```svg
<g transform="translate(180,570)">
  <text x="60" y="-4" font-family="Arial" font-size="9" text-anchor="middle">SCALE {X : X}</text>
  <rect x="0" y="0" width="30" height="5" fill="#1a1a1a"/>
  <rect x="30" y="0" width="30" height="5" fill="#fff" stroke="#1a1a1a" stroke-width="0.4"/>
  <rect x="60" y="0" width="30" height="5" fill="#1a1a1a"/>
  <text x="-3" y="18" font-family="Arial" font-size="8">0</text>
  <text x="25" y="18" font-family="Arial" font-size="8">100</text>
  <text x="55" y="18" font-family="Arial" font-size="8">200</text>
  <text x="83" y="18" font-family="Arial" font-size="8">300 mm</text>
</g>
```

## North arrow

```svg
<g transform="translate(85,555)">
  <circle cx="0" cy="0" r="18" fill="none" stroke="#1a1a1a" stroke-width="1"/>
  <polygon points="0,-16 -5,10 0,5 5,10" fill="#1a1a1a"/>
  <text x="0" y="-22" font-family="Arial" font-size="9" text-anchor="middle">N</text>
</g>
```

## Data accuracy rules

- Cite **OBC 2024** sections (e.g., `OBC 9.12.2.2`, `OBC 9.36.2.6`).
- Use `CCMC xxxxx-R` where applicable — mark as "reference" if not verified for a specific manufacturer.
- Use standard industry ranges; if unknown, write `[TBD per Site Engineer]`.
- Never hallucinate values.

## Sheet numbering (use these exactly)

| # | Sheet no. | Component | Detail title | Scale |
|---|-----------|-----------|--------------|-------|
| 01 | S-101 | PIERS | Helical Pier — Typical | 1 : 25 |
| 02 | S-201 | JOISTS | Floor Joist Framing — Plan & Section | 1 : 20 |
| 03 | A-201 | SUBFLOOR | Subfloor Deck — Section | 1 : 5 |
| 04 | S-301 | STEEL | Steel Chassis — Plan & Section | 1 : 20 |
| 05 | A-301 | SIP WALLS | SIP Wall Panel & Spline — Detail | 1 : 5 |
| 06 | A-302 | WINDOWS | Window Head / Jamb / Sill | 1 : 5 |
| 07 | A-303 | DOOR | Exterior Door Head & Threshold | 1 : 5 |
| 08 | A-304 | ROOF | Roof SIP Section & Membrane Edge | 1 : 5 |
| 09 | A-305 | PARAPET | Parapet Cap & Coping | 1 : 5 |
| 10 | A-306 | SKIRTING | Perimeter Skirting — Section | 1 : 10 |
| 11 | A-401 | INTERIOR | Interior Partition — Section | 1 : 5 |
| 12 | P-501 | FIXTURES | Bathroom Plumbing Rough-In | 1 : 20 |
| 13 | A-402 | STAIRS | Entry Step & Handrail | 1 : 10 |
| 14 | M-601 | MINI-SPLIT | Mini-Split Head & Line-Set | 1 : 10 |
| 15 | M-602 | HRV | HRV Unit & Duct Routing | 1 : 20 |
