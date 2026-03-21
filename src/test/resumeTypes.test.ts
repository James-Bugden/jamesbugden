import { describe, it, expect, beforeEach, vi } from "vitest";
import { getDefaultFieldsForType, SECTION_TYPES, PROFICIENCY_LEVELS, DEFAULT_RESUME_DATA, EXTRA_DETAIL_OPTIONS, MONTHS } from "@/components/resume-builder/types";
import { DEFAULT_CUSTOMIZE, CustomizeSettings } from "@/components/resume-builder/customizeTypes";

describe("Resume Builder Types & Defaults", () => {
  // ─── Default resume data ──────────────────────────────

  it("DEFAULT_RESUME_DATA has empty personal details", () => {
    expect(DEFAULT_RESUME_DATA.personalDetails.fullName).toBe("");
    expect(DEFAULT_RESUME_DATA.personalDetails.email).toBe("");
    expect(DEFAULT_RESUME_DATA.personalDetails.phone).toBe("");
    expect(DEFAULT_RESUME_DATA.personalDetails.photo).toBe("");
    expect(DEFAULT_RESUME_DATA.personalDetails.extras).toEqual([]);
  });

  it("DEFAULT_RESUME_DATA has empty sections", () => {
    expect(DEFAULT_RESUME_DATA.sections).toEqual([]);
  });

  // ─── Section types ────────────────────────────────────

  it("SECTION_TYPES contains all expected types", () => {
    const types = SECTION_TYPES.map(s => s.type);
    expect(types).toContain("experience");
    expect(types).toContain("education");
    expect(types).toContain("skills");
    expect(types).toContain("summary");
    expect(types).toContain("languages");
    expect(types).toContain("certificates");
    expect(types).toContain("projects");
    expect(types).toContain("interests");
    expect(types).toContain("custom");
  });

  it("every SECTION_TYPE has title, icon, and description", () => {
    for (const st of SECTION_TYPES) {
      expect(st.title.length).toBeGreaterThan(0);
      expect(st.icon.length).toBeGreaterThan(0);
      expect(st.description.length).toBeGreaterThan(0);
    }
  });

  // ─── Default fields for each type ─────────────────────

  it("experience fields have position, company, dates", () => {
    const fields = getDefaultFieldsForType("experience");
    expect(fields).toHaveProperty("position");
    expect(fields).toHaveProperty("company");
    expect(fields).toHaveProperty("location");
    expect(fields).toHaveProperty("startMonth");
    expect(fields).toHaveProperty("startYear");
    expect(fields).toHaveProperty("endMonth");
    expect(fields).toHaveProperty("endYear");
    expect(fields).toHaveProperty("currentlyHere");
    expect(fields).toHaveProperty("description");
  });

  it("education fields have degree, institution, dates", () => {
    const fields = getDefaultFieldsForType("education");
    expect(fields).toHaveProperty("degree");
    expect(fields).toHaveProperty("institution");
    expect(fields).toHaveProperty("startYear");
    expect(fields).toHaveProperty("endYear");
  });

  it("skills fields have skills string", () => {
    const fields = getDefaultFieldsForType("skills");
    expect(fields).toHaveProperty("skills");
  });

  it("languages fields have language and proficiency", () => {
    const fields = getDefaultFieldsForType("languages");
    expect(fields).toHaveProperty("language");
    expect(fields).toHaveProperty("proficiency");
  });

  it("summary fields have description", () => {
    const fields = getDefaultFieldsForType("summary");
    expect(fields).toHaveProperty("description");
  });

  it("certificates fields have name, issuer, date", () => {
    const fields = getDefaultFieldsForType("certificates");
    expect(fields).toHaveProperty("name");
    expect(fields).toHaveProperty("issuer");
    expect(fields).toHaveProperty("date");
  });

  it("projects fields have name, role, dates, description", () => {
    const fields = getDefaultFieldsForType("projects");
    expect(fields).toHaveProperty("name");
    expect(fields).toHaveProperty("role");
    expect(fields).toHaveProperty("startYear");
    expect(fields).toHaveProperty("description");
  });

  it("references fields have name, position, company, contact info", () => {
    const fields = getDefaultFieldsForType("references");
    expect(fields).toHaveProperty("name");
    expect(fields).toHaveProperty("position");
    expect(fields).toHaveProperty("company");
    expect(fields).toHaveProperty("email");
    expect(fields).toHaveProperty("phone");
  });

  it("declaration fields have signature, place, date", () => {
    const fields = getDefaultFieldsForType("declaration");
    expect(fields).toHaveProperty("signature");
    expect(fields).toHaveProperty("place");
    expect(fields).toHaveProperty("date");
    expect(fields).toHaveProperty("fullName");
  });

  it("unknown type returns description field", () => {
    const fields = getDefaultFieldsForType("unknown_thing");
    expect(fields).toHaveProperty("description");
  });

  it("all default fields are empty strings", () => {
    for (const st of SECTION_TYPES) {
      const fields = getDefaultFieldsForType(st.type);
      for (const [key, value] of Object.entries(fields)) {
        expect(value).toBe("");
      }
    }
  });

  // ─── Proficiency levels ───────────────────────────────

  it("PROFICIENCY_LEVELS has 5 LinkedIn-standard levels", () => {
    expect(PROFICIENCY_LEVELS).toHaveLength(5);
    expect(PROFICIENCY_LEVELS).toContain("Native or bilingual proficiency");
    expect(PROFICIENCY_LEVELS).toContain("Full professional proficiency");
    expect(PROFICIENCY_LEVELS).toContain("Professional working proficiency");
    expect(PROFICIENCY_LEVELS).toContain("Limited working proficiency");
    expect(PROFICIENCY_LEVELS).toContain("Elementary proficiency");
  });

  // ─── Months ───────────────────────────────────────────

  it("MONTHS has 12 entries", () => {
    expect(MONTHS).toHaveLength(12);
    expect(MONTHS[0]).toBe("January");
    expect(MONTHS[11]).toBe("December");
  });

  // ─── Extra detail options ─────────────────────────────

  it("EXTRA_DETAIL_OPTIONS includes LinkedIn and Website", () => {
    expect(EXTRA_DETAIL_OPTIONS).toContain("LinkedIn");
    expect(EXTRA_DETAIL_OPTIONS).toContain("Website");
    expect(EXTRA_DETAIL_OPTIONS).toContain("Nationality");
  });
});

