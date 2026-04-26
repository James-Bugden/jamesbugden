import { describe, it, expect } from "vitest";
import { buildCategoryShareLink, QBANK_SHARE_TEXT_ZH } from "@/lib/qbankShare";

describe("buildCategoryShareLink", () => {
  const origin = "https://jamesbugden.com";

  it("builds a deep link to /zh-tw/interview-questions with the category filter pre-applied", () => {
    const result = buildCategoryShareLink("behavioral", origin);
    expect(result.deepLinkUrl).toBe(
      "https://jamesbugden.com/zh-tw/interview-questions?cat=behavioral",
    );
  });

  it("uses the issue-mandated ZH copy with the deep link appended", () => {
    const result = buildCategoryShareLink("salary_comp", origin);
    expect(result.shareText).toBe(
      `${QBANK_SHARE_TEXT_ZH}https://jamesbugden.com/zh-tw/interview-questions?cat=salary_comp`,
    );
    expect(QBANK_SHARE_TEXT_ZH).toBe(
      "我在用這個網站準備面試，這些問題很有幫助！",
    );
  });

  it("returns a LINE share intent that wraps the share text URL-encoded", () => {
    const result = buildCategoryShareLink("culture_fit", origin);
    expect(result.lineHref.startsWith("https://line.me/R/share?text=")).toBe(true);
    const encoded = result.lineHref.slice("https://line.me/R/share?text=".length);
    expect(decodeURIComponent(encoded)).toBe(result.shareText);
  });

  it("strips trailing slashes on the origin so the deep link is well-formed", () => {
    const result = buildCategoryShareLink("behavioral", "https://jamesbugden.com/");
    expect(result.deepLinkUrl).toBe(
      "https://jamesbugden.com/zh-tw/interview-questions?cat=behavioral",
    );
  });
});
