/**
 * Stable anonymous visitor ID stored in localStorage.
 * Survives page reloads and tab restarts. Resets if user clears storage.
 * No PII — just a random UUID for funnel attribution.
 */
const KEY = "jb_anon_id";

export function getAnonId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    // Private browsing / blocked storage — generate a per-tab fallback
    return "";
  }
}
