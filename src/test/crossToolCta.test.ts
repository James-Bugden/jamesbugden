import { describe, it, expect } from "vitest";
import {
  bucketScore,
  normalizeLevel,
  interviewGuideUrl,
  levelLabel,
} from "@/components/resume-analyzer/crossToolCta";

describe("bucketScore", () => {
  it("returns '<60' for scores below 60", () => {
    expect(bucketScore(0)).toBe("<60");
    expect(bucketScore(1)).toBe("<60");
    expect(bucketScore(59)).toBe("<60");
  });

  it("returns '60-74' for scores 60..74 inclusive", () => {
    expect(bucketScore(60)).toBe("60-74");
    expect(bucketScore(67)).toBe("60-74");
    expect(bucketScore(74)).toBe("60-74");
  });

  it("returns '75-89' for scores 75..89 inclusive", () => {
    expect(bucketScore(75)).toBe("75-89");
    expect(bucketScore(82)).toBe("75-89");
    expect(bucketScore(89)).toBe("75-89");
  });

  it("returns '90+' for scores 90 and above", () => {
    expect(bucketScore(90)).toBe("90+");
    expect(bucketScore(99)).toBe("90+");
    expect(bucketScore(100)).toBe("90+");
  });

  it("clamps non-finite or out-of-range values to '<60'", () => {
    expect(bucketScore(NaN)).toBe("<60");
    expect(bucketScore(-10)).toBe("<60");
    expect(bucketScore(Infinity)).toBe("<60");
    expect(bucketScore(-Infinity)).toBe("<60");
  });
});

describe("normalizeLevel", () => {
  it("returns 'entry' for entry-tier titles", () => {
    expect(normalizeLevel("Junior Software Engineer")).toBe("entry");
    expect(normalizeLevel("Intern")).toBe("entry");
    expect(normalizeLevel("Entry-level marketer")).toBe("entry");
    expect(normalizeLevel("Associate Product Manager")).toBe("entry");
  });

  it("returns 'mid' for mid-tier titles", () => {
    expect(normalizeLevel("Mid-level engineer")).toBe("mid");
    expect(normalizeLevel("Intermediate developer")).toBe("mid");
  });

  it("returns 'senior' for senior individual-contributor titles", () => {
    expect(normalizeLevel("Senior Software Engineer")).toBe("senior");
    expect(normalizeLevel("Staff engineer")).toBe("senior");
    expect(normalizeLevel("Principal engineer")).toBe("senior");
    expect(normalizeLevel("Tech Lead")).toBe("senior");
  });

  it("resolves Mid-Senior to 'senior' (senior wins over mid by precedence)", () => {
    expect(normalizeLevel("Mid-Senior Engineer")).toBe("senior");
  });

  it("returns 'unknown' for non-English seniority strings (no Chinese keyword map)", () => {
    expect(normalizeLevel("資深工程師")).toBe("unknown");
  });

  it("returns 'executive' for management/exec titles", () => {
    expect(normalizeLevel("Engineering Manager")).toBe("executive");
    expect(normalizeLevel("Director of Product")).toBe("executive");
    expect(normalizeLevel("VP Engineering")).toBe("executive");
    expect(normalizeLevel("Head of Marketing")).toBe("executive");
    expect(normalizeLevel("Chief Technology Officer")).toBe("executive");
  });

  it("returns 'unknown' for missing or unrecognised input", () => {
    expect(normalizeLevel(null)).toBe("unknown");
    expect(normalizeLevel(undefined)).toBe("unknown");
    expect(normalizeLevel("")).toBe("unknown");
    expect(normalizeLevel("   ")).toBe("unknown");
    expect(normalizeLevel("alien overlord")).toBe("unknown");
  });
});

describe("interviewGuideUrl", () => {
  it("returns the EN guide path", () => {
    expect(interviewGuideUrl("en")).toBe("/interview-preparation-guide");
  });

  it("returns the ZH-TW guide path", () => {
    expect(interviewGuideUrl("zh-TW")).toBe("/zh-tw/interview-preparation-guide");
  });
});

describe("levelLabel", () => {
  it("returns the EN descriptor for known levels", () => {
    expect(levelLabel("entry", "en")).toBe("entry-level");
    expect(levelLabel("mid", "en")).toBe("mid-level");
    expect(levelLabel("senior", "en")).toBe("senior-level");
    expect(levelLabel("executive", "en")).toBe("executive-level");
  });

  it("returns the ZH descriptor for known levels", () => {
    expect(levelLabel("entry", "zh-TW")).toBe("初階");
    expect(levelLabel("mid", "zh-TW")).toBe("中階");
    expect(levelLabel("senior", "zh-TW")).toBe("資深");
    expect(levelLabel("executive", "zh-TW")).toBe("主管");
  });

  it("returns null for unknown level so callers can omit the clause", () => {
    expect(levelLabel("unknown", "en")).toBeNull();
    expect(levelLabel("unknown", "zh-TW")).toBeNull();
  });
});
