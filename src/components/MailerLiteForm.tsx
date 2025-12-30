import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ml?: (action: string, ...args: unknown[]) => void;
  }
}

type MailerLiteFormProps = {
  formId: string;
  className?: string;
};

const MAILERLITE_SRC = "https://assets.mailerlite.com/js/universal.js";
const MAILERLITE_ACCOUNT_ID = "1937443";

export default function MailerLiteForm({ formId, className }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // In an SPA, MailerLite's universal script often runs before React mounts.
    // The most reliable fix is to (re)load the universal script AFTER this embed exists.
    if (containerRef.current) containerRef.current.innerHTML = "";

    const removeExistingUniversal = () => {
      document
        .querySelectorAll<HTMLScriptElement>(`script[src="${MAILERLITE_SRC}"]`)
        .forEach((s) => s.parentNode?.removeChild(s));
    };

    const loadUniversal = () => {
      const s = document.createElement("script");
      s.async = true;
      s.src = MAILERLITE_SRC;
      s.onload = () => {
        // Ensure account is set for this session
        if (typeof window.ml === "function") {
          window.ml("account", MAILERLITE_ACCOUNT_ID);
        }
      };
      document.head.appendChild(s);
      return s;
    };

    removeExistingUniversal();
    const scriptEl = loadUniversal();

    return () => {
      scriptEl.parentNode?.removeChild(scriptEl);
    };
  }, []);

  return <div ref={containerRef} className={className ?? "ml-embedded"} data-form={formId} />;
}
