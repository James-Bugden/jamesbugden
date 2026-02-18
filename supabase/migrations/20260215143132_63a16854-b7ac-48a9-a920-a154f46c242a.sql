
CREATE TABLE public.email_gate_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  source text NOT NULL DEFAULT 'offer-compass',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.email_gate_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON public.email_gate_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view leads"
  ON public.email_gate_leads FOR SELECT
  USING (is_admin(auth.uid()));