describe("Customize Settings Defaults", () => {
  it("DEFAULT_CUSTOMIZE has all required properties", () => {
    const keys: (keyof CustomizeSettings)[] = [
      "fontSize", "lineHeight", "marginX", "marginY", "sectionSpacing",
      "bodyFont", "headingFont", "headerAlign", "headingStyle",
      "accentColor", "template", "columns", "entryLayout",
    ];
    for (const key of keys) {
      expect(DEFAULT_CUSTOMIZE).toHaveProperty(key);
    }
  });

  it("default font size is 11", () => {
    expect(DEFAULT_CUSTOMIZE.fontSize).toBe(11);
  });

  it("default line height is 1.5", () => {
    expect(DEFAULT_CUSTOMIZE.lineHeight).toBe(1.5);
  });

  it("default margins are 16mm", () => {
    expect(DEFAULT_CUSTOMIZE.marginX).toBe(16);
    expect(DEFAULT_CUSTOMIZE.marginY).toBe(16);
  });

  it("default heading style is underline", () => {
    expect(DEFAULT_CUSTOMIZE.headingStyle).toBe("underline");
  });

  it("default accent color is a valid hex", () => {
    expect(DEFAULT_CUSTOMIZE.accentColor).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("font size range is reasonable (8-14 implied by UI)", () => {
    expect(DEFAULT_CUSTOMIZE.fontSize).toBeGreaterThanOrEqual(8);
    expect(DEFAULT_CUSTOMIZE.fontSize).toBeLessThanOrEqual(14);
  });

  it("page format defaults to a4", () => {
    expect(DEFAULT_CUSTOMIZE.pageFormat).toBe("a4");
  });

  it("link styling defaults", () => {
    expect(DEFAULT_CUSTOMIZE.linkUnderline).toBe(true);
    expect(DEFAULT_CUSTOMIZE.linkBlue).toBe(true);
  });
});
