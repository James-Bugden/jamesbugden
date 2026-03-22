
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  page text,
  locale text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feedback"
  ON public.feedback FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view feedback"
  ON public.feedback FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete feedback"
  ON public.feedback FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));
