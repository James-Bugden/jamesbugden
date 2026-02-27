import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "offer-compass-unlocked";
const EMAIL_KEY = "offer-compass-email";

export function useEmailGate() {
  const { isLoggedIn, user } = useAuth();

  const [isLocalUnlocked, setIsLocalUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [userEmail, setUserEmail] = useState(() => {
    try {
      return localStorage.getItem(EMAIL_KEY) || "";
    } catch {
      return "";
    }
  });

  const unlock = useCallback((email: string) => {
    setIsLocalUnlocked(true);
    setUserEmail(email);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
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

  // Logged-in users always unlocked
  const isUnlocked = isLoggedIn || isLocalUnlocked;
  const email = isLoggedIn ? (user?.email || "") : userEmail;

  return { isUnlocked, userEmail: email, unlock };
}
