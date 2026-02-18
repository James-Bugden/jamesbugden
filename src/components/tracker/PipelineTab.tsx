import { useState, useRef, useMemo } from "react";
import { ChevronRight, Star, GripVertical } from "lucide-react";
import { Employer, Contact } from "@/lib/tracker/types";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Stage definitions ───────────────────────────────── */
const STAGES = [
  { id: "listed" as const, label: "Listed", color: "#9CA3AF", isGold: false },
  { id: "contacted" as const, label: "Contacted", color: "#3B82F6", isGold: false },
  { id: "informational" as const, label: "Informational", color: "#C9A961", isGold: false },
  { id: "advocate" as const, label: "Advocate", color: "#22C55E", isGold: false },
  { id: "applied" as const, label: "Applied", color: "#1B3A2F", isGold: false },
  { id: "interviewing" as const, label: "Interviewing", color: "#B89650", isGold: false },
  { id: "offer" as const, label: "Offer", color: "#C9A961", isGold: true },
];

type StageId = (typeof STAGES)[number]["id"];

/* ── Source badge config ─────────────────────────────── */
const SOURCE_COLORS: Record<Employer["source"], string> = {
  dream: "#22C55E", alumni: "#3B82F6", posting: "#F59E0B", trend: "#8B5CF6", manual: "#9CA3AF",
};

/* ── Contact status helpers (reuse logic) ────────────── */
type StatusKey = "not-contacted" | "awaiting" | "booster" | "obligate" | "curmudgeon";
const STATUS_CONFIG: Record<StatusKey, { label: string; emoji: string; color: string; bg: string }> = {
  "not-contacted": { label: "Not Contacted", emoji: "⬜", color: "#6B7280", bg: "#F3F4F6" },
  awaiting: { label: "Awaiting", emoji: "🟡", color: "#B45309", bg: "#FEF3C7" },
  booster: { label: "Booster", emoji: "🟢", color: "#166534", bg: "#DCFCE7" },
  obligate: { label: "Obligate", emoji: "🟠", color: "#9A3412", bg: "#FED7AA" },
  curmudgeon: { label: "Curmudgeon", emoji: "🔴", color: "#991B1B", bg: "#FEE2E2" },
};

function classifyContact(c: Contact): StatusKey {
  if (!c.emailSentDate) return "not-contacted";
  if (c.respondedDate) {
    const d = businessDaysBetween(c.emailSentDate, c.respondedDate);
    return d <= 3 ? "booster" : "obligate";
  }
  const ds = businessDaysBetween(c.emailSentDate, new Date().toISOString());
  if (ds >= 10 && c.followUpSentDate) return "curmudgeon";
  return "awaiting";
}

function businessDaysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  let count = 0;
  const cur = new Date(s);
  cur.setDate(cur.getDate() + 1);
  while (cur <= e) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function daysInStage(updatedAt: string): number {
  return Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000);
}

/* ══════════════════════════════════════════════════════════
   Pipeline Tab
   ══════════════════════════════════════════════════════════ */
interface PipelineTabProps {
  employers: Employer[];
  contacts: Contact[];
  onUpdateEmployer: (id: string, updates: Partial<Employer>) => void;
  onSwitchToLamp: () => void;
  onViewEmployer?: (employerId: string) => void;
}

