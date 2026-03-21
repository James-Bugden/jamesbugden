import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SavedAnalysis {
  id: string;
  overall_score: number | null;
  analysis_result: any | null;
  language: string | null;
  created_at: string;
}

export function useResumeAnalyses() {
  const { user, isLoggedIn } = useAuth();
  const [latest, setLatest] = useState<SavedAnalysis | null>(null);
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    const { data } = await supabase
      .from("resume_analyses")
      .select("id, overall_score, analysis_result, language, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    const list = (data as SavedAnalysis[] | null) ?? [];
    setAnalyses(list);
    setLatest(list[0] ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const saveAnalysis = useCallback(async (params: {
    overall_score: number;
    analysis_result: any;
    resume_text: string;
    language: string;
  }) => {
    if (!user) return;
    await supabase.from("resume_analyses").insert({
      user_id: user.id,
      overall_score: params.overall_score,
      analysis_result: params.analysis_result,
      resume_text: params.resume_text,
      language: params.language,
    });
    fetchAll();
  }, [user, fetchAll]);

  return { latest, analyses, loading, saveAnalysis, isLoggedIn };
}
