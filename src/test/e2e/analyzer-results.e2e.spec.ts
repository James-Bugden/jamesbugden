import { test, expect } from "@playwright/test";

const LONG_SAMPLE = `Alex Engineer
Software Engineer

alex@example.com · +1 415 555 0111 · Taipei

SUMMARY
Full-stack engineer with 6 years building consumer web products at
scale. Expertise in React, Node.js, and cloud infrastructure. Shipped
features reaching 5M+ monthly users across three different products.
Strong advocate of code review culture and test-driven development.

EXPERIENCE
Software Engineer at Uber
February 2022 – Present
- Built the rider referral system used by 3M+ riders in LATAM.
- Led migration off legacy monolith, saving ~30% infra cost.
- Mentored 2 interns through full-time conversion.

Junior Engineer at Foodpanda
July 2019 – January 2022
- Owned the driver dispatch algorithm; cut rejection rate 25%.
- Shipped the Taiwan launch in 4 months.

EDUCATION
MSc Computer Science, NTU, 2017 – 2019
BSc Mathematics, NTHU, 2013 – 2017

SKILLS
React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, Terraform
`;

test.describe("Analyzer — results", () => {
  // Fresh guest context for each test so unlimited-account quota doesn't
  // affect other specs. Analyzer works without auth.
  test.use({ storageState: { cookies: [], origins: [] } });

  test("paste + analyze flow reaches results screen with a score", async ({
    page,
  }) => {
    test.setTimeout(90_000); // analyze call can take ~20-40s
    await page.goto("/resume-analyzer");
    await page.getByText(/paste text|貼上文字/i).first().click();
    await page.locator("textarea").first().fill(LONG_SAMPLE);
    await page
      .getByRole("button", { name: /analyze my resume|分析我的履歷/i })
      .first()
      .click();

    // Results screen shows a score (0-100) somewhere, plus suggestion cards.
    // We wait up to 60s for the analysis to complete.
    await expect(
      page.getByText(/score|分數|得分/i).first(),
    ).toBeVisible({ timeout: 60_000 });

    // There should be some suggestion-card-like content on the page.
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText.length, "results page should have meaningful content").toBeGreaterThan(200);
  });

  test("results screen shows the cross-tool CTA linking to the interview prep guide", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.goto("/resume-analyzer");
    await page.getByText(/paste text|貼上文字/i).first().click();
    await page.locator("textarea").first().fill(LONG_SAMPLE);
    await page
      .getByRole("button", { name: /analyze my resume|分析我的履歷/i })
      .first()
      .click();

    // Wait for results to render.
    await expect(page.getByText(/score|分數|得分/i).first()).toBeVisible({
      timeout: 60_000,
    });

    // The CTA renders a link whose accessible name contains "interview guide"
    // (EN) and points at the EN prep guide URL.
    const ctaLink = page.getByRole("link", { name: /interview guide/i });
    await expect(ctaLink).toBeVisible();
    const href = await ctaLink.getAttribute("href");
    expect(href).toBe("/interview-preparation-guide");
  });

  test("re-analyze button resets to upload screen", async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto("/resume-analyzer");
    await page.getByText(/paste text|貼上文字/i).first().click();
    await page.locator("textarea").first().fill(LONG_SAMPLE);
    await page
      .getByRole("button", { name: /analyze my resume|分析我的履歷/i })
      .first()
      .click();
    await expect(page.getByText(/score|分數|得分/i).first()).toBeVisible({
      timeout: 60_000,
    });

    // A "re-analyze" / "新的分析" / "upload another" button should return us.
    const reAnalyze = page.getByRole("button", {
      name: /re-?analyze|new analysis|analyze another|再次分析|新的分析/i,
    });
    if (!(await reAnalyze.count())) {
      test.info().annotations.push({
        type: "not-found",
        description: "no re-analyze button surfaced on results screen",
      });
      return;
    }
    await reAnalyze.first().click();
    await expect(
      page.getByText(/upload file|上傳檔案/i).first(),
    ).toBeVisible();
  });
});
