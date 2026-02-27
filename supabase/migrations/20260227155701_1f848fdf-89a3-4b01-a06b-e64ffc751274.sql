CREATE POLICY "Anyone can count own resume leads by email"
  ON public.resume_leads
  FOR SELECT
  USING (true);