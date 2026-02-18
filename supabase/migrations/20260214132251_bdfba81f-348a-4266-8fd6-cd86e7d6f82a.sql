
-- Create resume_leads table
CREATE TABLE public.resume_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  email text NOT NULL,
  name text NOT NULL,
  resume_text text NOT NULL,
  resume_file_url text,
  analysis_result jsonb NOT NULL,
  overall_score integer,
  language text DEFAULT 'en',
  years_experience text,
  seniority_level text,
  current_company_type text,
  industry text,
  target_readiness text,
  input_method text,
  ip_address text,
  user_agent text
);

-- Index for rate limiting
CREATE INDEX idx_resume_leads_ip ON public.resume_leads(ip_address, created_at);

-- Index for querying by email
CREATE INDEX idx_resume_leads_email ON public.resume_leads(email);

-- Enable RLS
ALTER TABLE public.resume_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public lead generation tool)
CREATE POLICY "Allow anonymous inserts" ON public.resume_leads
  FOR INSERT WITH CHECK (true);

-- Only admins can read leads
CREATE POLICY "Admins can view leads" ON public.resume_leads
  FOR SELECT USING (public.is_admin(auth.uid()));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads" ON public.resume_leads
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Create storage bucket for resume files
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume-files', 'resume-files', false);

-- Allow anonymous uploads to resume-files bucket
CREATE POLICY "Allow anonymous resume uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resume-files');

-- Only admins can read resume files
CREATE POLICY "Admins can read resume files" ON storage.objects
  FOR SELECT USING (bucket_id = 'resume-files' AND public.is_admin(auth.uid()));
