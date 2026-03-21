import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, useResumeBuilderLang } from "./i18n";
import { ResumeData } from "./types";
import { resumeDataToText } from "@/lib/resumeDataToText";

interface AnalyzerCTAProps {
  fromAnalyzer: boolean;
  resumeData?: ResumeData;
}

export function AnalyzerCTA({ fromAnalyzer, resumeData }: AnalyzerCTAProps) {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const t = useT();
  const lang = useResumeBuilderLang();

  if (fromAnalyzer || dismissed) return null;

  return (
    <div className="relative rounded-xl border border-primary/20 bg-primary/5 p-4">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <FileSearch className="w-4.5 h-4.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug">
            {t("analyzerCtaTitle")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("analyzerCtaDesc")}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2.5 h-8 text-xs gap-1.5"
            onClick={() => {
              if (resumeData) {
                const text = resumeDataToText(resumeData);
                sessionStorage.setItem("analyzer-auto-text", text);
              }
              navigate(lang === "zh-tw" ? "/zh-tw/resume-analyzer" : "/resume-analyzer");
            }}
          >
            {t("analyzerCtaButton")}
          </Button>
        </div>
      </div>
    </div>
  );
}
