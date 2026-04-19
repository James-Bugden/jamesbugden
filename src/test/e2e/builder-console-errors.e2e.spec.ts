/**
 * Console-error sentinel for the resume builder.
 *
 * Any console.error or unhandled page error during the critical builder
 * flows (editor load, edit, customize, zh-tw) should fail the test. Real
 * users hit these silently — tests should not.
 *
 * Allowlist known-benign noise (e.g. favicon 404 on localhost, known
 * third-party warnings) so this doesn't become a flake generator.
 */

import { test, expect, Page, ConsoleMessage } from "@playwright/test";

const IGNORED_ERROR_PATTERNS: RegExp[] = [
  // Fast Refresh "full reload" messages show up as warnings, not errors,
  // but keep a slot for future known-benigns.
  /favicon\.ico.*404/i,
  // Supabase client occasionally logs a non-fatal warning about refresh
  // tokens when the session is valid — not our bug.
  /refresh.*token.*PKCE/i,
  // pdfjs logs a benign warning about font substitution for CJK subsets.
  /Warning: Ignoring invalid character/i,
  /Warning: TT: undefined function/i,
];

function attachConsoleGuard(page: Page): { errors: string[] } {
  const errors: string[] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (IGNORED_ERROR_PATTERNS.some((re) => re.test(text))) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => {
    const text = err.message ?? String(err);
    if (IGNORED_ERROR_PATTERNS.some((re) => re.test(text))) return;
    errors.push(`pageerror: ${text}`);
  });
  return { errors };
}

async function openFirstResume(page: Page, titleRegex: RegExp) {
  const title = page.getByText(titleRegex).first();
  await expect(title).toBeVisible({ timeout: 10_000 });
  const card = title.locator(
    'xpath=ancestor::div[contains(@class,"cursor-pointer")][1]',
  );
  await card.click();
  const downloadBtn = page
    .getByRole("button", { name: /download|下載/i })
    .first();
  await expect(downloadBtn).toBeVisible({ timeout: 20_000 });
}

test.describe("Builder — console error sentinel", () => {
  test("EN /resume editor load produces no console errors", async ({ page }) => {
    const { errors } = attachConsoleGuard(page);
    await page.goto("/resume");
    await openFirstResume(page, /Example Resume/i);
    // Let the first raster tick complete.
    await page
      .locator('img[alt^="Page "]')
      .first()
      .waitFor({ state: "visible", timeout: 30_000 });
    await page.waitForTimeout(1_000);
    expect(errors, `console errors: ${errors.join("\n")}`).toEqual([]);
  });

  test("zh-tw editor load produces no console errors (CJK-fallback path)", async ({
    page,
  }) => {
    const { errors } = attachConsoleGuard(page);
    await page.goto("/zh-tw/resume");
    await openFirstResume(page, /Chinese James Bugden|王子豪|中文/);
    // Wait for either raster or iframe fallback — we only care that
    // SOMETHING rendered without crashing the runtime.
    const ready = page
      .locator('img[alt^="Page "], iframe[src^="blob:"]')
      .first();
    await ready.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1_000);
    expect(errors, `console errors: ${errors.join("\n")}`).toEqual([]);
  });

  test("Customize panel toggles produce no console errors", async ({ page }) => {
    const { errors } = attachConsoleGuard(page);
    await page.goto("/resume");
    await openFirstResume(page, /Example Resume/i);

    const customizeBtn = page
      .getByRole("button", { name: /customi[sz]e|自訂/i })
      .first();
    await customizeBtn.click();

    // Poke a few controls without caring what they do — we want to catch
    // runtime errors in render code paths, not validate behavior here.
    const buttons = page
      .getByRole("button")
      .filter({ hasText: /bold|underline|left|right|center|1 col|2 col/i });
    const count = Math.min(await buttons.count(), 4);
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click({ trial: false }).catch(() => {});
      await page.waitForTimeout(200);
    }
    await page.waitForTimeout(1_000);
    expect(errors, `console errors: ${errors.join("\n")}`).toEqual([]);
  });
});
