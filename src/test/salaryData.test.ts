import { describe, it, expect } from "vitest";
import { salaryData, ALL_SECTORS, ALL_ROLES, EXP_LEVELS, NATIONAL_MEDIAN } from "@/data/salaryData";

describe("Salary Data Integrity", () => {
  // ─── Basic structure ───────────────────────────────────

  it("has a non-empty dataset", () => {
    expect(salaryData.length).toBeGreaterThan(100);
  });

  it("every entry has required fields with correct types", () => {
    for (const entry of salaryData) {
      expect(typeof entry.role).toBe("string");
      expect(entry.role.length).toBeGreaterThan(0);
      expect(typeof entry.sector).toBe("string");
      expect(entry.sector.length).toBeGreaterThan(0);
      expect(["Entry", "Mid", "Senior", "All"]).toContain(entry.exp);
      expect(typeof entry.min).toBe("number");
      expect(typeof entry.med).toBe("number");
      expect(typeof entry.max).toBe("number");
      expect(typeof entry.source).toBe("string");
      expect(typeof entry.year).toBe("number");
      expect(typeof entry.tier).toBe("number");
      expect(typeof entry.sources).toBe("number");
    }
  });

  // ─── Salary range logic ────────────────────────────────

  it("min ≤ med ≤ max for every entry", () => {
    const violations = salaryData.filter(d => d.min > d.med || d.med > d.max);
    if (violations.length > 0) {
      console.log("Violations:", violations.map(v => `${v.role} (${v.sector}): min=${v.min} med=${v.med} max=${v.max}`));
    }
    expect(violations).toHaveLength(0);
  });

  it("all salary values are positive", () => {
    const bad = salaryData.filter(d => d.min <= 0 || d.med <= 0 || d.max <= 0);
    expect(bad).toHaveLength(0);
  });

  it("no salary exceeds reasonable maximum (50M NTD)", () => {
    const extreme = salaryData.filter(d => d.max > 50_000_000);
    if (extreme.length > 0) {
      console.log("Extreme:", extreme.map(e => `${e.role}: ${e.max}`));
    }
    expect(extreme).toHaveLength(0);
  });

  it("no entry-level role has median above 3M NTD (sanity)", () => {
    const suspicious = salaryData.filter(d => d.exp === "Entry" && d.med > 3_000_000);
    if (suspicious.length > 0) {
      console.log("Suspicious entry-level:", suspicious.map(s => `${s.role} (${s.sector}): ${s.med}`));
    }
    expect(suspicious).toHaveLength(0);
  });

  // ─── Sector consolidation ─────────────────────────────

  it("has no standalone 'Finance' sector (should be Financial Services)", () => {
    const sectors = new Set(salaryData.map(d => d.sector));
    expect(sectors.has("Finance")).toBe(false);
  });

  it("has no 'Finance & Insurance' sector (should be Financial Services)", () => {
    const sectors = new Set(salaryData.map(d => d.sector));
    expect(sectors.has("Finance & Insurance")).toBe(false);
  });

  it("Financial Services sector exists and has entries", () => {
    const fsEntries = salaryData.filter(d => d.sector === "Financial Services");
    expect(fsEntries.length).toBeGreaterThan(10);
  });

  it("Managing Director (Semiconductor) is in Semiconductor sector, not Financial Services", () => {
    const md = salaryData.find(d => d.role === "Managing Director (Semiconductor)");
    expect(md).toBeDefined();
    expect(md!.sector).toBe("Semiconductor");
  });

  // ─── No accidental duplicates ─────────────────────────

  it("no exact duplicate entries (same role+sector+exp+source)", () => {
    const keys = salaryData.map(d => `${d.role}|${d.sector}|${d.exp}|${d.source}`);
    const dupes = keys.filter((k, i) => keys.indexOf(k) !== i);
    if (dupes.length > 0) {
      console.log("Duplicate keys:", [...new Set(dupes)]);
    }
    expect(dupes).toHaveLength(0);
  });

  // ─── Derived exports ──────────────────────────────────

  it("ALL_SECTORS is sorted alphabetically", () => {
    const sorted = [...ALL_SECTORS].sort();
    expect(ALL_SECTORS).toEqual(sorted);
  });

  it("ALL_ROLES is sorted alphabetically", () => {
    const sorted = [...ALL_ROLES].sort();
    expect(ALL_ROLES).toEqual(sorted);
  });

  it("EXP_LEVELS contains expected values", () => {
    expect(EXP_LEVELS).toEqual(["Entry", "Mid", "Senior", "All"]);
  });

  it("every sector in data appears in ALL_SECTORS", () => {
    const dataSectors = new Set(salaryData.map(d => d.sector));
    dataSectors.forEach(s => expect(ALL_SECTORS).toContain(s));
  });

  it("every role in data appears in ALL_ROLES", () => {
    const dataRoles = new Set(salaryData.map(d => d.role));
    dataRoles.forEach(r => expect(ALL_ROLES).toContain(r));
  });

  // ─── NATIONAL_MEDIAN ──────────────────────────────────

  it("NATIONAL_MEDIAN is a reasonable value", () => {
    expect(NATIONAL_MEDIAN).toBeGreaterThan(400_000);
    expect(NATIONAL_MEDIAN).toBeLessThan(1_200_000);
  });

  // ─── Tier values ──────────────────────────────────────

  it("all tier values are between 1 and 5", () => {
    const badTiers = salaryData.filter(d => d.tier < 1 || d.tier > 5);
    expect(badTiers).toHaveLength(0);
  });

  // ─── Year values ──────────────────────────────────────

  it("all years are between 2020 and 2027", () => {
    const badYears = salaryData.filter(d => d.year < 2020 || d.year > 2027);
    if (badYears.length > 0) {
      console.log("Bad years:", badYears.map(y => `${y.role}: ${y.year}`));
    }
    expect(badYears).toHaveLength(0);
  });

  // ─── Source data ───────────────────────────────────────

  it("all entries have a non-empty source", () => {
    const empty = salaryData.filter(d => !d.source || d.source.trim() === "");
    expect(empty).toHaveLength(0);
  });

  it("sources count is at least 1 for every entry", () => {
    const bad = salaryData.filter(d => d.sources < 1);
    expect(bad).toHaveLength(0);
  });

  // ─── Role naming consistency ──────────────────────────

  it("no role names have leading/trailing whitespace", () => {
    const bad = salaryData.filter(d => d.role !== d.role.trim());
    if (bad.length > 0) {
      console.log("Whitespace roles:", bad.map(b => `"${b.role}"`));
    }
    expect(bad).toHaveLength(0);
  });

  it("no sector names have leading/trailing whitespace", () => {
    const bad = salaryData.filter(d => d.sector !== d.sector.trim());
    expect(bad).toHaveLength(0);
  });

  // ─── Cross-sector role consistency ────────────────────

  it("common cross-sector roles exist in multiple sectors", () => {
    const crossRoles = ["HR Manager", "HR Director", "Finance Manager", "Finance Director"];
    for (const role of crossRoles) {
      const sectors = new Set(salaryData.filter(d => d.role === role).map(d => d.sector));
      expect(sectors.size).toBeGreaterThanOrEqual(2);
    }
  });
});
