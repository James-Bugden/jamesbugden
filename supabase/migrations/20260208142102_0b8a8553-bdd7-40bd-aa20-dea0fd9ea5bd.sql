-- Fix RLS policies on client_reviews table
-- The current RESTRICTIVE policies don't work correctly without a base PERMISSIVE policy
-- We need to drop the RESTRICTIVE policies and create proper PERMISSIVE policies

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Admins can insert reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.client_reviews;
DROP POLICY IF EXISTS "Admins can view all reviews" ON public.client_reviews;

-- Create proper PERMISSIVE policies (these will be the ONLY way to access the table)
-- When RLS is enabled with ONLY permissive policies, access is denied by default
-- unless one of the policies grants access

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