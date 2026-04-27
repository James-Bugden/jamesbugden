# `sync-user-profile-to-mailerlite`

Supabase Edge Function. Implements HIR-68 (Hook Model V4 Sprint 0 step 4).

## What it does

When `target_role`, `target_industry`, `job_search_stage`, or
`tuesday_email_opted_in` change in `public.profiles`, push the new value to
the matching MailerLite subscriber (looked up by email) as a custom field.

Logs every invocation to `public.mailerlite_sync_log` (status: `success` /
`failed` / `skipped` / `not_found`).

## Why these four fields

Per the V4 doc, MailerLite needs `job_search_stage` to branch the welcome
drip toward `negotiating` users (salary-focused content). `target_role` and
`target_industry` personalise email subject lines. `tuesday_email_opted_in`
gates the Tuesday Job Market Intel briefing.

## Flow

```
public.profiles UPDATE
   │  (Supabase Database Webhook in Studio)
   ▼  POST {record, old_record, type, table, schema}
   │  Header: x-webhook-secret: $SYNC_USER_PROFILE_WEBHOOK_SECRET
   ▼
sync-user-profile-to-mailerlite
   1. assertWebhookSecret      → 401 if wrong, 503 if unconfigured
   2. parse payload             → 400 if bad shape; 200 ignore if not profiles
   3. diffWatchedFields         → 200 skipped if no watched field changed
   4. auth.admin.getUserById    → 200 not_found if user/email missing
   5. callMailerLiteWithRetry   → up to 3 attempts on 429+5xx
   6. mailerlite_sync_log       → one row per call
```

## One-time setup (after deploy)

### 1. MailerLite custom fields

Subscribers → Fields → New custom field. Add **all four** with the exact
keys below (MailerLite ignores unknown keys silently — getting these wrong
is the failure mode you will not see in the log):

| Field key                | Type    |
| ------------------------ | ------- |
| `target_role`            | Text    |
| `target_industry`        | Text    |
| `job_search_stage`       | Text    |
| `tuesday_email_opted_in` | Boolean |

### 2. Edge function secrets (Supabase Studio → Project Settings → Functions)

| Secret                              | Value                                                              |
| ----------------------------------- | ------------------------------------------------------------------ |
| `MAILERLITE_API_KEY`                | already configured for `sync-mailerlite`; reuse it                 |
| `SYNC_USER_PROFILE_WEBHOOK_SECRET`  | new — generate a strong random string (32+ bytes hex/base64)       |
| `SUPABASE_URL`                      | auto-injected                                                      |
| `SUPABASE_SERVICE_ROLE_KEY`         | auto-injected                                                      |

### 3. Database webhook (Supabase Studio → Database → Webhooks)

| Setting          | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| Name             | `sync-user-profile-to-mailerlite`                                |
| Table            | `public.profiles`                                                |
| Events           | **UPDATE only** (do not enable INSERT or DELETE)                 |
| Type             | HTTP Request → POST                                              |
| URL              | the deployed Edge Function URL                                   |
| Headers          | `x-webhook-secret: <value of SYNC_USER_PROFILE_WEBHOOK_SECRET>`  |

You can leave the default 1000ms timeout. Supabase database webhooks do not
retry on their own; the function's internal retry handles transient
MailerLite outages.

## Acceptance criteria mapping

- AC 1 (10s update propagation): Supabase webhooks fire on the same
  transaction commit; one MailerLite POST roundtrip is well under 10s.
- AC 2 (`negotiating` reaches MailerLite): the value is sent verbatim as
  `fields.job_search_stage`.
- AC 3 (don't modify unrelated fields): we send only the diffed subset of
  the four watched columns and omit `groups` from the payload.
- AC 4 (retry with backoff on transient failures): `retry.ts` retries 429 +
  5xx up to 3 times with `[200ms, 500ms, 1500ms]` backoff and logs final
  attempt count.
- AC 5 (no double-write per change): `diffWatchedFields` returns null when
  none of the four changed, short-circuiting the MailerLite call.

## Local dev / tests

The repo doesn't run Deno tests in CI. To run manually:

```sh
deno test supabase/functions/sync-user-profile-to-mailerlite/
```

The unit tests cover the three pure modules. There is no end-to-end test
because that would require a live MailerLite tenant. The
`mailerlite_sync_log` table is the runtime "test" — query it after a
profile update in staging to confirm the success row landed.

## Deployment automation

For convenience, a deployment script is included:

```sh
# View deployment steps
./supabase/functions/sync-user-profile-to-mailerlite/deploy.sh

# Or use the verification checklist
cat supabase/functions/sync-user-profile-to-mailerlite/VERIFY.md
```

**Generated webhook secret**: `E5uYvaXts+f8aZ9grHGgfO1CPOr3Ge9fWL+30/a9/rU=`

Save this for the database webhook header and Edge Function secret.
