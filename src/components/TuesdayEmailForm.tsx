import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ERROR_COPY: Record<string, string> = {
  invalid_email: "That email doesn't look right. Try again.",
  email_required: "Please enter your email.",
  group_not_configured:
    "Sign-ups are temporarily unavailable. Please try again shortly.",
  service_unavailable:
    "Sign-ups are temporarily unavailable. Please try again shortly.",
  upstream_error:
    "Something went wrong on our end. Please try again in a moment.",
  network_error:
    "Couldn't reach the signup service. Check your connection and try again.",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function TuesdayEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setErrorKey("email_required");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setErrorKey("invalid_email");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorKey(null);

    const { data, error } = await supabase.functions.invoke(
      "sync-mailerlite-tuesday",
      { body: { email: trimmed } },
    );

    if (error) {
      const apiError =
        (data as { error?: string } | null)?.error ?? "network_error";
      setErrorKey(apiError);
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="bg-executive-green/10 border border-executive-green/20 rounded-lg p-6 text-center animate-in fade-in duration-500">
        <CheckCircle2 className="w-10 h-10 text-executive-green mx-auto mb-3 animate-in zoom-in duration-300" />
        <h2 className="text-xl font-semibold text-executive-green mb-1">
          You're in.
        </h2>
        <p className="text-foreground/80 text-sm">
          The next Tuesday Job Market Intel briefing will land in your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <label htmlFor="tuesday-email-input" className="sr-only">
        Email address
      </label>
      <div className="relative">
        <input
          id="tuesday-email-input"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorKey(null);
            }
          }}
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          aria-describedby={errorKey ? "tuesday-email-error" : undefined}
          className="w-full px-4 py-3.5 pr-12 rounded-lg border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors text-base"
        />
        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 pointer-events-none" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 btn-gold text-base font-semibold rounded-lg text-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && errorKey && (
        <p
          id="tuesday-email-error"
          role="alert"
          className="text-sm text-destructive mt-1"
        >
          {ERROR_COPY[errorKey] ?? ERROR_COPY.network_error}
        </p>
      )}
    </form>
  );
}
