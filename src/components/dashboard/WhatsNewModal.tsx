import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Navigation, Clock, ChevronDown } from "lucide-react";
import type { UserProfile } from "@/hooks/useProfile";

const KEY = "james_careers_dashboard_v2_seen";
const i18n = {
  en: {
    heading: "Your Dashboard Got an Upgrade",
    sub: "Here's what changed:",
    items: [
      { title: "Phase-based navigation", desc: "Your journey sections now highlight what's relevant to your current stage. Switch anytime with the pill bar at the top." },
      { title: "Pick up where you left off", desc: "See your latest resume score, last viewed guide, and suggested next step in one glance." },
      { title: "Collapsible sections", desc: "Future phases are tucked away but always accessible. Click to expand any section." },
    ],
    cta: "Got it",
  },
  zh: {
    heading: "你的專區全新升級",
    sub: "以下是主要變更：",
    items: [
      { title: "階段式導航", desc: "旅程區塊會根據你目前的求職階段自動聚焦。隨時用頂部的切換列切換。" },
      { title: "接續上次進度", desc: "一眼看到最新履歷分數、上次閱讀的指南、下一步建議。" },
      { title: "可收合的區塊", desc: "尚未到達的階段會自動收起，但隨時可以展開查看。" },
    ],
    cta: "了解了",
  },
};

const ICONS = [Navigation, Clock, ChevronDown];

interface Props {
  lang: "en" | "zh";
  profile?: UserProfile | null;
  updateProfile?: (updates: Partial<Pick<UserProfile, "career_phase" | "onboarding_completed" | "last_viewed_guide" | "last_viewed_guide_at" | "nps_last_shown_at">>) => Promise<void>;
}

export default function WhatsNewModal({ lang, profile, updateProfile }: Props) {
  // Don't show for brand-new users who haven't completed onboarding yet
  const isNewUser = !profile || !profile.onboarding_completed;
  const alreadySeen = !!localStorage.getItem(KEY) || !!(profile as any)?.whats_new_v2_seen;
  const [open, setOpen] = useState(() => !isNewUser && !alreadySeen);

  if (!open) return null;

  const t = i18n[lang];

  const dismiss = () => {
    localStorage.setItem(KEY, "1");
    // Persist to DB so it sticks across devices/domains
    if (updateProfile) {
      (updateProfile as any)({ whats_new_v2_seen: true });
    }
    setOpen(false);
  };

  return (
    <Dialog open onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 gap-0 max-h-[90dvh] flex flex-col">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-5 text-center shrink-0" style={{ backgroundColor: "#234E3E" }}>
          <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "rgba(212, 168, 67, 0.2)" }}>
            <Sparkles className="w-6 h-6" style={{ color: "#D4A843" }} />
          </div>
          <h2 className="text-xl font-heading font-bold" style={{ color: "#FBF7F0" }}>{t.heading}</h2>
          <p className="text-sm mt-1" style={{ color: "rgba(251, 247, 240, 0.7)" }}>{t.sub}</p>
        </div>

        {/* Items */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 space-y-3 sm:space-y-5 overflow-y-auto flex-1">
          {t.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center" style={{ backgroundColor: "rgba(212, 168, 67, 0.12)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#D4A843" }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 shrink-0">
          <button
            onClick={dismiss}
            className="w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#234E3E", color: "#FBF7F0" }}
          >
            {t.cta}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
