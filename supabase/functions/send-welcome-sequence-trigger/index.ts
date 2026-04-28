import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  assertWebhookSecret,
  WebhookSecretError,
} from "./webhookSecret.ts";

// HIR-70: database webhook target for `public.resume_leads` INSERT.
// Steps: validate secret → idempotency check by email → profile stage lookup
// → MailerLite subscription with resume_score + optional stage_branch
// → set welcome_sequence_started_at on triggering row → log.
//
// Manual setup required after deploy (see PR description):
//   1. Supabase database webhook: INSERT on public.resume_leads
//   2. Set SEND_WELCOME_SEQUENCE_WEBHOOK_SECRET edge function secret
//   3. Ensure MailerLite custom fields resume_score + stage_branch exist

const FUNCTION_NAME = "send-welcome-sequence-trigger";
const MAILERLITE_GROUP = "181733295867823354";
const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";

// ---- Types ---------------------------------------------------------------

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: ResumeLeadRow | null;
  old_record: ResumeLeadRow | null;
}

interface ResumeLeadRow {
  id: string;
  email: string;
  name: string | null;
  overall_score: number | null;
  welcome_sequence_started_at: string | null;
  [key: string]: unknown;
}

type LogStatus = "success" | "failed" | "skipped";

interface LogRow {
  email: string | null;
  fields_synced: Record<string, unknown>;
  status: LogStatus;
  error: string | null;
  attempt_count: number;
  user_id: string | null;
}

export interface MailerLiteResult {
  ok: boolean;
  status: number;
}

export interface Deps {
  getEnv: (key: string) => string | undefined;
  supabaseFactory: (url: string, key: string) => ReturnType<typeof createClient>;
  mailerLiteFetch: (
    email: string,
    fields: Record<string, unknown>,
    groups: string[],
  ) => Promise<MailerLiteResult>;
}

const defaultDeps: Deps = {
  getEnv: (key) => Deno.env.get(key),
  supabaseFactory: createClient,
  mailerLiteFetch: async (email, fields, groups) => {
    const apiKey = Deno.env.get("MAILERLITE_API_KEY")!;
    const res = await fetch(MAILERLITE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, fields, groups, status: "active" }),
    });
    return { ok: res.ok, status: res.status };
  },
};

// ---- Helpers -------------------------------------------------------------

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function splitName(fullName: string | null): { first: string; last: string } {
  const parts = (fullName ?? "").trim().split(/\s+/);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") ?? "" };
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

// ---- Handler (exported for unit tests) -----------------------------------

export async function handleRequest(
  req: Request,
  deps: Deps = defaultDeps,
): Promise<Response> {
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "method_not_allowed" });
  }

  // 1. Shared-secret validation — fail-closed, no logging before this passes.
  const expectedSecret = deps.getEnv("SEND_WELCOME_SEQUENCE_WEBHOOK_SECRET");
  try {
    assertWebhookSecret(req, expectedSecret);
  } catch (err) {
    if (err instanceof WebhookSecretError) {
      console.error(`${FUNCTION_NAME}: ${err.message}`);
      return jsonResponse(
        err.reason === "not configured" ? 503 : 401,
        { error: err.reason.replace(" ", "_") },
      );
    }
    throw err;
  }

  // 2. Supabase client (service role — reads profiles, writes back to resume_leads).
  const supabaseUrl = deps.getEnv("SUPABASE_URL");
  const serviceRoleKey = deps.getEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(`${FUNCTION_NAME}: missing Supabase env vars — failing closed`);
    return jsonResponse(503, { error: "service_unavailable" });
  }
  const supabase = deps.supabaseFactory(supabaseUrl, serviceRoleKey);

  // 3. Parse webhook payload.
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
    payload.table !== "resume_leads" ||
    payload.type !== "INSERT" ||
    !payload.record
  ) {
    console.warn(`${FUNCTION_NAME}: ignoring unexpected payload shape`, {
      schema: payload?.schema,
      table: payload?.table,
      type: payload?.type,
    });
    return jsonResponse(200, { ok: true, ignored: true });
  }

  const row = payload.record;
  const email = row.email;
  const rowId = row.id;

  // 4. Idempotency: skip if any resume_leads row for this email already has
  //    welcome_sequence_started_at set (PRD acceptance criteria 4 + 7).
  const { data: existingRows, error: idempotencyErr } = await supabase
    .from("resume_leads")
    .select("id")
    .eq("email", email)
    .not("welcome_sequence_started_at", "is", null)
    .limit(1);

  if (idempotencyErr) {
    console.error(`${FUNCTION_NAME}: idempotency check failed`, idempotencyErr);
    return jsonResponse(502, { error: "idempotency_check_failed" });
  }

  if (existingRows && existingRows.length > 0) {
    await writeLog(supabase, {
      email,
      fields_synced: {},
      status: "skipped",
      error: null,
      attempt_count: 0,
      user_id: null,
    });
    return jsonResponse(200, { ok: true, skipped: "already_in_sequence" });
  }

  // 5. Look up profiles.job_search_stage by denormalized email (added in HIR-143).
  //    No error if no profile found — just means no stage-branching for this subscriber.
  const { data: profileRow } = await supabase
    .from("profiles")
    .select("job_search_stage")
    .eq("email", email)
    .maybeSingle();

  const isNegotiating = profileRow?.job_search_stage === "negotiating";

  // 6. Build MailerLite subscriber fields (PRD AC 5 + copy merge tags from HIR-73).
  const { first, last } = splitName(row.name);
  const fields: Record<string, unknown> = {
    name: first,
    last_name: last,
    resume_score: row.overall_score ?? null,
  };
  if (isNegotiating) {
    fields.stage_branch = "negotiating";
  }

  // 7. Subscribe to group — triggers MailerLite automation (PRD AC 1).
  const mlResult = await deps.mailerLiteFetch(email, fields, [MAILERLITE_GROUP]);

  if (!mlResult.ok) {
    console.error(`${FUNCTION_NAME}: MailerLite call failed`, {
      status: mlResult.status,
      email,
    });
    await writeLog(supabase, {
      email,
      fields_synced: fields,
      status: "failed",
      error: `MailerLite ${mlResult.status}`,
      attempt_count: 1,
      user_id: null,
    });
    return jsonResponse(502, {
      error: "mailerlite_call_failed",
      status: mlResult.status,
    });
  }

  // 8. Set welcome_sequence_started_at on the triggering row (PRD AC 7).
  const { error: updateErr } = await supabase
    .from("resume_leads")
    .update({ welcome_sequence_started_at: new Date().toISOString() })
    .eq("id", rowId);

  if (updateErr) {
    // MailerLite succeeded — log success but surface the DB update failure.
    console.error(
      `${FUNCTION_NAME}: failed to set welcome_sequence_started_at`,
      updateErr,
    );
    await writeLog(supabase, {
      email,
      fields_synced: fields,
      status: "success",
      error: `DB update failed: ${updateErr.message}`,
      attempt_count: 1,
      user_id: null,
    });
    return jsonResponse(207, { ok: true, warning: "db_update_failed" });
  }

  await writeLog(supabase, {
    email,
    fields_synced: fields,
    status: "success",
    error: null,
    attempt_count: 1,
    user_id: null,
  });

  return jsonResponse(200, { ok: true });
}

// ---- Entry point (guarded so serve() doesn't fire when imported in tests) -

if (import.meta.main) {
  serve(async (req) => {
    try {
      return await handleRequest(req, defaultDeps);
    } catch (err) {
      console.error(`${FUNCTION_NAME}: unhandled error`, err);
      return new Response(JSON.stringify({ error: "internal" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  });
}
