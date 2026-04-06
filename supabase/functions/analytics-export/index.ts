import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "x-api-key, content-type",
};

function rangeStart(range: string | null): string | null {
  if (!range) return null;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : null;
  if (!days) return null;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function fmt(d: Date): string {
  return d.toISOString().split("T")[0];
}

function daysArray(n: number): string[] {
  const arr: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    arr.push(fmt(d));
  }
  return arr;
}

function startOfWeek(d: Date): Date {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  const r = new Date(d);
  r.setDate(diff);
  r.setHours(0, 0, 0, 0);
  return r;
}

const ALL_TABLES = [
  "resume_leads",
  "email_gate_leads",
  "salary_checks",
  "event_tracks",
  "share_clicks",
  "feedback",
  "threads_posts",
  "threads_user_insights",
  "threads_demographics",
  "threads_link_clicks",
  "ai_usage_log",
  "resume_analyses",
] as const;

// ── Insights computation helpers ──────────────────────────────────

function computeDAUWAU(eventTracks: any[]) {
  const days = daysArray(30);
  const byDay: Record<string, Set<string>> = {};
  days.forEach(d => (byDay[d] = new Set()));

  for (const e of eventTracks) {
    const day = e.created_at?.split("T")[0];
    if (day && byDay[day]) {
      byDay[day].add(e.page + "|" + e.event_type);
    }
  }

  const trend = days.map(d => ({ date: d, dau: byDay[d].size }));
  const last7 = trend.slice(-7);
  const wau = Math.round(last7.reduce((s, d) => s + d.dau, 0) / Math.max(last7.length, 1));
  return { trend, wau, today_dau: trend[trend.length - 1]?.dau || 0 };
}

function computeFunnel(emailLeads: any[], accounts: any[], profiles: any[], aiUsage: any[], documents: any[]) {
  const emailGate = emailLeads.length;
  const signups = accounts.length;
  const onboarded = profiles.filter((p: any) => p.onboarding_completed).length;
  const analyzedUsers = new Set(aiUsage.filter((r: any) => r.usage_type === "analyze").map((r: any) => r.user_id)).size;
  const docCreators = new Set(documents.map((d: any) => d.user_id)).size;

  return {
    steps: [
      { step: "Email Gate", value: emailGate },
      { step: "Signed Up", value: signups },
      { step: "Onboarded", value: onboarded },
      { step: "Used Analyzer", value: analyzedUsers },
      { step: "Created Doc", value: docCreators },
    ],
    description: "Tracks user journey from first contact to active usage",
  };
}

function computeAnalyzerConversion(resumeLeads: any[], accounts: any[]) {
  const accountEmails = new Set(accounts.map((a: any) => a.email?.toLowerCase()));
  const leadEmails = new Set(resumeLeads.map((r: any) => r.email?.toLowerCase()));
  const converted = [...leadEmails].filter(e => accountEmails.has(e)).length;
  const total = leadEmails.size;
  const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
  return { total_unique_leads: total, converted_to_signup: converted, conversion_rate_pct: rate };
}

function computeRetentionCohorts(accounts: any[]) {
  const now = new Date();
  const weeks: { label: string; start: Date; end: Date }[] = [];
  for (let i = 7; i >= 0; i--) {
    const s = startOfWeek(new Date(now.getTime() - i * 7 * 86400000));
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    weeks.push({ label: fmt(s), start: s, end: e });
  }

  return weeks.map(w => {
    const cohort = accounts.filter((a: any) => {
      const d = new Date(a.created_at);
      return d >= w.start && d <= w.end;
    });
    const total = cohort.length;
    const returned = cohort.filter((a: any) => {
      if (!a.last_sign_in_at) return false;
      const diff = (new Date(a.last_sign_in_at).getTime() - new Date(a.created_at).getTime()) / 86400000;
      return diff >= 1;
    }).length;
    return {
      week: w.label,
      total_signups: total,
      returned,
      retention_rate_pct: total > 0 ? Math.round((returned / total) * 100) : 0,
    };
  }).filter(c => c.total_signups > 0);
}

function computeScoreDistribution(resumeLeads: any[]) {
  const ranges = [
    { range: "0-10", min: 0, max: 10 }, { range: "11-20", min: 11, max: 20 },
    { range: "21-30", min: 21, max: 30 }, { range: "31-40", min: 31, max: 40 },
    { range: "41-50", min: 41, max: 50 }, { range: "51-60", min: 51, max: 60 },
    { range: "61-70", min: 61, max: 70 }, { range: "71-80", min: 71, max: 80 },
    { range: "81-90", min: 81, max: 90 }, { range: "91-100", min: 91, max: 100 },
  ];
  const scores = resumeLeads.map((r: any) => r.overall_score).filter((s: any): s is number => s !== null);
  const buckets = ranges.map(r => ({ range: r.range, count: scores.filter(s => s >= r.min && s <= r.max).length }));
  const avg = scores.length ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0;
  return { buckets, average_score: avg, total_scored: scores.length };
}

