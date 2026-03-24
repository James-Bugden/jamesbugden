import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import MailerLiteForm from "@/components/MailerLiteForm";
import { X } from "lucide-react";

interface ExitIntentContent {
  heading: string;
  subheading: string;
  buttonText: string;
  successHeading: string;
  successBody: string;
  successCta: string;
  successCtaLink: string;
}

const EN_CONTENT: ExitIntentContent = {
  heading: "Before you go —",
  subheading: "Get free job search guides delivered to your inbox. No spam, just insider strategies.",
  buttonText: "Get Free Guides",
  successHeading: "You're in!",
  successBody: "Check your inbox — your free guides are on the way.",
  successCta: "Create a free account to save progress & unlock more tools",
  successCtaLink: "/join",
};

const ZH_CONTENT: ExitIntentContent = {
  heading: "離開前 —",
  subheading: "免費獲取求職攻略，直接寄到您的信箱。不灌水、不廢話。",
  buttonText: "免費索取攻略",
  successHeading: "成功加入！",
  successBody: "請查看您的信箱，免費求職指南已寄出。",
  successCta: "建立免費帳號，儲存進度並探索更多工具",
  successCtaLink: "/join",
};

function useExitIntent(enabled: boolean) {
  const [triggered, setTriggered] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Don't fire if already shown this session
    if (sessionStorage.getItem("exit_intent_shown")) return;

    // Wait 5 seconds before arming
    const timer = setTimeout(() => {
      readyRef.current = true;
    }, 5000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!readyRef.current) return;
      if (e.clientY > 0) return; // only trigger when moving toward top (browser chrome)
      if (sessionStorage.getItem("exit_intent_shown")) return;

      sessionStorage.setItem("exit_intent_shown", "1");
      setTriggered(true);
    };

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  return [triggered, setTriggered] as const;
}

interface ExitIntentPopupProps {
  lang?: "en" | "zh";
}

export default function ExitIntentPopup({ lang = "en" }: ExitIntentPopupProps) {
  const { isLoggedIn, isLoading } = useAuth();

  // Only enable for non-logged-in users (wait for auth to resolve)
  const enabled = !isLoading && !isLoggedIn;
  const [open, setOpen] = useExitIntent(enabled);

  const c = lang === "zh" ? ZH_CONTENT : EN_CONTENT;

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0 border-0 overflow-hidden rounded-2xl" style={{ backgroundColor: '#FDFBF7' }}>
        {/* Top accent bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #2b4734, #D4930D)' }} />

        <div className="px-6 pt-6 pb-2">
          <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
            {c.heading}
          </h2>
          <p className="text-base mb-5" style={{ color: '#6B6B6B' }}>
            {c.subheading}
          </p>
        </div>

        <div className="px-6 pb-6">
          <MailerLiteForm
            formId="sM1X80"
            className="ml-embedded"
            buttonText={c.buttonText}
            successHeading={c.successHeading}
            successBody={c.successBody}
            successCta={c.successCta}
            successCtaLink={c.successCtaLink}
            leadSource="exit-intent"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
