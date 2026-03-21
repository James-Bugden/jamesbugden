CREATE OR REPLACE FUNCTION public.count_resume_analyses_by_user(p_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COUNT(*)::integer
  FROM resume_analyses
  WHERE user_id = p_user_id
    AND created_at >= date_trunc('month', now());
$$;