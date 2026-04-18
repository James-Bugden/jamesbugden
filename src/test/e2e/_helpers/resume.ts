/**
 * Resume-editing helpers.
 *
 * The dashboard + editor are dense. These helpers encapsulate the common
 * flows so specs read like "add section, fill it, download" rather than
 * repeating selector boilerplate.
 *
 * Naming convention: any resume or cover letter created through a test
 * should have `QA_TEST_` in its name so `deleteAllTestResumes` can
 * reliably clean up without nuking real user data.
 */
import { Page, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

export const TEST_PREFIX = "QA_TEST_";

/**
 * Open the resume builder dashboard. Creates an empty resume named
 * `QA_TEST_<suffix>` and enters the editor. Returns the name used.
 */
export async function createBlankResume(
  page: Page,
  suffix: string,
  { lang = "en" as "en" | "zh-tw" } = {},
): Promise<string> {
  const name = `${TEST_PREFIX}${suffix}_${Date.now()}`;
  const url = lang === "zh-tw" ? "/zh-tw/resume" : "/resume";
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // The "New Resume" card triggers the template modal. For a clean
  // blank start, we first reset localStorage to skip the seeded example
  // if we know we need an empty dashboard, but that's opt-in.

  // Click the "+ New resume" button (or label in zh).
  const newBtn = page.getByRole("button", {
    name: /new resume|\+\s*新增履歷|新增履歷/i,
  });
  await newBtn.first().click();

  // Pick the first template (Classic). TemplateGalleryModal renders cards.
  const classicCard = page
    .getByRole("button", { name: /classic|經典/i })
    .first();
  await classicCard.click();

  // Editor loads — wait for the personal-details name input to appear.
  await page
    .getByLabel(/full name|^全名$/i)
    .first()
    .waitFor({ state: "visible", timeout: 15_000 });

  // Rename the resume inline (the top-bar resume name is editable).
  await renameCurrentResume(page, name);
  return name;
}

export async function renameCurrentResume(page: Page, name: string) {
  // The top-bar resume name is a button that toggles an input on click.
  // Try the 3-dot menu → Rename flow from the dashboard, or the
  // inline title edit in the editor.
  const titleBtn = page.locator('[data-rb-resume-name], header button').first();
  await titleBtn.click().catch(() => {});
  const input = page
    .getByRole("textbox", { name: /resume name|名稱|rename/i })
    .or(page.locator('input[name="resumeName"]'))
    .first();
  if (await input.count()) {
    await input.fill(name);
    await input.press("Enter");
  }
}

export async function fillPersonalDetails(
  page: Page,
  fields: Partial<{
    fullName: string;
    professionalTitle: string;
    email: string;
    phone: string;
    location: string;
  }>,
) {
  const labels: Record<string, RegExp> = {
    fullName: /full name|^全名$/i,
    professionalTitle: /professional title|^專業頭銜$/i,
    email: /^email$|電子郵件/i,
    phone: /^phone$|^電話$/i,
    location: /^location$|^所在地$/i,
  };
  for (const [key, value] of Object.entries(fields)) {
    if (!value) continue;
    const pattern = labels[key];
    if (!pattern) continue;
    const input = page.getByLabel(pattern).first();
    await input.fill(value);
  }
}

/**
 * Open the Customize tab in the editor.
 */
export async function openCustomizeTab(page: Page) {
  const tab = page.getByRole("button", { name: /customize|自訂樣式/i }).first();
  await tab.click();
}

/**
 * Open the Content tab in the editor.
 */
export async function openContentTab(page: Page) {
  const tab = page.getByRole("button", { name: /^content$|內容/i }).first();
  await tab.click();
}

/**
 * Add a section by clicking "+ Add Content" and picking the given type.
 * sectionLabel is the visible text in AddContentModal (localized).
 */
export async function addSection(page: Page, sectionLabel: RegExp) {
  await page
    .getByRole("button", { name: /add content|\+\s*新增內容|新增內容/i })
    .first()
    .click();
  await page.getByRole("button", { name: sectionLabel }).first().click();
}

/**
 * Delete every resume in the current user's localStorage whose name
 * starts with TEST_PREFIX. Cleans up between test runs.
 *
 * IMPORTANT: this function assumes the page is ALREADY on a jamesbugden.com
 * URL (so localStorage is accessible). Do NOT call it before the first
 * `page.goto()` — the about:blank origin won't have the keys we need.
 *
 * If you need to reset storage on a fresh page, goto the target URL first,
 * then call this helper.
 */
export async function deleteAllTestResumes(page: Page) {
  // Require a non-about:blank origin. If we're still at about:blank we
  // silently return — the caller is responsible for navigating first.
  const url = page.url();
  if (!url || url === "about:blank") return;
  await page.evaluate(({ prefix }) => {
    try {
      const raw = localStorage.getItem("james_careers_documents");
      if (!raw) return;
      const docs = JSON.parse(raw);
      const remaining = docs.filter(
        (d: any) => !(typeof d.name === "string" && d.name.startsWith(prefix)),
      );
      if (remaining.length !== docs.length) {
        localStorage.setItem(
          "james_careers_documents",
          JSON.stringify(remaining),
        );
      }
    } catch {
      // silent — don't let cleanup break the run
    }
  }, { prefix: TEST_PREFIX });
}

/**
 * Save a 4×4 red JPEG as a data URL into localStorage's active resume
 * photo field. Used for photo-related tests without driving the native
 * file picker.
 */
export async function injectTestPhoto(page: Page, resumeName: string) {
  // Tiny 4×4 solid-red JPEG — valid but unobtrusive.
  const TINY = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUAQEAAAAAAAAAAAAAAAAAAAAG/9oADAMBAAIQAxAAAAGQoX//xAAUEAEAAAAAAAAAAAAAAAAAAAAw/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAw/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAw/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEH//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAw/9oACAEBAAE/EH//2Q==';
  await page.evaluate(({ TINY, resumeName }) => {
    const raw = localStorage.getItem("james_careers_documents");
    if (!raw) return;
    const docs = JSON.parse(raw);
    const target = docs.find((d: any) => d.name === resumeName);
    if (!target) return;
    target.data.personalDetails = target.data.personalDetails || {};
    target.data.personalDetails.photo = TINY;
    target.settings = target.settings || {};
    target.settings.showPhoto = true;
    target.updatedAt = new Date().toISOString();
    localStorage.setItem("james_careers_documents", JSON.stringify(docs));
  }, { TINY, resumeName });
}

/**
 * Read the current `james_careers_documents` localStorage and return
 * the named resume's settings blob. Useful for verifying customize
 * changes propagated to state.
 */
export async function getResumeSettings(
  page: Page,
  resumeName: string,
): Promise<any> {
  return page.evaluate(({ resumeName }) => {
    const raw = localStorage.getItem("james_careers_documents");
    if (!raw) return null;
    const docs = JSON.parse(raw);
    const target = docs.find((d: any) => d.name === resumeName);
    return target?.settings || null;
  }, { resumeName });
}

/**
 * Fixture paths — sample PDFs/DOCX for upload tests. Writes them to
 * qa-tmp/fixtures if they don't exist (text content only, for
 * deterministic parsing).
 */
export function fixturePath(name: string): string {
  const dir = path.resolve(process.cwd(), "qa-tmp", "fixtures");
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, name);
}

/** Generate a minimal text-only fixture file at runtime. */
export function ensureTextFixture(name: string, content: string): string {
  const p = fixturePath(name);
  if (!fs.existsSync(p)) fs.writeFileSync(p, content, "utf8");
  return p;
}
