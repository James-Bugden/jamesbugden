import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { assertWebhookSecret, WebhookSecretError } from "./webhookSecret.ts";
import { diffWatchedFields, type ProfileRow } from "./changeDetection.ts";
import { callMailerLiteWithRetry } from "./retry.ts";

// HIR-68: Supabase database webhook target for `public.profiles` UPDATE.
// On every fired webhook this function:
//   1. checks the shared-secret header (so only Supabase can drive it)
//   2. diffs the four watched columns (target_role, target_industry,
//      job_search_stage, tuesday_email_opted_in) — if none changed, no-op
//   3. resolves the user's email via auth.admin.getUserById (profiles has
//      no email column)
//   4. calls MailerLite's subscriber upsert with the diffed fields only
//      (NO `groups` field — preserves group membership)
//   5. writes a `mailerlite_sync_log` row in every case
//
// See README.md in this directory for the manual setup steps that must
// happen after this function is deployed: creating the four custom fields
// in MailerLite UI, configuring the database webhook, and setting the
// SYNC_USER_PROFILE_WEBHOOK_SECRET edge function secret.

const FUNCTION_NAME = "sync-user-profile-to-mailerlite";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: ProfileRow | null;
  old_record: ProfileRow | null;
}

type LogStatus = "success" | "failed" | "skipped" | "not_found";

interface LogRow {
  user_id: string | null;
  email: string | null;
  fields_synced: Record<string, unknown>;
  status: LogStatus;
  error: string | null;
  attempt_count: number;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function writeLog(
  supabase: ReturnType<typeof createClient>,
  row: LogRow,
): Promise<void> {
  const { error } = await supabase.from("mailerlite_sync_log").insert(row);
  if (error) {
    console.error(`${FUNCTION_NAME}: failed to write sync log`, error);
  }
}

// Build a single short string for the sync-log `error` column. We include a
// truncated MailerLite response body so triage from the log table alone
// (rather than having to dig through Edge Function logs) can spot common
// validation failures like "email is invalid" or "field key not found".
const MAX_ERROR_BODY = 500;
function describeFailure(result: {
  lastStatus: number;
  lastBody?: unknown;
  lastError?: string;
}): string {
  const parts: string[] = [`MailerLite ${result.lastStatus || "no_response"}`];
  if (result.lastError) parts.push(result.lastError);
  if (result.lastBody !== undefined) {
    let body: string;
    try {
      body = typeof result.lastBody === "string"
        ? result.lastBody
        : JSON.stringify(result.lastBody);
    } catch (_) {
      body = "[unserialisable body]";
    }
    if (body.length > MAX_ERROR_BODY) body = `${body.slice(0, MAX_ERROR_BODY)}…`;
    parts.push(body);
  }
  return parts.join(": ");
}

async function handle(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  // 1. shared-secret check — fail fast and DO NOT log here. Logging an
  //    unauthenticated row would let an attacker fill the table with junk.
  const expectedSecret = Deno.env.get("SYNC_USER_PROFILE_WEBHOOK_SECRET");
  try {
    assertWebhookSecret(req, expectedSecret);
  } catch (err) {
    if (err instanceof WebhookSecretError) {
      console.error(`${FUNCTION_NAME}: ${err.message}`);
      return jsonResponse(err.reason === "not configured" ? 503 : 401, {
        error: err.reason.replace(" ", "_"),
      });
    }
    throw err;
  }

  // 2. config + clients
  const apiKey = Deno.env.get("MAILERLITE_API_KEY");
  if (!apiKey) {
    console.error(`${FUNCTION_NAME}: MAILERLITE_API_KEY missing`);
    return jsonResponse(503, { error: "service_unavailable" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      `${FUNCTION_NAME}: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing — failing closed`,
    );
    return jsonResponse(503, { error: "service_unavailable" });
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // 3. parse the webhook payload
  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch (err) {
    console.error(`${FUNCTION_NAME}: bad JSON payload`, err);
    return jsonResponse(400, { error: "bad_payload" });
  }

  if (
    !payload ||
    payload.schema !== "public" ||
    payload.table !== "profiles" ||
    !payload.record
  ) {
    console.warn(`${FUNCTION_NAME}: ignoring unexpected payload shape`, {
      schema: payload?.schema,
      table: payload?.table,
      type: payload?.type,
    });
    return jsonResponse(200, { ok: true, ignored: true });
  }

  const userId = (payload.record.user_id ?? null) as string | null;

  // 4. diff the four watched columns
  const diff = diffWatchedFields(payload.old_record, payload.record);
  if (diff === null) {
    await writeLog(supabase, {
      user_id: userId,
      email: null,
      fields_synced: {},
      status: "skipped",
      error: null,
      attempt_count: 0,
    });
    return jsonResponse(200, { ok: true, skipped: "no_watched_change" });
  }

  // 5. look up the user's email — profiles has no email column.
  let email: string | null = null;
  if (userId) {
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    if (error) {
      console.error(`${FUNCTION_NAME}: getUserById failed`, error);
      await writeLog(supabase, {
        user_id: userId,
        email: null,
        fields_synced: diff as Record<string, unknown>,
        status: "failed",
        error: `getUserById: ${error.message ?? String(error)}`,
        attempt_count: 0,
      });
      return jsonResponse(502, { error: "user_lookup_failed" });
    }
    email = data?.user?.email ?? null;
  }

  if (!email) {
    await writeLog(supabase, {
      user_id: userId,
      email: null,
      fields_synced: diff as Record<string, unknown>,
      status: "not_found",
      error: "no email on auth.users row",
      attempt_count: 0,
    });
    return jsonResponse(200, { ok: true, skipped: "no_email" });
  }

  // 6. call MailerLite with retry
  const result = await callMailerLiteWithRetry({
    apiKey,
    email,
    fields: diff,
  });

  await writeLog(supabase, {
    user_id: userId,
    email,
    fields_synced: diff as Record<string, unknown>,
    status: result.ok ? "success" : "failed",
    error: result.ok ? null : describeFailure(result),
    attempt_count: result.attempts,
  });

  if (!result.ok) {
    return jsonResponse(502, {
      error: "mailerlite_call_failed",
      lastStatus: result.lastStatus,
      attempts: result.attempts,
    });
  }

  return jsonResponse(200, { ok: true, attempts: result.attempts });
}

// Top-level safety net: any unexpected throw past `handle` becomes a 500
// with a generic body. The detail goes to server logs only, so a malformed
// upstream payload or a transient runtime failure cannot leak internals
// (stack traces, env state) into the response.
serve(async (req) => {
  try {
    return await handle(req);
  } catch (err) {
    console.error(`${FUNCTION_NAME}: unhandled error`, err);
    return jsonResponse(500, { error: "internal" });
  }
});
