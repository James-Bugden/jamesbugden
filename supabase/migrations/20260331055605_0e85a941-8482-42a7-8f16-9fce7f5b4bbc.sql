ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;