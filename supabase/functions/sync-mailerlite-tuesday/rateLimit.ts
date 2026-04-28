// HIR-88: per-IP sliding-window rate limit for anonymous edge functions.
// Mirrors the analyze-resume monthly usage gate (count rows in window, then
// insert) but keyed on (function_name, client_ip) for short-window protection.
// On any DB error we throw so the caller can fail-closed with 503 — silently
// skipping the gate would let MailerLite get spammed when Postgres is upset.

import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const RATE_LIMIT_TABLE = "edge_function_rate_limit_log";

export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const cf = headers.get("cf-connecting-ip");
  if (cf) {
    const trimmed = cf.trim();
    if (trimmed) return trimmed;
  }
  const real = headers.get("x-real-ip");
  if (real) {
    const trimmed = real.trim();
    if (trimmed) return trimmed;
  }
  return "unknown";
}

export interface RateLimitOpts {
  functionName: string;
  clientIp: string;
  maxPerWindow: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  used: number;
  limit: number;
  retryAfterSeconds: number;
}

export async function checkAndRecord(
  supabase: SupabaseClient,
  opts: RateLimitOpts,
): Promise<RateLimitResult> {
  const since = new Date(Date.now() - opts.windowSeconds * 1000).toISOString();

  const { count, error: countError } = await supabase
    .from(RATE_LIMIT_TABLE)
    .select("id", { count: "exact", head: true })
    .eq("function_name", opts.functionName)
    .eq("client_ip", opts.clientIp)
    .gte("attempted_at", since);

  if (countError) {
    throw new Error(`rate-limit count failed: ${countError.message ?? countError}`);
  }

  const used = count ?? 0;
  if (used >= opts.maxPerWindow) {
    return {
      allowed: false,
      used,
      limit: opts.maxPerWindow,
      retryAfterSeconds: opts.windowSeconds,
    };
  }

  const { error: insertError } = await supabase
    .from(RATE_LIMIT_TABLE)
    .insert({
      function_name: opts.functionName,
      client_ip: opts.clientIp,
    });

  if (insertError) {
    throw new Error(`rate-limit insert failed: ${insertError.message ?? insertError}`);
  }

  return {
    allowed: true,
    used: used + 1,
    limit: opts.maxPerWindow,
    retryAfterSeconds: 0,
  };
}
