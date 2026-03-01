import { useState, useRef } from "react";
import { Mail } from "lucide-react";

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
};

export default function MailerLiteForm({ formId, className, buttonText = "Get on the waitlist" }: MailerLiteFormProps) {
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
    iframe.name = `ml_iframe_${formId}`;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

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

    // Assume success after a short delay (since we can't read cross-origin iframe)
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
      setEmail("");
      
      // Cleanup
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className={className || ""}>
        <div className="bg-executive-green/10 border border-executive-green/20 rounded-lg p-6 text-center">
          <h4 className="text-xl font-semibold text-executive-green mb-2">Thank you!</h4>
          <p className="text-foreground">You will get an email with your job search guides.</p>
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
          className="w-full py-3.5 btn-gold text-[1.125rem] font-semibold rounded-lg text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Joining..." : buttonText}
        </button>
      </form>
    </div>
  );
}
