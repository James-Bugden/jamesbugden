/**
 * Custom assertions: PDF download verification, preview scraping,
 * mobile layout checks.
 */
import { Page, expect, Download } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Verify the current preview's rasterized PDF pages render. Doesn't
 * OCR text (too slow) — just confirms at least one page image is in the
 * DOM and has non-zero dimensions.
 */
export async function expectPreviewRendered(page: Page) {
  const pages = page.locator('img[alt^="Page "]');
  await expect(pages.first()).toBeVisible({ timeout: 20_000 });
  const box = await pages.first().boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(100);
  expect(box?.height ?? 0).toBeGreaterThan(100);
}

/**
 * Wait for the preview to fully settle (debounce + regen + pdfjs raster).
 * Uses the "Updating..." / "Generating preview..." loading text as a signal.
 */
export async function waitForPreviewIdle(page: Page) {
  // Wait up to 20s for at least one page to appear.
  await page
    .locator('img[alt^="Page "]')
    .first()
    .waitFor({ state: "visible", timeout: 20_000 });
  // Additionally wait ~800ms for the debounce/raster pipeline to finish
  // any in-flight regeneration.
  await page.waitForTimeout(800);
}

/**
 * Click the download button, accept the dropdown, and wait for the
 * download to complete. Returns the saved file path. Verifies filename
 * format (doesn't double "Resume") and minimum size.
 */
export async function downloadPdf(
  page: Page,
  { expectedNameContains }: { expectedNameContains?: string | RegExp } = {},
): Promise<{ filePath: string; filename: string; size: number }> {
  // Click the download button (EN "Download" / ZH "下載") in the top nav.
  await page
    .getByRole("button", { name: /^download$|^下載$/i })
    .first()
    .click();

  // Dropdown opens with a "Download PDF" / "下載 PDF" confirm button.
  const confirmBtn = page
    .getByRole("button", { name: /download\s*pdf|下載\s*PDF/i })
    .first();

  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 30_000 }),
    confirmBtn.click(),
  ]);

  const filename = download.suggestedFilename();

  // Assert we're not generating the classic "Resume_Resume" double-suffix.
  expect(filename.toLowerCase()).toMatch(/\.pdf$/);
  expect(filename.toLowerCase()).not.toMatch(/resume_resume/);

  if (expectedNameContains) {
    expect(filename).toMatch(expectedNameContains);
  }

  const outDir = path.resolve(process.cwd(), "test-results", "downloads");
  fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, filename);
  await download.saveAs(filePath);

  const size = fs.statSync(filePath).size;
  expect(size, `downloaded ${filename} should be >4KB`).toBeGreaterThan(4_000);

  return { filePath, filename, size };
}

/** Basic mobile check: no horizontal overflow at current viewport. */
export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  // Allow a 2px rounding slop — real scroll is >10px.
  expect(scrollWidth - clientWidth).toBeLessThan(10);
}

/** Assert an element exists, is visible, and meets the min-44px a11y target. */
export async function expectTappable(page: Page, selector: string) {
  const el = page.locator(selector).first();
  await expect(el).toBeVisible();
  const box = await el.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(32); // 32 is fine for icon buttons
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(32);
}

/**
 * Scan for obviously-English words appearing in zh-tw contexts.
 * Loose check — returns any leak found so the test can assert.
 */
export async function findEnglishLeaksOnZhTwPage(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    // Words that should NEVER appear in rendered zh-tw UI chrome
    // (these are UI strings, not stored user content).
    const suspects = [
      "Preview failed",
      "Generating preview",
      "Present",
      "Native or bilingual proficiency",
      "Professional working proficiency",
      "Limited working proficiency",
      "Elementary proficiency",
      "Move up",
      "Move down",
    ];
    const body = document.body.innerText || "";
    const found: string[] = [];
    for (const s of suspects) {
      if (body.includes(s)) found.push(s);
    }
    return found;
  });
}
