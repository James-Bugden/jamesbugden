import { describe, it, expect } from "vitest";
import { formatAxisValue } from "@/components/salary/formatAxis";

describe("formatAxisValue", () => {
  it("formats millions correctly", () => {
    expect(formatAxisValue(1_000_000)).toBe("1M");
    expect(formatAxisValue(2_500_000)).toBe("2.5M");
    expect(formatAxisValue(10_000_000)).toBe("10M");
  });

  it("formats thousands correctly", () => {
    expect(formatAxisValue(500_000)).toBe("500k");
    expect(formatAxisValue(100_000)).toBe("100k");
    expect(formatAxisValue(50_000)).toBe("50k");
  });

  it("handles zero", () => {
    expect(formatAxisValue(0)).toBe("0k");
  });
});

describe("SalaryContext formatSalary logic", () => {
  // Test the pure formatting logic without React context
  function formatSalary(value: number, currency: "NTD" | "USD", period: "annual" | "monthly", fxRate: number): string {
    let v = period === "monthly" ? value / 12 : value;
    if (currency === "USD") v = v / fxRate;
    const prefix = currency === "NTD" ? "NT$" : "US$";
    const formatted = Math.round(v).toLocaleString("en-US");
    const suffix = period === "monthly" ? "/mo" : "";
    return `${prefix}${formatted}${suffix}`;
  }

  it("formats NTD annual correctly", () => {
    const result = formatSalary(1_200_000, "NTD", "annual", 32);
    expect(result).toBe("NT$1,200,000");
  });

  it("formats NTD monthly correctly", () => {
    const result = formatSalary(1_200_000, "NTD", "monthly", 32);
    expect(result).toBe("NT$100,000/mo");
  });

  it("formats USD annual correctly", () => {
    const result = formatSalary(3_200_000, "USD", "annual", 32);
    expect(result).toBe("US$100,000");
  });

  it("formats USD monthly correctly", () => {
    const result = formatSalary(3_840_000, "USD", "monthly", 32);
    expect(result).toBe("US$10,000/mo");
  });

  it("handles zero value", () => {
    const result = formatSalary(0, "NTD", "annual", 32);
    expect(result).toBe("NT$0");
  });

  it("rounds to whole numbers", () => {
    const result = formatSalary(1_000_001, "NTD", "monthly", 32);
    // 1000001/12 = 83333.4166... → rounds to 83333
    expect(result).toMatch(/NT\$83,333\/mo/);
  });
});
