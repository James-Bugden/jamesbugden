-- Create a secure RPC function for anonymous users to verify passwords
-- This function checks password against all reviews and returns the review_url if matched
-- It does NOT expose the password hash or other sensitive data

CREATE OR REPLACE FUNCTION public.verify_client_password(input_password text)
RETURNS TABLE(review_id text, review_url text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id, password, client_reviews.review_url FROM client_reviews
  LOOP
    IF r.password = crypt(input_password, r.password) THEN
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