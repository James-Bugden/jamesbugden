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
  Eye, Heart, TrendingUp,
  BarChart3, RefreshCw, ArrowLeft, Settings,
  LayoutDashboard, FileText, PieChart, ChevronLeft, ChevronRight, Users,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, ComposedChart, Cell, Bar,
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
function KpiCard({ label, value, delta, icon: Icon, iconColor }: {
  label: string; value: string; delta?: string; icon: any; iconColor?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: (iconColor || "#3b82f6") + "15" }}>
          <Icon className="w-4 h-4" style={{ color: iconColor || "#3b82f6" }} />
        </div>
      </div>
      <span className="text-3xl font-bold text-gray-900 tracking-tight">{value}</span>
      {delta && (
        <span className={`text-xs font-semibold inline-flex items-center gap-1 ${
          delta.startsWith("+") || delta === "Great" ? "text-emerald-600"
          : delta.startsWith("-") || delta === "Low" ? "text-red-500"
          : "text-amber-500"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            delta.startsWith("+") || delta === "Great" ? "bg-emerald-500"
            : delta.startsWith("-") || delta === "Low" ? "bg-red-500"
            : "bg-amber-500"
          }`} />
          {delta}
        </span>
      )}
    </div>
  );
}

// ── Sidebar Nav ────────────────────────────────────────────────────
const NAV_ITEMS: { key: Section; label: string; icon: any }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "content", label: "Content", icon: PieChart },
  { key: "posts", label: "Posts", icon: FileText },
  { key: "audience", label: "Audience", icon: Users },
  { key: "settings", label: "Settings", icon: Settings },
];

