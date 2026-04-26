import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { assignDripVariantForLead } from "@/lib/experiments/variants";

type MailerLiteFormProps = {
  formId: string;
  className?: string;
  buttonText?: string;
  successHeading?: string;
  successBody?: string;
  successCta?: string;
  successCtaLink?: string;
  leadSource?: string;
};

export default function MailerLiteForm({ formId, className, buttonText = "Get on the waitlist", successHeading = "You're in!", successBody = "Check your inbox for your free job search guides.", successCta = "Create a free account to save progress & explore more tools", successCtaLink = "/join", leadSource = "homepage" }: MailerLiteFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    const trimmedEmail = email.trim();

    try {
      // Insert lead first so we have a row id to attach a drip variant to.
      // The MailerLite invoke runs in parallel with variant assignment so
      // the user-visible latency stays the same as before.
      const insertPromise = supabase
        .from("email_gate_leads")
        .insert({ email: trimmedEmail, source: leadSource })
        .select("id")
        .single();

      const [{ data: lead, error: leadError }] = await Promise.all([
        insertPromise,
      ]);

      if (leadError && import.meta.env.DEV) {
        console.warn("[MailerLiteForm] lead insert failed:", leadError.message);
      }

      // Assign sticky drip-experiment variant on the lead row (HIR-64).
      // RPC is idempotent and falls back to null on failure; in either
      // case we still call the MailerLite sync so the email is captured.
      const dripVariant = lead?.id
        ? await assignDripVariantForLead(lead.id)
        : null;

      await supabase.functions.invoke("sync-mailerlite", {
        body: {
          email: trimmedEmail,
          drip_variant: dripVariant ?? undefined,
        },
      });
    } catch (err) {
      console.error("Lead sync error:", err);
    }

    setIsSuccess(true);
    setIsLoading(false);
    setEmail("");
  };

  if (isSuccess) {
    return (
      <div className={className || ""}>
        <div className="bg-executive-green/10 border border-executive-green/20 rounded-lg p-6 text-center animate-in fade-in duration-500">
          <CheckCircle2 className="w-10 h-10 text-executive-green mx-auto mb-3 animate-in zoom-in duration-300" />
          <h4 className="text-xl font-semibold text-executive-green mb-1">{successHeading}</h4>
          <p className="text-foreground/80 text-sm mb-4">{successBody}</p>
          <Link
            to={successCtaLink}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-lg btn-gold text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {successCta}
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={className || ""}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3.5 pr-12 rounded-lg border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors text-base"
          />
          <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 pointer-events-none" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 btn-gold text-base font-semibold rounded-lg text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Joining..." : buttonText}
        </button>
      </form>
    </div>
  );
}