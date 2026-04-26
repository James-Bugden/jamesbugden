/**
 * Fire-and-forget sync of a new user's email to MailerLite via a
 * Supabase Edge Function. Called from sign-in, the Quiz, and the Join
 * form.
 *
 * The default behavior is intentionally fire-and-forget: callers like
 * AuthContext.onSignIn run during app bootstrap and must not block UI
 * on a third-party network call. MailerLite sync failures are not
 * user-actionable — the app owner (James) will see subscriber counts
 * in MailerLite and can diagnose from there.
 *
 * Callers that want visibility (e.g. the Quiz + Join forms, where a
 * user expects confirmation their email was captured) can pass an
 * `onResult` callback. It fires ONCE with `{ ok: true }` on success
 * or `{ ok: false, reason }` on failure. This lets the caller show a
 * toast or inline error without changing the void return type.
 */
export type MailerLiteResult = { ok: true } | { ok: false; reason: string };

export type MailerLiteSyncOptions = {
  /**
   * Optional drip-experiment variant (HIR-64). When omitted, the edge
   * function adds the subscriber to its default group, preserving prior
   * single-group behaviour for callers that do not participate in the
   * experiment.
   */
  dripVariant?: "control" | "treatment";
};

export function syncToMailerLite(
  email: string,
  name?: string,
  onResult?: (result: MailerLiteResult) => void,
  opts?: MailerLiteSyncOptions,
): void {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-mailerlite`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify({ email, name, drip_variant: opts?.dripVariant }),
    keepalive: true,
  })
    .then((res) => {
      if (res.ok) {
        onResult?.({ ok: true });
        return;
      }
      const reason = `HTTP ${res.status}`;
      if (import.meta.env.DEV) console.warn("[MailerLite] sync failed:", reason);
      onResult?.({ ok: false, reason });
    })
    .catch((err) => {
      const reason = err instanceof Error ? err.message : String(err);
      if (import.meta.env.DEV) console.warn("[MailerLite] sync error:", reason);
      onResult?.({ ok: false, reason });
    });
}
