import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type DateRange = "7d" | "30d" | "90d" | "all";

export function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

export function pct(n: number): string {
  return (n * 100).toFixed(2) + "%";
}

export function daysAgo(d: number): string {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString().split("T")[0];
}

export function rangeStart(range: DateRange): string | null {
  if (range === "7d") return daysAgo(7);
  if (range === "30d") return daysAgo(30);
  if (range === "90d") return daysAgo(90);
  return null;
}

export type ThreadsPost = {
  id: string;
  media_id: string;
  text_content: string | null;
  media_type: string | null;
  permalink: string | null;
  shortcode: string | null;
  is_quote_post: boolean | null;
  posted_at: string | null;
  media_url: string | null;
  thumbnail_url: string | null;
  views: number;
  likes: number;
  replies: number;
  reposts: number;
  quotes: number;
  shares: number;
  image_description: string | null;
  image_tags: string[] | null;
  image_analyzed_at: string | null;
  text_length: number;
  detected_language: string | null;
  hashtag: string | null;
  engagement_rate: number;
  virality_rate: number;
  conversation_rate: number;
};

const POST_FIELDS = "id, media_id, text_content, media_type, permalink, shortcode, is_quote_post, posted_at, media_url, thumbnail_url, views, likes, replies, reposts, quotes, shares, image_description, image_tags, image_analyzed_at, text_length, detected_language, hashtag, engagement_rate, virality_rate, conversation_rate";

export function useAllPosts(range: DateRange) {
  return useQuery({
    queryKey: ["threads-all-posts", range],
    queryFn: async () => {
      let q = supabase.from("threads_posts").select(POST_FIELDS).order("posted_at", { ascending: false });
      const start = rangeStart(range);
      if (start) q = q.gte("posted_at", start);
      // Paginate to get all posts (default limit 1000)
      const { data, error } = await q.limit(1000);
      if (error) throw error;
      return (data || []) as unknown as ThreadsPost[];
    },
  });
}

export function useInsightsForReach() {
  return useQuery({
    queryKey: ["threads-insights-all-for-reach"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads_user_insights")
        .select("metric_date, follower_count")
        .order("metric_date", { ascending: true })
        .limit(1000);
      if (error) throw error;
      return data || [];
    },
  });
}
