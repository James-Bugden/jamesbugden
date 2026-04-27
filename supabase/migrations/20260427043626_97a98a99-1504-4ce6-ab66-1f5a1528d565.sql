-- 1. Columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS target_role             TEXT,
  ADD COLUMN IF NOT EXISTS target_industry         TEXT,
  ADD COLUMN IF NOT EXISTS tuesday_email_opted_in  BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS daily_task_completed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS job_search_stage        TEXT;

DO $$ BEGIN
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_job_search_stage_check
    CHECK (job_search_stage IS NULL OR job_search_stage IN ('starting','applying','interviewing','negotiating'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Ensure user_id is unique so ON CONFLICT (user_id) works
DO $$ BEGIN
  ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL; END $$;

-- 2. Backfill job_search_stage from career_phase
UPDATE public.profiles SET job_search_stage = career_phase
  WHERE job_search_stage IS NULL AND career_phase IN ('applying','interviewing','negotiating');

-- 3. Sync trigger between career_phase and job_search_stage
CREATE OR REPLACE FUNCTION public.profiles_sync_phase_stage()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE cp_changed BOOLEAN; js_changed BOOLEAN;
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
      NEW.career_phase := NULL;
    END IF;
  ELSIF cp_changed THEN
    IF NEW.career_phase IN ('applying','interviewing','negotiating') THEN
      NEW.job_search_stage := NEW.career_phase;
    ELSIF NEW.career_phase IS NULL THEN
      NEW.job_search_stage := NULL;
    END IF;
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS profiles_sync_phase_stage ON public.profiles;
CREATE TRIGGER profiles_sync_phase_stage
  BEFORE INSERT OR UPDATE OF career_phase, job_search_stage
  ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_sync_phase_stage();

-- 4. updated_at trigger
CREATE OR REPLACE FUNCTION public.profiles_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_set_updated_at();

-- 5. Backfill missing profiles rows for existing users
INSERT INTO public.profiles (user_id)
  SELECT u.id FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  WHERE p.user_id IS NULL
  ON CONFLICT (user_id) DO NOTHING;