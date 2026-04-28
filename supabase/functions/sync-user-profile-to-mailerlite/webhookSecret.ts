// HIR-68: shared-secret check for the Supabase database webhook that fires
// this function. Supabase database webhooks attach configurable headers; we
// require `x-webhook-secret` to match SYNC_USER_PROFILE_WEBHOOK_SECRET so an
// arbitrary internet caller cannot drive MailerLite custom-field writes.
//
// Fail-closed: if the configured secret is empty/unset, throw immediately
// rather than letting any request through.

const HEADER = "x-webhook-secret";

export class WebhookSecretError extends Error {
  constructor(message: string, public readonly reason: "not configured" | "missing" | "mismatch") {
    super(message);
    this.name = "WebhookSecretError";
  }
}

export function assertWebhookSecret(req: Request, expected: string | undefined | null): true {
  if (!expected) {
    throw new WebhookSecretError(
      "webhook secret not configured (SYNC_USER_PROFILE_WEBHOOK_SECRET)",
      "not configured",
    );
  }
  const got = req.headers.get(HEADER);
  if (!got) {
    throw new WebhookSecretError(`webhook secret header missing (${HEADER})`, "missing");
  }
  if (got !== expected) {
    throw new WebhookSecretError("webhook secret mismatch", "mismatch");
  }
  return true;
}
