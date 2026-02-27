-- Create a secure function to check email existence without exposing the table
CREATE OR REPLACE FUNCTION public.check_email_gate(p_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.email_gate_leads WHERE email = p_email
  );
$$;

-- Remove the public SELECT policy that exposes all emails
DROP POLICY IF EXISTS "Anyone can check email existence" ON public.email_gate_leads;