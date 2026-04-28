import { describe, it, expect } from "vitest";
import { STAGE_ROUTES } from "@/components/OnboardingRouter";

describe("STAGE_ROUTES", () => {
  it("maps starting → /resume (EN) and /zh-tw/resume (ZH)", () => {
    expect(STAGE_ROUTES.starting.en).toBe("/resume");
    expect(STAGE_ROUTES.starting.zh).toBe("/zh-tw/resume");
  });

  it("maps applying → /resume-analyzer (EN) and /zh-tw/resume-analyzer (ZH)", () => {
    expect(STAGE_ROUTES.applying.en).toBe("/resume-analyzer");
    expect(STAGE_ROUTES.applying.zh).toBe("/zh-tw/resume-analyzer");
  });

  it("maps interviewing → /interview-questions (EN) and /zh-tw/interview-questions (ZH)", () => {
    expect(STAGE_ROUTES.interviewing.en).toBe("/interview-questions");
    expect(STAGE_ROUTES.interviewing.zh).toBe("/zh-tw/interview-questions");
  });

  it("maps negotiating → /toolkit (EN) and /zh-tw/toolkit (ZH)", () => {
    expect(STAGE_ROUTES.negotiating.en).toBe("/toolkit");
    expect(STAGE_ROUTES.negotiating.zh).toBe("/zh-tw/toolkit");
  });

  it("covers all four JobSearchStage values with string paths", () => {
    const stages = ["starting", "applying", "interviewing", "negotiating"] as const;
    for (const stage of stages) {
      expect(STAGE_ROUTES[stage]).toBeDefined();
      expect(typeof STAGE_ROUTES[stage].en).toBe("string");
      expect(typeof STAGE_ROUTES[stage].zh).toBe("string");
    }
  });
});
