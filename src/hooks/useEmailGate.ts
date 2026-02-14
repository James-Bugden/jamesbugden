import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "offer-compass-unlocked";
const EMAIL_KEY = "offer-compass-email";

export function useEmailGate() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
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
    setIsUnlocked(true);
    setUserEmail(email);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(EMAIL_KEY, email);
    } catch {
      // localStorage unavailable
    }
    // TODO: Connect to MailerLite API
    console.log({ email, source: "calculator", event: "offer-compass-unlock" });
  }, []);

  return { isUnlocked, userEmail, unlock };
}
