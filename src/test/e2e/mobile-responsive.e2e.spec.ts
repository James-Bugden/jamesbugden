import { test, expect } from "@playwright/test";
import { expectNoHorizontalScroll } from "./_helpers/assertions";

// All tests tagged @mobile — the chromium-mobile project picks these up
// with Pixel 5 viewport (393×851 logical). On desktop project they're skipped.
test.describe("@mobile responsive", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  const paths = [
    "/",
    "/login",
    "/resume-analyzer",
    "/dashboard",
    "/resume",
    "/zh-tw",
    "/zh-tw/resume-analyzer",
    "/zh-tw/dashboard",
  ];

  for (const path of paths) {
    test(`no horizontal scroll at ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("domcontentloaded");
      await expectNoHorizontalScroll(page);
    });
  }

  test("builder: customize tab template grid stacks to 1 col (BUG-E verify)", async ({
    page,
  }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume to edit");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();

    // Open Customize tab.
    await page.getByRole("button", { name: /customize|自訂樣式/i }).first().click();
    await page.waitForTimeout(1_000);

    // Template cards should be vertically stacked — compare first two.
    const cards = page.getByRole("button").filter({
      hasText: /classic|modern|經典|現代/i,
    });
    if ((await cards.count()) < 2) test.skip(true, "<2 template cards visible");
    const a = await cards.nth(0).boundingBox();
    const b = await cards.nth(1).boundingBox();
    if (!a || !b) test.skip(true, "bounding boxes unavailable");
    // On mobile grid is 1 col → cards stack vertically.
    expect(b.y - a.y).toBeGreaterThan(50);
  });
});
