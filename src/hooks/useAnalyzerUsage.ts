import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const MONTHLY_LIMIT = 3;

export function useAnalyzerUsage() {
  const { user, isLoggedIn } = useAuth();
  const [used, setUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchServerCount = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const { count, error } = await (supabase as any)
        .from("resume_analyses")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", getMonthStart());

      if (!error && typeof count === "number") {
        setUsed(count);
      }
    } catch (e) {
      console.error("Failed to fetch analyzer usage:", e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchServerCount();
  }, [fetchServerCount]);

  const limit = MONTHLY_LIMIT;
  const limitReached = used >= limit;

  const recordUsage = useCallback(() => {
    // Usage is recorded via saveAnalysis in useResumeAnalyses;
    // just increment local count optimistically
    setUsed((c) => c + 1);
  }, []);

  return { used, limit, limitReached, recordUsage, loading };
}

function getMonthStart(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01T00:00:00.000Z`;
}
