import { useState, useRef, useEffect } from "react";

type MailerLiteFormProps = {
  formId: string;
  className?: string;
};

export default function MailerLiteForm({ formId, className }: MailerLiteFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Generate a unique callback name for JSONP
  const callbackName = `ml_callback_${formId}_${Date.now()}`;

  useEffect(() => {
    // Set up the callback function for JSONP response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[callbackName] = (response: unknown) => {
      setIsSuccess(true);
      setIsLoading(false);
      setEmail("");
      // Clean up
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[callbackName];
    };

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[callbackName];
    };
  }, [callbackName]);

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
          <p className="text-foreground">You have successfully joined the resume review waitlist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className || ""}>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gold hover:bg-gold/90 text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? "Joining..." : "Join Waitlist"}
        </button>
      </form>
    </div>
  );
}
