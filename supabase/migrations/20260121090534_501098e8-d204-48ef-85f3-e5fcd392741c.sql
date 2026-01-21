-- Drop and recreate the function with proper schema reference for pgcrypto
DROP FUNCTION IF EXISTS public.verify_client_password(text);

CREATE OR REPLACE FUNCTION public.verify_client_password(input_password text)
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