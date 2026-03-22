import { Clock, Linkedin, ChevronDown, Menu, FileText, Shield, Target, Zap, Brain, Compass, Swords, Crown, Eye, ArrowRight, BookOpen, Check, X, Save, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useGuideStorage } from "@/hooks/useGuideStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";

const SectionNumber = ({ num }: { num: string }) => (
  <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">
    {num}
  </span>
);

const tagColors = {
  USE: { border: "border-l-emerald-500", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  DEFEND: { border: "border-l-amber-500", bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  AVOID: { border: "border-l-red-500", bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const Collapsible = ({ title, children, tag }: { title: string; children: React.ReactNode; tag?: "USE" | "DEFEND" | "AVOID" }) => {
  const [open, setOpen] = useState(false);
  const colors = tag ? tagColors[tag] : null;
  return (
    <div className={`border border-border rounded-xl overflow-hidden ${colors ? `border-l-4 ${colors.border}` : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 bg-card hover:bg-muted/50 transition-colors text-left gap-3">
        <span className="text-foreground font-medium text-sm md:text-base flex-1">{title}</span>
        {tag && colors && (
          <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg}`}>{tag}</span>
        )}
        <ChevronDown className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 md:px-5 pb-4 md:pb-5 bg-card border-t border-border">{children}</div>}
    </div>
  );
};

const ActionStep = ({ children, checked, onToggle }: { children: React.ReactNode; checked?: boolean; onToggle?: () => void }) => (
  <div
    className={`bg-gold/5 border border-gold/20 rounded-xl p-5 md:p-6 transition-opacity ${checked ? "opacity-60" : ""} ${onToggle ? "cursor-pointer" : ""}`}
    onClick={onToggle}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-gold uppercase tracking-wider">Action Step</p>
      {onToggle && (
        <span className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-gold border-gold text-background" : "border-muted-foreground/40 hover:border-gold/60"}`}>
          {checked && <Check className="w-3 h-3" />}
        </span>
      )}
    </div>
    <div className={`text-foreground text-sm leading-relaxed ${checked ? "line-through text-muted-foreground" : ""}`}>{children}</div>
  </div>
);

function ActionSaveBanner({ onDismiss }: { onDismiss: () => void }) {
  const location = useLocation();
  const returnUrl = encodeURIComponent(location.pathname);
  return (
    <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mt-6">
      <p className="text-muted-foreground text-xs flex-1">
        Progress saved on this device. Create a free account to sync across devices.
      </p>
      <a href={`/join?returnUrl=${returnUrl}`} className="shrink-0 text-xs font-semibold text-gold hover:text-gold/80 underline underline-offset-2">
        Create Account
      </a>
      <button onClick={onDismiss} className="shrink-0 text-muted-foreground hover:text-foreground">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

const Reversal = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted/50 border border-border rounded-xl p-5 md:p-6">
    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Reversal</p>
    <div className="text-foreground text-sm leading-relaxed">{children}</div>
  </div>
);

const DiagramBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
    <h4 className="font-heading text-base md:text-lg text-gold mb-4">{title}</h4>
    <div className="text-sm text-foreground leading-relaxed">{children}</div>
  </div>
);
/* ── Interactive: Boss Management Matrix ── */
const matrixQuadrants = {
  "low-low": { label: "Normal Mode", strategy: "Rare. Normal mode. Do great work. You have space to build without interference.", color: "border-muted-foreground/30" },
  "low-high": { label: "Best Case", strategy: "Best case. You shine. Boss is secure. Everyone wins. Keep doing exactly what you're doing.", color: "border-emerald-500" },
  "high-low": { label: "Surrender", strategy: "Law 22. Surrender. Stay low. Build quietly. Your boss has a big ego and you're not visible yet — don't threaten them. Bide your time.", color: "border-amber-500" },
  "high-high": { label: "DANGER", strategy: "DANGER. Law 1. Make them look good or you will pay. Your boss has a high ego and you're highly visible — the most dangerous quadrant. Credit your boss publicly. Never outshine.", color: "border-red-500" },
} as const;

const BossManagementMatrix = () => {
  const [bossMatrix, setBossMatrix] = useGuideStorage<{ego: string, visibility: string}>("48laws_boss_matrix_en", { ego: "", visibility: "" });
  const quadrantKey = bossMatrix.ego && bossMatrix.visibility ? `${bossMatrix.ego}-${bossMatrix.visibility}` as keyof typeof matrixQuadrants : null;
  const result = quadrantKey ? matrixQuadrants[quadrantKey] : null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <h4 className="font-heading text-base md:text-lg text-gold mb-4">The Boss Management Matrix</h4>
      <div className="text-sm text-foreground leading-relaxed">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="font-medium mb-2">Boss's Ego</p>
            <div className="flex gap-2">
              {(["low", "high"] as const).map(v => (
                <button key={v} onClick={() => setBossMatrix(prev => ({ ...prev, ego: v }))}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all capitalize ${bossMatrix.ego === v ? "bg-gold/20 border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Your Visibility</p>
            <div className="flex gap-2">
              {(["low", "high"] as const).map(v => (
                <button key={v} onClick={() => setBossMatrix(prev => ({ ...prev, visibility: v }))}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all capitalize ${bossMatrix.visibility === v ? "bg-gold/20 border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-[auto_1fr_1fr] text-xs sm:text-sm border border-border rounded-lg overflow-hidden">
          <div className="p-2 bg-muted/50 border-b border-r border-border" />
          <div className="p-2 bg-muted/50 border-b border-r border-border font-medium text-center">Ego: LOW</div>
          <div className="p-2 bg-muted/50 border-b border-border font-medium text-center">Ego: HIGH</div>
          <div className="p-2 border-b border-r border-border font-medium bg-muted/50 flex items-center">Vis: LOW</div>
          <div className={`p-3 border-b border-r border-border transition-all ${quadrantKey === "low-low" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}>Normal mode. Do great work.</div>
          <div className={`p-3 border-b border-border transition-all ${quadrantKey === "high-low" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}>Law 22. Surrender. Build quietly.</div>
          <div className="p-2 border-r border-border font-medium bg-muted/50 flex items-center">Vis: HIGH</div>
          <div className={`p-3 border-r border-border transition-all ${quadrantKey === "low-high" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}>Best case. Everyone wins.</div>
          <div className={`p-3 transition-all ${quadrantKey === "high-high" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}><span className="text-gold font-medium">DANGER.</span> Law 1. Make them look good.</div>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-lg border-l-4 ${result.color} bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <p className="font-semibold text-foreground mb-1">Your Quadrant: {result.label}</p>
            <p className="text-muted-foreground">{result.strategy}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Interactive: Reputation Flywheel ── */
const flywheelNodes = ["Results", "Visibility", "Trust", "Opportunity", "More Results"];

const ReputationFlywheel = () => {
  const [active, setActive] = useState(1); // Visibility highlighted by default
  useEffect(() => {
    const timer = setInterval(() => setActive(prev => (prev + 1) % 5), 2500);
    return () => clearInterval(timer);
  }, []);

  // Pentagon positions (top-center start, clockwise)
  const positions = [
    { x: 50, y: 5 },   // Results (top)
    { x: 93, y: 38 },  // Visibility (right)
    { x: 77, y: 90 },  // Trust (bottom-right)
    { x: 23, y: 90 },  // Opportunity (bottom-left)
    { x: 7, y: 38 },   // More Results (left)
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <h4 className="font-heading text-base md:text-lg text-gold mb-4">The Reputation Flywheel</h4>
      <div className="relative w-full max-w-xs mx-auto aspect-square">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none">
          {positions.map((from, i) => {
            const to = positions[(i + 1) % 5];
            return (
              <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="currentColor" className="text-border" strokeWidth="0.5" strokeDasharray="2 1" />
            );
          })}
          {/* Arrow markers */}
          {positions.map((from, i) => {
            const to = positions[(i + 1) % 5];
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            return (
              <circle key={`dot-${i}`} cx={mx} cy={my} r="1.2"
                className={i === active ? "fill-gold" : "fill-muted-foreground/40"}
              />
            );
          })}
        </svg>
        {positions.map((pos, i) => (
          <div key={i}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium text-center transition-all duration-500 border whitespace-nowrap
              ${i === 1 ? "bg-gold/20 border-gold text-gold shadow-[0_0_12px_hsl(var(--gold)/0.3)] scale-110" :
                i === active ? "bg-gold/10 border-gold/60 text-gold scale-105" :
                "bg-card border-border text-muted-foreground"}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {flywheelNodes[i]}
          </div>
        ))}
      </div>
      <div className="text-center mt-4 space-y-1">
        <p className="text-muted-foreground text-sm">Break any link and the flywheel stops.</p>
        <p className="text-gold font-medium text-sm">Most people break the VISIBILITY link. They do great work nobody sees.</p>
      </div>
    </div>
  );
};

/* ── Interactive: Brag Doc Template ── */
type BragEntry = { week: string; shipped: string; result: string; who: string; learned: string };
const emptyEntry = (): BragEntry => ({ week: "", shipped: "", result: "", who: "", learned: "" });

const BragDocTemplate = () => {
  const [entries, setEntries] = useGuideStorage<BragEntry[]>("48laws_bragdoc_en", []);
  const filledCount = entries.filter(e => e.shipped || e.result).length;

  const addEntry = () => setEntries(prev => [emptyEntry(), ...prev]);
  const removeEntry = (idx: number) => setEntries(prev => prev.filter((_, i) => i !== idx));
  const updateEntry = (idx: number, field: keyof BragEntry, value: string) =>
    setEntries(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-heading text-base md:text-lg text-gold">The Brag Doc</h4>
        {filledCount > 0 && (
          <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full font-medium">{filledCount} {filledCount === 1 ? "entry" : "entries"} logged</span>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4">Update this every Friday. 5 minutes.</p>

      <button onClick={addEntry}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-gold/40 text-gold text-sm font-medium hover:bg-gold/5 transition-colors mb-4">
        <Plus className="w-4 h-4" /> Add Week
      </button>

      {entries.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-6">No entries yet. Click "Add Week" to start tracking your wins.</p>
      )}

      <div className="space-y-4">
        {entries.map((entry, idx) => (
          <div key={idx} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Week of (e.g. Jan 6)"
                value={entry.week} onChange={e => updateEntry(idx, "week", e.target.value)}
                className="bg-transparent border-none text-foreground text-sm font-medium placeholder:text-muted-foreground/50 focus:outline-none flex-1"
              />
              <button onClick={() => removeEntry(idx)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {([
              ["shipped", "What I shipped or completed"],
              ["result", "Measurable result (numbers, time saved, revenue)"],
              ["who", "Who saw it / who benefited"],
              ["learned", "What I learned"],
            ] as [keyof BragEntry, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="text-xs text-muted-foreground font-medium block mb-1">{label}</label>
                <textarea
                  value={entry[field]} onChange={e => updateEntry(idx, field, e.target.value)}
                  rows={1}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-gold/50 resize-none"
                  placeholder="..."
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">Use this at review time. Don't rely on memory. Your manager won't remember. Your brag doc will.</p>
    </div>
  );
};


const tocSections = [
  { id: "intro", label: "Introduction" },
  { id: "find-direction", label: "01 · Find Your Direction" },
  { id: "manage-up", label: "02 · Manage Up" },
  { id: "reputation", label: "03 · Build Your Reputation" },
  { id: "irreplaceable", label: "04 · Become Irreplaceable" },
  { id: "get-what-you-want", label: "05 · Get What You Want" },
  { id: "office-politics", label: "06 · Survive Office Politics" },
  { id: "long-game", label: "07 · Play the Long Game" },
  { id: "quick-reference", label: "All 48 Laws Reference" },
  { id: "power-audit", label: "Power Audit Tracker" },
  { id: "resources", label: "Resources" },
];

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress(Math.min(100, (window.scrollY / scrollable) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-[56px] left-0 right-0 z-40 h-[3px] bg-muted/30">
      <div className="h-full bg-gold transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
};

const TableOfContents = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const activeLabel = tocSections.find(s => s.id === active)?.label || "Contents";
  const activeIdx = tocSections.findIndex(s => s.id === active);

  return (
    <>
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}
            >{label}</a>
          ))}
        </nav>
      </aside>
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full bg-executive-green text-cream shadow-lg px-4 py-2.5 hover:scale-105 transition-transform" aria-label="Table of contents">
          <Menu className="w-4 h-4 shrink-0" />
          <span className="text-xs font-medium truncate max-w-[140px]">
            {activeIdx >= 0 ? `${String(activeIdx).padStart(2, '0')} · ` : ""}{activeLabel}
          </span>
          <ChevronUp className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contents</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }, idx) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setOpen(false); }}
                  className={`flex items-center gap-2 text-sm py-1.5 pl-3 border-l-2 transition-all ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  <span className={`shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${active === id ? "bg-gold text-background" : "bg-muted text-muted-foreground"}`}>{idx}</span>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

/* ── 48 Laws Reference Data ── */
const allLaws: { num: number; title: string; tag: "USE" | "DEFEND" | "AVOID"; workplace: string; example: string; action: string }[] = [
  { num: 1, title: "Never Outshine the Master", tag: "USE", workplace: "Make your boss look good in public. Build your record privately.", example: "You built the analysis. Your boss presents it. You both win.", action: "Before your next team win, prepare a summary your boss can forward to their boss with their name on it." },
  { num: 2, title: "Never Put Too Much Trust in Friends", tag: "DEFEND", workplace: "Don't share career frustrations with colleagues who report to your boss.", example: "You vent to a \"work friend.\" It reaches your manager.", action: "Keep a personal journal for venting. Share career frustrations with people outside your company only." },
  { num: 3, title: "Conceal Your Intentions", tag: "DEFEND", workplace: "Don't announce your job search, salary goals, or promotion timeline.", example: "You mention interviewing elsewhere. Your manager hears.", action: "Tell zero coworkers about your next career move until you have a signed offer or a firm plan." },
  { num: 4, title: "Always Say Less Than Necessary", tag: "USE", workplace: "Speak with precision. Less talking = more perceived authority.", example: "You give a 2-minute update. The VP remembers your clarity.", action: "Use the 3-sentence update format at your next meeting. What happened. What's next. What you need." },
  { num: 5, title: "Guard Your Reputation With Your Life", tag: "USE", workplace: "One bad moment travels faster than 100 good ones.", example: "You badmouth a former employer. A recruiter flags it.", action: "Google yourself today. Fix anything that doesn't match the professional you want to be." },
  { num: 6, title: "Court Attention at All Costs", tag: "USE", workplace: "Visibility drives career growth. Great work nobody sees = wasted.", example: "You present quarterly results. Leadership notices you.", action: "Volunteer to present your own work at the next team meeting. Don't let someone else present it for you." },
  { num: 7, title: "Get Others to Do the Work, Take the Credit", tag: "DEFEND", workplace: "Watch for peers who present your work as their own.", example: "A colleague presents your proposal without crediting you.", action: "Keep a brag doc. Update it weekly. Your records prove who did the work when it matters." },
  { num: 8, title: "Make Other People Come to You", tag: "DEFEND", workplace: "The person who sets the meeting controls the agenda.", example: "You deliver a result so strong a VP requests a follow-up.", action: "Stop chasing. Deliver results worth requesting." },
  { num: 9, title: "Win Through Actions, Never Argument", tag: "USE", workplace: "Don't argue for the promotion. Build the case with evidence.", example: "You present a one-pager showing 12 months of impact.", action: "Set a Friday 5-minute brag doc reminder. 12 weeks of entries beats 12 months of trying to remember." },
  { num: 10, title: "Avoid the Unhappy and Unlucky", tag: "USE", workplace: "Proximity to chronic negativity is a career risk.", example: "You stop eating lunch with the complainer. Things shift.", action: "Audit your top 5 work relationships this week. If more than 2 are chronic complainers, start creating distance." },
  { num: 11, title: "Learn to Keep People Dependent on You", tag: "USE", workplace: "Own a process or knowledge domain nobody else understands.", example: "You're the only one who knows the reporting system.", action: "Pick one process and go deeper than anyone on your team. Be the person who gets the call when it breaks." },
  { num: 12, title: "Use Selective Honesty to Disarm", tag: "DEFEND", workplace: "Watch for people who build trust with small gestures, then ask big.", example: "A colleague shares info freely, then asks for your support.", action: "When someone is unusually generous early, ask yourself what they'll want in return. Track the pattern." },
  { num: 13, title: "Appeal to Self-Interest, Not Mercy", tag: "USE", workplace: "Frame every request around what the other person gains.", example: "\"Promoting me frees you for strategic work\" beats \"I've been here three years.\"", action: "Rewrite your next ask using \"Here's how this helps you\" instead of \"Here's why I deserve this.\"" },
  { num: 14, title: "Pose as a Friend, Work as a Spy", tag: "DEFEND", workplace: "Others gather intel in casual conversations. Be aware.", example: "A colleague asks about your team's budget at happy hour.", action: "Before sharing anything at a social event, pause. Would you say this in a team meeting? If not, don't say it here." },
  { num: 15, title: "Crush Your Enemy Totally", tag: "AVOID", workplace: "Industries are small. Enemies today become bosses tomorrow.", example: "You expose a rival. They remember two years later.", action: "Win without destroying. Leave every door open for a future relationship." },
  { num: 16, title: "Use Absence to Increase Respect", tag: "USE", workplace: "Don't be available 24/7. Scarcity increases perceived value.", example: "You stop attending optional meetings. People value your time more.", action: "Decline one optional meeting this week. Use the time for deep work. Notice if anyone treats you differently." },
  { num: 17, title: "Cultivate an Air of Unpredictability", tag: "AVOID", workplace: "Unpredictability at work creates anxiety, not respect.", example: "A manager who changes priorities weekly loses their team.", action: "Be consistent. Consistency builds trust. Save unpredictability for negotiations, not daily operations." },
  { num: 18, title: "Do Not Build Fortresses", tag: "USE", workplace: "Isolation is dangerous. Stay connected across teams.", example: "You skip all optional interactions. Nobody knows you at promotion time.", action: "Schedule one coffee or lunch with someone from a different team this month. Repeat monthly." },
  { num: 19, title: "Know Who You're Dealing With", tag: "USE", workplace: "Study people before making moves involving them.", example: "You push back on a vindictive VP. Now you're on their list.", action: "Before any sensitive move, answer: Who gains? Who loses? What's the worst-case interpretation?" },
  { num: 20, title: "Do Not Commit to Anyone", tag: "DEFEND", workplace: "Be careful picking sides in internal conflicts.", example: "You back one VP in a turf war. The other VP wins.", action: "Stay neutral in political conflicts unless forced to choose. Build relationships on both sides." },
  { num: 21, title: "Play a Sucker to Catch a Sucker", tag: "DEFEND", workplace: "Watch for people who act humble to extract information.", example: "A new hire asks \"innocent\" questions, then proposes replacing your process.", action: "When someone new asks detailed questions about your work, share the basics. Keep the strategic details close." },
  { num: 22, title: "Use the Surrender Tactic", tag: "USE", workplace: "Pick your battles. Yielding now preserves energy for bigger wins.", example: "Your boss overrules you. You accept. Next time, they trust your judgment.", action: "Before pushing back on your boss, ask: \"Will this matter in 6 months?\" If no, yield." },
  { num: 23, title: "Concentrate Your Forces", tag: "USE", workplace: "Go deep on 2-3 priorities. Depth beats breadth.", example: "You decline side committees to focus on one high-impact project. The results speak.", action: "Count your active projects. If more than 5, cut back to the 2-3 with highest impact and visibility." },
  { num: 24, title: "Play the Perfect Courtier", tag: "USE", workplace: "Read the room. Adapt your approach to the audience.", example: "Data-first for engineers. Outcome-first for executives.", action: "Before your next presentation, ask: \"Who is in the room and what do they care about most?\" Tailor your first slide to it." },
  { num: 25, title: "Re-Create Yourself", tag: "USE", workplace: "Don't let your first role define your entire career.", example: "You started in support. You learned analytics. You pitched a new role.", action: "Update your LinkedIn headline and summary to reflect where you're going, not where you've been." },
  { num: 26, title: "Keep Your Hands Clean", tag: "DEFEND", workplace: "Watch for leaders who use others as scapegoats.", example: "Your manager asks you to deliver bad news. You become the face of failure.", action: "When asked to deliver bad news on someone else's behalf, suggest delivering it together. Don't take the hit alone." },
  { num: 27, title: "Play on People's Need to Believe", tag: "DEFEND", workplace: "Watch for leaders who sell vision without substance.", example: "A new executive promises \"transformation.\" No plan follows.", action: "When you hear big promises, ask for the timeline and the metrics. Vision without a plan is theater." },
  { num: 28, title: "Enter Action with Boldness", tag: "USE", workplace: "When you make a move, commit fully. Half-measures invite resistance.", example: "You propose a new process with conviction and a pilot plan.", action: "For your next proposal, present one recommendation. Not three options. Confidence signals competence." },
  { num: 29, title: "Plan All the Way to the End", tag: "USE", workplace: "Every role should open doors for the next one.", example: "You accept a lateral move. It looks sideways. But it fills the gap your resume needs.", action: "Write your 5-year job title. List the 3 gaps between here and there. Fill one gap this year." },
  { num: 30, title: "Make Accomplishments Seem Effortless", tag: "USE", workplace: "Calm competence signals leadership. Visible stress signals capacity.", example: "You deliver on time without announcing the late nights.", action: "Strip \"effort language\" from your next project update. Present the result. Describe the impact. Stop there." },
  { num: 31, title: "Control the Options", tag: "DEFEND", workplace: "Watch for situations where all \"choices\" benefit someone else.", example: "Your manager offers two projects. Both serve their needs.", action: "When given limited options, ask: \"Are there other projects I should know about?\" Create your own third option." },
  { num: 32, title: "Play to People's Fantasies", tag: "DEFEND", workplace: "Promises of future rewards often substitute for fair pay now.", example: "A startup promises equity. Two years later, it's worthless.", action: "When offered equity or future bonuses, ask for the vesting schedule, valuation, and comparable cash value in writing." },
  { num: 33, title: "Discover Each Person's Weakness", tag: "DEFEND", workplace: "Everyone has a pressure point. Protect yours.", example: "You overshare anxiety. A colleague uses it against you.", action: "Keep your career insecurities out of workplace conversations. Share them with friends and mentors outside work." },
  { num: 34, title: "Be Royal in Your Own Fashion", tag: "USE", workplace: "Carry yourself like someone at the next level.", example: "You dress, speak, and prepare as if you already hold the title you want.", action: "Observe how people one level above you communicate in meetings. Match their preparation and delivery this month." },
  { num: 35, title: "Master the Art of Timing", tag: "USE", workplace: "When you ask matters as much as what you ask.", example: "You ask for a raise the week after a big team win. Yes.", action: "Identify the next organizational \"high point.\" Time your ask to land within one week of it." },
  { num: 36, title: "Disdain Things You Cannot Have", tag: "USE", workplace: "Let go of grudges and rejections quickly.", example: "You didn't get the role. You move on with grace. They remember and recommend you next time.", action: "After a rejection, send a thank-you note within 24 hours. Ask what would make you a stronger candidate next time." },
  { num: 37, title: "Create Compelling Spectacles", tag: "DEFEND", workplace: "Watch for leaders who use spectacle to distract from substance.", example: "A flashy all-hands with free food distracts from no raises.", action: "After any big company event, ask: \"What changed for me and my team?\" If the answer is nothing, note the pattern." },
  { num: 38, title: "Think as You Like, Behave Like Others", tag: "USE", workplace: "Fit the culture externally. Keep private opinions private.", example: "You disagree with a policy. You find workarounds instead of crusading.", action: "Pick one workplace norm you disagree with. Instead of fighting it publicly, find a way to work within it this week." },
  { num: 39, title: "Stir Up Waters to Catch Fish", tag: "DEFEND", workplace: "Watch for people who provoke emotional reactions for advantage.", example: "A colleague baits you in a meeting. You stay calm. They lose.", action: "When provoked at work, wait 24 hours before responding. Calm responses disarm provocateurs." },
  { num: 40, title: "Despise the Free Lunch", tag: "DEFEND", workplace: "Free perks often come with hidden obligations.", example: "A mentor invests in you. Later they expect political support.", action: "When someone offers something for free, ask yourself: \"What will they expect in return?\" Understand the exchange." },
  { num: 41, title: "Avoid Stepping Into a Great Predecessor's Shoes", tag: "DEFEND", workplace: "Following a beloved leader means unfavorable comparisons.", example: "You replace a legendary lead. Everything you do is measured against their legacy.", action: "When replacing someone well-liked, acknowledge their work publicly. Then establish your own identity through new wins." },
  { num: 42, title: "Strike the Shepherd", tag: "DEFEND", workplace: "Trouble often traces back to one person. Find the source.", example: "Team morale drops. One negative member poisons everything.", action: "When a team problem persists, ask: \"Who started this pattern?\" Address the source, not the symptoms." },
  { num: 43, title: "Work on Hearts and Minds", tag: "USE", workplace: "Win people over emotionally. The best leaders inspire commitment.", example: "You show how the new process solves their frustration. They adopt it willingly.", action: "For your next change proposal, lead with the problem the audience cares about. Not the solution you're proud of." },
  { num: 44, title: "Disarm with the Mirror Effect", tag: "DEFEND", workplace: "Watch for people who mirror your ideas to claim shared credit.", example: "A colleague repeats your talking points in meetings.", action: "When you share an original idea, follow up in writing (email or Slack) with your name and date attached." },
  { num: 45, title: "Preach Change, But Don't Reform Too Much", tag: "USE", workplace: "New in a role? Change things gradually. Rapid overhaul = resistance.", example: "New managers who change everything in month one lose trust.", action: "In a new role, spend 30 days listening before changing anything. Small wins first. Big changes after trust is built." },
  { num: 46, title: "Never Appear Too Perfect", tag: "USE", workplace: "Show strategic vulnerability. Envy is the silent career killer.", example: "After a big win, you credit your team and mention what you'd improve next time.", action: "After your next visible success, publicly credit one person who helped and name one thing you'd do differently." },
  { num: 47, title: "In Victory, Learn When to Stop", tag: "USE", workplace: "After a win, consolidate. Overreach turns allies into opponents.", example: "You get promoted. You spend 6 months proving you belong before pushing for the next move.", action: "After a win, schedule 3 coffees with new peers at your new level. Build the foundation before expanding." },
  { num: 48, title: "Assume Formlessness", tag: "USE", workplace: "Stay adaptable. The market will shift under you.", example: "Your specialty gets automated. You learn to manage the automation and become more valuable.", action: "Identify one skill outside your current role worth learning. Spend 30 minutes a week on it for 6 months." },
];

const TOTAL_ACTIONS = 19;
const AUDIT_AREAS = [
  { area: "1. DIRECTION", question: "Do I know what I'm building toward? Am I in alive time?" },
  { area: "2. MANAGING UP", question: "Does my boss see me as an ally? Do I pick battles well?" },
  { area: "3. REPUTATION", question: "Do senior leaders (beyond my boss) know my name and work?" },
  { area: "4. IRREPLACEABILITY", question: "Would my team struggle if I left? Do I own something nobody else understands?" },
  { area: "5. GETTING WHAT I WANT", question: "Am I tracking my wins? Is my brag doc up to date? Have I asked for what I've earned?" },
  { area: "6. POLITICAL AWARENESS", question: "Do I know who has influence? Am I allied with builders? Do I avoid negativity?" },
  { area: "7. LONG GAME", question: "Does my current role serve my 5-year plan? Am I building skills for where I want to be?" },
];

const ALIVE_AUDIT_QUESTIONS = [
  "How much are you learning right now?",
  "Are you building skills for your next role?",
  "Do you know what you learned this month?",
  "Do you study how your company runs?",
  "Do you watch how decisions get made?",
];

const IRREPLACEABLE_QUESTIONS = [
  { q: "If you quit tomorrow, how long to replace you?", labels: "Under 2 weeks (0) · 1-3 months (1) · 3+ months (2)" },
  { q: "Do you own a process/client/domain nobody else understands?", labels: "No (0) · Partially (1) · Yes (2)" },
  { q: "Has a senior leader requested you for a project in 6 months?", labels: "No (0) · Once (1) · Multiple times (2)" },
  { q: "Do people from other teams come to you for advice?", labels: "No (0) · Sometimes (1) · Regularly (2)" },
  { q: "If layoffs hit, would your manager fight to keep you?", labels: "Unsure (0) · Likely (1) · Yes (2)" },
];

const FortyEightLawsGuide = () => {
  useTrackGuideProgress("48-laws");
  const { isLoggedIn } = useAuth();
  const [lawFilter, setLawFilter] = useState<"ALL" | "USE" | "DEFEND" | "AVOID">("ALL");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Interactive state with cloud sync
  const [actionChecks, setActionChecks] = useGuideStorage<boolean[]>("48laws_actions_en", Array(TOTAL_ACTIONS).fill(false));
  const [auditScores, setAuditScores] = useGuideStorage<number[]>("48laws_power_audit_en", Array(7).fill(0));
  const [auditHistory, setAuditHistory] = useGuideStorage<Array<{ date: string; scores: number[]; total: number }>>("48laws_audit_history_en", []);
  const [aliveScores, setAliveScores] = useGuideStorage<number[]>("48laws_alive_audit_en", Array(5).fill(0));
  const [irrepScores, setIrrepScores] = useGuideStorage<number[]>("48laws_irreplaceable_audit_en", Array(5).fill(0));

  const safeActions = Array.from({ length: TOTAL_ACTIONS }, (_, i) => actionChecks[i] ?? false);
  const completedActions = safeActions.filter(Boolean).length;
  const toggleAction = (i: number) => setActionChecks(prev => {
    const next = [...(prev.length >= TOTAL_ACTIONS ? prev : Array(TOTAL_ACTIONS).fill(false))];
    next[i] = !next[i];
    return next;
  });

  const safeScores = Array.from({ length: 7 }, (_, i) => auditScores[i] ?? 0);
  const auditTotal = safeScores.reduce((a, b) => a + b, 0);
  const setScore = (i: number, val: number) => setAuditScores(prev => {
    const next = [...(prev.length >= 7 ? prev : Array(7).fill(0))];
    next[i] = Math.max(0, Math.min(5, val));
    return next;
  });
  const saveSnapshot = () => {
    setAuditHistory(prev => [...prev, { date: new Date().toISOString().slice(0, 10), scores: [...safeScores], total: auditTotal }]);
  };

  const safeAlive = Array.from({ length: 5 }, (_, i) => aliveScores[i] ?? 0);
  const aliveTotal = safeAlive.reduce((a, b) => a + b, 0);
  const setAliveScore = (i: number, val: number) => setAliveScores(prev => {
    const next = [...(prev.length >= 5 ? prev : Array(5).fill(0))];
    next[i] = next[i] === val ? 0 : Math.max(0, Math.min(5, val));
    return next;
  });

  const safeIrrep = Array.from({ length: 5 }, (_, i) => irrepScores[i] ?? 0);
  const irrepTotal = safeIrrep.reduce((a, b) => a + b, 0);
  const setIrrepScore = (i: number, val: number) => setIrrepScores(prev => {
    const next = [...(prev.length >= 5 ? prev : Array(5).fill(0))];
    next[i] = next[i] === val ? 0 : Math.max(0, Math.min(2, val));
    return next;
  });

  const totalInteractions = completedActions + safeScores.filter(s => s > 0).length + safeAlive.filter(s => s > 0).length + safeIrrep.filter(s => s > 0).length;
  const showSaveBanner = totalInteractions >= 2 && !isLoggedIn && !bannerDismissed;

  const filteredLaws = lawFilter === "ALL" ? allLaws : allLaws.filter(l => l.tag === lawFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageSEO
        title="48 Laws of Power (Workplace Edition) | James Bugden"
        description="A recruiter's guide to workplace power, office politics, and career strategy based on The 48 Laws of Power by Robert Greene. Learn to manage up, build your reputation, and play the long game."
        path="/48-laws-guide"
      />

      <ReadingProgressBar />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-cream/10 rounded-full px-4 py-1.5 mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-cream/80">Workplace Edition</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            48 Laws of Power<br className="hidden sm:block" /> (Workplace Edition)
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">A Guide to Workplace Power, Office Politics, and Career Strategy</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">By James Bugden, Career Coach · Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">45 min read</span>
            </div>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <FileText className="w-4 h-4" />
              <span className="text-sm">11 sections</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">Based on "The 48 Laws of Power" by Robert Greene</p>
        </div>
      </section>

      <GuideSignInBanner lang="en" />
      <TableOfContents />

      {/* ── How to Use This Guide ── */}
      <section className="py-10 md:py-14 px-5 md:px-6 bg-muted/30 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">How to Use This Guide</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr><th className="text-left p-3 border-b border-border text-foreground" colSpan={2}>Where are you right now?</th></tr>
              </thead>
              <tbody>
                {[
                  { situation: "\"I feel lost. I don't know what career to pursue.\"", start: "Find Your Direction First", extra: <> + the <Link to="/ikigai-guide" className="text-gold hover:underline">Ikigai Career Guide</Link></> },
                  { situation: "\"My boss takes credit for my work.\"", start: "Manage Up", extra: null },
                  { situation: "\"I got passed over for a promotion.\"", start: "Build Your Reputation", extra: <> + Get What You Want</> },
                  { situation: "\"Office politics are destroying me.\"", start: "Survive Office Politics", extra: null },
                  { situation: "\"I don't know who to trust at work.\"", start: "Survive Office Politics", extra: null },
                  { situation: "\"I want to ask for a raise but don't know when.\"", start: "Get What You Want", extra: null },
                  { situation: "\"I feel stuck and invisible.\"", start: "Build Your Reputation", extra: null },
                  { situation: "\"I need a full career reset.\"", start: "Find Your Direction First", extra: <> + the <Link to="/ikigai-guide" className="text-gold hover:underline">Ikigai Career Guide</Link></> },
                  { situation: "\"Give me the cheat sheet.\"", start: "All 48 Laws: Quick Reference", extra: null },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground">{row.situation}</td>
                    <td className="p-3 text-foreground font-medium">→ Start with: {row.start}{row.extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Introduction ── */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Robert Greene held between 50 and 80 jobs before he published his first book at age 39. Construction worker in Greece. Hotel receptionist in Paris. English teacher in Barcelona. Hollywood screenwriter. Magazine editor.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            During those years, he watched the same patterns repeat in every workplace. People wanted power. They disguised the wanting. They played games. They manipulated and schemed while presenting polished, professional exteriors.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            He wrote all of it down. The result was The 48 Laws of Power, published in 1998. It sold millions of copies and became required reading for everyone from Fortune 500 executives to hip-hop artists.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The book draws from 3,000 years of history. Kings, generals, con artists, diplomats. The stories about Julius Caesar and Louis XIV "were the exact same stories I had personally witnessed in all of my different jobs. Only less bloody."
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Every workplace is a modern court. Politics are not a bug in the system. They are the operating system. The people who refuse to learn the rules get dominated by those who already know them.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This is not a guide about manipulation. Most readers of the 48 Laws are "people who were a little bit naive in life and then learned the hard way about the political games." This guide treats the 48 Laws as a defense manual. Learn to read the game. Apply the principles aligned with your values. Recognize the rest when others use them against you.
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">How this guide works</h3>
            <p className="text-foreground text-sm leading-relaxed">
              Each section covers a workplace challenge. Under each, you'll find specific laws translated into workplace language with concrete examples. The guide ends with a quick-reference table covering all 48 laws, each tagged as <strong>USE</strong> (apply proactively), <strong>DEFEND</strong> (recognize when used against you), or <strong>AVOID</strong> (too risky for most situations). Some laws include a "Reversal": the situation where the law backfires.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">Guide structure at a glance</h3>
            <ol className="space-y-1 list-decimal list-inside text-foreground text-sm">
              <li>Introduction</li>
              <li>Find Your Direction First</li>
              <li>Manage Up</li>
              <li>Build Your Reputation</li>
              <li>Become Irreplaceable</li>
              <li>Get What You Want</li>
              <li>Survive Office Politics</li>
              <li>Play the Long Game</li>
              <li>All 48 Laws: Quick Reference</li>
              <li>Your Power Audit Tracker</li>
              <li>Resources</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-4">How this guide connects to the others</h3>
            <ul className="space-y-2">
              {[
                { label: "Career direction", link: "/ikigai-guide", text: "Ikigai Career Guide and Pivot Guide" },
                { label: "Office politics", link: "/office-politics-guide", text: "Office Politics Guide (full framework)" },
                { label: "Promotions", link: "/career-game-guide", text: "Career Game / Promotion Playbook" },
                { label: "Interviews", link: "/interview-preparation-guide", text: "Interview Playbook" },
                { label: "Offers", link: "/job-offer-guide", text: "Job Offer Guide" },
                { label: "Salary", link: "/salary-starter-kit", text: "Salary Negotiation Guide" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm"><strong>{item.label}:</strong> <Link to={item.link} className="text-gold hover:underline">{item.text}</Link></span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-6">
            Read what you need. Skip what you don't. Come back to the rest later.
          </p>
        </div>
      </section>

      <main className={completedActions > 0 ? "pb-14" : ""}>
        {/* ── Section 1: Find Your Direction ── */}
        <section id="find-direction" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="01" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Find Your Direction First</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6">
              Power without direction is wasted energy. Before you learn workplace strategy, answer one question: what are you building toward?
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Your Uniqueness Is Your Source of Power</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Before the 48 laws, there's a deeper concept: your "Life's Task." You are one of a kind. Your DNA, your experiences, your brain. To ignore your uniqueness is to make yourself interchangeable with every other resume in the pile.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The clues to your direction hide in your childhood. What drew you in before anyone told you what was practical? What subjects made you lose track of time? What felt like play while everything else felt like work?
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reflect on your earliest interests. Look at what sparks intense curiosity now. Look at what repels you. The intersection points toward your direction. "The first move is the most important: follow a career route matched to your inclinations and interests. Develop skills in as many areas related to this interest as possible."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              "The greatest career danger is you are replaceable." Following your unique inclinations is the only real protection against that.
            </p>

            <ActionStep checked={safeActions[0]} onToggle={() => toggleAction(0)}>
              Write down three activities from your childhood you loved doing before anyone told you what was practical. Then write three things in your current work that give you the same feeling. Look for the overlap. If there is none, bring one of those childhood skills into your current role this month. Find a project where it applies.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Alive Time vs. Dead Time</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              There are two ways to spend your working hours.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Dead time: you clock in, clock out, learn nothing. You survive the day. You scroll your phone during lunch. You do the minimum.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Alive time: you treat every role as a classroom. Even a bad job teaches you something if you observe, learn, and build skills. You study how the business runs. You watch how decisions get made. You pay attention to power dynamics.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "The worst thing you have in life is a job you hate, where you have no energy, you're not creative, and you're not thinking of the future. To me, you might as well be dead."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Those 50+ jobs? All alive time. Every one added a skill, a perspective, or a story later used in the book. The journalism taught how to organize ideas. Hollywood taught storytelling. The detective agency taught how to read people. None of it was wasted.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The question isn't whether your current role is perfect. The question is whether you're treating it as alive time or dead time.
            </p>

            <DiagramBox title="Alive Time Audit">
              <p className="mb-3">Rate your current role. Score each 1-5.</p>
              <div className="space-y-4">
                {ALIVE_AUDIT_QUESTIONS.map((q, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <p className="flex-1 text-foreground text-sm">{i + 1}. {q}</p>
                    <div className="shrink-0 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          onClick={() => setAliveScore(i, n)}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                            safeAlive[i] === n
                              ? "bg-gold text-background"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-2">
                  Your score: <span className={`text-lg font-bold ${aliveTotal >= 20 ? "text-emerald-500" : aliveTotal >= 12 ? "text-gold" : aliveTotal > 0 ? "text-red-500" : "text-muted-foreground"}`}>{aliveTotal}</span> / 25
                </p>
                <div className="space-y-1">
                  <p><strong>20-25:</strong> Strong alive time. Keep building.</p>
                  <p><strong>12-19:</strong> Mixed. You're leaving growth on the table.</p>
                  <p><strong>5-11:</strong> Dead time. Start treating this role as school or start planning your exit.</p>
                </div>
              </div>
            </DiagramBox>

            <ActionStep checked={safeActions[1]} onToggle={() => toggleAction(1)}>
              If you scored below 12, pick one thing to learn from your current role this week. It doesn't need to be related to your job title. Study how budgets get approved. Watch how the top performer on your team communicates. Read the company's investor presentations. Turn dead time into alive time starting today.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Skills Over Salary in Your Early Career</h3>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "The gold you are after in this process is learning and the acquisition of skills. Not a fat paycheck."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This doesn't mean accept poverty. It means don't pick a job based on salary alone when you're still building your toolkit. The skills you gather in your 20s become the advantage you deploy in your 30s and 40s.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Think of it as the "hacker model" of career development. Learn many skills following your deepest interests. Combine them in ways nobody else does. "The future belongs to those who learn more skills and combine them in creative ways."
            </p>

            <ActionStep checked={safeActions[2]} onToggle={() => toggleAction(2)}>
              List every skill you've picked up across all your roles. Include side projects and hobbies with transferable skills. Which two or three skills, stacked together, would make you hard to replace? Identify the gap in your stack. Then find a project, course, or side assignment in the next 30 days to start filling it.
            </ActionStep>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Once you have a direction, the next step is learning to operate inside an organization. And the first person you need to understand is your boss.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For the full purpose-finding framework, see the <Link to="/ikigai-guide" className="text-gold hover:underline">Ikigai Career Guide</Link>.
            </p>
          </div>
        </section>

        {/* ── Section 2: Manage Up ── */}
        <section id="manage-up" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="02" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Manage Up</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6">
              Your direct manager controls your assignments, your reviews, your visibility, and your promotions. Get this relationship wrong and nothing else in this guide matters.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Managing up is not manipulation. It's awareness. Most bosses carry fragile egos and hidden insecurities, despite their titles. Understanding this reality is the first step to navigating it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Three laws form the foundation of managing up: making your boss look good, speaking with precision, and knowing when to yield.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 1: Never Outshine the Master</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is Law 1 for a reason. It's the most common mistake people make at work.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The story from the book: Nicolas Fouquet, Louis XIV's finance minister, threw a party so spectacular it made the king feel inferior. The gardens were grander than the king's. The food was richer. The entertainment was better. Three weeks later, Fouquet was arrested. He spent the rest of his life in prison.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The workplace version is less dramatic, but the outcome is similar. If you do exceptional work and receive visible attention for it, you risk triggering your boss's insecurity. The result isn't prison. It's being sidelined, passed over, or managed out.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The fix isn't to work poorly. It's to succeed while letting your boss share in the glory. Build your track record. Keep records of your contributions. But let your boss shine in public. This lesson played out in Hollywood for years. Substantial dialogue written for a filmmaker who received all the credit. It stung. But it's how organizations work. The people behind the scenes build the foundation. The people in front get the spotlight. The smart move is to be essential backstage, not resented on stage.
            </p>
            <Reversal>
              If your boss is failing or on the way out, outshining them speeds up their replacement. But you need allies above them and an exit plan if it backfires.
            </Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[3]} onToggle={() => toggleAction(3)}>
                This week, find one way to make your boss look good without being asked. Send them a bullet-point summary of a win they can forward to their boss. Prepare a slide they can use in their next leadership meeting. The goal: they associate you with making their life easier.
              </ActionStep>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 4: Always Say Less Than Necessary</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Law 1 covers what you do. Law 4 covers what you say.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Consider the story of Kissinger's aide, Winston Lord. Lord drafted a report. Kissinger sent it back with one note: "Is this the best you are able to do?" Lord rewrote it. Kissinger sent it back again with the same note. Lord rewrote it a third time. When he submitted it saying "Yes, this is the best I am able to do," Kissinger replied: "Fine. Now I'll read it."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most people overtalk in meetings. They repeat points. They add qualifiers. They ramble to fill silence. Every extra sentence dilutes their message and makes them appear less confident.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The fix: speak with precision. When you update your boss or your team, aim for three sentences.
            </p>

            <DiagramBox title="The 3-Sentence Update Format">
              <div className="space-y-2">
                <p><strong>WHAT HAPPENED:</strong> [one sentence on progress/results]</p>
                <p><strong>WHAT'S NEXT:</strong> [one sentence on next steps]</p>
                <p><strong>WHAT I NEED:</strong> [one sentence on blockers/asks]</p>
              </div>
              <p className="mt-4 text-muted-foreground">Use this format for email updates, standup meetings, and status reports. Three sentences. No fluff.</p>
            </DiagramBox>

            <ActionStep checked={safeActions[4]} onToggle={() => toggleAction(4)}>
              At your next meeting, prepare your update using the 3-sentence format above. Write it down before the meeting. Time yourself. If it takes more than 60 seconds to deliver, cut it shorter. Practice this every week until it becomes automatic.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 22: Use the Surrender Tactic</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Law 1 teaches you to let your boss shine. Law 4 teaches you to be precise. Law 22 teaches you when to fold.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When your boss is wrong and you know it, the instinct is to fight. To push back. To prove your point. But fighting your boss in public rarely earns you a promotion. It earns you a reputation as "difficult."
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "When you are weaker, never fight for honor's sake. Choose surrender instead. Surrender gives you time to recover, time to wait for his power to wane."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bad bosses rotate out. Reorgs happen. Leadership changes. Patience is a weapon. The employee who yields gracefully on the small disagreements earns trust for the big ones. The employee who fights every battle exhausts their goodwill fast.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This doesn't mean becoming a doormat. It means knowing the difference between a battle worth fighting and one where folding preserves your energy and position. If the situation crosses ethical or legal lines, the correct move is documentation and escalation, not surrender.
            </p>

            <BossManagementMatrix />

            <p className="text-muted-foreground leading-relaxed mt-6">
              Managing up keeps you safe. But safety alone won't advance your career. For that, you need people beyond your boss to know your name. That's reputation.
            </p>
          </div>
        </section>

        {/* ── Section 3: Build Your Reputation ── */}
        <section id="reputation" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="03" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Build Your Reputation</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6">
              Your reputation walks into every room before you do. It enters every interview, every new team meeting, every promotion committee. Before anyone reads your resume, they've already heard about you from someone.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "Reputation is the cornerstone of power. Through reputation alone you can intimidate and win. Once it slips, you are vulnerable, and will be attacked on all sides."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Three dynamics shape your reputation at work: how well you protect it, how visible you are, and how you handle the envy of others.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 5: Guard Your Reputation With Your Life</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reputation compounds. One bad moment travels faster than 100 good ones. A single unprofessional comment at a conference, a bitter LinkedIn post about a former employer, a poorly worded email forwarded to the wrong person. These spread through professional networks faster than any achievement.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">Rules for protecting your reputation:</p>
            <ul className="space-y-2 mb-6">
              {[
                "Never badmouth a former employer, a former boss, or a former colleague. Not in interviews. Not on LinkedIn. Not at happy hour.",
                "Assume every email gets forwarded. Write accordingly.",
                "Assume every Slack message gets screenshotted. Type accordingly.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reputation is the single most valuable asset in your career. And the easiest to destroy.
            </p>
            <ActionStep checked={safeActions[5]} onToggle={() => toggleAction(5)}>
              Google yourself right now. Check LinkedIn, social media, and anything public. If the results don't reflect the professional you want to be, fix it today. Remove old posts. Update your LinkedIn headline. Ask a trusted friend: "What would someone say about me after meeting me once?" If the answer surprises you, you have work to do.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 6: Court Attention at All Costs</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Guarding your reputation keeps you safe. But safety without visibility keeps you stuck. The law is direct: "Everything is judged by its appearance. What is unseen counts for nothing."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The quiet worker who expects results to speak for themselves gets passed over every time. Not because the work is bad. Because nobody sees it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Visibility means volunteering for projects where new people see your name. Presenting your own work instead of letting others present it. Raising your hand when senior leaders visit your team. Writing internal updates and recaps with your name on them.
            </p>
            <ActionStep checked={safeActions[6]} onToggle={() => toggleAction(6)}>
              Identify one project or initiative at work where you're doing the work but someone else gets the visibility. Volunteer to present it yourself at the next team meeting or send a written recap with your name on it. Do this once a month. Within a quarter, senior leaders will know your name.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 46: Never Appear Too Perfect</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reputation and visibility create a new problem: envy.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Envy is "the most common human emotion and the least discussed." The colleague who always wins, always delivers, always gets praised, and never shows vulnerability becomes a target. Not openly. Quietly. Through whispered criticisms, withheld information, and subtle undermining.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The antidote is strategic vulnerability. Admit mistakes early and publicly. Ask for help visibly. Share credit generously. Don't manufacture fake weaknesses. People see through performed humility. But let others see your humanity alongside your competence.
            </p>

            <ReputationFlywheel />

            <p className="text-muted-foreground leading-relaxed mt-6">
              Reputation gets you noticed. But being noticed is not the same as being needed. The next section covers the difference.
            </p>
          </div>
        </section>

        {/* ── Section 4: Become Irreplaceable ── */}
        <section id="irreplaceable" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="04" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Become Irreplaceable</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6 italic">
              "People will get rid of you the moment they don't need you."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reputation makes people respect you. Irreplaceability makes them afraid to lose you. The two together are the foundation of career security.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 11: Learn to Keep People Dependent on You</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is the single most important law for career security.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "To maintain your independence you must always be needed and wanted. The more you are relied on, the more freedom you have."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In practice: own a process, a client relationship, or a knowledge domain nobody else fully understands. Be the person who gets the call when something breaks. Build relationships across departments so your value extends beyond your immediate team. Once you've built a track record of being essential, you earn the standing to ask for more. But be patient. Let it build through a process.
            </p>
            <Reversal>
              Don't hoard information out of fear. People who hoard become bottlenecks. Bottlenecks get bypassed and eventually removed. Share enough to be generous. Keep enough to be essential.
            </Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[7]} onToggle={() => toggleAction(7)}>
                Identify the one thing you do at work nobody else fully understands. Now ask: if you got sick for two weeks, would the team struggle? If yes, you have some degree of irreplaceability. If no, start building it. Pick one process, one client relationship, or one knowledge area and go deeper than anyone else on your team.
              </ActionStep>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 23: Concentrate Your Forces</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Law 11 tells you to go deep. Law 23 tells you where to focus.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "Intensity defeats extensity every time. When looking for sources of power to elevate you, find the one key patron, the fat cow who will give you milk for a long time to come."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most people spread themselves across too many projects, too many committees, too many "nice to haves." The result: mediocre work on everything, exceptional work on nothing.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Pick two or three priorities. Decline the rest. Depth on a few high-impact deliverables beats breadth across a dozen forgettable ones.
            </p>
            <ActionStep checked={safeActions[8]} onToggle={() => toggleAction(8)}>
              Count your active projects and commitments. If the number is above five, it's too many. Cut back to the two or three with the highest impact and visibility. Say no to the rest. "I'd love to help, but I'm at capacity on [high-impact project]. Can we revisit next quarter?" Declining is a career skill.
            </ActionStep>

            <DiagramBox title="The Three Laws of Career Security">
              <ol className="space-y-3 list-decimal list-inside">
                <li><strong>Law 11: Keep People Dependent on You</strong> — Makes you essential.</li>
                <li><strong>Law 13: Appeal to People's Self-Interest</strong> — Gets you what you want.</li>
                <li><strong>Law 29: Plan All the Way to the End</strong> — Keeps your career pointed forward.</li>
              </ol>
            </DiagramBox>

            <DiagramBox title="The Irreplaceability Audit">
              <p className="mb-3">Answer each question. Tap your score (0-2).</p>
              <div className="space-y-4">
                {IRREPLACEABLE_QUESTIONS.map((item, i) => (
                  <div key={i}>
                    <p className="text-foreground text-sm mb-1">{i + 1}. {item.q}</p>
                    <div className="flex items-center gap-1.5 ml-4">
                      {[0, 1, 2].map(n => (
                        <button
                          key={n}
                          onClick={() => setIrrepScore(i, n)}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                            safeIrrep[i] === n
                              ? "bg-gold text-background"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-xs ml-4 mt-0.5">{item.labels}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-2">
                  Your score: <span className={`text-lg font-bold ${irrepTotal >= 7 ? "text-emerald-500" : irrepTotal >= 4 ? "text-gold" : irrepTotal > 0 ? "text-red-500" : "text-muted-foreground"}`}>{irrepTotal}</span> / 10
                </p>
                <div className="space-y-1">
                  <p><strong>0-3:</strong> Replaceable. Start building your position today.</p>
                  <p><strong>4-6:</strong> Valued. Keep strengthening your position.</p>
                  <p><strong>7-10:</strong> Irreplaceable. Now focus on growth.</p>
                </div>
              </div>
            </DiagramBox>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Being irreplaceable gives you the standing to ask for what you want. The next section covers how to do the asking.
            </p>
          </div>
        </section>

        {/* ── Section 5: Get What You Want ── */}
        <section id="get-what-you-want" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="05" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Get What You Want</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              You've found your direction. You've managed up. You've built a reputation. You've made yourself essential. Now you need to convert all of it into raises, promotions, and the projects worth having.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Three laws cover the process: framing the ask, proving the case, and presenting yourself while doing it.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 13: Appeal to Self-Interest, Never Mercy or Gratitude</h3>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "If you need to turn to an ally for help, do not bother to remind him of your past assistance and good deeds. He will find a way to ignore you."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Never walk into a raise conversation saying "I deserve this because I've been here three years." Nobody promotes for tenure. Instead, show what they get by promoting you.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Prove you are essential first. Build the track record. Make the case self-evident. "Then it's logical and it fits and then you ask for it and it makes sense."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Reframe it: "Here's what I've delivered. Here's what I plan to deliver next. Here's the role and compensation level where I will do my best work." Every sentence focuses on what they gain, not what you deserve.
            </p>
            <ActionStep checked={safeActions[9]} onToggle={() => toggleAction(9)}>
              Write your raise request right now using this frame. Three sentences. What you delivered (with numbers). What you plan to deliver next. What you need to do your best work. Don't send it yet. Refine it over a week. Then schedule the meeting.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 9: Win Through Actions, Never Argument</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Law 13 tells you how to frame the ask. Law 9 tells you what to bring.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Don't argue for the promotion. Build the case with evidence. Track your wins weekly. Keep a brag doc. When review time arrives, you pull out 12 months of documented impact instead of trying to remember what you did.
            </p>

            <BragDocTemplate />

            <ActionStep checked={safeActions[10]} onToggle={() => toggleAction(10)}>
              Set a recurring 5-minute calendar event every Friday at 4 PM. Title it "Brag Doc." Fill in the four fields above. Do this for 12 weeks. At your next review, you'll have 12 weeks of documented wins ready to go while everyone else is trying to remember what they did.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 30: Make Your Accomplishments Seem Effortless</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Law 13 frames the ask. Law 9 provides the evidence. Law 30 covers how you carry yourself through the entire process.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "Your actions must seem natural and executed with ease. All the toil and practice and clever tricks must be concealed."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Calm competence signals leadership potential. Visible panic and stress signal you aren't ready for more responsibility. The person who delivers a flawless presentation looks more promotable than the person who delivers the same presentation while announcing how many late nights it took.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Deliver the results. Let them speak. Don't attach a "this was so hard" narrative to everything you produce. If you need more resources or more time, ask for them clearly and professionally. Don't martyr yourself.
            </p>
            <ActionStep checked={safeActions[11]} onToggle={() => toggleAction(11)}>
              For your next project delivery, strip all "effort language" from your update. No mentions of late nights, weekends, or stress. Present the result. Describe the impact. Stop there. Watch how people respond differently when you project composure instead of exhaustion.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">The Raise Timing Formula</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Prove you're essential first, then ask.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Best time to ask:</strong> After a visible win. A successful product launch, a strong quarterly result, a project completion praised by leadership. Your manager is in a good position to say yes. Ride the momentum.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Worst time to ask:</strong> During budget freezes, layoffs, or when your manager is under pressure. Even if your case is strong, the organizational context blocks a yes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">Format:</strong> Don't ambush your manager. Request a dedicated meeting. Come with your brag doc, a clear number, and a reason framed around future impact.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For salary negotiation tactics, see the <Link to="/salary-starter-kit" className="text-gold hover:underline">Salary Negotiation Guide</Link>.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Getting what you want requires more than strategy with your boss. It requires reading the broader landscape of people and alliances around you. That's politics.
            </p>
          </div>
        </section>

        {/* ── Section 6: Survive Office Politics ── */}
        <section id="office-politics" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="06" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Survive Office Politics</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6">
              People problems are power problems. "In order to be good in your field, you have to know how to deal with people. That's well over half the equation."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Office politics aren't a corruption of work. They're how groups of humans operate. Every organization has alliances, rivalries, unwritten rules, and people who play by different codes. Three laws cover this: reading the room, choosing your allies, and picking your battles.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 19: Know Who You're Dealing With</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              There are five types of dangerous people you'll meet in any organization.
            </p>
            <ol className="space-y-2 mb-6 list-decimal list-inside">
              <li className="text-foreground text-sm"><strong>The arrogant type.</strong> Retaliates against perceived slights.</li>
              <li className="text-foreground text-sm"><strong>The insecure type.</strong> Takes everything personally.</li>
              <li className="text-foreground text-sm"><strong>The suspicious type.</strong> Sees enemies everywhere.</li>
              <li className="text-foreground text-sm"><strong>The calculating type.</strong> Engineers every interaction for personal gain.</li>
              <li className="text-foreground text-sm"><strong>The vindictive type.</strong> Holds grudges forever.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mb-4">Before you make any significant move, ask three questions:</p>
            <ol className="space-y-1 mb-6 list-decimal list-inside text-foreground text-sm">
              <li>Who gains from this?</li>
              <li>Who loses from this?</li>
              <li>What is the worst-case interpretation of my words?</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mb-6">If you don't know the answer to all three, slow down.</p>
            <ActionStep checked={safeActions[12]} onToggle={() => toggleAction(12)}>
              Before your next sensitive email, meeting request, or escalation, pause and answer those three questions on paper. Keep a note on your desk: "Who gains? Who loses? Worst interpretation?" Make it a habit. This filter prevents more career damage than any other habit in this guide.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 10: Avoid the Unhappy and Unlucky</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Once you know who you're dealing with, the next question is who you spend your time with.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "You die from someone else's misery. Emotional states are as infectious as diseases."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Negativity spreads faster than competence in the workplace. The chronic complainer at the lunch table, the team member who poisons every meeting with cynicism, the colleague who gossips about everyone. Proximity to these people damages your reputation by association.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Choose your lunch table, your Slack channels, and your allies with intention. Be kind to everyone. But invest your time and energy in people who build, not people who tear down.
            </p>
            <ActionStep checked={safeActions[13]} onToggle={() => toggleAction(13)}>
              Audit your top 5 work relationships. Who do you spend the most time with? Are they builders or complainers? If more than two are chronic complainers, start creating distance. Sit somewhere different at lunch. Join a different Slack channel. Proximity shapes perception. Choose it deliberately.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 38: Think as You Like, Behave Like Others</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Laws 19 and 10 teach you to read people and choose your circle. Law 38 teaches you how to operate inside it.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "If you make a show of going against the times, flaunting your unconventional ideas and unorthodox ways, people will think you only want attention and look down upon them."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Don't be the rebel who fights every policy, challenges every norm, and treats every company tradition with contempt. Even when you're right, the cost of constant rebellion is isolation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is especially relevant for introverts. "The first thing is not to try to be someone you're not. If you're an introvert, come to love it about yourself." But learn the social rules of the game. Understand the culture. Operate within it while maintaining your own judgment privately.
            </p>
            <Reversal>
              Conformity without boundaries becomes spinelessness. Know where your line is. Some hills are worth dying on. Choose them deliberately.
            </Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[14]} onToggle={() => toggleAction(14)}>
                Write down your three non-negotiable professional boundaries. These are the lines you will not cross regardless of pressure: ethical, personal, or professional. Examples: "I will not lie to a client." "I will not take credit for someone else's work." "I will not stay silent about safety issues." Knowing your lines before you face pressure is the difference between integrity and regret.
              </ActionStep>
            </div>

            <DiagramBox title="The Office Power Map">
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-1">Who has real influence? (Not titles. Who do people listen to?)</p>
                  <p className="text-muted-foreground">List the top 3 people with real influence in your organization.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Who is allied with whom?</p>
                  <p className="text-muted-foreground">Map the key alliances.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Who is in conflict?</p>
                  <p className="text-muted-foreground">Identify active tensions.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Where do you sit?</p>
                  <ul className="text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>Allied with influence holders</li>
                    <li>Neutral / off the map</li>
                    <li>Accidentally in a conflict zone</li>
                  </ul>
                  <p className="text-gold mt-2 text-sm font-medium">If you're off the map, you're invisible. If you're in a conflict zone, pick a side or move.</p>
                </div>
              </div>
            </DiagramBox>

            <p className="text-muted-foreground leading-relaxed mt-6">
              For the full political survival framework, see the <Link to="/office-politics-guide" className="text-gold hover:underline">Office Politics Guide</Link>.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Politics protects you. But your career still needs a direction longer than the current quarter. That's the long game.
            </p>
          </div>
        </section>

        {/* ── Section 7: Play the Long Game ── */}
        <section id="long-game" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="07" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Play the Long Game</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6 italic">
              "True success and true power in life goes on for 10, 20, 30 years."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The 48 Laws of Power was published in 1998. The author was 39 years old. Those 50+ "failed" jobs became the foundation of the book. Every career looks messy in the middle. The question is whether the mess builds toward something.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "Most people want simple, direct, straight line paths to the perfect position and to success. But instead, you must welcome wrong turns and mistakes. They make you aware of your flaws. They widen your experiences. They toughen you up."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Four laws cover this ground: planning, timing, adaptability, and knowing when to stop.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 29: Plan All the Way to the End</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is one of the three laws singled out for career success.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "The ending is everything. Plan all the way to it, taking into account all the possible consequences, obstacles, and twists of fortune that might reverse your hard work and give the glory to others."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Work backward from where you want to be in five years. Every role is a stepping stone, not a destination. Before you accept a new position, ask: "Does this get me closer to where I want to be?"
            </p>
            <ActionStep checked={safeActions[15]} onToggle={() => toggleAction(15)}>
              Write your ideal job title for 5 years from now. Then list the 3 skills or experiences your resume is missing to get there. Now look at your current role: does it fill any of those gaps? If yes, double down. If no, start planning your next move.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 35: Master the Art of Timing</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Planning gives you direction. Timing determines whether your moves land.
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "Never seem to be in a hurry. Hurrying betrays a lack of control over yourself, and over time."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Timing governs three career decisions: when to stay, when to leave, and when to start something new. Too many people leave jobs too early (before they've built a track record) or too late (after they've stopped growing). The sweet spot is staying long enough to build a reputation, but leaving before the role becomes dead time.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Early in your career, optimize for learning speed. "In your early twenties, don't put so much importance on the money, on the raise. The real thing is the responsibility and the experience. The larger picture." Later, optimize for positioning. Time your moves to coincide with market demand for your skill set.
            </p>
            <Reversal>
              Patience becomes stagnation if you stay too long without growing. If you've been in the same role for three years with no development, the problem isn't timing. It's the role.
            </Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[16]} onToggle={() => toggleAction(16)}>
                Answer honestly: are you still learning at your current job? If the answer has been "no" for 6+ months, start preparing your exit. Update your resume. Activate your network. Don't wait for the perfect moment. The right time to move is before you're desperate to leave.
              </ActionStep>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 48: Assume Formlessness</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Planning sets the destination. Timing governs the pace. But the path itself will never be straight. "Accept the fact nothing is certain and no law is fixed. The best way to protect yourself is to be as fluid and formless as water."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The book itself is proof. Journalism, television, theater, film, detective agency, hotel work. Each job seemed random at the time. Together, they provided every skill needed. The writing taught how to organize thoughts. The history taught ideas. The random jobs taught human psychology.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              And if you're starting late? "You must cultivate a new set of skills suited to this change in direction, and find a way to blend them with your previous skills. Nothing in this process is ever wasted."
            </p>
            <ActionStep checked={safeActions[17]} onToggle={() => toggleAction(17)}>
              Write down one skill outside your current job description worth learning in the next 6 months. Not because your boss asked for it. Because the market will reward it in 3-5 years. Start with 30 minutes a week. That's how formlessness begins.
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">Law 47: Learn When to Stop</h3>
            <p className="text-foreground leading-relaxed mb-6 italic">
              "The moment of victory is often the moment of greatest peril. In the heat of victory, arrogance and overconfidence push you past the goal you aimed for."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Got the promotion? Don't immediately start campaigning for the next one. Consolidate. Build relationships at your new level. Prove yourself before pushing again.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Know the difference between consolidation and coasting. Consolidation is intentional: building the foundation for the next move. Coasting is passive: you've stopped growing.
            </p>
            <ActionStep checked={safeActions[18]} onToggle={() => toggleAction(18)}>
              After your next win (promotion, successful project, public recognition), resist the urge to immediately push for the next thing. Instead, spend 30 days building relationships at your new level. Schedule 1:1 coffees with three new peers or stakeholders you didn't have access to before. Consolidate your position before expanding it.
            </ActionStep>

            <DiagramBox title="The Career Timeline">
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-foreground">20s: SKILL ACCUMULATION</p>
                  <p className="text-muted-foreground">Priority: Learn everything. Say yes to hard assignments. Build your toolkit. Money is secondary. "The gold you are after is learning and the acquisition of skills, not a fat paycheck."</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">30s: POSITIONING</p>
                  <p className="text-muted-foreground">Priority: Combine your skills into something unique. Build reputation. Find your niche. Start leading. "The future belongs to those who learn more skills and combine them in creative ways."</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">40s+: MAXIMUM IMPACT</p>
                  <p className="text-muted-foreground">Priority: Deploy your unique combination for maximum impact. Mentor others. Build systems. Create legacy. "True success and true power in life goes on for 10, 20, 30 years."</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-medium text-gold">AT ANY AGE: The book was published at age 39. "It is never too late to start this process."</p>
                </div>
              </div>
            </DiagramBox>
          </div>
        </section>

        {/* ── Section 8: All 48 Laws Quick Reference ── */}
        <section id="quick-reference" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="08" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">The Full 48 Laws: Workplace Quick Reference</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              The sections above cover the 15 laws most relevant to your daily career. But the book has 48, and the remaining 33 still show up in workplaces every day.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This reference table covers all 48 laws, each translated into workplace language with a concrete example. Think of it as a field guide: when you encounter a confusing dynamic at work, scan the table. You'll often find the law being played on you, or the one you should be playing yourself.
            </p>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">Each law is tagged:</p>
              <div className="flex flex-wrap gap-2">
                {(["ALL", "USE", "DEFEND", "AVOID"] as const).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setLawFilter(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      lawFilter === tag
                        ? tag === "USE" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : tag === "DEFEND" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : tag === "AVOID" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gold/15 text-gold"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tag === "ALL" ? `ALL (${allLaws.length})` : `${tag} (${allLaws.filter(l => l.tag === tag).length})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-muted/30 border border-border p-3 mb-6 space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span><strong className="text-foreground">USE</strong> <span className="text-muted-foreground">— Apply proactively as career strategy</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong className="text-foreground">DEFEND</strong> <span className="text-muted-foreground">— Recognize when others use this against you</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <span><strong className="text-foreground">AVOID</strong> <span className="text-muted-foreground">— Too risky for most workplace situations</span></span>
              </div>
            </div>

            <div className="space-y-3">
              {filteredLaws.map(law => (
                <Collapsible key={law.num} title={`Law ${law.num}: ${law.title}`} tag={law.tag}>
                  <div className="space-y-3 pt-2">
                    <p className="text-foreground text-sm">{law.workplace}</p>
                    <p className="text-muted-foreground text-sm"><em>Example: {law.example}</em></p>
                    <p className="text-sm"><span className="text-gold font-medium">Do this:</span> {law.action}</p>
                  </div>
                </Collapsible>
              ))}
            </div>

            <div className="mt-8 bg-card border border-border rounded-xl p-5 md:p-6">
              <h4 className="font-heading text-base text-gold mb-3">Summary by tag</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li><strong>USE (apply proactively):</strong> Laws 1, 4, 5, 6, 9, 10, 11, 13, 16, 18, 22, 23, 24, 25, 28, 29, 30, 34, 35, 36, 38, 43, 45, 46, 47, 48 (26 laws)</li>
                <li><strong>DEFEND (recognize and protect):</strong> Laws 2, 3, 7, 8, 12, 14, 20, 21, 26, 27, 31, 32, 33, 37, 39, 40, 41, 42, 44 (19 laws)</li>
                <li><strong>AVOID (too risky):</strong> Laws 15, 17 (2 laws)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 9: Power Audit Tracker ── */}
        <section id="power-audit" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="09" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Your Power Audit Tracker</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Use this tracker to measure your position every 90 days. Score each area 1-5 based on the guide sections above. Track your progress over time.
            </p>

            <DiagramBox title="Your Power Audit">
              <p className="mb-4">Score each area 1-5. Repeat every 90 days.</p>
              <div className="space-y-4">
                {AUDIT_AREAS.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.area}</p>
                      <p className="text-muted-foreground text-sm">{item.question}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          onClick={() => setScore(i, safeScores[i] === n ? 0 : n)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                            safeScores[i] === n
                              ? "bg-gold text-background"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium text-foreground">
                    Your score: <span className={`text-lg font-bold ${auditTotal >= 28 ? "text-emerald-500" : auditTotal >= 20 ? "text-gold" : auditTotal >= 12 ? "text-amber-500" : auditTotal > 0 ? "text-red-500" : "text-muted-foreground"}`}>{auditTotal}</span> / 35
                  </p>
                  {auditTotal > 0 && (
                    <button onClick={saveSnapshot} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-semibold hover:bg-gold/20 transition-colors">
                      <Save className="w-3.5 h-3.5" />
                      Save snapshot
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  <p><strong>28-35:</strong> Strong position. Focus on growth and impact.</p>
                  <p><strong>20-27:</strong> Solid foundation. One or two areas need attention.</p>
                  <p><strong>12-19:</strong> Exposed. Pick your weakest area. Focus there for the next 90 days.</p>
                  <p><strong>Below 12:</strong> Career risk. Start with Sections 2 and 4 today.</p>
                </div>
              </div>
              {auditHistory.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-medium text-foreground mb-2">Previous snapshots</p>
                  <div className="space-y-2">
                    {auditHistory.map((snap, i) => (
                      <div key={i} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2 text-sm">
                        <span className="text-muted-foreground">{snap.date}</span>
                        <span className="font-semibold text-foreground">{snap.total}/35</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-2">After scoring:</p>
                <ol className="space-y-1 list-decimal list-inside text-muted-foreground text-sm">
                  <li>Circle your lowest score.</li>
                  <li>Re-read the section for that area.</li>
                  <li>Pick one action step from that section.</li>
                  <li>Do it this week.</li>
                  <li>Re-score in 90 days.</li>
                </ol>
              </div>
            </DiagramBox>

            <DiagramBox title="90-Day Power Audit Cycle">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { day: "Day 1", action: "Score all 7 areas. Identify weakest area. Pick one action step.", feel: "\"I know where I stand.\"" },
                  { day: "Day 30", action: "Check: did I do the action step from my weakest area? If not, do it today.", feel: "\"I'm taking action.\"" },
                  { day: "Day 60", action: "Check: is my weakest area improving? Adjust if not. Pick a second action step.", feel: "\"I see progress.\"" },
                  { day: "Day 90", action: "Re-score all 7 areas. Compare. Pick next weakest area.", feel: "\"I'm growing.\"" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-medium text-foreground text-sm">{item.day}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.action}</p>
                    <p className="text-gold text-xs mt-2 italic">{item.feel}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4">Repeat: Next 90-day cycle. Focus on your new weakest area. Stack improvements over time.</p>
            </DiagramBox>

            <p className="text-muted-foreground leading-relaxed mt-6">
              The tracker works the same way across your entire career. Your weakest area changes as you grow. The 48 Laws stay the same. Your understanding of them deepens every quarter.
            </p>
          </div>
        </section>

        {/* ── Section 10: Resources ── */}
        <section id="resources" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="10" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">Resources</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">Source book</h3>
                <p className="text-muted-foreground">The 48 Laws of Power by Robert Greene (1998)</p>
              </div>

              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">Related books by Robert Greene</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Mastery (2012)</li>
                  <li>The Laws of Human Nature (2018)</li>
                  <li>The Daily Laws (2021)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">Other guides in this series</h3>
                <ul className="space-y-2">
                  {[
                    { text: "Ikigai Career Guide", desc: "finding purpose and direction", link: "/ikigai-guide" },
                    { text: "Office Politics Guide", desc: "full political survival framework", link: "/office-politics-guide" },
                    { text: "Career Game / Promotion Playbook", desc: "getting promoted", link: "/career-game-guide" },
                    { text: "7 Rules of Power Guide", desc: "the research behind workplace power", link: "/office-politics-guide" },
                    { text: "Interview Playbook", desc: "landing the role", link: "/interview-preparation-guide" },
                    { text: "Job Offer Guide", desc: "evaluating and negotiating offers", link: "/job-offer-guide" },
                    { text: "Working with Recruiters Guide", desc: "getting on a recruiter's radar", link: "/recruiter-guide" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <GoldCheckBadge />
                      <span className="text-foreground text-sm">
                        <Link to={item.link} className="text-gold hover:underline">{item.text}</Link> ({item.desc})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground">
                More free guides: <Link to="/" className="text-gold hover:underline">james.careers</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky floating action step progress bar */}
      {completedActions > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg">
          <div className="h-1 bg-muted">
            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${(completedActions / TOTAL_ACTIONS) * 100}%` }} />
          </div>
          <div className="container mx-auto max-w-3xl px-5 py-2.5 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">{completedActions}/{TOTAL_ACTIONS} action steps completed</p>
            {showSaveBanner && (
              <div className="flex items-center gap-2">
                <a href={`/join?returnUrl=${encodeURIComponent("/48-laws-guide")}`} className="text-xs font-semibold text-gold hover:text-gold/80 underline underline-offset-2">
                  Save progress
                </a>
                <button onClick={() => setBannerDismissed(true)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <GuideBottomCTA lang="en" />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">James Bugden · Senior Recruiter @ Uber</span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><ThreadsIcon className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FortyEightLawsGuide;
