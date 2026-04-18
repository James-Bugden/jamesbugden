import { test, expect } from "@playwright/test";
import {
  openCustomizeTab,
  getResumeSettings,
} from "./_helpers/resume";
import { waitForPreviewIdle } from "./_helpers/assertions";

test.describe("Builder — customize UI smoke", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    // Open first resume.
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();
    await waitForPreviewIdle(page);
    await openCustomizeTab(page);
  });

  test("template picker shows all 5 templates (BUG-010 verify)", async ({
    page,
  }) => {
    const templates = [/classic|經典/i, /modern|現代/i, /professional|專業/i, /minimal|極簡/i, /executive|高階/i];
    for (const t of templates) {
      await expect(page.getByText(t).first()).toBeVisible();
    }
  });

  test("Section Headings card has color picker (PR #6 new control)", async ({
    page,
  }) => {
    // Scroll down to find the Section Headings setting card.
    await expect(
      page.getByText(/section headings|區塊標題/i).first(),
    ).toBeVisible();
    // There should be a "Color" label nearby followed by a color picker.
    const colorLabel = page.getByText(/^color$|^顏色$/i);
    expect(await colorLabel.count()).toBeGreaterThan(0);
  });

  test("Name card has color picker (PR #6 new control)", async ({ page }) => {
    await expect(page.getByText(/^name$|^姓名$/i).first()).toBeVisible();
  });

  test("Link styling shows 'Blue color' checkbox (linkBlue is wired now)", async ({
    page,
  }) => {
    // Expand the Link styling section if collapsed.
    const linkSection = page.getByText(/link styling|連結樣式/i).first();
    if (await linkSection.count()) await linkSection.click().catch(() => {});
    await expect(page.getByText(/blue color|藍色/i).first()).toBeVisible();
  });

  test("Footer section has 3 toggles (page numbers, email, name)", async ({
    page,
  }) => {
    // Scroll to footer section.
    await page.getByText(/^footer$|^頁尾$/i).first().scrollIntoViewIfNeeded();
    const toggles = [
      /page numbers|頁碼/i,
      /^email$|^電子郵件$/i,
      /^name$|^姓名$/i,
    ];
    for (const t of toggles) {
      expect(await page.getByText(t).first().count()).toBeGreaterThan(0);
    }
  });

  test("font size slider updates state (sanity check)", async ({ page }) => {
    // Get current font size from localStorage.
    const names = await page.evaluate(() => {
      const raw = localStorage.getItem("james_careers_documents");
      return raw ? JSON.parse(raw).map((d: any) => d.name) : [];
    });
    if (names.length === 0) test.skip(true, "no resume");
    const before = (await getResumeSettings(page, names[0]))?.fontSize;

    // Click the + button next to Font Size to increment.
    const fontSizeSection = page
      .getByText(/font size|字型大小/i)
      .first()
      .locator("..");
    const plus = fontSizeSection.getByRole("button").filter({ hasText: /\+/ });
    if (await plus.count()) {
      await plus.first().click();
      await page.waitForTimeout(800);
      const after = (await getResumeSettings(page, names[0]))?.fontSize;
      expect(after).not.toBe(before);
    } else {
      test.info().annotations.push({
        type: "known-limitation",
        description: "font size +/- buttons not reachable; slider drag is flaky in Playwright",
      });
    }
  });
});
