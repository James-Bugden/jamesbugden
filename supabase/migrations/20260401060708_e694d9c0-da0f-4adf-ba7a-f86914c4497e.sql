
-- Create user_documents table
CREATE TABLE public.user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL DEFAULT 'resume',
  name text NOT NULL DEFAULT 'Untitled',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  linked_job_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

-- Users can read their own documents
CREATE POLICY "Users can read own documents"
  ON public.user_documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own documents
CREATE POLICY "Users can insert own documents"
  ON public.user_documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own documents
CREATE POLICY "Users can update own documents"
  ON public.user_documents FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own documents
CREATE POLICY "Users can delete own documents"
  ON public.user_documents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Count function used by documentStore.ts
CREATE OR REPLACE FUNCTION public.count_user_documents(p_user_id uuid, p_type text)
  RETURNS integer
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM public.user_documents
  WHERE user_id = p_user_id
    AND type = p_type;
$$;
