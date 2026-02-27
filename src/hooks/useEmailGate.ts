import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const EMAIL_KEY = "offer-compass-email";

export function useEmailGate() {
  const { isLoggedIn, user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(() => {
    try {
      return localStorage.getItem(EMAIL_KEY) || "";
    } catch {
      return "";
    }
  });

  // Check database for existing email on mount
  useEffect(() => {
    if (isLoggedIn) {
      setIsVerified(true);
      setIsLoading(false);
      return;
    }

    if (!userEmail) {
      setIsLoading(false);
      return;
    }

    // Query database to verify stored email
    supabase
      .from("email_gate_leads")
      .select("email")
      .eq("email", userEmail)
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data) {
          setIsVerified(true);
        } else {
          // Email not found in DB — clear stale localStorage
          setIsVerified(false);
          try { localStorage.removeItem(EMAIL_KEY); } catch {}
          setUserEmail("");
        }
        setIsLoading(false);
      });
  }, [isLoggedIn, userEmail]);

  const unlock = useCallback((email: string) => {
    setIsVerified(true);
    setUserEmail(email);
    setIsLoading(false);
    try {
      localStorage.setItem(EMAIL_KEY, email);
    } catch {
      // localStorage unavailable
    }
    supabase
      .from("email_gate_leads")
      .insert({ email, source: "offer-compass" })
      .then(({ error }) => {
        if (error) console.error("Failed to save email lead:", error);
      });
  }, []);

  const isUnlocked = isLoggedIn || isVerified;
  const email = isLoggedIn ? (user?.email || "") : userEmail;

  return { isUnlocked, isLoading, userEmail: email, unlock };
}
