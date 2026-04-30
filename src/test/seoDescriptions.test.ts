import { describe, it, expect } from "vitest";
import { seoConfig } from "@/config/seo-config";

// HIR-339: meta descriptions on q-bank (/interview-questions), linkedin-guide, offer-calculator
// must be 140-160 chars and contain the primary keyword for each page.
const SEO_PAGES = [
  {
    route: "/interview-questions",
    keyword: "interview questions",
    label: "q-bank",
  },
  {
    route: "/linkedin-guide",
    keyword: "linkedin",
    label: "linkedin-guide",
  },
  {
    route: "/offer-calculator",
    keyword: "offer calculator",
    label: "offer-calculator",
  },
] as const;

describe("SEO meta descriptions — HIR-339 pages", () => {
  for (const { route, keyword, label } of SEO_PAGES) {
    describe(label, () => {
      it("has a description entry in seoConfig", () => {
        expect(seoConfig[route]).toBeDefined();
        expect(seoConfig[route]?.description).toBeTruthy();
      });

      it("description is 140-160 characters", () => {
        const desc = seoConfig[route]?.description ?? "";
        expect(desc.length).toBeGreaterThanOrEqual(140);
        expect(desc.length).toBeLessThanOrEqual(160);
      });

      it("description contains the primary keyword (case-insensitive)", () => {
        const desc = (seoConfig[route]?.description ?? "").toLowerCase();
        expect(desc).toContain(keyword.toLowerCase());
      });
    });
  }
});
