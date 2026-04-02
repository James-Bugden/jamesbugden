import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PDF_MONTHLY_LIMIT = 50;
const USAGE_TYPE = "pdf_export";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ── Auth check ──
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;

    // ── Admin bypass ──
    const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: userId });

    // ── Rate limit check ──
    let currentCount = 0;
    if (!isAdmin) {
      const { data: countData } = await supabase.rpc("count_ai_usage_this_month", {
        p_user_id: userId,
        p_usage_type: USAGE_TYPE,
      });

      currentCount = (countData as number) ?? 0;
      if (currentCount >= PDF_MONTHLY_LIMIT) {
        return new Response(
          JSON.stringify({
            error: "Monthly PDF export limit reached",
            limit: PDF_MONTHLY_LIMIT,
            used: currentCount,
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // ── Parse request ──
    const { html, pageFormat = "a4" } = await req.json();

    if (!html || typeof html !== "string") {
      return new Response(JSON.stringify({ error: "Missing html parameter" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const browserlessApiKey = Deno.env.get("BROWSERLESS_API_KEY");
    if (!browserlessApiKey) {
      return new Response(JSON.stringify({ error: "BROWSERLESS_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Generate PDF ──
    // PDF size/margins are now controlled by CSS @page rules in the HTML

    const browserlessUrl = `https://production-sfo.browserless.io/pdf?token=${browserlessApiKey}`;

    const browserlessResponse = await fetch(browserlessUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html,
        options: {
          printBackground: true,
          preferCSSPageSize: true,
        },
        gotoOptions: {
          waitUntil: "networkidle0",
          timeout: 30000,
        },
      }),
    });

    if (!browserlessResponse.ok) {
      const errorText = await browserlessResponse.text();
      console.error("Browserless error:", browserlessResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: `Browserless API error: ${browserlessResponse.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const pdfBuffer = await browserlessResponse.arrayBuffer();

    // ── Log usage (after success) ──
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      usage_type: USAGE_TYPE,
    });

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
        "X-PDF-Usage": `${currentCount + 1}/${PDF_MONTHLY_LIMIT}`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
