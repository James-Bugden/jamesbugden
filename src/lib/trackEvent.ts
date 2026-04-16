import { supabase } from "@/integrations/supabase/client";

/**
 * Fire-and-forget event tracking.
 * @param eventType - category: "cta_click" | "copy" | "calculator" | etc.
 * @param eventName - specific action: "book_call" | "copy_counteroffer" | "load_example"
 * @param metadata  - optional extra data
 */
export function trackEvent(
  eventType: string,
  eventName: string,
  metadata?: Record<string, unknown>,
) {
  const page = window.location.pathname;
  supabase
    .from("event_tracks" as any)
    .insert({ event_type: eventType, event_name: eventName, page, metadata: metadata ?? {} })
    .then(({ error }) => {
      if (error && import.meta.env.DEV) console.warn("Event tracking failed:", error.message);
    });
}
