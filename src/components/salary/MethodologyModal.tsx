import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import { TierBadge } from "./badges";

export default function MethodologyModal({ lang, children }: { lang: SalaryLang; children: React.ReactNode }) {
  const t = useSalaryT(lang);

  const tiers = [
    { tier: 1, label: t.tier1, desc: t.tier1Desc },
    { tier: 2, label: t.tier2, desc: t.tier2Desc },
    { tier: 3, label: t.tier3, desc: t.tier3Desc },
    { tier: 4, label: t.tier4, desc: t.tier4Desc },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">{t.methodologyTitle}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">{t.methodologyDesc}</p>
        <div className="space-y-4">
          {tiers.map(({ tier, desc }) => (
            <div key={tier} className="flex gap-3">
              <div className="pt-0.5"><TierBadge tier={tier} lang={lang} /></div>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
