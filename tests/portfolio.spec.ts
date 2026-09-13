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

const legacyCaseProjects = projects.slice(1);

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
  await expect(page.getByText('Open any project for the complete product story', { exact: false })).toHaveCount(0);
  await expect(page.getByText('Portfolio design principle', { exact: true })).toHaveCount(0);
  await expect(page.getByText('How the work is organized', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Peer-to-Peer Transactions')).toHaveCount(0);
  await expect(page.getByText('Asset & Portfolio Management')).toHaveCount(0);

  const text = await page.locator('.ownership-home').innerText();
  expect(text.length).toBeLessThan(6000);
  await page.screenshot({ path: testInfo.outputPath('homepage-product-ownership.png'), fullPage: true });
});

test('homepage does not expose internal program or vendor terminology', async ({ page }) => {
  await page.goto('./');
  const text = (await page.locator('.ownership-home').innerText()).toLowerCase();
  for (const term of ['hansen', 'camunda', 'change bucket', 'vendorone', 'uc1']) expect(text).not.toContain(term);
});

test('enterprise order management is one Jira-style epic workspace', async ({ page }, testInfo) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enterprise Order Management');
  await expect(page.locator('.epic-header')).toBeVisible();
  await expect(page.locator('.evidence-strip > article')).toHaveCount(4);
  await expect(page.locator('.story-grid > article')).toHaveCount(3);
  await expect(page.locator('.decision-table > article')).toHaveCount(4);
  await expect(page.locator('.feature-item')).toHaveCount(4);
  await expect(page.getByText('The big picture', { exact: true })).toBeVisible();
  await expect(page.getByText('Key product decisions', { exact: true })).toBeVisible();
  await expect(page.getByText('Focus areas', { exact: true })).toBeVisible();
  await expect(page.getByText('Senior TPO scope', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/INC-0/i)).toHaveCount(0);

  const text = (await page.locator('.eom-workspace').innerText()).toLowerCase();
  for (const term of ['hansen', 'camunda', 'change bucket', 'uc1']) expect(text).not.toContain(term);
  expect(text).not.toMatch(/\b20\d{2}\b/);
  await page.screenshot({ path: testInfo.outputPath('enterprise-order-management-workspace.png'), fullPage: true });
});

test('EOM focus areas expand inline with the detailed case-study content', async ({ page }, testInfo) => {
  await page.goto('./work/enterprise-order-management/');
  const sharedContext = page.locator('.feature-item', { hasText: 'Shared Order Context' });
  await sharedContext.locator('summary').click();
  await expect(sharedContext).toHaveAttribute('open', '');
  await expect(sharedContext.getByText('Why this matters', { exact: true })).toBeVisible();
  await expect(sharedContext.getByText('Capabilities delivered', { exact: true })).toBeVisible();
  await expect(sharedContext.getByText('Challenges & trade-offs', { exact: true })).toBeVisible();
  await expect(sharedContext.getByText('What I owned', { exact: true })).toBeVisible();
  await expect(sharedContext.getByText('Product decisions', { exact: true })).toBeVisible();
  await expect(sharedContext.getByText('System flow · simplified', { exact: true })).toBeVisible();
  await expect(sharedContext.getByText('What the number means', { exact: true })).toBeVisible();

  const orchestration = page.locator('.feature-item', { hasText: 'Orchestration Foundation' });
  await orchestration.locator('summary').click();
  await expect(orchestration).toHaveAttribute('open', '');
  await expect(sharedContext).not.toHaveAttribute('open', '');
  await expect(page).toHaveURL(/\/work\/enterprise-order-management\/$/);
  await page.screenshot({ path: testInfo.outputPath('enterprise-order-management-inline-focus.png'), fullPage: true });
});

test('EOM no longer exposes separate focus-area pages', async ({ request }) => {
  for (const path of retiredEomFocusRoutes) expect((await request.get(path)).status(), path).toBe(404);
});

test('remaining selected initiatives retain the current concise case-study structure', async ({ page }) => {
  for (const project of legacyCaseProjects) {
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

test('existing supporting detail remains available on projects not yet migrated', async ({ page }) => {
  await page.goto('./work/rag-analysis-agent/');
  await page.locator('.case-detail summary').click();
  await expect(page.locator('.case-detail')).toHaveAttribute('open', '');
  await expect(page.getByText('Senior TPO scope', { exact: true })).toBeVisible();
  await expect(page.getByText('What made this hard', { exact: true })).toBeVisible();
  await expect(page.getByText('Complete decision record', { exact: true })).toBeVisible();
  await expect(page.getByText('What each number actually means', { exact: true })).toBeVisible();
});

test('EOM next-epic navigation moves directly to RAG', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.next-epic').click();
  await expect(page).toHaveURL(/\/work\/rag-analysis-agent\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enterprise RAG Analysis Agent');
});

test('all mobile project case studies use the full viewport without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const project of projects) {
    await page.goto(project.path);
    const dims = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      projectWidth: (document.querySelector('.eom-workspace') ?? document.querySelector('.case-v8'))?.getBoundingClientRect().width ?? 0,
    }));
    expect(dims.viewport).toBe(390);
    expect(dims.scrollWidth).toBeLessThanOrEqual(391);
    expect(dims.bodyWidth).toBeGreaterThan(385);
    expect(dims.projectWidth).toBeGreaterThan(360);
  }

  await page.goto('./work/enterprise-order-management/');
  const firstFeature = page.locator('.feature-item').first();
  await firstFeature.locator('summary').click();
  await expect(firstFeature).toHaveAttribute('open', '');
  await page.screenshot({ path: testInfo.outputPath('enterprise-order-management-workspace-mobile.png'), fullPage: true });
});

test('projected and estimated outcomes remain visibly qualified', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.locator('.evidence-strip').getByText('Projected', { exact: true })).toBeVisible();
  await expect(page.locator('.evidence-strip').getByText('75K/day', { exact: true })).toBeVisible();

  await page.goto('./work/lease-vendor-management/');
  await expect(page.locator('.case-proof').getByText('Estimated ROI', { exact: true })).toBeVisible();
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
