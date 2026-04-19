import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  initSession,
  touchSession,
  endSession,
  installGlobalErrorHandler,
  track,
} from "@/lib/analytics";

/**
 * Mounts once. Initializes the session row, attaches the global JS error
 * handler, fires a `pageview` to event_tracks on every SPA navigation,
 * and writes session.ended_at / duration on tab close.
 */
export default function AnalyticsProvider() {
  const { pathname } = useLocation();
  const initialized = useRef(false);

  // First mount: create session, install error handler, write end on unload
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initSession();
    const cleanup = installGlobalErrorHandler();

    const onPageHide = () => endSession();
    window.addEventListener("pagehide", onPageHide);
    return () => {
      cleanup();
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  // Per-route: fire pageview + heartbeat session
  useEffect(() => {
    track("pageview", pathname);
    touchSession(pathname);
  }, [pathname]);

  return null;
}
