import { supabase } from "@/integrations/supabase/client";
import { getAnonId } from "@/lib/analytics/anonId";
import { getSessionId } from "@/lib/analytics/session";

/**
 * Fire-and-forget event tracking.
 *
 * Auto-enriches every event with `anon_id` and `session_id` so we can
 * stitch funnels across page views without changing any call site.
 *
 * @param eventType - category: "cta_click" | "copy" | "calculator" | etc.
 * @param eventName - specific action: "book_call" | "copy_counteroffer"
 * @param metadata  - optional extra data
 */
export function trackEvent(
  eventType: string,
  eventName: string,
  metadata?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const page = window.location.pathname;
  const enriched = {
    ...(metadata ?? {}),
    anon_id: getAnonId(),
    session_id: getSessionId(),
  };
  supabase
    .from("event_tracks" as any)
    .insert({ event_type: eventType, event_name: eventName, page, metadata: enriched })
    .then(({ error }) => {
      if (error && import.meta.env.DEV) console.warn("Event tracking failed:", error.message);
    });
}
