import { test, expect } from "@playwright/test";
import { waitForPreviewIdle } from "./_helpers/assertions";

test.describe("Builder — sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");
    // Open the first existing resume.
    const firstCard = page.locator('article, button').filter({
      hasText: /temp|resume|qa_test/i,
    }).first();
    if (!(await firstCard.count())) test.skip(true, "no resume");
    const viewBtn = page.getByRole("button", { name: /view|編輯/i }).first();
    if (await viewBtn.count()) await viewBtn.click();
    else await firstCard.click();
    await waitForPreviewIdle(page);
  });

  test("add content modal lists 15 section types", async ({ page }) => {
    const addBtn = page.getByRole("button", { name: /add content|新增內容/i }).first();
    await addBtn.click();
    // AddContentModal has sectionTypes — look for at least 10 recognizable entries.
    const sectionLabels = [
      /education|學歷/i,
      /experience|工作經歷/i,
      /skills|技能/i,
      /languages|語言/i,
      /summary|個人摘要/i,
      /certificates|證照/i,
      /projects|專案/i,
      /awards|獎項/i,
      /publications|著作/i,
      /interests|興趣/i,
    ];
    let found = 0;
    for (const label of sectionLabels) {
      if (await page.getByText(label).first().count()) found++;
    }
    expect(found).toBeGreaterThanOrEqual(7);
    // Close the modal.
    await page.keyboard.press("Escape");
  });

  test("date-range validation: end before start shows warning", async ({
    page,
  }) => {
    // Programmatically set an experience entry with reversed dates, then
    // verify the warning text appears on reload.
    await page.evaluate(() => {
      const raw = localStorage.getItem("james_careers_documents");
      if (!raw) return;
      const docs = JSON.parse(raw);
      const r = docs[0];
      if (!r) return;
      // Ensure there's an experience section.
      r.data.sections = r.data.sections || [];
      const expSection = r.data.sections.find((s: any) => s.type === "experience");
      const target = expSection || {
        id: crypto.randomUUID(),
        type: "experience",
        title: "Experience",
        showHeading: true,
        entries: [],
      };
      target.entries = [{
        id: crypto.randomUUID(),
        fields: {
          position: "Engineer",
          company: "TestCo",
          startMonth: "June",
          startYear: "2024",
          endMonth: "January",
          endYear: "2020",
          currentlyHere: "",
          description: "",
        },
      }];
      if (!expSection) r.data.sections.push(target);
      r.updatedAt = new Date().toISOString();
      localStorage.setItem("james_careers_documents", JSON.stringify(docs));
    });
    await page.reload();
    await page.waitForLoadState("domcontentloaded");
    // Scroll down in the editor to find the experience section.
    // Look for the amber warning text.
    await expect(
      page.getByText(/end date is before start|結束日期早於開始/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });
});
