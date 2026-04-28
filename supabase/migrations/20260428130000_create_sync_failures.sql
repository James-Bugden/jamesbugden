-- HIR-146: dead-letter table for sync-user-profile-to-mailerlite Edge Function.
-- Rows are written only on permanent failure (4xx from MailerLite after all
-- retries). Service-role only — no policies so authenticated clients cannot
-- read or write this table.
--
-- Post-merge action: James must apply this migration via Lovable's in-app
-- migration tool. Lovable Publish does NOT run migrations automatically.

CREATE TABLE IF NOT EXISTS public.sync_failures (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  payload     JSONB       NOT NULL,
  error       TEXT        NOT NULL
);

ALTER TABLE public.sync_failures ENABLE ROW LEVEL SECURITY;
-- No policies: service_role bypasses RLS, all client roles are denied.

COMMENT ON TABLE public.sync_failures IS
  'HIR-146: dead-letter log for sync-user-profile-to-mailerlite. '
  'One row per permanent MailerLite failure after max retries. Service role only.';

-- ============================================================================
-- ROLLBACK (forward-only schema; run manually if reversion is required).
-- ============================================================================
-- DROP TABLE IF EXISTS public.sync_failures;
