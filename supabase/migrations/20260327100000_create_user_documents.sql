-- Server-side document storage with content for cross-device access and backup
CREATE TABLE public.user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('resume', 'cover_letter')),
  name text NOT NULL DEFAULT 'Untitled',
  data jsonb NOT NULL DEFAULT '{}',
  settings jsonb NOT NULL DEFAULT '{}',
  linked_job_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents"
  ON public.user_documents FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own documents"
  ON public.user_documents FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own documents"
  ON public.user_documents FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own documents"
  ON public.user_documents FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Count function for limit enforcement
CREATE OR REPLACE FUNCTION public.count_user_documents(p_user_id uuid, p_type text)
RETURNS integer
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT count(*)::integer FROM public.user_documents
  WHERE user_id = p_user_id AND type = p_type;
$$;

-- Enforce per-type limit at DB level (2 resumes, 2 cover letters)
CREATE OR REPLACE FUNCTION public.enforce_document_limit()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF (SELECT count(*) FROM public.user_documents
      WHERE user_id = NEW.user_id AND type = NEW.type) >= 2 THEN
    RAISE EXCEPTION 'Document limit reached for type %', NEW.type;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_enforce_document_limit
  BEFORE INSERT ON public.user_documents
  FOR EACH ROW EXECUTE FUNCTION public.enforce_document_limit();

CREATE INDEX idx_user_documents_user_type ON public.user_documents (user_id, type);
