import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

interface AuthRouteProps {
  children: React.ReactNode;
  /** Language — controls the login redirect path */
  lang?: "en" | "zh";
}

/**
 * Server-verified auth gate. Never renders children if unauthenticated.
 * Unlike LoginGate, the protected component is never loaded into the DOM.
 */
const AuthRoute = ({ children, lang = "en" }: AuthRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) setSession(session);
      } finally {
        if (isMounted) setAuthResolved(true);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (isMounted) setSession(newSession);
      }
    );

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!authResolved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-executive-green" />
      </div>
    );
  }

  if (!session) {
    const loginPath = lang === "zh" ? "/login" : "/login";
    return (
      <Navigate
        to={loginPath}
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AuthRoute;
