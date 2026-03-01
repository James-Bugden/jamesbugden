import { useEffect, useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

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

/** Drop this into a guide page to auto-track scroll progress */
export function useTrackGuideProgress(guideId: string) {
  const { updateProgress } = useReadingProgress();
  const maxRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      if (pct > maxRef.current) maxRef.current = pct;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (maxRef.current > 0) {
        updateProgress(guideId, maxRef.current);
      }
    };
  }, [guideId, updateProgress]);
}
