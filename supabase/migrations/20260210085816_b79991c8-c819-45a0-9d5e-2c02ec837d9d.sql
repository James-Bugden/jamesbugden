-- Drop the function that exposes password hashes to anonymous users
-- The app uses verify_client_password instead, which does server-side verification
REVOKE EXECUTE ON FUNCTION public.get_review_for_verification(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_review_for_verification(text) FROM authenticated;
DROP FUNCTION IF EXISTS public.get_review_for_verification(text);
