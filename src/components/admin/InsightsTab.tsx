import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format, subDays, startOfDay, differenceInDays, startOfWeek } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell,
} from "recharts";
import { TrendingUp, Users, FileText, Zap } from "lucide-react";

interface AccountUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

interface ResumeLead {
  overall_score: number | null;
  created_at: string;
}

interface AiUsageRow {
  user_id: string;
  usage_type: string;
  created_at: string;
}

interface DocRow {
  type: string;
  created_at: string;
}

interface ProfileRow {
  user_id: string;
  onboarding_completed: boolean | null;
  career_phase: string | null;
  created_at: string | null;
}

interface Props {
  accounts: AccountUser[];
  resumeLeads: ResumeLead[];
  aiUsageRows: AiUsageRow[];
  documents: DocRow[];
  profiles: ProfileRow[];
  emailLeadsCount: number;
}

const COLORS = {
  funnel: ["#7c3aed", "#0891b2", "#059669", "#d97706", "#db2777"],
  score: "#7c3aed",
  retention: "#059669",
  docs: "#0891b2",
};

export default function InsightsTab({ accounts, resumeLeads, aiUsageRows, documents, profiles, emailLeadsCount }: Props) {

  // ── 1. Conversion Funnel ────────────────────────────────────────────
  const funnel = useMemo(() => {
    const emailGate = emailLeadsCount;
    const signups = accounts.length;
    const onboarded = profiles.filter(p => p.onboarding_completed).length;
    const analyzedUsers = new Set(aiUsageRows.filter(r => r.usage_type === "analyze").map(r => r.user_id)).size;
    const docCreators = new Set(documents.map((d: any) => d.user_id)).size;

    return [
      { step: "Email Gate", value: emailGate },
      { step: "Signed Up", value: signups },
      { step: "Onboarded", value: onboarded },
      { step: "Used Analyzer", value: analyzedUsers },
      { step: "Created Doc", value: docCreators },
    ];
  }, [accounts, profiles, aiUsageRows, documents, emailLeadsCount]);

  // ── 2. Weekly Retention Cohorts ─────────────────────────────────────
  const cohorts = useMemo(() => {
    const now = new Date();
    const weeks: { label: string; start: Date; end: Date }[] = [];
    for (let i = 7; i >= 0; i--) {
      const start = startOfWeek(subDays(now, i * 7), { weekStartsOn: 1 });
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      weeks.push({ label: format(start, "MMM d"), start, end });
    }

    return weeks.map(w => {
      const cohortUsers = accounts.filter(a => {
        const d = new Date(a.created_at);
        return d >= w.start && d <= w.end;
      });
      const total = cohortUsers.length;
      const returned = cohortUsers.filter(a => {
        if (!a.last_sign_in_at) return false;
        const signIn = new Date(a.last_sign_in_at);
        const created = new Date(a.created_at);
        return differenceInDays(signIn, created) >= 1;
      }).length;
      return {
        week: w.label,
        total,
        returned,
        rate: total > 0 ? Math.round((returned / total) * 100) : 0,
      };
    }).filter(c => c.total > 0);
  }, [accounts]);

  // ── 3. Resume Score Distribution ────────────────────────────────────
  const scoreDist = useMemo(() => {
    const buckets: { range: string; count: number }[] = [];
    const ranges = [
      { range: "0-10", min: 0, max: 10 },
      { range: "11-20", min: 11, max: 20 },
      { range: "21-30", min: 21, max: 30 },
      { range: "31-40", min: 31, max: 40 },
      { range: "41-50", min: 41, max: 50 },
      { range: "51-60", min: 51, max: 60 },
      { range: "61-70", min: 61, max: 70 },
      { range: "71-80", min: 71, max: 80 },
      { range: "81-90", min: 81, max: 90 },
      { range: "91-100", min: 91, max: 100 },
    ];
    const scores = resumeLeads.map(r => r.overall_score).filter((s): s is number => s !== null);
    for (const r of ranges) {
      buckets.push({ range: r.range, count: scores.filter(s => s >= r.min && s <= r.max).length });
    }
    return { buckets, avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0, total: scores.length };
  }, [resumeLeads]);

  // ── 4. Document Creation Trends (30 days) ───────────────────────────
  const docTrend = useMemo(() => {
    const days = Array.from({ length: 30 }, (_, i) => format(startOfDay(subDays(new Date(), 29 - i)), "yyyy-MM-dd"));
    const byDay: Record<string, { resume: number; cover_letter: number }> = {};
    days.forEach(d => (byDay[d] = { resume: 0, cover_letter: 0 }));
    for (const doc of documents) {
      const day = format(new Date(doc.created_at), "yyyy-MM-dd");
      if (byDay[day]) {
        if (doc.type === "cover_letter") byDay[day].cover_letter++;
        else byDay[day].resume++;
      }
    }
    return days.map(d => ({ date: d, resume: byDay[d].resume, cover_letter: byDay[d].cover_letter }));
  }, [documents]);

  // ── 5. Career Phase Breakdown ───────────────────────────────────────
  const phaseBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    profiles.forEach(p => {
      const phase = p.career_phase || "not set";
      counts[phase] = (counts[phase] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([phase, count]) => ({ phase, count }));
  }, [profiles]);

  // ── 6. Feature Adoption (unique users per AI feature) ───────────────
  const featureAdoption = useMemo(() => {
    const byType: Record<string, Set<string>> = {};
    for (const r of aiUsageRows) {
      if (!byType[r.usage_type]) byType[r.usage_type] = new Set();
      byType[r.usage_type].add(r.user_id);
    }
    return Object.entries(byType)
      .map(([type, users]) => ({ type: type.replace(/_/g, " "), users: users.size, uses: aiUsageRows.filter(r => r.usage_type === type).length }))
      .sort((a, b) => b.users - a.users);
  }, [aiUsageRows]);

  return (
    <div className="space-y-8">
      {/* ── Conversion Funnel ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-violet-600" />
          <h2 className="font-semibold text-foreground">Conversion Funnel</h2>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {funnel.map((f, i) => {
            const prevVal = i > 0 ? funnel[i - 1].value : f.value;
            const dropoff = prevVal > 0 ? Math.round((f.value / prevVal) * 100) : 100;
            return (
              <Card key={f.step} className="text-center overflow-hidden">
                <div className="h-1" style={{ backgroundColor: COLORS.funnel[i] }} />
                <CardContent className="p-3">
                  <p className="text-2xl font-bold text-foreground">{f.value.toLocaleString()}</p>
                  <p className="text-[11px] text-muted-foreground">{f.step}</p>
                  {i > 0 && (
                    <p className="text-[10px] mt-1" style={{ color: COLORS.funnel[i] }}>
                      {dropoff}% of prev
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Retention Cohorts ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-emerald-600" />
          <h2 className="font-semibold text-foreground">Weekly Retention Cohorts</h2>
          <span className="text-xs text-muted-foreground">Users who returned ≥1 day after signup</span>
        </div>
        {cohorts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Not enough data yet</p>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cohorts} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                    <Tooltip
                      formatter={(value: any, name: string) => [value, name === "total" ? "Signups" : "Returned"]}
                      labelFormatter={(v) => `Week of ${v}`}
                    />
                    <Bar dataKey="total" fill="#e2e8f0" name="Signups" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="returned" fill={COLORS.retention} name="Returned" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-3 mt-3 flex-wrap">
                {cohorts.map(c => (
                  <span key={c.week} className="text-xs text-muted-foreground">
                    {c.week}: <span className="font-semibold text-foreground">{c.rate}%</span> ({c.returned}/{c.total})
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── Score Distribution + Career Phase ── */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-violet-600" />
            <h2 className="font-semibold text-foreground">Resume Score Distribution</h2>
            <span className="text-xs text-muted-foreground">{scoreDist.total} scores · avg {scoreDist.avg}</span>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreDist.buckets} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <XAxis dataKey="range" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill={COLORS.score} radius={[2, 2, 0, 0]}>
                      {scoreDist.buckets.map((_, i) => (
                        <Cell key={i} fill={i >= 7 ? "#059669" : i >= 4 ? "#d97706" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-amber-600" />
            <h2 className="font-semibold text-foreground">Career Phase Breakdown</h2>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {phaseBreakdown.map(p => {
                  const maxCount = Math.max(...phaseBreakdown.map(x => x.count), 1);
                  const pct = Math.round((p.count / maxCount) * 100);
                  return (
                    <div key={p.phase} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground capitalize w-24 truncate">{p.phase.replace(/_/g, " ")}</span>
                      <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                        <div className="h-full bg-amber-500 rounded" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-sm font-semibold tabular-nums w-8 text-right">{p.count}</span>
                    </div>
                  );
                })}
                {phaseBreakdown.length === 0 && <p className="text-sm text-muted-foreground">No profile data yet</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Document Creation Trend ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-cyan-600" />
          <h2 className="font-semibold text-foreground">Document Creation (30 days)</h2>
          <span className="text-xs text-muted-foreground">{documents.length} total documents</span>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={docTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={v => format(new Date(v), "M/d")} />
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip labelFormatter={v => format(new Date(v as string), "MMM d, yyyy")} />
                  <Bar dataKey="resume" stackId="a" fill="#7c3aed" name="Resumes" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="cover_letter" stackId="a" fill="#0891b2" name="Cover Letters" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Feature Adoption ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-cyan-600" />
          <h2 className="font-semibold text-foreground">Feature Adoption (Unique Users)</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featureAdoption.map(f => (
            <Card key={f.type}>
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-foreground">{f.users}</p>
                <p className="text-[11px] text-muted-foreground capitalize">{f.type}</p>
                <p className="text-[10px] text-muted-foreground">{f.uses} total uses</p>
              </CardContent>
            </Card>
          ))}
          {featureAdoption.length === 0 && <p className="text-sm text-muted-foreground col-span-4">No AI usage data yet</p>}
        </div>
      </div>
    </div>
  );
}
