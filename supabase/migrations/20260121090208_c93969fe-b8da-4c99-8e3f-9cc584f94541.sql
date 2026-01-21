-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert client reviews with bcrypt-hashed passwords
-- Using crypt() with gen_salt('bf', 10) for bcrypt with 10 rounds
INSERT INTO client_reviews (id, client_name, password, review_url) VALUES
  ('charlene-lee', 'Charlene Lee', crypt('charlene2025', gen_salt('bf', 10)), '/zh-tw/reviews/charlene-lee'),
  ('chien-jung-liu', 'Chien Jung Liu', crypt('chienjung2025', gen_salt('bf', 10)), '/zh-tw/reviews/chien-jung-liu'),
  ('james-bugden', 'James Bugden', crypt('james2025', gen_salt('bf', 10)), '/zh-tw/reviews/james-bugden')
ON CONFLICT (id) DO UPDATE SET 
  client_name = EXCLUDED.client_name,
  password = EXCLUDED.password,
  review_url = EXCLUDED.review_url;