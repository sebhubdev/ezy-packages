# Future EzyCore website — visual direction

Saved from the website reference selected on 2026-10-10.

The reference uses a dark charcoal background, white text, orange accents and a
friendly blue cyclops waving hello. The mascot stands above a large centered
"Welcome to EzyCore" headline. "Ezy" is white and "Core" is orange; the header
combines a small standalone mascot with a horizontal wordmark, rather than a
stacked logo with an application name beside it.

## Future website content

- Header navigation: Home, Tools, About Ezy, Docs, and an orange Get Started CTA.
- Hero: waving mascot, welcome headline, short subtitle and primary/secondary CTAs.
- Introductory highlights: Useful Tools, Creative Ideas, Open and Flexible.
- A subtle decorative curve with orange, blue and green accents above the footer.
- Footer: wordmark, "Small beginnings. Big possibilities.", repository/social
  links and a theme control, when those destinations and features are available.

The framework website should explain the core, show real examples, link to its
documentation and provide a working getting-started path. Tools should only appear
when actual tools are available. Avoid inventing repository or social links.

## Current app template

The SSR template takes the visual direction but keeps just Home and About.
Home shows the waving mascot, welcome headline, short subtitle and an About link.
About briefly explains EzyCore and offers a link back home. Both pages use the
same header, footer, dark palette and keyboard focus styles. There is no Tools,
Docs, authentication or feature catalogue in the base template.

The `site` app currently mirrors this base and can become the future presentation
website as the framework develops.

## Assets and implementation references

- Branding: `packages/ui/assets/branding/ezycore`.
- Standalone waving mascot: `ezycore-mascot-wave.png`, adapted from the shared
  reference using the built-in image tool; transparent, with no wordmark.
- Existing standing mascot: `ezycore-mascot-dark.png`.
- Full-character favicon: SVG, PNG and ICO exports in the same branding directory.
- App template: `packages/engine/templates/apps/ssr`.
- Rendered template previews: `packages/engine/templates/previews`.

The original mockup was shared in the conversation. This document records its
layout, palette and planned content; the rendered template previews show the
implemented base, rather than claiming to reproduce the complete future website.
