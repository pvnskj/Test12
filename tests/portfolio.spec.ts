import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const projects = [
  { path: './work/enterprise-order-management/', title: 'Enterprise Order Management' },
  { path: './work/rag-analysis-agent/', title: 'Enterprise RAG Analysis Agent' },
  { path: './work/build-plus/', title: 'Build Plus' },
  { path: './work/rfds/', title: 'RFDS Automation' },
  { path: './work/gl-coding/', title: 'Dynamic GL Coding' },
  { path: './work/lease-vendor-management/', title: 'Lease & Vendor Management' },
];

test('homepage presents all six projects in a compact editorial index', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Complex products. Clear product decisions.');
  await expect(page.locator('.home-hero-guide')).toBeVisible();
  await expect(page.locator('.work-row')).toHaveCount(projects.length);
  await expect(page.locator('.principle-card')).toHaveCount(4);
  await expect(page.getByText('Peer-to-Peer Transactions')).toHaveCount(0);
  await expect(page.getByText('Asset & Portfolio Management')).toHaveCount(0);

  const text = await page.locator('.home-v8').innerText();
  expect(text.length).toBeLessThan(5000);
  await page.screenshot({ path: testInfo.outputPath('homepage-case-study-index.png'), fullPage: true });
});

test('every selected initiative leads with a concise case study instead of a product-model diagram', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(page.locator('.case-shift')).toBeVisible();
    await expect(page.locator('.case-glance')).toBeVisible();
    await expect(page.locator('.decision-card')).toHaveCount(3);
    await expect(page.locator('.case-proof > article')).toHaveCount(3);
    await expect(page.locator('.case-detail')).not.toHaveAttribute('open', '');
    await expect(page.getByText('Product model', { exact: true })).toHaveCount(0);
    await expect(page.locator('.v6-dashboard-grid')).toHaveCount(0);

    const visibleText = await page.locator('.case-v8').innerText();
    expect(visibleText.length, `${project.title} visible text budget`).toBeLessThan(5200);
  }
});

test('full supporting detail preserves the deeper case-study evidence', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.case-detail summary').click();
  await expect(page.locator('.case-detail')).toHaveAttribute('open', '');
  await expect(page.getByText('Senior TPO scope', { exact: true })).toBeVisible();
  await expect(page.getByText('What made this hard', { exact: true })).toBeVisible();
  await expect(page.getByText('Complete decision record', { exact: true })).toBeVisible();
  await expect(page.getByText('What each number actually means', { exact: true })).toBeVisible();
});

test('project switcher moves directly between initiatives', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.case-switcher summary').click();
  await page.locator('.case-switcher nav a', { hasText: 'Enterprise RAG Analysis Agent' }).click();
  await expect(page).toHaveURL(/\/work\/rag-analysis-agent\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enterprise RAG Analysis Agent');
  await expect(page.locator('.case-glance')).toBeVisible();
});

test('all mobile project case studies use the full viewport without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const project of projects) {
    await page.goto(project.path);
    const dims = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      projectWidth: document.querySelector('.case-v8')?.getBoundingClientRect().width ?? 0,
    }));
    expect(dims.viewport).toBe(390);
    expect(dims.scrollWidth).toBeLessThanOrEqual(391);
    expect(dims.bodyWidth).toBeGreaterThan(385);
    expect(dims.projectWidth).toBeGreaterThan(360);
  }

  await page.goto('./work/gl-coding/');
  await page.screenshot({ path: testInfo.outputPath('gl-coding-mobile-case-study.png'), fullPage: true });
});

test('projected and estimated outcomes remain visibly qualified', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.getByText('Projected order capacity', { exact: true })).toBeVisible();

  await page.goto('./work/lease-vendor-management/');
  await expect(page.getByText('Estimated ROI', { exact: true })).toBeVisible();
});

test('removed initiatives do not have public portfolio routes', async ({ request }) => {
  const removed = [
    './work/asset-catalog/',
    './work/inventory/',
    './work/inspection/',
    './work/order-fulfillment/',
    './work/financial-projections/',
    './work/peer-to-peer-transactions/',
    './work/asset-portfolio-management/',
  ];
  for (const path of removed) expect((await request.get(path)).status(), path).toBe(404);
});

test('homepage and every project pass automated accessibility scans', async ({ page }) => {
  const paths = ['./', ...projects.map((project) => project.path)];
  for (const path of paths) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, `Accessibility violations on ${path}`).toEqual([]);
  }
});

test('legacy source artifacts remain available without public deep-dive CTAs', async ({ page, request }) => {
  await page.goto('./');
  await expect(page.getByRole('link', { name: /whitepaper/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /impact/i })).toHaveCount(0);
  expect((await request.get('./deep-dives/RFDS-impact.html')).ok()).toBeTruthy();
});
