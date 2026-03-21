import { useMemo } from "react";
import { salaryData } from "@/data/salaryData";
import { useSalaryContext } from "./SalaryContext";
import { useSalaryT, type SalaryLang } from "./salaryI18n";

interface Props {
  currentRole: string;
  currentSector: string;
  lang: SalaryLang;
  onSelect: (role: string) => void;
}

export default function SimilarRoles({ currentRole, currentSector, lang, onSelect }: Props) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();

  const similar = useMemo(() => {
    // Find roles in the same sector (excluding current), pick best tier per role, aggregate
    const entries = salaryData.filter(d => d.sector === currentSector && d.role !== currentRole);
    const roles = [...new Set(entries.map(e => e.role))];
    const bestPerRole = roles.map(role => {
      const roleEntries = entries.filter(e => e.role === role);
      const bestTier = Math.min(...roleEntries.map(e => e.tier));
      const best = roleEntries.filter(e => e.tier === bestTier);
      if (best.length === 1) return best[0];
      const avg = (k: 'min' | 'med' | 'max') => Math.round(best.reduce((s, e) => s + e[k], 0) / best.length);
      return { ...best[0], min: avg('min'), med: avg('med'), max: avg('max') };
    });
    return bestPerRole.sort((a, b) => b.med - a.med).slice(0, 5);
  }, [currentRole, currentSector]);

  if (similar.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h4 className="font-heading text-lg font-bold mb-3">{t.similarRoles}</h4>
      <div className="space-y-2">
        {similar.map(s => (
          <button
            key={s.role}
            onClick={() => onSelect(s.role)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <span className="text-sm font-medium">{s.role}</span>
            <span className="text-sm tabular-nums text-executive font-semibold">{formatSalary(s.med)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
