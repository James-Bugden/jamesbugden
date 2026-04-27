import { test, expect } from "@playwright/test";
import { findEnglishLeaksOnZhTwPage } from "./_helpers/assertions";

test.describe("i18n — zh-tw coverage", () => {
  test("homepage zh-tw has no English UI-string leaks", async ({ page }) => {
    await page.goto("/zh-tw");
    await page.waitForLoadState("domcontentloaded");
    const leaks = await findEnglishLeaksOnZhTwPage(page);
    expect(leaks, `English UI strings leaked: ${leaks.join(", ")}`).toEqual([]);
  });

  test("dashboard zh-tw has no English UI-string leaks @auth", async ({ page }) => {
    await page.goto("/zh-tw/dashboard");
    await page.waitForLoadState("domcontentloaded");
    const leaks = await findEnglishLeaksOnZhTwPage(page);
    expect(leaks, `English UI strings leaked: ${leaks.join(", ")}`).toEqual([]);
  });

  test("resume builder zh-tw preview + edit screen has no UI leaks @auth", async ({
    page,
  }) => {
    await page.goto("/zh-tw/resume");
    await page.waitForLoadState("domcontentloaded");
    const leaks = await findEnglishLeaksOnZhTwPage(page);
    expect(leaks, `English UI strings leaked: ${leaks.join(", ")}`).toEqual([]);
  });

  test("import modal in zh-tw has Chinese title + tabs (BUG-006 verify) @auth", async ({
    page,
  }) => {
    await page.goto("/zh-tw/resume");
    await page.waitForLoadState("domcontentloaded");
    const importCard = page.getByRole("button", { name: /匯入/ }).first();
    if (!(await importCard.count())) test.skip(true, "import card not visible");
    await importCard.click();
    await expect(page.getByText(/匯入履歷/).first()).toBeVisible();
    await expect(page.getByText(/上傳檔案/).first()).toBeVisible();
    await expect(page.getByText(/貼上文字/).first()).toBeVisible();
  });

  test("resume-analyzer zh-tw has no English UI-string leaks @auth", async ({
    page,
  }) => {
    await page.goto("/zh-tw/resume-analyzer");
    await page.waitForLoadState("domcontentloaded");
    const leaks = await findEnglishLeaksOnZhTwPage(page);
    expect(leaks, `English UI strings leaked: ${leaks.join(", ")}`).toEqual([]);
  });
});
