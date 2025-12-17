-- Create the client_reviews table
CREATE TABLE public.client_reviews (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  password TEXT NOT NULL,
  review_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_viewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

-- RLS policies - only authenticated users can manage reviews
CREATE POLICY "Authenticated users can view all reviews"
ON public.client_reviews
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert reviews"
ON public.client_reviews
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews"
ON public.client_reviews
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete reviews"
ON public.client_reviews
FOR DELETE
TO authenticated
USING (true);

-- Allow anonymous users to read specific review for password gate
CREATE POLICY "Anyone can check review exists"
ON public.client_reviews
FOR SELECT
TO anon
USING (true);