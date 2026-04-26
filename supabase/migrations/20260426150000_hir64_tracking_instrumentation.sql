-- HIR-64: Sprint 1 tracking instrumentation
--
-- Adds profile + lead variant columns, atomic+idempotent assignment RPCs,
-- a server-trusted view that projects the experiment-spec shape over the
-- existing tool_completions table, and a daily pg_cron job that flips the
-- returned_day2_14 flag from authoritative session data.
--
-- Design notes (see HIR-64 thread for full rationale):
-- * event_tracks is a jsonb firehose; we do NOT extend it. Instead, the
--   first_session_tool_action signal is read off tool_completions via the
--   v_first_session_tool_action view below, which keeps the analyst-facing
--   shape (action_type, variant, is_first_session, timestamp) without
--   denormalising columns the firehose was never meant to carry.
-- * is_first_session is computed server-side as "this row's session_id
--   matches the user's earliest authenticated session". Sessions already
--   carry user_id + started_at; no client trust needed.
-- * Variant assignment uses SECURITY DEFINER RPCs that no-op if a variant
--   is already set, so a redrive cannot overwrite a sticky assignment.
-- * For the email-capture path the variant is written onto the
--   email_gate_leads row (anon-callable). On first authenticated sign-in
--   we reconcile that variant onto profiles via assign_drip_variant_for_user.
-- * Picked Supabase pg_cron for the return-visit flag instead of GA4
--   because the repo has no GA4 wiring at all and we already track
--   authoritative session data in postgres. See HIR-64 PR for the
--   full rationale on choosing option (b) over option (a).

