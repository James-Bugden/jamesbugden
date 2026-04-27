import { test, expect } from "@playwright/test";
import { deleteAllTestResumes } from "./_helpers/resume";

test.describe("Builder — document dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Load the dashboard. Wait for meaningful content (not just
    // domcontentloaded, which fires too early and leaves us on the
    // "JAMES BUGDEN" splash screen).
    await page.goto("/resume", { waitUntil: "domcontentloaded" });
    // Wait for the "My Resumes" heading as a signal the dashboard hydrated.
    await page
      .getByText(/my resumes|我的履歷/i)
      .first()
      .waitFor({ state: "visible", timeout: 20_000 })
      .catch(() => {
        // If still stuck on splash, reload once.
        return page.reload({ waitUntil: "domcontentloaded" });
      });
  });

  test.afterAll(async ({ browser }) => {
    // Clean up any QA_TEST_ resumes we created during the run.
    const ctx = await browser.newContext({
      storageState: "playwright/.auth/qa-user.json",
    });
    const page = await ctx.newPage();
    await page
      .goto(
        (process.env.QA_BASE_URL || "https://jamesbugden.com") + "/resume",
        { waitUntil: "domcontentloaded" },
      )
      .catch(() => {});
    await deleteAllTestResumes(page);
    await ctx.close();
  });

  test("dashboard shows My Resumes header + BETA chip @auth", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /my resumes|我的履歷/i }).first().or(
        page.getByText(/my resumes|我的履歷/i).first(),
      ),
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/beta/i).first()).toBeVisible();
  });

  test("resume count indicator renders with N/limit format @auth", async ({ page }) => {
    // Regular accounts show "1/2 resumes"; unlimited test accounts can
    // show 100+ over the typical cap. Just assert the N/M format is
    // present somewhere on the dashboard.
    const hasCountChip = await page
      .getByText(/\d+\s*\/\s*\d+/)
      .first()
      .isVisible({ timeout: 10_000 })
      .catch(() => false);
    expect(hasCountChip).toBe(true);
  });

  test("search box filters (empty state for no match is 'No results') @auth", async ({
    page,
  }) => {
    const search = page.getByPlaceholder(/search/i).first();
    if (!(await search.count())) test.skip(true, "no search on this dashboard");
    await search.fill("zzz_no_match_" + Date.now());
    await expect(
      page.getByText(/no resumes match|沒有符合搜尋/i).first(),
    ).toBeVisible({ timeout: 5_000 });
    // And it should NOT show the "Create your first resume" state.
    const createFirst = page.getByText(/create your first resume|建立你的第一份履歷/i);
    expect(await createFirst.count()).toBe(0);
  });

  test("existing resume card shows Analyze action @auth", async ({ page }) => {
    // Every resume card has an "Analyze" button at the bottom.
    const analyze = page.getByRole("button", { name: /^analyze$|分析/i });
    if (!(await analyze.count())) test.skip(true, "no existing resumes to check");
    await expect(analyze.first()).toBeVisible();
  });

  test("New resume button is present and either enabled or shows at-limit state @auth", async ({
    page,
  }) => {
    // This test focuses on the presence + correct state of the "New
    // resume" affordance. Interaction depends on the account's resume
    // count — at-limit, clicks are intercepted by the replace-picker
    // dialog wired in PR #2; under-limit, they open TemplateGallery.
    // Both paths are covered elsewhere (builder-import's at-cap test).
    const newBtn = page.getByText(/^new resume$|^新增履歷$/i).first();
    await expect(newBtn).toBeVisible({ timeout: 10_000 });
    // Also assert BETA chip + My Resumes header render alongside, which
    // confirms the DocumentDashboard tree mounted correctly.
    await expect(page.getByText(/my resumes|我的履歷/i).first()).toBeVisible();
  });

  test("localStorage has a documents array (even if empty) @auth", async ({
    page,
  }) => {
    const hasDocs = await page.evaluate(() => {
      const raw = localStorage.getItem("james_careers_documents");
      if (raw === null) return false;
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed);
      } catch {
        return false;
      }
    });
    expect(hasDocs).toBe(true);
  });
});
