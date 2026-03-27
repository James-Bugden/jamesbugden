CREATE TABLE public.event_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_name text NOT NULL,
  page text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.event_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert events"
  ON public.event_tracks FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view events"
  ON public.event_tracks FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));