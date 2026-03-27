CREATE TABLE public.share_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL,
  page text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.share_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert share clicks"
  ON public.share_clicks FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view share clicks"
  ON public.share_clicks FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));