// ── Shared chart config ────────────────────────────────────────────
const tipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const gridStroke = "#f3f4f6";
const axisTickStyle = { fontSize: 11, fill: "#9ca3af" };

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
      <div className="min-h-screen bg-[#f8f9fb] p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
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

  const engValue = postsAgg.data?.avgEng || 0;
  const engLabel = engValue >= 0.015 ? "Great" : engValue >= 0.008 ? "Average" : "Low";

  return (
    <>
      <Helmet>
        <title>Threads Analytics</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-[#f8f9fb] flex">
        {/* ─── SIDEBAR ──────────────────────────────────────── */}
        <aside className={`${sidebarOpen ? "w-56" : "w-14"} hidden md:flex flex-col border-r border-gray-200/80 bg-white shrink-0 transition-all duration-200`}>
          <div className="h-14 flex items-center px-4 border-b border-gray-100 gap-2">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 tracking-tight">Analytics</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
          <nav className="flex-1 py-3 space-y-1 px-2">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === key
                    ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${activeSection === key ? "text-blue-500" : ""}`} />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors w-full px-2 py-1.5 rounded-md hover:bg-gray-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {sidebarOpen && "Back to Admin"}
            </button>
          </div>
        </aside>

        {/* ─── MAIN ─────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-14 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Mobile nav */}
              <div className="flex md:hidden gap-1 overflow-x-auto">
                {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                      activeSection === key ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-400"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
              <h1 className="text-base font-semibold text-gray-900 hidden md:block capitalize">{activeSection}</h1>
            </div>
            <div className="flex items-center gap-3">
              {lastSync.data && (
                <span className="text-[11px] text-gray-400 hidden sm:block">
                  Synced {new Date(lastSync.data).toLocaleDateString()}
                </span>
              )}
              <Select value={range} onValueChange={(v) => setRange(v as DateRange)}>
                <SelectTrigger className="w-[140px] h-8 text-xs bg-gray-50 border-gray-200 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleSync} disabled={syncing} className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">
                {syncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <RefreshCw className="w-3.5 h-3.5 mr-1.5" />}
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
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <KpiCard label="Total Posts" icon={FileText} iconColor="#6366f1"
                      value={postsAgg.data ? fmt(postsAgg.data.totalPosts) : "—"} />
                    <KpiCard label="Total Views" icon={Eye} iconColor="#3b82f6"
                      value={postsAgg.data ? fmt(postsAgg.data.totalViews) : "—"} />
                    <KpiCard label="Engagement" icon={Heart} iconColor={engValue >= 0.015 ? "#22c55e" : engValue >= 0.008 ? "#f59e0b" : "#ef4444"}
                      value={postsAgg.data ? pct(postsAgg.data.avgEng) : "—"}
                      delta={engLabel} />
                    <KpiCard label="Avg Views/Post" icon={BarChart3} iconColor="#8b5cf6"
                      value={postsAgg.data ? fmt(Math.round(postsAgg.data.avgViews)) : "—"} />
                    <KpiCard label="Followers Gained" icon={Users} iconColor="#22c55e"
                      value={followerDeltas.data ? (followerDeltas.data.netGain >= 0 ? "+" : "") + fmt(followerDeltas.data.netGain) : "—"}
                      delta={followerDeltas.data && followerDeltas.data.netGain > 0 ? "Growing" : followerDeltas.data && followerDeltas.data.netGain < 0 ? "Declining" : undefined} />
                  </div>

                  {/* What to Post Next */}
                  {allPosts.length > 0 && <ContentStrategySection posts={allPosts} />}

                  {/* Charts 2-col grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Engagement Trend */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Engagement Trend</h3>
                      <p className="text-xs text-gray-400 mb-5">Daily engagement rate. Dashed line = your average.</p>
                      {postTrend.isLoading ? (
                        <Skeleton className="h-[280px] rounded-lg" />
                      ) : (
                        <div className="h-[280px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <defs>
                                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                              <XAxis dataKey="date" tick={axisTickStyle} tickFormatter={(v) => v.slice(5)} axisLine={false} tickLine={false} />
                              <YAxis tick={axisTickStyle} tickFormatter={v => v + "%"} axisLine={false} tickLine={false} width={45} />
                              <RechartsTooltip contentStyle={tipStyle}
                                formatter={(v: number, name: string) => [v.toFixed(2) + "%", "Engagement"]}
                                labelFormatter={(l) => `Date: ${l}`} />
                              <ReferenceLine y={avgEngPct} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5} />
                              <Area type="monotone" dataKey="engPct" name="Engagement %" stroke="#3b82f6" fill="url(#engGrad)" strokeWidth={2.5} dot={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>

                    {/* Follower Growth */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Follower Growth</h3>
                      <p className="text-xs text-gray-400 mb-5">
                        {follower.data ? `${fmt(follower.data.current)} followers.` : ""}
                        {(() => {
                          const deltas = followerDeltas.data?.deltas || [];
                          const hasRealChanges = deltas.some(d => d.delta !== 0);
                          if (hasRealChanges) {
                            const net = followerDeltas.data!.netGain;
                            return ` Net ${net >= 0 ? "+" : ""}${net} in this period.`;
                          }
                          if (deltas.length > 0) return " Tracking started — growth will appear after daily syncs.";
                          return " Run Backfill to start tracking.";
                        })()}
                      </p>
                      {followerHistory.isLoading ? (
                        <Skeleton className="h-[280px] rounded-lg" />
                      ) : (() => {
                        const deltas = followerDeltas.data?.deltas || [];
                        const hasRealChanges = deltas.some(d => d.delta !== 0);
                        const realDeltas = hasRealChanges ? deltas : [];

                        if (realDeltas.length > 1) {
                          return (
                            <div className="h-[280px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={realDeltas}>
                                  <defs>
                                    <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                                  <XAxis dataKey="date" tick={axisTickStyle} tickFormatter={(v) => v.slice(5)} axisLine={false} tickLine={false} />
                                  <YAxis yAxisId="left" tick={axisTickStyle} domain={["dataMin - 100", "dataMax + 100"]} axisLine={false} tickLine={false} />
                                  <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} />
                                  <RechartsTooltip contentStyle={tipStyle}
                                    formatter={(v: number, name: string) => [name === "Daily Change" ? (v >= 0 ? "+" : "") + v : fmt(v), name]} />
                                  <Area yAxisId="left" type="monotone" dataKey="followers" name="Followers" stroke="#22c55e" fill="url(#followerGrad)" strokeWidth={2.5} />
                                  <Bar yAxisId="right" dataKey="delta" name="Daily Change" radius={[3, 3, 0, 0]}>
                                    {realDeltas.map((d, i) => (
                                      <Cell key={i} fill={d.delta >= 0 ? "#22c55e" : "#ef4444"} opacity={0.7} />
                                    ))}
                                  </Bar>
                                  <ReferenceLine yAxisId="right" y={0} stroke="#e5e7eb" />
                                </ComposedChart>
                              </ResponsiveContainer>
                            </div>
                          );
                        }

                        return (
                          <div className="flex flex-col items-center justify-center py-14">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                              <Users className="w-7 h-7 text-emerald-500" />
                            </div>
                            <div className="text-4xl font-bold text-gray-900 mb-1">
                              {follower.data ? fmt(follower.data.current) : "—"}
                            </div>
                            <p className="text-sm text-gray-500">Current followers</p>
                            <p className="text-xs text-gray-400 mt-4 max-w-[240px] text-center leading-relaxed">
                              Daily syncs capture follower changes. The chart appears once real growth data is recorded.
                            </p>
                            <button onClick={() => setActiveSection("settings")} className="text-xs text-blue-500 hover:text-blue-600 font-medium mt-3 transition-colors">
                              Go to Settings → Sync
                            </button>
                          </div>
                        );
                      })()}
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
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Data Management</h3>
                    <p className="text-sm text-gray-500">
                      Last synced: {lastSync.data ? new Date(lastSync.data).toLocaleString() : "Never"}
                    </p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { label: "Sync Now", desc: "Fetch latest posts and metrics from the API.", handler: handleSync, loading: syncing, color: "#3b82f6" },
                      { label: "Refresh All Insights", desc: "Update views/likes for all existing posts.", handler: handleRefreshAll, loading: refreshingAll, color: "#8b5cf6" },
                      { label: "Backfill History", desc: "Fetch up to 30 days of follower/engagement history.", handler: handleBackfill, loading: backfilling, color: "#f59e0b" },
                      { label: "Sync Demographics", desc: "Fetch audience breakdown (country, age, gender).", handler: handleSyncDemographics, loading: syncingDemographics, color: "#22c55e" },
                      { label: "Analyze Images", desc: "Use AI to describe images and add tags.", handler: handleAnalyzeImages, loading: analyzingImages, color: "#ec4899" },
                      { label: "Tag Content", desc: "Use AI to categorize posts by topic, tone, format.", handler: handleTagContent, loading: taggingContent, color: "#06b6d4" },
                    ].map((action) => (
                      <div key={action.label} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: action.color }} />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{action.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={action.handler}
                          disabled={action.loading}
                          className="shrink-0 h-8 px-4 text-xs border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          {action.loading && <RefreshCw className="w-3 h-3 animate-spin mr-1.5" />}
                          {action.loading ? "Running…" : "Run"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
