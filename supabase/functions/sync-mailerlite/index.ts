import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("MAILERLITE_API_KEY");
    if (!apiKey) {
      throw new Error("MAILERLITE_API_KEY is not configured");
    }

    const { email, name, drip_variant: dripVariant } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parts = (name || "").trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    // Drip-experiment routing (HIR-64).
    //
    // Env vars own the group ids so content/marketing can flip the
    // treatment group when the new 5-email sequence lands (sibling task
    // on HIR-63). Until then both the control + treatment env vars
    // should point to the existing welcome group, so the experiment
    // plumbing ships without changing observable behaviour for anyone.
    //
    // The DEFAULT fallback preserves the historic single-group ID for
    // callers that do not pass a drip_variant (e.g. the legacy Quiz /
    // Join flows that have not been wired into the experiment yet).
    const FALLBACK_DEFAULT_GROUP = "181733295867823354";
    const defaultGroup =
      Deno.env.get("MAILERLITE_GROUP_DEFAULT") || FALLBACK_DEFAULT_GROUP;
    const controlGroup =
      Deno.env.get("MAILERLITE_GROUP_DRIP_CONTROL") || defaultGroup;
    const treatmentGroup =
      Deno.env.get("MAILERLITE_GROUP_DRIP_TREATMENT") || defaultGroup;

    let groupId = defaultGroup;
    if (dripVariant === "control") {
      groupId = controlGroup;
    } else if (dripVariant === "treatment") {
      groupId = treatmentGroup;
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: { name: firstName, last_name: lastName },
        groups: [groupId],
        status: "active",
      }),
    });

    const data = await res.json();
    console.log("MailerLite API response:", res.status, JSON.stringify(data));

    if (!res.ok) {
      console.error("MailerLite API error:", res.status, JSON.stringify(data));
      return new Response(JSON.stringify({ error: "MailerLite API error", status: res.status }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("sync-mailerlite error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
