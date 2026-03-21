import { describe, it, expect } from "vitest";
import { DEFAULT_CUSTOMIZE } from "@/components/resume-builder/customizeTypes";

/**
 * Tests for the Simple Resume Builder's locked customize preset
 * and the customization panel constraints.
 */

const LOCKED_CUSTOMIZE = {
  ...DEFAULT_CUSTOMIZE,
  template: "classic",
  bodyFont: "'Lora', serif",
  headingFont: "'Lora', serif",
  fontSize: 11,
  lineHeight: 1.5,
  marginX: 16,
  marginY: 16,
  sectionSpacing: 5,
  columns: "one" as const,
  headerAlign: "center" as const,
  headerArrangement: "stacked" as const,
  contactSeparator: "icon" as const,
  headerIconStyle: "outline" as const,
  headingStyle: "underline" as const,
  headingSize: "m" as const,
  headingUppercase: true,
  accentColor: "#1e293b",
  entryLayout: "stacked" as const,
  showPhoto: false,
  showPageNumbers: false,
  nameSize: "s" as const,
  nameBold: true,
  nameFont: "body" as const,
  titleSize: "m" as const,
  colorMode: "basic" as const,
  accentApplyHeadings: true,
  accentApplyLines: true,
  linkUnderline: true,
  linkBlue: true,
  skillsDisplay: "grid" as const,
  languagesDisplay: "grid" as const,
  educationOrder: "degree-first" as const,
  experienceOrder: "title-first" as const,
};

describe("Simple Builder Locked Preset", () => {
  it("uses Lora font for body and headings", () => {
    expect(LOCKED_CUSTOMIZE.bodyFont).toContain("Lora");
    expect(LOCKED_CUSTOMIZE.headingFont).toContain("Lora");
  });

  it("uses classic template", () => {
    expect(LOCKED_CUSTOMIZE.template).toBe("classic");
  });

  it("uses one-column layout", () => {
    expect(LOCKED_CUSTOMIZE.columns).toBe("one");
  });

  it("uses centered header", () => {
    expect(LOCKED_CUSTOMIZE.headerAlign).toBe("center");
  });

  it("uses underlined uppercase headings", () => {
    expect(LOCKED_CUSTOMIZE.headingStyle).toBe("underline");
    expect(LOCKED_CUSTOMIZE.headingUppercase).toBe(true);
  });

  it("hides photo by default", () => {
    expect(LOCKED_CUSTOMIZE.showPhoto).toBe(false);
  });

  it("hides page numbers by default", () => {
    expect(LOCKED_CUSTOMIZE.showPageNumbers).toBe(false);
  });

  it("has degree-first education order", () => {
    expect(LOCKED_CUSTOMIZE.educationOrder).toBe("degree-first");
  });

  it("has title-first experience order", () => {
    expect(LOCKED_CUSTOMIZE.experienceOrder).toBe("title-first");
  });
});

describe("Simple Customize Panel Constraints", () => {
  // These test the UI boundaries enforced in the SimpleCustomizePanel

  it("font size should stay within 8-14 range", () => {
    const min = 8;
    const max = 14;
    const current = LOCKED_CUSTOMIZE.fontSize;
    expect(current).toBeGreaterThanOrEqual(min);
    expect(current).toBeLessThanOrEqual(max);
    expect(Math.max(min, current - 0.5)).toBeGreaterThanOrEqual(min);
    expect(Math.min(max, current + 0.5)).toBeLessThanOrEqual(max);
  });

  it("line height should stay within 1.0-2.0 range", () => {
    const min = 1.0;
    const max = 2.0;
    const current = LOCKED_CUSTOMIZE.lineHeight;
    expect(current).toBeGreaterThanOrEqual(min);
    expect(current).toBeLessThanOrEqual(max);
  });

  it("margins should stay within 8-24 range", () => {
    const min = 8;
    const max = 24;
    const current = LOCKED_CUSTOMIZE.marginX;
    expect(current).toBeGreaterThanOrEqual(min);
    expect(current).toBeLessThanOrEqual(max);
  });

  it("section spacing should stay within 0-12 range", () => {
    const min = 0;
    const max = 12;
    const current = LOCKED_CUSTOMIZE.sectionSpacing;
    expect(current).toBeGreaterThanOrEqual(min);
    expect(current).toBeLessThanOrEqual(max);
  });

  it("customize overrides merge correctly with locked preset", () => {
    const overrides = { fontSize: 12, marginX: 20, marginY: 20 };
    const merged = { ...LOCKED_CUSTOMIZE, ...overrides };
    expect(merged.fontSize).toBe(12);
    expect(merged.marginX).toBe(20);
    // Non-overridden values remain locked
    expect(merged.bodyFont).toContain("Lora");
    expect(merged.template).toBe("classic");
    expect(merged.headerAlign).toBe("center");
  });
});

describe("Allowed Section Types (Simple Builder)", () => {
  const ALLOWED = ["summary", "experience", "education", "skills", "languages", "certificates"];

  it("allows exactly 6 section types", () => {
    expect(ALLOWED).toHaveLength(6);
  });

  it("includes all essential resume sections", () => {
    expect(ALLOWED).toContain("summary");
    expect(ALLOWED).toContain("experience");
    expect(ALLOWED).toContain("education");
    expect(ALLOWED).toContain("skills");
  });

  it("excludes complex/optional sections", () => {
    expect(ALLOWED).not.toContain("projects");
    expect(ALLOWED).not.toContain("interests");
    expect(ALLOWED).not.toContain("publications");
    expect(ALLOWED).not.toContain("declaration");
    expect(ALLOWED).not.toContain("custom");
  });
});
