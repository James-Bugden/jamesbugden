
-- Table to track AI usage in resume builder (imports + AI tools)
CREATE TABLE public.ai_usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  usage_type text NOT NULL DEFAULT 'import',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_usage_log ENABLE ROW LEVEL SECURITY;

-- Users can insert their own usage
CREATE POLICY "Users can insert own usage"
ON public.ai_usage_log
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can read their own usage
CREATE POLICY "Users can read own usage"
ON public.ai_usage_log
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- RPC to count AI usage this month by type
CREATE OR REPLACE FUNCTION public.count_ai_usage_this_month(p_user_id uuid, p_usage_type text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM ai_usage_log
  WHERE user_id = p_user_id
    AND usage_type = p_usage_type
    AND created_at >= date_trunc('month', now());
$$;
