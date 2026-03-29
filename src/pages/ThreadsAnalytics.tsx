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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Eye, Heart, MessageCircle, Users, TrendingUp,
  BarChart3, RefreshCw, Database, ArrowLeft, Settings,
  LayoutDashboard, FileText, PieChart, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { toast } from "sonner";
import ContentAnalysisSections from "@/components/analytics/ContentAnalysisSections";
import PostDetailSections from "@/components/analytics/PostDetailSections";
import LinksDemographicsSections from "@/components/analytics/LinksDemographicsSections";

// ── Types ──────────────────────────────────────────────────────────
type DateRange = "7d" | "30d" | "90d" | "all";
type Section = "overview" | "content" | "posts" | "audience" | "settings";

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

// ── KPI Card ───────────────────────────────────────────────────────
function KpiCard({ label, value, delta, color }: {
  label: string; value: string; delta?: string; color?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-semibold text-gray-900" style={color ? { color } : undefined}>{value}</span>
      {delta && (
        <span className={`text-xs font-medium ${delta.startsWith("+") ? "text-green-600" : delta.startsWith("-") ? "text-red-500" : "text-gray-500"}`}>
          {delta}
        </span>
      )}
    </div>
  );
}

// ── Sidebar Nav Item ───────────────────────────────────────────────
const NAV_ITEMS: { key: Section; label: string; icon: any }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "content", label: "Content", icon: PieChart },
  { key: "posts", label: "Posts", icon: FileText },
  { key: "audience", label: "Audience", icon: Users },
  { key: "settings", label: "Settings", icon: Settings },
];

