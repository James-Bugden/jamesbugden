import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format, subDays, startOfDay, differenceInDays, startOfWeek } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, LineChart, Line,
} from "recharts";
import { TrendingUp, Users, FileText, Zap, Globe, Share2, BarChart3, BookOpen } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface AccountUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

interface ResumeLead {
  email: string;
  overall_score: number | null;
  language: string | null;
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
  user_id: string;
}

interface ProfileRow {
  user_id: string;
  onboarding_completed: boolean | null;
  career_phase: string | null;
  created_at: string | null;
}

interface EventTrack {
  event_type: string;
  event_name: string;
  page: string;
  created_at: string;
}

interface ShareClick {
  channel: string;
  page: string;
  created_at: string;
}

interface SalaryCheck {
  role: string;
  sector: string | null;
  lang: string | null;
  created_at: string;
}

interface GuideProgressRow {
  guide_key: string;
  user_id: string;
  data: any;
}

interface FeedbackItem {
  id: string;
  message: string;
  page: string | null;
  type: string | null;
  rating: number | null;
  context: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

export interface InsightsTabProps {
  accounts: AccountUser[];
  resumeLeads: ResumeLead[];
  aiUsageRows: AiUsageRow[];
  documents: DocRow[];
  profiles: ProfileRow[];
  emailLeadsCount: number;
  eventTracks: EventTrack[];
  shareClicks: ShareClick[];
  salaryChecks: SalaryCheck[];
  guideProgress: GuideProgressRow[];
  analyticsData?: {
    feedbackItems: FeedbackItem[];
    shareClicksLoading: boolean;
    eventTracksLoading: boolean;
  };
}

const COLORS = {
  funnel: ["#7c3aed", "#0891b2", "#059669", "#d97706", "#db2777"],
  score: "#7c3aed",
  retention: "#059669",
  docs: "#0891b2",
};

export default function InsightsTab({
  accounts, resumeLeads, aiUsageRows, documents, profiles,
  emailLeadsCount, eventTracks, shareClicks, salaryChecks, guideProgress,
  analyticsData,
}: InsightsTabProps) {

  // ══════════════════════════════════════════════════════════════════════
  // 1. DAU / WAU from event_tracks
  // ══════════════════════════════════════════════════════════════════════
  const dauWau = useMemo(() => {
    const days = Array.from({ length: 30 }, (_, i) => format(startOfDay(subDays(new Date(), 29 - i)), "yyyy-MM-dd"));
    const byDay: Record<string, Set<string>> = {};
    days.forEach(d => (byDay[d] = new Set()));

    for (const e of eventTracks) {
      const day = format(new Date(e.created_at), "yyyy-MM-dd");
      if (byDay[day]) {
        // Use page as pseudo-session identifier for anonymous; for logged-in it would be user_id
        // event_tracks don't have user_id, so we count unique page+event combos as proxy
        byDay[day].add(e.page + "|" + e.event_type);
      }
    }

    const trend = days.map(d => ({ date: d, dau: byDay[d].size }));
    // WAU = average unique daily sessions over last 7 days
    const last7 = trend.slice(-7);
    const wau = Math.round(last7.reduce((s, d) => s + d.dau, 0) / Math.max(last7.length, 1));
    const todayDau = trend[trend.length - 1]?.dau || 0;

    return { trend, wau, todayDau };
  }, [eventTracks]);

  // ══════════════════════════════════════════════════════════════════════
  // 2. Conversion Funnel
  // ══════════════════════════════════════════════════════════════════════
  const funnel = useMemo(() => {
    const emailGate = emailLeadsCount;
    const signups = accounts.length;
    const onboarded = profiles.filter(p => p.onboarding_completed).length;
    const analyzedUsers = new Set(aiUsageRows.filter(r => r.usage_type === "analyze").map(r => r.user_id)).size;
    const docCreators = new Set(documents.map(d => d.user_id)).size;

    return [
      { step: "Email Gate", value: emailGate },
      { step: "Signed Up", value: signups },
      { step: "Onboarded", value: onboarded },
      { step: "Used Analyzer", value: analyzedUsers },
      { step: "Created Doc", value: docCreators },
    ];
  }, [accounts, profiles, aiUsageRows, documents, emailLeadsCount]);

  // ══════════════════════════════════════════════════════════════════════
  // 3. Resume Analyzer Conversion (free analysis → signup)
  // ══════════════════════════════════════════════════════════════════════
  const analyzerConversion = useMemo(() => {
    const accountEmails = new Set(accounts.map(a => a.email?.toLowerCase()));
    const leadEmails = new Set(resumeLeads.map(r => r.email?.toLowerCase()));
    const converted = [...leadEmails].filter(e => accountEmails.has(e)).length;
    const total = leadEmails.size;
    const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
    return { total, converted, rate };
  }, [resumeLeads, accounts]);

  // ══════════════════════════════════════════════════════════════════════
  // 4. Weekly Retention Cohorts
  // ══════════════════════════════════════════════════════════════════════
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
        return differenceInDays(new Date(a.last_sign_in_at), new Date(a.created_at)) >= 1;
      }).length;
      return { week: w.label, total, returned, rate: total > 0 ? Math.round((returned / total) * 100) : 0 };
    }).filter(c => c.total > 0);
  }, [accounts]);

  // ══════════════════════════════════════════════════════════════════════
  // 5. Resume Score Distribution
  // ══════════════════════════════════════════════════════════════════════
  const scoreDist = useMemo(() => {
    const ranges = [
      { range: "0-10", min: 0, max: 10 }, { range: "11-20", min: 11, max: 20 },
      { range: "21-30", min: 21, max: 30 }, { range: "31-40", min: 31, max: 40 },
      { range: "41-50", min: 41, max: 50 }, { range: "51-60", min: 51, max: 60 },
      { range: "61-70", min: 61, max: 70 }, { range: "71-80", min: 71, max: 80 },
      { range: "81-90", min: 81, max: 90 }, { range: "91-100", min: 91, max: 100 },
    ];
    const scores = resumeLeads.map(r => r.overall_score).filter((s): s is number => s !== null);
    const buckets = ranges.map(r => ({ range: r.range, count: scores.filter(s => s >= r.min && s <= r.max).length }));
    return { buckets, avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0, total: scores.length };
  }, [resumeLeads]);

  // ══════════════════════════════════════════════════════════════════════
  // 6. Guide Completion Rates
  // ══════════════════════════════════════════════════════════════════════
  const guideCompletion = useMemo(() => {
    const byGuide: Record<string, { started: number; completed: number }> = {};
    for (const gp of guideProgress) {
      if (!byGuide[gp.guide_key]) byGuide[gp.guide_key] = { started: 0, completed: 0 };
      byGuide[gp.guide_key].started++;
      // Check if guide data has completion indicators
      const data = gp.data;
      if (data && typeof data === "object") {
        const checked = Object.values(data).filter(v => v === true).length;
        const total = Object.keys(data).length;
        if (total > 0 && checked / total >= 0.8) byGuide[gp.guide_key].completed++;
      }
    }
    return Object.entries(byGuide)
      .map(([guide, { started, completed }]) => ({
        guide: guide.replace(/_/g, " ").replace(/^guide /, ""),
        started,
        completed,
        rate: started > 0 ? Math.round((completed / started) * 100) : 0,
      }))
      .sort((a, b) => b.started - a.started);
  }, [guideProgress]);

  // ══════════════════════════════════════════════════════════════════════
  // 7. Document Creation Trends (30 days)
  // ══════════════════════════════════════════════════════════════════════
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

  // ══════════════════════════════════════════════════════════════════════
  // 8. Career Phase Breakdown
  // ══════════════════════════════════════════════════════════════════════
  const phaseBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    profiles.forEach(p => {
      const phase = p.career_phase || "not set";
      counts[phase] = (counts[phase] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([phase, count]) => ({ phase, count }));
  }, [profiles]);

  // ══════════════════════════════════════════════════════════════════════
  // 9. Feature Adoption (unique users per AI feature)
  // ══════════════════════════════════════════════════════════════════════
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

  // ══════════════════════════════════════════════════════════════════════
  // 10. Salary Checker Demand by Role & Sector
  // ══════════════════════════════════════════════════════════════════════
  const salaryDemand = useMemo(() => {
    const byRole: Record<string, number> = {};
    const bySector: Record<string, number> = {};
    for (const c of salaryChecks) {
      byRole[c.role] = (byRole[c.role] || 0) + 1;
      if (c.sector) bySector[c.sector] = (bySector[c.sector] || 0) + 1;
    }
    const topRoles = Object.entries(byRole).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const topSectors = Object.entries(bySector).sort((a, b) => b[1] - a[1]).slice(0, 8);
    return { topRoles, topSectors };
  }, [salaryChecks]);

  // ══════════════════════════════════════════════════════════════════════
  // 11. Language Split (EN vs ZH-TW)
  // ══════════════════════════════════════════════════════════════════════
  const langSplit = useMemo(() => {
    const fromLeads: Record<string, number> = {};
    resumeLeads.forEach(r => {
      const lang = (r.language || "en").toLowerCase();
      fromLeads[lang] = (fromLeads[lang] || 0) + 1;
    });
    const fromSalary: Record<string, number> = {};
    salaryChecks.forEach(c => {
      const lang = (c.lang || "en").toLowerCase();
      fromSalary[lang] = (fromSalary[lang] || 0) + 1;
    });
    // Merge
    const all: Record<string, number> = {};
    for (const [k, v] of Object.entries(fromLeads)) all[k] = (all[k] || 0) + v;
    for (const [k, v] of Object.entries(fromSalary)) all[k] = (all[k] || 0) + v;
    const total = Object.values(all).reduce((a, b) => a + b, 0);
    return Object.entries(all)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, count]) => ({ lang: lang.toUpperCase(), count, pct: total > 0 ? Math.round((count / total) * 100) : 0 }));
  }, [resumeLeads, salaryChecks]);

  // ══════════════════════════════════════════════════════════════════════
  // 12. Share Virality — Top pages & channels with conversion
  // ══════════════════════════════════════════════════════════════════════
  const shareVirality = useMemo(() => {
    const byPage: Record<string, Record<string, number>> = {};
    for (const s of shareClicks) {
      if (!byPage[s.page]) byPage[s.page] = {};
      byPage[s.page][s.channel] = (byPage[s.page][s.channel] || 0) + 1;
    }
    const pages = Object.entries(byPage)
      .map(([page, channels]) => ({
        page,
        total: Object.values(channels).reduce((a, b) => a + b, 0),
        channels,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
    return pages;
  }, [shareClicks]);

  // ══════════════════════════════════════════════════════════════════════
  // 13. Popular Guides (from event_tracks guide_view events)
  // ══════════════════════════════════════════════════════════════════════
  const popularGuides = useMemo(() => {
    const counts: Record<string, number> = {};
    eventTracks.filter(e => e.event_type === "guide_view").forEach(e => {
      counts[e.event_name] = (counts[e.event_name] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10)
      .map(([guide, views]) => ({ guide: guide.replace(/^guide_/, "").replace(/_/g, " "), views }));
  }, [eventTracks]);

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className="space-y-8">

      {/* ── DAU / WAU ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <h2 className="font-semibold text-foreground">Daily Active Sessions (30 days)</h2>
          <span className="text-xs text-muted-foreground">Today: {dauWau.todayDau} · WAU avg: {dauWau.wau}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Unique page+event combinations per day — a proxy for how many distinct user sessions happen daily. WAU is the 7-day rolling average.</p>
        <Card>
          <CardContent className="p-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dauWau.trend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={v => format(new Date(v), "M/d")} />
                  <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                  <Tooltip labelFormatter={v => format(new Date(v as string), "MMM d, yyyy")} />
                  <Area type="monotone" dataKey="dau" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Conversion Funnel ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-violet-600" />
          <h2 className="font-semibold text-foreground">Conversion Funnel</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Tracks the user journey from first contact to active usage: Email Gate (entered email) → Signed Up (created account) → Onboarded (completed setup) → Used Analyzer → Created a document. Percentages show step-to-step conversion.</p>
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
                  {i > 0 && <p className="text-[10px] mt-1" style={{ color: COLORS.funnel[i] }}>{dropoff}% of prev</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Analyzer Conversion callout */}
        <div className="mt-3 rounded-lg border border-border bg-card p-3 flex items-center gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Resume Analyzer → Signup Conversion</p>
            <p className="text-xl font-bold text-foreground">{analyzerConversion.rate}%</p>
          </div>
          <p className="text-xs text-muted-foreground">{analyzerConversion.converted} of {analyzerConversion.total} unique analyzer users signed up</p>
        </div>
      </div>

      {/* ── Retention Cohorts ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-emerald-600" />
          <h2 className="font-semibold text-foreground">Weekly Retention Cohorts</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Groups users by the week they signed up and shows how many returned at least 1 day later. Higher retention % means users find ongoing value. Gray bars = total signups that week, green bars = users who came back.</p>
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
                    <Tooltip formatter={(value: any, name: string) => [value, name === "total" ? "Signups" : "Returned"]} labelFormatter={(v) => `Week of ${v}`} />
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
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-violet-600" />
            <h2 className="font-semibold text-foreground">Resume Score Distribution</h2>
            <span className="text-xs text-muted-foreground">{scoreDist.total} scores · avg {scoreDist.avg}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Histogram of all resume analysis scores. Red (0-40) = needs major work, amber (41-70) = decent but improvable, green (71-100) = strong resumes. Shows where most users land and the quality gap.</p>
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

      {/* ── Guide Completion + Popular Guides ── */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h2 className="font-semibold text-foreground">Guide Completion Rates</h2>
          </div>
          <Card>
            <CardContent className="p-4">
              {guideCompletion.length === 0 ? (
                <p className="text-sm text-muted-foreground">No guide progress data yet</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {guideCompletion.map(g => (
                    <div key={g.guide} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground capitalize w-32 truncate" title={g.guide}>{g.guide}</span>
                      <div className="flex-1 h-4 bg-muted rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded" style={{ width: `${g.rate}%` }} />
                      </div>
                      <span className="text-xs tabular-nums text-foreground w-12 text-right">{g.rate}%</span>
                      <span className="text-[10px] text-muted-foreground w-12 text-right">{g.completed}/{g.started}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-violet-600" />
            <h2 className="font-semibold text-foreground">Popular Guides (by views)</h2>
          </div>
          <Card>
            <CardContent className="p-4">
              {popularGuides.length === 0 ? (
                <p className="text-sm text-muted-foreground">No guide view data yet</p>
              ) : (
                <div className="space-y-1.5">
                  {popularGuides.map(g => (
                    <div key={g.guide} className="flex items-center justify-between text-sm">
                      <span className="capitalize text-muted-foreground truncate">{g.guide}</span>
                      <span className="font-semibold tabular-nums">{g.views}</span>
                    </div>
                  ))}
                </div>
              )}
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
                  <Bar dataKey="resume" stackId="a" fill="#7c3aed" name="Resumes" />
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

      {/* ── Salary Demand + Language Split ── */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> Top Searched Roles
            </h3>
            {salaryDemand.topRoles.length === 0 ? (
              <p className="text-sm text-muted-foreground">No salary checks yet</p>
            ) : (
              <div className="space-y-1.5">
                {salaryDemand.topRoles.map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between text-sm">
                    <span className="truncate text-muted-foreground">{role}</span>
                    <span className="font-semibold tabular-nums">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> Top Sectors
            </h3>
            {salaryDemand.topSectors.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sector data</p>
            ) : (
              <div className="space-y-1.5">
                {salaryDemand.topSectors.map(([sector, count]) => (
                  <div key={sector} className="flex items-center justify-between text-sm">
                    <span className="truncate text-muted-foreground">{sector}</span>
                    <span className="font-semibold tabular-nums">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1">
              <Globe className="w-3 h-3" /> Language Split
            </h3>
            {langSplit.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data</p>
            ) : (
              <div className="space-y-2">
                {langSplit.map(l => (
                  <div key={l.lang} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">{l.lang}</span>
                    <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-blue-500 rounded" style={{ width: `${l.pct}%` }} />
                    </div>
                    <span className="text-sm tabular-nums text-foreground">{l.pct}%</span>
                    <span className="text-xs text-muted-foreground">({l.count})</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Share Virality ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-4 h-4 text-indigo-600" />
          <h2 className="font-semibold text-foreground">Share Virality — Top Pages</h2>
          <span className="text-xs text-muted-foreground">{shareClicks.length} total shares</span>
        </div>
        {shareVirality.length === 0 ? (
          <p className="text-sm text-muted-foreground">No share data yet</p>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {shareVirality.map(p => (
                  <div key={p.page} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground truncate flex-1" title={p.page}>{p.page}</span>
                    <div className="flex gap-1.5">
                      {Object.entries(p.channels).map(([ch, count]) => (
                        <span key={ch} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">
                          {ch} {count}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-semibold tabular-nums w-8 text-right">{p.total}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── Raw Analytics (collapsible) ── */}
      {analyticsData && !analyticsData.shareClicksLoading && !analyticsData.eventTracksLoading && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm font-semibold text-foreground hover:text-primary transition-colors select-none">
            📊 Raw Analytics Data (Share Clicks & Events)
          </summary>
          <div className="mt-4 space-y-8">
            {/* Share clicks */}
            {(() => {
              const byChannel: Record<string, number> = {};
              const bySharePage: Record<string, number> = {};
              shareClicks.forEach(c => {
                byChannel[c.channel] = (byChannel[c.channel] || 0) + 1;
                bySharePage[c.page] = (bySharePage[c.page] || 0) + 1;
              });
              const channelEntries = Object.entries(byChannel).sort((a, b) => b[1] - a[1]);
              const sharePageEntries = Object.entries(bySharePage).sort((a, b) => b[1] - a[1]);

              return (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="w-4 h-4 text-indigo-600" />
                    <h2 className="font-semibold text-foreground">Share Clicks</h2>
                    <span className="text-xs text-muted-foreground ml-1">{shareClicks.length} total</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Card>
                      <CardContent className="pt-5 pb-4 px-5">
                        <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3">By Channel</h3>
                        <div className="space-y-1.5">
                          {channelEntries.map(([ch, count]) => (
                            <div key={ch} className="flex items-center justify-between text-sm">
                              <span className="capitalize">{ch}</span>
                              <span className="font-semibold tabular-nums">{count}</span>
                            </div>
                          ))}
                          {channelEntries.length === 0 && <p className="text-sm text-muted-foreground">No share clicks</p>}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-5 pb-4 px-5">
                        <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3">Top Shared Pages</h3>
                        <div className="space-y-1.5">
                          {sharePageEntries.slice(0, 8).map(([pg, count]) => (
                            <div key={pg} className="flex items-center justify-between text-sm gap-2">
                              <span className="truncate text-muted-foreground" title={pg}>{pg}</span>
                              <span className="font-semibold tabular-nums shrink-0">{count}</span>
                            </div>
                          ))}
                          {sharePageEntries.length === 0 && <p className="text-sm text-muted-foreground">No share clicks</p>}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })()}

            <div className="border-t border-border" />

            {/* Guide Engagement */}
            {(() => {
              const guideViews: Record<string, number> = {};
              eventTracks.filter(e => e.event_type === "guide_view").forEach(e => {
                guideViews[e.event_name] = (guideViews[e.event_name] || 0) + 1;
              });
              const guideRatings: Record<string, { up: number; down: number }> = {};
              (analyticsData.feedbackItems || []).filter(f => f.type === "inline_rating" && f.context).forEach(f => {
                const key = f.context!;
                if (!guideRatings[key]) guideRatings[key] = { up: 0, down: 0 };
                if (f.rating === 1) guideRatings[key].up++;
                else if (f.rating === -1) guideRatings[key].down++;
              });
              const allGuideIds = new Set([...Object.keys(guideViews), ...Object.keys(guideRatings)]);
              const guideEngagement = Array.from(allGuideIds).map(id => ({
                id,
                visits: guideViews[id] || 0,
                up: guideRatings[id]?.up || 0,
                down: guideRatings[id]?.down || 0,
                approval: guideRatings[id] ? Math.round((guideRatings[id].up / (guideRatings[id].up + guideRatings[id].down)) * 100) || 0 : null,
              })).sort((a, b) => b.visits - a.visits);

              return guideEngagement.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <h2 className="font-semibold text-foreground">Guide Engagement</h2>
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-1.5">
                        {guideEngagement.map(g => (
                          <div key={g.id} className="flex items-center gap-3 text-sm">
                            <span className="capitalize text-muted-foreground truncate flex-1">{g.id.replace(/^guide_/, "").replace(/_/g, " ")}</span>
                            <span className="tabular-nums font-semibold w-12 text-right">{g.visits}</span>
                            <span className="text-emerald-600 tabular-nums w-8 text-right">{g.up}</span>
                            <span className="text-red-500 tabular-nums w-8 text-right">{g.down}</span>
                            <span className="tabular-nums w-12 text-right">{g.approval !== null ? `${g.approval}%` : "—"}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : null;
            })()}

            <div className="border-t border-border" />

            {/* Event tracks */}
            {(() => {
              const byType: Record<string, number> = {};
              const byName: Record<string, number> = {};
              eventTracks.forEach(e => {
                byType[e.event_type] = (byType[e.event_type] || 0) + 1;
                byName[e.event_name] = (byName[e.event_name] || 0) + 1;
              });
              const typeEntries = Object.entries(byType).sort((a, b) => b[1] - a[1]);
              const nameEntries = Object.entries(byName).sort((a, b) => b[1] - a[1]);

              return (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                    <h2 className="font-semibold text-foreground">User Events</h2>
                    <span className="text-xs text-muted-foreground ml-1">{eventTracks.length} total</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-5 pb-4 px-5">
                        <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3">By Type</h3>
                        <div className="space-y-1.5">
                          {typeEntries.map(([t, count]) => (
                            <div key={t} className="flex items-center justify-between text-sm">
                              <span className="capitalize">{t.replace(/_/g, " ")}</span>
                              <span className="font-semibold tabular-nums">{count}</span>
                            </div>
                          ))}
                          {typeEntries.length === 0 && <p className="text-sm text-muted-foreground">No events</p>}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-5 pb-4 px-5">
                        <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-3">By Action</h3>
                        <div className="space-y-1.5">
                          {nameEntries.map(([n, count]) => (
                            <div key={n} className="flex items-center justify-between text-sm">
                              <span className="capitalize">{n.replace(/_/g, " ")}</span>
                              <span className="font-semibold tabular-nums">{count}</span>
                            </div>
                          ))}
                          {nameEntries.length === 0 && <p className="text-sm text-muted-foreground">No events</p>}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })()}
          </div>
        </details>
      )}

    </div>
  );
}
