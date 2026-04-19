/**
 * Performance guards for the resume builder preview pipeline.
 *
 * Checks the two things users actually feel:
 *   1. First preview paint after editor load is under a soft budget.
 *   2. Preview paint under 4× CPU throttle (low-end device proxy) still
 *      resolves within a generous budget — no indefinite freeze.
 *
 * These are SLA-style tests — they don't assert exact millisecond values
 * (too flaky across machines), just that the pipeline completes inside a
 * loose budget that catches order-of-magnitude regressions.
 */

import { test, expect, Page } from "@playwright/test";

async function openExampleResume(page: Page) {
  const title = page.getByText(/Example Resume/i).first();
  await expect(title).toBeVisible({ timeout: 10_000 });
  const card = title.locator(
    'xpath=ancestor::div[contains(@class,"cursor-pointer")][1]',
  );
  await card.click();
  await expect(
    page.getByRole("button", { name: /download/i }).first(),
  ).toBeVisible({ timeout: 20_000 });
}

test.describe("Builder — preview performance", () => {
  test("EN first preview paint completes within 15s on unthrottled CPU", async ({
    page,
  }) => {
    test.setTimeout(45_000);
    const start = Date.now();
    await page.goto("/resume");
    await openExampleResume(page);

    const firstPage = page.locator('img[alt^="Page "]').first();
    await expect(firstPage).toBeVisible({ timeout: 30_000 });

    const elapsed = Date.now() - start;
    // Generous budget — editor load + first debounced raster tick. CI boxes
    // are slower than local; 15s is a comfortable ceiling that still catches
    // anything pathological.
    expect(elapsed).toBeLessThan(15_000);
  });

  test("EN preview completes under 4× CPU throttle (low-end device proxy)", async ({
    page,
    browserName,
  }) => {
    // CDP only on chromium. Skip on firefox/webkit if the cross-browser
    // project happens to pick this up.
    test.skip(
      browserName !== "chromium",
      "CPU throttle uses CDP — chromium-only",
    );
    test.setTimeout(90_000);

    const client = await page.context().newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    const start = Date.now();
    await page.goto("/resume");
    await openExampleResume(page);

    const firstPage = page.locator('img[alt^="Page "]').first();
    await expect(firstPage).toBeVisible({ timeout: 60_000 });

    const elapsed = Date.now() - start;
    // 4× slowdown on a pipeline that normally takes ~3-5s → 20-25s, with
    // 60s ceiling. If this blows out, something is hanging on the main
    // thread (likely pdfjs on CJK — regression sentinel).
    expect(elapsed).toBeLessThan(60_000);

    // Release throttle so teardown isn't sluggish.
    await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  });

  test("Typing into name field does not blow up memory (blob URL accumulation)", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "performance.memory is chromium-only",
    );
    test.setTimeout(90_000);

    await page.goto("/resume");
    await openExampleResume(page);

    // Wait for first raster so the editor is fully live.
    await page
      .locator('img[alt^="Page "]')
      .first()
      .waitFor({ state: "visible", timeout: 30_000 });

    const nameInput = page
      .locator('label:has-text("Full Name") + input, input[name="fullName"]')
      .first();
    if (!(await nameInput.count())) test.skip(true, "name input not found");

    // Snapshot baseline heap.
    const before = await page.evaluate(
      () => (performance as any).memory?.usedJSHeapSize ?? 0,
    );

    // 30 quick edits — each triggers a debounced regen cycle.
    for (let i = 0; i < 30; i++) {
      await nameInput.fill(`QA Perf User ${i}`);
      await page.waitForTimeout(100);
    }
    // Let debounced regens settle.
    await page.waitForTimeout(2_000);

    const after = await page.evaluate(
      () => (performance as any).memory?.usedJSHeapSize ?? 0,
    );

    // Allow a 100MB ceiling on heap growth — anything above that suggests
    // a leak (blob URLs not revoked, react re-renders accumulating, etc).
    // Values are in bytes.
    const deltaMB = (after - before) / (1024 * 1024);
    expect(deltaMB, `heap grew ${deltaMB.toFixed(1)} MB`).toBeLessThan(100);
  });
});
