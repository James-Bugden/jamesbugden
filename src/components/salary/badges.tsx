import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useSalaryT, type SalaryLang } from "./salaryI18n";

export function FreshnessBadge({ year, lang = "en" }: { year: number; lang?: SalaryLang }) {
  const t = useSalaryT(lang);

  const config = year >= 2025
    ? { className: "bg-executive-green text-cream border-0 text-[10px] px-1.5 py-0", label: t.current, tip: t.freshnessCurrent }
    : year === 2024
    ? { className: "bg-green-soft text-executive-green border border-executive-green/20 text-[10px] px-1.5 py-0", label: t.recent, tip: t.freshnessRecent }
    : { className: "bg-gold-soft text-gold-dark border border-gold/30 text-[10px] px-1.5 py-0", label: t.adjusted, tip: t.freshnessAdjusted };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={config.className}>{config.label}</Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] text-xs">
          {config.tip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function TierBadge({ tier, lang = "en" }: { tier: number; lang?: SalaryLang }) {
  const t = useSalaryT(lang);

  const configs: Record<number, { badge: React.ReactNode; tip: string }> = {
    1: { badge: <Badge className="bg-executive text-white border-0 text-[10px] px-1.5 py-0">{t.tier1}</Badge>, tip: t.tierAgencyTip },
    2: { badge: <Badge variant="outline" className="border-executive text-executive text-[10px] px-1.5 py-0">{t.tier2}</Badge>, tip: t.tierGovTip },
    3: { badge: <Badge className="bg-gold text-white border-0 text-[10px] px-1.5 py-0">{t.tier3}</Badge>, tip: t.tierJobBoardTip },
    4: { badge: <Badge className="bg-muted text-muted-foreground border-0 text-[10px] px-1.5 py-0">{t.tier4}</Badge>, tip: t.tierCrowdTip },
  };

  const config = configs[tier];
  if (!config) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {config.badge}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[220px] text-xs">
          {config.tip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
