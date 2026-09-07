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

const flagshipStories = [
  {
    path: './work/asset-catalog/',
    heading: /trust as a product state/i,
    visual: '.v5-asset-model',
  },
  {
    path: './work/inventory/',
    heading: /did not force one source of truth/i,
    visual: '.v5-inventory-model',
  },
  {
    path: './work/rfds/',
    heading: /engineering knowledge trapped in spreadsheets/i,
    visual: '.v5-rfds-model',
  },
  {
    path: './work/inspection/',
    heading: /shifted the product goal from completing inspections/i,
    visual: '.v5-inspection-model',
  },
  {
    path: './work/gl-coding/',
    heading: /separated changing accounting policy/i,
    visual: '.v5-gl-model',
  },
];

test('homepage presents selected initiatives as evidence from a broader product portfolio', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('complex systems');
  await expect(page.getByRole('heading', { name: /Representative work from a broader product portfolio/i })).toBeVisible();
  await expect(page.getByText(/They are examples of how I operate—not a count of everything I have owned/i)).toBeVisible();
  await expect(page.getByText(/Five flagship stories/i)).toHaveCount(0);
  await expect(page.locator('.archive-row')).toHaveCount(expectedProjects.length);

  for (const project of expectedProjects) {
    await expect(page.locator('.archive-row', { hasText: project })).toBeVisible();
  }

  await expect(page.getByText('Peer-to-Peer Transactions')).toHaveCount(0);
  await expect(page.getByText('Asset & Portfolio Management')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('homepage-v5.png'), fullPage: true });
});

test('project workspace defaults to a concise overview and reveals deeper stages on demand', async ({ page }) => {
  await page.goto('./work/asset-catalog/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('trust as a product state');
  await expect(page.locator('.v5-project-rail .v5-project-link')).toHaveCount(expectedProjects.length);
  await expect(page.locator('[data-story-panel="overview"]')).toBeVisible();
  await expect(page.locator('[data-story-panel="model"]')).toBeHidden();
  await expect(page.locator('.v5-asset-model')).toBeHidden();

  await page.getByRole('tab', { name: /Product model/i }).click();
  await expect(page.locator('[data-story-panel="model"]')).toBeVisible();
  await expect(page.locator('.v5-asset-model')).toBeVisible();

  await page.getByRole('tab', { name: /Decisions/i }).click();
  await expect(page.getByRole('heading', { name: 'The decisions are the story.' })).toBeVisible();
  await expect(page.getByText('Explore the deeper product reasoning')).toBeVisible();
});

test('the flagship initiatives use distinct senior-level stories and infographic models', async ({ page }) => {
  for (const story of flagshipStories) {
    await page.goto(story.path);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(story.heading);
    await page.getByRole('tab', { name: /Product model/i }).click();
    await expect(page.locator(story.visual)).toBeVisible();
  }
});

test('persistent project switcher moves between stories without returning to the homepage', async ({ page }, testInfo) => {
  await page.goto('./work/asset-catalog/');
  await page.locator('.v5-project-rail .v5-project-link', { hasText: 'Inventory & Asset Lifecycle' }).click();
  await expect(page).toHaveURL(/\/work\/inventory\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('did not force one source of truth');

  await page.locator('.v5-project-rail .v5-project-link', { hasText: 'RFDS Automation' }).click();
  await expect(page).toHaveURL(/\/work\/rfds\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('engineering knowledge trapped in spreadsheets');
  await page.screenshot({ path: testInfo.outputPath('rfds-workspace-v5.png'), fullPage: true });
});

test('mobile workspace uses full viewport and replaces desktop rail with a compact project switcher', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./work/asset-catalog/');

  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.getBoundingClientRect().width,
    workspaceWidth: document.querySelector('.v5-workspace')?.getBoundingClientRect().width ?? 0,
    canvasWidth: document.querySelector('.v5-project-canvas')?.getBoundingClientRect().width ?? 0,
  }));

  expect(dimensions.viewport).toBe(390);
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(391);
  expect(dimensions.bodyWidth).toBeGreaterThan(385);
  expect(dimensions.workspaceWidth).toBeGreaterThan(385);
  expect(dimensions.canvasWidth).toBeGreaterThan(350);
  await expect(page.locator('.v5-project-rail')).toBeHidden();
  await expect(page.locator('.v5-mobile-project-switcher')).toBeVisible();

  await page.getByRole('tab', { name: /Product model/i }).click();
  await expect(page.locator('.v5-asset-model')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('asset-catalog-mobile-v5.png'), fullPage: true });
});

test('order fulfillment keeps unvalidated quantitative evidence out of the public claim set', async ({ page }) => {
  await page.goto('./work/order-fulfillment/');
  await page.getByRole('tab', { name: /Value/i }).click();
  await expect(page.getByText(/Quantitative claims are intentionally withheld/i)).toBeVisible();
  await expect(page.locator('.v5-order-model')).toBeHidden();
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

test('reduced motion keeps the interactive project story readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./work/inspection/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('tab', { name: /Product model/i }).click();
  await expect(page.locator('.v5-inspection-model')).toBeVisible();
});
