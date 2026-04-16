import { AlertTriangle, Heart, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Lang = "en" | "zh-TW" | "zh-tw";

interface LimitReachedModalProps {
  open: boolean;
  onClose: () => void;
  /** e.g. "resumes", "AI analyses", "AI imports", "prints" */
  limitType: string;
  currentCount: number;
  planLimit: number;
  lang?: Lang;
}

const tl = (lang: Lang, en: string, zh: string) =>
  lang === "en" ? en : zh;

export function LimitReachedModal({
  open,
  onClose,
  limitType,
  currentCount,
  planLimit,
  lang = "en",
}: LimitReachedModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-xl">
        {/* Header bar */}
        <div
          className="px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <DialogHeader>
            <DialogTitle className="text-[15px] font-bold flex items-center gap-2" style={{ color: "#1A1A1A" }}>
              <AlertTriangle className="w-5 h-5 shrink-0" style={{ color: "#dc2626" }} />
              {tl(lang, "Monthly limit reached", "本月額度已用完")}
            </DialogTitle>
            <DialogDescription className="text-[13px] mt-2 leading-relaxed" style={{ color: "#6B6B6B" }}>
              {tl(
                lang,
                `You've used all ${planLimit} free ${limitType} this month (${currentCount}/${planLimit}). Your limit resets at the start of next month.`,
                `你已使用完本月 ${planLimit} 次免費${limitType}額度（${currentCount}/${planLimit}）。額度將於下月初重置。`
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Cost transparency */}
        <div className="px-5 py-4" style={{ backgroundColor: "rgba(212,147,13,0.04)" }}>
          <div className="flex items-start gap-2">
            <Heart className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#D4930D" }} />
            <p className="text-xs leading-relaxed" style={{ color: "#6B6B6B" }}>
              {tl(
                lang,
                "I built this tool by myself as a solo creator. Each use runs through a premium AI model with real costs. These limits help me keep everything free. Thank you for understanding! 🙏",
                "這個工具是我一個人獨力開發的。每次使用都透過高階 AI 模型運算，產生實際費用。設定額度上限是為了讓工具能持續免費提供。感謝你的體諒！🙏"
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <a
            href="https://jamesbugden.com/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: "#D4930D" }}
          >
            {tl(lang, "Contact for more", "聯繫取得更多額度")}
          </a>
          <button
            onClick={onClose}
            className="text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "rgba(43,71,52,0.08)", color: "#234E3E" }}
          >
            {tl(lang, "Got it", "了解")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
