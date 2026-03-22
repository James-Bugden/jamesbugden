import { useState } from "react";
import { MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackBoxProps {
  locale?: "en" | "zh-tw";
  subject?: string;
}

const LABELS = {
  en: {
    trigger: "Send Feedback",
    placeholder: "What's on your mind?",
    send: "Send Feedback",
    success: "Feedback sent",
    successDesc: "Thanks for your feedback!",
    empty: "Please write something first.",
    error: "Failed to send feedback. Please try again.",
  },
  "zh-tw": {
    trigger: "回饋建議",
    placeholder: "你有什麼想法？",
    send: "發送回饋",
    success: "回饋已發送",
    successDesc: "感謝你的回饋！",
    empty: "請先輸入內容。",
    error: "發送失敗，請再試一次。",
  },
};

export default function FeedbackBox({ locale = "en", subject: _subject }: FeedbackBoxProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const t = LABELS[locale];

  const handleSend = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      const page = window.location.pathname;
      const { error } = await supabase.from("feedback" as any).insert({
        message: text.trim(),
        page,
        locale,
      } as any);
      if (error) throw error;
      toast({ title: t.success, description: t.successDesc });
      setText("");
      setOpen(false);
    } catch {
      toast({ title: t.error, variant: "destructive" });
    } finally {
      setSending(false);
    }
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
            disabled={!text.trim() || sending}
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
