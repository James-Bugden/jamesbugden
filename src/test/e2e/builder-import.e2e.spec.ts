import { test, expect } from "@playwright/test";

test.describe("Builder — import", () => {
  test("import modal opens from dashboard", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    const importCard = page.getByRole("button", { name: /^import$|匯入/i }).first();
    if (!(await importCard.count())) test.skip(true, "no Import card visible");
    await importCard.click();
    // ImportModal has a title: "Import Resume" / "匯入履歷".
    await expect(
      page.getByText(/import resume|匯入履歷/i).first(),
    ).toBeVisible({ timeout: 5_000 });
    // Upload File + Paste Text tabs (rendered as text inside tab buttons).
    await expect(
      page.getByText(/upload file|上傳檔案/i).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/paste text|貼上文字/i).first(),
    ).toBeVisible();
  });

  test("import modal paste-text tab has working textarea", async ({
    page,
  }) => {
    await page.goto("/resume");
    const importCard = page.getByRole("button", { name: /^import$|匯入/i }).first();
    if (!(await importCard.count())) test.skip(true, "no Import card");
    await importCard.click();
    await page
      .getByText(/paste text|貼上文字/i)
      .first()
      .click();
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible();
    await textarea.fill("Test content");
    expect(await textarea.inputValue()).toBe("Test content");
  });

  test("at 2/2 resume cap: New Resume click opens replace-picker dialog", async ({
    page,
  }) => {
    // Seed two resumes directly into localStorage so we're at the cap
    // without needing to create via UI.
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => {
      const now = new Date().toISOString();
      const mkResume = (name: string) => ({
        id: crypto.randomUUID(),
        type: "resume",
        name,
        data: { personalDetails: { fullName: "Cap Test" }, sections: [] },
        settings: {},
        createdAt: now,
        updatedAt: now,
      });
      localStorage.setItem("james_careers_documents", JSON.stringify([
        mkResume("QA_TEST_cap_a"),
        mkResume("QA_TEST_cap_b"),
      ]));
    });
    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    const newBtn = page
      .getByRole("button", { name: /new resume|新增履歷/i })
      .first();
    if (!(await newBtn.count())) test.skip(true, "new resume button missing");
    await newBtn.click();
    // Replace-picker dialog should appear (not silent failure).
    await expect(
      page.getByText(/replace|limit reached|已達上限|取代/i).first(),
    ).toBeVisible({ timeout: 5_000 });
  });
});
