import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    // Page dimensions
    const width = pageFormat === "letter" ? "8.5in" : "210mm";
    const height = pageFormat === "letter" ? "11in" : "297mm";

    // Call Browserless.io v2 PDF API
    const browserlessUrl = `https://production-sfo.browserless.io/pdf?token=${browserlessApiKey}`;

    const browserlessResponse = await fetch(browserlessUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html,
        options: {
          printBackground: true,
          preferCSSPageSize: false,
          width,
          height,
          margin: { top: "0", right: "0", bottom: "0", left: "0" },
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

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
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
