
CREATE OR REPLACE FUNCTION public.enforce_document_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  doc_count integer;
BEGIN
  -- Admin bypass
  IF public.is_admin(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO doc_count
  FROM public.user_documents
  WHERE user_id = NEW.user_id
    AND type = NEW.type;

  IF doc_count >= 2 THEN
    RAISE EXCEPTION 'Document limit reached: maximum 2 % allowed per user', NEW.type;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_enforce_document_limit
BEFORE INSERT ON public.user_documents
FOR EACH ROW
EXECUTE FUNCTION public.enforce_document_limit();
