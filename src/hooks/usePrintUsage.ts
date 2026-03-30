import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PRINT_LIMIT = 50;
const USAGE_TYPE = "print_export";

export function usePrintUsage() {
  const { user } = useAuth();
  const { toast } = useToast();
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
      console.error("Failed to fetch print usage:", e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  const gatedPrint = useCallback(async () => {
    if (!user) {
      window.print();
      return;
    }
    if (printCount >= PRINT_LIMIT) {
      toast({
        title: "Print limit reached",
        description: `You've used ${PRINT_LIMIT} prints this month. Limit resets next month.`,
        variant: "destructive",
      });
      return;
    }
    window.print();
    await supabase.from("ai_usage_log").insert({
      user_id: user.id,
      usage_type: USAGE_TYPE,
    });
    setPrintCount((c) => c + 1);
  }, [user, printCount, toast]);

  return {
    printCount,
    printLimit: PRINT_LIMIT,
    printLimitReached: !!(user && printCount >= PRINT_LIMIT),
    loading,
    gatedPrint,
  };
}
