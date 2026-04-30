/**
 * Performance regression guard for /offer-calculator route.
 *
 * Checks that:
 *   1. Page loads and becomes interactive within reasonable time budgets.
 *   2. Performance marks are created for Time-to-Interactive measurement.
 *   3. Console warnings are logged when TTI exceeds threshold (tested via mocking).
 *
 * These tests detect order-of-magnitude regressions in the offer calculator page load.
 */

import { test, expect, Page } from "@playwright/test";

/** Chromium exposes a non-standard `memory` property on the Performance object. */
interface ChromiumPerformance extends Performance {
  memory?: { usedJSHeapSize: number };
}

async function waitForOfferCalculatorInteractive(page: Page) {
  // Wait for the scenario bar to be visible (indicates page is interactive)
  const scenarioBar = page.locator('div.print\\:hidden.border-b.border-border.bg-card');
  await expect(scenarioBar).toBeVisible({ timeout: 10_000 });
  
  // Wait for at least one scenario to be loaded
  const addOfferButton = page.getByRole('button', { name: /add offer/i });
  await expect(addOfferButton).toBeVisible({ timeout: 10_000 });
}

test.describe("Offer Calculator — performance regression guard", () => {
  test("EN page loads and becomes interactive within 5s", async ({
    page,
  }) => {
    test.setTimeout(30_000);
    const start = Date.now();
    
    await page.goto("/offer-calculator");
    await waitForOfferCalculatorInteractive(page);
    
    const elapsed = Date.now() - start;
    // 5s is generous for CI but catches pathological regressions
    expect(elapsed).toBeLessThan(5_000);
  });

  test("Performance marks are created for TTI measurement", async ({
    page,
  }) => {
    test.setTimeout(30_000);
    
    await page.goto("/offer-calculator");
    await waitForOfferCalculatorInteractive(page);
    
    // Check that performance marks were created
    const marks = await page.evaluate(() => {
      return performance.getEntriesByType('mark')
        .filter(mark => mark.name.includes('offer-calculator'))
        .map(mark => mark.name);
    });
    
    expect(marks).toContain('offer-calculator:mount-start');
    expect(marks).toContain('offer-calculator:interactive');
    
    // Check that TTI measurement was created
    const measures = await page.evaluate(() => {
      return performance.getEntriesByType('measure')
        .filter(measure => measure.name.includes('offer-calculator'))
        .map(measure => measure.name);
    });
    
    expect(measures).toContain('offer-calculator:tti');
  });

  test("Console warning logged when TTI exceeds 3s threshold (simulated)", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "CDP required for console monitoring",
    );
    test.setTimeout(30_000);
    
    // Capture console.warn calls
    const warnings: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'warning' && msg.text().includes('PERF_REGRESSION')) {
        warnings.push(msg.text());
      }
    });
    
    // Simulate slow load by throttling CPU
    const client = await page.context().newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 6 });
    
    await page.goto("/offer-calculator");
    await waitForOfferCalculatorInteractive(page);
    
    // Release throttle
    await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    
    // Check that warning was logged (may not trigger if still under 3s even with throttle)
    // This test is more about verifying the warning mechanism exists
    const hasPerfWarning = warnings.some(w => w.includes('PERF_REGRESSION'));
    expect(hasPerfWarning).toBeTruthy();
  });

  test("ZH page loads and becomes interactive within 5s", async ({
    page,
  }) => {
    test.setTimeout(30_000);
    const start = Date.now();
    
    await page.goto("/zh-tw/offer-calculator");
    await waitForOfferCalculatorInteractive(page);
    
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5_000);
  });

  test("Memory doesn't leak during repeated scenario operations", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "performance.memory is chromium-only",
    );
    test.setTimeout(60_000);
    
    await page.goto("/offer-calculator");
    await waitForOfferCalculatorInteractive(page);
    
    // Snapshot baseline heap
    const before = await page.evaluate(
      () => (performance as ChromiumPerformance).memory?.usedJSHeapSize ?? 0,
    );
    
    // Perform multiple scenario operations
    const addButton = page.getByRole('button', { name: /add offer/i });
    for (let i = 0; i < 10; i++) {
      await addButton.click();
      await page.waitForTimeout(200);
    }
    
    // Let any async operations settle
    await page.waitForTimeout(2_000);
    
    const after = await page.evaluate(
      () => (performance as ChromiumPerformance).memory?.usedJSHeapSize ?? 0,
    );
    
    // Allow reasonable growth for UI updates
    const deltaMB = (after - before) / (1024 * 1024);
    expect(deltaMB, `heap grew ${deltaMB.toFixed(1)} MB`).toBeLessThan(50);
  });
});