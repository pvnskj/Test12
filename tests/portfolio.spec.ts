import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const projects = [
  { path: './work/asset-catalog/', title: 'Asset Catalog', visual: '.v6-asset' },
  { path: './work/inventory/', title: 'Inventory & Asset Lifecycle', visual: '.v6-orbit-map' },
  { path: './work/rfds/', title: 'RFDS Automation', visual: '.v6-rfds-map' },
  { path: './work/inspection/', title: 'Inspection & Predictive Maintenance', visual: '.v6-inspection-map' },
  { path: './work/gl-coding/', title: 'Dynamic GL Coding', visual: '.v6-gl-map' },
  { path: './work/order-fulfillment/', title: 'Order & Fulfillment Management', visual: '.v6-order-map' },
  { path: './work/financial-projections/', title: 'Financial Projection Platform', visual: '.v6-forecast-map' },
];

test('homepage is visual, selective, and not text-heavy', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Make complex products easy to understand.');
  await expect(page.locator('.v6-control-map')).toBeVisible();
  await expect(page.locator('.v6-expertise article')).toHaveCount(4);
  await expect(page.locator('.v6-work-card')).toHaveCount(projects.length);
  await expect(page.locator('.v6-approach-grid article')).toHaveCount(6);
  await expect(page.getByText('Peer-to-Peer Transactions')).toHaveCount(0);
  await expect(page.getByText('Asset & Portfolio Management')).toHaveCount(0);

  const text = await page.locator('.v6-home').innerText();
  expect(text.length).toBeLessThan(5000);
  await page.screenshot({ path: testInfo.outputPath('homepage-v6.png'), fullPage: true });
});

test('every selected initiative uses the compact dashboard with a distinct infographic', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(page.locator('.v6-dashboard-grid')).toBeVisible();
    await expect(page.locator(project.visual)).toBeVisible();
    await expect(page.locator('.v6-decision-list > div')).toHaveCount(3);
    await expect(page.locator('.v6-proof-row > article')).toHaveCount(3);
    await expect(page.locator('.v6-depth')).not.toHaveAttribute('open', '');
    await expect(page.locator('.v5-story-tabs')).toHaveCount(0);
    await expect(page.locator('.glc-dashboard')).toHaveCount(0);

    const visibleText = await page.locator('.v6-project').innerText();
    expect(visibleText.length, `${project.title} visible text budget`).toBeLessThan(2600);
  }
});

test('project switcher moves directly between initiatives', async ({ page }) => {
  await page.goto('./work/asset-catalog/');
  await page.locator('.v6-project-switcher summary').click();
  await page.locator('.v6-project-switcher nav a', { hasText: 'RFDS Automation' }).click();
  await expect(page).toHaveURL(/\/work\/rfds\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RFDS Automation');
});

test('mobile project dashboards use the full viewport without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const project of [projects[0]!, projects[3]!, projects[4]!]) {
    await page.goto(project.path);
    const dims = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      projectWidth: document.querySelector('.v6-project')?.getBoundingClientRect().width ?? 0,
    }));
    expect(dims.viewport).toBe(390);
    expect(dims.scrollWidth).toBeLessThanOrEqual(391);
    expect(dims.bodyWidth).toBeGreaterThan(385);
    expect(dims.projectWidth).toBeGreaterThan(360);
  }

  await page.goto('./work/gl-coding/');
  await page.screenshot({ path: testInfo.outputPath('gl-coding-mobile-v6.png'), fullPage: true });
});

test('order fulfillment does not publish placeholder quantitative impact', async ({ page }) => {
  await page.goto('./work/order-fulfillment/');
  await expect(page.getByText('Held', { exact: true })).toBeVisible();
  await expect(page.getByText('Unvalidated metrics', { exact: true })).toBeVisible();
  await page.locator('.v6-depth summary').click();
  await expect(page.getByText(/Quantitative impact remains withheld/i)).toBeVisible();
});

test('removed initiatives do not have public portfolio routes', async ({ request }) => {
  expect((await request.get('./work/peer-to-peer-transactions/')).status()).toBe(404);
  expect((await request.get('./work/asset-portfolio-management/')).status()).toBe(404);
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

test('reduced motion preserves the visual story', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./work/rfds/');
  await expect(page.locator('.v6-rfds-map')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RFDS Automation');
});

test('legacy source artifacts remain available without public deep-dive CTAs', async ({ page, request }) => {
  await page.goto('./');
  await expect(page.getByRole('link', { name: /whitepaper/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /impact/i })).toHaveCount(0);
  expect((await request.get('./deep-dives/RFDS-impact.html')).ok()).toBeTruthy();
});
