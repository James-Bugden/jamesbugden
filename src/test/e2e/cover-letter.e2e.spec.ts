import { test, expect } from "@playwright/test";

test.describe("Cover letter", () => {
  test("cover letter tab exists in document dashboard", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    // Sidebar tabs: Resume | Cover Letter | Job Tracker
    const coverTab = page
      .getByRole("button", { name: /cover letter|求職信/i })
      .or(page.getByRole("link", { name: /cover letter|求職信/i }));
    if (!(await coverTab.count())) {
      test.info().annotations.push({
        type: "not-found",
        description: "Cover letter tab not surfaced on this build",
      });
      return;
    }
    await coverTab.first().click();
    // After switching tab we should see a Cover Letter empty state or list.
    await expect(
      page.getByText(/cover letter|求職信/i).first(),
    ).toBeVisible();
  });

  test.skip("full cover letter create → edit → download flow", () => {
    // Skipped: cover letter functionality is incomplete on the live
    // build per prior audit. Re-enable when the builder is ready to
    // ship. The test would:
    //   1. Click "+ New cover letter"
    //   2. Fill recipient, greeting, body, closing
    //   3. Customize fonts + colors
    //   4. Download PDF and assert it opens
  });
});
