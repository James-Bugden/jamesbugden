CREATE POLICY "Anyone can check email existence"
ON public.email_gate_leads
FOR SELECT
USING (true);