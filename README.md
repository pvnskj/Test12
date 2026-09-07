# Venkata Parimi — Systems Portfolio

A static-first Astro portfolio for Venkata Parimi, focused on senior Technical Product Ownership across enterprise systems, workflow platforms, data integrity, rules-driven products, and measurable operating value.

## Design direction

- One type family throughout the product: Inter.
- White/off-white editorial canvas with restrained blue information accents.
- Glass surfaces are used for hierarchy and information layering rather than decoration.
- Product infographics and system models are built primarily with semantic HTML, CSS, and SVG.
- Motion explains state and relationships and respects `prefers-reduced-motion`.
- The core site does not depend on Three.js.

## Public portfolio model

The public portfolio currently presents seven representative initiatives from a broader body of work:

- Asset Catalog
- Inventory & Asset Lifecycle
- RFDS Automation
- Inspection & Predictive Maintenance
- Dynamic GL Coding
- Order & Fulfillment Management
- Financial Projection Platform

The first five are the primary representative stories. They are intentionally presented as examples of different classes of Product Ownership rather than as a count of all work completed.

Peer-to-Peer Transactions and Asset & Portfolio Management are not exposed as public portfolio routes. Their historical repository material remains in Git history/source artifacts where applicable.

## Interactive project experience

Project stories use a compact workspace rather than long-form case-study pages:

- Persistent desktop project rail and compact mobile project switcher.
- Four progressive story views: Overview, Product model, Decisions, and Value.
- One primary infographic per initiative.
- Deeper Product Backlog ordering, dependencies, uncertainty, and complexity are progressively disclosed.
- Astro client-side view transitions make project-to-project navigation feel continuous.

## Content integrity

- The Asset & Portfolio Management whitepaper in the source repository contains Financial Projections content, so it is not promoted as supporting evidence.
- The Order Fulfillment impact page explicitly labels itself as placeholder material, so quantitative impact claims are withheld until validated.
- Placeholder contact values (`me@example.com` and `#` for LinkedIn) are not published. GitHub remains the verified contact destination until real details are confirmed.

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

GitHub Pages deployment is enabled from `main` through the Astro Pages workflow. Production changes are merged only after the quality workflow passes and deployment is explicitly intended.
