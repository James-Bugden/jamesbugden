-- Create a secure review-specific password verification function
-- This replaces the insecure global password search with O(1) lookup

CREATE OR REPLACE FUNCTION public.verify_review_password_secure(
  p_review_id TEXT,
  p_input_password TEXT
)
RETURNS TABLE (
  success BOOLEAN,
  client_name TEXT,
  review_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'extensions'
AS $$
DECLARE
  v_stored_password TEXT;
  v_client_name TEXT;
  v_review_url TEXT;
  v_password_matches BOOLEAN;
BEGIN
  -- Get the specific review by ID (O(1) lookup)
  SELECT cr.password, cr.client_name, cr.review_url
  INTO v_stored_password, v_client_name, v_review_url
  FROM client_reviews cr
  WHERE cr.id = p_review_id;
  
  -- If review doesn't exist, return failure (don't reveal this to caller)
  IF v_stored_password IS NULL THEN
    RETURN QUERY SELECT false::boolean, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Verify password using pgcrypto's crypt (constant-time comparison)
  v_password_matches := (v_stored_password = extensions.crypt(p_input_password, v_stored_password));
  
  IF v_password_matches THEN
    RETURN QUERY SELECT true::boolean, v_client_name, v_review_url;
  ELSE
    RETURN QUERY SELECT false::boolean, NULL::text, NULL::text;
  END IF;
END;
$$;

-- Grant execute to anonymous users (they need to verify passwords)
GRANT EXECUTE ON FUNCTION public.verify_review_password_secure(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_review_password_secure(TEXT, TEXT) TO authenticated;