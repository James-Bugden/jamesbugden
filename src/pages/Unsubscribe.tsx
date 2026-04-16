import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

type Status = "loading" | "valid" | "already_unsubscribed" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
        } else if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already_unsubscribed");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) {
        setStatus("error");
      } else if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already_unsubscribed");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO />
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.15em] text-executive-green mb-6">JAMES BUGDEN</p>

        {status === "loading" && (
          <p className="text-muted-foreground">Verifying your request…</p>
        )}

        {status === "valid" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">Unsubscribe</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Click the button below to unsubscribe from future emails.
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={submitting}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-executive-green text-cream font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Processing…" : "Confirm Unsubscribe"}
            </button>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">You've been unsubscribed</h1>
            <p className="text-sm text-muted-foreground">You will no longer receive emails from us.</p>
          </>
        )}

        {status === "already_unsubscribed" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">Already unsubscribed</h1>
            <p className="text-sm text-muted-foreground">This email address has already been unsubscribed.</p>
          </>
        )}

        {status === "invalid" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">Invalid link</h1>
            <p className="text-sm text-muted-foreground">This unsubscribe link is invalid or has expired.</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-heading text-xl font-bold text-foreground mb-3">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">Please try again later.</p>
          </>
        )}
      </div>
    </div>
  );
}
