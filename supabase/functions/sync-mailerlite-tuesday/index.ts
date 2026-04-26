import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Subscribes a visitor to the Tuesday Job Market Intel briefing group in
// MailerLite. The group id is read from the MAILERLITE_TUESDAY_GROUP_ID
// secret so we never accidentally subscribe to the wrong list — if the
// secret is missing, this function fails closed with 503.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("MAILERLITE_API_KEY");
  if (!apiKey) {
    console.error("sync-mailerlite-tuesday: MAILERLITE_API_KEY missing");
    return jsonResponse(503, { error: "service_unavailable" });
  }

  const groupId = Deno.env.get("MAILERLITE_TUESDAY_GROUP_ID");
  if (!groupId) {
    console.error(
      "sync-mailerlite-tuesday: MAILERLITE_TUESDAY_GROUP_ID missing — refusing to subscribe to default group",
    );
    return jsonResponse(503, { error: "group_not_configured" });
  }

  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "invalid_json" });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return jsonResponse(400, { error: "email_required" });
  }
  if (!EMAIL_REGEX.test(email)) {
    return jsonResponse(400, { error: "invalid_email" });
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
      groups: [groupId],
      status: "active",
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(
      "sync-mailerlite-tuesday MailerLite API error:",
      res.status,
      JSON.stringify(data),
    );
    return jsonResponse(502, { error: "upstream_error", status: res.status });
  }

  return jsonResponse(200, { success: true });
});
