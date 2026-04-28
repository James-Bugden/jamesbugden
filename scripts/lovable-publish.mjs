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

const EMAIL = process.env.LOVABLE_EMAIL;
const PASSWORD = process.env.LOVABLE_PASSWORD;
const PROJECT_URL = "https://lovable.dev/projects/reahmeddjkivwzjsoqkn";
const SCREENSHOT_PATH = "lovable-publish-failure.png";

if (!EMAIL) {
  process.stderr.write("Error: LOVABLE_EMAIL is not set\n");
  process.exit(1);
}
if (!PASSWORD) {
  process.stderr.write("Error: LOVABLE_PASSWORD is not set\n");
  process.exit(1);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Step 1: Sign in
    console.log("Navigating to Lovable sign-in...");
    await page.goto("https://lovable.dev/sign-in", {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });

    const emailInput = page.getByPlaceholder(/email/i);
    await emailInput.waitFor({ timeout: 10_000 });
    await emailInput.fill(EMAIL);
    await page.getByPlaceholder(/password/i).fill(PASSWORD);
    await page.getByRole("button", { name: /sign.?in|log.?in|continue/i }).click();

    await page.waitForURL((url) => !url.pathname.includes("sign-in"), {
      timeout: 30_000,
    });
    console.log("Login successful.");

    // Step 2: Navigate to the project
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
