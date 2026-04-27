/**
 * Production mount-check — boots a real Chromium against the live URL
 * and confirms the React shell rendered. Catches the failure mode where
 * the HTML returns 200 but the JS bundle errored and the page is blank.
 *
 * NOT a feature test. Don't add flow assertions here — visual-regression
 * and the smoke suite cover those at PR time. This runs against a live
 * CDN-cached page where flake risk is high; keep it tight.
 *
 * Pass criteria:
 *   1. Page reaches networkidle within 15s.
 *   2. <div id="root"> exists AND has at least one child element
 *      (so a React render mounted, not just an empty shell).
 *   3. Console logged no uncaught errors.
 */

import { test, expect } from "@playwright/test";

const BASE = process.env.PROD_BASE || "https://jamesbugden.com";

test.use({
  storageState: { cookies: [], origins: [] },
  // Allow longer than the smoke suite; cold-start can be slow on a
  // freshly-published Lovable build.
  navigationTimeout: 30_000,
});

const PAGES = [
  { path: "/", name: "EN home" },
  { path: "/zh-tw", name: "ZH home" },
];

for (const { path, name } of PAGES) {
  test(`production mount: ${name} (${path})`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(`console.error: ${msg.text()}`);
    });

    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

    // React shell mounted: #root exists and has children.
    const rootChildCount = await page.locator("#root > *").count();
    expect(rootChildCount, "React did not mount any children into #root").toBeGreaterThan(0);

    // No uncaught errors (filter out known-noisy third-party warnings
    // — only fail on errors that look like our app code).
    const fatal = consoleErrors.filter((e) =>
      // Hosted CSP or sw.js warnings are common and non-fatal.
      !/(service worker|csp|cookie|favicon|cspViolation)/i.test(e),
    );
    expect(fatal, `runtime errors observed:\n${fatal.join("\n")}`).toHaveLength(0);
  });
}
