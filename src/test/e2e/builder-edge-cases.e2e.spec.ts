/**
 * Edge-case safety net for the resume builder.
 *
 * Covers the non-happy-path scenarios:
 *   1. XSS in fullName does not execute / does not crash preview.
 *   2. Corrupted localStorage doesn't kill the dashboard — user lands
 *      on a usable page with an empty-state rather than a blank screen.
 *   3. Editor survives being closed & reopened (state persistence).
 */

import { test, expect, Page } from "@playwright/test";

async function openExampleResume(page: Page) {
  const title = page.getByText(/Example Resume/i).first();
  await expect(title).toBeVisible({ timeout: 10_000 });
  const card = title.locator(
    'xpath=ancestor::div[contains(@class,"cursor-pointer")][1]',
  );
  await card.click();
  await expect(
    page.getByRole("button", { name: /download/i }).first(),
  ).toBeVisible({ timeout: 20_000 });
}

test.describe("Builder — edge cases", () => {
  test("XSS payload in fullName is rendered as text, not executed", async ({
    page,
  }) => {
    test.setTimeout(60_000);

    // Guard: a successful XSS would create a window-level side effect.
    // If the payload fires, __xssFired becomes true.
    await page.addInitScript(() => {
      (window as any).__xssFired = false;
    });

    let dialogSeen = false;
    page.on("dialog", async (d) => {
      dialogSeen = true;
      await d.dismiss();
    });

    await page.goto("/resume");
    await openExampleResume(page);

    const payload = '<img src=x onerror="window.__xssFired=true;alert(1)">';
    const nameInput = page
      .locator('label:has-text("Full Name") + input, input[name="fullName"]')
      .first();
    if (!(await nameInput.count())) test.skip(true, "name input not found");

    await nameInput.fill(payload);
    // Let the debounced regen complete.
    await page.waitForTimeout(1_500);

    // Preview should still render.
    await expect(
      page.locator('img[alt^="Page "]').first(),
    ).toBeVisible({ timeout: 20_000 });

    const fired = await page.evaluate(
      () => Boolean((window as any).__xssFired),
    );
    expect(fired, "XSS payload executed").toBe(false);
    expect(dialogSeen, "alert() dialog fired — XSS executed").toBe(false);
  });

  test("Corrupted localStorage — dashboard still loads without white screen", async ({
    page,
  }) => {
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    // Jam an invalid JSON blob into the documents key.
    await page.evaluate(() => {
      localStorage.setItem("james_careers_documents", "{not json");
    });

    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    // Page chrome must still render — some visible text proves we didn't
    // white-screen into an uncaught SyntaxError.
    await expect(page.locator("body")).not.toBeEmpty();

    // The "New Resume" / "+ 新增履歷" CTA is always present on the
    // dashboard, corrupted state or not. Its appearance proves graceful
    // recovery.
    const newBtn = page
      .getByRole("button", { name: /new resume|新增履歷/i })
      .first();
    await expect(newBtn).toBeVisible({ timeout: 10_000 });
  });

  test("Closing and re-opening the editor preserves content", async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await page.goto("/resume");
    await openExampleResume(page);

    const nameInput = page
      .locator('label:has-text("Full Name") + input, input[name="fullName"]')
      .first();
    if (!(await nameInput.count())) test.skip(true, "name input not found");

    const marker = `QA_PERSIST_${Date.now()}`;
    await nameInput.fill(marker);
    // Let autosave fire.
    await page.waitForTimeout(1_500);

    // Navigate away and back.
    await page.goto("/resume");
    await page.waitForLoadState("domcontentloaded");

    // The card title reflects the name we set (the card reads from the
    // same stored data).
    await expect(page.getByText(marker).first()).toBeVisible({
      timeout: 10_000,
    });

    // Restore the original name so we don't pollute the QA account.
    await openExampleResume(page);
    const restoreInput = page
      .locator('label:has-text("Full Name") + input, input[name="fullName"]')
      .first();
    await restoreInput.fill("Example Resume");
    await page.waitForTimeout(1_500);
  });
});
