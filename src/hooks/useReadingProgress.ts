import { useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { trackEvent } from "@/lib/trackEvent";
import { startGuideRead, trackTool } from "@/lib/analytics";

type ProgressMap = Record<string, number>;

export function useReadingProgress() {
  const [progressMap, setProgressMap] = useLocalStorage<ProgressMap>("guide_reading_progress", {});
  const [completedSet, setCompletedSet] = useLocalStorage<string[]>("guide_completed", []);

  const getProgress = useCallback((id: string) => progressMap[id] ?? 0, [progressMap]);
  const isComplete = useCallback((id: string) => completedSet.includes(id), [completedSet]);

  const toggleComplete = useCallback((id: string) => {
    setCompletedSet((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, [setCompletedSet]);

  const updateProgress = useCallback((id: string, pct: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(pct)));
    setProgressMap((prev) => {
      const current = prev[id] ?? 0;
      if (clamped <= current) return prev;
      return { ...prev, [id]: clamped };
    });
  }, [setProgressMap]);

  return { getProgress, isComplete, toggleComplete, updateProgress };
}

/** Drop this into a guide page to auto-track scroll progress, time on page, and scroll depth */
export function useTrackGuideProgress(guideId: string) {
  const { updateProgress } = useReadingProgress();
  const maxRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Reset on mount
    maxRef.current = 0;
    startTimeRef.current = Date.now();

    trackEvent("guide_view", guideId);
    // Detect language from path for the dedicated guide_reads row
    const lang: "en" | "zh" = window.location.pathname.startsWith("/zh-tw") ? "zh" : "en";
    const reader = startGuideRead(guideId, lang);
    // First-session funnel signal (HIR-64). Read-time view filters to a
    // user's first authenticated session, so emitting on every guide
    // mount is safe and gives us per-guide coverage without double-counts.
    trackTool("guide", "started", { guide_slug: guideId }, { lang });

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      if (pct > maxRef.current) maxRef.current = pct;
    };

    const fireExit = () => {
      const scrollDepth = Math.round(maxRef.current);
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (scrollDepth > 0 || timeOnPage > 2) {
        trackEvent("guide_exit", guideId, {
          guide_id: guideId,
          scroll_depth_pct: scrollDepth,
          time_on_page_sec: timeOnPage,
        });
      }
      // Always finalize the guide_reads row, even for tiny visits
      reader.finalize(scrollDepth, false);
    };

    const onBeforeUnload = () => {
      fireExit();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onBeforeUnload);
      // Fire on React cleanup (navigation)
      fireExit();
      if (maxRef.current > 0) {
        updateProgress(guideId, maxRef.current);
      }
    };
  }, [guideId, updateProgress]);
}
