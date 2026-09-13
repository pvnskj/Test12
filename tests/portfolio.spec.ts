import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const projects = [
  { path: './work/enterprise-order-management/', title: 'Enterprise Order Management', visual: '.v6-order-map' },
  { path: './work/rag-analysis-agent/', title: 'Enterprise RAG Analysis Agent', visual: '.v6-forecast-map' },
  { path: './work/build-plus/', title: 'Build Plus', visual: '.v6-orbit-map' },
  { path: './work/rfds/', title: 'RFDS Automation', visual: '.v6-rfds-map' },
  { path: './work/gl-coding/', title: 'Dynamic GL Coding', visual: '.v6-gl-map' },
  { path: './work/lease-vendor-management/', title: 'Lease & Vendor Management', visual: '.v6-asset' },
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
  await page.screenshot({ path: testInfo.outputPath('homepage-v7.png'), fullPage: true });
});

test('every selected initiative uses the compact dashboard with a distinct infographic', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(page.locator('.v6-dashboard-grid')).toBeVisible();
    await expect(page.locator(project.visual)).toBeVisible();
    await expect(page.locator('.v6-decision-list > div')).toHaveCount(4);
    await expect(page.locator('.v6-proof-row > article')).toHaveCount(3);
    await expect(page.locator('.v6-depth')).not.toHaveAttribute('open', '');
    await expect(page.locator('.v5-story-tabs')).toHaveCount(0);
    await expect(page.locator('.glc-dashboard')).toHaveCount(0);

    const visibleText = await page.locator('.v6-project').innerText();
    expect(visibleText.length, `${project.title} visible text budget`).toBeLessThan(2800);
  }
});

test('motion system stages the visual story and evidence without hiding content', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.locator('body')).toHaveClass(/motion-ready/);

  const visual = page.locator('.v6-visual');
  await expect(visual).toHaveAttribute('data-motion-scene', '');
  await expect(visual).toHaveClass(/motion-visible/);
  expect(await visual.locator('[data-motion-part]').count()).toBeGreaterThan(6);

  const firstPart = visual.locator('[data-motion-part]').first();
  const animationName = await firstPart.evaluate((element) => getComputedStyle(element).animationName);
  expect(animationName).toContain('v7PartIn');

  const firstMetric = page.locator('.v6-proof-row article strong').first();
  await firstMetric.scrollIntoViewIfNeeded();
  await expect(firstMetric).toHaveAttribute('data-counted', 'true');
  await expect(firstMetric).toHaveText('20%', { timeout: 2000 });
});

test('glass depth is enabled only when the device exposes a fine hover pointer', async ({ page }) => {
  await page.goto('./');
  const supportsFineHover = await page.evaluate(() => matchMedia('(hover:hover) and (pointer:fine)').matches);
  if (supportsFineHover) {
    await expect(page.locator('.v6-hero-board')).toHaveClass(/motion-tilt/);
    await expect(page.locator('.v6-work-card').first()).toHaveClass(/motion-tilt/);
  } else {
    await expect(page.locator('.v6-hero-board')).not.toHaveClass(/motion-tilt/);
    await expect(page.locator('.v6-work-card').first()).not.toHaveClass(/motion-tilt/);
  }
});

test('project switcher moves directly between initiatives', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.v6-project-switcher summary').click();
  await page.locator('.v6-project-switcher nav a', { hasText: 'Enterprise RAG Analysis Agent' }).click();
  await expect(page).toHaveURL(/\/work\/rag-analysis-agent\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enterprise RAG Analysis Agent');
  await expect(page.locator('.v6-forecast-map')).toBeVisible();
});

test('all mobile project dashboards use the full viewport without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const project of projects) {
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
  await page.screenshot({ path: testInfo.outputPath('gl-coding-mobile-v7.png'), fullPage: true });
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

test('reduced motion preserves the complete visual story without staged movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./work/rfds/');
  await expect(page.locator('.v6-rfds-map')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RFDS Automation');
  await expect(page.locator('body')).toHaveClass(/motion-ready/);

  const part = page.locator('.v6-visual [data-motion-part]').first();
  await expect(part).toBeVisible();
  const state = await part.evaluate((element) => ({
    opacity: getComputedStyle(element).opacity,
    duration: getComputedStyle(element).animationDuration,
  }));
  expect(state.opacity).toBe('1');
  expect(['0s', '0.000001s', '1e-06s']).toContain(state.duration);
});

test('legacy source artifacts remain available without public deep-dive CTAs', async ({ page, request }) => {
  await page.goto('./');
  await expect(page.getByRole('link', { name: /whitepaper/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /impact/i })).toHaveCount(0);
  expect((await request.get('./deep-dives/RFDS-impact.html')).ok()).toBeTruthy();
});
