import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackBoxProps {
  locale?: "en" | "zh-tw";
  subject?: string;
}

const LABELS = {
  en: {
    trigger: "Feedback",
    placeholder: "What's on your mind?",
    send: "Send",
    success: "Feedback sent",
    successDesc: "Thanks for your feedback!",
    empty: "Please write something first.",
    error: "Failed to send feedback. Please try again.",
  },
  "zh-tw": {
    trigger: "回饋建議",
    placeholder: "你有什麼想法？",
    send: "發送",
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
  const { user } = useAuth();
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
        type: "general",
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
      {/* Floating Action Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2.5 shadow-lg hover:shadow-xl transition-shadow text-sm font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            {t.trigger}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-40 bg-card border border-border rounded-xl shadow-xl p-4 w-80"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageSquare className="w-4 h-4" />
                {t.trigger}
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholder}
              rows={3}
              className="text-sm resize-none mb-3"
              maxLength={1000}
              autoFocus
            />
            <Button
              size="sm"
              onClick={handleSend}
              disabled={!text.trim() || sending}
              className="w-full h-8"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              {t.send}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
