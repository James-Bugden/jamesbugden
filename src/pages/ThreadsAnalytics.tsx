import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye, Heart, MessageCircle, Repeat2, Users, TrendingUp,
  BarChart3, RefreshCw, Database, ArrowLeft,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { toast } from "sonner";
import ContentAnalysisSections from "@/components/analytics/ContentAnalysisSections";
import PostDetailSections from "@/components/analytics/PostDetailSections";
import TimingSections from "@/components/analytics/TimingSections";
import LinksDemographicsSections from "@/components/analytics/LinksDemographicsSections";

// ── Types ──────────────────────────────────────────────────────────
type DateRange = "7d" | "30d" | "90d" | "all";

// ── Helpers ────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

function pct(n: number): string {
  return (n * 100).toFixed(2) + "%";
}

function daysAgo(d: number): string {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString().split("T")[0];
}

function rangeStart(range: DateRange): string | null {
  if (range === "7d") return daysAgo(7);
  if (range === "30d") return daysAgo(30);
  if (range === "90d") return daysAgo(90);
  return null;
}

// ── Data hooks ─────────────────────────────────────────────────────
function usePostsAggregates(range: DateRange) {
  return useQuery({
    queryKey: ["threads-posts-agg", range],
    queryFn: async () => {
      let q = supabase.from("threads_posts").select("views, likes, replies, reposts, quotes, shares, engagement_rate, virality_rate, conversation_rate, posted_at");
      const start = rangeStart(range);
      if (start) q = q.gte("posted_at", start);
      const { data, error } = await q;
      if (error) throw error;
      const rows = data || [];
      const totalPosts = rows.length;
      const totalViews = rows.reduce((s, r) => s + (r.views || 0), 0);
      const avgEng = rows.length ? rows.reduce((s, r) => s + Number(r.engagement_rate || 0), 0) / rows.length : 0;
      const avgVir = rows.length ? rows.reduce((s, r) => s + Number(r.virality_rate || 0), 0) / rows.length : 0;
      const avgConv = rows.length ? rows.reduce((s, r) => s + Number(r.conversation_rate || 0), 0) / rows.length : 0;
      return { totalPosts, totalViews, avgEng, avgVir, avgConv };
    },
  });
}

function useInsights(range: DateRange) {
  return useQuery({
    queryKey: ["threads-insights", range],
    queryFn: async () => {
      let q = supabase.from("threads_user_insights").select("*").order("metric_date", { ascending: true });
      const start = rangeStart(range);
      if (start) q = q.gte("metric_date", start);
      const { data, error } = await q;
      if (error) throw error;
      return data || [];
    },
  });
}

function useFollowerGrowth() {
  return useQuery({
    queryKey: ["threads-follower-growth"],
    queryFn: async () => {
      const { data: latest } = await supabase
        .from("threads_user_insights")
        .select("follower_count, metric_date")
        .order("metric_date", { ascending: false })
        .limit(1)
        .single();

      const thirtyDaysAgo = daysAgo(30);
      const { data: older } = await supabase
        .from("threads_user_insights")
        .select("follower_count")
        .lte("metric_date", thirtyDaysAgo)
        .order("metric_date", { ascending: false })
        .limit(1)
        .single();

      const current = latest?.follower_count || 0;
      const prev = older?.follower_count || current;
      const diff = current - prev;
      const pctChange = prev > 0 ? diff / prev : 0;
      return { current, diff, pctChange };
    },
  });
}

