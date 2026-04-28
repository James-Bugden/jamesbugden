import { describe, it, expect } from "vitest";
import { isInHoldout } from "@/hooks/useOnboardingRouterFlag";

// spec hash: parseInt(userId.replace(/-/g,'').slice(-8), 16) % 100 < holdoutPct

describe("isInHoldout", () => {
  it("returns false when holdoutPct is 0", () => {
    expect(isInHoldout("00000000-0000-0000-0000-000000000001", 0)).toBe(false);
  });

  it("returns true when holdoutPct is 100", () => {
    expect(isInHoldout("00000000-0000-0000-0000-000000000001", 100)).toBe(true);
  });

  it("is deterministic — same userId always gives same result", () => {
    const uid = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
    expect(isInHoldout(uid, 20)).toBe(isInHoldout(uid, 20));
  });

  it("places user in holdout when bucket < holdoutPct", () => {
    // uid ends in "00000001" → last 8 hex stripped = "00000001"
    // parseInt("00000001", 16) = 1; 1 % 100 = 1; 1 < 20 → true
    expect(isInHoldout("00000000-0000-0000-0000-000000000001", 20)).toBe(true);
  });

  it("places user NOT in holdout when bucket === holdoutPct", () => {
    // uid ends in "00000078" → parseInt("00000078",16)=120; 120%100=20; 20<20=false
    expect(isInHoldout("00000000-0000-0000-0000-000000000078", 20)).toBe(false);
  });

  it("uses last 8 hex chars after stripping dashes", () => {
    // "a1b2c3d4-e5f6-7890-abcd-ef1234567890" stripped = "a1b2c3d4e5f67890abcdef1234567890"
    // last 8: "34567890"; parseInt("34567890",16)=878082192; 878082192%100=92; 92<20 → false
    expect(isInHoldout("a1b2c3d4-e5f6-7890-abcd-ef1234567890", 20)).toBe(false);
  });
});
