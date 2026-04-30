import { useEffect, useRef } from "react";

const MARK_START = "qbank:start";
const MARK_INTERACTIVE = "qbank:interactive";
const MEASURE_NAME = "qbank:tti";
const TTI_THRESHOLD_MS = 2500;

export function useQBankTTIGuard(loading: boolean): void {
  const measured = useRef(false);

  useEffect(() => {
    performance.mark(MARK_START);
  }, []);

  useEffect(() => {
    if (loading || measured.current) return;
    measured.current = true;
    performance.mark(MARK_INTERACTIVE);
    performance.measure(MEASURE_NAME, MARK_START, MARK_INTERACTIVE);
    const entries = performance.getEntriesByName(
      MEASURE_NAME,
      "measure"
    ) as PerformanceMeasure[];
    const tti_ms = entries[entries.length - 1]?.duration ?? 0;
    if (tti_ms > TTI_THRESHOLD_MS) {
      console.warn("[qbank] TTI regression detected", {
        tti_ms,
        threshold_ms: TTI_THRESHOLD_MS,
        mark: MEASURE_NAME,
      });
    }
  }, [loading]);
}
