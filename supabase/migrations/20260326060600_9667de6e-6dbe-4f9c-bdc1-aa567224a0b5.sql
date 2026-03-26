-- Add DELETE policy so admins can remove other admins
CREATE POLICY "Admins can delete admins"
ON public.admin_users
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Add UPDATE policy for admin record management
CREATE POLICY "Admins can update admins"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));