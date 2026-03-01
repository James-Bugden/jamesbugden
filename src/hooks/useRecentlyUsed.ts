import { useLocalStorage } from "./useLocalStorage";
import { useCallback } from "react";

export interface RecentItem {
  id: string;
  type: "tool" | "guide" | "toolkit";
  timestamp: number;
}

const MAX_RECENT = 3;

export function useRecentlyUsed() {
  const [recentItems, setRecentItems] = useLocalStorage<RecentItem[]>("dashboard_recent", []);

  const trackItem = useCallback(
    (id: string, type: RecentItem["type"]) => {
      setRecentItems((prev) => {
        const filtered = prev.filter((item) => item.id !== id);
        return [{ id, type, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      });
    },
    [setRecentItems],
  );

  return { recentItems, trackItem } as const;
}
