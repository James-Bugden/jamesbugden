import { useEffect, useRef, useState } from "react";

type MailerLiteFormProps = {
  formId: string;
  className?: string;
};

export default function MailerLiteForm({ formId, className }: MailerLiteFormProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-initialization of MailerLite after component mounts
    const initMailerLite = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      
      if (typeof w.ml === 'function') {
        // MailerLite is loaded, trigger a refresh to detect new embedded forms
        // The universal.js script scans for .ml-embedded elements
        // We need to re-run the account initialization
        w.ml('account', '1937443');
      }
    };

    // Small delay to ensure the DOM element is fully rendered
    const timer = setTimeout(initMailerLite, 100);
    
    // Also try after a longer delay in case the script is still loading
    const timer2 = setTimeout(initMailerLite, 500);
    const timer3 = setTimeout(initMailerLite, 1000);
    const timer4 = setTimeout(initMailerLite, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [key]);

  // Re-mount the component to force fresh initialization
  useEffect(() => {
    setKey((k) => k + 1);
  }, []);

  return (
    <div ref={containerRef} className={className || ""} key={key}>
      <div className="ml-embedded" data-form={formId}></div>
    </div>
  );
}
