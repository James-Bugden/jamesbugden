import { useState, useEffect } from "react";
import { X, Info, HelpCircle } from "lucide-react";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const STORAGE_KEY = "salary-how-to-read-dismissed";

export default function SalaryHowToRead({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (dismissed) {
    // Show a persistent (?) help button
    return (
      <div className="flex justify-end mb-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => { setDismissed(false); localStorage.removeItem(STORAGE_KEY); }}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={lang === "zh" ? "如何閱讀" : "How to read"}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-[250px] text-xs">
            {t.howToRead}
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground mb-4 animate-fade-in">
      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-executive" />
      <p className="flex-1 leading-relaxed">{t.howToRead}</p>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-0.5 rounded hover:bg-muted transition-colors"
        aria-label={t.dismiss}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
