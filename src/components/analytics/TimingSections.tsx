import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ComposedChart, Line,
} from "recharts";
import { type DateRange, type ThreadsPost, useAllPosts, pct } from "./analyticsShared";

const tipStyle = {
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

function toTaiwanHourDay(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  const tw = new Date(d.getTime() + 8 * 60 * 60 * 1000);
  return { day: tw.getUTCDay(), hour: tw.getUTCHours() };
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Mon→Sun

// ── Section 15: Heatmap ────────────────────────────────────────────
function HeatmapSection({ posts }: { posts: ThreadsPost[] }) {
  const grid = useMemo(() => {
    // 7 days × 24 hours
    const cells: Record<string, { total: number; count: number }> = {};
    for (const p of posts) {
      const t = toTaiwanHourDay(p.posted_at);
      if (!t) continue;
      const key = `${t.day}-${t.hour}`;
      if (!cells[key]) cells[key] = { total: 0, count: 0 };
      cells[key].total += Number(p.engagement_rate);
      cells[key].count++;
    }
    return cells;
  }, [posts]);

  // Find max for color scaling
  const maxEng = useMemo(() => {
    let max = 0;
    for (const v of Object.values(grid)) {
      const avg = v.count > 0 ? v.total / v.count : 0;
      if (avg > max) max = avg;
    }
    return max || 1;
  }, [grid]);

  const getColor = (avg: number) => {
    const intensity = Math.min(avg / maxEng, 1);
    // from light green to dark green
    const l = 95 - intensity * 55;
    return `hsl(142, 60%, ${l}%)`;
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Best Posting Times (Taiwan Time, UTC+8)</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[650px]">
            {/* Hour labels */}
            <div className="flex ml-10">
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} className="flex-1 text-center text-[9px] text-muted-foreground">
                  {h}
                </div>
              ))}
            </div>
            {/* Grid rows */}
            {DAY_ORDER.map(day => (
              <div key={day} className="flex items-center gap-1">
                <span className="w-9 text-[10px] text-muted-foreground text-right pr-1">
                  {DAY_NAMES[day]}
                </span>
                <div className="flex flex-1 gap-[2px]">
                  {Array.from({ length: 24 }, (_, hour) => {
                    const key = `${day}-${hour}`;
                    const cell = grid[key];
                    const avg = cell && cell.count > 0 ? cell.total / cell.count : 0;
                    const hasData = cell && cell.count > 0;
                    return (
                      <div
                        key={hour}
                        className="flex-1 aspect-square rounded-[3px] relative group"
                        style={{
                          backgroundColor: hasData ? getColor(avg) : "hsl(var(--muted))",
                          minHeight: 16,
                        }}
                      >
                        {hasData && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10
                            bg-popover border rounded-md shadow-md px-2 py-1 text-[10px] whitespace-nowrap">
                            <div className="font-medium">{DAY_NAMES[day]} {hour}:00</div>
                            <div>{cell.count} posts</div>
                            <div>Avg eng: {pct(avg)}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-0.5">
            {[0, 0.25, 0.5, 0.75, 1].map(v => (
              <div key={v} className="w-4 h-3 rounded-[2px]" style={{ backgroundColor: getColor(v * maxEng) }} />
            ))}
          </div>
          <span>High engagement</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Section 16: Day of Week ────────────────────────────────────────
function DayOfWeekSection({ posts }: { posts: ThreadsPost[] }) {
  const data = useMemo(() => {
    const buckets: Record<number, ThreadsPost[]> = {};
    for (const p of posts) {
      const t = toTaiwanHourDay(p.posted_at);
      if (!t) continue;
      if (!buckets[t.day]) buckets[t.day] = [];
      buckets[t.day].push(p);
    }
    return DAY_ORDER.map(day => {
      const items = buckets[day] || [];
      const avgEng = items.length
        ? (items.reduce((s, p) => s + Number(p.engagement_rate), 0) / items.length) * 100
        : 0;
      const avgViews = items.length
        ? items.reduce((s, p) => s + p.views, 0) / items.length
        : 0;
      return {
        day: DAY_NAMES[day],
        avgEng: +avgEng.toFixed(3),
        count: items.length,
        avgViews: Math.round(avgViews),
      };
    });
  }, [posts]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Performance by Day of Week</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => v + "%"} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={tipStyle}
                formatter={(v: number, name: string) => [
                  name === "Avg Engagement %" ? v.toFixed(3) + "%" : v,
                  name,
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="avgEng" name="Avg Engagement %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="count" name="Posts" stroke="#f59e0b" strokeWidth={2} dot />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Export ──────────────────────────────────────────────────────────
export default function TimingSections({ range }: { range: DateRange }) {
  const postsQ = useAllPosts(range);
  const posts = postsQ.data || [];

  if (postsQ.isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[300px] rounded-lg" />
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    );
  }

  if (!posts.length) return null;

  return (
    <div className="space-y-6">
      <HeatmapSection posts={posts} />
      <DayOfWeekSection posts={posts} />
    </div>
  );
}
