INSERT INTO public.client_reviews (id, client_name, password, review_url)
VALUES (
  'rema-rao',
  'Rema Rao',
  extensions.crypt('remarao2026', extensions.gen_salt('bf', 10)),
  '/reviews/rema-rao'
);