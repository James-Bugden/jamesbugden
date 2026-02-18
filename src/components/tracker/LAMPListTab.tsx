import { useState, useRef, useEffect, useCallback } from "react";
import { Target, X, Clock, ArrowRight, ArrowLeft, Info } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Employer, Contact, STORAGE_KEYS } from "@/lib/tracker/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import LAMPTable from "./LAMPTable";

/* ── Step config ──────────────────────────────────────── */
const STEPS = [
  {
    title: "Dream Employers",
    source: "dream" as const,
    emoji: "💭",
    explanation:
      "Start with companies you've always wanted to work for, then add their competitors and peers. Don't overthink it — if it comes to mind, add it.",
  },
  {
    title: "Alumni Employers",
    source: "alumni" as const,
    emoji: "🎓",
    explanation:
      "Search your university's alumni database or LinkedIn. Where are your former classmates working? Any company with alumni you could contact goes on the list.",
  },
  {
    title: "Job Posting Search",
    source: "posting" as const,
    emoji: "🔍",
    explanation:
      "Go to a job board (Indeed, CakeResume, 104.com.tw) and search your target role + location. Add company names here — don't read the postings yet!",
  },
  {
    title: "Trend Following",
    source: "trend" as const,
    emoji: "📈",
    explanation:
      'Google your industry + "trends". Skim articles for companies doing interesting things. These hidden gems often have less competition.',
  },
] as const;

/* ── Countdown timer ──────────────────────────────────── */
function CountdownTimer({ onDismiss }: { onDismiss: () => void }) {
  const [seconds, setSeconds] = useState(600);
  const expired = seconds <= 0;

  useEffect(() => {
    if (expired) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [expired]);

  const mm = Math.max(0, Math.floor(seconds / 60));
  const ss = Math.max(0, seconds % 60);

  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: expired ? "#B45309" : "#2C2C2C" }}>
      {expired ? (
        <span>⏰ Time's up! Move on when ready.</span>
      ) : (
        <>
          <Clock className="w-4 h-4" style={{ color: "#C9A961" }} />
          <span className="font-mono tabular-nums">
            {mm}:{ss.toString().padStart(2, "0")}
          </span>
        </>
      )}
      <button onClick={onDismiss} className="p-0.5 rounded hover:bg-[#E5E0D8] transition-colors" aria-label="Dismiss timer">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ── Wizard Modal ─────────────────────────────────────── */
interface WizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: (employers: Omit<Employer, "id" | "createdAt" | "updatedAt">[]) => void;
}

