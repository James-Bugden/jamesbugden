-- Update Sam Lee's password with proper bcrypt hash using PostgreSQL crypt function
UPDATE public.client_reviews 
SET password = crypt('samlee2025', gen_salt('bf', 10))
WHERE id = 'sam-lee';