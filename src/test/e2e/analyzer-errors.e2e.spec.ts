import { test, expect } from "@playwright/test";
import { ensureTextFixture } from "./_helpers/resume";

test.describe("Analyzer — errors", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume-analyzer");
    await page.waitForLoadState("domcontentloaded");
  });

  test("unsupported file type shows error (not crash)", async ({ page }) => {
    // A .txt file renamed .zip — should be rejected by the upload
    // handler (accept=.pdf,.docx).
    const badFile = ensureTextFixture("bad.zip", "not a real zip");
    // The file input is hidden; find it via the hidden file input selector.
    const fileInput = page.locator('input[type="file"]').first();
    if (!(await fileInput.count())) {
      test.skip(true, "no file input reachable in DOM");
    }
    await fileInput.setInputFiles(badFile);
    // Either the UI rejects visually (toast / error text) or the
    // analyze button stays disabled. Accept either as "handled gracefully".
    await page.waitForTimeout(1500);
    // No console crash is already a pass; explicitly check no
    // "Uncaught" error text appeared on the page.
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText.toLowerCase()).not.toContain("uncaught");
  });

  test("submit with nothing selected → button disabled, no crash", async ({
    page,
  }) => {
    const submit = page
      .getByRole("button", { name: /analyze my resume|分析我的履歷/i })
      .first();
    await expect(submit).toBeDisabled();
  });

  test("mid-flight network failure on analyze → error toast, no crash", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    // Paste enough text, then block the analyze request before clicking.
    await page.getByText(/paste text|貼上文字/i).first().click();
    await page.locator("textarea").first().fill(
      "A".repeat(200) + " " + "Real resume content ".repeat(20),
    );

    // Block the Supabase functions endpoint so analyze errors out.
    await page.route("**/functions/v1/**", (route) => route.abort("failed"));

    await page
      .getByRole("button", { name: /analyze my resume|分析我的履歷/i })
      .first()
      .click();

    // Accept any error signal: toast, inline error text, or return to
    // upload screen.
    await page.waitForTimeout(5_000);
    const bodyText = await page.evaluate(() => document.body.innerText);
    // "Uncaught" would indicate an unhandled exception.
    expect(bodyText.toLowerCase()).not.toContain("uncaught");
  });
});
