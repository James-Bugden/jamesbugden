import { test, expect } from "@playwright/test";

// Tests for OnboardingRouter modal (HIR-220).
// Intercepts the Supabase profiles fetch to force onboarding_completed=false
// so the modal renders regardless of the QA account's real DB state.

test.describe("OnboardingRouter modal", () => {
  async function forceShowRouter(page: import("@playwright/test").Page, onboardingCompleted = false) {
    await page.route("**/rest/v1/profiles*", async (route) => {
      if (route.request().method() !== "GET") {
        await route.continue();
        return;
      }
      const resp = await route.fetch();
      const body = await resp.json();
      const patched = Array.isArray(body)
        ? body.map((r: Record<string, unknown>) => ({ ...r, onboarding_completed: onboardingCompleted, job_search_stage: null }))
        : { ...body, onboarding_completed: onboardingCompleted, job_search_stage: null };
      await route.fulfill({ response: resp, body: JSON.stringify(patched) });
    });
  }

  test.beforeEach(async ({ page }) => {
    await forceShowRouter(page, false);
    // Intercept PATCH so we don't mutate real DB state
    await page.route("**/rest/v1/profiles*", async (route) => {
      if (route.request().method() === "PATCH") {
        await route.fulfill({ status: 200, body: JSON.stringify([]) });
        return;
      }
      await route.continue();
    });
    await page.goto("/dashboard");
    await page.waitForLoadState("domcontentloaded");
  });

  // AC#1: Modal renders before any dashboard content on first login
  test("AC1 — router modal is visible on first-login dashboard @auth", async ({ page }) => {
    await expect(page.getByText("Where are you in your job search?")).toBeVisible({ timeout: 10_000 });
    // The full-screen overlay is present, covering the tool grid
    await expect(page.locator('[data-testid="onboarding-router"]')).toBeVisible();
  });

  // AC#3: Step 2 confirmation names the correct tool for each selection
  test("AC3 — step 2 confirms correct tool for Just starting @auth", async ({ page }) => {
    await page.getByText("Just starting").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page.getByText("Resume Builder is your best first stop")).toBeVisible({ timeout: 5_000 });
  });

  test("AC3 — step 2 confirms correct tool for Actively applying @auth", async ({ page }) => {
    await page.getByText("Actively applying").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page.getByText(/Resume Analyzer \+ Job Tracker will sharpen your edge/i)).toBeVisible({ timeout: 5_000 });
  });

  test("AC3 — step 2 confirms correct tool for Getting interviews @auth", async ({ page }) => {
    await page.getByText("Getting interviews").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page.getByText(/Interview Question Bank has the top questions/i)).toBeVisible({ timeout: 5_000 });
  });

  test("AC3 — step 2 confirms correct tool for Have an offer @auth", async ({ page }) => {
    await page.getByText("Have an offer").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page.getByText(/Salary Compare \+ Negotiation Toolkit/i)).toBeVisible({ timeout: 5_000 });
  });

  // AC#4: CTA navigates to the correct tool — all 4 routes
  test("AC4 — Get started navigates to /resume for Just starting @auth", async ({ page }) => {
    await page.getByText("Just starting").click();
    // Step 1 CTA → advance to step 2
    await page.getByRole("button", { name: /get started/i }).click();
    // Step 2 CTA → navigate
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/resume($|\?|#)/, { timeout: 10_000 });
  });

  test("AC4 — Get started navigates to /resume-analyzer for Actively applying @auth", async ({ page }) => {
    await page.getByText("Actively applying").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/resume-analyzer/, { timeout: 10_000 });
  });

  test("AC4 — Get started navigates to /interview-questions for Getting interviews @auth", async ({ page }) => {
    await page.getByText("Getting interviews").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/interview-questions/, { timeout: 10_000 });
  });

  test("AC4 — Get started navigates to /toolkit for Have an offer @auth", async ({ page }) => {
    await page.getByText("Have an offer").click();
    await page.getByRole("button", { name: /get started/i }).click();
    await page.getByRole("button", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/toolkit/, { timeout: 10_000 });
  });

  // AC#5: Skip navigates to dashboard, modal does not re-show
  test("AC5 — Skip for now navigates to /dashboard @auth", async ({ page }) => {
    await page.getByText("Skip for now").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
    await expect(page.getByText("Where are you in your job search?")).not.toBeVisible({ timeout: 5_000 });
  });

  // AC#2: Modal does NOT render when onboarding_completed=true
  test("AC2 — modal hidden when onboarding_completed is true @auth", async ({ page }) => {
    await page.unrouteAll();
    await forceShowRouter(page, true);
    await page.goto("/dashboard");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("Where are you in your job search?")).not.toBeVisible({ timeout: 8_000 });
  });
});
