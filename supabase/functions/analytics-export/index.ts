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
