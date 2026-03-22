import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  redirectTo = "/admin/login",
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);
  const [adminResolved, setAdminResolved] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAdminRole = async (userId: string) => {
      try {
        const { data } = await supabase.rpc('is_admin', { _user_id: userId });
        if (isMounted) {
          setIsAdmin(!!data);
          setAdminResolved(true);
        }
      } catch {
        if (isMounted) {
          setIsAdmin(false);
          setAdminResolved(true);
        }
      }
    };

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        setSession(session);

        if (session?.user && requireAdmin) {
          await checkAdminRole(session.user.id);
        } else {
          // No admin check needed — mark resolved
          if (isMounted) setAdminResolved(true);
        }
      } finally {
        if (isMounted) setAuthResolved(true);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);

        if (newSession?.user && requireAdmin) {
          // Reset admin state and re-check
          setAdminResolved(false);
          setIsAdmin(false);
          checkAdminRole(newSession.user.id);
        } else if (!newSession) {
          setIsAdmin(false);
          setAdminResolved(true);
        }
      }
    );

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [requireAdmin]);

  // Still loading auth or admin check
  const loading = !authResolved || (requireAdmin && !adminResolved);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-executive-green" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
