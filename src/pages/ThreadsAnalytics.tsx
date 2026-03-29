import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { usePostDerivedTrend, useAllPosts, useFollowerDeltas } from "@/components/analytics/analyticsShared";
import { ContentStrategySection } from "@/components/analytics/ContentAnalysisSections";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Eye, Heart, MessageCircle, Users, TrendingUp,
  BarChart3, RefreshCw, Database, ArrowLeft, ChevronDown, Info,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { toast } from "sonner";
import ContentAnalysisSections from "@/components/analytics/ContentAnalysisSections";
import PostDetailSections from "@/components/analytics/PostDetailSections";
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
      const avgViews = rows.length ? totalViews / rows.length : 0;
      return { totalPosts, totalViews, avgEng, avgViews };
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
      const current = latest?.follower_count || 0;
      return { current };
    },
  });
}

function useFollowerHistory() {
  return useQuery({
    queryKey: ["threads-follower-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads_user_insights")
        .select("metric_date, follower_count")
        .order("metric_date", { ascending: true })
        .limit(1000);
      if (error) throw error;
      return (data || []).filter(r => r.follower_count && r.follower_count > 0).map(r => ({
        date: r.metric_date,
        followers: r.follower_count!,
      }));
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

// ── Section Heading ────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pt-4">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">{children}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ── Metric Card ────────────────────────────────────────────────────
function MetricCard({ icon: Icon, label, value, tooltip, color }: {
  icon: any; label: string; value: string; tooltip: string; color?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardContent className="p-4 flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <Info className="w-3 h-3 text-muted-foreground/50" />
              </div>
              <span className="text-2xl font-bold tracking-tight" style={color ? { color } : undefined}>{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[200px]">
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);

  const postsAgg = usePostsAggregates(range);
  const postTrend = usePostDerivedTrend(range);
  const follower = useFollowerGrowth();
  const followerHistory = useFollowerHistory();
  const lastSync = useLastSync();
  const allPostsQ = useAllPosts(range);
  const allPosts = allPostsQ.data || [];

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
      postsAgg.refetch(); postTrend.refetch(); follower.refetch(); lastSync.refetch();
    } catch (e: any) { toast.error(e.message || "Sync failed"); }
    finally { setSyncing(false); }
  };

  const handleBackfill = async () => {
    setBackfilling(true);
    try {
      let fromDate: string | undefined;
      let totalDays = 0;
      for (let i = 0; i < 20; i++) {
        const { data, error } = await supabase.functions.invoke("threads-sync", { body: { action: "backfill", fromDate } });
        if (error) throw error;
        totalDays += data?.daysProcessed || 0;
        if (data?.done) break;
        fromDate = data?.nextFrom;
        if (!fromDate) break;
      }
      toast.success(`Backfill complete — ${totalDays} days processed`);
      postTrend.refetch();
    } catch (e: any) { toast.error(e.message || "Backfill failed"); }
    finally { setBackfilling(false); }
  };

  const handleAnalyzeImages = async () => {
    setAnalyzingImages(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync", { body: { action: "analyze-images" } });
      if (error) throw error;
      toast.success(`Analyzed ${data?.analyzed || 0} images, ${data?.remaining || 0} remaining`);
    } catch (e: any) { toast.error(e.message || "Image analysis failed"); }
    finally { setAnalyzingImages(false); }
  };

  const handleSyncDemographics = async () => {
    setSyncingDemographics(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync", { body: { action: "demographics" } });
      if (error) throw error;
      toast.success(`Demographics synced — ${data?.demographics || 0} entries`);
    } catch (e: any) { toast.error(e.message || "Demographics sync failed"); }
    finally { setSyncingDemographics(false); }
  };

  const handleTagContent = async () => {
    setTaggingContent(true);
    try {
      const { data, error } = await supabase.functions.invoke("threads-sync", { body: { action: "tag-content" } });
      if (error) throw error;
      toast.success(`Tagged ${data?.tagged || 0} posts, ${data?.remaining || 0} remaining`);
    } catch (e: any) { toast.error(e.message || "Content tagging failed"); }
    finally { setTaggingContent(false); }
  };

  const handleRefreshAll = async () => {
    setRefreshingAll(true);
    try {
      let totalRefreshed = 0;
      for (let i = 0; i < 10; i++) {
        const { data, error } = await supabase.functions.invoke("threads-sync", { body: { action: "refresh-all-insights" } });
        if (error) throw error;
        totalRefreshed += data?.refreshed || 0;
        if ((data?.remaining || 0) === 0) break;
        toast.info(`Refreshed ${totalRefreshed} posts, ${data?.remaining} remaining...`);
      }
      toast.success(`Refreshed insights for ${totalRefreshed} posts`);
      postsAgg.refetch(); postTrend.refetch();
    } catch (e: any) { toast.error(e.message || "Refresh failed"); }
    finally { setRefreshingAll(false); }
  };

  // Chart data — single Y-axis, views + avg reference line
  const trendData = postTrend.data || [];
  const avgViews = trendData.length ? trendData.reduce((s, d) => s + d.views, 0) / trendData.length : 0;
  const chartData = trendData.map((row) => ({
    date: row.date,
    views: row.views,
    engPct: +(row.engagementRate * 100).toFixed(3),
  }));
  const avgEngPct = trendData.length ? +(trendData.reduce((s, d) => s + d.engagementRate, 0) / trendData.length * 100).toFixed(3) : 0;

  const followerData = followerHistory.data || [];
  const ranges: DateRange[] = ["7d", "30d", "90d", "all"];

  // Engagement rate color indicator
  const engValue = postsAgg.data?.avgEng || 0;
  const engColor = engValue >= 0.015 ? "#22c55e" : engValue >= 0.008 ? "#f59e0b" : "#ef4444";

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

          {/* ─── OVERVIEW ─────────────────────────────────────── */}
          <SectionHeading>Overview</SectionHeading>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard icon={BarChart3} label="Total Posts" 
              value={postsAgg.data ? fmt(postsAgg.data.totalPosts) : "—"}
              tooltip="Total number of posts in the selected time period." />
            <MetricCard icon={Eye} label="Total Views" 
              value={postsAgg.data ? fmt(postsAgg.data.totalViews) : "—"}
              tooltip="Combined views across all posts in this period." />
            <MetricCard icon={TrendingUp} label="Engagement Rate" 
              value={postsAgg.data ? pct(postsAgg.data.avgEng) : "—"}
              tooltip="Likes + replies + reposts + quotes divided by views. Above 1.5% is great, 0.8-1.5% is average."
              color={engColor} />
            <MetricCard icon={Eye} label="Avg Views/Post" 
              value={postsAgg.data ? fmt(Math.round(postsAgg.data.avgViews)) : "—"}
              tooltip="Average number of views per post. Higher means your content is reaching more people." />
          </div>

          {/* Date Range */}
          <div className="flex gap-2">
            {ranges.map((r) => (
              <Button key={r} variant={range === r ? "default" : "outline"} size="sm" onClick={() => setRange(r)}>
                {r === "all" ? "All Time" : r}
              </Button>
            ))}
          </div>

          {/* What to Post Next — top priority */}
          {allPosts.length > 0 && <ContentStrategySection posts={allPosts} />}

          {/* Engagement Trend — single Y-axis */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Engagement Trend</h3>
              <p className="text-xs text-muted-foreground mb-4">Daily engagement rate (%). The dashed line is your average.</p>
              {postTrend.isLoading ? (
                <Skeleton className="h-[300px]" />
              ) : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v + "%"} />
                      <RechartsTooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} 
                        formatter={(v: number, name: string) => [v.toFixed(3) + "%", name]} />
                      <ReferenceLine y={avgEngPct} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5}
                        label={{ value: `Avg ${avgEngPct.toFixed(2)}%`, position: "right", fontSize: 10, fill: "#f59e0b" }} />
                      <Line type="monotone" dataKey="engPct" name="Engagement %" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Follower Growth Chart */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Follower Growth</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {follower.data ? `Currently ${fmt(follower.data.current)} followers.` : ""} 
                {followerData.length <= 1 ? " Data accumulates with daily syncs and backfills." : ""}
              </p>
              {followerHistory.isLoading ? (
                <Skeleton className="h-[250px]" />
              ) : followerData.length > 1 ? (
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={followerData}>
                      <defs>
                        <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                      <YAxis tick={{ fontSize: 11 }} domain={["dataMin - 100", "dataMax + 100"]} />
                      <RechartsTooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Area type="monotone" dataKey="followers" name="Followers" stroke="#22c55e" fill="url(#followerGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No follower history yet.</p>
                  <p className="text-xs mt-1">Click <strong>Backfill</strong> below to start tracking.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ─── CONTENT STRATEGY ─────────────────────────────── */}
          <SectionHeading>Content Strategy</SectionHeading>
          <ContentAnalysisSections range={range} />

          {/* ─── POST EXPLORER ────────────────────────────────── */}
          <SectionHeading>Post Explorer</SectionHeading>
          <PostDetailSections range={range} />

          {/* ─── AUDIENCE ─────────────────────────────────────── */}
          <SectionHeading>Audience & Links</SectionHeading>
          <LinksDemographicsSections />

          {/* ─── DATA MANAGEMENT ──────────────────────────────── */}
          <SectionHeading>Data Management</SectionHeading>
          <Collapsible open={syncOpen} onOpenChange={setSyncOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors rounded-lg">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1">
                    Last sync: {lastSync.data ? new Date(lastSync.data).toLocaleString() : "Never"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${syncOpen ? "rotate-180" : ""}`} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={handleSync} disabled={syncing}>
                    {syncing ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRefreshAll} disabled={refreshingAll}>
                    {refreshingAll && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                    Refresh All Insights
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBackfill} disabled={backfilling}>
                    {backfilling && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                    Backfill
                  </Button>
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
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </>
  );
}
