import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { syncToMailerLite } from "@/lib/mailerlite";
import { syncLocalToServer } from "@/lib/documentStore";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  isLoggedIn: false,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const syncedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);

        // Sync OAuth users to MailerLite on sign-in (once per session)
        if (event === "SIGNED_IN" && session?.user?.email) {
          const uid = session.user.id;
          if (!syncedRef.current.has(uid)) {
            syncedRef.current.add(uid);
            const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || "";
            syncToMailerLite(session.user.email, name);
            // Sync local documents to server on first login
            syncLocalToServer();
          }
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // If server session is already gone, clear local state anyway
    }
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        isLoggedIn: !!session?.user,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
