import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { syncToMailerLite } from "@/lib/mailerlite";
import { syncLocalToServer, clearLocalDocuments, loadFromServer } from "@/lib/documentStore";
import { syncJobsToServer, loadJobsFromServer } from "@/lib/jobStoreSupabase";
import { getAllJobs } from "@/lib/jobStore";
import {
  assignOnboardingVariant,
  assignDripVariantForUser,
} from "@/lib/experiments/variants";
import { toast } from "sonner";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  /**
   * True once supabase.auth.getSession() has actually resolved (or its
   * onAuthStateChange fired), as opposed to the safety timeout giving up.
   * Pages that redirect unauthenticated users (Dashboard) should gate on
   * THIS, not on `!isLoading`, to avoid redirecting a user who IS logged
   * in just because the session check is slow. isLoading is for UI
   * gating; hasResolvedAuth is for routing decisions.
   */
  hasResolvedAuth: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  isLoggedIn: false,
  isLoading: true,
  hasResolvedAuth: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResolvedAuth, setHasResolvedAuth] = useState(false);
  const syncedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const ACTIVE_USER_KEY = "james_careers_active_user";

    // Safety floor: if getSession() hangs (e.g., stuck refresh-token request),
    // make sure isLoading falls through within 5s so AuthHeaderButton,
    // Dashboard skeletons, and anything else gated on isLoading don't hang
    // the UI forever. The real session (if any) still hydrates via
    // onAuthStateChange when it arrives.
    const loadingTimeout = setTimeout(() => setIsLoading(false), 5000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        // Any onAuthStateChange event means the auth client has a real answer
        //, clear isLoading regardless of whether the session is present.
        setIsLoading(false);
        setHasResolvedAuth(true);

        // If token refresh failed, clear stale tokens so guests don't see errors
        if (event === "TOKEN_REFRESHED" && !session) {
          supabase.auth.signOut().catch(() => {});
          return;
        }

        if (event === "SIGNED_OUT") {
          clearLocalDocuments();
          localStorage.removeItem(ACTIVE_USER_KEY);
        }

        // Sync OAuth users to MailerLite on sign-in (once per session)
        if (event === "SIGNED_IN" && session?.user?.email) {
          const uid = session.user.id;
          const previousUser = localStorage.getItem(ACTIVE_USER_KEY);

          // Clear stale local data if switching accounts
          if (previousUser && previousUser !== uid) {
            clearLocalDocuments();
          }
          localStorage.setItem(ACTIVE_USER_KEY, uid);

          if (!syncedRef.current.has(uid)) {
            syncedRef.current.add(uid);
            const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || "";
            const userEmail = session.user.email;
            // Assign sticky experiment variants once per user (HIR-64).
            // Both RPCs are idempotent: a returning user gets back their
            // existing assignment instead of being re-randomised.
            (async () => {
              const [, dripVariant] = await Promise.all([
                assignOnboardingVariant(uid),
                assignDripVariantForUser(uid, userEmail),
              ]);
              syncToMailerLite(userEmail, name, undefined, {
                dripVariant: dripVariant ?? undefined,
              });
            })().catch(() => {
              // Variant assignment is best-effort; fall back to a sync
              // without variant so the user is still added to the default
              // group rather than dropped entirely.
              syncToMailerLite(userEmail, name);
            });
            // Sync local documents to server on first login, then load server docs
            syncLocalToServer()
              .then((result) => {
                if (result && "error" in result) {
                  toast.error("Failed to sync your documents. Please refresh and try again.");
                }
                return loadFromServer();
              })
              .catch(() => toast.error("Failed to sync your documents. Please refresh and try again."));
            // Sync local job applications to server on first login, then load server jobs (HIR-145)
            syncJobsToServer(getAllJobs())
              .then(() => loadJobsFromServer())
              .catch(() => {});
          }
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
      setHasResolvedAuth(true);
      clearTimeout(loadingTimeout);
    }).catch((err) => {
      // Clear stale tokens (e.g. refresh_token_not_found) for guest users
      if (err?.code === "refresh_token_not_found" || err?.message?.includes?.("Refresh Token Not Found")) {
        supabase.auth.signOut().catch(() => {});
      }
      setIsLoading(false);
      setHasResolvedAuth(true);
      clearTimeout(loadingTimeout);
    });

    return () => {
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    clearLocalDocuments();
    localStorage.removeItem("james_careers_active_user");
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
        hasResolvedAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
