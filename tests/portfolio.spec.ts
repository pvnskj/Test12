import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const expectedProjects = [
  'Asset Catalog',
  'Inventory & Asset Lifecycle',
  'RFDS Automation',
  'Inspection & Predictive Maintenance',
  'Dynamic GL Coding',
  'Order & Fulfillment Management',
  'Financial Projection Platform',
];

test('homepage positions Venkata as an end-to-end senior TPO', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('complex systems');
  await expect(page.getByRole('heading', { name: /My expertise is in the seams/i })).toBeVisible();
  await expect(page.getByText(/I do not use one framework for every situation/i)).toBeVisible();
  await expect(page.locator('.archive-row')).toHaveCount(expectedProjects.length);

  for (const project of expectedProjects) {
    await expect(page.locator('.archive-row', { hasText: project })).toBeVisible();
  }

  await expect(page.getByText('Peer-to-Peer Transactions')).toHaveCount(0);
  await expect(page.getByText('Asset & Portfolio Management')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('homepage-v4.png'), fullPage: true });
});

test('flagship stories have distinct narrative structures and infographic systems', async ({ page }) => {
  const stories = [
    {
      path: './work/asset-catalog/',
      heading: /submitted request was not the same thing as a trusted enterprise asset/i,
      nav: 'Trust gap',
      visual: '.v4-friction-map',
    },
    {
      path: './work/inventory/',
      heading: /Five systems could each be correct/i,
      nav: 'Fractured truth',
      visual: '.v4-truth-orbit',
    },
    {
      path: './work/rfds/',
      heading: /spreadsheet was visible/i,
      nav: 'Knowledge model',
      visual: '.v4-knowledge-pipeline',
    },
    {
      path: './work/inspection/',
      heading: /goal was not more inspections/i,
      nav: 'Maturity',
      visual: '.v4-maturity-rail',
    },
    {
      path: './work/gl-coding/',
      heading: /Business policy was evolving faster/i,
      nav: 'Code anatomy',
      visual: '.v4-code-anatomy',
    },
  ];

  for (const story of stories) {
    await page.goto(story.path);
    await expect(page.getByRole('heading', { name: story.heading })).toBeVisible();
    await expect(page.getByRole('link', { name: story.nav })).toBeVisible();
    await expect(page.locator(story.visual)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Seniority shows up in the choices/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: /Order work to create value and reduce uncertainty/i })).toHaveCount(0);
  }
});

test('RFDS story drives the narrative with multiple infographics and preserves evidence', async ({ page }, testInfo) => {
  await page.goto('./work/rfds/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('spreadsheet-based network engineering');
  await expect(page.locator('.v4-before-after')).toBeVisible();
  await expect(page.locator('.v4-knowledge-pipeline')).toBeVisible();
  await expect(page.locator('.v4-automation-boundary')).toBeVisible();
  await expect(page.locator('.v4-risk-rail')).toBeVisible();
  await expect(page.getByText('72%').first()).toBeVisible();
  await expect(page.getByText('Faster approval cycles').first()).toBeVisible();
  await expect(page.getByText(/whitepaper/i)).toHaveCount(0);
  await expect(page.getByText(/impact source/i)).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('rfds-v4.png'), fullPage: true });
});

test('mobile case study uses the full viewport and infographics reflow instead of squeezing into a desktop column', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./work/asset-catalog/');

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.getBoundingClientRect().width,
    heroWidth: document.querySelector('.v4-case-hero')?.getBoundingClientRect().width ?? 0,
    storyWidth: document.querySelector('.v4-story')?.getBoundingClientRect().width ?? 0,
  }));

  expect(dimensions.viewport).toBe(390);
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(391);
  expect(dimensions.bodyWidth).toBeGreaterThan(385);
  expect(dimensions.heroWidth).toBeGreaterThan(350);
  expect(dimensions.storyWidth).toBeGreaterThan(385);
  await expect(page.locator('.v4-friction-map')).toBeVisible();
  await expect(page.locator('.v4-lifecycle-lane')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('asset-catalog-mobile-v4.png'), fullPage: true });
});

test('order fulfillment remains honest about unvalidated quantitative evidence', async ({ page }) => {
  await page.goto('./work/order-fulfillment/');
  await expect(page.getByText('Quantitative claims remain withheld.')).toBeVisible();
  await expect(page.locator('.v4-evidence-note').getByText(/placeholder material/i)).toBeVisible();
  await expect(page.locator('.v4-promise-hub')).toBeVisible();
  await expect(page.locator('.v4-exception-tree')).toBeVisible();
});

test('removed public initiatives no longer generate portfolio routes', async ({ request }) => {
  const p2p = await request.get('./work/peer-to-peer-transactions/');
  const assetPortfolio = await request.get('./work/asset-portfolio-management/');
  expect(p2p.status()).toBe(404);
  expect(assetPortfolio.status()).toBe(404);
});

test('homepage and all selected project stories pass automated accessibility scans', async ({ page }) => {
  const paths = [
    './',
    './work/asset-catalog/',
    './work/inventory/',
    './work/rfds/',
    './work/inspection/',
    './work/gl-coding/',
    './work/order-fulfillment/',
    './work/financial-projections/',
  ];

  for (const path of paths) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, `Accessibility violations on ${path}`).toEqual([]);
  }
});

test('navigation works and legacy source artifacts remain available without being public CTAs', async ({ page, request }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Approach' }).first().click();
  await expect(page.locator('#approach')).toBeVisible();
  expect((await request.get('./deep-dives/RFDS-impact.html')).ok()).toBeTruthy();
  expect((await request.get('./deep-dives/RFDS.html')).ok()).toBeTruthy();
});

test('reduced motion remains readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./work/inspection/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('[data-reveal]').first()).toBeVisible();
});
