import { ReactNode } from "react";
import { Share2, Copy } from "lucide-react";
import { toast } from "sonner";
import { type SalaryLang } from "../salaryI18n";

interface ChartCardProps {
  id: string;
  title: string;
  description: string;
  insight?: string;
  lang: SalaryLang;
  children: ReactNode;
  actions?: ReactNode;
}

export default function ChartCard({ id, title, description, insight, lang, children, actions }: ChartCardProps) {
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    toast.success(lang === "zh" ? "已複製連結" : "Link copied!");
  };

  const handleCopyInsight = () => {
    if (!insight) return;
    navigator.clipboard.writeText(insight);
    toast.success(lang === "zh" ? "已複製" : "Copied!");
  };

  return (
    <div id={id} className="bg-card border border-border rounded-xl p-6 space-y-4 scroll-mt-20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-muted transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {lang === "zh" ? "分享" : "Share"}
          </button>
        </div>
      </div>
      {children}
      {insight && (
        <div className="bg-muted/40 border border-border/50 rounded-lg p-3 flex items-start gap-3">
          <p className="text-xs text-muted-foreground flex-1 italic">"{insight}"</p>
          <button onClick={handleCopyInsight} className="shrink-0 text-muted-foreground hover:text-foreground">
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