function computeCareerPhases(profiles: any[]) {
  const counts: Record<string, number> = {};
  profiles.forEach((p: any) => {
    const phase = p.career_phase || "not set";
    counts[phase] = (counts[phase] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([phase, count]) => ({ phase, count }));
}

function computeFeatureAdoption(aiUsage: any[]) {
  const byType: Record<string, Set<string>> = {};
  for (const r of aiUsage) {
    if (!byType[r.usage_type]) byType[r.usage_type] = new Set();
    byType[r.usage_type].add(r.user_id);
  }
  return Object.entries(byType)
    .map(([type, users]) => ({
      feature: type,
      unique_users: users.size,
      total_uses: aiUsage.filter((r: any) => r.usage_type === type).length,
    }))
    .sort((a, b) => b.unique_users - a.unique_users);
}

function computeDocTrend(documents: any[]) {
  const days = daysArray(30);
  const byDay: Record<string, { resume: number; cover_letter: number }> = {};
  days.forEach(d => (byDay[d] = { resume: 0, cover_letter: 0 }));
  for (const doc of documents) {
    const day = doc.created_at?.split("T")[0];
    if (day && byDay[day]) {
      if (doc.type === "cover_letter") byDay[day].cover_letter++;
      else byDay[day].resume++;
    }
  }
  return days.map(d => ({ date: d, resumes: byDay[d].resume, cover_letters: byDay[d].cover_letter }));
}

function computeGuideCompletion(guideProgress: any[]) {
  const byGuide: Record<string, { started: number; completed: number }> = {};
  for (const gp of guideProgress) {
    if (!byGuide[gp.guide_key]) byGuide[gp.guide_key] = { started: 0, completed: 0 };
    byGuide[gp.guide_key].started++;
    const data = gp.data;
    if (data && typeof data === "object") {
      const checked = Object.values(data).filter(v => v === true).length;
      const total = Object.keys(data).length;
      if (total > 0 && checked / total >= 0.8) byGuide[gp.guide_key].completed++;
    }
  }
  return Object.entries(byGuide)
    .map(([guide, { started, completed }]) => ({
      guide,
      started,
      completed,
      completion_rate_pct: started > 0 ? Math.round((completed / started) * 100) : 0,
    }))
    .sort((a, b) => b.started - a.started);
}

function computeSalaryDemand(salaryChecks: any[]) {
  const byRole: Record<string, number> = {};
  const bySector: Record<string, number> = {};
  for (const c of salaryChecks) {
    byRole[c.role] = (byRole[c.role] || 0) + 1;
    if (c.sector) bySector[c.sector] = (bySector[c.sector] || 0) + 1;
  }
  return {
    top_roles: Object.entries(byRole).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([role, count]) => ({ role, count })),
    top_sectors: Object.entries(bySector).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([sector, count]) => ({ sector, count })),
  };
}

function computeLanguageSplit(resumeLeads: any[], salaryChecks: any[]) {
  const all: Record<string, number> = {};
  for (const r of resumeLeads) {
    const lang = (r.language || "en").toLowerCase();
    all[lang] = (all[lang] || 0) + 1;
  }
  for (const c of salaryChecks) {
    const lang = (c.lang || "en").toLowerCase();
    all[lang] = (all[lang] || 0) + 1;
  }
  const total = Object.values(all).reduce((a, b) => a + b, 0);
  return Object.entries(all)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, count]) => ({ language: lang.toUpperCase(), count, pct: total > 0 ? Math.round((count / total) * 100) : 0 }));
}

function computeShareVirality(shareClicks: any[]) {
  const byPage: Record<string, Record<string, number>> = {};
  for (const s of shareClicks) {
    if (!byPage[s.page]) byPage[s.page] = {};
    byPage[s.page][s.channel] = (byPage[s.page][s.channel] || 0) + 1;
  }
  return Object.entries(byPage)
    .map(([page, channels]) => ({
      page,
      total_shares: Object.values(channels).reduce((a, b) => a + b, 0),
      by_channel: channels,
    }))
    .sort((a, b) => b.total_shares - a.total_shares)
    .slice(0, 10);
}

// ── Popular guides from event_tracks ──────────────────────────────

