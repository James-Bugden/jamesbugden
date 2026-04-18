export function syncToMailerLite(email: string, name?: string): void {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-mailerlite`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify({ email, name }),
    keepalive: true,
  })
    .then((res) => {
      if (!res.ok && import.meta.env.DEV) console.warn("[MailerLite] sync failed:", res.status);
    })
    .catch((err) => {
      if (import.meta.env.DEV) console.warn("[MailerLite] sync error:", err);
    });
}
