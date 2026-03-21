import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hybrid localStorage + cloud storage for guide progress.
 * - Guests: localStorage only
 * - Logged-in: localStorage (immediate) + cloud sync (debounced)
 */
export function useGuideStorage<T>(guideKey: string, initialValue: T) {
  const lsKey = `guide_${guideKey}`;
  const { user, isLoggedIn } = useAuth();
  const cloudSynced = useRef(false);

  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(lsKey);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(lsKey, JSON.stringify(value));
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  }, [lsKey, value]);

  // On login: pull cloud data (cloud wins on conflict)
  useEffect(() => {
    if (!isLoggedIn || !user || cloudSynced.current) return;
    cloudSynced.current = true;

    (async () => {
      try {
        const { data } = await supabase
          .from("guide_progress")
          .select("data, updated_at")
          .eq("user_id", user.id)
          .eq("guide_key", guideKey)
          .maybeSingle();

        if (data?.data) {
          // Cloud wins — overwrite local
          setValue(data.data as T);
        } else {
          // No cloud data — push local to cloud if non-empty
          const local = localStorage.getItem(lsKey);
          if (local && local !== JSON.stringify(initialValue)) {
            await supabase.from("guide_progress").upsert(
              { user_id: user.id, guide_key: guideKey, data: JSON.parse(local), updated_at: new Date().toISOString() },
              { onConflict: "user_id,guide_key" }
            );
          }
        }
      } catch (e) {
        console.warn("Cloud sync failed:", e);
      }
    })();
  }, [isLoggedIn, user, guideKey, lsKey, initialValue]);

  // Debounced cloud save on changes (only when logged in)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (!isLoggedIn || !user || !cloudSynced.current) return;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        await supabase.from("guide_progress").upsert(
          { user_id: user.id, guide_key: guideKey, data: value, updated_at: new Date().toISOString() },
          { onConflict: "user_id,guide_key" }
        );
      } catch (e) {
        console.warn("Cloud save failed:", e);
      }
    }, 1000);

    return () => clearTimeout(debounceRef.current);
  }, [value, isLoggedIn, user, guideKey]);

  const update = useCallback((updater: T | ((prev: T) => T)) => {
    setValue(prev => (updater instanceof Function ? updater(prev) : updater));
  }, []);

  return [value, update] as const;
}
