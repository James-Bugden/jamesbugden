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
  "sessions",
  "guide_reads",
  "tool_completions",
  "error_log",
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
      sessions: "started_at",
      guide_reads: "started_at",
      tool_completions: "created_at",
      error_log: "created_at",
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

    // ── Session Quality ─────────────────────────────────────────────
    const sessionRows = (result.sessions as any)?.rows || [];
    if (sessionRows.length > 0) {
      const durations = sessionRows.map((s: any) => s.duration_sec).filter((v: any) => typeof v === "number" && v > 0);
      const pages = sessionRows.map((s: any) => s.pages_viewed || 1);
      const deviceCounts: Record<string, number> = {};
      const browserCounts: Record<string, number> = {};
      let returningCount = 0;
      let multiToolSessions = 0;
      let bouncedSessions = 0;
      for (const s of sessionRows) {
        const dev = s.device_type || "unknown";
        deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
        const br = s.browser || "unknown";
        browserCounts[br] = (browserCounts[br] || 0) + 1;
        if (s.is_returning) returningCount++;
        if ((s.tool_action_count || 0) >= 2) multiToolSessions++;
        if ((s.pages_viewed || 1) <= 1 && (s.duration_sec || 0) < 10) bouncedSessions++;
      }
      const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
      const sortedDur = [...durations].sort((a, b) => a - b);
      const median = sortedDur.length ? sortedDur[Math.floor(sortedDur.length / 2)] : 0;
      result.session_quality = {
        total_sessions: sessionRows.length,
        returning_sessions: returningCount,
        returning_pct: Math.round((returningCount / sessionRows.length) * 100),
        bounced_sessions: bouncedSessions,
        bounce_rate_pct: Math.round((bouncedSessions / sessionRows.length) * 100),
        multi_tool_sessions: multiToolSessions,
        multi_tool_pct: Math.round((multiToolSessions / sessionRows.length) * 100),
        avg_duration_sec: avg(durations),
        median_duration_sec: median,
        avg_pages_per_session: Math.round((pages.reduce((a: number, b: number) => a + b, 0) / pages.length) * 10) / 10,
        by_device: Object.entries(deviceCounts).map(([device, count]) => ({ device, count })).sort((a: any, b: any) => b.count - a.count),
        by_browser: Object.entries(browserCounts).map(([browser, count]) => ({ browser, count })).sort((a: any, b: any) => b.count - a.count),
      };
    }

    // ── Tool Funnel ─────────────────────────────────────────────────
    const toolRows = (result.tool_completions as any)?.rows || [];
    if (toolRows.length > 0) {
      const byTool: Record<string, { total: number; success: number; actions: Record<string, number>; durations: number[] }> = {};
      for (const t of toolRows) {
        if (!byTool[t.tool]) byTool[t.tool] = { total: 0, success: 0, actions: {}, durations: [] };
        byTool[t.tool].total++;
        if (t.success) byTool[t.tool].success++;
        byTool[t.tool].actions[t.action] = (byTool[t.tool].actions[t.action] || 0) + 1;
        if (typeof t.duration_ms === "number") byTool[t.tool].durations.push(t.duration_ms);
      }
      result.tool_funnel = {
        total_completions: toolRows.length,
        unique_anon_users: new Set(toolRows.map((t: any) => t.anon_id).filter(Boolean)).size,
        unique_signed_in: new Set(toolRows.map((t: any) => t.user_id).filter(Boolean)).size,
        by_tool: Object.entries(byTool).map(([tool, d]) => ({
          tool,
          total: d.total,
          success: d.success,
          success_rate_pct: d.total > 0 ? Math.round((d.success / d.total) * 100) : 0,
          actions: Object.entries(d.actions).sort((a: any, b: any) => b[1] - a[1]).map(([action, count]) => ({ action, count })),
          avg_duration_ms: d.durations.length ? Math.round(d.durations.reduce((a, b) => a + b, 0) / d.durations.length) : null,
        })).sort((a, b) => b.total - a.total),
      };
    }

    // ── Error Summary ──────────────────────────────────────────────
    const errorRows = (result.error_log as any)?.rows || [];
    if (errorRows.length > 0) {
      const bySource: Record<string, number> = {};
      const topMessages: Record<string, { count: number; source: string; sample_page: string | null }> = {};
      for (const e of errorRows) {
        bySource[e.source] = (bySource[e.source] || 0) + 1;
        const key = `${e.source}::${(e.message || "").slice(0, 120)}`;
        if (!topMessages[key]) topMessages[key] = { count: 0, source: e.source, sample_page: e.page };
        topMessages[key].count++;
      }
      result.error_summary = {
        total_errors: errorRows.length,
        unique_sessions_with_errors: new Set(errorRows.map((e: any) => e.session_id).filter(Boolean)).size,
        by_source: Object.entries(bySource).map(([source, count]) => ({ source, count })).sort((a: any, b: any) => b.count - a.count),
        top_messages: Object.entries(topMessages)
          .map(([key, v]) => ({ message: key.split("::")[1], source: v.source, count: v.count, sample_page: v.sample_page }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20),
      };
    }

    // ── Multi-Tool Journeys (cross-tool engagement = NSM) ──────────
    if (toolRows.length > 0) {
      const sessionTools: Record<string, Set<string>> = {};
      const sessionFirstTool: Record<string, { tool: string; ts: number }> = {};
      for (const t of toolRows) {
        if (!t.session_id) continue;
        if (!sessionTools[t.session_id]) sessionTools[t.session_id] = new Set();
        sessionTools[t.session_id].add(t.tool);
        const ts = new Date(t.created_at).getTime();
        if (!sessionFirstTool[t.session_id] || ts < sessionFirstTool[t.session_id].ts) {
          sessionFirstTool[t.session_id] = { tool: t.tool, ts };
        }
      }
      const totalSessionsWithTools = Object.keys(sessionTools).length;
      const crossedSessions = Object.values(sessionTools).filter((s) => s.size >= 2).length;
      const entryToolCounts: Record<string, number> = {};
      for (const v of Object.values(sessionFirstTool)) {
        entryToolCounts[v.tool] = (entryToolCounts[v.tool] || 0) + 1;
      }
      result.journey_metrics = {
        sessions_with_any_tool: totalSessionsWithTools,
        sessions_using_2plus_tools: crossedSessions,
        cross_tool_pct: totalSessionsWithTools > 0 ? Math.round((crossedSessions / totalSessionsWithTools) * 100) : 0,
        entry_tool_distribution: Object.entries(entryToolCounts).map(([tool, count]) => ({ tool, count })).sort((a: any, b: any) => b.count - a.count),
      };
    }

    // ── Power Users (signed-in users with ≥3 resume analyses) ──────
    const analysisRows = (result.resume_analyses as any)?.rows || [];
    if (analysisRows.length > 0) {
      const perUser: Record<string, { count: number; best: number; latest: number; first_at: string }> = {};
      for (const a of analysisRows) {
        if (!a.user_id) continue;
        if (!perUser[a.user_id]) perUser[a.user_id] = { count: 0, best: 0, latest: 0, first_at: a.created_at };
        perUser[a.user_id].count++;
        const score = a.overall_score || 0;
        if (score > perUser[a.user_id].best) perUser[a.user_id].best = score;
        if (new Date(a.created_at).getTime() > new Date(perUser[a.user_id].first_at).getTime()) {
          perUser[a.user_id].latest = score;
        } else {
          perUser[a.user_id].first_at = a.created_at;
        }
      }
      const powerUsers = Object.entries(perUser).filter(([_, v]) => v.count >= 3);
      result.power_users = {
        total_analyzed_users: Object.keys(perUser).length,
        power_user_count: powerUsers.length,
        power_user_pct: Object.keys(perUser).length > 0 ? Math.round((powerUsers.length / Object.keys(perUser).length) * 100) : 0,
        avg_analyses_per_power_user: powerUsers.length ? Math.round(powerUsers.reduce((s, [_, v]) => s + v.count, 0) / powerUsers.length * 10) / 10 : 0,
        avg_score_lift: powerUsers.length
          ? Math.round(powerUsers.reduce((s, [_, v]) => s + (v.best - (v.latest || v.best)), 0) / powerUsers.length)
          : 0,
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
