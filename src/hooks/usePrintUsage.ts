import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const PRINT_LIMIT = 50;
const USAGE_TYPE = "print_export";

export function usePrintUsage() {
  const { user } = useAuth();
  const [printCount, setPrintCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCount = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await supabase.rpc("count_ai_usage_this_month", {
        p_user_id: user.id,
        p_usage_type: USAGE_TYPE,
      });
      setPrintCount(data ?? 0);
    } catch (e) {
      if (import.meta.env.DEV) console.error("Failed to fetch print usage:", e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  /** Returns true if print executed, false if blocked by limit */
  const gatedPrint = useCallback(async (): Promise<boolean> => {
    if (!user) {
      window.print();
      return true;
    }
    if (printCount >= PRINT_LIMIT) {
      return false;
    }
    window.print();
    await supabase.from("ai_usage_log").insert({
      user_id: user.id,
      usage_type: USAGE_TYPE,
    });
    setPrintCount((c) => c + 1);
    return true;
  }, [user, printCount]);

  return {
    printCount,
    printLimit: PRINT_LIMIT,
    printLimitReached: !!(user && printCount >= PRINT_LIMIT),
    loading,
    gatedPrint,
  };
}
