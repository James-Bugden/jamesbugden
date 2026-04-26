/**
 * Visual regression smoke — catches silent CSS/layout breakage on the
 * public marketing surface.
 *
 * Why: type-check passes and Playwright text assertions can't see when
 * a Lovable "polish" commit nukes a header z-index or shifts the hero
 * spacing 40px. Pixel-diff snapshots will.
 *
 * Scope: guest-mode public pages only — no auth required, no Supabase
 * dependence beyond what the homepage normally renders. Three pages,
 * one viewport (desktop chromium), light theme.
 *
 * Baselines: committed under `*-snapshots/` next to this file. Regenerate
 * inside the same Linux CI image to avoid font-rendering drift:
 *   npx playwright test --project=visual --update-snapshots
 *
 * Tolerance: maxDiffPixels=400 absorbs the small antialiasing wobble
 * between runs without letting real changes slip through.
 *
 * Override: add the PR label `visual-change-approved` to skip this job
 * when a visual change is intentional. Then update baselines in a
 * follow-up commit.
 */

import { test, expect } from "@playwright/test";

test.use({
  storageState: { cookies: [], origins: [] },
  viewport: { width: 1280, height: 720 },
  colorScheme: "light",
});

const PAGES: Array<{ path: string; name: string }> = [
  { path: "/", name: "home-en" },
  { path: "/zh-tw", name: "home-zh" },
  { path: "/login", name: "login" },
];

for (const { path, name } of PAGES) {
  test(`visual: ${name} (${path})`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    // Disable animations + caret blink so the pixel diff is deterministic.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          caret-color: transparent !important;
        }
      `,
    });
    // Let one rAF flush so the disabled animations settle.
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixels: 400,
      // Mask transient regions that change between runs (timestamps,
      // dynamic counts, A/B-rolled hero text). Add as needed.
      mask: [],
    });
  });
}
