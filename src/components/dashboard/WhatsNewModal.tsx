import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Navigation, Clock, ChevronDown } from "lucide-react";

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

export default function WhatsNewModal({ lang }: { lang: "en" | "zh" }) {
  const [open, setOpen] = useState(() => !localStorage.getItem(KEY));

  if (!open) return null;

  const t = i18n[lang];

  const dismiss = () => {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  };

  return (
    <Dialog open onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0 gap-0">
        {/* Header */}
        <div className="px-6 pt-8 pb-5 text-center" style={{ backgroundColor: "#234E3E" }}>
          <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "rgba(212, 168, 67, 0.2)" }}>
            <Sparkles className="w-6 h-6" style={{ color: "#D4A843" }} />
          </div>
          <h2 className="text-xl font-heading font-bold" style={{ color: "#FBF7F0" }}>{t.heading}</h2>
          <p className="text-sm mt-1" style={{ color: "rgba(251, 247, 240, 0.7)" }}>{t.sub}</p>
        </div>

        {/* Items */}
        <div className="px-6 py-6 space-y-5">
          {t.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center" style={{ backgroundColor: "rgba(201, 169, 97, 0.12)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#C9A961" }} />
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
        <div className="px-6 pb-6">
          <button
            onClick={dismiss}
            className="w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1B3A2F", color: "#FBF7F0" }}
          >
            {t.cta}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
