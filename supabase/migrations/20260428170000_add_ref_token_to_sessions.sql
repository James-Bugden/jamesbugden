-- HIR-243: add ref_token column to sessions table for referral attribution
-- Share links can append ?ref=<token> and it will be stored on the landing session

ALTER TABLE public.sessions 
  ADD COLUMN IF NOT EXISTS ref_token TEXT;

CREATE INDEX IF NOT EXISTS idx_sessions_ref_token 
  ON public.sessions(ref_token) 
  WHERE ref_token IS NOT NULL;

-- Down migration (reversible):
-- DROP INDEX IF EXISTS idx_sessions_ref_token;
-- ALTER TABLE public.sessions DROP COLUMN IF EXISTS ref_token;