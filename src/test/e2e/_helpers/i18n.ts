/**
 * i18n helpers: switch language, assert translations.
 */
import { Page, expect } from "@playwright/test";

/**
 * Click the language toggle (EN <-> 中文). Asserts the URL changed
 * accordingly.
 */
export async function switchLanguage(page: Page, to: "en" | "zh-tw") {
  const label = to === "zh-tw" ? /中文/ : /^EN$/;
  const toggle = page.getByRole("button", { name: label }).or(
    page.getByRole("link", { name: label }),
  );
  await toggle.first().click();

  const expectPath = to === "zh-tw" ? /\/zh-tw/ : /^(?!.*\/zh-tw).*/;
  await page.waitForURL(expectPath, { timeout: 10_000 });
}

/** Visit the zh-tw version of the current route. */
export async function visitZh(page: Page, path: string) {
  const url = path.startsWith("/zh-tw") ? path : `/zh-tw${path}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
}

/**
 * Assert a given text is visible on the page. Used for checking that
 * translated UI strings actually render.
 */
export async function expectVisibleText(page: Page, text: string | RegExp) {
  await expect(page.getByText(text).first()).toBeVisible();
}
