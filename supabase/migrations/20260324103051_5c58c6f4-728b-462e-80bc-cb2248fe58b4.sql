CREATE POLICY "Admins can view all ai usage"
ON public.ai_usage_log
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));