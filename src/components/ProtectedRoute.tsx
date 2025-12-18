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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session && requireAdmin) {
        // Check if user is admin using is_admin function
        const { data: adminCheck } = await supabase
          .rpc('is_admin', { _user_id: session.user.id });
        
        setIsAdmin(!!adminCheck);
      } else if (session && !requireAdmin) {
        // If no admin check required, just authenticated is enough
        setIsAdmin(true);
      }
      
      setLoading(false);
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session && requireAdmin) {
          // Defer the admin check to avoid deadlock
          setTimeout(async () => {
            const { data: adminCheck } = await supabase
              .rpc('is_admin', { _user_id: session.user.id });
            
            setIsAdmin(!!adminCheck);
            setLoading(false);
          }, 0);
        } else if (session && !requireAdmin) {
          setIsAdmin(true);
          setLoading(false);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    checkAuth();

    return () => subscription.unsubscribe();
  }, [requireAdmin]);

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
