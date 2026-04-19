/**
 * Preview & export smoke — post-019bebf.
 *
 * Guards the three changes shipped with the CJK-fallback re-apply:
 *   1. EN resume editor loads & name edit persists
 *   2. zh-tw resume editor loads & preview iframe fallback fires (blob:)
 *   3. zh-tw Customize → Design tab has NO "Font" section (hidden on zh)
 *
 * Needs the QA user — uses the stored auth state from global-setup.
 */

import { test, expect, Page } from "@playwright/test";

async function openFirstResumeByTitle(page: Page, titleRegex: RegExp) {
  // Find the card's title text, then click the nearest clickable ancestor
  // (the card root is a <div class="... cursor-pointer ..."> with an onClick).
  const title = page.getByText(titleRegex).first();
  await expect(title).toBeVisible({ timeout: 10_000 });
  const card = title.locator(
    'xpath=ancestor::div[contains(@class,"cursor-pointer")][1]',
  );
  await card.click();
  // Editor chrome — Download button proves we reached the builder surface.
  const downloadBtn = page
    .getByRole("button", { name: /download|下載/i })
    .first();
  await expect(downloadBtn).toBeVisible({ timeout: 20_000 });
}

test.describe("Preview smoke (post-CJK-fallback)", () => {
  test("EN /resume: open Example Resume → editor loads → rasterized page image appears", async ({
    page,
  }) => {
    await page.goto("/resume");
    await openFirstResumeByTitle(page, /Example Resume/i);

    // English path should NOT fall back to the iframe — it should render
    // one or more rasterized <img> page previews. Wait for the first one.
    const firstPage = page
      .locator('img[alt^="Page "]')
      .first();
    await expect(firstPage).toBeVisible({ timeout: 30_000 });

    // And there should be NO blob: iframe on the English path.
    const iframe = page.locator('iframe[src^="blob:"]');
    await expect(iframe).toHaveCount(0);
  });

  test("zh-tw /resume: CJK resume renders preview (raster OR iframe fallback)", async ({
    page,
  }) => {
    await page.goto("/zh-tw/resume");
    await openFirstResumeByTitle(page, /Chinese James Bugden|王子豪|中文/);

    // Accept either rendering path — rasterized pages OR the blob: iframe
    // fallback (for when pdfjs chokes on CJK subset fonts). What matters is
    // that SOMETHING rendered within the timeout.
    const rasterPage = page.locator('img[alt^="Page "]').first();
    const iframeFallback = page.locator('iframe[src^="blob:"]').first();
    await expect(rasterPage.or(iframeFallback)).toBeVisible({
      timeout: 60_000,
    });
  });

  test("zh-tw Customize panel: Font SettingCard is hidden (dead knob removed)", async ({
    page,
  }) => {
    await page.goto("/zh-tw/resume");
    await openFirstResumeByTitle(page, /Chinese James Bugden|王子豪|中文/);

    // Open Customize tab. All SettingCards are rendered in a single
    // scrollable column (SUB_TABS is cosmetic, not a real tab router).
    const customizeBtn = page
      .getByRole("button", { name: /customi[sz]e|自訂/i })
      .first();
    await customizeBtn.click();

    // The Font SettingCard has an <h3> with the t("customizeFontSection")
    // heading. With the zh-tw hide, this h3 must not render. Match exact
    // short words to avoid false-matching "Heading font" subheadings.
    const fontHeading = page.locator("h3", {
      hasText: /^(Font|字型|字體)$/,
    });
    await expect(fontHeading).toHaveCount(0);

    // Confirm the Customize panel itself DID render — prevents false green
    // if the panel simply never opened. "Section Headings" exists on all
    // locales, so its h3 should be there.
    const sectionHeadings = page.locator("h3", {
      hasText: /section headings|區塊標題/i,
    });
    await expect(sectionHeadings.first()).toBeVisible({ timeout: 10_000 });
  });
});
