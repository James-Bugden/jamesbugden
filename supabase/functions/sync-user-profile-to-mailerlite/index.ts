import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { diffWatchedFields, type ProfileRow } from "./changeDetection.ts";
import { callMailerLiteWithRetry } from "./retry.ts";

// HIR-146: Supabase database webhook target for `public.profiles` INSERT/UPDATE.
// On every fired webhook this function:
//   1. validates the shared-secret header (Supabase → only caller)
//   2. parses the profiles webhook payload
//   3. reads email directly from payload.record.email (added in HIR-143)
//   4. diffs the five watched profile-identity columns
//   5. upserts the subscriber in MailerLite with exponential backoff (max 3)
//   6. on permanent 4xx failure after retries: writes to sync_failures dead-letter
//
// Manual setup required after deploy (see PR description):
//   - SYNC_USER_PROFILE_WEBHOOK_SECRET secret on the edge function
//   - MAILERLITE_API_KEY secret on the edge function
//   - Supabase database webhook: table=profiles, events=INSERT+UPDATE
//   - MailerLite custom fields: full_name, job_title, company, country, linkedin_url

const FUNCTION_NAME = "sync-user-profile-to-mailerlite";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: ProfileRow | null;
  old_record: ProfileRow | null;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

class WebhookSecretError extends Error {
  constructor(public readonly reason: "not configured" | "invalid") {
    super(`webhook secret ${reason}`);
  }
}

function assertWebhookSecret(req: Request, expected: string | undefined): void {
  if (!expected) {
    throw new WebhookSecretError("not configured");
  }
  const actual = req.headers.get("x-webhook-secret");
  if (!actual || actual !== expected) {
    throw new WebhookSecretError("invalid");
  }
}

// Cap for readability in logs; the TEXT column itself is unbounded.
const MAX_SYNC_FAILURE_BODY = 500;

function buildErrorSummary(result: {
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
    if (body.length > MAX_SYNC_FAILURE_BODY) {
      body = `${body.slice(0, MAX_SYNC_FAILURE_BODY)}…`;
    }
    parts.push(body);
  }
  return parts.join(": ");
}

async function writeDeadLetter(
  supabase: ReturnType<typeof createClient>,
  payload: unknown,
  error: string,
): Promise<void> {
  const { error: dbErr } = await supabase
    .from("sync_failures")
    .insert({ payload, error });
  if (dbErr) {
    console.error(`${FUNCTION_NAME}: failed to write dead-letter row`, dbErr);
  }
}

async function handle(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

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

  const apiKey = Deno.env.get("MAILERLITE_API_KEY");
  if (!apiKey) {
    console.error(`${FUNCTION_NAME}: MAILERLITE_API_KEY missing`);
    return jsonResponse(503, { error: "service_unavailable" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(`${FUNCTION_NAME}: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing`);
    return jsonResponse(503, { error: "service_unavailable" });
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  let rawPayload: unknown;
  let payload: WebhookPayload;
  try {
    rawPayload = await req.json();
    payload = rawPayload as WebhookPayload;
  } catch (err) {
    console.error(`${FUNCTION_NAME}: bad JSON payload`, err);
    return jsonResponse(400, { error: "bad_payload" });
  }

  if (
    !payload ||
    payload.schema !== "public" ||
    payload.table !== "profiles" ||
    (payload.type !== "INSERT" && payload.type !== "UPDATE") ||
    !payload.record
  ) {
    console.warn(`${FUNCTION_NAME}: ignoring unexpected payload`, {
      schema: payload?.schema,
      table: payload?.table,
      type: payload?.type,
    });
    return jsonResponse(200, { ok: true, ignored: true });
  }

  const email = typeof payload.record.email === "string" ? payload.record.email : null;
  if (!email) {
    console.warn(`${FUNCTION_NAME}: no email on profiles row — skipping`);
    return jsonResponse(200, { ok: true, skipped: "no_email" });
  }

  const diff = diffWatchedFields(payload.old_record, payload.record);
  if (diff === null) {
    return jsonResponse(200, { ok: true, skipped: "no_watched_change" });
  }

  const result = await callMailerLiteWithRetry({ apiKey, email, fields: diff });

  if (!result.ok) {
    const errSummary = buildErrorSummary(result);
    console.error(`${FUNCTION_NAME}: MailerLite call failed`, {
      lastStatus: result.lastStatus,
      attempts: result.attempts,
      error: errSummary,
    });

    // Dead-letter only on permanent 4xx (e.g. invalid email, bad API key).
    // 5xx exhaustion and network errors are transient — log but don't dead-letter
    // so the caller can retry the webhook delivery if needed.
    const isPermanent4xx =
      result.lastStatus >= 400 &&
      result.lastStatus < 500 &&
      result.lastStatus !== 429;
    if (isPermanent4xx) {
      await writeDeadLetter(supabase, rawPayload, errSummary);
    }

    return jsonResponse(502, {
      error: "mailerlite_call_failed",
      lastStatus: result.lastStatus,
      attempts: result.attempts,
    });
  }

  return jsonResponse(200, { ok: true, attempts: result.attempts });
}

serve(async (req) => {
  try {
    return await handle(req);
  } catch (err) {
    console.error(`${FUNCTION_NAME}: unhandled error`, err);
    return jsonResponse(500, { error: "internal" });
  }
});
