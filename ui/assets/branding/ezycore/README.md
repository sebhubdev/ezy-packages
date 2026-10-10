# EzyCore — concept 2

Prepared variants based on the selected cyclops concept:

- `ezycore-color.png`: full-color logo on a transparent background.
- `ezycore-dark.png`: soft blue character with ivory and orange lettering on a transparent background, for dark surfaces.
- `ezycore-mono.png`: monochrome logo on a transparent background.
- `ezycore-mascot-dark.png`: standalone blue mascot without the wordmark, used on the SSR template Home.
- `ezycore-mascot-wave.png`: waving mascot without text, used on the SSR Home.
- `favicon.svg`: full blue mascot with antennas, arms and legs, scalable and transparent.
- `favicon.ico`: 16, 32, 48 and 256 px PNG entries.
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon-180.png`, `favicon-256.png`: raster exports.
- `preview.html`: compare the variants and switch backgrounds.

PNG logos are raster adaptations; the favicon SVG is editable vector artwork.
These are the core branding originals. The SSR template contains local copies of
the three logos, standalone mascot and favicon exports, which are copied into each new app by
`create-app`. Existing apps retain their own assets.

When applying the favicon to an app, copy `favicon.svg` to its `public` folder
and set `document.favicon` to `/favicon.svg` in its `app.config.js`.

Dark variant generated with the built-in image tool.
Final edit prompt: recolor only the body, limbs and short antenna to friendly soft
sky blue #83aec7; preserve silhouette, pose, eye and typography, the orange iris
and long antenna, ivory Ezy lettering and orange Core lettering. Keep a transparent
background with no glow or shadow.

All three logos use the lighter regular-weight wordmark. Generated with the
built-in image tool. Typography edit prompt: replace heavy bold EzyCore lettering
with regular geometric sans-serif, approximately halve stroke widths, retain the
character, colors and transparent background. Dark and monochrome variants were
then derived with palette-only edits from the lighter color logo.

Standalone mascot generated with the built-in image tool. Prompt: extract only
the blue cyclops, remove all wordmark text, preserve its pose, eye, limbs and
antennas, center the complete character with transparent padding and no shadow.

Waving mascot generated with the built-in image tool from the shared future
website reference. Prompt: extract only the large central blue mascot waving
hello, preserve its eye, antennas and limbs, remove all website elements, text
and ground shadow, and keep a transparent background.
