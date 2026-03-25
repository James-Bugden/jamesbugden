ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS type text DEFAULT 'general';
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS rating integer;
ALTER TABLE public.feedback ADD COLUMN IF NOT EXISTS context text;