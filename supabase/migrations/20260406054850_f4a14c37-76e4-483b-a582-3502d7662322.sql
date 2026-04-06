CREATE POLICY "Admins can view all documents" ON public.user_documents FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));