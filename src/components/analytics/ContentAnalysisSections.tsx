import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell,
} from "recharts";
import { Image as ImageIcon, Type, Video, Layers, Lightbulb, Clock, Hash, TrendingUp } from "lucide-react";
import { type DateRange, type ThreadsPost, useAllPosts, fmt, pct } from "./analyticsShared";

// ── tooltip style ──────────────────────────────────────────────────
const tipStyle = { background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 };

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

    // 1. Best media type — plain language
    const mediaMap: Record<string, number[]> = {};
    for (const p of posts) {
      const t = p.media_type || "OTHER";
      if (!mediaMap[t]) mediaMap[t] = [];
      mediaMap[t].push(Number(p.engagement_rate));
    }
    const sortedMedia = Object.entries(mediaMap)
      .filter(([, v]) => v.length >= 3)
      .sort((a, b) => avg(b[1]) - avg(a[1]));
    if (sortedMedia.length > 0) {
      const [bestType, bestRates] = sortedMedia[0];
      const bestAvg = avg(bestRates);
      const diff = overallAvgEng > 0 ? Math.round(((bestAvg - overallAvgEng) / overallAvgEng) * 100) : 0;
      const label = MEDIA_LABELS[bestType] || bestType;
      recs.push({
        priority: priority++,
        icon: <ImageIcon className="w-4 h-4" />,
        title: `Post more ${label}s`,
        detail: diff > 0
          ? `${label} posts get ${diff}% more engagement than your average. You've posted ${bestRates.length} so far.`
          : `${label} posts are your top format with ${pct(bestAvg)} engagement across ${bestRates.length} posts.`,
      });
    }

    // 2. Optimal post length — plain language
    const lengthBuckets = [
      { label: "under 100 characters", range: "Short", min: 0, max: 100 },
      { label: "100-280 characters", range: "Medium", min: 100, max: 280 },
      { label: "280-500 characters", range: "Long", min: 280, max: 500 },
      { label: "over 500 characters", range: "Extra long", min: 500, max: Infinity },
    ];
    const bestBucket = lengthBuckets
      .map(b => {
        const items = posts.filter(p => (p.text_length || 0) >= b.min && (p.text_length || 0) < b.max);
        return { ...b, avgViews: avg(items.map(p => p.views)), count: items.length };
      })
      .filter(b => b.count >= 3)
      .sort((a, b) => b.avgViews - a.avgViews)[0];
    if (bestBucket) {
      recs.push({
        priority: priority++,
        icon: <Type className="w-4 h-4" />,
        title: `Keep it ${bestBucket.range.toLowerCase()}`,
        detail: `Posts ${bestBucket.label} get ${fmt(Math.round(bestBucket.avgViews))} avg views — the highest reach across your ${bestBucket.count} posts of this length.`,
      });
    }

    // 3. Best posting day + hour — plain language
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
      recs.push({
        priority: priority++,
        icon: <Clock className="w-4 h-4" />,
        title: `Best time: ${fullDays[bestDay[0]] || bestDay[0]} ${bestHour ? "mornings" : ""}`,
        detail: `Your ${bestDay[0]} posts${timeStr} get ${dayDiff > 0 ? dayDiff + "% higher" : "the best"} engagement (${pct(dayAvg)} vs ${pct(overallAvgEng)} average).`,
      });
    }

    // 4. Best content topic (AI tags)
    const topicMap: Record<string, number[]> = {};
    for (const p of posts) {
      if (p.content_topic) {
        if (!topicMap[p.content_topic]) topicMap[p.content_topic] = [];
        topicMap[p.content_topic].push(Number(p.engagement_rate));
      }
    }
    const bestTopic = Object.entries(topicMap).filter(([, v]) => v.length >= 2).sort((a, b) => avg(b[1]) - avg(a[1]))[0];
    if (bestTopic) {
      const topicAvg = avg(bestTopic[1]);
      const diff = overallAvgEng > 0 ? Math.round(((topicAvg - overallAvgEng) / overallAvgEng) * 100) : 0;
      recs.push({
        priority: priority++,
        icon: <TrendingUp className="w-4 h-4" />,
        title: `Write about "${bestTopic[0]}"`,
        detail: diff > 0
          ? `Posts about ${bestTopic[0]} get ${diff}% more engagement than average (${bestTopic[1].length} posts).`
          : `Your top-performing topic with ${pct(topicAvg)} engagement across ${bestTopic[1].length} posts.`,
      });
    }

    // 5. Best hashtag — plain language
    const hashMap: Record<string, number[]> = {};
    for (const p of posts) {
      if (p.hashtag) {
        if (!hashMap[p.hashtag]) hashMap[p.hashtag] = [];
        hashMap[p.hashtag].push(Number(p.engagement_rate));
      }
    }
    const bestHash = Object.entries(hashMap).filter(([, v]) => v.length >= 2).sort((a, b) => avg(b[1]) - avg(a[1]))[0];
    if (bestHash) {
      recs.push({
        priority: priority++,
        icon: <Hash className="w-4 h-4" />,
        title: `Use #${bestHash[0]}`,
        detail: `Posts with this hashtag average ${pct(avg(bestHash[1]))} engagement (${bestHash[1].length} posts).`,
      });
    }

    // 6. Top 10% sweet spot — plain language
    const sorted = [...posts].sort((a, b) => Number(b.engagement_rate) - Number(a.engagement_rate));
    const top10 = sorted.slice(0, Math.max(Math.ceil(posts.length * 0.1), 1));
    const topMediaCounts: Record<string, number> = {};
    for (const p of top10) {
      const t = p.media_type || "OTHER";
      topMediaCounts[t] = (topMediaCounts[t] || 0) + 1;
    }
    const dominantMedia = Object.entries(topMediaCounts).sort((a, b) => b[1] - a[1])[0];
    const topAvgLen = avg(top10.map(p => p.text_length || 0));
    if (dominantMedia) {
      const mediaLabel = MEDIA_LABELS[dominantMedia[0]] || dominantMedia[0];
      const pctTop = Math.round((dominantMedia[1] / top10.length) * 100);
      recs.push({
        priority: priority++,
        icon: <TrendingUp className="w-4 h-4" />,
        title: "Your winning formula",
        detail: `Your top 10% posts are ${pctTop}% ${mediaLabel}, ~${Math.round(topAvgLen)} chars long, and average ${pct(avg(top10.map(p => Number(p.engagement_rate))))} engagement.`,
      });
    }

    return recs;
  }, [posts, overallAvgEng]);

  if (!recommendations.length) return null;

  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20">
      <CardContent className="p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-semibold">What to Post Next</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Actionable recommendations based on your {posts.length} posts.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {recommendations.map((r, i) => (
            <div key={i} className="flex gap-3 border rounded-lg p-3 bg-background">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900 rounded-full w-5 h-5 flex items-center justify-center">{r.priority}</span>
                <div className="text-muted-foreground">{r.icon}</div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Media type performance (simplified) ────────────────────────────
function MediaTypeSection({ posts, overallAvgEng }: { posts: ThreadsPost[]; overallAvgEng: number }) {
  const groups = useMemo(() => {
    const map: Record<string, ThreadsPost[]> = {};
    for (const p of posts) {
      const t = p.media_type || "OTHER";
      if (!map[t]) map[t] = [];
      map[t].push(p);
    }
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [posts]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">Content Performance by Type</h3>
        <p className="text-xs text-muted-foreground mb-4">How each post format performs. <span className="inline-block w-2 h-2 rounded-full bg-green-500 align-middle" /> = above average, <span className="inline-block w-2 h-2 rounded-full bg-red-400 align-middle" /> = below.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map(([type, items]) => {
            const avgEng = avg(items.map(p => Number(p.engagement_rate)));
            const avgViews = avg(items.map(p => p.views));
            const isAbove = avgEng >= overallAvgEng;
            const Icon = MEDIA_ICONS[type] || Type;
            return (
              <div key={type} className="border rounded-lg p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{MEDIA_LABELS[type] || type}</span>
                  <span className={`w-2 h-2 rounded-full ml-auto ${isAbove ? "bg-green-500" : "bg-red-400"}`} />
                </div>
                <div className="text-2xl font-bold">{pct(avgEng)}</div>
                <div className="text-[10px] text-muted-foreground/70 -mt-0.5">engagement rate</div>
                <div className="text-xs text-muted-foreground">{items.length} posts · {fmt(Math.round(avgViews))} avg views</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Post frequency (simplified — no dual axis, no rolling avg) ────
function PostFrequencySection({ posts }: { posts: ThreadsPost[] }) {
  const { weeklyData, avgFreq, bestWeekPosts } = useMemo(() => {
    const weekMap: Record<string, ThreadsPost[]> = {};
    for (const p of posts) {
      if (!p.posted_at) continue;
      const d = new Date(p.posted_at);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toISOString().split("T")[0];
      if (!weekMap[key]) weekMap[key] = [];
      weekMap[key].push(p);
    }

    const weeks = Object.entries(weekMap)
      .map(([week, items]) => ({
        week,
        count: items.length,
        avgEng: avg(items.map(p => Number(p.engagement_rate))) * 100,
      }))
      .sort((a, b) => a.week.localeCompare(b.week));

    const avgFreqVal = weeks.length ? avg(weeks.map(w => w.count)) : 0;
    // Find the posting frequency of best engagement weeks
    const sortedByEng = [...weeks].sort((a, b) => b.avgEng - a.avgEng);
    const topWeeks = sortedByEng.slice(0, Math.max(3, Math.ceil(weeks.length * 0.2)));
    const bestWeekAvgPosts = avg(topWeeks.map(w => w.count));

    return {
      weeklyData: weeks,
      avgFreq: +avgFreqVal.toFixed(1),
      bestWeekPosts: +bestWeekAvgPosts.toFixed(1),
    };
  }, [posts]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Post Frequency</h3>
        <p className="text-sm text-muted-foreground">
          You post <span className="font-semibold text-foreground">{avgFreq}×/week</span> on average. 
          Your best-performing weeks had about <span className="font-semibold text-foreground">{bestWeekPosts} posts</span>.
        </p>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tipStyle} />
              <ReferenceLine y={avgFreq} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5}
                label={{ value: `Avg ${avgFreq}`, position: "right", fontSize: 10, fill: "#f59e0b" }} />
              <Bar dataKey="count" name="Posts/week" fill="hsl(var(--primary))" opacity={0.7} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Consolidated Tag Insights (tabbed) ─────────────────────────────
function TagBreakdownChart({ posts, field }: { posts: ThreadsPost[]; field: "content_topic" | "content_format" | "content_tone" | "content_cta" | "content_audience" }) {
  const { data: chartData, overallAvgPct } = useMemo(() => {
    const tagged = posts.filter(p => p[field]);
    if (!tagged.length) return { data: [], overallAvgPct: 0 };
    const map: Record<string, number[]> = {};
    for (const p of tagged) {
      const val = p[field]!;
      if (!map[val]) map[val] = [];
      map[val].push(Number(p.engagement_rate));
    }
    const overallAvg = avg(tagged.map(p => Number(p.engagement_rate)));
    const d = Object.entries(map)
      .map(([label, rates]) => ({
        label,
        avgEng: +(avg(rates) * 100).toFixed(3),
        count: rates.length,
        aboveAvg: avg(rates) >= overallAvg,
      }))
      .sort((a, b) => b.avgEng - a.avgEng);
    return { data: d, overallAvgPct: +(overallAvg * 100).toFixed(3) };
  }, [posts, field]);

  if (!chartData.length) return <p className="text-sm text-muted-foreground text-center py-8">No tagged data. Click "Tag Content" to generate.</p>;

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => v.toFixed(2) + "%"} />
          <YAxis dataKey="label" type="category" width={140} tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(3) + "% engagement"} />
          <ReferenceLine x={overallAvgPct} stroke="#f59e0b" strokeDasharray="6 4" strokeWidth={1.5}
            label={{ value: "Avg", position: "top", fontSize: 9, fill: "#f59e0b" }} />
          <Bar dataKey="avgEng" name="Avg Engagement %" radius={[0, 4, 4, 0]}
            label={{ position: "right", fontSize: 9, formatter: (_: any, __: any, index: number) => `${chartData[index]?.count || 0} posts` }}
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
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">AI Tag Insights</h3>
        <p className="text-xs text-muted-foreground">Engagement rate by category. Green bars = above your average. Yellow line = your overall average.</p>
        <Tabs defaultValue="content_topic">
          <TabsList className="w-full justify-start">
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
      </CardContent>
    </Card>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function ContentAnalysisSections({ range }: { range: DateRange }) {
  const postsQ = useAllPosts(range);
  const posts = postsQ.data || [];
  const hasTaggedPosts = posts.some(p => p.content_tagged_at);

  if (postsQ.isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          No post data available. Run a sync first.
        </CardContent>
      </Card>
    );
  }

  const overallAvgEng = avg(posts.map(p => Number(p.engagement_rate)));

  return (
    <div className="space-y-6">
      <MediaTypeSection posts={posts} overallAvgEng={overallAvgEng} />
      <PostFrequencySection posts={posts} />
      {hasTaggedPosts && <TagInsightsTabs posts={posts} />}
    </div>
  );
}
