import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Deterministic holdout assignment per HIR-148 PRD spec.
 * parseInt(userId.replace(/-/g,'').slice(-8), 16) % 100 < holdoutPct
 */
export function isInHoldout(userId: string, holdoutPct: number): boolean {
  const stripped = userId.replace(/-/g, "");
  const last8 = stripped.slice(-8);
  const bucket = parseInt(last8, 16) % 100;
  return bucket < holdoutPct;
}

interface UseOnboardingRouterFlagResult {
  enabled: boolean;
  holdoutPct: number;
  loading: boolean;
}

export function useOnboardingRouterFlag(): UseOnboardingRouterFlagResult {
  const [enabled, setEnabled] = useState(false);
  const [holdoutPct, setHoldoutPct] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("app_config")
      .select("config")
      .eq("key", "onboarding_router")
      .maybeSingle()
      .then(({ data }) => {
        if (data?.config) {
          const cfg = data.config as { enabled?: boolean; holdout_pct?: number };
          setEnabled(cfg.enabled ?? false);
          setHoldoutPct(cfg.holdout_pct ?? 20);
        }
        setLoading(false);
      });
  }, []);

  return { enabled, holdoutPct, loading };
}
