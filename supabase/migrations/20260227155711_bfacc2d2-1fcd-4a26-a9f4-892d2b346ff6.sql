-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can count own resume leads by email" ON public.resume_leads;

-- Create a secure function for rate limiting
CREATE OR REPLACE FUNCTION public.count_resume_analyses_this_month(p_email text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COUNT(*)::integer
  FROM resume_leads
  WHERE email = p_email
    AND created_at >= date_trunc('month', now());
$$;