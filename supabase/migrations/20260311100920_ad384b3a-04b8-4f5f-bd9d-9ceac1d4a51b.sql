
CREATE TABLE public.guide_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_key text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, guide_key)
);

ALTER TABLE public.guide_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own guide progress"
  ON public.guide_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own guide progress"
  ON public.guide_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own guide progress"
  ON public.guide_progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own guide progress"
  ON public.guide_progress FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