function useLastSync() {
  return useQuery({
    queryKey: ["threads-last-sync"],
    queryFn: async () => {
      const { data } = await supabase
        .from("threads_posts")
        .select("updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();
      return data?.updated_at || null;
    },
  });
}

function useInsightCount() {
  return useQuery({
    queryKey: ["threads-insight-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("threads_user_insights")
        .select("id", { count: "exact", head: true });
      return count || 0;
    },
  });
}

// ── Sparkline ──────────────────────────────────────────────────────
function Sparkline({ data, dataKey, color = "hsl(var(--primary))" }: { data: any[]; dataKey: string; color?: string }) {
  if (!data.length) return null;
  return (
    <div className="w-[60px] h-[20px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Metric Card ────────────────────────────────────────────────────
function MetricCard({
  icon: Icon, label, value, sub, sparkData, sparkKey, color,
}: {
  icon: any; label: string; value: string; sub?: string; sparkData?: any[]; sparkKey?: string; color?: string;
}) {
  return (
    <Card className="min-w-[150px] flex-shrink-0">
      <CardContent className="p-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Icon className="w-4 h-4 text-muted-foreground" />
          {sparkData && sparkKey && <Sparkline data={sparkData} dataKey={sparkKey} color={color} />}
        </div>
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
        {sub && <span className="text-xs font-medium" style={{ color }}>{sub}</span>}
      </CardContent>
    </Card>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function ThreadsAnalytics() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [range, setRange] = useState<DateRange>("30d");
  const [syncing, setSyncing] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [analyzingImages, setAnalyzingImages] = useState(false);
  const [syncingDemographics, setSyncingDemographics] = useState(false);
  const [taggingContent, setTaggingContent] = useState(false);

  const postsAgg = usePostsAggregates(range);
  const insights = useInsights(range);
  const follower = useFollowerGrowth();
  const lastSync = useLastSync();
  const insightCount = useInsightCount();

  // Admin check
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    supabase.rpc("is_admin", { _user_id: user.id }).then(({ data }) => {
      setIsAdmin(!!data);
      setAdminChecked(true);
    });
  }, [user]);

  if (authLoading || !adminChecked) {
    return (
      <div className="min-h-screen bg-background p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Access denied.</p>
      </div>
    );
  }

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync");
      if (error) throw error;
      toast.success(`Synced ${data?.posts || 0} posts, analyzed ${data?.analyzed || 0} images`);
      // Refetch
      postsAgg.refetch();
      insights.refetch();
      follower.refetch();
      lastSync.refetch();
    } catch (e: any) {
      toast.error(e.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const handleBackfill = async () => {
    setBackfilling(true);
    try {
      let fromDate: string | undefined;
      let totalDays = 0;
      // Process chunks until done
      for (let i = 0; i < 20; i++) {
        const { data, error } = await supabase.functions.invoke("threads-sync", {
          body: { action: "backfill", fromDate },
        });
        if (error) throw error;
        totalDays += data?.daysProcessed || 0;
        if (data?.done) break;
        fromDate = data?.nextFrom;
        if (!fromDate) break;
      }
      toast.success(`Backfill complete — ${totalDays} days processed`);
      insights.refetch();
      insightCount.refetch();
    } catch (e: any) {
      toast.error(e.message || "Backfill failed");
    } finally {
      setBackfilling(false);
    }
  };

  const handleAnalyzeImages = async () => {
    setAnalyzingImages(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync", {
        body: { action: "analyze-images" },
      });
      if (error) throw error;
      toast.success(`Analyzed ${data?.analyzed || 0} images, ${data?.remaining || 0} remaining`);
      postsAgg.refetch();
    } catch (e: any) {
      toast.error(e.message || "Image analysis failed");
    } finally {
      setAnalyzingImages(false);
    }
  };

  const handleSyncDemographics = async () => {
    setSyncingDemographics(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync", {
        body: { action: "demographics" },
      });
      if (error) throw error;
      toast.success(`Demographics synced — ${data?.demographics || 0} entries`);
    } catch (e: any) {
      toast.error(e.message || "Demographics sync failed");
    } finally {
      setSyncingDemographics(false);
    }
  };

  const handleTagContent = async () => {
    setTaggingContent(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync", {
        body: { action: "tag-content" },
      });
      if (error) throw error;
      toast.success(`Tagged ${data?.tagged || 0} posts, ${data?.remaining || 0} remaining`);
      postsAgg.refetch();
    } catch (e: any) {
      toast.error(e.message || "Content tagging failed");
    } finally {
      setTaggingContent(false);
    }
  };

  // Chart data
  const chartData = (insights.data || []).map((row) => ({
    date: row.metric_date,
    views: row.profile_views,
    interactions: (row.total_likes || 0) + (row.total_replies || 0) + (row.total_reposts || 0) + (row.total_quotes || 0),
    followers: row.follower_count,
  }));

  // 7-day rolling average engagement
  const chartWithRolling = chartData.map((row, i) => {
    const window = chartData.slice(Math.max(0, i - 6), i + 1);
    const totalViews = window.reduce((s, w) => s + w.views, 0);
    const totalInteractions = window.reduce((s, w) => s + w.interactions, 0);
    const rollingEng = totalViews > 0 ? (totalInteractions / totalViews) * 100 : 0;
    return { ...row, rollingEng: Math.round(rollingEng * 100) / 100 };
  });

  // Sparkline data (last 30 days from insights)
  const spark30 = (insights.data || []).slice(-30);
  const sparkViews = spark30.map((r) => ({ v: r.profile_views }));
  const sparkFollowers = spark30.map((r) => ({ v: r.follower_count }));

  const ranges: DateRange[] = ["7d", "30d", "90d", "all"];

  return (
    <>
      <Helmet>
        <title>Threads Analytics | James Bugden</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[hsl(var(--cream-header))] border-b px-4 md:px-8 h-14 flex items-center gap-4">
          <button onClick={() => navigate("/admin")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Admin
          </button>
          <span className="font-heading text-sm tracking-widest text-executive-green">THREADS ANALYTICS</span>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 space-y-6">
          {/* Section 1: Overview Cards */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            <MetricCard
              icon={BarChart3}
              label="Total Posts"
              value={postsAgg.data ? fmt(postsAgg.data.totalPosts) : "—"}
            />
            <MetricCard
              icon={Eye}
              label="Total Views"
              value={postsAgg.data ? fmt(postsAgg.data.totalViews) : "—"}
              sparkData={sparkViews}
              sparkKey="v"
              color="hsl(var(--primary))"
            />
            <MetricCard
              icon={Heart}
              label="Avg Engagement"
              value={postsAgg.data ? pct(postsAgg.data.avgEng) : "—"}
            />
            <MetricCard
              icon={Repeat2}
              label="Virality (reposts+quotes/views)"
              value={postsAgg.data ? pct(postsAgg.data.avgVir) : "—"}
            />
            <MetricCard
              icon={MessageCircle}
              label="Conversation (replies/views)"
              value={postsAgg.data ? pct(postsAgg.data.avgConv) : "—"}
            />
            <MetricCard
              icon={Users}
              label="Followers"
              value={follower.data ? fmt(follower.data.current) : "—"}
              sparkData={sparkFollowers}
              sparkKey="v"
              color="#22c55e"
            />
            <MetricCard
              icon={TrendingUp}
              label="Follower Growth (30d)"
              value={follower.data ? (follower.data.diff >= 0 ? "+" : "") + fmt(follower.data.diff) : "—"}
              sub={follower.data ? (follower.data.pctChange >= 0 ? "+" : "") + (follower.data.pctChange * 100).toFixed(1) + "%" : undefined}
              color={follower.data && follower.data.diff >= 0 ? "#22c55e" : "#ef4444"}
            />
          </div>

          {/* Section 2: Date Range */}
          <div className="flex gap-2">
            {ranges.map((r) => (
              <Button
                key={r}
                variant={range === r ? "default" : "outline"}
                size="sm"
                onClick={() => setRange(r)}
              >
                {r === "all" ? "All Time" : r}
              </Button>
            ))}
          </div>

          {/* Section 3: Engagement Trend */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Engagement Trend</h3>
              {insights.isLoading ? (
                <Skeleton className="h-[300px]" />
              ) : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartWithRolling}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="views" name="Profile Views" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      <Line yAxisId="left" type="monotone" dataKey="interactions" name="Interactions" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      <Line yAxisId="right" type="monotone" dataKey="rollingEng" name="7d Avg Eng %" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 4: Follower Growth */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Follower Growth</h3>
              {insights.isLoading ? (
                <Skeleton className="h-[250px]" />
              ) : (
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      />
                      <Area type="monotone" dataKey="followers" name="Followers" stroke="#22c55e" fill="url(#followerGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sections 5-12: Content Analysis */}
          <ContentAnalysisSections range={range} />

          {/* Sections 13-14: Post Details */}
          <PostDetailSections range={range} />

          {/* Sections 15-16: Timing */}
          <TimingSections range={range} />

          {/* Sections 17-18: Links & Demographics */}
          <LinksDemographicsSections />

          {/* Section 19: Sync Status */}
          <div className="flex flex-wrap items-center gap-3 border rounded-lg p-4 bg-muted/30">
            <Database className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last sync:{" "}
              {lastSync.data
                ? new Date(lastSync.data).toLocaleString()
                : "Never"}
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              {(insightCount.data || 0) < 30 && (
                <Button variant="outline" size="sm" onClick={handleBackfill} disabled={backfilling}>
                  {backfilling && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                  Backfill
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSyncDemographics} disabled={syncingDemographics}>
                {syncingDemographics && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                Demographics
              </Button>
              <Button variant="outline" size="sm" onClick={handleAnalyzeImages} disabled={analyzingImages}>
                {analyzingImages && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                Analyze Images
              </Button>
              <Button variant="outline" size="sm" onClick={handleTagContent} disabled={taggingContent}>
                {taggingContent && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                Tag Content
              </Button>
              <Button size="sm" onClick={handleSync} disabled={syncing}>
                {syncing ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                Sync Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
