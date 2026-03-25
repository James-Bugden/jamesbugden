import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const SESSION_COUNT_KEY = "nps_session_count";
const LAST_NPS_KEY = "nps_last_shown";
const NPS_COOLDOWN_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const MIN_SESSIONS = 3;

interface NpsPulseProps {
  locale?: "en" | "zh-tw";
}

const LABELS = {
  en: {
    title: "Quick question",
    question: "How likely are you to recommend james.careers to a friend or colleague?",
    low: "Not likely",
    high: "Very likely",
    comment: "Any suggestions? (optional)",
    send: "Submit",
    skip: "Skip",
    thanks: "Thanks for your feedback! 🙏",
  },
  "zh-tw": {
    title: "快速問題",
    question: "你有多大可能推薦 james.careers 給朋友或同事？",
    low: "不太可能",
    high: "非常可能",
    comment: "有什麼建議嗎？（選填）",
    send: "提交",
    skip: "跳過",
    thanks: "感謝你的回饋！🙏",
  },
};

export default function NpsPulse({ locale = "en" }: NpsPulseProps) {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const t = LABELS[locale];

  useEffect(() => {
    if (!isLoggedIn) return;

    // Increment session count
    const count = parseInt(localStorage.getItem(SESSION_COUNT_KEY) || "0", 10) + 1;
    localStorage.setItem(SESSION_COUNT_KEY, String(count));

    if (count < MIN_SESSIONS) return;

    // Check cooldown
    const lastShown = localStorage.getItem(LAST_NPS_KEY);
    if (lastShown && Date.now() - parseInt(lastShown, 10) < NPS_COOLDOWN_MS) return;

    // Show after delay
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem(LAST_NPS_KEY, String(Date.now()));
  };

  const submit = async () => {
    if (score === null) return;
    setSubmitted(true);
    localStorage.setItem(LAST_NPS_KEY, String(Date.now()));
    try {
      await supabase.from("feedback" as any).insert({
        message: comment.trim() || `NPS score: ${score}`,
        page: window.location.pathname,
        locale,
        type: "nps",
        rating: score,
        context: "nps_pulse",
      } as any);
    } catch {}
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">{t.title}</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <p className="text-center py-6 text-foreground">{t.thanks}</p>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-foreground">{t.question}</p>

            {/* Score buttons 0-10 */}
            <div className="space-y-1">
              <div className="flex gap-1 justify-between">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setScore(i)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      score === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">{t.low}</span>
                <span className="text-xs text-muted-foreground">{t.high}</span>
              </div>
            </div>

            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.comment}
              rows={2}
              className="text-sm resize-none"
              maxLength={500}
            />

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={dismiss}>{t.skip}</Button>
              <Button size="sm" onClick={submit} disabled={score === null}>{t.send}</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
