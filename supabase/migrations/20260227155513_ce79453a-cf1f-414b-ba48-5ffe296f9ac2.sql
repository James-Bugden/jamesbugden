ALTER TABLE public.resume_leads
  ADD COLUMN IF NOT EXISTS input_method text,
  ADD COLUMN IF NOT EXISTS user_agent text;