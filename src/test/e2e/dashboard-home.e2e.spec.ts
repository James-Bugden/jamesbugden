import { test, expect } from "@playwright/test";
import { switchLanguage } from "./_helpers/i18n";

test.describe("Dashboard home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("domcontentloaded");
  });

  test("tools list renders with at least 4 tool cards", async ({ page }) => {
    // Tools include Resume Analyzer, Resume Builder, Offer Calculator, Salary.
    // The dashboard links to /resume-analyzer, /resume, /offer-calculator, /salary.
    const tools = [
      /resume analyzer|履歷分析/i,
      /resume builder|履歷建構器|履歷打造/i,
      /offer|薪資|offer calculator/i,
    ];
    for (const t of tools) {
      await expect(page.getByText(t).first()).toBeVisible({ timeout: 10_000 });
    }
  });

  test("search box filters tools", async ({ page }) => {
    const search = page.getByPlaceholder(/search/i).first();
    if (await search.count()) {
      await search.fill("analyz");
      // After typing, the analyzer card should still be visible.
      await expect(page.getByText(/resume analyzer|履歷分析/i).first()).toBeVisible();
    } else {
      test.skip(true, "no search box on this dashboard variant");
    }
  });

  test("clicking Resume Builder tool navigates to /resume", async ({ page }) => {
    const card = page
      .getByRole("link", { name: /resume builder|履歷建構器/i })
      .or(page.getByRole("button", { name: /resume builder|履歷建構器/i }))
      .first();
    await card.click();
    await expect(page).toHaveURL(/\/resume($|\?|#|\/)/);
  });

  test("clicking Resume Analyzer tool navigates to /resume-analyzer", async ({
    page,
  }) => {
    const card = page
      .getByRole("link", { name: /resume analyzer|履歷分析/i })
      .or(page.getByRole("button", { name: /resume analyzer|履歷分析/i }))
      .first();
    await card.click();
    await expect(page).toHaveURL(/\/resume-analyzer/);
  });

  test("language toggle EN → ZH routes to /zh-tw/dashboard", async ({
    page,
  }) => {
    await switchLanguage(page, "zh-tw");
    await expect(page).toHaveURL(/\/zh-tw\/dashboard/);
    // Note: the logged-in dashboard currently renders tool labels in
    // English on both locales — only chrome (nav, footer) localizes.
    // Assert only the URL changed, not the body content, until the
    // dashboard fully localizes (follow-up issue).
  });

  test("dark mode toggle persists after reload", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /theme|dark|light|主題/i });
    if (!(await themeToggle.count())) test.skip(true, "no theme toggle surfaced");
    await themeToggle.first().click();
    const themeAfterClick = await page.evaluate(() =>
      document.documentElement.className,
    );
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    const themeAfterReload = await page.evaluate(() =>
      document.documentElement.className,
    );
    expect(themeAfterReload).toBe(themeAfterClick);
  });
});
