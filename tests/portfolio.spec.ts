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
  for (const term of ['hansen', 'camunda', 'change bucket', 'vendorone', 'uc1']) {
    expect(text).not.toContain(term);
  }
});

test('enterprise order management integrates the complete product story into one page', async ({ page }, testInfo) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enterprise Order Management');
  await expect(page.locator('.eom-shift')).toBeVisible();
  await expect(page.locator('.story-board > article')).toHaveCount(4);
  await expect(page.locator('.decision-list > article')).toHaveCount(4);
  await expect(page.locator('.focus-card')).toHaveCount(4);
  await expect(page.locator('.evidence-card')).toHaveCount(4);
  await expect(page.getByText('What I owned', { exact: true })).toBeVisible();
  await expect(page.getByText('What was hard', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Four decisions changed the operating model.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Evidence with the qualification left intact.' })).toBeVisible();
  await expect(page.locator('.case-detail')).toHaveCount(0);
  await expect(page.getByText('Senior TPO scope', { exact: true })).toHaveCount(0);

  const text = (await page.locator('.eom-page').innerText()).toLowerCase();
  for (const term of ['hansen', 'camunda', 'change bucket', 'uc1']) expect(text).not.toContain(term);
  expect(text.length).toBeLessThan(6500);
  await page.screenshot({ path: testInfo.outputPath('enterprise-order-management-product-story.png'), fullPage: true });
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

test('EOM next-story navigation moves directly to RAG', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.eom-next').click();
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
      projectWidth: (document.querySelector('.eom-page') ?? document.querySelector('.case-v8'))?.getBoundingClientRect().width ?? 0,
    }));
    expect(dims.viewport).toBe(390);
    expect(dims.scrollWidth).toBeLessThanOrEqual(391);
    expect(dims.bodyWidth).toBeGreaterThan(385);
    expect(dims.projectWidth).toBeGreaterThan(360);
  }

  await page.goto('./work/enterprise-order-management/');
  await page.screenshot({ path: testInfo.outputPath('enterprise-order-management-mobile.png'), fullPage: true });
});

test('projected and estimated outcomes remain visibly qualified', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.locator('.evidence-grid').getByText('Projected', { exact: true })).toBeVisible();
  await expect(page.locator('.evidence-grid').getByText('75K/day', { exact: true })).toBeVisible();

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