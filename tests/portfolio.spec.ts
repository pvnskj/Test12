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


test('homepage puts identity and real project work in the first glance', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page).toHaveTitle(/Venkata Parimi/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Turning challenges into opportunity.');
  await expect(page.locator('.scan-hero')).toContainText('Senior Technical Product Owner');
  await expect(page.locator('.scan-project-card')).toHaveCount(projects.length);
  await expect(page.locator('.scan-approach')).toContainText('AI has changed how I think about product ownership.');
  const introWords = (await page.locator('.scan-hero').innerText()).trim().split(/\s+/).length;
  expect(introWords).toBeLessThan(65);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 844 });
    const first = await page.locator('.scan-project-card').first().boundingBox();
    expect(first?.y).toBeLessThan(700);
  }
  await page.screenshot({ path: testInfo.outputPath('portfolio-board-mobile.png'), fullPage: true });
});

test('project filters work and survive navigation back from a workspace', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Finance', exact: true }).click();
  await expect(page.locator('.scan-project-card:visible')).toHaveCount(2);
  await expect(page.locator('[data-project-count]')).toHaveText('2 projects');
  await page.getByRole('button', { name: 'AI', exact: true }).click();
  await expect(page.locator('.scan-project-card:visible')).toHaveCount(1);
  await page.getByRole('link', { name: 'Enterprise RAG Analysis Agent', exact: true }).click();
  await page.getByRole('link', { name: '← All projects', exact: true }).click();
  await page.getByRole('button', { name: 'Operations', exact: true }).click();
  await expect(page.locator('.scan-project-card:visible')).toHaveCount(2);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.scan-project-card:visible')).toHaveCount(projects.length);
});

test('all projects have one concise workspace with qualified evidence', async ({ page }, testInfo) => {
  for (const project of projects) {
    await page.goto(project.path);
    const workspace = page.locator('.scan-workspace');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await expect(workspace.locator('.epic-contribution')).toContainText('My contribution');
    await expect(workspace.locator('.scan-primary-proof')).toBeVisible();
    await expect(workspace.locator('.scan-evidence-strip > article')).toHaveCount(3);
    await expect(workspace.locator('.scan-story > article')).toHaveCount(3);
    await expect(workspace.locator('.scan-feature')).toHaveCount(4);
    await expect(workspace.locator('details[open]')).toHaveCount(0);
    const text = (await workspace.innerText()).toLowerCase();
    for (const term of prohibitedTerms) expect(text, project.title).not.toContain(term);
    expect(text).not.toMatch(/\b20\d{2}\b/);
  }
  await page.goto('./work/enterprise-order-management/');
  await page.screenshot({ path: testInfo.outputPath('eom-workspace-desktop.png'), fullPage: true });
});

test('focus areas and evidence expand inline using keyboard and pointer', async ({ page }) => {
  for (const project of projects) {
    await page.goto(project.path);
    const first = page.locator('.scan-feature').first();
    const second = page.locator('.scan-feature').nth(1);
    await first.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('open', '');
    await expect(first.getByRole('heading', { name: 'Question to resolve' })).toBeVisible();
    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
    await expect(first).not.toHaveAttribute('open', '');
    await page.locator('.scan-primary-proof a').click();
    await expect(page.locator('#evidence')).toHaveAttribute('open', '');
    await expect(second).not.toHaveAttribute('open', '');
    await expect(page.locator('.scan-evidence-row')).toHaveCount(4);
    expect(page.url()).toContain(project.path.replace('./', '/Test12/'));
    expect(page.url()).toContain('#evidence');
    const text = (await page.locator('.scan-workspace').innerText()).toLowerCase();
    for (const term of prohibitedTerms) expect(text, project.title).not.toContain(term);
  }
});

test('projected and estimated outcomes keep their meaning at every entry point', async ({ page }) => {
  await page.goto('./work/enterprise-order-management/');
  await expect(page.locator('.scan-evidence-strip').getByText('Projected', { exact: true })).toBeVisible();
  await expect(page.locator('.scan-evidence-strip').getByText('75K/day', { exact: true })).toBeVisible();
  await expect(page.locator('.scan-primary-proof')).toContainText('Proof-of-concept');

  await page.goto('./work/gl-coding/');
  await expect(page.locator('.scan-evidence-strip').getByText('Estimated', { exact: true })).toBeVisible();

  await page.goto('./work/lease-vendor-management/#evidence');
  await expect(page.locator('#evidence')).toHaveAttribute('open', '');
  await expect(page.locator('.scan-evidence-strip').getByText('~2x', { exact: true })).toBeVisible();
  await expect(page.locator('#evidence')).toContainText('estimated $2.5M operational return');
});

test('EOM no longer exposes separate focus-area pages', async ({ request }) => {
  for (const path of retiredEomFocusRoutes) expect((await request.get(path)).status(), path).toBe(404);
});

test('removed initiatives do not have public portfolio routes', async ({ request }) => {
  const removed = [
    './work/asset-catalog/', './work/inventory/', './work/inspection/', './work/order-fulfillment/',
    './work/financial-projections/', './work/peer-to-peer-transactions/', './work/asset-portfolio-management/',
  ];
  for (const path of removed) expect((await request.get(path)).status(), path).toBe(404);
});

test('homepage navigation points to real sections', async ({ page }) => {
  await page.goto('./');
  for (const id of ['work', 'approach']) await expect(page.locator('#' + id)).toHaveCount(1);
  await expect(page.locator('a[href$="#expertise"], a[href$="#about"], a[href$="#contact"]')).toHaveCount(0);
});

test('homepage and every project pass automated accessibility scans', async ({ page }) => {
  for (const path of ['./', ...projects.map((project) => project.path)]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, 'Accessibility violations on ' + path).toEqual([]);
  }
  await page.goto('./work/enterprise-order-management/');
  await page.locator('.scan-feature summary').first().click();
  const expanded = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(expanded.violations).toEqual([]);
});

test('legacy source artifacts remain available without public deep-dive CTAs', async ({ page, request }) => {
  await page.goto('./');
  await expect(page.getByRole('link', { name: /whitepaper/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /impact/i })).toHaveCount(0);
  expect((await request.get('./deep-dives/RFDS-impact.html')).ok()).toBeTruthy();
});
