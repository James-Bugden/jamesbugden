import { supabase } from "@/integrations/supabase/client";

export function trackShare(channel: string, page?: string) {
  const pagePath = page || window.location.pathname;
  supabase.from("share_clicks").insert({ channel, page: pagePath }).then(({ error }) => {
    if (error) console.warn("Share tracking failed:", error.message);
  });
}