-- 1. profiles columns -------------------------------------------------------

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_variant text,
  ADD COLUMN IF NOT EXISTS drip_variant text,
  ADD COLUMN IF NOT EXISTS returned_day2_14 boolean NOT NULL DEFAULT false;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'profiles_onboarding_variant_check'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_onboarding_variant_check
      CHECK (onboarding_variant IS NULL OR onboarding_variant IN ('control','treatment'));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'profiles_drip_variant_check'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_drip_variant_check
      CHECK (drip_variant IS NULL OR drip_variant IN ('control','treatment'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_variant ON public.profiles(onboarding_variant);
CREATE INDEX IF NOT EXISTS idx_profiles_drip_variant ON public.profiles(drip_variant);
CREATE INDEX IF NOT EXISTS idx_profiles_returned_day2_14 ON public.profiles(returned_day2_14);

-- 2. email_gate_leads.drip_variant (anon path before profile exists) --------

ALTER TABLE public.email_gate_leads
  ADD COLUMN IF NOT EXISTS drip_variant text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'email_gate_leads_drip_variant_check'
  ) THEN
    ALTER TABLE public.email_gate_leads
      ADD CONSTRAINT email_gate_leads_drip_variant_check
      CHECK (drip_variant IS NULL OR drip_variant IN ('control','treatment'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_email_gate_leads_drip_variant
  ON public.email_gate_leads(drip_variant);

-- 3. assign_onboarding_variant ---------------------------------------------
-- Idempotent. Returns the existing variant if already set; otherwise picks
-- random 50/50 and stores it. SECURITY DEFINER + auth.uid() check so the
-- caller can only ever assign their own profile.

CREATE OR REPLACE FUNCTION public.assign_onboarding_variant(p_user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current text;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT onboarding_variant INTO v_current
    FROM public.profiles WHERE user_id = p_user_id;

  IF v_current IS NOT NULL THEN
    RETURN v_current;
  END IF;

  UPDATE public.profiles
     SET onboarding_variant = CASE WHEN random() < 0.5 THEN 'control' ELSE 'treatment' END
   WHERE user_id = p_user_id AND onboarding_variant IS NULL
   RETURNING onboarding_variant INTO v_current;

  RETURN v_current;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_onboarding_variant(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_onboarding_variant(uuid) TO authenticated;

-- 4. assign_drip_variant_for_lead ------------------------------------------
-- Anon-callable (the email-capture form fires before auth). Caller passes
-- the lead id of the row they just inserted. Idempotent.

CREATE OR REPLACE FUNCTION public.assign_drip_variant_for_lead(p_lead_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current text;
BEGIN
  SELECT drip_variant INTO v_current
    FROM public.email_gate_leads WHERE id = p_lead_id;

  IF v_current IS NOT NULL THEN
    RETURN v_current;
  END IF;

  UPDATE public.email_gate_leads
     SET drip_variant = CASE WHEN random() < 0.5 THEN 'control' ELSE 'treatment' END
   WHERE id = p_lead_id AND drip_variant IS NULL
   RETURNING drip_variant INTO v_current;

  RETURN v_current;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_drip_variant_for_lead(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_drip_variant_for_lead(uuid) TO anon, authenticated;

-- 5. assign_drip_variant_for_user ------------------------------------------
-- Used at first authenticated sign-in. Reconciles the variant from the most
-- recent matching email_gate_leads row when present so a user keeps the
-- variant they were captured under; otherwise assigns fresh random 50/50.

CREATE OR REPLACE FUNCTION public.assign_drip_variant_for_user(p_user_id uuid, p_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current text;
  v_lead text;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT drip_variant INTO v_current
    FROM public.profiles WHERE user_id = p_user_id;

  IF v_current IS NOT NULL THEN
    RETURN v_current;
  END IF;

  SELECT drip_variant INTO v_lead
    FROM public.email_gate_leads
   WHERE lower(email) = lower(p_email)
     AND drip_variant IS NOT NULL
   ORDER BY created_at DESC
   LIMIT 1;

  UPDATE public.profiles
     SET drip_variant = COALESCE(
           v_lead,
           CASE WHEN random() < 0.5 THEN 'control' ELSE 'treatment' END
         )
   WHERE user_id = p_user_id AND drip_variant IS NULL
   RETURNING drip_variant INTO v_current;

  RETURN v_current;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_drip_variant_for_user(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_drip_variant_for_user(uuid, text) TO authenticated;

-- 6. v_first_session_tool_action --------------------------------------------
-- Projects the tool_completions firehose into the experiment-spec shape:
--   user_id, session_id, action_type, variant, is_first_session, timestamp
-- The (tool, action) tuples that count toward the funnel are listed once
-- here so the experiment surface and the writer code can stay in sync.

CREATE OR REPLACE VIEW public.v_first_session_tool_action AS
WITH user_first_session AS (
  SELECT DISTINCT ON (user_id)
         user_id,
         id          AS first_session_id,
         started_at  AS first_started_at
    FROM public.sessions
   WHERE user_id IS NOT NULL
   ORDER BY user_id, started_at ASC
)
SELECT tc.id,
       tc.user_id,
       tc.session_id,
       CASE
         WHEN tc.tool = 'resume_analyzer' AND tc.action = 'resume_uploaded' THEN 'resume_upload'
         WHEN tc.tool = 'guide'           AND tc.action = 'started'         THEN 'guide_start'
         WHEN tc.tool = 'qbank'           AND tc.action = 'visited'         THEN 'qbank_visit'
       END AS action_type,
       p.onboarding_variant AS variant,
       (
         tc.session_id IS NOT NULL
         AND ufs.first_session_id IS NOT NULL
         AND tc.session_id = ufs.first_session_id
       ) AS is_first_session,
       tc.created_at AS "timestamp"
  FROM public.tool_completions tc
  LEFT JOIN public.profiles p          ON p.user_id  = tc.user_id
  LEFT JOIN user_first_session ufs     ON ufs.user_id = tc.user_id
 WHERE tc.user_id IS NOT NULL
   AND (
        (tc.tool = 'resume_analyzer' AND tc.action = 'resume_uploaded')
     OR (tc.tool = 'guide'           AND tc.action = 'started')
     OR (tc.tool = 'qbank'           AND tc.action = 'visited')
   );

GRANT SELECT ON public.v_first_session_tool_action TO authenticated;

-- 7. v_profiles_first_session_actioned --------------------------------------
-- Per-user boolean — true iff the user has any first_session_tool_action
-- row in their first authenticated session. Drop-in for analyst queries
-- that just want a yes/no funnel column.

CREATE OR REPLACE VIEW public.v_profiles_first_session_actioned AS
SELECT p.user_id,
       p.onboarding_variant,
       p.drip_variant,
       p.returned_day2_14,
       p.created_at,
       EXISTS (
         SELECT 1 FROM public.v_first_session_tool_action f
          WHERE f.user_id = p.user_id
            AND f.is_first_session = true
       ) AS first_session_actioned
  FROM public.profiles p;

GRANT SELECT ON public.v_profiles_first_session_actioned TO authenticated;

-- 8. refresh_returned_day2_14 + nightly schedule ----------------------------
-- Sets profiles.returned_day2_14 = true when the user has at least one
-- session in [created_at + 2 days, created_at + 14 days). Designed to be
-- safe to run repeatedly; only flips false → true.

CREATE OR REPLACE FUNCTION public.refresh_returned_day2_14()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated integer;
BEGIN
  WITH updated AS (
    UPDATE public.profiles p
       SET returned_day2_14 = true
     WHERE returned_day2_14 = false
       AND EXISTS (
         SELECT 1 FROM public.sessions s
          WHERE s.user_id = p.user_id
            AND s.started_at >= p.created_at + interval '2 days'
            AND s.started_at <  p.created_at + interval '14 days'
       )
    RETURNING 1
  )
  SELECT count(*)::int INTO v_updated FROM updated;
  RETURN v_updated;
END;
$$;

REVOKE ALL ON FUNCTION public.refresh_returned_day2_14() FROM PUBLIC;

DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    BEGIN
      PERFORM cron.unschedule('refresh_returned_day2_14');
    EXCEPTION WHEN OTHERS THEN
      -- job didn't exist yet; nothing to clean up
      NULL;
    END;
    PERFORM cron.schedule(
      'refresh_returned_day2_14',
      '0 2 * * *',
      $job$SELECT public.refresh_returned_day2_14();$job$
    );
  ELSE
    RAISE NOTICE 'pg_cron extension not enabled; refresh_returned_day2_14 must be scheduled manually after enabling pg_cron in the Supabase dashboard';
  END IF;
END
$cron$;
