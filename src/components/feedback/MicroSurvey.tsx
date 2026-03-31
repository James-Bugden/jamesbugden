import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface MicroSurveyProps {
  actionKey: string;
  question?: string;
  locale?: "en" | "zh-tw";
}

const LABELS = {
  en: { question: "How was that?", placeholder: "Any thoughts? (optional)", thanks: "Thanks for your feedback!" },
  "zh-tw": { question: "體驗如何？", placeholder: "有什麼想法？（選填）", thanks: "感謝你的回饋！" },
};

export default function MicroSurvey({ actionKey, question, locale = "en" }: MicroSurveyProps) {
  const storageKey = `micro_survey_${actionKey}_done`;
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState<1 | -1 | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();
  const t = LABELS[locale];

  useEffect(() => {
    if (localStorage.getItem(storageKey)) return;
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, [storageKey]);

  // Auto-dismiss after 15s if no interaction
  useEffect(() => {
    if (!visible || rating !== null) return;
    const timer = setTimeout(() => dismiss(), 15000);
    return () => clearTimeout(timer);
  }, [visible, rating]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(storageKey, "dismissed");
  };

  const submit = async (r: 1 | -1) => {
    setRating(r);
    setSubmitted(true);
    localStorage.setItem(storageKey, "submitted");
    try {
      await supabase.from("feedback" as any).insert({
        message: comment.trim() || `${actionKey}: ${r === 1 ? "👍" : "👎"}`,
        page: window.location.pathname,
        locale,
        type: "micro_survey",
        rating: r,
        context: actionKey,
        user_id: user?.id || null,
        metadata: {
          has_comment: !!comment.trim(),
          screen_width: window.innerWidth,
        },
      } as any);
    } catch {}
    setTimeout(() => setVisible(false), 1500);
  };

  const handleThumb = (r: 1 | -1) => {
    if (comment.trim()) {
      submit(r);
    } else {
      setRating(r);
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-20 right-5 z-50 bg-card border border-border rounded-xl shadow-lg p-4 w-72 print:hidden"
      >
        <button onClick={dismiss} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <p className="text-sm text-center text-foreground py-2">{t.thanks}</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">{question || t.question}</p>
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                variant={rating === 1 ? "default" : "outline"}
                onClick={() => handleThumb(1)}
                className="gap-1.5"
              >
                <ThumbsUp className="w-4 h-4" /> 
              </Button>
              <Button
                size="sm"
                variant={rating === -1 ? "default" : "outline"}
                onClick={() => handleThumb(-1)}
                className="gap-1.5"
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
            </div>
            {rating !== null && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="space-y-2">
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.placeholder}
                  className="text-sm h-8"
                  maxLength={500}
                />
                <Button size="sm" className="w-full h-8" onClick={() => submit(rating!)}>
                  Send
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
