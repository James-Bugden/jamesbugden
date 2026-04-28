-- HIR-143: Add user profile columns to profiles table
-- Extends existing profiles table (following HIR-65 decision to NOT create separate user_profiles table)

-- Add new nullable profile columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
  ADD COLUMN IF NOT EXISTS job_title TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT;

-- Backfill email from auth.users for existing users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.user_id = u.id
  AND p.email IS NULL;

-- Add comment explaining denormalized email
COMMENT ON COLUMN public.profiles.email IS 'Denormalized copy of auth.users.email for easier querying. Should be kept in sync with auth.users.';

-- Add comment explaining profile fields
COMMENT ON COLUMN public.profiles.full_name IS 'User''s full name';
COMMENT ON COLUMN public.profiles.linkedin_url IS 'LinkedIn profile URL';
COMMENT ON COLUMN public.profiles.job_title IS 'Current job title';
COMMENT ON COLUMN public.profiles.company IS 'Current company';
COMMENT ON COLUMN public.profiles.country IS 'Country of residence';

-- Note: RLS policies already exist on profiles table and protect all columns
-- Note: Auto-create trigger already exists from auth.users to profiles