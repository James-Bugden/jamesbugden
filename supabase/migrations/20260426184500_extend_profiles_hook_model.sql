-- HIR-65: Extend public.profiles with Hook Model V4 columns + auto-create trigger.
-- Decision: Option A (extend existing table; do NOT create user_profiles).
-- See HIR-65 plan document and director-engineering decision comment for context.

-- ----------------------------------------------------------------------------
-- 1. New columns
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS target_role             TEXT,
  ADD COLUMN IF NOT EXISTS target_industry         TEXT,
  ADD COLUMN IF NOT EXISTS tuesday_email_opted_in  BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS daily_task_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS job_search_stage        TEXT;

-- 4-value CHECK on job_search_stage (NULL allowed — set on onboarding completion).
DO $$
BEGIN
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_job_search_stage_check
    CHECK (job_search_stage IS NULL OR job_search_stage IN ('starting','applying','interviewing','negotiating'));
EXCEPTION WHEN duplicate_object THEN
  NULL;
END $$;

-- ----------------------------------------------------------------------------
-- 2. Backfill job_search_stage from career_phase for the 3 overlap values.
--    career_phase is unconstrained TEXT; only mirror the 3 known values.
-- ----------------------------------------------------------------------------
UPDATE public.profiles
SET job_search_stage = career_phase
WHERE job_search_stage IS NULL
  AND career_phase IN ('applying','interviewing','negotiating');

-- ----------------------------------------------------------------------------
-- 3. Bidirectional sync: career_phase <-> job_search_stage.
--    Lets existing UI keep writing career_phase while new features write
--    job_search_stage; both stay consistent for the 3 overlapping values.
--    'starting' has no career_phase equivalent — career_phase stays NULL.
--    Conflict policy: when both are explicitly set in the same write,
--    job_search_stage wins (new column is the future source of truth).
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.profiles_sync_phase_stage()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  cp_changed BOOLEAN;
  js_changed BOOLEAN;
BEGIN
  IF TG_OP = 'INSERT' THEN
    cp_changed := NEW.career_phase IS NOT NULL;
    js_changed := NEW.job_search_stage IS NOT NULL;
  ELSE
    cp_changed := NEW.career_phase IS DISTINCT FROM OLD.career_phase;
    js_changed := NEW.job_search_stage IS DISTINCT FROM OLD.job_search_stage;
  END IF;

  IF js_changed THEN
    IF NEW.job_search_stage IN ('applying','interviewing','negotiating') THEN
      NEW.career_phase := NEW.job_search_stage;
    ELSE
      -- 'starting' or NULL — no career_phase equivalent.
      NEW.career_phase := NULL;
    END IF;
  ELSIF cp_changed THEN
    IF NEW.career_phase IN ('applying','interviewing','negotiating') THEN
      NEW.job_search_stage := NEW.career_phase;
    ELSIF NEW.career_phase IS NULL THEN
      NEW.job_search_stage := NULL;
    END IF;
    -- career_phase has no CHECK; for any other non-null value, leave
    -- job_search_stage alone rather than violating its CHECK constraint.
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_sync_phase_stage ON public.profiles;
CREATE TRIGGER profiles_sync_phase_stage
  BEFORE INSERT OR UPDATE OF career_phase, job_search_stage ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_sync_phase_stage();

-- ----------------------------------------------------------------------------
-- 4. updated_at trigger
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.profiles_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_set_updated_at();

-- ----------------------------------------------------------------------------
-- 5. handle_new_user trigger on auth.users — auto-create profiles row.
--    SECURITY DEFINER so the trigger can insert into public.profiles
--    regardless of the writing role. ON CONFLICT DO NOTHING covers any race
--    against the legacy app-side insert path in src/hooks/useProfile.ts.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 6. Backfill: every auth.users row must have a profiles row.
-- ----------------------------------------------------------------------------
INSERT INTO public.profiles (user_id)
SELECT u.id
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- ROLLBACK (forward-only schema; run manually if reversion is required).
-- Drops only what this migration added; pre-existing profiles columns and the
-- profiles table itself are left intact.
-- ============================================================================
--
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_new_user();
-- DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
-- DROP FUNCTION IF EXISTS public.profiles_set_updated_at();
-- DROP TRIGGER IF EXISTS profiles_sync_phase_stage ON public.profiles;
-- DROP FUNCTION IF EXISTS public.profiles_sync_phase_stage();
-- ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_job_search_stage_check;
-- ALTER TABLE public.profiles
--   DROP COLUMN IF EXISTS job_search_stage,
--   DROP COLUMN IF EXISTS updated_at,
--   DROP COLUMN IF EXISTS daily_task_completed_at,
--   DROP COLUMN IF EXISTS tuesday_email_opted_in,
--   DROP COLUMN IF EXISTS target_industry,
--   DROP COLUMN IF EXISTS target_role;
