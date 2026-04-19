-- Add missing columns
ALTER TABLE public.sessions
  ADD COLUMN IF NOT EXISTS browser text,
  ADD COLUMN IF NOT EXISTS tool_action_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_returning boolean NOT NULL DEFAULT false;

-- Auto-increment tool_action_count when a tool_completion is inserted
CREATE OR REPLACE FUNCTION public.bump_session_tool_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.session_id IS NOT NULL THEN
    UPDATE public.sessions
       SET tool_action_count = tool_action_count + 1
     WHERE id = NEW.session_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bump_session_tool_count ON public.tool_completions;
CREATE TRIGGER trg_bump_session_tool_count
AFTER INSERT ON public.tool_completions
FOR EACH ROW
EXECUTE FUNCTION public.bump_session_tool_count();