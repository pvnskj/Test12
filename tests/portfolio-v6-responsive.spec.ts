import { expect, test } from '@playwright/test';

const routes = ['./', './work/enterprise-order-management/', './work/rag-analysis-agent/', './work/build-plus/', './work/rfds/', './work/gl-coding/', './work/lease-vendor-management/'];

test('pages and expanded workspaces fit mobile and tablet widths', async ({ page }, testInfo) => {
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await page.goto(route);
      if (route !== './') await page.locator('.scan-feature summary').first().click();
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        contentWidth: document.querySelector('.scan-workspace, .scan-home')?.getBoundingClientRect().width ?? 0,
        overflowing: [...document.querySelectorAll('.scan-workspace *, .scan-home *')]
          .filter((element) => element.getClientRects().length > 0 && element.getBoundingClientRect().right > window.innerWidth + 1)
          .map((element) => element.className),
      }));
      expect(dimensions.scrollWidth, route).toBeLessThanOrEqual(width + 1);
      expect(dimensions.contentWidth, route).toBeGreaterThan(width - 40);
      expect(dimensions.overflowing, route).toEqual([]);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./work/rfds/');
  await page.screenshot({ path: testInfo.outputPath('rfds-workspace-mobile.png'), fullPage: true });
});
