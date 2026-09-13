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

const prohibitedTerms = ['hansen', 'camunda', 'change bucket', 'vendorone', 'nexsysone', 'uc1'];

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
  await expect(page.getByText('How the work is organized', { exact: true })).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('homepage-product-ownership.png'), fullPage: true });
});

test('all six projects use one Jira-style epic workspace', async ({ page }, testInfo) => {
  for (const project of projects) {
    await page.goto(project.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    const workspace = page.locator('.eom-workspace, .product-workspace');
    await expect(workspace).toBeVisible();
    await expect(workspace.locator('.epic-header')).toBeVisible();
    await expect(workspace.locator('.evidence-strip > article')).toHaveCount(4);
    await expect(workspace.locator('.story-grid > article')).toHaveCount(3);
    await expect(workspace.locator('.decision-table > article')).toHaveCount(4);
    await expect(workspace.locator('.feature-item')).toHaveCount(4);
    await expect(workspace.getByText('The big picture', { exact: true })).toBeVisible();
    await expect(workspace.getByText('Key product decisions', { exact: true })).toBeVisible();
    await expect(workspace.getByText('Focus areas', { exact: true })).toBeVisible();
    await expect(page.getByText('Senior TPO scope', { exact: true })).toHaveCount(0);
    await expect(page.getByText(/INC-0/i)).toHaveCount(0);

    const text = (await workspace.innerText()).toLowerCase();
    for (const term of prohibitedTerms) expect(text, `${project.title}: ${term}`).not.toContain(term);
    expect(text).not.toMatch(/\b20\d{2}\b/);
  }
  await page.goto('./work/gl-coding/');
  await page.screenshot({ path: testInfo.outputPath('gl-coding-workspace.png'), fullPage: true });
});

test('focus areas expand inline and keep the reader on the same project', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    const workspace = page.locator('.eom-workspace, .product-workspace');
    const first = workspace.locator('.feature-item').first();
    const second = workspace.locator('.feature-item').nth(1);
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await expect(first.getByText('Why this matters', { exact: true })).toBeVisible();
    await expect(first.getByText('Capabilities delivered', { exact: true })).toBeVisible();
    await expect(first.getByText('Challenges & trade-offs', { exact: true })).toBeVisible();
    await expect(first.getByText('What I owned', { exact: true })).toBeVisible();
    await expect(first.getByText('Product decisions', { exact: true })).toBeVisible();
    await expect(first.getByText('System flow · simplified', { exact: true })).toBeVisible();
    await expect(first.getByText('What the number means', { exact: true })).toBeVisible();

    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
    await expect(first).not.toHaveAttribute('open', '');
    expect(page.url()).toContain(project.path.replace('./', '/Test12/'));
  }
});

test('EOM no longer exposes separate focus-area pages', async ({ request }) => {
  for (const path of retiredEomFocusRoutes) expect((await request.get(path)).status(), path).toBe(404);
});

test('projected and estimated outcomes remain visibly qualified', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.locator('.evidence-strip').getByText('Projected', { exact: true })).toBeVisible();
  await expect(page.locator('.evidence-strip').getByText('75K/day', { exact: true })).toBeVisible();

  await page.goto('./work/gl-coding/');
  await expect(page.locator('.evidence-strip').getByText('Estimated', { exact: true })).toBeVisible();

  await page.goto('./work/lease-vendor-management/');
  await expect(page.locator('.evidence-strip').getByText('Estimated', { exact: true })).toBeVisible();
  await expect(page.locator('.evidence-strip').getByText('~2x', { exact: true })).toBeVisible();
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
    expect(dims.viewport).toBe(390);
    expect(dims.scrollWidth, project.path).toBeLessThanOrEqual(391);
    expect(dims.bodyWidth, project.path).toBeGreaterThan(385);
    expect(dims.projectWidth, project.path).toBeGreaterThan(360);
  }
  await page.goto('./work/rag-analysis-agent/');
  const first = page.locator('.feature-item').first();
  await first.locator('summary').click();
  await page.screenshot({ path: testInfo.outputPath('rag-workspace-mobile.png'), fullPage: true });
});

test('removed initiatives do not have public portfolio routes', async ({ request }) => {
  const removed = [
    './work/asset-catalog/', './work/inventory/', './work/inspection/', './work/order-fulfillment/',
    './work/financial-projections/', './work/peer-to-peer-transactions/', './work/asset-portfolio-management/',
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
