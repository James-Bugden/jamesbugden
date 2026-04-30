import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQBankTTIGuard } from "@/hooks/useQBankTTIGuard";

describe("useQBankTTIGuard", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.spyOn(globalThis.performance, "mark").mockImplementation(
      () => ({} as PerformanceMark)
    );
    vi.spyOn(globalThis.performance, "measure").mockImplementation(
      () => ({} as PerformanceMeasure)
    );
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("emits console.warn when TTI exceeds 2500 ms", () => {
    vi.spyOn(globalThis.performance, "getEntriesByName").mockReturnValue([
      { duration: 3124 } as PerformanceMeasure,
    ]);

    const { rerender } = renderHook(
      ({ loading }: { loading: boolean }) => useQBankTTIGuard(loading),
      { initialProps: { loading: true } }
    );

    act(() => {
      rerender({ loading: false });
    });

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy).toHaveBeenCalledWith("[qbank] TTI regression detected", {
      tti_ms: 3124,
      threshold_ms: 2500,
      mark: "qbank:tti",
    });
  });

  it("does not emit console.warn when TTI is within threshold", () => {
    vi.spyOn(globalThis.performance, "getEntriesByName").mockReturnValue([
      { duration: 1500 } as PerformanceMeasure,
    ]);

    const { rerender } = renderHook(
      ({ loading }: { loading: boolean }) => useQBankTTIGuard(loading),
      { initialProps: { loading: true } }
    );

    act(() => {
      rerender({ loading: false });
    });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("only measures once per mount even if loading toggles again", () => {
    vi.spyOn(globalThis.performance, "getEntriesByName").mockReturnValue([
      { duration: 3000 } as PerformanceMeasure,
    ]);

    const { rerender } = renderHook(
      ({ loading }: { loading: boolean }) => useQBankTTIGuard(loading),
      { initialProps: { loading: true } }
    );

    act(() => { rerender({ loading: false }); });
    act(() => { rerender({ loading: true }); });
    act(() => { rerender({ loading: false }); });

    expect(warnSpy).toHaveBeenCalledOnce();
  });
});
