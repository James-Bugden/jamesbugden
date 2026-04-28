#!/usr/bin/env node
/**
 * lovable-publish.mjs — Playwright automation to publish jamesbugden.com on Lovable.
 *
 * Called by .github/workflows/lovable-publish.yml on every push to main.
 * Exits 0 on success, 1 on any failure. Saves a screenshot to
 * lovable-publish-failure.png when it fails so the Actions artifact is
 * useful for post-mortems.
 *
 * Why browser automation: Lovable has no deploy API and no auto-publish
 * toggle. See HIR-217 for context.
 */
import { chromium } from "@playwright/test";

const STORAGE_STATE_B64 = process.env.LOVABLE_STORAGE_STATE;
const PROJECT_URL = "https://lovable.dev/projects/reahmeddjkivwzjsoqkn";
const SCREENSHOT_PATH = "lovable-publish-failure.png";

if (!STORAGE_STATE_B64) {
  process.stderr.write(
    "Error: LOVABLE_STORAGE_STATE is not set.\n" +
    "Run scripts/lovable-auth-export.mjs locally to generate it, then paste the\n" +
    "output as the LOVABLE_STORAGE_STATE secret in GitHub repo settings.\n"
  );
  process.exit(1);
}

let storageState;
try {
  storageState = JSON.parse(Buffer.from(STORAGE_STATE_B64, "base64").toString("utf8"));
} catch {
  process.stderr.write(
    "Error: LOVABLE_STORAGE_STATE is not valid base64 JSON.\n" +
    "Re-run scripts/lovable-auth-export.mjs to regenerate it.\n"
  );
  process.exit(1);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  // Load pre-authenticated session — avoids Google OAuth in CI
  const context = await browser.newContext({ storageState });
  const page = await context.newPage();

  try {
    // Step 1: Navigate to the project
    console.log("Navigating to project...");
    await page.goto(PROJECT_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });

    // Step 3: Click Publish
    console.log("Waiting for Publish button...");
    const publishBtn = page.getByRole("button", { name: /^publish$/i });
    await publishBtn.waitFor({ timeout: 20_000 });
    await publishBtn.click();
    console.log("Publish clicked. Waiting for confirmation...");

    // Step 4: Wait for a toast/alert — 2 min to cover slow Lovable deploys
    const toast = page
      .locator('[role="status"], [role="alert"], [data-sonner-toast]')
      .first();
    await toast.waitFor({ timeout: 120_000 });
    const toastText = (await toast.textContent()) ?? "";

    if (/error|fail|unable/i.test(toastText)) {
      throw new Error(`Lovable reported a publish error: "${toastText.trim()}"`);
    }

    console.log(`Published successfully. Confirmation: "${toastText.trim()}"`);
  } catch (err) {
    process.stderr.write(`\nPublish failed: ${err.message}\n`);
    await page.screenshot({ path: SCREENSHOT_PATH }).catch(() => {});
    await browser.close().catch(() => {});
    process.exit(1);
  }

  await browser.close();
}

run();
