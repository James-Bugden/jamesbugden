import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildCorsHeaders, isAllowedOrigin } from "./cors.ts";
import { checkAndRecord, getClientIp } from "./rateLimit.ts";

// Subscribes a visitor to the Tuesday Job Market Intel briefing group in
// MailerLite. The group id is read from the MAILERLITE_TUESDAY_GROUP_ID
// secret so we never accidentally subscribe to the wrong list — if the
// secret is missing, this function fails closed with 503.
//
// HIR-88: this is an anonymous public endpoint that triggers a paid
// MailerLite subscriber-create plus an opt-in confirmation email. We
// (a) restrict CORS to our own origins so other websites can't drive the
// form from a browser, and (b) rate-limit by client IP before touching
// MailerLite so a single source can't burn budget or weaponise our domain
// for consent-attack spam.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FUNCTION_NAME = "sync-mailerlite-tuesday";
const RATE_MAX = 5;
const RATE_WINDOW_SECONDS = 60;

function jsonResponse(
  status: number,
  body: unknown,
  cors: Record<string, string>,
  extra: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json", ...extra },
  });
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    if (!isAllowedOrigin(origin)) {
      return new Response(null, { status: 403, headers: { Vary: "Origin" } });
    }
    return new Response(null, { headers: cors });
  }

  if (!isAllowedOrigin(origin)) {
    return jsonResponse(403, { error: "origin_not_allowed" }, { Vary: "Origin" });
  }

  const apiKey = Deno.env.get("MAILERLITE_API_KEY");
  if (!apiKey) {
    console.error("sync-mailerlite-tuesday: MAILERLITE_API_KEY missing");
    return jsonResponse(503, { error: "service_unavailable" }, cors);
  }

  const groupId = Deno.env.get("MAILERLITE_TUESDAY_GROUP_ID");
  if (!groupId) {
    console.error(
      "sync-mailerlite-tuesday: MAILERLITE_TUESDAY_GROUP_ID missing — refusing to subscribe to default group",
    );
    return jsonResponse(503, { error: "group_not_configured" }, cors);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "sync-mailerlite-tuesday: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing — failing closed",
    );
    return jsonResponse(503, { error: "service_unavailable" }, cors);
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const clientIp = getClientIp(req.headers);
  let rate;
  try {
    rate = await checkAndRecord(supabase, {
      functionName: FUNCTION_NAME,
      clientIp,
      maxPerWindow: RATE_MAX,
      windowSeconds: RATE_WINDOW_SECONDS,
    });
  } catch (err) {
    console.error(
      "sync-mailerlite-tuesday: rate-limit check failed:",
      (err as Error).message,
    );
    return jsonResponse(503, { error: "service_unavailable" }, cors);
  }

  if (!rate.allowed) {
    return jsonResponse(
      429,
      { error: "rate_limited" },
      cors,
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "invalid_json" }, cors);
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return jsonResponse(400, { error: "email_required" }, cors);
  }
  if (!EMAIL_REGEX.test(email)) {
    return jsonResponse(400, { error: "invalid_email" }, cors);
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

  if (!res.ok) {
    // Don't log the response body — MailerLite sometimes echoes the
    // submitted email back, which we don't want sitting in log sinks.
    console.error("sync-mailerlite-tuesday MailerLite API error:", res.status);
    return jsonResponse(502, { error: "upstream_error", status: res.status }, cors);
  }

  return jsonResponse(200, { success: true }, cors);
});
