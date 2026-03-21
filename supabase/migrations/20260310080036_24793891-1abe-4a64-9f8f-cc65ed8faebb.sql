CREATE TABLE public.salary_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  role text NOT NULL,
  sector text,
  experience text,
  salary integer NOT NULL,
  verdict text,
  median integer,
  lang text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.salary_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert salary checks"
  ON public.salary_checks FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view salary checks"
  ON public.salary_checks FOR SELECT TO public
  USING (is_admin(auth.uid()));