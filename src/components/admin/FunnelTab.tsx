import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Activity, UserPlus, Wrench, AlertTriangle } from "lucide-react";

interface ToolStat {
  tool: string;
  count: number;
}

interface ErrorStat {
  source: string;
  count: number;
}

interface DayPoint {
  day: string; // YYYY-MM-DD
  count: number;
}

interface FunnelData {
  sessionsToday: number;
  signupsToday: number;
  conversionPct: number;
  topTools: ToolStat[];
  errors24h: number;
  errorsBySource: ErrorStat[];
  sessions7d: DayPoint[];
  loading: boolean;
}

const startOfTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const dayAgoISO = () => new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

export default function FunnelTab() {
  const [data, setData] = useState<FunnelData>({
    sessionsToday: 0,
    signupsToday: 0,
    conversionPct: 0,
    topTools: [],
    errors24h: 0,
    errorsBySource: [],
    sessions7d: [],
    loading: true,
  });

  useEffect(() => {
    const load = async () => {
      const todayStart = startOfTodayISO();
      const dayAgo = dayAgoISO();
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      const sevenDaysAgoISO = sevenDaysAgo.toISOString();

      const [sessionsRes, signupsRes, toolsRes, errorsRes, sessions7dRes] = await Promise.all([
        supabase
          .from("sessions")
          .select("id", { count: "exact", head: true })
          .gte("started_at", todayStart),
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .gte("created_at", todayStart),
        supabase
          .from("tool_completions")
          .select("tool")
          .gte("created_at", dayAgo)
          .limit(5000),
        supabase
          .from("error_log")
          .select("source")
          .gte("created_at", dayAgo)
          .limit(5000),
        supabase
          .from("sessions")
          .select("started_at")
          .gte("started_at", sevenDaysAgoISO)
          .limit(10000),
      ]);

      const sessionsToday = sessionsRes.count ?? 0;
      const signupsToday = signupsRes.count ?? 0;
      const conversionPct =
        sessionsToday > 0 ? Math.round((signupsToday / sessionsToday) * 1000) / 10 : 0;

      const toolCounts: Record<string, number> = {};
      (toolsRes.data ?? []).forEach((row: any) => {
        const k = row.tool || "unknown";
        toolCounts[k] = (toolCounts[k] || 0) + 1;
      });
      const topTools = Object.entries(toolCounts)
        .map(([tool, count]) => ({ tool, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const errorCounts: Record<string, number> = {};
      (errorsRes.data ?? []).forEach((row: any) => {
        const k = row.source || "unknown";
        errorCounts[k] = (errorCounts[k] || 0) + 1;
      });
      const errorsBySource = Object.entries(errorCounts)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      const errors24h = (errorsRes.data ?? []).length;

      // Build a 7-day series, zero-filled for missing days
      const buckets: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        buckets[d.toISOString().slice(0, 10)] = 0;
      }
      (sessions7dRes.data ?? []).forEach((row: any) => {
        const key = new Date(row.started_at).toISOString().slice(0, 10);
        if (key in buckets) buckets[key] += 1;
      });
      const sessions7d: DayPoint[] = Object.entries(buckets).map(([day, count]) => ({
        day,
        count,
      }));

      setData({
        sessionsToday,
        signupsToday,
        conversionPct,
        topTools,
        errors24h,
        errorsBySource,
        sessions7d,
        loading: false,
      });
    };
    load();
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard
          icon={<Activity className="w-4 h-4" />}
          label="Sessions today"
          value={data.sessionsToday.toLocaleString()}
          className="md:col-span-2"
          rightSlot={<Sparkline points={data.sessions7d} />}
        />
        <KpiCard
          icon={<UserPlus className="w-4 h-4" />}
          label="Signups today"
          value={data.signupsToday.toLocaleString()}
        />
        <KpiCard
          icon={<UserPlus className="w-4 h-4" />}
          label="Signup conversion"
          value={`${data.conversionPct}%`}
          hint={`${data.signupsToday} / ${data.sessionsToday}`}
        />
        <KpiCard
          icon={<AlertTriangle className="w-4 h-4" />}
          label="Errors (24h)"
          value={data.errors24h.toLocaleString()}
          tone={data.errors24h > 0 ? "warn" : "ok"}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Top Tools */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Top tools (24h)</h3>
            </div>
            {data.topTools.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tool completions yet</p>
            ) : (
              <div className="space-y-2">
                {data.topTools.map((t) => (
                  <BarRow key={t.tool} label={t.tool} value={t.count} max={data.topTools[0].count} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Errors by source */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Errors by source (24h)</h3>
            </div>
            {data.errorsBySource.length === 0 ? (
              <p className="text-sm text-muted-foreground">No errors logged 🎉</p>
            ) : (
              <div className="space-y-2">
                {data.errorsBySource.map((e) => (
                  <BarRow
                    key={e.source}
                    label={e.source}
                    value={e.count}
                    max={data.errorsBySource[0].count}
                    tone="warn"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  tone = "default",
  className = "",
  rightSlot,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "ok" | "warn";
  className?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              {icon}
              <span>{label}</span>
            </div>
            <div
              className={
                "text-2xl font-semibold " +
                (tone === "warn" ? "text-destructive" : "text-foreground")
              }
            >
              {value}
            </div>
            {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
          </div>
          {rightSlot && <div className="flex-1 min-w-0 max-w-[60%]">{rightSlot}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

function Sparkline({ points }: { points: { day: string; count: number }[] }) {
  if (!points.length) return null;
  const w = 160;
  const h = 44;
  const pad = 2;
  const max = Math.max(1, ...points.map((p) => p.count));
  const stepX = points.length > 1 ? (w - pad * 2) / (points.length - 1) : 0;
  const coords = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = h - pad - (p.count / max) * (h - pad * 2);
    return [x, y] as const;
  });
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1][0].toFixed(1)},${h - pad} L${coords[0][0].toFixed(1)},${h - pad} Z`;
  const last = coords[coords.length - 1];
  const total7d = points.reduce((sum, p) => sum + p.count, 0);
  const todayCount = points[points.length - 1]?.count ?? 0;
  return (
    <div className="flex flex-col items-end gap-1">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-11 text-primary"
        preserveAspectRatio="none"
        aria-label={`Sessions over the last 7 days, ${total7d} total`}
      >
        <path d={areaPath} fill="currentColor" opacity={0.12} />
        <path d={path} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={last[0]} cy={last[1]} r={2.5} fill="currentColor" />
      </svg>
      <div className="text-[10px] text-muted-foreground tabular-nums">
        7d: {total7d.toLocaleString()} · today {todayCount.toLocaleString()}
      </div>
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  tone = "default",
}: {
  label: string;
  value: number;
  max: number;
  tone?: "default" | "warn";
}) {
  const pct = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-foreground truncate max-w-[70%]">{label}</span>
        <span className="text-muted-foreground tabular-nums">{value.toLocaleString()}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={"h-full rounded-full " + (tone === "warn" ? "bg-destructive" : "bg-primary")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
