# Venkata Parimi — Systems Portfolio

A static-first Astro portfolio for Venkata Parimi, focused on senior Technical Product Ownership across enterprise orchestration, AI analysis, supply-chain platforms, engineering automation, financial routing, and governed operational workflows.

## Design direction

- One type family throughout the product: Inter.
- White/off-white editorial canvas with restrained blue information accents.
- Glass surfaces are used for hierarchy and information layering rather than decoration.
- Product infographics and system models are built primarily with semantic HTML, CSS, and SVG.
- Motion explains state and relationships and respects `prefers-reduced-motion`.
- The core site does not depend on Three.js.

## Public portfolio model

The public portfolio currently presents six flagship initiatives in this order:

1. Enterprise Order Management
2. Enterprise RAG Analysis Agent
3. Build Plus
4. RFDS Automation
5. Dynamic GL Coding
6. Lease & Vendor Management

The sequence is intentional: platform architecture and orchestration first, then AI, enterprise supply-chain transformation, engineering automation, configurable financial routing, and lease-to-pay financial controls.

Build Plus is the umbrella case study for the broader asset and supply-chain transformation. It incorporates the strongest source-backed material from the former standalone Asset Catalog, Inventory & Asset Lifecycle, and Order/Fulfillment stories rather than presenting those connected capabilities as unrelated projects.

Historical source artifacts remain in the repository and under `public/deep-dives/` where applicable, but they are treated as source material rather than the public information architecture.

## Interactive project experience

Project stories use a compact dashboard designed for a 60–90 second first read:

- Persistent project switcher with previous/next navigation.
- One primary product-system infographic per initiative.
- Product goal, major decisions, delivery sequence, evidence-qualified proof points, and deeper reasoning on one screen.
- Detailed problem framing, ownership, tradeoffs, increments, flows, and evidence remain in the canonical structured project data.
- Astro client-side view transitions make project-to-project navigation feel continuous.

## Content integrity

Evidence is intentionally separated by type rather than normalized into generic KPI language. The portfolio distinguishes measured results, observed adoption/scale, projected benefits or capacity, estimated comparisons, implemented controls, and stakeholder-supported outcomes.

Examples:

- Enterprise Order Management: the 20% mapping improvement is measured; 75K orders/day is a projected capacity target.
- Enterprise RAG Analysis Agent: the ~6-day to ~2-hour investigation-cycle improvement is measured; golden-set accuracy claims are limited to the 25+ case evaluation suite.
- Build Plus: 10,040 annual hours is a program-level projected LOB Level 7 benefit and is not double-counted across sub-initiatives.
- RFDS: cost avoidance, generation time, exception-rate improvement, and 1,000+ monthly designs are presented as measured/observed production outcomes.
- Dynamic GL Coding: the 40% faster close is measured; the 2–3 month to under-one-week enablement comparison remains explicitly estimated.
- Lease & Vendor Management: the $23.7M monthly rent roll is actual operating scale; ~2x ROI remains an estimated business-case result.

Placeholder contact values (`me@example.com` and `#` for LinkedIn) are not published. GitHub remains the verified contact destination until real details are confirmed.

## Stack

- Astro 7
- TypeScript
- `@astrojs/sitemap`
- ESLint + `eslint-plugin-astro` + `typescript-eslint`
- Prettier + `prettier-plugin-astro`
- Playwright
- `@axe-core/playwright`

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run check
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

`npm test` runs the complete quality chain.

## Deployment

GitHub Pages deployment is enabled from `main` through the Astro Pages workflow. The separate quality workflow is configured for pull requests and `redesign/**` pushes; route and accessibility tests in this repository are kept aligned with the six public flagship projects.
