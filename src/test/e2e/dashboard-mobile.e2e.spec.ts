import { test, expect } from "@playwright/test";
import { expectNoHorizontalScroll } from "./_helpers/assertions";

test.describe("Dashboard @mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("no horizontal scroll at 390px", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("domcontentloaded");
    await expectNoHorizontalScroll(page);
  });

  test("tool cards stack (are not side-by-side at narrow viewport)", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("domcontentloaded");
    // Find two tool cards and compare their x coordinates. If they're
    // stacked vertically, the second card's top should be greater than
    // the first's bottom.
    const cards = page.locator("a, button").filter({
      hasText: /resume|analyzer|salary|offer/i,
    });
    const count = await cards.count();
    if (count < 2) test.skip(true, "<2 cards found");
    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    if (!first || !second) test.skip(true, "bounding box unavailable");
    // Stacked if second card's top is below the first card's top with
    // meaningful vertical separation (>20px).
    expect(second.y - first.y).toBeGreaterThan(20);
  });

  test("homepage renders without horizontal scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expectNoHorizontalScroll(page);
  });
});
