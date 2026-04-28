-- Creates app_config key-value store for runtime feature flags.
-- onboarding_router: { enabled: bool, holdout_pct: int 0-100 }
--
-- Post-merge action: James must apply this migration via Lovable's in-app
-- migration tool. Lovable Publish does NOT run migrations automatically.

CREATE TABLE IF NOT EXISTS public.app_config (
  key         TEXT PRIMARY KEY,
  config      JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Authenticated and anonymous users can read flags (no secrets stored here)
DO $$ BEGIN
  CREATE POLICY "app_config_read_all" ON public.app_config
    FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Seed the onboarding router flag
-- enabled: true = feature is live; holdout_pct: 20 = 20% see full dashboard
INSERT INTO public.app_config (key, config)
VALUES ('onboarding_router', '{"enabled": true, "holdout_pct": 20}')
ON CONFLICT (key) DO NOTHING;