export default function PipelineTab({ employers, contacts, onUpdateEmployer, onSwitchToLamp, onViewEmployer }: PipelineTabProps) {
  const isMobile = useIsMobile();
  const [dragId, setDragId] = useState<string | null>(null);

  const stageCounts = useMemo(() => {
    const m: Record<string, number> = {};
    STAGES.forEach((s) => (m[s.id] = 0));
    employers.forEach((e) => { if (m[e.stage] !== undefined) m[e.stage]++; });
    return m;
  }, [employers]);

  const contactsByEmployer = useMemo(() => {
    const m = new Map<string, Contact[]>();
    contacts.forEach((c) => {
      const list = m.get(c.employerId) || [];
      list.push(c);
      m.set(c.employerId, list);
    });
    return m;
  }, [contacts]);

  const advanceStage = (emp: Employer) => {
    const idx = STAGES.findIndex((s) => s.id === emp.stage);
    if (idx < STAGES.length - 1) {
      onUpdateEmployer(emp.id, { stage: STAGES[idx + 1].id as Employer["stage"], updatedAt: new Date().toISOString() });
    }
  };

  /* Drag handlers (desktop only) */
  const handleDragStart = (id: string) => setDragId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (stageId: StageId) => {
    if (dragId) {
      onUpdateEmployer(dragId, { stage: stageId, updatedAt: new Date().toISOString() });
      setDragId(null);
    }
  };

  /* ── Empty State ─────────────────────────────────────── */
  if (employers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 sm:p-12 text-center" style={{ borderColor: "#E5E0D8" }}>
        <p className="text-4xl mb-4">📊</p>
        <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
          Your pipeline will appear here once you add employers to your LAMP list.
        </h2>
        <button
          onClick={onSwitchToLamp}
          className="mt-4 px-6 py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: "#C9A961" }}
        >
          Go to LAMP List →
        </button>
      </div>
    );
  }

  const total = employers.length;

  return (
    <div className="space-y-6">
      {/* ── Conversion Funnel ──────────────────────────────── */}
      <div className="bg-white rounded-lg shadow-sm border p-4" style={{ borderColor: "#E5E0D8" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#888" }}>PIPELINE FUNNEL</p>
        <div className="flex h-10 rounded-lg overflow-hidden">
          {STAGES.map((stage) => {
            const count = stageCounts[stage.id];
            const widthPct = Math.max((count / total) * 100, 2); // min 2% for thin sliver
            return (
              <div
                key={stage.id}
                className="relative flex items-center justify-center transition-all duration-300 first:rounded-l-lg last:rounded-r-lg"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: stage.isGold ? undefined : stage.color,
                  background: stage.isGold ? "linear-gradient(135deg, #C9A961, #B89650, #D4B96E)" : undefined,
                  minWidth: 24,
                }}
                title={`${stage.label}: ${count}`}
              >
                {widthPct > 6 && (
                  <span className="text-[10px] font-bold text-white truncate px-1">
                    {count}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex mt-1.5 text-[10px]" style={{ color: "#888" }}>
          {STAGES.map((stage) => (
            <div
              key={stage.id}
              className="flex-1 text-center truncate px-0.5"
              style={{ minWidth: 24 }}
            >
              <span className="hidden sm:inline">{stage.label}</span>
              <span className="sm:hidden">{stage.label.slice(0, 3)}</span>
              {" "}({stageCounts[stage.id]})
            </div>
          ))}
        </div>
      </div>

      {/* ── Kanban Board ───────────────────────────────────── */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-4">
        <div className="flex gap-3" style={{ minWidth: isMobile ? STAGES.length * 220 : undefined }}>
          {STAGES.map((stage, stageIdx) => {
            const stageEmployers = employers.filter((e) => e.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="flex-1 min-w-[200px] flex flex-col rounded-lg"
                style={{ backgroundColor: "#F7F5F0" }}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                {/* Column Header */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-t-lg" style={{
                  background: stage.isGold
                    ? "linear-gradient(135deg, #C9A961, #B89650, #D4B96E)"
                    : stage.color,
                }}>
                  <span className="text-xs font-bold text-white truncate">{stage.label}</span>
                  <span className="ml-auto text-[10px] font-bold text-white/80 bg-white/20 px-1.5 py-0.5 rounded">
                    {stageEmployers.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 p-2 space-y-2 min-h-[120px]">
                  {stageEmployers.length === 0 && (
                    <p className="text-[11px] text-center py-6" style={{ color: "#9CA3AF" }}>No employers</p>
                  )}
                  {stageEmployers.map((emp) => {
                    const empContacts = contactsByEmployer.get(emp.id) || [];
                    const topContact = empContacts[0];
                    const topStatus = topContact ? classifyContact(topContact) : null;
                    const days = daysInStage(emp.updatedAt);
                    const isLast = stageIdx === STAGES.length - 1;

                    return (
                      <div
                        key={emp.id}
                        draggable={!isMobile}
                        onDragStart={() => handleDragStart(emp.id)}
                        className="bg-white rounded-md p-2.5 shadow-sm border cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md"
                        style={{
                          borderColor: dragId === emp.id ? "#C9A961" : "#E5E0D8",
                          opacity: dragId === emp.id ? 0.6 : 1,
                        }}
                      >
                        {/* Company + Source */}
                        <div className="flex items-start justify-between gap-1 mb-1.5">
                          <p
                            className="text-sm font-bold truncate cursor-pointer hover:underline"
                            style={{ color: "#1B3A2F" }}
                            onClick={() => onViewEmployer?.(emp.id)}
                            title="View in LAMP List"
                          >{emp.name}</p>
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                            style={{ backgroundColor: SOURCE_COLORS[emp.source] }}
                          >
                            {emp.source.charAt(0).toUpperCase() + emp.source.slice(1)}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-px mb-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-3 h-3"
                              fill={s <= emp.motivation ? "#C9A961" : "none"}
                              stroke={s <= emp.motivation ? "#C9A961" : "#D1D5DB"}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>

                        {/* Top contact */}
                        {topContact && topStatus && (
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] truncate" style={{ color: "#2C2C2C" }}>{topContact.name}</span>
                            <span
                              className="text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: STATUS_CONFIG[topStatus].bg, color: STATUS_CONFIG[topStatus].color }}
                            >
                              {STATUS_CONFIG[topStatus].emoji} {STATUS_CONFIG[topStatus].label}
                            </span>
                          </div>
                        )}

                        {/* Days in stage + advance */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                            {days === 0 ? "Today" : `${days}d in stage`}
                          </span>
                          {!isLast && (
                            <button
                              onClick={() => advanceStage(emp)}
                              className="p-1 rounded hover:bg-[#E5E0D8] transition-colors"
                              title={`Move to ${STAGES[stageIdx + 1].label}`}
                            >
                              <ChevronRight className="w-3.5 h-3.5" style={{ color: "#C9A961" }} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Coaching CTA ───────────────────────────────────── */}
      <div className="bg-white rounded-lg shadow-sm border p-5" style={{ borderColor: "#E5E0D8" }}>
        <p className="font-semibold text-sm mb-1" style={{ color: "#1B3A2F" }}>
          🎯 Stuck between stages?
        </p>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#2C2C2C" }}>
          Most job seekers lose momentum after the first informational interview.
          A coaching session keeps you accountable and moving forward.
        </p>
        <a
          href="https://james.careers/#coaching"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold hover:underline"
          style={{ color: "#C9A961" }}
        >
          Book a Coaching Session →
        </a>
      </div>
    </div>
  );
}
