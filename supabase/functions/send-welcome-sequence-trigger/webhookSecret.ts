// Shared-secret check for the Supabase database webhook driving this function.
// Reads SEND_WELCOME_SEQUENCE_WEBHOOK_SECRET from env. Fail-closed: if
// the env var is unset, every request is rejected 503.

const HEADER = "x-webhook-secret";

export class WebhookSecretError extends Error {
  constructor(
    message: string,
    public readonly reason: "not configured" | "missing" | "mismatch",
  ) {
    super(message);
    this.name = "WebhookSecretError";
  }
}

export function assertWebhookSecret(
  req: Request,
  expected: string | undefined | null,
): true {
  if (!expected) {
    throw new WebhookSecretError(
      "webhook secret not configured (SEND_WELCOME_SEQUENCE_WEBHOOK_SECRET)",
      "not configured",
    );
  }
  const got = req.headers.get(HEADER);
  if (!got) {
    throw new WebhookSecretError(
      `webhook secret header missing (${HEADER})`,
      "missing",
    );
  }
  if (got !== expected) {
    throw new WebhookSecretError("webhook secret mismatch", "mismatch");
  }
  return true;
}
