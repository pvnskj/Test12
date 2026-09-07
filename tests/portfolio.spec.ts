import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const expectedProjects = [
  'Asset Catalog',
  'RFDS',
  'Inspection',
  'GL Coding',
  'Inventory',
  'Asset & Portfolio Management',
  'Financial Projections',
  'Peer-to-Peer Transactions',
  'Order Fulfillment',
];

test('homepage communicates the positioning and retains every project', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turning complexity');
  await expect(page.locator('.archive-row')).toHaveCount(expectedProjects.length);
  for (const project of expectedProjects) {
    await expect(page.locator('.archive-row', { hasText: project })).toBeVisible();
  }
  await expect(page.getByText('Email and LinkedIn are intentionally withheld')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
});

test('featured work opens a complete RFDS case study', async ({ page }, testInfo) => {
  await page.goto('./');
  await page.locator('.project-card', { hasText: 'RFDS' }).getByRole('link', { name: /View case study/i }).click();
  await expect(page).toHaveURL(/\/work\/rfds\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('RFDS');
  await expect(page.getByText('72%')).toBeVisible();
  await expect(page.getByText('Faster approval cycles')).toBeVisible();
  await expect(page.getByRole('link', { name: /Open impact source/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Open whitepaper/i })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('rfds-case-study.png'), fullPage: true });
});

test('source-review projects are retained without overstating evidence', async ({ page }) => {
  await page.goto('./work/order-fulfillment/');
  await expect(page.getByText('Quantitative impact withheld')).toBeVisible();
  await expect(page.getByText(/placeholder material/i)).toBeVisible();
  await page.goto('./work/asset-portfolio-management/');
  await expect(page.getByText('Whitepaper withheld')).toBeVisible();
  await expect(page.getByText(/does not match this project/i)).toBeVisible();
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

test('navigation and deep-dive artifacts resolve', async ({ page, request }) => {
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
