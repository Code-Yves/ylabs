Axis Modular — Pre-rendered configuration images
==================================================

The "Render" button in the top-right of index.html loads an image from
this folder based on the currently selected configuration.

Expected filenames (one of these extensions, in priority order):
  jpg → jpeg → png → webp

Configurations:
  single.jpg     — 42′ × 12′ · 504 SF · 1 Bed
  stacked.jpg    — 42′ × 12′ · 1,008 SF · 2 Beds (two-story)
  bungalow.jpg   — 42′ × 24′ · 1,008 SF · 2 Beds (side-by-side, open plan)
  duplex.jpg     — 42′ × 24′ · 2,016 SF · 4 Beds (stacked + side-by-side)
  ushape.jpg     — 54′ × 42′ · 1,512 SF · 2 Beds (courtyard)

Recommended export:
  • 1920 × 1440 (4:3) or 1920 × 1280 (3:2) — the modal caps at ~1280 px wide.
  • JPG at 85–90% quality, or WebP for smaller files with equal quality.
  • sRGB color space.

If a file is missing for the current configuration, the modal shows
an empty-state message with the expected filename. No code changes are
needed when you add new files — drop them in and click Render again.
