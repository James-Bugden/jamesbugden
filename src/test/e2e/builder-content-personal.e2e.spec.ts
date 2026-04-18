import { test, expect } from "@playwright/test";
import { deleteAllTestResumes, injectTestPhoto } from "./_helpers/resume";
import { waitForPreviewIdle } from "./_helpers/assertions";

test.describe("Builder — personal details", () => {
  // Cleanup any leftover QA_TEST_* resumes before AND after so we don't
  // bump into the 2-resume cap mid-suite.
  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext({
      storageState: "playwright/.auth/qa-user.json",
    });
    const page = await ctx.newPage();
    await page.goto(
      (process.env.QA_BASE_URL || "https://jamesbugden.com") + "/resume",
      { waitUntil: "domcontentloaded" },
    );
    await deleteAllTestResumes(page);
    await ctx.close();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
  });

  test("dashboard renders with My Resumes header", async ({ page }) => {
    // Sanity check — the resume-builder landing page should show the
    // dashboard. Creating/editing is covered in builder-docs-dashboard.
    await expect(
      page.getByText(/my resumes|我的履歷/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("editing an existing resume: fullName change persists to localStorage", async ({
    page,
  }) => {
    // Find the first existing resume card and click to open it. If the
    // dashboard is empty, skip — covered by builder-docs-dashboard's
    // create flow.
    const firstCard = page.locator('[data-resume-card], article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume to edit");

    // The card has a "View" button. Click it or the card itself.
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) {
      await viewBtn.click();
    } else {
      await firstCard.click();
    }

    // We should be in the editor now. Find the Full Name field.
    const fullName = page.getByLabel(/full name|^全名$/i).first();
    await fullName.waitFor({ state: "visible", timeout: 10_000 });
    const marker = `QA_Test_${Date.now()}`;
    await fullName.fill(marker);
    // Blur to trigger save.
    await fullName.blur();
    // Auto-save debounce is ~600ms; give it 1.5s.
    await page.waitForTimeout(1_500);

    // Read localStorage and assert the name propagated.
    const names = await page.evaluate(() => {
      const raw = localStorage.getItem("james_careers_documents");
      if (!raw) return [];
      const docs = JSON.parse(raw);
      return docs.map((d: any) => d.data?.personalDetails?.fullName);
    });
    expect(names.some((n: string) => n === marker)).toBe(true);
  });

  test("XSS in fullName renders as text (does not execute)", async ({
    page,
  }) => {
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume to edit");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();

    const fullName = page.getByLabel(/full name|^全名$/i).first();
    await fullName.waitFor({ state: "visible", timeout: 10_000 });

    let dialogOpened = false;
    page.on("dialog", async (dlg) => {
      dialogOpened = true;
      await dlg.dismiss();
    });

    await fullName.fill('<script>alert("xss")</script>');
    await fullName.blur();
    await page.waitForTimeout(2_000);

    expect(dialogOpened, "XSS must not execute").toBe(false);

    // The fullName in localStorage should contain the literal string.
    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem("james_careers_documents");
      if (!raw) return null;
      const docs = JSON.parse(raw);
      return docs[0]?.data?.personalDetails?.fullName;
    });
    expect(stored).toContain("<script>");
  });

  test("preview renders when photo is present", async ({ page }) => {
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume to edit");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();

    // Inject photo data directly since UI file upload can be flaky.
    const names = await page.evaluate(() => {
      const raw = localStorage.getItem("james_careers_documents");
      if (!raw) return [];
      return JSON.parse(raw).map((d: any) => d.name);
    });
    if (names.length === 0) test.skip(true, "no resume name available");
    await injectTestPhoto(page, names[0]);
    await page.reload();
    await waitForPreviewIdle(page);
    // Preview rendered a page image.
    await expect(page.locator('img[alt^="Page "]').first()).toBeVisible();
  });
});
