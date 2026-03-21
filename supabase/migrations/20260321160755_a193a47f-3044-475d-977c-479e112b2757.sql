
-- 1. interview_questions table
CREATE TABLE IF NOT EXISTS public.interview_questions (
  id integer PRIMARY KEY,
  question_en text NOT NULL,
  question_zh text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  difficulty integer NOT NULL DEFAULT 1,
  audience text[] DEFAULT '{}',
  source text,
  answer_en text,
  answer_zh text
);

ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read interview questions"
  ON public.interview_questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage interview questions"
  ON public.interview_questions FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- 2. guide_progress table
CREATE TABLE IF NOT EXISTS public.guide_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  guide_key text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, guide_key)
);

ALTER TABLE public.guide_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own guide progress"
  ON public.guide_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own guide progress"
  ON public.guide_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own guide progress"
  ON public.guide_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. salary_checks table
CREATE TABLE IF NOT EXISTS public.salary_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title text NOT NULL,
  role text NOT NULL,
  salary numeric NOT NULL,
  sector text,
  experience text,
  median numeric,
  verdict text,
  lang text DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.salary_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert salary checks"
  ON public.salary_checks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view salary checks"
  ON public.salary_checks FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 4. ai_usage_log table
CREATE TABLE IF NOT EXISTS public.ai_usage_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  usage_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_usage_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own ai usage"
  ON public.ai_usage_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own ai usage"
  ON public.ai_usage_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. count_ai_usage_this_month function
CREATE OR REPLACE FUNCTION public.count_ai_usage_this_month(p_user_id uuid, p_usage_type text)
  RETURNS integer
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM public.ai_usage_log
  WHERE user_id = p_user_id
    AND usage_type = p_usage_type
    AND created_at >= date_trunc('month', now());
$$;
