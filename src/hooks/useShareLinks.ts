import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface ShareLink {
  id: string;
  analysis_id: string;
  share_id: string;
  views: number;
  last_viewed_at: string | null;
  created_at: string;
  is_active: boolean;
  analysis?: {
    overall_score: number | null;
    created_at: string;
  };
}

export interface CreateShareLinkResponse {
  id: string;
  share_id: string;
  url: string;
  views: number;
}

export function useShareLinks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get all share links for the current user
  const {
    data: shareLinks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shareLinks", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("share_links")
        .select(`
          *,
          analysis:resume_analyses(overall_score, created_at)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching share links:", error);
        throw error;
      }

      return data as ShareLink[];
    },
    enabled: !!user,
  });

  // Create a new share link for an analysis
  const createShareLink = useMutation({
    mutationFn: async (analysisId: string) => {
      if (!user) throw new Error("User not authenticated");

      // First check if there's already an active share link for this analysis
      const { data: existing } = await supabase
        .from("share_links")
        .select("*")
        .eq("analysis_id", analysisId)
        .eq("is_active", true)
        .maybeSingle();

      if (existing) {
        return {
          id: existing.id,
          share_id: existing.share_id,
          url: `${window.location.origin}/r/${existing.share_id}`,
          views: existing.views,
        } as CreateShareLinkResponse;
      }

      // Generate a new share ID
      const { data: shareIdData, error: shareIdError } = await supabase.rpc(
        "generate_share_id"
      );

      if (shareIdError) {
        console.error("Error generating share ID:", shareIdError);
        throw new Error("Failed to generate share link");
      }

      const shareId = shareIdData;

      // Create the share link
      const { data, error } = await supabase
        .from("share_links")
        .insert({
          analysis_id: analysisId,
          share_id: shareId,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating share link:", error);
        throw error;
      }

      return {
        id: data.id,
        share_id: data.share_id,
        url: `${window.location.origin}/r/${data.share_id}`,
        views: data.views,
      } as CreateShareLinkResponse;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shareLinks", user?.id] });
      toast({
        title: "Share link created",
        description: "Your analysis is now publicly accessible at the link below.",
      });
    },
    onError: (error) => {
      console.error("Error creating share link:", error);
      toast({
        title: "Failed to create share link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete (deactivate) a share link
  const deleteShareLink = useMutation({
    mutationFn: async (shareId: string) => {
      const { error } = await supabase
        .from("share_links")
        .update({ is_active: false })
        .eq("share_id", shareId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shareLinks", user?.id] });
      toast({
        title: "Share link deactivated",
        description: "The public link is no longer accessible.",
      });
    },
    onError: (error) => {
      console.error("Error deleting share link:", error);
      toast({
        title: "Failed to deactivate share link",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Get a public share link by ID (for public viewing)
  const getPublicShareLink = async (shareId: string) => {
    const { data, error } = await supabase
      .from("share_links")
      .select(`
        *,
        analysis:resume_analyses!inner(*)
      `)
      .eq("share_id", shareId)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Error fetching public share link:", error);
      throw error;
    }

    // Increment view count
    await supabase.rpc("increment_share_views", {
      share_id_param: shareId,
    });

    return data;
  };

  return {
    shareLinks,
    isLoading,
    error,
    refetch,
    createShareLink,
    deleteShareLink,
    getPublicShareLink,
  };
}