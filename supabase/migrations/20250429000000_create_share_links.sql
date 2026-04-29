-- Create share_links table for public resume analysis sharing
CREATE TABLE IF NOT EXISTS public.share_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid NOT NULL REFERENCES public.resume_analyses(id) ON DELETE CASCADE,
  share_id text UNIQUE NOT NULL,
  views integer NOT NULL DEFAULT 0,
  last_viewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  
  -- Ensure share_id is URL-safe and reasonable length
  CONSTRAINT share_id_format CHECK (share_id ~ '^[A-Za-z0-9_-]{20,24}$')
);

-- Create indexes for performance
CREATE INDEX idx_share_links_analysis_id ON public.share_links(analysis_id);
CREATE INDEX idx_share_links_share_id ON public.share_links(share_id);
CREATE INDEX idx_share_links_user_lookup ON public.share_links(
  (SELECT user_id FROM public.resume_analyses ra WHERE ra.id = share_links.analysis_id)
) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE public.share_links ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own share links
CREATE POLICY "Users can read own share links"
  ON public.share_links FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.resume_analyses ra
      WHERE ra.id = share_links.analysis_id
      AND ra.user_id = auth.uid()
    )
  );

-- Policy: Users can insert share links for their own analyses
CREATE POLICY "Users can insert own share links"
  ON public.share_links FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.resume_analyses ra
      WHERE ra.id = analysis_id
      AND ra.user_id = auth.uid()
    )
  );

-- Policy: Users can update their own share links (for deactivation, view counts)
CREATE POLICY "Users can update own share links"
  ON public.share_links FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.resume_analyses ra
      WHERE ra.id = share_links.analysis_id
      AND ra.user_id = auth.uid()
    )
  );

-- Policy: Public can read active share links (for /r/{id} route)
CREATE POLICY "Public can read active share links"
  ON public.share_links FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Function to generate a URL-safe share ID
CREATE OR REPLACE FUNCTION public.generate_share_id()
RETURNS text
LANGUAGE sql
VOLATILE
SECURITY DEFINER
AS $$
  SELECT encode(gen_random_bytes(16), 'base64')
    -- Replace URL-unsafe characters
    || translate(encode(gen_random_bytes(2), 'base64'), '+/', '-_');
$$;

-- Function to increment view count safely
CREATE OR REPLACE FUNCTION public.increment_share_views(share_id_param text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.share_links
  SET 
    views = views + 1,
    last_viewed_at = now()
  WHERE share_id = share_id_param
    AND is_active = true;
END;
$$;