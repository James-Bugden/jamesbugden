-- HIR-161: persist onboarding_router_variant on profiles at first login.
-- Stores whether the user was shown the new OnboardingRouter ("router")
-- or was in the holdout group ("holdout"), so the assignment is durable
-- and consistent across sessions.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_router_variant TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'profiles_onboarding_router_variant_check'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_onboarding_router_variant_check
      CHECK (onboarding_router_variant IS NULL OR onboarding_router_variant IN ('router','holdout'));
  END IF;
END $$;

COMMENT ON COLUMN public.profiles.onboarding_router_variant IS
  'Sticky assignment: "router" = user saw the new stage-based OnboardingRouter, "holdout" = user bypassed it.';
