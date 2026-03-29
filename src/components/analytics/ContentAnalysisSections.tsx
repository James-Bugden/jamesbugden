import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ReferenceLine, Cell,
} from "recharts";
import { Image as ImageIcon, Type, Video, Layers, Lightbulb, Clock, Hash, TrendingUp, Trophy, Eye, Heart, Users } from "lucide-react";
import { type DateRange, type ThreadsPost, type FollowerDelta, useAllPosts, useFollowerDeltas, fmt, pct } from "./analyticsShared";
import { Skeleton } from "@/components/ui/skeleton";

// ── tooltip style ──────────────────────────────────────────────────
const tipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 };

// ── helpers ────────────────────────────────────────────────────────
function avg(arr: number[]) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }

const MEDIA_ICONS: Record<string, any> = { TEXT_POST: Type, IMAGE: ImageIcon, CAROUSEL_ALBUM: Layers, VIDEO: Video };
const MEDIA_LABELS: Record<string, string> = { TEXT_POST: "Text", IMAGE: "Image", CAROUSEL_ALBUM: "Carousel", VIDEO: "Video" };

// ── Content Strategy Section (exported separately for reuse) ──────
export function ContentStrategySection({ posts }: { posts: ThreadsPost[] }) {
  const overallAvgEng = useMemo(() => avg(posts.map(p => Number(p.engagement_rate))), [posts]);

  const recommendations = useMemo(() => {
    if (!posts.length) return [];
    const recs: { priority: number; icon: React.ReactNode; title: string; detail: string }[] = [];
    let priority = 1;

    const mediaMap: Record<string, number[]> = {};
    for (const p of posts) {
      const t = p.media_type || "OTHER";
      if (!mediaMap[t]) mediaMap[t] = [];
      mediaMap[t].push(Number(p.engagement_rate));
    }
    const sortedMedia = Object.entries(mediaMap).filter(([, v]) => v.length >= 3).sort((a, b) => avg(b[1]) - avg(a[1]));
    if (sortedMedia.length > 0) {
      const [bestType, bestRates] = sortedMedia[0];
      const bestAvg = avg(bestRates);
      const diff = overallAvgEng > 0 ? Math.round(((bestAvg - overallAvgEng) / overallAvgEng) * 100) : 0;
      const label = MEDIA_LABELS[bestType] || bestType;
      recs.push({
        priority: priority++,
        icon: <ImageIcon className="w-4 h-4" />,
        title: `Post more ${label}s`,
        detail: diff > 0 ? `${label} posts get ${diff}% more engagement than your average. You've posted ${bestRates.length} so far.` : `${label} posts are your top format with ${pct(bestAvg)} engagement across ${bestRates.length} posts.`,
      });
    }

    const lengthBuckets = [
      { label: "under 100 characters", range: "Short", min: 0, max: 100 },
      { label: "100-280 characters", range: "Medium", min: 100, max: 280 },
      { label: "280-500 characters", range: "Long", min: 280, max: 500 },
      { label: "over 500 characters", range: "Extra long", min: 500, max: Infinity },
    ];
    const bestBucket = lengthBuckets
      .map(b => { const items = posts.filter(p => (p.text_length || 0) >= b.min && (p.text_length || 0) < b.max); return { ...b, avgViews: avg(items.map(p => p.views)), count: items.length }; })
      .filter(b => b.count >= 3)
      .sort((a, b) => b.avgViews - a.avgViews)[0];
    if (bestBucket) {
      recs.push({ priority: priority++, icon: <Type className="w-4 h-4" />, title: `Keep it ${bestBucket.range.toLowerCase()}`, detail: `Posts ${bestBucket.label} get ${fmt(Math.round(bestBucket.avgViews))} avg views — the highest reach across your ${bestBucket.count} posts of this length.` });
    }

    const dayMap: Record<string, number[]> = {};
    const hourMap: Record<number, number[]> = {};
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const fullDays: Record<string, string> = { Sun: "Sunday", Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday" };
    for (const p of posts) {
      if (!p.posted_at) continue;
      const d = new Date(p.posted_at);
      const tw = new Date(d.getTime() + 8 * 60 * 60 * 1000);
      const day = days[tw.getUTCDay()];
      const hour = tw.getUTCHours();
      if (!dayMap[day]) dayMap[day] = [];
      dayMap[day].push(Number(p.engagement_rate));
      if (!hourMap[hour]) hourMap[hour] = [];
      hourMap[hour].push(Number(p.engagement_rate));
    }
    const bestDay = Object.entries(dayMap).filter(([, v]) => v.length >= 3).sort((a, b) => avg(b[1]) - avg(a[1]))[0];
    const bestHour = Object.entries(hourMap).filter(([, v]) => v.length >= 3).sort((a, b) => avg(b[1]) - avg(a[1]))[0];
    if (bestDay) {
      const dayAvg = avg(bestDay[1]);
      const dayDiff = overallAvgEng > 0 ? Math.round(((dayAvg - overallAvgEng) / overallAvgEng) * 100) : 0;
      const timeStr = bestHour ? ` around ${Number(bestHour[0]).toString().padStart(2, "0")}:00` : "";
      recs.push({ priority: priority++, icon: <Clock className="w-4 h-4" />, title: `Best time: ${fullDays[bestDay[0]] || bestDay[0]}`, detail: `Your ${bestDay[0]} posts${timeStr} get ${dayDiff > 0 ? dayDiff + "% higher" : "the best"} engagement (${pct(dayAvg)} vs ${pct(overallAvgEng)} average).` });
    }

    const topicMap: Record<string, number[]> = {};
    for (const p of posts) { if (p.content_topic) { if (!topicMap[p.content_topic]) topicMap[p.content_topic] = []; topicMap[p.content_topic].push(Number(p.engagement_rate)); } }
    const bestTopic = Object.entries(topicMap).filter(([, v]) => v.length >= 2).sort((a, b) => avg(b[1]) - avg(a[1]))[0];
    if (bestTopic) {
      const topicAvg = avg(bestTopic[1]);
      const diff = overallAvgEng > 0 ? Math.round(((topicAvg - overallAvgEng) / overallAvgEng) * 100) : 0;
      recs.push({ priority: priority++, icon: <TrendingUp className="w-4 h-4" />, title: `Write about "${bestTopic[0]}"`, detail: diff > 0 ? `Posts about ${bestTopic[0]} get ${diff}% more engagement than average (${bestTopic[1].length} posts).` : `Your top-performing topic with ${pct(topicAvg)} engagement across ${bestTopic[1].length} posts.` });
    }

    const hashMap: Record<string, number[]> = {};
    for (const p of posts) { if (p.hashtag) { if (!hashMap[p.hashtag]) hashMap[p.hashtag] = []; hashMap[p.hashtag].push(Number(p.engagement_rate)); } }
    const bestHash = Object.entries(hashMap).filter(([, v]) => v.length >= 2).sort((a, b) => avg(b[1]) - avg(a[1]))[0];
    if (bestHash) {
      recs.push({ priority: priority++, icon: <Hash className="w-4 h-4" />, title: `Use #${bestHash[0]}`, detail: `Posts with this hashtag average ${pct(avg(bestHash[1]))} engagement (${bestHash[1].length} posts).` });
    }

    const sorted = [...posts].sort((a, b) => Number(b.engagement_rate) - Number(a.engagement_rate));
    const top10 = sorted.slice(0, Math.max(Math.ceil(posts.length * 0.1), 1));
    const topMediaCounts: Record<string, number> = {};
    for (const p of top10) { const t = p.media_type || "OTHER"; topMediaCounts[t] = (topMediaCounts[t] || 0) + 1; }
    const dominantMedia = Object.entries(topMediaCounts).sort((a, b) => b[1] - a[1])[0];
    const topAvgLen = avg(top10.map(p => p.text_length || 0));
    if (dominantMedia) {
      const mediaLabel = MEDIA_LABELS[dominantMedia[0]] || dominantMedia[0];
      const pctTop = Math.round((dominantMedia[1] / top10.length) * 100);
      recs.push({ priority: priority++, icon: <TrendingUp className="w-4 h-4" />, title: "Your winning formula", detail: `Your top 10% posts are ${pctTop}% ${mediaLabel}, ~${Math.round(topAvgLen)} chars long, and average ${pct(avg(top10.map(p => Number(p.engagement_rate))))} engagement.` });
    }

    return recs;
  }, [posts, overallAvgEng]);

  if (!recommendations.length) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-sm font-semibold text-gray-900">What to Post Next</h3>
      </div>
      <p className="text-xs text-gray-500">Based on your {posts.length} posts.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {recommendations.map((r, i) => (
          <div key={i} className="flex gap-3 bg-white border border-amber-100 rounded-lg p-3">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <span className="text-xs font-bold text-amber-600 bg-amber-100 rounded-full w-5 h-5 flex items-center justify-center">{r.priority}</span>
              <div className="text-gray-400">{r.icon}</div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">{r.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{r.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Media type performance ─────────────────────────────────────────
function MediaTypeSection({ posts, overallAvgEng }: { posts: ThreadsPost[]; overallAvgEng: number }) {
  const groups = useMemo(() => {
    const map: Record<string, ThreadsPost[]> = {};
    for (const p of posts) { const t = p.media_type || "OTHER"; if (!map[t]) map[t] = []; map[t].push(p); }
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [posts]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-medium text-gray-900 mb-1">Performance by Type</h3>
      <p className="text-xs text-gray-500 mb-4">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 align-middle mr-1" />above avg
        <span className="inline-block w-2 h-2 rounded-full bg-red-400 align-middle ml-3 mr-1" />below avg
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {groups.map(([type, items]) => {
          const avgEng = avg(items.map(p => Number(p.engagement_rate)));
          const avgViews = avg(items.map(p => p.views));
          const isAbove = avgEng >= overallAvgEng;
          const Icon = MEDIA_ICONS[type] || Type;
          return (
            <div key={type} className="border border-gray-100 rounded-lg p-4 space-y-1">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{MEDIA_LABELS[type] || type}</span>
                <span className={`w-2 h-2 rounded-full ml-auto ${isAbove ? "bg-green-500" : "bg-red-400"}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{pct(avgEng)}</div>
              <div className="text-[10px] text-gray-400">engagement rate</div>
              <div className="text-xs text-gray-500">{items.length} posts · {fmt(Math.round(avgViews))} avg views</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Post frequency ─────────────────────────────────────────────────
function PostFrequencySection({ posts }: { posts: ThreadsPost[] }) {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  const { data: chartData, avgFreq, bestPeriodPosts, label } = useMemo(() => {
    const periodMap: Record<string, ThreadsPost[]> = {};
    for (const p of posts) {
      if (!p.posted_at) continue;
      const d = new Date(p.posted_at);
      let key: string;
      if (view === "weekly") { const ws = new Date(d); ws.setDate(d.getDate() - d.getDay()); key = ws.toISOString().split("T")[0]; }
      else { key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; }
      if (!periodMap[key]) periodMap[key] = [];
      periodMap[key].push(p);
    }
    const periods = Object.entries(periodMap).map(([period, items]) => ({ period, count: items.length, avgEng: avg(items.map(p => Number(p.engagement_rate))) * 100 })).sort((a, b) => a.period.localeCompare(b.period));
    const avgVal = periods.length ? avg(periods.map(w => w.count)) : 0;
    const sortedByEng = [...periods].sort((a, b) => b.avgEng - a.avgEng);
    const topPeriods = sortedByEng.slice(0, Math.max(3, Math.ceil(periods.length * 0.2)));
    const bestAvg = avg(topPeriods.map(w => w.count));
    return { data: periods, avgFreq: +avgVal.toFixed(1), bestPeriodPosts: +bestAvg.toFixed(1), label: view === "weekly" ? "week" : "month" };
  }, [posts, view]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Post Frequency</h3>
        <div className="flex gap-0.5 bg-gray-100 rounded-md p-0.5">
          <button onClick={() => setView("weekly")} className={`px-2.5 py-1 text-xs rounded transition-colors ${view === "weekly" ? "bg-white text-gray-900 shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"}`}>Weekly</button>
          <button onClick={() => setView("monthly")} className={`px-2.5 py-1 text-xs rounded transition-colors ${view === "monthly" ? "bg-white text-gray-900 shadow-sm font-medium" : "text-gray-500 hover:text-gray-700"}`}>Monthly</button>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        You post <span className="font-semibold text-gray-900">{avgFreq}×/{label}</span> on average.
        Your best-performing {label}s had about <span className="font-semibold text-gray-900">{bestPeriodPosts} posts</span>.
      </p>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={v => view === "weekly" ? v.slice(5) : v} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} />
            <RechartsTooltip contentStyle={tipStyle} />
            <ReferenceLine y={avgFreq} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5}
              label={{ value: `Avg ${avgFreq}`, position: "right", fontSize: 10, fill: "#f59e0b" }} />
            <Bar dataKey="count" name={`Posts/${label}`} fill="#3b82f6" opacity={0.7} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Tag Breakdown Chart ────────────────────────────────────────────
function TagBreakdownChart({ posts, field }: { posts: ThreadsPost[]; field: "content_topic" | "content_format" | "content_tone" | "content_cta" | "content_audience" }) {
  const { data: chartData, overallAvgPct } = useMemo(() => {
    const tagged = posts.filter(p => p[field]);
    if (!tagged.length) return { data: [], overallAvgPct: 0 };
    const map: Record<string, number[]> = {};
    for (const p of tagged) { const val = p[field]!; if (!map[val]) map[val] = []; map[val].push(Number(p.engagement_rate)); }
    const overallAvg = avg(tagged.map(p => Number(p.engagement_rate)));
    const d = Object.entries(map).map(([label, rates]) => ({ label, avgEng: +(avg(rates) * 100).toFixed(3), count: rates.length, aboveAvg: avg(rates) >= overallAvg })).sort((a, b) => b.avgEng - a.avgEng);
    return { data: d, overallAvgPct: +(overallAvg * 100).toFixed(3) };
  }, [posts, field]);

  if (!chartData.length) return <p className="text-sm text-gray-400 text-center py-8">No tagged data. Run "Tag Content" in Settings.</p>;

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} tickFormatter={v => v.toFixed(2) + "%"} />
          <YAxis dataKey="label" type="category" width={140} tick={{ fontSize: 10, fill: "#6b7280" }} />
          <RechartsTooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(3) + "% engagement"} />
          <ReferenceLine x={overallAvgPct} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5}
            label={{ value: "Avg", position: "top", fontSize: 9, fill: "#f59e0b" }} />
          <Bar dataKey="avgEng" name="Avg Engagement %" radius={[0, 4, 4, 0]}
            label={({ x, y, width, height, index }: any) => {
              const count = chartData[index]?.count ?? 0;
              return <text x={x + width + 4} y={y + height / 2} dy={4} fontSize={9} fill="#9ca3af">{count} posts</text>;
            }}
          >
            {chartData.map((d, i) => (
              <Cell key={i} fill={d.aboveAvg ? "#22c55e" : "#94a3b8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TagInsightsTabs({ posts }: { posts: ThreadsPost[] }) {
  const tabs = [
    { value: "content_topic" as const, label: "Topic" },
    { value: "content_format" as const, label: "Format" },
    { value: "content_tone" as const, label: "Tone" },
    { value: "content_cta" as const, label: "CTA" },
    { value: "content_audience" as const, label: "Audience" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      <h3 className="text-sm font-medium text-gray-900">AI Tag Insights</h3>
      <p className="text-xs text-gray-500">Engagement rate by category. Green = above average.</p>
      <Tabs defaultValue="content_topic">
        <TabsList className="w-full justify-start bg-gray-100">
          {tabs.map(t => (
            <TabsTrigger key={t.value} value={t.value} className="text-xs">{t.label}</TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(t => (
          <TabsContent key={t.value} value={t.value}>
            <TagBreakdownChart posts={posts} field={t.value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// ── Best For comparison table ──────────────────────────────────────
function BestForTable({ posts, followerDeltas }: { posts: ThreadsPost[]; followerDeltas?: { date: string; delta: number }[] }) {
  const data = useMemo(() => {
    const mediaGroups: Record<string, ThreadsPost[]> = {};
    for (const p of posts) { const t = p.media_type || "OTHER"; if (!mediaGroups[t]) mediaGroups[t] = []; mediaGroups[t].push(p); }

    let growthByType: Record<string, number> | null = null;
    if (followerDeltas && followerDeltas.length > 0) {
      growthByType = {};
      const weekPosts: Record<string, ThreadsPost[]> = {};
      for (const p of posts) { if (!p.posted_at) continue; const d = new Date(p.posted_at); const ws = new Date(d); ws.setDate(d.getDate() - d.getDay()); const key = ws.toISOString().split("T")[0]; if (!weekPosts[key]) weekPosts[key] = []; weekPosts[key].push(p); }
      const weekDeltas: Record<string, number> = {};
      for (const fd of followerDeltas) { const d = new Date(fd.date); const ws = new Date(d); ws.setDate(d.getDate() - d.getDay()); const key = ws.toISOString().split("T")[0]; weekDeltas[key] = (weekDeltas[key] || 0) + fd.delta; }
      const typeWeeks: Record<string, { totalDelta: number; totalPosts: number }> = {};
      for (const [week, weekPostsList] of Object.entries(weekPosts)) {
        const delta = weekDeltas[week] || 0;
        const total = weekPostsList.length;
        if (total === 0) continue;
        const typeCounts: Record<string, number> = {};
        for (const p of weekPostsList) typeCounts[p.media_type || "OTHER"] = (typeCounts[p.media_type || "OTHER"] || 0) + 1;
        for (const [type, count] of Object.entries(typeCounts)) { if (!typeWeeks[type]) typeWeeks[type] = { totalDelta: 0, totalPosts: 0 }; typeWeeks[type].totalDelta += delta * (count / total); typeWeeks[type].totalPosts += count; }
      }
      for (const [type, tw] of Object.entries(typeWeeks)) { growthByType[type] = tw.totalPosts > 0 ? tw.totalDelta / tw.totalPosts : 0; }
    }

    const rows = Object.entries(mediaGroups).filter(([, items]) => items.length >= 3).map(([type, items]) => ({
      type, label: MEDIA_LABELS[type] || type, count: items.length,
      avgViews: Math.round(avg(items.map(p => p.views))),
      avgEng: avg(items.map(p => Number(p.engagement_rate))),
      growthPerPost: growthByType?.[type] ?? null,
    }));

    const byViews = [...rows].sort((a, b) => b.avgViews - a.avgViews);
    const byEng = [...rows].sort((a, b) => b.avgEng - a.avgEng);
    const byGrowth = growthByType ? [...rows].sort((a, b) => (b.growthPerPost ?? -Infinity) - (a.growthPerPost ?? -Infinity)) : [];

    return rows.map(r => ({
      ...r,
      viewsRank: byViews.findIndex(x => x.type === r.type) + 1,
      engRank: byEng.findIndex(x => x.type === r.type) + 1,
      growthRank: byGrowth.length ? byGrowth.findIndex(x => x.type === r.type) + 1 : null,
    })).sort((a, b) => a.engRank - b.engRank);
  }, [posts, followerDeltas]);

  const topicData = useMemo(() => {
    const topicGroups: Record<string, ThreadsPost[]> = {};
    for (const p of posts) { if (p.content_topic) { if (!topicGroups[p.content_topic]) topicGroups[p.content_topic] = []; topicGroups[p.content_topic].push(p); } }
    const rows = Object.entries(topicGroups).filter(([, items]) => items.length >= 3).map(([topic, items]) => ({ topic, count: items.length, avgViews: Math.round(avg(items.map(p => p.views))), avgEng: avg(items.map(p => Number(p.engagement_rate))) }));
    const byViews = [...rows].sort((a, b) => b.avgViews - a.avgViews);
    const byEng = [...rows].sort((a, b) => b.avgEng - a.avgEng);
    return rows.map(r => ({ ...r, viewsRank: byViews.findIndex(x => x.topic === r.topic) + 1, engRank: byEng.findIndex(x => x.topic === r.topic) + 1 })).sort((a, b) => a.engRank - b.engRank);
  }, [posts]);

  if (data.length < 2) return null;

  const rankBadge = (rank: number) => {
    const colors = rank === 1 ? "bg-amber-100 text-amber-700" : rank === 2 ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-400";
    return <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${colors}`}>#{rank}</span>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-gray-900">Best For: Views vs Engagement vs Growth</h3>
      </div>
      <p className="text-xs text-gray-500">Which content types perform best for each goal.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 font-medium text-gray-500">Format</th>
              <th className="text-center py-2 px-3 font-medium text-gray-500"><Eye className="w-3 h-3 inline mr-1" />Views</th>
              <th className="text-center py-2 px-3 font-medium text-gray-500"><Heart className="w-3 h-3 inline mr-1" />Engagement</th>
              {data.some(d => d.growthRank !== null) && <th className="text-center py-2 px-3 font-medium text-gray-500"><Users className="w-3 h-3 inline mr-1" />Growth*</th>}
              <th className="text-right py-2 pl-3 font-medium text-gray-500">Posts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.type} className={i % 2 === 0 ? "bg-gray-50/50" : ""}>
                <td className="py-2.5 pr-4 font-medium text-gray-900">{d.label}</td>
                <td className="py-2.5 px-3 text-center">{rankBadge(d.viewsRank)} <span className="ml-1 text-gray-700">{fmt(d.avgViews)}</span></td>
                <td className="py-2.5 px-3 text-center">{rankBadge(d.engRank)} <span className="ml-1 text-gray-700">{pct(d.avgEng)}</span></td>
                {data.some(x => x.growthRank !== null) && (
                  <td className="py-2.5 px-3 text-center">
                    {d.growthRank !== null ? <>{rankBadge(d.growthRank)} <span className="ml-1 text-gray-700">{d.growthPerPost !== null ? (d.growthPerPost >= 0 ? "+" : "") + d.growthPerPost.toFixed(1) + "/post" : "—"}</span></> : "—"}
                  </td>
                )}
                <td className="py-2.5 pl-3 text-right text-gray-500">{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {topicData.length >= 2 && (
        <>
          <h4 className="text-xs font-medium text-gray-500 mt-4">By Topic</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Topic</th>
                  <th className="text-center py-2 px-3 font-medium text-gray-500"><Eye className="w-3 h-3 inline mr-1" />Views</th>
                  <th className="text-center py-2 px-3 font-medium text-gray-500"><Heart className="w-3 h-3 inline mr-1" />Engagement</th>
                  <th className="text-right py-2 pl-3 font-medium text-gray-500">Posts</th>
                </tr>
              </thead>
              <tbody>
                {topicData.map((d, i) => (
                  <tr key={d.topic} className={i % 2 === 0 ? "bg-gray-50/50" : ""}>
                    <td className="py-2.5 pr-4 font-medium capitalize text-gray-900">{d.topic}</td>
                    <td className="py-2.5 px-3 text-center">{rankBadge(d.viewsRank)} <span className="ml-1 text-gray-700">{fmt(d.avgViews)}</span></td>
                    <td className="py-2.5 px-3 text-center">{rankBadge(d.engRank)} <span className="ml-1 text-gray-700">{pct(d.avgEng)}</span></td>
                    <td className="py-2.5 pl-3 text-right text-gray-500">{d.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {data.some(d => d.growthRank !== null) && (
        <p className="text-[10px] text-gray-400 italic">*Growth is estimated by correlating weekly follower changes with post types published that week.</p>
      )}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function ContentAnalysisSections({ range }: { range: DateRange }) {
  const postsQ = useAllPosts(range);
  const posts = postsQ.data || [];
  const hasTaggedPosts = posts.some(p => p.content_tagged_at);
  const followerDeltasQ = useFollowerDeltas(range);
  const followerDeltas = followerDeltasQ.data?.deltas || [];

  if (postsQ.isLoading) {
    return <div className="space-y-4">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-[300px] rounded-lg" />)}</div>;
  }

  if (!posts.length) {
    return <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-400">No post data available. Run a sync first.</div>;
  }

  const overallAvgEng = avg(posts.map(p => Number(p.engagement_rate)));

  return (
    <div className="space-y-4">
      <BestForTable posts={posts} followerDeltas={followerDeltas} />
      <MediaTypeSection posts={posts} overallAvgEng={overallAvgEng} />
      <PostFrequencySection posts={posts} />
      {hasTaggedPosts && <TagInsightsTabs posts={posts} />}
    </div>
  );
}
