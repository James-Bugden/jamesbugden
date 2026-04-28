#!/usr/bin/env node
/**
 * lovable-auth-export.mjs — one-time tool to capture Lovable session state.
 *
 * Run this locally on a machine with a display (not in CI). A browser window
 * opens — log in to Lovable with Google, then come back here and press Enter.
 * The script prints base64-encoded session state to stdout.
 *
 * Paste the output as a comment on Paperclip issue HIR-216 — the agent
 * stores it as the GitHub Secret automatically (no GitHub UI needed).
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

  console.log("\n=== PASTE THIS AS A COMMENT ON HIR-216 ===");
  console.log(b64);
  console.log("=== END ===\n");
  console.log("The agent will read the value and store it as a GitHub Secret automatically.");
  console.log("No GitHub UI required.\n");

  await browser.close();
}

main().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
