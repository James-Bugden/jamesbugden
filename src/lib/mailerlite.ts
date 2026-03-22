import { supabase } from "@/integrations/supabase/client";

export function syncToMailerLite(email: string, name?: string): void {
  supabase.functions
    .invoke("sync-mailerlite", { body: { email, name } })
    .then(({ error }) => {
      if (error) console.warn("[MailerLite] sync failed:", error.message);
      else console.log("[MailerLite] subscriber synced");
    })
    .catch((err) => console.warn("[MailerLite] sync error:", err));
}
