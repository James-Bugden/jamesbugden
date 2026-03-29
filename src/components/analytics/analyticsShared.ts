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
  content_topic: string | null;
  content_format: string | null;
  content_tone: string | null;
  content_cta: string | null;
  content_audience: string | null;
  content_tagged_at: string | null;
};

const POST_FIELDS = "id, media_id, text_content, media_type, permalink, shortcode, is_quote_post, posted_at, media_url, thumbnail_url, views, likes, replies, reposts, quotes, shares, image_description, image_tags, image_analyzed_at, text_length, detected_language, hashtag, engagement_rate, virality_rate, conversation_rate, content_topic, content_format, content_tone, content_cta, content_audience, content_tagged_at";

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

export type FollowerDelta = {
  date: string;
  followers: number;
  delta: number;
};

export function useFollowerDeltas(range: DateRange) {
  return useQuery({
    queryKey: ["threads-follower-deltas", range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads_user_insights")
        .select("metric_date, follower_count")
        .order("metric_date", { ascending: true })
        .limit(1000);
      if (error) throw error;
      const rows = (data || []).filter(r => r.follower_count && r.follower_count > 0);
      if (rows.length < 2) return { deltas: [] as FollowerDelta[], netGain: 0, current: rows[rows.length - 1]?.follower_count || 0 };

      const start = rangeStart(range);
      const deltas: FollowerDelta[] = [];
      for (let i = 1; i < rows.length; i++) {
        const d: FollowerDelta = {
          date: rows[i].metric_date,
          followers: rows[i].follower_count!,
          delta: rows[i].follower_count! - rows[i - 1].follower_count!,
        };
        if (!start || d.date >= start) deltas.push(d);
      }
      const netGain = deltas.reduce((s, d) => s + d.delta, 0);
      return { deltas, netGain, current: rows[rows.length - 1].follower_count! };
    },
  });
}

export type PostDerivedDay = {
  date: string;
  views: number;
  likes: number;
  replies: number;
  reposts: number;
  quotes: number;
  shares: number;
  posts: number;
  engagementRate: number;
};

export function usePostDerivedTrend(range: DateRange) {
  return useQuery({
    queryKey: ["threads-post-derived-trend", range],
    queryFn: async () => {
      let q = supabase
        .from("threads_posts")
        .select("posted_at, views, likes, replies, reposts, quotes, shares, engagement_rate")
        .order("posted_at", { ascending: true });
      const start = rangeStart(range);
      if (start) q = q.gte("posted_at", start);
      const { data, error } = await q.limit(1000);
      if (error) throw error;

      const byDate: Record<string, { views: number; likes: number; replies: number; reposts: number; quotes: number; shares: number; engSum: number; count: number }> = {};
      for (const row of data || []) {
        if (!row.posted_at) continue;
        const date = row.posted_at.split("T")[0];
        if (!byDate[date]) byDate[date] = { views: 0, likes: 0, replies: 0, reposts: 0, quotes: 0, shares: 0, engSum: 0, count: 0 };
        const b = byDate[date];
        b.views += row.views || 0;
        b.likes += row.likes || 0;
        b.replies += row.replies || 0;
        b.reposts += row.reposts || 0;
        b.quotes += row.quotes || 0;
        b.shares += row.shares || 0;
        b.engSum += Number(row.engagement_rate || 0);
        b.count++;
      }

      return Object.entries(byDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, b]): PostDerivedDay => ({
          date,
          views: b.views,
          likes: b.likes,
          replies: b.replies,
          reposts: b.reposts,
          quotes: b.quotes,
          shares: b.shares,
          posts: b.count,
          engagementRate: b.count > 0 ? b.engSum / b.count : 0,
        }));
    },
  });
}
