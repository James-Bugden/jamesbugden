import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const MONTHLY_LIMIT = 10;

export function useAnalyzerUsage() {
  const { user, isLoggedIn } = useAuth();
  const [used, setUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchServerCount = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const [usageRes, adminRes] = await Promise.all([
        supabase
          .from("resume_analyses")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", getMonthStart()),
        supabase.rpc("is_admin", { _user_id: user.id }),
      ]);

      if (!usageRes.error && typeof usageRes.count === "number") {
        setUsed(usageRes.count);
      }
      if (adminRes.data) setIsAdmin(true);
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
  const limitReached = isAdmin ? false : used >= limit;

  const recordUsage = useCallback(() => {
    setUsed((c) => c + 1);
  }, []);

  return { used, limit, limitReached, recordUsage, loading };
}

function getMonthStart(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01T00:00:00.000Z`;
}
