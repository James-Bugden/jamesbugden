
-- Create email_gate_leads table
CREATE TABLE public.email_gate_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.email_gate_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert email leads"
  ON public.email_gate_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view email leads"
  ON public.email_gate_leads FOR SELECT
  USING (is_admin(auth.uid()));

-- Create resume_leads table
CREATE TABLE public.resume_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  resume_text TEXT,
  resume_file_url TEXT,
  analysis_result JSONB,
  overall_score INTEGER,
  language TEXT,
  years_experience TEXT,
  seniority_level TEXT,
  current_company_type TEXT,
  industry TEXT,
  target_readiness TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resume_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert resume leads"
  ON public.resume_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view resume leads"
  ON public.resume_leads FOR SELECT
  USING (is_admin(auth.uid()));
