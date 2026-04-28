import { describe, it, expect } from "vitest";
import {
  computeTopContributor,
  computeNextTarget,
} from "../scoreDeltaUtils";
import type { Section } from "../types";

const makeSection = (name: string, score: number): Section => ({
  name,
  score,
  summary: "",
  findings: [],
});

describe("computeTopContributor", () => {
  it("returns the section with the largest positive delta", () => {
    const prev: Section[] = [
      makeSection("Work Experience", 5),
      makeSection("Skills", 6),
      makeSection("Education", 7),
    ];
    const curr: Section[] = [
      makeSection("Work Experience", 8), // +3
      makeSection("Skills", 7),          // +1
      makeSection("Education", 7),       // 0
    ];
    expect(computeTopContributor(curr, prev)).toBe("Work Experience");
  });

  it("returns null when no section improved", () => {
    const prev: Section[] = [makeSection("Work Experience", 8)];
    const curr: Section[] = [makeSection("Work Experience", 7)];
    expect(computeTopContributor(curr, prev)).toBeNull();
  });

  it("returns null when all deltas are zero", () => {
    const prev: Section[] = [makeSection("Skills", 6)];
    const curr: Section[] = [makeSection("Skills", 6)];
    expect(computeTopContributor(curr, prev)).toBeNull();
  });

  it("ignores sections whose name does not match between analyses", () => {
    const prev: Section[] = [makeSection("Contact Info", 9)];
    const curr: Section[] = [makeSection("Summary", 5)];
    expect(computeTopContributor(curr, prev)).toBeNull();
  });

  it("handles empty arrays without throwing", () => {
    expect(computeTopContributor([], [])).toBeNull();
  });
});

describe("computeNextTarget", () => {
  it("returns 60 when score is below 60", () => {
    expect(computeNextTarget(45)).toBe(60);
  });

  it("returns 70 when score is exactly 60", () => {
    expect(computeNextTarget(60)).toBe(70);
  });

  it("returns 80 when score is between 70 and 80", () => {
    expect(computeNextTarget(74)).toBe(80);
  });

  it("returns 90 when score is between 80 and 90", () => {
    expect(computeNextTarget(83)).toBe(90);
  });

  it("returns 100 when score is 90", () => {
    expect(computeNextTarget(90)).toBe(100);
  });

  it("returns 100 when score is already 100", () => {
    expect(computeNextTarget(100)).toBe(100);
  });
});
