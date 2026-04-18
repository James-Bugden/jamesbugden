import { test, expect } from "@playwright/test";

test.describe("Analyzer — history", () => {
  test("authed user: /resume-analyzer loads without error, history either empty or listed", async ({
    page,
  }) => {
    await page.goto("/resume-analyzer");
    await page.waitForLoadState("domcontentloaded");

    // The analyzer upload screen should always render; history appears
    // only once logged-in + past analyses exist. We just confirm the
    // page doesn't crash and the upload/paste UI is present.
    await expect(
      page.getByText(/upload file|上傳檔案/i).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/paste text|貼上文字/i).first(),
    ).toBeVisible();
  });

  test.describe("guest", () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test("guest does not see analysis history section", async ({ page }) => {
      await page.goto("/resume-analyzer");
      await page.waitForLoadState("domcontentloaded");
      // There should be no "analysis history" / "past analyses" heading.
      // (The landing page's "How It Works" section is not history.)
      const history = page.getByRole("heading", {
        name: /analysis history|past analyses|分析紀錄/i,
      });
      expect(await history.count()).toBe(0);
    });
  });
});
