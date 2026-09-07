# Venkata Parimi — Systems Portfolio

This branch contains the second-generation portfolio redesign for Venkata Parimi. It treats the existing `Test12` repository as the canonical source and preserves its project artifacts while replacing the dark Three.js landing experience with a static-first, white editorial glass interface built around systems storytelling.

## Design direction

- One type family throughout the product: Inter.
- White/off-white editorial canvas with restrained blue information accents.
- Glass surfaces are used for hierarchy, not as decoration.
- System diagrams and infographics are built primarily with semantic HTML, CSS, and SVG.
- Motion is progressive enhancement and respects `prefers-reduced-motion`.
- The core site does not depend on Three.js.

## Projects retained

All nine project families currently present in `Test12` remain accessible: Asset Catalog, RFDS, Inspection, GL Coding, Inventory, Asset & Portfolio Management, Financial Projections, Peer-to-Peer Transactions, and Order Fulfillment. Existing impact pages and whitepapers are preserved under `public/deep-dives/` as source artifacts.

Two source-quality guardrails are intentionally visible in the redesign:

1. The Asset & Portfolio Management whitepaper in the current repository contains Financial Projections content, so it is archived for review but not promoted as supporting evidence.
2. The Order Fulfillment impact page explicitly calls itself a placeholder deck, so its quantitative impact claims are withheld from the redesigned case study pending validation.

The current repository also contains placeholder contact links (`me@example.com` and `#` for LinkedIn). The redesign does not publish them. GitHub is the only contact destination shown until real contact details are confirmed.

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

Production deployment is deliberately disabled in this redesign branch. The previous automatic Jekyll Pages workflow has been replaced with a deployment guard. No production deployment should be added or run until explicitly approved.
