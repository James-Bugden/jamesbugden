-- Insert Sam Lee into client_reviews with password 'samlee2025' (bcrypt hashed)
INSERT INTO public.client_reviews (id, client_name, password, review_url)
VALUES (
  'sam-lee',
  'Sam Lee',
  '$2a$10$qZP1Gy8vMJWJp8qKhfZnJua6qANq7kPLGZvBwS1qMYz3KpJrZGz.u',
  '/reviews/sam-lee'
);