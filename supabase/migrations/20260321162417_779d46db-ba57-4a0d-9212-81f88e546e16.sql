CREATE TABLE public.resume_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  overall_score integer,
  analysis_result jsonb,
  resume_text text,
  language text DEFAULT 'en',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own analyses"
  ON public.resume_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses"
  ON public.resume_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_resume_analyses_user_id ON public.resume_analyses(user_id);