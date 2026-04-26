import { test, expect } from "@playwright/test";
import { downloadPdf, waitForPreviewIdle } from "./_helpers/assertions";

test.describe("Builder — download", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();
    await waitForPreviewIdle(page);
  });

  test("download button opens dropdown with filename + A4/Letter", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /^download$|^下載$/i }).first().click();
    await expect(
      page.getByText(/^a4$|letter|a4 · letter|紙張大小/i).first(),
    ).toBeVisible({ timeout: 5_000 });
  });

  test("downloaded filename does not contain double 'Resume' suffix", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    const { filename } = await downloadPdf(page);
    expect(filename).toMatch(/\.pdf$/);
    expect(filename).not.toMatch(/Resume_Resume/i);
  });

  test("downloaded PDF is >4KB and has PDF magic bytes", async ({ page }) => {
    test.setTimeout(90_000);
    const { filePath, size } = await downloadPdf(page);
    expect(size).toBeGreaterThan(4_000);
    const fs = await import("node:fs");
    const header = fs.readFileSync(filePath).slice(0, 4).toString();
    expect(header).toBe("%PDF");
  });
});

test.describe("Builder (simple) — download", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume-simple");
    await page.waitForLoadState("domcontentloaded");
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();
    await waitForPreviewIdle(page);
  });

  test("downloaded filename does not contain double 'Resume' suffix (BUG-007)", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    const { filename } = await downloadPdf(page);
    expect(filename).toMatch(/\.pdf$/);
    expect(filename).not.toMatch(/Resume_Resume/i);
  });
});