export function LAMPWizard({ open, onOpenChange, onFinish }: WizardProps) {
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState<string[][]>([[], [], [], []]);
  const [input, setInput] = useState("");
  const [showTimer, setShowTimer] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setStep(0);
      setEntries([[], [], [], []]);
      setInput("");
      setShowTimer(true);
    }
  }, [open]);

  // Focus input on step change
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [step, open]);

  const addCompany = useCallback(() => {
    const name = input.trim();
    if (!name) return;
    setEntries((prev) => {
      const next = [...prev];
      if (!next[step].includes(name)) {
        next[step] = [...next[step], name];
      }
      return next;
    });
    setInput("");
  }, [input, step]);

  const removeCompany = (idx: number) => {
    setEntries((prev) => {
      const next = [...prev];
      next[step] = next[step].filter((_, i) => i !== idx);
      return next;
    });
  };

  const finish = () => {
    const all: Omit<Employer, "id" | "createdAt" | "updatedAt">[] = [];
    entries.forEach((names, si) => {
      names.forEach((name) => {
        all.push({
          name,
          source: STEPS[si].source,
          alumni: si === 1,
          motivation: 1,
          posting: 1,
          stage: "listed",
          notes: "",
          jdUrl: "",
        });
      });
    });
    onFinish(all);
    onOpenChange(false);
  };

  const totalThisRound = entries[step].length;
  const cfg = STEPS[step];
  const pct = ((step + 1) / 4) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 bg-white max-h-[90vh] flex flex-col overflow-hidden [&>button]:hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b" style={{ borderColor: "#E5E0D8" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium" style={{ color: "#2C2C2C" }}>
              Step {step + 1} of 4 · {cfg.title}
            </p>
            <div className="flex items-center gap-3">
              {showTimer && <CountdownTimer onDismiss={() => setShowTimer(false)} />}
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 rounded hover:bg-[#E5E0D8] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full" style={{ backgroundColor: "#E5E0D8" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: "#C9A961" }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="flex items-start gap-2 mb-4">
            <span className="text-2xl">{cfg.emoji}</span>
            <div>
              <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
                {cfg.title}
              </h3>
              <p className="text-sm mt-1" style={{ color: "#2C2C2C" }}>
                {cfg.explanation}
              </p>
            </div>
          </div>

          {/* Quick-add input */}
          <div className="flex gap-2 mb-4">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCompany()}
              placeholder="Type company name…"
              className="bg-[#FBF7F0] border-[#E5E0D8]"
            />
            <button
              onClick={addCompany}
              disabled={!input.trim()}
              className="px-4 py-2 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 flex-shrink-0"
              style={{ backgroundColor: "#1B3A2F" }}
            >
              Add
            </button>
          </div>

          {/* Count */}
          <p className="text-xs mb-3" style={{ color: "#888" }}>
            {totalThisRound} / 10 employers this round
          </p>

          {/* Company list */}
          {entries[step].length > 0 ? (
            <div className="space-y-1.5">
              {entries[step].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 rounded-md border text-sm"
                  style={{ borderColor: "#E5E0D8", color: "#2C2C2C" }}
                >
                  <span>{name}</span>
                  <button
                    onClick={() => removeCompany(i)}
                    className="p-0.5 rounded hover:bg-[#E5E0D8] transition-colors"
                  >
                    <X className="w-3.5 h-3.5" style={{ color: "#888" }} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm" style={{ color: "#888" }}>
              No companies added yet. Start typing above!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t flex items-center justify-between" style={{ borderColor: "#E5E0D8" }}>
          <div>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "#2C2C2C" }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={finish}
              className="text-xs transition-colors hover:opacity-70"
              style={{ color: "#888" }}
            >
              {step < 3 ? "Skip" : ""}
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: "#C9A961" }}
              >
                Next Round <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: "#C9A961" }}
              >
                Finish ✓
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Empty State ──────────────────────────────────────── */
function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex justify-center py-4">
      <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 max-w-lg w-full text-center" style={{ borderColor: "#E5E0D8" }}>
        <div className="text-4xl mb-3">🎯</div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>
          Build Your Target List in 40 Minutes
        </h2>
        <p className="text-sm mb-5" style={{ color: "#2C2C2C" }}>
          The LAMP Method helps you create a prioritized list of 40+ employers so you approach the best opportunities first.
        </p>
        <ol className="text-left space-y-2 mb-6 text-sm" style={{ color: "#2C2C2C" }}>
          {[
            ["💭", "Dream Employers", "10 min"],
            ["🎓", "Alumni Employers", "10 min"],
            ["🔍", "Job Posting Search", "10 min"],
            ["📈", "Trend Following", "10 min"],
          ].map(([emoji, title, time], i) => (
            <li key={i} className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
                style={{ backgroundColor: "#C9A961" }}
              >
                {i + 1}
              </span>
              <span>
                {emoji} {title}
              </span>
              <span className="ml-auto text-xs" style={{ color: "#888" }}>
                {time}
              </span>
            </li>
          ))}
        </ol>
        <button
          onClick={onStart}
          className="w-full py-3 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: "#C9A961" }}
        >
          Start Building Your List →
        </button>
        <p className="text-xs mt-3 flex items-center justify-center gap-1" style={{ color: "#888" }}>
          <Info className="w-3 h-3" /> All data saved in your browser. No account needed.
        </p>
      </div>
    </div>
  );
}

/* ── Main LAMP List Tab ───────────────────────────────── */
interface LAMPListTabProps {
  employers: Employer[];
  setEmployers: (fn: (prev: Employer[]) => Employer[]) => void;
  contacts?: Contact[];
  highlightedEmployerId?: string | null;
  onAddContactForEmployer?: (employerId: string) => void;
}

export default function LAMPListTab({ employers, setEmployers, contacts: contactsProp, highlightedEmployerId, onAddContactForEmployer }: LAMPListTabProps) {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [localContacts] = useLocalStorage<Contact[]>(STORAGE_KEYS.contacts, []);
  const contacts = contactsProp ?? localContacts;

  const handleFinish = (newEntries: Omit<Employer, "id" | "createdAt" | "updatedAt">[]) => {
    if (newEntries.length === 0) return;
    const now = new Date().toISOString();
    const created: Employer[] = newEntries.map((e) => ({
      ...e, id: crypto.randomUUID(), createdAt: now, updatedAt: now,
    }));
    setEmployers((prev) => [...prev, ...created]);
    toast.success(`${created.length} employers added ✓`);
  };

  const handleUpdateEmployer = (id: string, updates: Partial<Employer>) => {
    setEmployers((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e))
    );
  };

  const handleDeleteEmployers = (ids: string[]) => {
    const idSet = new Set(ids);
    setEmployers((prev) => prev.filter((e) => !idSet.has(e.id)));
  };

  const handleAddEmployer = (data: Omit<Employer, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    setEmployers((prev) => [...prev, { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }]);
    toast.success("Employer added ✓");
  };

  if (employers.length === 0) {
    return (
      <>
        <EmptyState onStart={() => setWizardOpen(true)} />
        <LAMPWizard open={wizardOpen} onOpenChange={setWizardOpen} onFinish={handleFinish} />
      </>
    );
  }

  return (
    <>
      <LAMPTable
        employers={employers}
        contacts={contacts}
        onUpdateEmployer={handleUpdateEmployer}
        onDeleteEmployers={handleDeleteEmployers}
        onAddEmployer={handleAddEmployer}
        onOpenWizard={() => setWizardOpen(true)}
        highlightedEmployerId={highlightedEmployerId}
        onAddContactForEmployer={onAddContactForEmployer}
      />
      <LAMPWizard open={wizardOpen} onOpenChange={setWizardOpen} onFinish={handleFinish} />
    </>
  );
}
