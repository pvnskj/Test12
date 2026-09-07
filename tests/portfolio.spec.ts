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
  await expect(page.getByText('Email and LinkedIn are intentionally withheld')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
});

test('RFDS case study explains problem, product goal, decisions, increments and value', async ({ page }, testInfo) => {
  await page.goto('./');
  await page.locator('.project-card', { hasText: 'RFDS Automation' }).getByRole('link', { name: /Read the product story/i }).click();
  await expect(page).toHaveURL(/\/work\/rfds\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('spreadsheet-based network engineering');
  await expect(page.getByText(/Reduce the cycle time and operational risk/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: /Seniority shows up in the choices/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Order work to create value and reduce uncertainty/i })).toBeVisible();
  await expect(page.getByText('72%').first()).toBeVisible();
  await expect(page.getByText('Faster approval cycles').first()).toBeVisible();
  await expect(page.getByText(/whitepaper/i)).toHaveCount(0);
  await expect(page.getByText(/impact source/i)).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('rfds-case-study.png'), fullPage: true });
});

test('order fulfillment remains honest about unvalidated quantitative evidence', async ({ page }) => {
  await page.goto('./work/order-fulfillment/');
  await expect(page.getByText('Draft metrics are intentionally not promoted.')).toBeVisible();
  await expect(page.getByText(/placeholder numbers/i)).toBeVisible();
});

test('removed public initiatives no longer generate portfolio routes', async ({ request }) => {
  const p2p = await request.get('./work/peer-to-peer-transactions/');
  const assetPortfolio = await request.get('./work/asset-portfolio-management/');
  expect(p2p.status()).toBe(404);
  expect(assetPortfolio.status()).toBe(404);
});

test('homepage and RFDS case study pass automated accessibility scan', async ({ page }) => {
  for (const path of ['./', './work/rfds/']) {
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
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('[data-reveal]').first()).toBeVisible();
});
