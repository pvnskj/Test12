import { expect, test } from '@playwright/test';

const routes = [
  './work/enterprise-order-management/',
  './work/rag-analysis-agent/',
  './work/build-plus/',
  './work/rfds/',
  './work/gl-coding/',
  './work/lease-vendor-management/',
];

const focusRoutes = [
  './work/enterprise-order-management/orchestration-foundation/',
  './work/enterprise-order-management/product-decomposition/',
  './work/enterprise-order-management/shared-order-context/',
  './work/enterprise-order-management/scale-observability/',
];

test('all project case studies fit a 390px mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      caseWidth: (document.querySelector('.eom-epic') ?? document.querySelector('.case-v8'))?.getBoundingClientRect().width ?? 0,
    }));
    expect(dimensions.viewport, route).toBe(390);
    expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(391);
    expect(dimensions.bodyWidth, route).toBeGreaterThan(385);
    expect(dimensions.caseWidth, route).toBeGreaterThan(360);

    if (route.includes('enterprise-order-management')) {
      await expect(page.locator('.story-triptych')).toBeVisible();
    } else {
      await expect(page.locator('.case-glance')).toBeVisible();
    }
  }

  for (const route of focusRoutes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      caseWidth: document.querySelector('.eom-focus')?.getBoundingClientRect().width ?? 0,
    }));
    expect(dimensions.viewport, route).toBe(390);
    expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(391);
    expect(dimensions.bodyWidth, route).toBeGreaterThan(385);
    expect(dimensions.caseWidth, route).toBeGreaterThan(360);
    await expect(page.locator('.at-a-glance')).toBeVisible();
  }
});
