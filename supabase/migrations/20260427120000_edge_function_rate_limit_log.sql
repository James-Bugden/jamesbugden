-- HIR-88: durable per-IP per-function rate-limit log for anonymous edge functions.
-- Pattern mirrors analyze-resume's monthly per-user gate (count rows in window,
-- then insert), but keyed on (function_name, client_ip) for short-window
-- protection of public anonymous endpoints. RLS denies all client access — only
-- service-role keys (used by edge functions) bypass RLS to read or write.

CREATE TABLE public.edge_function_rate_limit_log (
  id            bigserial   PRIMARY KEY,
  function_name text        NOT NULL,
  client_ip     text        NOT NULL,
  attempted_at  timestamptz NOT NULL DEFAULT now()
);

-- Hot path: "count rows where function=? and ip=? and attempted_at > since".
CREATE INDEX idx_edge_function_rate_limit_log_lookup
  ON public.edge_function_rate_limit_log (function_name, client_ip, attempted_at DESC);

-- Sweep index lets a future maintenance job prune old rows efficiently.
CREATE INDEX idx_edge_function_rate_limit_log_attempted_at
  ON public.edge_function_rate_limit_log (attempted_at);

ALTER TABLE public.edge_function_rate_limit_log ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: service_role bypasses RLS, anon/authenticated cannot
-- read or write. The data is internal abuse-protection state, not user data.

COMMENT ON TABLE public.edge_function_rate_limit_log IS
  'HIR-88: short-window rate-limit log for anonymous edge functions. Service role only.';
