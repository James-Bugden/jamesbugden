/**
 * Playwright global setup — authenticates once per test run.
 *
 * Signs in with the QA test account and persists the Supabase session to
 * `playwright/.auth/qa-user.json`. Every test then reuses this storage
 * state via the `storageState` option in playwright.config.ts, so the
 * full run doesn't pay the ~3s login cost per test.
 *
 * Fails the run immediately if:
 *   - credentials are missing (so you don't run 90 tests that all fail auth)
 *   - login succeeds but we don't end up on /dashboard (e.g. OAuth gate
 *     changed, or email verification required)
 */
import { chromium, expect, FullConfig } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTH_DIR = path.resolve(__dirname, ".auth");
const AUTH_FILE = path.resolve(AUTH_DIR, "qa-user.json");

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.QA_BASE_URL || "https://jamesbugden.com";
  const email = process.env.QA_TEST_EMAIL;
  const password = process.env.QA_TEST_PASSWORD;

  fs.mkdirSync(AUTH_DIR, { recursive: true });

  // No creds → write an empty storageState so guest-only specs (prod
  // monitor, homepage smoke) can still run. Auth-required specs should
  // gate themselves with test.skip(!process.env.QA_TEST_EMAIL, "no creds").
  if (!email || !password) {
    console.warn(
      "[global-setup] QA_TEST_EMAIL / QA_TEST_PASSWORD not set — writing empty storageState. Auth-required specs will be skipped.",
    );
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }));
    return;
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${baseURL}/login`, { waitUntil: "domcontentloaded" });

    // Fill login form. Selectors match Login.tsx — email + password +
    // a "Sign In" button.
    await page.getByPlaceholder(/^email$/i).fill(email);
    await page.getByPlaceholder(/password/i).first().fill(password);
    await page
      .getByRole("button", { name: /^sign in$/i })
      .click();

    // Supabase login redirects to /dashboard on success. Give it a
    // generous 30s because the session + mailerlite sync runs on sign-in.
    await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
    await expect(page).toHaveURL(/\/dashboard/);

    await context.storageState({ path: AUTH_FILE });
    console.log(`[global-setup] Auth state saved to ${AUTH_FILE}`);
  } catch (err) {
    // Dump debug info so CI failures are actionable.
    const screenshotPath = path.resolve(AUTH_DIR, "login-failure.png");
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
    console.error(
      `[global-setup] Login failed. Screenshot: ${screenshotPath}\n` +
        `URL at failure: ${page.url()}\n` +
        `Error: ${err}`,
    );
    throw err;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
