-- HIR-145: Persist job tracker data in Supabase.
-- Mirrors the JobApplication interface in src/lib/jobStore.ts.
-- Complex fields (contacts, checklist, linked_doc_ids) are stored as JSONB.
-- camelCase → snake_case mapping is handled in jobStoreSupabase.ts.

CREATE TABLE IF NOT EXISTS public.job_applications (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           TEXT        NOT NULL DEFAULT '',
  company         TEXT        NOT NULL DEFAULT '',
  location        TEXT        NOT NULL DEFAULT '',
  stage           TEXT        NOT NULL DEFAULT 'bookmarked',
  url             TEXT        NOT NULL DEFAULT '',
  min_salary      TEXT        NOT NULL DEFAULT '',
  max_salary      TEXT        NOT NULL DEFAULT '',
  notes           TEXT        NOT NULL DEFAULT '',
  job_description TEXT        NOT NULL DEFAULT '',
  excitement      SMALLINT    NOT NULL DEFAULT 0,
  linked_doc_ids  JSONB       NOT NULL DEFAULT '[]',
  contacts        JSONB       NOT NULL DEFAULT '[]',
  checklist       JSONB       NOT NULL DEFAULT '{}',
  date_saved      TIMESTAMPTZ,
  date_applied    TIMESTAMPTZ,
  follow_up_date  TIMESTAMPTZ,
  deadline        TIMESTAMPTZ,
  applied_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "job_applications_owner"
  ON public.job_applications
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON public.job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_stage    ON public.job_applications(stage);
CREATE INDEX IF NOT EXISTS idx_job_applications_updated  ON public.job_applications(updated_at DESC);
