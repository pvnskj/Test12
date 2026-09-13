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

const retiredEomFocusRoutes = [
  './work/enterprise-order-management/orchestration-foundation/',
  './work/enterprise-order-management/product-decomposition/',
  './work/enterprise-order-management/shared-order-context/',
  './work/enterprise-order-management/scale-observability/',
];

test('homepage presents product ownership approach and six proof-oriented projects', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Turning challenges into opportunity.');
  await expect(page.locator('.ownership-difference')).toBeVisible();
  await expect(page.locator('.ownership-principle')).toHaveCount(4);
  await expect(page.locator('.project-row')).toHaveCount(projects.length);
  await expect(page.locator('.project-problem')).toHaveCount(projects.length);
  await expect(page.locator('.project-decision')).toHaveCount(projects.length);
  await expect(page.locator('.project-evidence')).toHaveCount(projects.length);
  await expect(page.getByText('AI has changed how I think about product ownership.', { exact: false })).toBeVisible();
  await expect(page.getByText('Portfolio design principle', { exact: true })).toHaveCount(0);
  await expect(page.getByText('How the work is organized', { exact: true })).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('homepage-product-ownership.png'), fullPage: true });
});

test('all projects use the single-page Jira-style epic workspace', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(page.locator('.epic-header')).toBeVisible();
    await expect(page.locator('.evidence-strip')).toBeVisible();
    await expect(page.locator('.story-grid > article')).toHaveCount(3);
    await expect(page.locator('.decision-table')).toBeVisible();
    await expect(page.locator('.feature-item')).toHaveCount(4);
    await expect(page.getByText('The big picture', { exact: true })).toBeVisible();
    await expect(page.getByText('Key product decisions', { exact: true })).toBeVisible();
    await expect(page.getByText('Focus areas', { exact: true })).toBeVisible();
    await expect(page.getByText('Senior TPO scope', { exact: true })).toHaveCount(0);
    await expect(page.getByText(/INC-0/i)).toHaveCount(0);
    await expect(page.locator('.case-detail')).toHaveCount(0);
  }
});

test('focus areas expand inline and keep the reader on the epic', async ({ page }, testInfo) => {
  for (const project of projects) {
    await page.goto(project.path);
    const features = page.locator('.feature-item');
    const first = features.first();
    const second = features.nth(1);

    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await expect(first.getByText('Why this matters', { exact: true })).toBeVisible();
    await expect(first.getByText('Capabilities delivered', { exact: true })).toBeVisible();
    await expect(first.getByText('What I owned', { exact: true })).toBeVisible();
    await expect(first.getByText('What the number means', { exact: true })).toBeVisible();

    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
    await expect(first).not.toHaveAttribute('open', '');
    await expect(page).toHaveURL(new RegExp(project.path.replace('./', '/').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'));
  }

  await page.goto('./work/rag-analysis-agent/');
  await page.locator('.feature-item').first().locator('summary').click();
  await page.screenshot({ path: testInfo.outputPath('rag-inline-focus.png'), fullPage: true });
});

test('all public project views avoid internal program and vendor terminology', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    const root = page.locator('.eom-workspace, .product-workspace');
    const text = (await root.innerText()).toLowerCase();
    for (const term of ['hansen', 'camunda', 'change bucket', 'vendorone', 'uc1']) expect(text, project.title).not.toContain(term);
    expect(text, project.title).not.toMatch(/\b20\d{2}\b/);
  }
});

test('EOM no longer exposes separate focus-area pages', async ({ request }) => {
  for (const path of retiredEomFocusRoutes) expect((await request.get(path)).status(), path).toBe(404);
});

test('all project pages preserve the full ownership, complexity, flow, decisions, and evidence record', async ({ page }) => {
  for (const project of projects.slice(1)) {
    await page.goto(project.path);
    await expect(page.locator('.flow-section')).toBeVisible();
    await expect(page.locator('.record-section')).toBeVisible();
    await expect(page.locator('.record-grid > article')).toHaveCount(2);
    await expect(page.locator('.evidence-note')).toBeVisible();
    const decisionCount = await page.locator('.decision-table > article').count();
    expect(decisionCount, project.title).toBeGreaterThanOrEqual(3);
    const evidenceCount = await page.locator('.evidence-lines > article').count();
    expect(evidenceCount, project.title).toBeGreaterThanOrEqual(3);
  }
});

test('next epic navigation follows the portfolio sequence', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.next-epic').click();
  await expect(page).toHaveURL(/\/work\/rag-analysis-agent\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enterprise RAG Analysis Agent');
});

test('all mobile project workspaces use the full viewport without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const project of projects) {
    await page.goto(project.path);
    const dims = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      projectWidth: (document.querySelector('.eom-workspace') ?? document.querySelector('.product-workspace'))?.getBoundingClientRect().width ?? 0,
    }));
    expect(dims.viewport, project.title).toBe(390);
    expect(dims.scrollWidth, project.title).toBeLessThanOrEqual(391);
    expect(dims.bodyWidth, project.title).toBeGreaterThan(385);
    expect(dims.projectWidth, project.title).toBeGreaterThan(360);

    const firstFeature = page.locator('.feature-item').first();
    await firstFeature.locator('summary').click();
    await expect(firstFeature).toHaveAttribute('open', '');
  }
  await page.goto('./work/gl-coding/');
  await page.locator('.feature-item').first().locator('summary').click();
  await page.screenshot({ path: testInfo.outputPath('gl-coding-workspace-mobile.png'), fullPage: true });
});

test('projected and estimated outcomes remain visibly qualified', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.locator('.evidence-strip').getByText('Projected', { exact: true })).toBeVisible();
  await expect(page.locator('.evidence-strip').getByText('75K/day', { exact: true })).toBeVisible();

  await page.goto('./work/lease-vendor-management/');
  const leaseText = (await page.locator('.product-workspace').innerText()).toLowerCase();
  expect(leaseText).toContain('estimated');
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
