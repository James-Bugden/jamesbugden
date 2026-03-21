import { describe, it, expect } from "vitest";
import { salaryData, ALL_SECTORS } from "@/data/salaryData";

describe("Salary Search & Filter Logic", () => {
  // Replicates SalaryChecker filtering logic

  function searchByRole(role: string, sector?: string, exp?: string) {
    let filtered = salaryData.filter(d => d.role === role);
    if (sector) filtered = filtered.filter(d => d.sector === sector);
    if (exp) filtered = filtered.filter(d => d.exp === exp);
    if (filtered.length === 0) return null;
    filtered.sort((a, b) => a.tier - b.tier);
    return filtered[0];
  }

  function browseResults(sector?: string, exp?: string) {
    let filtered = salaryData;
    if (sector) filtered = filtered.filter(d => d.sector === sector);
    if (exp) filtered = filtered.filter(d => d.exp === exp);
    const best: Record<string, typeof salaryData[0]> = {};
    filtered.forEach(d => {
      if (!best[d.role] || d.tier < best[d.role].tier) best[d.role] = d;
    });
    return Object.values(best).sort((a, b) => b.med - a.med);
  }

  // ─── Role search ──────────────────────────────────────

  it("finds CFO under Financial Services", () => {
    const result = searchByRole("Chief Financial Officer", "Financial Services");
    expect(result).not.toBeNull();
    expect(result!.sector).toBe("Financial Services");
  });

  it("finds HR Manager across multiple sectors", () => {
    const tech = searchByRole("HR Manager", "Technology");
    const fs = searchByRole("HR Manager", "Financial Services");
    expect(tech).not.toBeNull();
    expect(fs).not.toBeNull();
    expect(tech!.sector).toBe("Technology");
    expect(fs!.sector).toBe("Financial Services");
  });

  it("returns null for non-existent role", () => {
    const result = searchByRole("Underwater Basket Weaver");
    expect(result).toBeNull();
  });

  it("prioritizes lower tier (better source) when multiple entries exist", () => {
    const result = searchByRole("Finance Manager", "Financial Services");
    expect(result).not.toBeNull();
    // Should pick tier 1 over tier 4
    const allEntries = salaryData.filter(d => d.role === "Finance Manager" && d.sector === "Financial Services");
    if (allEntries.length > 1) {
      const minTier = Math.min(...allEntries.map(e => e.tier));
      expect(result!.tier).toBe(minTier);
    }
  });

  // ─── Sector browse ────────────────────────────────────

  it("browsing Financial Services returns all finance-related roles", () => {
    const results = browseResults("Financial Services");
    expect(results.length).toBeGreaterThan(10);
    const roles = results.map(r => r.role);
    expect(roles).toContain("Chief Financial Officer");
    expect(roles).toContain("Finance Manager");
  });

  it("browsing Technology returns tech roles", () => {
    const results = browseResults("Technology");
    expect(results.length).toBeGreaterThan(5);
    const roles = results.map(r => r.role);
    expect(roles).toContain("Software Engineer");
  });

  it("browsing by exp='Entry' returns only entry-level results", () => {
    const results = browseResults(undefined, "Entry");
    expect(results.length).toBeGreaterThan(0);
    results.forEach(r => expect(r.exp).toBe("Entry"));
  });

  it("browsing by sector+exp narrows results correctly", () => {
    const all = browseResults("Technology");
    const seniors = browseResults("Technology", "Senior");
    expect(seniors.length).toBeLessThanOrEqual(all.length);
    seniors.forEach(r => {
      expect(r.sector).toBe("Technology");
      expect(r.exp).toBe("Senior");
    });
  });

  // ─── Sector comparison logic ──────────────────────────

  it("ALL_SECTORS has no empty strings", () => {
    expect(ALL_SECTORS.every(s => s.length > 0)).toBe(true);
  });

  it("every sector has at least one entry", () => {
    for (const sector of ALL_SECTORS) {
      const count = salaryData.filter(d => d.sector === sector).length;
      expect(count).toBeGreaterThan(0);
    }
  });

  it("sector averages can be computed without division by zero", () => {
    for (const sector of ALL_SECTORS) {
      const entries = salaryData.filter(d => d.sector === sector);
      expect(entries.length).toBeGreaterThan(0);
      const avg = Math.round(entries.reduce((sum, d) => sum + d.med, 0) / entries.length);
      expect(avg).toBeGreaterThan(0);
      expect(Number.isFinite(avg)).toBe(true);
    }
  });

  // ─── Similar roles logic ──────────────────────────────

  it("similar roles for a given role exist in same sector", () => {
    const role = "Software Engineer";
    const sector = "Technology";
    const similar = salaryData
      .filter(d => d.sector === sector && d.role !== role)
      .sort((a, b) => b.med - a.med)
      .slice(0, 5);
    expect(similar.length).toBeGreaterThan(0);
    similar.forEach(s => expect(s.sector).toBe(sector));
  });

  // ─── National median comparison ───────────────────────

  it("percentage difference from national median computes correctly", () => {
    const NATIONAL_MEDIAN = 546000;
    const entry = searchByRole("Chief Financial Officer");
    expect(entry).not.toBeNull();
    const diff = ((entry!.med - NATIONAL_MEDIAN) / NATIONAL_MEDIAN) * 100;
    expect(diff).toBeGreaterThan(0); // CFO should be well above median
    expect(Number.isFinite(diff)).toBe(true);
  });
});
