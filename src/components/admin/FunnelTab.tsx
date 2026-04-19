import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Loader2, Activity, UserPlus, Wrench, AlertTriangle, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface ToolStat {
  tool: string;
  count: number;
}

interface ErrorStat {
  source: string;
  count: number;
}

interface DayPoint {
  day: string;
  count: number;
}

interface ErrorRow {
  id: string;
  created_at: string;
  source: string;
  message: string;
  page: string | null;
  stack: string | null;
  metadata: any;
  anon_id: string | null;
  user_id: string | null;
}

type RangeKey = "24h" | "7d" | "30d";

const RANGES: { key: RangeKey; label: string; hours: number; sparkDays: number }[] = [
  { key: "24h", label: "24h", hours: 24, sparkDays: 7 },
  { key: "7d", label: "7d", hours: 24 * 7, sparkDays: 7 },
  { key: "30d", label: "30d", hours: 24 * 30, sparkDays: 30 },
];

interface FunnelData {
  sessionsCount: number;
  signupsCount: number;
  conversionPct: number;
  topTools: ToolStat[];
  errorsCount: number;
  errorsBySource: ErrorStat[];
  sessionsSpark: DayPoint[];
  loading: boolean;
}

export default function FunnelTab() {
  const [range, setRange] = useState<RangeKey>("24h");
  const [data, setData] = useState<FunnelData>({
    sessionsCount: 0,
    signupsCount: 0,
    conversionPct: 0,
    topTools: [],
    errorsCount: 0,
    errorsBySource: [],
    sessionsSpark: [],
    loading: true,
  });
  const [openSource, setOpenSource] = useState<string | null>(null);
  const [drawerRows, setDrawerRows] = useState<ErrorRow[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);

  useEffect(() => {
    const cfg = RANGES.find((r) => r.key === range)!;
    const load = async () => {
      setData((d) => ({ ...d, loading: true }));
      const sinceISO = new Date(Date.now() - cfg.hours * 60 * 60 * 1000).toISOString();
      const sparkStart = new Date();
      sparkStart.setHours(0, 0, 0, 0);
      sparkStart.setDate(sparkStart.getDate() - (cfg.sparkDays - 1));
      const sparkStartISO = sparkStart.toISOString();

      const [sessionsRes, signupsRes, toolsRes, errorsRes, sparkRes] = await Promise.all([
        supabase
          .from("sessions")
          .select("id", { count: "exact", head: true })
          .gte("started_at", sinceISO),
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .gte("created_at", sinceISO),
        supabase
          .from("tool_completions")
          .select("tool")
          .gte("created_at", sinceISO)
          .limit(10000),
        supabase
          .from("error_log")
          .select("source")
          .gte("created_at", sinceISO)
          .limit(10000),
        supabase
          .from("sessions")
          .select("started_at")
          .gte("started_at", sparkStartISO)
          .limit(20000),
      ]);

      const sessionsCount = sessionsRes.count ?? 0;
      const signupsCount = signupsRes.count ?? 0;
      const conversionPct =
        sessionsCount > 0 ? Math.round((signupsCount / sessionsCount) * 1000) / 10 : 0;

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

      const buckets: Record<string, number> = {};
      for (let i = cfg.sparkDays - 1; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        buckets[d.toISOString().slice(0, 10)] = 0;
      }
      (sparkRes.data ?? []).forEach((row: any) => {
        const key = new Date(row.started_at).toISOString().slice(0, 10);
        if (key in buckets) buckets[key] += 1;
      });
      const sessionsSpark: DayPoint[] = Object.entries(buckets).map(([day, count]) => ({
        day,
        count,
      }));

      setData({
        sessionsCount,
        signupsCount,
        conversionPct,
        topTools,
        errorsCount: (errorsRes.data ?? []).length,
        errorsBySource,
        sessionsSpark,
        loading: false,
      });
    };
    load();
  }, [range]);

  const openErrorDrawer = async (source: string) => {
    setOpenSource(source);
    setDrawerLoading(true);
    setDrawerRows([]);
    const { data: rows, error } = await supabase
      .from("error_log")
      .select("id, created_at, source, message, page, stack, metadata, anon_id, user_id")
      .eq("source", source)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) {
      console.warn("[FunnelTab] error_log fetch failed:", error.message);
    }
    setDrawerRows((rows ?? []) as ErrorRow[]);
    setDrawerLoading(false);
  };

  const rangeLabel = RANGES.find((r) => r.key === range)!.label;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing data for the last <span className="font-medium text-foreground">{rangeLabel}</span>
        </p>
        <div className="inline-flex rounded-lg border border-border bg-card p-0.5" role="tablist" aria-label="Time range">
          {RANGES.map((r) => {
            const active = r.key === range;
            return (
              <button
                key={r.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setRange(r.key)}
                className={
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {data.loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard
          icon={<Activity className="w-4 h-4" />}
          label={`Sessions (${rangeLabel})`}
          value={data.sessionsCount.toLocaleString()}
          className="md:col-span-2"
          rightSlot={<Sparkline points={data.sessionsSpark} />}
        />
        <KpiCard
          icon={<UserPlus className="w-4 h-4" />}
          label={`Signups (${rangeLabel})`}
          value={data.signupsCount.toLocaleString()}
        />
        <KpiCard
          icon={<UserPlus className="w-4 h-4" />}
          label="Signup conversion"
          value={`${data.conversionPct}%`}
          hint={`${data.signupsCount} / ${data.sessionsCount}`}
        />
        <KpiCard
          icon={<AlertTriangle className="w-4 h-4" />}
          label={`Errors (${rangeLabel})`}
          value={data.errorsCount.toLocaleString()}
          tone={data.errorsCount > 0 ? "warn" : "ok"}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Top tools ({rangeLabel})</h3>
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

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Errors by source ({rangeLabel})</h3>
            </div>
            {data.errorsBySource.length === 0 ? (
              <p className="text-sm text-muted-foreground">No errors logged 🎉</p>
            ) : (
              <div className="space-y-2">
                {data.errorsBySource.map((e) => (
                  <button
                    key={e.source}
                    type="button"
                    onClick={() => openErrorDrawer(e.source)}
                    className="w-full text-left rounded-md p-2 -m-2 transition-colors hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring group"
                    aria-label={`View latest errors for ${e.source}`}
                  >
                    <BarRow
                      label={e.source}
                      value={e.count}
                      max={data.errorsBySource[0].count}
                      tone="warn"
                      trailing={
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      }
                    />
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
        </>
      )}

      <Sheet open={!!openSource} onOpenChange={(o) => !o && setOpenSource(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="font-mono">{openSource}</span>
            </SheetTitle>
            <SheetDescription>Latest 20 errors for this source</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-3">
            {drawerLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : drawerRows.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No rows found</p>
            ) : (
              drawerRows.map((r) => (
                <div key={r.id} className="rounded-lg border border-border bg-card p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground tabular-nums">
                    <span>{format(new Date(r.created_at), "MMM d, HH:mm:ss")}</span>
                    {r.page && <span className="truncate font-mono max-w-[60%]">{r.page}</span>}
                  </div>
                  <p className="text-sm text-foreground break-words">{r.message}</p>
                  {r.stack && (
                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer hover:text-foreground">Stack trace</summary>
                      <pre className="mt-1 whitespace-pre-wrap break-all font-mono text-[11px] bg-muted/50 p-2 rounded max-h-48 overflow-auto">
                        {r.stack}
                      </pre>
                    </details>
                  )}
                  {(r.anon_id || r.user_id) && (
                    <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground font-mono pt-1">
                      {r.user_id && <span>user: {r.user_id.slice(0, 8)}</span>}
                      {r.anon_id && <span>anon: {r.anon_id.slice(0, 8)}</span>}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
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
  trailing,
}: {
  label: string;
  value: number;
  max: number;
  tone?: "default" | "warn";
  trailing?: React.ReactNode;
}) {
  const pct = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs gap-2">
        <span className="font-mono text-foreground truncate max-w-[70%]">{label}</span>
        <span className="text-muted-foreground tabular-nums flex items-center gap-1">
          {value.toLocaleString()}
          {trailing}
        </span>
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
