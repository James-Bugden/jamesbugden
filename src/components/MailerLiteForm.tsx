import { useState, useRef } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const ml: any;

let mailerLiteLoaded = false;
function loadMailerLite() {
  if (mailerLiteLoaded) return;
  mailerLiteLoaded = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.ml = w.ml || function () { (w.ml.q = w.ml.q || []).push(arguments); };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://assets.mailerlite.com/js/universal.js";
  document.head.appendChild(s);
  ml("account", "1937443");
}

type MailerLiteFormProps = {
  formId: string;
  className?: string;
  buttonText?: string;
  successHeading?: string;
  successBody?: string;
  successCta?: string;
  successCtaLink?: string;
};

export default function MailerLiteForm({ formId, className, buttonText = "Get on the waitlist", successHeading = "You're in!", successBody = "Check your inbox for your free job search guides.", successCta = "Create a free account to save progress & explore more tools", successCtaLink = "/join" }: MailerLiteFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Load MailerLite script only when user interacts with the form
  const handleFocus = () => {
    loadMailerLite();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);

    // Create a hidden iframe to submit the form
    const iframe = document.createElement("iframe");
    iframe.name = `ml_iframe_${formId}_${Date.now()}`;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Wait for iframe to be ready before submitting
    iframe.addEventListener("load", () => {
      // Create a form that targets the iframe
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `https://assets.mailerlite.com/jsonp/1937443/forms/145693936040498462/subscribe`;
      form.target = iframe.name;

      // Add email field
      const emailInput = document.createElement("input");
      emailInput.type = "hidden";
      emailInput.name = "fields[email]";
      emailInput.value = email;
      form.appendChild(emailInput);

      document.body.appendChild(form);
      form.submit();

      // Cleanup form immediately, iframe after delay
      setTimeout(() => {
        try { document.body.removeChild(form); } catch (_) {}
      }, 100);
    });

    // Set a blank src to trigger the load event
    iframe.src = "about:blank";

    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
      setEmail("");
      
      // Cleanup iframe
      try { document.body.removeChild(iframe); } catch (_) {}
    }, 1500);
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
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
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
