import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ReferenceLine, Cell,
} from "recharts";
import { Image as ImageIcon, Type, Video, Layers, Lightbulb, Clock, Hash, TrendingUp, Trophy, Eye, Heart, Users } from "lucide-react";
import { type DateRange, type ThreadsPost, type FollowerDelta, useAllPosts, useFollowerDeltas, fmt, pct } from "./analyticsShared";
import { Skeleton } from "@/components/ui/skeleton";

// ── shared styles ──────────────────────────────────────────────────
const tipStyle = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const gridStroke = "#f3f4f6";
const axisTickStyle = { fontSize: 11, fill: "#9ca3af" };

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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl border border-blue-100 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">What to Post Next</h3>
          <p className="text-xs text-gray-500">Based on your {posts.length} posts</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {recommendations.map((r, i) => (
          <div key={i} className="flex gap-3 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100/60 p-4 hover:shadow-sm transition-shadow">
            <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
              <span className="text-[11px] font-bold text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">{r.priority}</span>
              <div className="text-blue-400">{r.icon}</div>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{r.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.detail}</p>
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
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Performance by Type</h3>
      <p className="text-xs text-gray-400 mb-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />Above avg</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" />Below avg</span>
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map(([type, items]) => {
          const avgEng = avg(items.map(p => Number(p.engagement_rate)));
          const avgViews = avg(items.map(p => p.views));
          const isAbove = avgEng >= overallAvgEng;
          const Icon = MEDIA_ICONS[type] || Type;
          const diff = overallAvgEng > 0 ? Math.round(((avgEng - overallAvgEng) / overallAvgEng) * 100) : 0;
          return (
            <div key={type} className={`rounded-xl border-2 p-5 space-y-2 transition-colors ${isAbove ? "border-emerald-100 bg-emerald-50/30" : "border-gray-100 bg-gray-50/30"}`}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isAbove ? "bg-emerald-100" : "bg-gray-100"}`}>
                  <Icon className={`w-4 h-4 ${isAbove ? "text-emerald-600" : "text-gray-400"}`} />
                </div>
                <span className="text-sm font-semibold text-gray-900">{MEDIA_LABELS[type] || type}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{pct(avgEng)}</div>
              <div className={`text-xs font-medium ${isAbove ? "text-emerald-600" : "text-red-400"}`}>
                {diff > 0 ? "+" : ""}{diff}% vs avg
              </div>
              <div className="text-xs text-gray-400">{items.length} posts · {fmt(Math.round(avgViews))} avg views</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Posting Time Heatmap ───────────────────────────────────────────
function PostingTimeHeatmap({ posts }: { posts: ThreadsPost[] }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 6am to 9pm

  const { grid, maxEng, maxCount } = useMemo(() => {
    const grid: Record<string, { totalEng: number; count: number; totalViews: number }> = {};
    let maxEng = 0;
    let maxCount = 0;

    for (const p of posts) {
      if (!p.posted_at) continue;
      const d = new Date(p.posted_at);
      // Convert to Taipei time (UTC+8)
      const tw = new Date(d.getTime() + 8 * 60 * 60 * 1000);
      const dayIndex = tw.getUTCDay(); // 0=Sun
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];
      const hour = tw.getUTCHours();
      const key = `${dayName}-${hour}`;

      if (!grid[key]) grid[key] = { totalEng: 0, count: 0, totalViews: 0 };
      grid[key].totalEng += Number(p.engagement_rate || 0);
      grid[key].count += 1;
      grid[key].totalViews += p.views || 0;
    }

    for (const cell of Object.values(grid)) {
      const avgE = cell.count > 0 ? cell.totalEng / cell.count : 0;
      if (avgE > maxEng) maxEng = avgE;
      if (cell.count > maxCount) maxCount = cell.count;
    }

    return { grid, maxEng, maxCount };
  }, [posts]);

  if (!posts.length) return null;

  const getColor = (day: string, hour: number) => {
    const key = `${day}-${hour}`;
    const cell = grid[key];
    if (!cell || cell.count === 0) return "bg-gray-50";
    const avgE = cell.totalEng / cell.count;
    const intensity = maxEng > 0 ? avgE / maxEng : 0;
    if (intensity > 0.8) return "bg-blue-600";
    if (intensity > 0.6) return "bg-blue-500";
    if (intensity > 0.4) return "bg-blue-400";
    if (intensity > 0.2) return "bg-blue-200";
    return "bg-blue-100";
  };

  const getTextColor = (day: string, hour: number) => {
    const key = `${day}-${hour}`;
    const cell = grid[key];
    if (!cell || cell.count === 0) return "";
    const avgE = cell.totalEng / cell.count;
    const intensity = maxEng > 0 ? avgE / maxEng : 0;
    return intensity > 0.4 ? "text-white" : "";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
          <Clock className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Best Time to Post</h3>
          <p className="text-xs text-gray-400">Avg engagement by day & hour (Taipei time). Darker = higher engagement.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex mb-1">
            <div className="w-10 shrink-0" />
            {hours.map(h => (
              <div key={h} className="flex-1 text-center text-[10px] text-gray-400 font-medium">
                {h.toString().padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          <TooltipProvider delayDuration={100}>
            {days.map(day => (
              <div key={day} className="flex gap-0.5 mb-0.5">
                <div className="w-10 shrink-0 text-[11px] text-gray-500 font-medium flex items-center">{day}</div>
                {hours.map(hour => {
                  const key = `${day}-${hour}`;
                  const cell = grid[key];
                  const count = cell?.count || 0;
                  const avgE = count > 0 ? cell.totalEng / count : 0;
                  const avgV = count > 0 ? Math.round(cell.totalViews / count) : 0;

                  return (
                    <UITooltip key={hour}>
                      <TooltipTrigger asChild>
                        <div className={`flex-1 aspect-square rounded-sm cursor-default transition-all hover:ring-2 hover:ring-blue-300 ${getColor(day, hour)} ${getTextColor(day, hour)} flex items-center justify-center`}>
                          {count > 0 && <span className="text-[8px] font-bold opacity-70">{count}</span>}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-semibold">{day} {hour}:00</p>
                        {count > 0 ? (
                          <>
                            <p>{count} post{count > 1 ? "s" : ""} · {pct(avgE)} eng · {fmt(avgV)} avg views</p>
                          </>
                        ) : (
                          <p className="text-gray-400">No posts at this time</p>
                        )}
                      </TooltipContent>
                    </UITooltip>
                  );
                })}
              </div>
            ))}
          </TooltipProvider>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-gray-400">Low</span>
            <div className="flex gap-0.5">
              {["bg-gray-50", "bg-blue-100", "bg-blue-200", "bg-blue-400", "bg-blue-500", "bg-blue-600"].map(c => (
                <div key={c} className={`w-4 h-3 rounded-sm ${c}`} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">High</span>
          </div>
        </div>
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
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Post Frequency</h3>
          <p className="text-xs text-gray-400 mt-1">
            You post <span className="font-semibold text-gray-700">{avgFreq}×/{label}</span> on average.
            Best {label}s had <span className="font-semibold text-gray-700">{bestPeriodPosts} posts</span>.
          </p>
        </div>
        <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
          <button onClick={() => setView("weekly")} className={`px-3 py-1.5 text-xs rounded-md transition-all ${view === "weekly" ? "bg-white text-gray-900 shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"}`}>Weekly</button>
          <button onClick={() => setView("monthly")} className={`px-3 py-1.5 text-xs rounded-md transition-all ${view === "monthly" ? "bg-white text-gray-900 shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"}`}>Monthly</button>
        </div>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="period" tick={axisTickStyle} tickFormatter={v => view === "weekly" ? v.slice(5) : v} axisLine={false} tickLine={false} />
            <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
            <RechartsTooltip contentStyle={tipStyle}
              formatter={(v: number, name: string) => [v, name === `Posts/${label}` ? `Posts this ${label}` : name]}
              labelFormatter={(l) => view === "weekly" ? `Week of ${l}` : l} />
            <ReferenceLine y={avgFreq} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5} />
            <Bar dataKey="count" name={`Posts/${label}`} fill="#6366f1" radius={[6, 6, 0, 0]} />
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

  if (!chartData.length) return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <p className="text-sm">No tagged data yet.</p>
      <p className="text-xs mt-1">Run "Tag Content" in Settings to categorize your posts.</p>
    </div>
  );

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
          <XAxis type="number" tick={axisTickStyle} tickFormatter={v => v.toFixed(1) + "%"} axisLine={false} tickLine={false} />
          <YAxis dataKey="label" type="category" width={120} tick={{ fontSize: 11, fill: "#374151" }} axisLine={false} tickLine={false} />
          <RechartsTooltip contentStyle={tipStyle}
            formatter={(v: number) => [v.toFixed(2) + "% engagement"]}
            labelFormatter={(l) => l} />
          <ReferenceLine x={overallAvgPct} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5} />
          <Bar dataKey="avgEng" name="Engagement %" radius={[0, 6, 6, 0]}
            label={({ x, y, width, height, index }: any) => {
              const count = chartData[index]?.count ?? 0;
              return <text x={x + width + 6} y={y + height / 2} dy={4} fontSize={10} fill="#9ca3af">{count}</text>;
            }}
          >
            {chartData.map((d, i) => (
              <Cell key={i} fill={d.aboveAvg ? "#22c55e" : "#cbd5e1"} />
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
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">AI Tag Insights</h3>
        <p className="text-xs text-gray-400 mt-1">Engagement rate by category. <span className="text-emerald-500 font-medium">Green</span> = above your average.</p>
      </div>
      <Tabs defaultValue="content_topic">
        <TabsList className="w-full justify-start bg-gray-50 rounded-lg p-0.5">
          {tabs.map(t => (
            <TabsTrigger key={t.value} value={t.value} className="text-xs rounded-md data-[state=active]:shadow-sm">{t.label}</TabsTrigger>
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
    if (followerDeltas && followerDeltas.length > 0 && followerDeltas.some(d => d.delta !== 0)) {
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
    const showGrowth = growthByType !== null;

    return rows.map(r => ({
      ...r,
      viewsRank: byViews.findIndex(x => x.type === r.type) + 1,
      engRank: byEng.findIndex(x => x.type === r.type) + 1,
      growthRank: showGrowth ? byGrowth.findIndex(x => x.type === r.type) + 1 : null,
    })).sort((a, b) => a.engRank - b.engRank);
  }, [posts, followerDeltas]);

  if (data.length < 2) return null;

  const rankBadge = (rank: number) => {
    if (rank === 1) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">🥇</span>;
    if (rank === 2) return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold bg-gray-100 text-gray-500">🥈</span>;
    return <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold bg-gray-50 text-gray-400">#{rank}</span>;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Best For: Views vs Engagement vs Growth</h3>
          <p className="text-xs text-gray-400">Which content types perform best for each goal</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 pr-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Format</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider"><Eye className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />Views</th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider"><Heart className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />Engagement</th>
              {data.some(d => d.growthRank !== null) && <th className="text-center py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider"><Users className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />Growth*</th>}
              <th className="text-right py-3 pl-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Posts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.type} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "bg-gray-50/30" : ""}`}>
                <td className="py-3.5 pr-4 font-semibold text-gray-900">{d.label}</td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {rankBadge(d.viewsRank)}
                    <span className="text-gray-700 font-medium">{fmt(d.avgViews)}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {rankBadge(d.engRank)}
                    <span className="text-gray-700 font-medium">{pct(d.avgEng)}</span>
                  </div>
                </td>
                {data.some(x => x.growthRank !== null) && (
                  <td className="py-3.5 px-4 text-center">
                    {d.growthRank !== null ? (
                      <div className="flex items-center justify-center gap-2">
                        {rankBadge(d.growthRank)}
                        <span className="text-gray-700 font-medium">{d.growthPerPost !== null ? (d.growthPerPost >= 0 ? "+" : "") + d.growthPerPost.toFixed(1) + "/post" : "—"}</span>
                      </div>
                    ) : "—"}
                  </td>
                )}
                <td className="py-3.5 pl-4 text-right text-gray-400 font-medium">{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    return <div className="space-y-4">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-[300px] rounded-xl" />)}</div>;
  }

  if (!posts.length) {
    return <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400 shadow-sm">No post data available. Run a sync first.</div>;
  }

  const overallAvgEng = avg(posts.map(p => Number(p.engagement_rate)));

  return (
    <div className="space-y-5">
      <BestForTable posts={posts} followerDeltas={followerDeltas} />
      <MediaTypeSection posts={posts} overallAvgEng={overallAvgEng} />
      <PostingTimeHeatmap posts={posts} />
      <PostFrequencySection posts={posts} />
      {hasTaggedPosts && <TagInsightsTabs posts={posts} />}
    </div>
  );
}
