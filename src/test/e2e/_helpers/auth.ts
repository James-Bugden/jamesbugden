/**
 * Auth helpers for e2e tests.
 *
 * Most tests reuse the globalSetup storageState and don't need to log in
 * manually. Use `loginAs` only when you need to exercise the login flow
 * itself OR test a second account.
 */
import { Page, expect } from "@playwright/test";

export async function loginAs(
  page: Page,
  email: string,
  password: string,
  { baseURL = process.env.QA_BASE_URL || "https://jamesbugden.com" } = {},
) {
  await page.goto(`${baseURL}/login`, { waitUntil: "domcontentloaded" });
  await page.getByPlaceholder(/^email$/i).fill(email);
  await page.getByPlaceholder(/password/i).first().fill(password);
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
}

export async function signOut(page: Page) {
  // Locate the AuthHeaderButton menu. The Dashboard header has a user
  // avatar / menu that exposes a Sign Out item.
  const avatarBtn = page.getByRole("button", { name: /sign out|log ?out|登出/i });
  if (await avatarBtn.count()) {
    await avatarBtn.first().click();
  }
}

export async function expectAuthed(page: Page) {
  // The dashboard header has the "Dashboard" CTA filled when authed.
  // A more robust check is the presence of the auth cookie / local key.
  const userKey = await page.evaluate(() =>
    localStorage.getItem("james_careers_active_user"),
  );
  expect(userKey, "expected active-user key set").toBeTruthy();
}
