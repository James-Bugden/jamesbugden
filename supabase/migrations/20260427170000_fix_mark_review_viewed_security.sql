-- Create combined function that verifies password AND updates last_viewed_at atomically
-- This fixes the security issue where mark_review_viewed could be called without password verification
CREATE OR REPLACE FUNCTION public.verify_client_review_password(input_password text)
RETURNS TABLE(review_id text, review_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id, password, client_reviews.review_url FROM client_reviews
  LOOP
    IF r.password = extensions.crypt(input_password, r.password) THEN
      -- Update last_viewed_at for this review (atomic with verification)
      UPDATE client_reviews
      SET last_viewed_at = now()
      WHERE id = r.id;
      
      review_id := r.id;
      review_url := r.review_url;
      RETURN NEXT;
      RETURN;
    END IF;
  END LOOP;
  
  -- Return empty if no match
  RETURN;
END;
$$;

-- Grant execute to anon (same as before)
GRANT EXECUTE ON FUNCTION public.verify_client_review_password TO anon;

-- Drop the old verify_client_password function since it's replaced
DROP FUNCTION IF EXISTS public.verify_client_password;

-- Revoke execute from mark_review_viewed for defense in depth
-- Note: We keep the function for backward compatibility but restrict access
REVOKE EXECUTE ON FUNCTION public.mark_review_viewed FROM anon;
REVOKE EXECUTE ON FUNCTION public.mark_review_viewed FROM authenticated;

-- Optional: Add comment explaining deprecation
COMMENT ON FUNCTION public.mark_review_viewed IS 'DEPRECATED: Use verify_client_review_password instead. This function is no longer accessible to clients for security reasons.';