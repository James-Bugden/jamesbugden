import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const IMPORT_LIMIT = 2;
const AI_TOOL_LIMIT = 6;

export function useBuilderAiUsage() {
  const { user } = useAuth();
  const [importCount, setImportCount] = useState(0);
  const [aiToolCount, setAiToolCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const [importRes, toolRes] = await Promise.all([
        supabase.rpc("count_ai_usage_this_month", { p_user_id: user.id, p_usage_type: "import" }),
        supabase.rpc("count_ai_usage_this_month", { p_user_id: user.id, p_usage_type: "ai_tool" }),
      ]);
      setImportCount(importRes.data ?? 0);
      setAiToolCount(toolRes.data ?? 0);
    } catch (e) {
      console.error("Failed to fetch AI usage counts:", e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const recordImport = useCallback(async () => {
    if (!user) return;
    await supabase.from("ai_usage_log" as any).insert({ user_id: user.id, usage_type: "import" });
    setImportCount((c) => c + 1);
  }, [user]);

  const recordAiTool = useCallback(async () => {
    if (!user) return;
    await supabase.from("ai_usage_log" as any).insert({ user_id: user.id, usage_type: "ai_tool" });
    setAiToolCount((c) => c + 1);
  }, [user]);

  return {
    importCount,
    importLimit: IMPORT_LIMIT,
    importLimitReached: importCount >= IMPORT_LIMIT,
    aiToolCount,
    aiToolLimit: AI_TOOL_LIMIT,
    aiToolLimitReached: aiToolCount >= AI_TOOL_LIMIT,
    loading,
    recordImport,
    recordAiTool,
  };
}
