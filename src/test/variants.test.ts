import { describe, it, expect } from "vitest";
import { parseVariant, type Variant } from "@/lib/experiments/variants";

describe("parseVariant", () => {
  it("accepts 'control' as a valid variant", () => {
    expect(parseVariant("control")).toBe("control");
  });

  it("accepts 'treatment' as a valid variant", () => {
    expect(parseVariant("treatment")).toBe("treatment");
  });

  it("returns null for null/undefined RPC results", () => {
    expect(parseVariant(null)).toBeNull();
    expect(parseVariant(undefined)).toBeNull();
  });

  it("returns null for unknown variant strings", () => {
    expect(parseVariant("foo")).toBeNull();
    expect(parseVariant("Control")).toBeNull();
    expect(parseVariant("")).toBeNull();
  });

  it("returns null for non-string types", () => {
    expect(parseVariant(0 as unknown)).toBeNull();
    expect(parseVariant({} as unknown)).toBeNull();
    expect(parseVariant([] as unknown)).toBeNull();
  });

  it("type Variant is exactly 'control' | 'treatment'", () => {
    const a: Variant = "control";
    const b: Variant = "treatment";
    expect([a, b]).toEqual(["control", "treatment"]);
  });
});
