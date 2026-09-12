import { expect, test } from '@playwright/test';

const routes = [
  './work/asset-catalog/',
  './work/inventory/',
  './work/rfds/',
  './work/inspection/',
  './work/gl-coding/',
  './work/order-fulfillment/',
  './work/financial-projections/',
];

test('all project dashboards fit a 390px mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      dashboardWidth: document.querySelector('.v6-project')?.getBoundingClientRect().width ?? 0,
    }));
    expect(dimensions.viewport, route).toBe(390);
    expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(391);
    expect(dimensions.bodyWidth, route).toBeGreaterThan(385);
    expect(dimensions.dashboardWidth, route).toBeGreaterThan(360);
    await expect(page.locator('.v6-dashboard-grid')).toBeVisible();
  }
});
