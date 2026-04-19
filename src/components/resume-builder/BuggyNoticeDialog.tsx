import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { ResumeBuilderLangContext } from "@/components/resume-builder/i18n";

const STORAGE_KEY_EN = "resume_builder_buggy_notice_v1_dismissed";
const STORAGE_KEY_ZH = "resume_builder_buggy_notice_v1_dismissed_zh";

export function BuggyNoticeDialog() {
  const ctxLang = useContext(ResumeBuilderLangContext);
  const lang: "en" | "zh" = ctxLang === "zh-tw" ? "zh" : "en";
  const [open, setOpen] = useState(false);
  const key = lang === "zh" ? STORAGE_KEY_ZH : STORAGE_KEY_EN;

  useEffect(() => {
    if (localStorage.getItem(key)) return;
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, [key]);

  const dismiss = () => {
    localStorage.setItem(key, "1");
    setOpen(false);
  };

  const t =
    lang === "zh"
      ? {
          title: "履歷編輯器目前不太穩定",
          body: "這個工具目前還有一些 bug，中文版的支援也還不夠完善。我正在積極修復中，感謝你的耐心。如果遇到問題，歡迎隨時用回饋功能告訴我。",
          cta: "我了解了",
        }
      : {
          title: "Heads up: the resume builder is a bit buggy",
          body: "I'm actively fixing issues right now. The Chinese version in particular still has some rough edges. Thanks for your patience — please send feedback if you hit anything broken.",
          cta: "Got it",
        };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center">{t.title}</DialogTitle>
          <DialogDescription className="text-center">{t.body}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={dismiss} className="w-full">{t.cta}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
