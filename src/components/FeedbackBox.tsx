import { useState } from "react";
import { MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FeedbackBoxProps {
  locale?: "en" | "zh-tw";
}

const LABELS = {
  en: {
    trigger: "Send Feedback",
    placeholder: "What's on your mind?",
    send: "Send Feedback",
    success: "Feedback sent",
    successDesc: "Your email client will open with the message.",
    empty: "Please write something first.",
  },
  "zh-tw": {
    trigger: "回饋建議",
    placeholder: "你有什麼想法？",
    send: "發送回饋",
    success: "回饋已發送",
    successDesc: "你的 Email 應用程式將打開並帶入訊息。",
    empty: "請先輸入內容。",
  },
};

export default function FeedbackBox({ locale = "en" }: FeedbackBoxProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { toast } = useToast();
  const t = LABELS[locale];

  const handleSend = () => {
    if (!text.trim()) return;
    const subject = locale === "zh-tw" ? "Offer Calculator 意見回饋" : "Offer Calculator Feedback";
    window.location.href = `mailto:james@jamesbugden.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text.trim())}`;
    toast({ title: t.success, description: t.successDesc });
    setText("");
    setOpen(false);
  };

  return (
    <div className="print:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        {t.trigger}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {open && (
        <div className="mt-3 space-y-2 max-w-md animate-in slide-in-from-top-2 duration-200">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            rows={3}
            className="text-sm resize-none"
            maxLength={1000}
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!text.trim()}
            className="h-8"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            {t.send}
          </Button>
        </div>
      )}
    </div>
  );
}
