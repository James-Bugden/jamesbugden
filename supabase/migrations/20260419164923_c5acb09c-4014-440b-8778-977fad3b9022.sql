-- ============================================
-- 1. sessions: one row per visit
-- ============================================
CREATE TABLE public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  anon_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  duration_sec integer,
  pages_viewed integer NOT NULL DEFAULT 1,
  entry_page text,
  exit_page text,
  device_type text,        -- mobile | tablet | desktop
  viewport_w integer,
  viewport_h integer,
  user_agent text,
  language text,
  timezone text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_sessions_anon_id ON public.sessions(anon_id);
CREATE INDEX idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX idx_sessions_started_at ON public.sessions(started_at DESC);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert sessions"
  ON public.sessions FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update own session by id"
  ON public.sessions FOR UPDATE TO public
  USING (true) WITH CHECK (true);

CREATE POLICY "Admins can read sessions"
  ON public.sessions FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- ============================================
-- 2. guide_reads: scroll depth + time per guide view
-- ============================================
CREATE TABLE public.guide_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.sessions(id) ON DELETE SET NULL,
  anon_id text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  guide_slug text NOT NULL,
  guide_lang text NOT NULL DEFAULT 'en',
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  time_on_page_sec integer,
  scroll_depth_pct integer,           -- 0-100
  reached_bottom boolean NOT NULL DEFAULT false,
  cta_clicks integer NOT NULL DEFAULT 0,
  copy_actions integer NOT NULL DEFAULT 0,
  marked_complete boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_guide_reads_slug ON public.guide_reads(guide_slug);
CREATE INDEX idx_guide_reads_user_id ON public.guide_reads(user_id);
CREATE INDEX idx_guide_reads_anon_id ON public.guide_reads(anon_id);
CREATE INDEX idx_guide_reads_started_at ON public.guide_reads(started_at DESC);

ALTER TABLE public.guide_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert guide reads"
  ON public.guide_reads FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update guide reads"
  ON public.guide_reads FOR UPDATE TO public
  USING (true) WITH CHECK (true);

CREATE POLICY "Admins can read guide reads"
  ON public.guide_reads FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- ============================================
-- 3. tool_completions: one row per completed tool action
-- ============================================
CREATE TABLE public.tool_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.sessions(id) ON DELETE SET NULL,
  anon_id text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  tool text NOT NULL,                  -- 'resume_analyzer' | 'resume_builder' | 'cover_letter' | 'salary_check' | 'qbank' | 'job_tracker' | 'offer_calculator' | etc
  action text NOT NULL,                -- 'analysis_run' | 'pdf_export' | 'salary_calculated' | 'question_attempted' | 'job_added' | etc
  lang text DEFAULT 'en',
  outcome jsonb NOT NULL DEFAULT '{}'::jsonb,  -- structured outcome data
  duration_ms integer,                  -- how long the action took
  success boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_tool_completions_tool ON public.tool_completions(tool, action);
CREATE INDEX idx_tool_completions_user_id ON public.tool_completions(user_id);
CREATE INDEX idx_tool_completions_anon_id ON public.tool_completions(anon_id);
CREATE INDEX idx_tool_completions_created_at ON public.tool_completions(created_at DESC);

ALTER TABLE public.tool_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert tool completions"
  ON public.tool_completions FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can read tool completions"
  ON public.tool_completions FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- ============================================
-- 4. error_log: client + tool errors
-- ============================================
CREATE TABLE public.error_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.sessions(id) ON DELETE SET NULL,
  anon_id text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  source text NOT NULL,                -- 'js_error' | 'pdf_export' | 'garbled_text' | 'ai_call' | 'network'
  message text NOT NULL,
  stack text,
  page text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_error_log_source ON public.error_log(source);
CREATE INDEX idx_error_log_created_at ON public.error_log(created_at DESC);

ALTER TABLE public.error_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert errors"
  ON public.error_log FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Admins can read errors"
  ON public.error_log FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));