// ── Main Component ─────────────────────────────────────────────────
export default function ThreadsAnalytics() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [range, setRange] = useState<DateRange>("30d");
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [analyzingImages, setAnalyzingImages] = useState(false);
  const [syncingDemographics, setSyncingDemographics] = useState(false);
  const [taggingContent, setTaggingContent] = useState(false);
  const [refreshingAll, setRefreshingAll] = useState(false);

  const postsAgg = usePostsAggregates(range);
  const postTrend = usePostDerivedTrend(range);
  const follower = useFollowerGrowth();
  const followerHistory = useFollowerHistory();
  const lastSync = useLastSync();
  const allPostsQ = useAllPosts(range);
  const allPosts = allPostsQ.data || [];
  const followerDeltas = useFollowerDeltas(range);

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
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Access denied.</p>
      </div>
    );
  }

  // ── Action handlers ────────────────────────────────────────────
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

  // ── Chart data ─────────────────────────────────────────────────
  const trendData = postTrend.data || [];
  const chartData = trendData.map((row) => ({
    date: row.date,
    views: row.views,
    engPct: +(row.engagementRate * 100).toFixed(3),
  }));
  const avgEngPct = trendData.length ? +(trendData.reduce((s, d) => s + d.engagementRate, 0) / trendData.length * 100).toFixed(3) : 0;
  const followerData = followerHistory.data || [];

  const engValue = postsAgg.data?.avgEng || 0;
  const engColor = engValue >= 0.015 ? "#22c55e" : engValue >= 0.008 ? "#f59e0b" : "#ef4444";

  const tipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 };

  // ── Date range label ───────────────────────────────────────────
  const rangeLabel = (r: DateRange) => r === "7d" ? "Last 7 days" : r === "30d" ? "Last 30 days" : r === "90d" ? "Last 90 days" : "All time";

  return (
    <>
      <Helmet>
        <title>Threads Analytics</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex">
        {/* ─── SIDEBAR ──────────────────────────────────────── */}
        <aside className={`${sidebarOpen ? "w-56" : "w-14"} hidden md:flex flex-col border-r border-gray-200 bg-white shrink-0 transition-all duration-200`}>
          <div className="h-14 flex items-center px-4 border-b border-gray-200 gap-2">
            {sidebarOpen && (
              <span className="text-sm font-semibold text-gray-900 tracking-tight truncate">Analytics</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto p-1 rounded hover:bg-gray-100 text-gray-500"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
          <nav className="flex-1 py-2 space-y-0.5 px-2">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === key
                    ? "bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              {sidebarOpen && "Back to Admin"}
            </button>
          </div>
        </aside>

        {/* ─── MAIN ─────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0">
            <div className="flex items-center gap-3">
              {/* Mobile nav */}
              <div className="flex md:hidden gap-1 overflow-x-auto">
                {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors ${
                      activeSection === key ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-500"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
              <h1 className="text-sm font-medium text-gray-900 hidden md:block capitalize">{activeSection}</h1>
            </div>
            <div className="flex items-center gap-3">
              {lastSync.data && (
                <span className="text-[11px] text-gray-400 hidden sm:block">
                  Synced {new Date(lastSync.data).toLocaleDateString()}
                </span>
              )}
              <Select value={range} onValueChange={(v) => setRange(v as DateRange)}>
                <SelectTrigger className="w-[140px] h-8 text-xs bg-white border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleSync} disabled={syncing} className="h-8 text-xs bg-blue-500 hover:bg-blue-600 text-white">
                {syncing ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                Sync
              </Button>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-[1200px] mx-auto space-y-6">

              {/* ─── OVERVIEW ─────────────────────────────────── */}
              {activeSection === "overview" && (
                <>
                  {/* KPI Row */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <KpiCard
                      label="Total Posts"
                      value={postsAgg.data ? fmt(postsAgg.data.totalPosts) : "—"}
                    />
                    <KpiCard
                      label="Total Views"
                      value={postsAgg.data ? fmt(postsAgg.data.totalViews) : "—"}
                    />
                    <KpiCard
                      label="Engagement"
                      value={postsAgg.data ? pct(postsAgg.data.avgEng) : "—"}
                      color={engColor}
                      delta={engValue >= 0.015 ? "Great" : engValue >= 0.008 ? "Average" : "Low"}
                    />
                    <KpiCard
                      label="Avg Views/Post"
                      value={postsAgg.data ? fmt(Math.round(postsAgg.data.avgViews)) : "—"}
                    />
                    <KpiCard
                      label="Followers Gained"
                      value={followerDeltas.data ? (followerDeltas.data.netGain >= 0 ? "+" : "") + fmt(followerDeltas.data.netGain) : "—"}
                      color={followerDeltas.data && followerDeltas.data.netGain > 0 ? "#22c55e" : followerDeltas.data && followerDeltas.data.netGain < 0 ? "#ef4444" : undefined}
                    />
                  </div>

                  {/* What to Post Next */}
                  {allPosts.length > 0 && <ContentStrategySection posts={allPosts} />}

                  {/* Charts 2-col grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Engagement Trend */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">Engagement Trend</h3>
                      <p className="text-xs text-gray-500 mb-4">Daily engagement rate (%). Dashed line = your average.</p>
                      {postTrend.isLoading ? (
                        <Skeleton className="h-[280px]" />
                      ) : (
                        <div className="h-[280px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={(v) => v.slice(5)} />
                              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={v => v + "%"} />
                              <RechartsTooltip contentStyle={tipStyle}
                                formatter={(v: number, name: string) => [v.toFixed(3) + "%", name]} />
                              <ReferenceLine y={avgEngPct} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5}
                                label={{ value: `Avg ${avgEngPct.toFixed(2)}%`, position: "right", fontSize: 10, fill: "#f59e0b" }} />
                              <Line type="monotone" dataKey="engPct" name="Engagement %" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>

                    {/* Follower Growth */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">Follower Growth</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        {follower.data ? `${fmt(follower.data.current)} followers.` : ""}
                        {followerDeltas.data && followerDeltas.data.deltas.length > 0
                          ? ` Net ${followerDeltas.data.netGain >= 0 ? "+" : ""}${followerDeltas.data.netGain} in this period.`
                          : " Run Backfill to start tracking."}
                      </p>
                      {followerHistory.isLoading ? (
                        <Skeleton className="h-[280px]" />
                      ) : followerDeltas.data && followerDeltas.data.deltas.length > 1 ? (
                        <div className="h-[280px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={followerDeltas.data.deltas}>
                              <defs>
                                <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={(v) => v.slice(5)} />
                              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "#9ca3af" }} domain={["dataMin - 100", "dataMax + 100"]} />
                              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "#9ca3af" }} />
                              <RechartsTooltip contentStyle={tipStyle}
                                formatter={(v: number, name: string) => [name === "Daily Change" ? (v >= 0 ? "+" : "") + v : fmt(v), name]} />
                              <Area yAxisId="left" type="monotone" dataKey="followers" name="Followers" stroke="#22c55e" fill="url(#followerGrad)" strokeWidth={2} />
                              <Bar yAxisId="right" dataKey="delta" name="Daily Change" radius={[2, 2, 0, 0]}>
                                {followerDeltas.data.deltas.map((d, i) => (
                                  <Cell key={i} fill={d.delta >= 0 ? "#22c55e" : "#ef4444"} opacity={0.6} />
                                ))}
                              </Bar>
                              <ReferenceLine yAxisId="right" y={0} stroke="#e5e7eb" />
                            </ComposedChart>
                          </ResponsiveContainer>
                        </div>
                      ) : followerData.length > 1 ? (
                        <div className="h-[280px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={followerData}>
                              <defs>
                                <linearGradient id="followerGrad2" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={(v) => v.slice(5)} />
                              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} domain={["dataMin - 100", "dataMax + 100"]} />
                              <RechartsTooltip contentStyle={tipStyle} />
                              <Area type="monotone" dataKey="followers" name="Followers" stroke="#22c55e" fill="url(#followerGrad2)" strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-400">
                          <p className="text-sm">No follower history yet.</p>
                          <p className="text-xs mt-1">Go to <button onClick={() => setActiveSection("settings")} className="text-blue-500 underline">Settings</button> and run Backfill.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ─── CONTENT ──────────────────────────────────── */}
              {activeSection === "content" && (
                <ContentAnalysisSections range={range} />
              )}

              {/* ─── POSTS ────────────────────────────────────── */}
              {activeSection === "posts" && (
                <PostDetailSections range={range} />
              )}

              {/* ─── AUDIENCE ─────────────────────────────────── */}
              {activeSection === "audience" && (
                <LinksDemographicsSections />
              )}

              {/* ─── SETTINGS ─────────────────────────────────── */}
              {activeSection === "settings" && (
                <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
                  <div className="p-5">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Data Management</h3>
                    <p className="text-xs text-gray-500">
                      Last synced: {lastSync.data ? new Date(lastSync.data).toLocaleString() : "Never"}
                    </p>
                  </div>
                  {[
                    { label: "Sync Now", desc: "Fetch latest posts and metrics from the API.", handler: handleSync, loading: syncing },
                    { label: "Refresh All Insights", desc: "Update views/likes for all existing posts (may take a minute).", handler: handleRefreshAll, loading: refreshingAll },
                    { label: "Backfill History", desc: "Fetch up to 30 days of follower/engagement history.", handler: handleBackfill, loading: backfilling },
                    { label: "Sync Demographics", desc: "Fetch audience breakdown (country, age, gender).", handler: handleSyncDemographics, loading: syncingDemographics },
                    { label: "Analyze Images", desc: "Use AI to describe images and add tags.", handler: handleAnalyzeImages, loading: analyzingImages },
                    { label: "Tag Content", desc: "Use AI to categorize posts by topic, tone, format.", handler: handleTagContent, loading: taggingContent },
                  ].map((action) => (
                    <div key={action.label} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{action.label}</p>
                        <p className="text-xs text-gray-500">{action.desc}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={action.handler}
                        disabled={action.loading}
                        className="shrink-0 h-8 text-xs border-gray-200"
                      >
                        {action.loading && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                        Run
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
