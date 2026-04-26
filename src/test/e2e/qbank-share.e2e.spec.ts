/**
 * Per-category share buttons on /zh-tw/interview-questions (HIR-39).
 *
 * Acceptance: each category chip on the zh-tw question bank has a sibling
 * share button. Clicking it navigates to a LINE share intent whose `text`
 * param contains the issue-mandated ZH copy and a deep link with
 * `?cat=<key>` so the destination page lands on that category filter.
 */

import { test, expect, Page } from "@playwright/test";

// Public route — no auth needed.
test.use({ storageState: { cookies: [], origins: [] } });

/**
 * On mobile viewports the filter panel starts collapsed behind a "篩選"
 * toggle. On desktop the panel is always visible. Clicks the toggle if
 * present and waits for the category chips to render.
 */
async function openFilterPanelIfCollapsed(page: Page): Promise<void> {
  const shareBtn = page.getByTestId("qbank-share-behavioral");
  if (await shareBtn.isVisible().catch(() => false)) return;

  const toggle = page.getByRole("button", { name: /^篩選/ }).first();
  await toggle.waitFor({ state: "visible", timeout: 10_000 });
  await toggle.scrollIntoViewIfNeeded();
  await toggle.click();
  await shareBtn.waitFor({ state: "visible", timeout: 10_000 });
}

const SAMPLE_CATEGORIES: Array<{ key: string; zh: string }> = [
  { key: "behavioral", zh: "行為題" },
  { key: "salary_comp", zh: "薪資與福利" },
];

test.describe("zh-tw interview-questions per-category share", () => {
  test("renders a share button per category chip with a Chinese aria-label @mobile", async ({
    page,
  }) => {
    await page.goto("/zh-tw/interview-questions");
    await page.waitForLoadState("domcontentloaded");

    await openFilterPanelIfCollapsed(page);

    for (const cat of SAMPLE_CATEGORIES) {
      const shareBtn = page.getByTestId(`qbank-share-${cat.key}`);
      await expect(shareBtn).toBeVisible({ timeout: 10_000 });
      await expect(shareBtn).toHaveAttribute(
        "aria-label",
        new RegExp(`分享.*${cat.zh}.*LINE`),
      );
    }
  });

  test("clicking a share button opens a LINE share popup AND fires the event_tracks insert", async ({
    context,
    page,
  }) => {
    // Stub the LINE redirect so the popup doesn't try to actually load line.me.
    await context.route("https://line.me/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<html><body>LINE share stub</body></html>",
      }),
    );

    await page.goto("/zh-tw/interview-questions");
    await page.waitForLoadState("domcontentloaded");
    await openFilterPanelIfCollapsed(page);

    const shareBtn = page.getByTestId("qbank-share-behavioral");
    await expect(shareBtn).toBeVisible({ timeout: 10_000 });

    // Both the popup (LINE deep link) and the analytics POST should fire on click.
    const eventReqPromise = page.waitForRequest(
      (req) =>
        req.method() === "POST" && /\/rest\/v1\/event_tracks/.test(req.url()),
      { timeout: 10_000 },
    );
    const popupPromise = context.waitForEvent("page", { timeout: 10_000 });

    await shareBtn.click();

    const [popup, eventReq] = await Promise.all([popupPromise, eventReqPromise]);

    const popupUrl = new URL(popup.url());
    expect(popupUrl.host).toBe("line.me");
    const text = popupUrl.searchParams.get("text") || "";
    expect(text).toContain("我在用這個網站準備面試");
    expect(text).toMatch(/zh-tw\/interview-questions\?cat=behavioral/);

    const body = eventReq.postDataJSON();
    expect(body.event_name).toBe("interview_question_share");
    expect(body.metadata).toMatchObject({
      category: "behavioral",
      locale: "zh-tw",
    });
  });
});
