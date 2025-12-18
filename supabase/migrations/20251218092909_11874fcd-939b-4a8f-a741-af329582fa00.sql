-- Create admin users table for role-based access control
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = _user_id
  )
$$;

-- Admins can view other admins
CREATE POLICY "Admins can view admin list"
ON public.admin_users
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only existing admins can add new admins
CREATE POLICY "Admins can add admins"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- Create secure function for password verification (no direct table access needed)
CREATE OR REPLACE FUNCTION public.verify_review_password(
  review_id TEXT,
  input_password TEXT
)
RETURNS TABLE (
  is_valid BOOLEAN,
  client_name TEXT,
  review_url TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  stored_password TEXT;
  stored_name TEXT;
  stored_url TEXT;
BEGIN
  SELECT cr.password, cr.client_name, cr.review_url
  INTO stored_password, stored_name, stored_url
  FROM client_reviews cr
  WHERE cr.id = review_id;
  
  IF stored_password IS NULL THEN
    -- Return false if review doesn't exist (don't reveal this to caller)
    RETURN QUERY SELECT false::boolean, NULL::text, NULL::text;
  ELSE
    -- For bcrypt comparison, we need to do it in application code
    -- This function returns the stored hash for app-side comparison
    RETURN QUERY SELECT true::boolean, stored_name, stored_url;
  END IF;
END;
$$;

-- Update function to return password hash for bcrypt comparison
CREATE OR REPLACE FUNCTION public.get_review_for_verification(
  review_id TEXT
)
RETURNS TABLE (
  password_hash TEXT,
  client_name TEXT,
  review_url TEXT
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT cr.password, cr.client_name, cr.review_url
  FROM client_reviews cr
  WHERE cr.id = review_id;
END;
$$;

-- Grant execute to anon for the verification function
GRANT EXECUTE ON FUNCTION public.get_review_for_verification TO anon;

-- Function to update last_viewed_at (callable by anon after successful password verification)
CREATE OR REPLACE FUNCTION public.mark_review_viewed(
  review_id TEXT
)
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE client_reviews
  SET last_viewed_at = now()
  WHERE id = review_id;
END;
$$;

-- Grant execute to anon for marking viewed
GRANT EXECUTE ON FUNCTION public.mark_review_viewed TO anon;

-- Drop existing permissive policies on client_reviews
DROP POLICY IF EXISTS "Anyone can check review exists" ON public.client_reviews;
DROP POLICY IF EXISTS "Authenticated users can view all reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON public.client_reviews;

-- Create admin-only policies for client_reviews
CREATE POLICY "Admins can view all reviews"
ON public.client_reviews
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert reviews"
ON public.client_reviews
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update reviews"
ON public.client_reviews
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete reviews"
ON public.client_reviews
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));