import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export type CareerPhase = "applying" | "interviewing" | "negotiating";

export interface UserProfile {
  user_id: string;
  career_phase: CareerPhase | null;
  onboarding_completed: boolean;
  last_viewed_guide: string | null;
  last_viewed_guide_at: string | null;
  whats_new_v2_seen: boolean;
  nps_last_shown_at: string | null;
}

const SELECT_FIELDS = "user_id, career_phase, onboarding_completed, last_viewed_guide, last_viewed_guide_at, whats_new_v2_seen, nps_last_shown_at";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from("profiles")
      .select(SELECT_FIELDS)
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data as unknown as UserProfile);
        } else {
          supabase
            .from("profiles")
            .insert({ user_id: user.id })
            .select(SELECT_FIELDS)
            .single()
            .then(({ data: created }) => {
              if (created) setProfile(created as unknown as UserProfile);
            });
        }
        setLoading(false);
      });
  }, [user]);

  const updateProfile = useCallback(
    async (updates: Partial<Pick<UserProfile, "career_phase" | "onboarding_completed" | "last_viewed_guide" | "last_viewed_guide_at" | "nps_last_shown_at">>) => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select(SELECT_FIELDS)
        .single();
      if (data) setProfile(data as unknown as UserProfile);
    },
    [user],
  );

  return { profile, loading, updateProfile };
}
