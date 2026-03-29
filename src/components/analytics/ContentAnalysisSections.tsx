import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ScatterChart, Scatter, ZAxis, Cell, ComposedChart, Line,
  ReferenceLine,
} from "recharts";
import { ExternalLink, Image as ImageIcon, Type, Video, Layers, Lightbulb, Clock, Hash, TrendingUp } from "lucide-react";
import { type DateRange, type ThreadsPost, useAllPosts, useInsightsForReach, fmt, pct } from "./analyticsShared";

// ── tooltip style ──────────────────────────────────────────────────
const tipStyle = { background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 };

// ── helpers ────────────────────────────────────────────────────────
function avg(arr: number[]) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }
function sum(arr: number[]) { return arr.reduce((a, b) => a + b, 0); }
function truncate(s: string | null, n: number) { if (!s) return ""; return s.length > n ? s.slice(0, n) + "…" : s; }

const MEDIA_ICONS: Record<string, any> = { TEXT_POST: Type, IMAGE: ImageIcon, CAROUSEL_ALBUM: Layers, VIDEO: Video };
const MEDIA_LABELS: Record<string, string> = { TEXT_POST: "Text", IMAGE: "Image", CAROUSEL_ALBUM: "Carousel", VIDEO: "Video" };

// ── Section 5: Media type performance ──────────────────────────────
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
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Content Performance by Media Type</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map(([type, items]) => {
            const avgEng = avg(items.map(p => Number(p.engagement_rate)));
            const avgViews = avg(items.map(p => p.views));
            const diff = overallAvgEng > 0 ? ((avgEng - overallAvgEng) / overallAvgEng) * 100 : 0;
            const Icon = MEDIA_ICONS[type] || Type;
            return (
              <div key={type} className="border rounded-lg p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{MEDIA_LABELS[type] || type}</span>
                </div>
                <div className="text-2xl font-bold">{pct(avgEng)}</div>
                <div className="text-xs text-muted-foreground">{items.length} posts · {fmt(Math.round(avgViews))} avg views</div>
                <div className={`text-xs font-medium ${diff >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {diff >= 0 ? "+" : ""}{diff.toFixed(1)}% vs avg
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 6: Post length ─────────────────────────────────────────
function PostLengthSection({ posts }: { posts: ThreadsPost[] }) {
  const buckets = useMemo(() => {
    const b = [
      { label: "Short (<100)", min: 0, max: 100, posts: [] as ThreadsPost[] },
      { label: "Medium (100-280)", min: 100, max: 280, posts: [] as ThreadsPost[] },
      { label: "Long (280-500)", min: 280, max: 500, posts: [] as ThreadsPost[] },
      { label: "Extra Long (500+)", min: 500, max: Infinity, posts: [] as ThreadsPost[] },
    ];
    for (const p of posts) {
      const len = p.text_length || 0;
      const bucket = b.find(x => len >= x.min && len < x.max);
      if (bucket) bucket.posts.push(p);
    }
    return b.map(x => ({
      label: x.label,
      avgEng: avg(x.posts.map(p => Number(p.engagement_rate))) * 100,
      count: x.posts.length,
    }));
  }, [posts]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Performance by Post Length</h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buckets} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => v.toFixed(2) + "%"} />
              <YAxis dataKey="label" type="category" width={130} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(3) + "%"} />
              <Bar dataKey="avgEng" name="Avg Engagement %" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}
                label={{ position: "right", fontSize: 10, formatter: (_: any, __: any, index: number) => `${buckets[index]?.count || 0} posts` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 7: Language comparison ─────────────────────────────────
function LanguageSection({ posts }: { posts: ThreadsPost[] }) {
  const langs = useMemo(() => {
    const en = posts.filter(p => p.detected_language === "en");
    const zh = posts.filter(p => p.detected_language === "zh");
    const calc = (arr: ThreadsPost[]) => ({
      count: arr.length,
      avgViews: avg(arr.map(p => p.views)),
      avgEng: avg(arr.map(p => Number(p.engagement_rate))),
      avgVir: avg(arr.map(p => Number(p.virality_rate))),
      avgConv: avg(arr.map(p => Number(p.conversation_rate))),
      best: arr.sort((a, b) => Number(b.engagement_rate) - Number(a.engagement_rate))[0] || null,
    });
    return { en: calc(en), zh: calc(zh) };
  }, [posts]);

  const chartData = [
    { metric: "Avg Views", en: Math.round(langs.en.avgViews), zh: Math.round(langs.zh.avgViews) },
    { metric: "Eng % (×100)", en: +(langs.en.avgEng * 100).toFixed(2), zh: +(langs.zh.avgEng * 100).toFixed(2) },
    { metric: "Vir % (×100)", en: +(langs.en.avgVir * 100).toFixed(2), zh: +(langs.zh.avgVir * 100).toFixed(2) },
    { metric: "Conv % (×100)", en: +(langs.en.avgConv * 100).toFixed(2), zh: +(langs.zh.avgConv * 100).toFixed(2) },
  ];

  const LangCard = ({ label, data }: { label: string; data: typeof langs.en }) => (
    <div className="border rounded-lg p-4 space-y-2 flex-1 min-w-[200px]">
      <h4 className="font-medium text-sm">{label}</h4>
      <div className="text-xs space-y-1 text-muted-foreground">
        <div>{data.count} posts</div>
        <div>Avg views: {fmt(Math.round(data.avgViews))}</div>
        <div>Engagement: {pct(data.avgEng)}</div>
        <div>Virality: {pct(data.avgVir)}</div>
        <div>Conversation: {pct(data.avgConv)}</div>
      </div>
      {data.best && (
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">Best post:</p>
          <p className="text-xs mt-1">{truncate(data.best.text_content, 100)}</p>
          <p className="text-xs text-green-600 font-medium">{pct(Number(data.best.engagement_rate))} eng</p>
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Language Comparison (EN vs ZH)</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <LangCard label="🇺🇸 English" data={langs.en} />
          <LangCard label="🇹🇼 中文" data={langs.zh} />
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tipStyle} />
              <Legend />
              <Bar dataKey="en" name="English" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="zh" name="中文" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 8: Engagement breakdown ────────────────────────────────
function EngagementBreakdownSection({ posts }: { posts: ThreadsPost[] }) {
  const [sortBy, setSortBy] = useState<"engagement" | "replies" | "virality">("engagement");

  const data = useMemo(() => {
    const sorted = [...posts].sort((a, b) => {
      if (sortBy === "replies") return b.replies - a.replies;
      if (sortBy === "virality") return (b.reposts + b.quotes + b.shares) - (a.reposts + a.quotes + a.shares);
      return (b.likes + b.replies + b.reposts + b.quotes + b.shares) - (a.likes + a.replies + a.reposts + a.quotes + a.shares);
    });
    return sorted.slice(0, 30).map((p, i) => ({
      name: `#${i + 1}`,
      likes: p.likes,
      replies: p.replies,
      reposts: p.reposts,
      quotes: p.quotes,
      shares: p.shares,
      text: truncate(p.text_content, 40),
    }));
  }, [posts, sortBy]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Engagement Quality Breakdown (Top 30)</h3>
          <div className="flex gap-1">
            {(["engagement", "replies", "virality"] as const).map(s => (
              <Button key={s} size="sm" variant={sortBy === s ? "default" : "outline"} onClick={() => setSortBy(s)}>
                {s === "engagement" ? "Total" : s === "replies" ? "Replies" : "Virality"}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-[350px] overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tipStyle} />
              <Legend />
              <Bar dataKey="likes" stackId="a" fill="#86efac" name="Likes" />
              <Bar dataKey="replies" stackId="a" fill="#fbbf24" name="Replies" />
              <Bar dataKey="reposts" stackId="a" fill="#16a34a" name="Reposts" />
              <Bar dataKey="quotes" stackId="a" fill="#14b8a6" name="Quotes" />
              <Bar dataKey="shares" stackId="a" fill="#3b82f6" name="Shares" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 9: Original vs quote posts ─────────────────────────────
function OriginalVsQuoteSection({ posts }: { posts: ThreadsPost[] }) {
  const stats = useMemo(() => {
    const orig = posts.filter(p => !p.is_quote_post);
    const quote = posts.filter(p => p.is_quote_post);
    const calc = (arr: ThreadsPost[]) => ({
      count: arr.length,
      avgViews: avg(arr.map(p => p.views)),
      avgEng: avg(arr.map(p => Number(p.engagement_rate))),
      avgVir: avg(arr.map(p => Number(p.virality_rate))),
      avgConv: avg(arr.map(p => Number(p.conversation_rate))),
    });
    const o = calc(orig);
    const q = calc(quote);
    const ratio = q.avgEng > 0 ? (o.avgEng / q.avgEng).toFixed(1) : "∞";
    const better = o.avgEng >= q.avgEng ? "Original" : "Quote";
    return { orig: o, quote: q, ratio, better };
  }, [posts]);

  const StatCard = ({ label, data }: { label: string; data: typeof stats.orig }) => (
    <div className="border rounded-lg p-4 flex-1 min-w-[180px] space-y-1">
      <h4 className="text-sm font-medium">{label}</h4>
      <div className="text-xs text-muted-foreground space-y-0.5">
        <div>{data.count} posts</div>
        <div>Avg views: {fmt(Math.round(data.avgViews))}</div>
        <div>Engagement: {pct(data.avgEng)}</div>
        <div>Virality: {pct(data.avgVir)}</div>
        <div>Conversation: {pct(data.avgConv)}</div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Original vs Quote Posts</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <StatCard label="📝 Original Posts" data={stats.orig} />
          <StatCard label="🔁 Quote Posts" data={stats.quote} />
        </div>
        <p className="text-sm text-muted-foreground">
          {stats.better} posts get <span className="font-semibold text-foreground">{stats.ratio}×</span> more engagement on average.
        </p>
      </CardContent>
    </Card>
  );
}

// ── Section 10: Hashtag performance ────────────────────────────────
function HashtagSection({ posts }: { posts: ThreadsPost[] }) {
  const rows = useMemo(() => {
    const map: Record<string, ThreadsPost[]> = {};
    for (const p of posts) {
      if (p.hashtag) {
        if (!map[p.hashtag]) map[p.hashtag] = [];
        map[p.hashtag].push(p);
      }
    }
    return Object.entries(map)
      .filter(([, v]) => v.length >= 2)
      .map(([tag, items]) => ({
        tag: "#" + tag,
        count: items.length,
        avgViews: Math.round(avg(items.map(p => p.views))),
        avgEng: avg(items.map(p => Number(p.engagement_rate))),
        avgVir: avg(items.map(p => Number(p.virality_rate))),
      }))
      .sort((a, b) => b.avgEng - a.avgEng);
  }, [posts]);

  if (!rows.length) return null;

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Hashtag Performance (2+ posts)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="p-2">Hashtag</th>
                <th className="p-2 text-right">Posts</th>
                <th className="p-2 text-right">Avg Views</th>
                <th className="p-2 text-right">Avg Eng</th>
                <th className="p-2 text-right">Avg Virality</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.tag} className="border-b">
                  <td className="p-2 font-medium">{r.tag}</td>
                  <td className="p-2 text-right">{r.count}</td>
                  <td className="p-2 text-right">{fmt(r.avgViews)}</td>
                  <td className="p-2 text-right">{pct(r.avgEng)}</td>
                  <td className="p-2 text-right">{pct(r.avgVir)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 10b: Image content performance ─────────────────────────
function ImageContentSection({ posts }: { posts: ThreadsPost[] }) {
  const { tagRows, topImages } = useMemo(() => {
    // Tag aggregation
    const tagMap: Record<string, ThreadsPost[]> = {};
    for (const p of posts) {
      if (p.image_tags) {
        for (const tag of p.image_tags) {
          if (!tagMap[tag]) tagMap[tag] = [];
          tagMap[tag].push(p);
        }
      }
    }
    const tagRows = Object.entries(tagMap)
      .map(([tag, items]) => ({
        tag,
        count: items.length,
        avgViews: Math.round(avg(items.map(p => p.views))),
        avgEng: avg(items.map(p => Number(p.engagement_rate))),
        avgVir: avg(items.map(p => Number(p.virality_rate))),
      }))
      .sort((a, b) => b.avgEng - a.avgEng);

    // Top 10 image posts
    const topImages = posts
      .filter(p => p.media_url || p.thumbnail_url)
      .sort((a, b) => Number(b.engagement_rate) - Number(a.engagement_rate))
      .slice(0, 10);

    return { tagRows, topImages };
  }, [posts]);

  if (!tagRows.length && !topImages.length) return null;

  const TAG_COLORS: Record<string, string> = {
    "quote-graphic": "bg-purple-100 text-purple-700",
    "text-overlay": "bg-blue-100 text-blue-700",
    "branded-template": "bg-amber-100 text-amber-700",
    "screenshot": "bg-gray-100 text-gray-700",
    "selfie": "bg-pink-100 text-pink-700",
    "photo": "bg-green-100 text-green-700",
    "infographic": "bg-cyan-100 text-cyan-700",
    "meme": "bg-orange-100 text-orange-700",
    "testimonial": "bg-emerald-100 text-emerald-700",
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-6">
        <h3 className="text-sm font-medium text-muted-foreground">Image Content Performance</h3>

        {tagRows.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="p-2">Image Tag</th>
                    <th className="p-2 text-right">Posts</th>
                    <th className="p-2 text-right">Avg Views</th>
                    <th className="p-2 text-right">Avg Eng</th>
                    <th className="p-2 text-right">Avg Virality</th>
                  </tr>
                </thead>
                <tbody>
                  {tagRows.map(r => (
                    <tr key={r.tag} className="border-b">
                      <td className="p-2">
                        <Badge variant="secondary" className={TAG_COLORS[r.tag] || ""}>{r.tag}</Badge>
                      </td>
                      <td className="p-2 text-right">{r.count}</td>
                      <td className="p-2 text-right">{fmt(r.avgViews)}</td>
                      <td className="p-2 text-right">{pct(r.avgEng)}</td>
                      <td className="p-2 text-right">{pct(r.avgVir)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tagRows.map(r => ({ ...r, avgEngPct: +(r.avgEng * 100).toFixed(3) }))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="tag" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v + "%"} />
                  <Tooltip contentStyle={tipStyle} formatter={(v: number) => v.toFixed(3) + "%"} />
                  <Bar dataKey="avgEngPct" name="Avg Engagement %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {topImages.length > 0 && (
          <>
            <h4 className="text-sm font-medium text-muted-foreground">Top 10 Image Posts by Engagement</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topImages.map(p => (
                <div key={p.id} className="flex gap-3 border rounded-lg p-3">
                  <img
                    src={p.thumbnail_url || p.media_url || ""}
                    alt=""
                    className="w-20 h-20 rounded-md object-cover flex-shrink-0 bg-muted"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-xs leading-relaxed line-clamp-2">{truncate(p.text_content, 120)}</p>
                    {p.image_description && (
                      <p className="text-[10px] text-muted-foreground line-clamp-1">{p.image_description}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {(p.image_tags || []).map(tag => (
                        <Badge key={tag} variant="secondary" className={`text-[10px] py-0 ${TAG_COLORS[tag] || ""}`}>{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{fmt(p.views)} views</span>
                      <span>{pct(Number(p.engagement_rate))} eng</span>
                      {p.permalink && (
                        <a href={p.permalink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Section 11: Post frequency ─────────────────────────────────────
function PostFrequencySection({ posts }: { posts: ThreadsPost[] }) {
  const { weeklyData, avgFreq, highWeekEng, lowWeekEng, threshold } = useMemo(() => {
    // Group by ISO week
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

    // Rolling 7d avg
    const weeklyData = weeks.map((w, i) => {
      const window = weeks.slice(Math.max(0, i - 3), i + 1);
      const rolling = avg(window.map(x => x.avgEng));
      return { ...w, rolling: +rolling.toFixed(3) };
    });

    const avgFreq = weeks.length ? avg(weeks.map(w => w.count)) : 0;
    const threshold = Math.ceil(avgFreq);
    const highWeeks = weeks.filter(w => w.count >= threshold);
    const lowWeeks = weeks.filter(w => w.count < threshold);

    return {
      weeklyData,
      avgFreq: +avgFreq.toFixed(1),
      highWeekEng: +(avg(highWeeks.map(w => w.avgEng))).toFixed(3),
      lowWeekEng: +(avg(lowWeeks.map(w => w.avgEng))).toFixed(3),
      threshold,
    };
  }, [posts]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Post Frequency Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Average posting frequency: <span className="font-semibold text-foreground">{avgFreq} posts/week</span>.
          Weeks with {threshold}+ posts: <span className="text-green-600 font-medium">{highWeekEng}%</span> avg engagement
          vs <span className="text-amber-600 font-medium">{lowWeekEng}%</span> on lighter weeks.
        </p>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} tickFormatter={v => v.slice(5)} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={v => v + "%"} />
              <Tooltip contentStyle={tipStyle} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Posts/week" fill="hsl(var(--primary))" opacity={0.3} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgEng" name="Engagement %" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="rolling" name="Rolling Avg" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 12: Reach ratio ────────────────────────────────────────
function ReachRatioSection({ posts }: { posts: ThreadsPost[] }) {
  const insightsQ = useInsightsForReach();
  const insightsDates = insightsQ.data || [];

  const { avgReach, scatterData, breakouts } = useMemo(() => {
    if (!insightsDates.length) return { avgReach: 0, scatterData: [], breakouts: [] };

    // For each post, find nearest follower_count
    const getFollowers = (postedAt: string | null) => {
      if (!postedAt || !insightsDates.length) return 0;
      const d = postedAt.split("T")[0];
      let closest = insightsDates[0];
      let minDiff = Infinity;
      for (const ins of insightsDates) {
        const diff = Math.abs(new Date(ins.metric_date).getTime() - new Date(d).getTime());
        if (diff < minDiff) { minDiff = diff; closest = ins; }
      }
      return closest.follower_count || 1;
    };

    const withReach = posts
      .filter(p => p.views > 0)
      .map(p => {
        const followers = getFollowers(p.posted_at);
        return {
          ...p,
          followers,
          reachRatio: followers > 0 ? p.views / followers : 0,
        };
      });

    const avgReach = avg(withReach.map(p => p.reachRatio));

    const scatterData = withReach.map(p => ({
      followers: p.followers,
      views: p.views,
      eng: Number(p.engagement_rate),
      text: truncate(p.text_content, 60),
      permalink: p.permalink,
    }));

    const breakouts = [...withReach]
      .sort((a, b) => b.reachRatio - a.reachRatio)
      .slice(0, 10)
      .map(p => ({
        text: truncate(p.text_content, 80),
        reachRatio: p.reachRatio.toFixed(1),
        views: p.views,
        permalink: p.permalink,
      }));

    return { avgReach, scatterData, breakouts };
  }, [posts, insightsDates]);

  if (insightsQ.isLoading) return <Skeleton className="h-[400px] rounded-lg" />;

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Reach Ratio Analysis</h3>
        <div className="border rounded-lg p-4 text-center">
          <div className="text-3xl font-bold">{avgReach.toFixed(1)}×</div>
          <p className="text-sm text-muted-foreground">Your posts reach {avgReach.toFixed(1)}× your follower count on average</p>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" dataKey="followers" name="Followers" tick={{ fontSize: 11 }} tickFormatter={v => fmt(v)} />
              <YAxis type="number" dataKey="views" name="Views" tick={{ fontSize: 11 }} tickFormatter={v => fmt(v)} />
              <ZAxis type="number" dataKey="eng" range={[20, 200]} />
              <Tooltip contentStyle={tipStyle} formatter={(v: number, name: string) => [fmt(v), name]} />
              <ReferenceLine
                segment={[{ x: 0, y: 0 }, { x: Math.max(...scatterData.map(d => d.followers), 1), y: Math.max(...scatterData.map(d => d.followers), 1) }]}
                stroke="#94a3b8" strokeDasharray="5 5" label="1:1"
              />
              <Scatter name="Posts" data={scatterData}>
                {scatterData.map((d, i) => (
                  <Cell key={i} fill={d.eng > 0.05 ? "#22c55e" : d.eng > 0.02 ? "#f59e0b" : "#94a3b8"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {breakouts.length > 0 && (
          <>
            <h4 className="text-sm font-medium text-muted-foreground">Top 10 Breakout Posts</h4>
            <div className="space-y-2">
              {breakouts.map((b, i) => (
                <div key={i} className="flex items-start gap-3 border rounded-lg p-3">
                  <span className="text-lg font-bold text-muted-foreground w-6 shrink-0">#{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs">{b.text}</p>
                    <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
                      <span className="font-semibold text-green-600">{b.reachRatio}× reach</span>
                      <span>{fmt(b.views)} views</span>
                      {b.permalink && (
                        <a href={b.permalink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main export ────────────────────────────────────────────────────
export default function ContentAnalysisSections({ range }: { range: DateRange }) {
  const postsQ = useAllPosts(range);
  const posts = postsQ.data || [];

  if (postsQ.isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
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
      <PostLengthSection posts={posts} />
      <LanguageSection posts={posts} />
      <EngagementBreakdownSection posts={posts} />
      <OriginalVsQuoteSection posts={posts} />
      <HashtagSection posts={posts} />
      <ImageContentSection posts={posts} />
      <PostFrequencySection posts={posts} />
      <ReachRatioSection posts={posts} />
    </div>
  );
}