function computePopularGuides(eventTracks: any[]) {
  const guidePaths = new Set([
    "/resume-guide", "/interview-prep", "/linkedin-guide", "/recruiter-guide",
    "/job-offer-guide", "/pivot-method", "/career-game", "/ikigai",
    "/office-politics", "/problem-solving", "/ai-job-search",
    "/forty-eight-laws", "/linkedin-branding", "/recruiter-screen",
  ]);
  const counts: Record<string, number> = {};
  for (const e of eventTracks) {
    const p = e.page;
    if (guidePaths.has(p) || p?.includes("guide")) {
      counts[p] = (counts[p] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([page, views]) => ({ page, views }));
}

// ── Main handler ──────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Auth via API key
  const apiKey = req.headers.get("x-api-key");
  const expected = Deno.env.get("ANALYTICS_API_KEY");
  if (!expected || apiKey !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const range = url.searchParams.get("range");
    const tablesParam = url.searchParams.get("tables");
    const includeInsights = url.searchParams.get("insights") !== "false"; // default true
    const limitParam = parseInt(url.searchParams.get("limit") || "1000", 10);
    const limit = Math.min(Math.max(limitParam, 1), 5000);

    const requestedTables = tablesParam
      ? tablesParam.split(",").filter((t) => (ALL_TABLES as readonly string[]).includes(t))
      : [...ALL_TABLES];

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const start = rangeStart(range);
    const result: Record<string, unknown> = { range: range || "all", queried_at: new Date().toISOString() };

    const dateCol: Record<string, string> = {
      resume_leads: "created_at",
      email_gate_leads: "created_at",
      salary_checks: "created_at",
      event_tracks: "created_at",
      share_clicks: "created_at",
      feedback: "created_at",
      threads_posts: "posted_at",
      threads_user_insights: "metric_date",
      threads_demographics: "fetched_at",
      threads_link_clicks: "metric_date",
      ai_usage_log: "created_at",
      resume_analyses: "created_at",
    };

    // Query all requested tables in parallel
    const queries = requestedTables.map(async (table) => {
      let q = supabase.from(table).select("*").order(dateCol[table] || "created_at", { ascending: false }).limit(limit);
      if (start && dateCol[table]) {
        q = q.gte(dateCol[table], start);
      }
      const { data, error } = await q;
      if (error) {
        return { table, data: { error: error.message, total: 0, rows: [] } };
      }
      return { table, data: { total: (data || []).length, rows: data || [] } };
    });

    // Also fetch extra tables needed for insights (profiles, user_documents, guide_progress, accounts)
    const insightsQueries = includeInsights ? [
      supabase.from("profiles").select("user_id, onboarding_completed, career_phase, created_at").limit(5000),
      supabase.from("user_documents").select("type, created_at, user_id").limit(5000),
      supabase.from("guide_progress").select("guide_key, user_id, data").limit(5000),
      // Get accounts via auth admin API
      supabase.auth.admin.listUsers({ perPage: 5000 }),
    ] : [];

    const [tableResults, ...insightsResults] = await Promise.all([
      Promise.all(queries),
      ...insightsQueries,
    ]);

    for (const r of tableResults) {
      result[r.table] = r.data;
    }

    // Compute insights if requested
    if (includeInsights) {
      const profilesData = insightsResults[0]?.data || [];
      const documentsData = insightsResults[1]?.data || [];
      const guideProgressData = insightsResults[2]?.data || [];
      const accountsData = insightsResults[3]?.data?.users || [];

      // Extract raw rows from table results
      const getRows = (table: string) => {
        const r = result[table] as any;
        return r?.rows || [];
      };

      const eventTracks = getRows("event_tracks");
      const resumeLeads = getRows("resume_leads");
      const emailLeads = getRows("email_gate_leads");
      const aiUsage = getRows("ai_usage_log");
      const salaryChecks = getRows("salary_checks");
      const shareClicks = getRows("share_clicks");

      result.insights = {
        description: "Pre-computed analytics metrics matching the admin dashboard charts",
        dau_wau: computeDAUWAU(eventTracks),
        conversion_funnel: computeFunnel(emailLeads, accountsData, profilesData, aiUsage, documentsData),
        analyzer_conversion: computeAnalyzerConversion(resumeLeads, accountsData),
        retention_cohorts: computeRetentionCohorts(accountsData),
        resume_score_distribution: computeScoreDistribution(resumeLeads),
        career_phase_breakdown: computeCareerPhases(profilesData),
        feature_adoption: computeFeatureAdoption(aiUsage),
        document_creation_trend: computeDocTrend(documentsData),
        guide_completion_rates: computeGuideCompletion(guideProgressData),
        salary_demand: computeSalaryDemand(salaryChecks),
        language_split: computeLanguageSplit(resumeLeads, salaryChecks),
        share_virality: computeShareVirality(shareClicks),
        popular_guides: computePopularGuides(eventTracks),
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
