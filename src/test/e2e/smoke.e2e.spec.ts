/**
 * Smoke tests — the "if any of these fail, users are hitting a broken site"
 * set. Runs on every PR and every 15 min against production.
 *
 * Coverage targets the bugs we've actually shipped and had to hotfix:
 *   1. Homepage missing "Sign in" link in header
 *      (AuthContext hang → AuthHeaderButton returned null)
 *   2. Login page renders a working form
 *   3. Dashboard redirects guests to /login (not blank page)
 *   4. English resume editor loads (core product path)
 *   5. Traditional Chinese resume editor loads (CJK preview bug class)
 *   6. CJK resume produces a blob-URL iframe preview
 *      (pdfjs hang → iframe fallback regression)
 *
 * Tests run as a GUEST by default (no storageState) so they don't depend on
 * the QA login working — the prod monitor needs to catch broken auth.
 */

import { test, expect, Page } from "@playwright/test";

// Don't share the logged-in storageState — we're testing the public surface.
test.use({ storageState: { cookies: [], origins: [] } });

async function homepageHasSignInAffordance(page: Page) {
  // Either a "Sign in" link (guest) or a "My Toolkit" button (authed via
  // another tab / residual session). Both prove AuthHeaderButton rendered.
  const signInLink = page.locator('a[href="/login"]').first();
  const myToolkitLink = page.locator('a[href="/dashboard"]').first();
  await expect(signInLink.or(myToolkitLink)).toBeVisible({ timeout: 10_000 });
}

test.describe("homepage", () => {
  test("English homepage shows Sign-in / My-Toolkit button in header", async ({ page }) => {
    await page.goto("/");
    await homepageHasSignInAffordance(page);
  });

  test("Chinese homepage shows Sign-in / My-Toolkit button in header", async ({ page }) => {
    await page.goto("/zh-tw");
    await homepageHasSignInAffordance(page);
  });
});

test.describe("login page", () => {
  test("Login form renders with email + password + submit", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
  });
});

test.describe("dashboard access control", () => {
  test("Guest hitting /dashboard lands on /login (no blank page)", async ({ page }) => {
    const resp = await page.goto("/dashboard", { waitUntil: "networkidle" });
    expect(resp?.ok()).toBeTruthy();
    // Either the router redirects to /login, or Dashboard redirects internally.
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });
});

test.describe("resume editor", () => {
  test("English /resume loads editor chrome", async ({ page }) => {
    await page.goto("/resume");
    // Editor renders the "Download" / "匯入內容" / template picker within 20s.
    const downloadButton = page.getByRole("button", { name: /download|下載/i }).first();
    await expect(downloadButton).toBeVisible({ timeout: 20_000 });
  });

  test("Traditional Chinese /zh-tw/resume loads editor chrome", async ({ page }) => {
    await page.goto("/zh-tw/resume");
    const downloadButton = page.getByRole("button", { name: /download|下載/i }).first();
    await expect(downloadButton).toBeVisible({ timeout: 20_000 });
  });
});

test.describe("CJK preview regression guard", () => {
  test.skip(
    !process.env.QA_TEST_EMAIL,
    "Needs QA login to open an existing CJK resume",
  );

  test("CJK resume preview produces a blob: iframe within 60s", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({
      storageState: "playwright/.auth/qa-user.json",
    });
    const page = await ctx.newPage();

    await page.goto("/zh-tw/dashboard");
    // Click the Chinese sample resume card. Falls back to any card whose
    // title includes Chinese resume text.
    const card = page
      .getByText(/Chinese James Bugden|王子豪|中文/)
      .first();
    await card.click({ timeout: 15_000 });

    // The preview iframe is rendered by ResumePdfPreview when the CJK
    // worker path runs — src starts with `blob:https://...`.
    const iframe = page.locator('iframe[src^="blob:"]').first();
    await expect(iframe).toBeVisible({ timeout: 60_000 });

    await ctx.close();
  });
});
