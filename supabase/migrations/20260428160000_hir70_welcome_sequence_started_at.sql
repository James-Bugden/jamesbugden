-- HIR-70: add welcome_sequence_started_at to resume_leads.
-- Populated by the send-welcome-sequence-trigger Edge Function on first
-- MailerLite subscription for this email. Never overwritten on subsequent
-- inserts (idempotency check). NULL means not yet entered the welcome sequence.
ALTER TABLE public.resume_leads
  ADD COLUMN IF NOT EXISTS welcome_sequence_started_at TIMESTAMPTZ;

-- Partial index supports per-email idempotency check in the Edge Function.
CREATE INDEX IF NOT EXISTS idx_resume_leads_email_seq_started
  ON public.resume_leads (email, welcome_sequence_started_at)
  WHERE welcome_sequence_started_at IS NOT NULL;

-- Down (reversible):
-- DROP INDEX IF EXISTS idx_resume_leads_email_seq_started;
-- ALTER TABLE public.resume_leads DROP COLUMN IF EXISTS welcome_sequence_started_at;
