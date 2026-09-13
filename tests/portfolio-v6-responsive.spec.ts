import { expect, test } from '@playwright/test';

const routes = [
  './work/enterprise-order-management/',
  './work/rag-analysis-agent/',
  './work/build-plus/',
  './work/rfds/',
  './work/gl-coding/',
  './work/lease-vendor-management/',
];

test('all project workspaces fit a 390px mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      caseWidth: (document.querySelector('.eom-workspace') ?? document.querySelector('.product-workspace'))?.getBoundingClientRect().width ?? 0,
    }));
    expect(dimensions.viewport, route).toBe(390);
    expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(391);
    expect(dimensions.bodyWidth, route).toBeGreaterThan(385);
    expect(dimensions.caseWidth, route).toBeGreaterThan(360);
    await expect(page.locator('.story-grid')).toBeVisible();
    await expect(page.locator('.feature-list')).toBeVisible();
  }
});
