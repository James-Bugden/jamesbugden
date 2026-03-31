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
const PAGES_VISITED_KEY = "nps_pages_visited";

interface NpsPulseProps {
  locale?: "en" | "zh-tw";
}

const LABELS = {
  en: {
    title: "Quick question",
    question: "How likely are you to recommend james.careers to a friend or colleague?",
    low: "Not likely",
    high: "Very likely",
    followUpDetractor: "What's one thing we could improve?",
    followUpPromoter: "What do you like most? We'd love to hear!",
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
    followUpDetractor: "你覺得我們最需要改進什麼？",
    followUpPromoter: "你最喜歡什麼？我們很想聽聽！",
    comment: "有什麼建議嗎？（選填）",
    send: "提交",
    skip: "跳過",
    thanks: "感謝你的回饋！🙏",
  },
};

/** Collect lightweight behavioral context for the NPS submission */
function collectBehavioralContext() {
  const sessionCount = parseInt(localStorage.getItem(SESSION_COUNT_KEY) || "0", 10);

  // Pages visited this session (tracked via sessionStorage)
  const pagesRaw = sessionStorage.getItem(PAGES_VISITED_KEY);
  const pagesVisited: string[] = pagesRaw ? JSON.parse(pagesRaw) : [];

  // Estimate days since first visit (session count started)
  const firstVisitKey = "nps_first_visit";
  let firstVisit = localStorage.getItem(firstVisitKey);
  if (!firstVisit) {
    firstVisit = new Date().toISOString();
    localStorage.setItem(firstVisitKey, firstVisit);
  }
  const daysSinceFirstVisit = Math.floor((Date.now() - new Date(firstVisit).getTime()) / (1000 * 60 * 60 * 24));

  return {
    session_count: sessionCount,
    days_since_first_visit: daysSinceFirstVisit,
    pages_this_session: pagesVisited.slice(-20), // last 20 pages
    current_page: window.location.pathname,
    screen_width: window.innerWidth,
    referrer: document.referrer || null,
  };
}

export default function NpsPulse({ locale = "en" }: NpsPulseProps) {
  const { isLoggedIn, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"score" | "followup">("score");
  const t = LABELS[locale];

  // Track pages visited this session
  useEffect(() => {
    const pagesRaw = sessionStorage.getItem(PAGES_VISITED_KEY);
    const pages: string[] = pagesRaw ? JSON.parse(pagesRaw) : [];
    const currentPage = window.location.pathname;
    if (pages[pages.length - 1] !== currentPage) {
      pages.push(currentPage);
      sessionStorage.setItem(PAGES_VISITED_KEY, JSON.stringify(pages));
    }
  }, []);

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

  const handleScoreSelect = (s: number) => {
    setScore(s);
    // Move to follow-up step
    setStep("followup");
  };

  const getFollowUpPrompt = () => {
    if (score === null) return t.comment;
    return score >= 9 ? t.followUpPromoter : t.followUpDetractor;
  };

  const submit = async () => {
    if (score === null) return;
    setSubmitted(true);
    localStorage.setItem(LAST_NPS_KEY, String(Date.now()));

    const behavioral = collectBehavioralContext();
    const npsCategory = score >= 9 ? "promoter" : score >= 7 ? "passive" : "detractor";

    try {
      await supabase.from("feedback" as any).insert({
        message: comment.trim() || `NPS score: ${score}`,
        page: window.location.pathname,
        locale,
        type: "nps",
        rating: score,
        context: "nps_pulse",
        user_id: user?.id || null,
        metadata: {
          nps_category: npsCategory,
          has_comment: !!comment.trim(),
          ...behavioral,
        },
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
        ) : step === "score" ? (
          <div className="space-y-5">
            <p className="text-sm text-foreground">{t.question}</p>

            {/* Score buttons 0-10 */}
            <div className="space-y-1">
              <div className="flex gap-1 justify-between">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleScoreSelect(i)}
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

            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={dismiss}>{t.skip}</Button>
            </div>
          </div>
        ) : (
          /* Follow-up step */
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {locale === "zh-tw" ? "你的評分" : "Your score"}:
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground text-sm font-semibold">
                {score}
              </span>
              <button
                onClick={() => setStep("score")}
                className="text-xs text-primary hover:underline ml-1"
              >
                {locale === "zh-tw" ? "更改" : "Change"}
              </button>
            </div>

            <p className="text-sm font-medium text-foreground">{getFollowUpPrompt()}</p>

            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={score !== null && score >= 9
                ? (locale === "zh-tw" ? "例如：我很喜歡薪資計算器…" : "e.g. I love the salary calculator…")
                : (locale === "zh-tw" ? "例如：希望能增加更多模板…" : "e.g. I wish there were more templates…")
              }
              rows={3}
              className="text-sm resize-none"
              maxLength={500}
              autoFocus
            />

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={submit}>
                {locale === "zh-tw" ? "跳過" : "Skip"}
              </Button>
              <Button size="sm" onClick={submit} disabled={score === null}>
                {t.send}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
