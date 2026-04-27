import { defineConfig, devices } from "@playwright/test";
import { config as loadEnv } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ESM-safe __dirname replacement. The project uses "type": "module".
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.test (gitignored, per-developer). Falls back silently if absent.
loadEnv({ path: path.resolve(__dirname, ".env.test") });

const BASE_URL = process.env.QA_BASE_URL || "https://jamesbugden.com";
const RUN_LOCAL = process.env.LOCAL === "1";

export default defineConfig({
  testDir: "./src/test/e2e",
  testMatch: /.*\.e2e\.spec\.ts$/,

  // Each test file typically has 5–12 tests that share setup. 60s per test
  // is generous — most finish in 5–15s. Raise for the PDF-heavy specs.
  timeout: 60_000,

  // Fail fast on CI so flakes don't balloon the queue. Generous locally.
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 4,
  fullyParallel: true,

  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],

  // Global setup logs in once and saves storageState for every test to reuse.
  globalSetup: "./playwright/global-setup.ts",

  use: {
    baseURL: BASE_URL,
    // Reuse the auth state captured by global-setup. Specs that need a
    // guest session override this with `test.use({ storageState: undefined })`.
    storageState: path.resolve(__dirname, "playwright/.auth/qa-user.json"),
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // Consistent locale so language-toggle tests know their starting point.
    locale: "en-GB",
    timezoneId: "Asia/Taipei",
  },

  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 5"],
      },
      // Only run mobile-tagged specs on this project.
      grep: /@mobile/,
    },
    // Cross-browser projects run only the specs tagged @cross-browser.
    // Opt-in avoids 3×'ing the full run on every PR — critical-path only.
    // Requires `npx playwright install firefox webkit` once per machine.
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } },
      grep: /@cross-browser/,
    },
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } },
      grep: /@cross-browser/,
    },
    // Retina/HiDPI project catches regressions where rasterized preview
    // images bake in 1× pixel math (blurry on 2× devices). Opt-in via @hidpi.
    {
      name: "chromium-hidpi",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
      },
      grep: /@hidpi/,
    },
    // Visual regression project. Matches src/test/e2e/visual-regression.spec.ts
    // (note: NOT *.e2e.spec.ts — keeps it out of the default smoke run).
    // Snapshots stored next to the spec under visual-regression.spec.ts-snapshots/.
    // Generate baselines: npx playwright test --project=visual --update-snapshots
    {
      name: "visual",
      testMatch: /visual-regression\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
        // Guest mode — visual baselines should not depend on auth state.
        storageState: { cookies: [], origins: [] },
      },
      // Visual diffs are stricter than functional tests — no retries
      // (a flake here is signal, not noise to mask).
      retries: 0,
    },
    // Production mount-check project. Matches src/test/e2e/production-mount.spec.ts
    // (note: NOT *.e2e.spec.ts — same pattern as `visual` to keep it out of
    // the default smoke run). Driven by production-smoke-scheduled.yml; that
    // workflow sets PROD_BASE to https://jamesbugden.com and runs against
    // the live site, not a local dev server.
    {
      name: "production",
      testMatch: /production-mount\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        // Guest mode — live-site smoke must not depend on auth state.
        storageState: { cookies: [], origins: [] },
      },
    },
  ],

  // When LOCAL=1, boot the dev server automatically. Otherwise assume the
  // live site (QA_BASE_URL) is already serving.
  webServer: RUN_LOCAL
    ? {
        command: "npm run dev",
        url: "http://localhost:8080",
        reuseExistingServer: true,
        timeout: 60_000,
      }
    : undefined,
});
