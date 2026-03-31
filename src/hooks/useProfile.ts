import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export type CareerPhase = "applying" | "interviewing" | "negotiating";

export interface UserProfile {
  user_id: string;
  career_phase: CareerPhase | null;
  onboarding_completed: boolean;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from("profiles")
      .select("user_id, career_phase, onboarding_completed")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile(data as unknown as UserProfile);
        } else {
          // Auto-create a blank profile row
          supabase
            .from("profiles")
            .insert({ user_id: user.id })
            .select("user_id, career_phase, onboarding_completed")
            .single()
            .then(({ data: created }) => {
              if (created) setProfile(created as unknown as UserProfile);
            });
        }
        setLoading(false);
      });
  }, [user]);

  const updateProfile = useCallback(
    async (updates: { career_phase?: CareerPhase; onboarding_completed?: boolean }) => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select("user_id, career_phase, onboarding_completed")
        .single();
      if (data) setProfile(data as unknown as UserProfile);
    },
    [user],
  );

  return { profile, loading, updateProfile };
}
