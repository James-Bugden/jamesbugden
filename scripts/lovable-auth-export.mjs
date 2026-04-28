#!/usr/bin/env node
/**
 * lovable-auth-export.mjs — one-time tool to capture Lovable session state.
 *
 * Run this locally on a machine with a display (not in CI). A browser window
 * opens — log in to Lovable with Google, then come back here and press Enter.
 * The script prints base64-encoded session state to stdout.
 *
 * Paste the output as the LOVABLE_STORAGE_STATE secret:
 *   https://github.com/James-Bugden/jamesbugden/settings/secrets/actions
 *
 * Re-run when the Actions workflow fails with an auth error (session expired).
 * Lovable sessions typically last 30–90 days.
 *
 * Why storage state instead of email/password: Lovable uses Google OAuth,
 * which blocks headless logins in CI. Capturing the live session avoids
 * any OAuth flow on subsequent runs.
 */
import { chromium } from "@playwright/test";
import * as readline from "readline";

async function main() {
  console.log("Opening browser — log into Lovable with Google when it appears...\n");

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://lovable.dev");

  console.log("Steps:");
  console.log("  1. Sign in with Google in the browser window.");
  console.log("  2. Wait until you can see your Lovable dashboard.");
  console.log("  3. Come back here and press Enter.\n");

  await new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Press Enter once you are logged in... ", () => {
      rl.close();
      resolve();
    });
  });

  const state = await context.storageState();
  const b64 = Buffer.from(JSON.stringify(state)).toString("base64");

  console.log("\n=== PASTE THIS AS GITHUB SECRET: LOVABLE_STORAGE_STATE ===");
  console.log(b64);
  console.log("=== END ===\n");
  console.log("Go to: https://github.com/James-Bugden/jamesbugden/settings/secrets/actions");
  console.log("Click 'New repository secret', name it LOVABLE_STORAGE_STATE, paste the value above.\n");

  await browser.close();
}

main().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
