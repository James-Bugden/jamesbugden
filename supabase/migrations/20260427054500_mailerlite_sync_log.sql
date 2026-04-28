-- HIR-68: log every invocation of the sync-user-profile-to-mailerlite Edge
-- Function. One row per call (success, failure, skipped no-op, or
-- not-found). Kept private to service-role so the four watched columns'
-- values never leak through this audit trail.
--
-- Pattern mirrors edge_function_rate_limit_log (HIR-88): RLS enabled, no
-- policies — service-role bypasses RLS, anon/authenticated have no access.

CREATE TABLE public.mailerlite_sync_log (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  email          text,
  fields_synced  jsonb       NOT NULL DEFAULT '{}'::jsonb,
  status         text        NOT NULL,
  error          text,
  attempted_at   timestamptz NOT NULL DEFAULT now(),
  attempt_count  integer     NOT NULL DEFAULT 0,
  CONSTRAINT mailerlite_sync_log_status_check
    CHECK (status IN ('success', 'failed', 'skipped', 'not_found'))
);

-- Hot read: "show me the last N attempts for user X" or "show me the last
-- N failures across all users for triage".
CREATE INDEX idx_mailerlite_sync_log_user_attempted
  ON public.mailerlite_sync_log (user_id, attempted_at DESC);
CREATE INDEX idx_mailerlite_sync_log_status_attempted
  ON public.mailerlite_sync_log (status, attempted_at DESC);

ALTER TABLE public.mailerlite_sync_log ENABLE ROW LEVEL SECURITY;
-- No policies: service_role bypasses RLS, all client roles are denied.
-- The watched columns can be mildly sensitive (e.g. job_search_stage); we
-- keep this audit trail server-only.

COMMENT ON TABLE public.mailerlite_sync_log IS
  'HIR-68: audit trail for sync-user-profile-to-mailerlite Edge Function. Service role only.';

-- ============================================================================
-- ROLLBACK (forward-only schema; run manually if reversion is required).
-- ============================================================================
-- DROP TABLE IF EXISTS public.mailerlite_sync_log;
