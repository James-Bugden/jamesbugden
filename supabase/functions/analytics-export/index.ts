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
  "interview_questions",
  "profiles",
] as const;

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
    const range = url.searchParams.get("range"); // 7d, 30d, 90d, or omit for all
    const tablesParam = url.searchParams.get("tables"); // comma-separated, or omit for all
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

    // Date column mapping per table
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
      interview_questions: "id",
      profiles: "created_at",
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

    const results = await Promise.all(queries);
    for (const r of results) {
      result[r.table] = r.data;
    }

    // ── Career Phase Breakdown ──────────────────────────────────────
    const profileRows = (result.profiles as any)?.rows || [];
    const phaseCounts: Record<string, number> = {};
    for (const p of profileRows) {
      const phase = p.career_phase || "not_set";
      phaseCounts[phase] = (phaseCounts[phase] || 0) + 1;
    }
    result.career_phase_breakdown = {
      total_users: profileRows.length,
      phases: Object.entries(phaseCounts)
        .map(([phase, count]) => ({ phase, count, pct: profileRows.length > 0 ? Math.round((count / profileRows.length) * 100) : 0 }))
        .sort((a: any, b: any) => b.count - a.count),
    };

    // ── Question Bank Summary ───────────────────────────────────────
    const qRows = (result.interview_questions as any)?.rows || [];
    const categoryCounts: Record<string, number> = {};
    const difficultyCounts: Record<number, number> = {};
    for (const q of qRows) {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
      difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;
    }
    result.question_bank_summary = {
      total_questions: qRows.length,
      by_category: Object.entries(categoryCounts).sort((a: any, b: any) => b[1] - a[1]).map(([category, count]) => ({ category, count })),
      by_difficulty: Object.entries(difficultyCounts).sort((a: any, b: any) => a[0] - b[0]).map(([level, count]) => ({ level: Number(level), count })),
    };

    // ── Guide Engagement Insights (from guide_exit events) ──────────
    const includeInsights = url.searchParams.get("insights") !== "false";
    if (includeInsights) {
      const eventRows = (result.event_tracks as any)?.rows || [];

      const exitEvents = eventRows.filter((e: any) => e.event_type === "guide_exit" && e.metadata);
      const viewEvents = eventRows.filter((e: any) => e.event_type === "guide_view");

      // Views per guide
      const viewCounts: Record<string, number> = {};
      viewEvents.forEach((e: any) => { viewCounts[e.event_name] = (viewCounts[e.event_name] || 0) + 1; });

      // Exit data per guide
      const exitData: Record<string, { scrollDepths: number[]; times: number[] }> = {};
      for (const e of exitEvents) {
        const meta = e.metadata;
        const guideId = meta?.guide_id || e.event_name;
        if (!exitData[guideId]) exitData[guideId] = { scrollDepths: [], times: [] };
        if (typeof meta?.scroll_depth_pct === "number") exitData[guideId].scrollDepths.push(meta.scroll_depth_pct);
        if (typeof meta?.time_on_page_sec === "number") exitData[guideId].times.push(meta.time_on_page_sec);
      }

      const allGuideIds = new Set([...Object.keys(viewCounts), ...Object.keys(exitData)]);
      const guideMetrics = Array.from(allGuideIds).map(id => {
        const data = exitData[id];
        const visits = viewCounts[id] || 0;
        const sessions = data?.scrollDepths.length || 0;
        const completed = data?.scrollDepths.filter((d: number) => d >= 75).length || 0;
        const avgScroll = sessions > 0 ? Math.round(data.scrollDepths.reduce((a: number, b: number) => a + b, 0) / sessions) : 0;
        const avgTime = sessions > 0 ? Math.round(data.times.reduce((a: number, b: number) => a + b, 0) / sessions) : 0;
        const bounced = data ? data.scrollDepths.filter((d: number, i: number) => d < 10 && data.times[i] < 15).length : 0;
        return {
          guide_id: id,
          visits,
          tracked_sessions: sessions,
          avg_scroll_depth_pct: avgScroll,
          avg_time_on_page_sec: avgTime,
          completion_rate_pct: sessions > 0 ? Math.round((completed / sessions) * 100) : 0,
          bounce_rate_pct: sessions > 0 ? Math.round((bounced / sessions) * 100) : 0,
        };
      }).sort((a, b) => b.visits - a.visits);

      // Drop-off histogram
      const allScrolls = exitEvents.map((e: any) => e.metadata?.scroll_depth_pct).filter((v: any): v is number => typeof v === "number");
      const dropoff = {
        "0_25": allScrolls.filter((d: number) => d < 25).length,
        "25_50": allScrolls.filter((d: number) => d >= 25 && d < 50).length,
        "50_75": allScrolls.filter((d: number) => d >= 50 && d < 75).length,
        "75_100": allScrolls.filter((d: number) => d >= 75).length,
      };

      // ── Guide → Action Conversion ──────────────────────────────
      // Check if users created documents within 24h of viewing a guide
      const { data: docRows } = await supabase
        .from("user_documents")
        .select("user_id, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);

      const docs = docRows || [];

      // Build a map of guide_view timestamps per page (anonymous, so use created_at windows)
      // For each guide_view, check if any document was created within 24h after
      const CONVERSION_WINDOW_MS = 24 * 60 * 60 * 1000;
      const guideConversions: Record<string, { views: number; conversions: number }> = {};

      for (const view of viewEvents) {
        const guideId = view.event_name;
        if (!guideConversions[guideId]) guideConversions[guideId] = { views: 0, conversions: 0 };
        guideConversions[guideId].views++;

        const viewTime = new Date(view.created_at).getTime();
        const converted = docs.some((d: any) => {
          const docTime = new Date(d.created_at).getTime();
          return docTime >= viewTime && docTime <= viewTime + CONVERSION_WINDOW_MS;
        });
        if (converted) guideConversions[guideId].conversions++;
      }

      const totalGuideViews = viewEvents.length;
      const totalConversions = Object.values(guideConversions).reduce((s, g) => s + g.conversions, 0);

      const guideConversionRates = Object.entries(guideConversions)
        .map(([guide_id, { views, conversions }]) => ({
          guide_id,
          views,
          conversions,
          conversion_rate_pct: views > 0 ? Math.round((conversions / views) * 100) : 0,
        }))
        .sort((a, b) => b.conversions - a.conversions);

      result.guide_engagement = {
        total_exit_sessions: exitEvents.length,
        total_views: viewEvents.length,
        guides: guideMetrics,
        scroll_dropoff_histogram: dropoff,
        guide_to_action: {
          total_views: totalGuideViews,
          total_conversions: totalConversions,
          overall_conversion_rate_pct: totalGuideViews > 0 ? Math.round((totalConversions / totalGuideViews) * 100) : 0,
          conversion_window_hours: 24,
          per_guide: guideConversionRates,
        },
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
