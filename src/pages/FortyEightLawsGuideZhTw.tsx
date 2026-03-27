import { Clock, ChevronDown, Menu, FileText, Shield, Target, Zap, Brain, Compass, Swords, Crown, Eye, ArrowRight, BookOpen, Check, X, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useGuideStorage } from "@/hooks/useGuideStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

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

const tagLabels = { USE: "使用", DEFEND: "防禦", AVOID: "避免" };

const Collapsible = ({ title, children, tag }: { title: string; children: React.ReactNode; tag?: "USE" | "DEFEND" | "AVOID" }) => {
  const [open, setOpen] = useState(false);
  const colors = tag ? tagColors[tag] : null;
  return (
    <div className={`border border-border rounded-xl overflow-hidden ${colors ? `border-l-4 ${colors.border}` : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 bg-card hover:bg-muted/50 transition-colors text-left gap-3">
        <span className="text-foreground font-medium text-sm md:text-base flex-1">{title}</span>
        {tag && colors && (
          <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg}`}>{tagLabels[tag]}</span>
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
      <p className="text-sm font-semibold text-gold uppercase tracking-wider">行動步驟</p>
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
        進度已儲存在此裝置。建立免費帳號即可跨裝置同步。
      </p>
      <a href={`/zh-tw/join?returnUrl=${returnUrl}`} className="shrink-0 text-xs font-semibold text-gold hover:text-gold/80 underline underline-offset-2">
        建立帳號
      </a>
      <button onClick={onDismiss} className="shrink-0 text-muted-foreground hover:text-foreground">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

const Reversal = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-muted/50 border border-border rounded-xl p-5 md:p-6">
    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">反轉</p>
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
  "low-low": { label: "正常模式", strategy: "少見。正常模式。做好工作即可。你有空間安靜累積。", color: "border-muted-foreground/30" },
  "low-high": { label: "最佳狀態", strategy: "最佳狀態。你發光。主管有安全感。雙贏。繼續做你正在做的事。", color: "border-emerald-500" },
  "high-low": { label: "投降", strategy: "法則 22。投降。保持低調。安靜累積。你的主管自尊心強，而你的能見度還不夠高——不要威脅他們。等待時機。", color: "border-amber-500" },
  "high-high": { label: "危險", strategy: "危險。法則 1。讓他們看起來好，否則你會付出代價。你的主管自尊心強，而你的能見度很高——這是最危險的象限。公開場合把功勞歸給主管。永遠不要蓋過他們。", color: "border-red-500" },
} as const;

const BossManagementMatrix = () => {
  const [bossMatrix, setBossMatrix] = useGuideStorage<{ego: string, visibility: string}>("48laws_boss_matrix_zhtw", { ego: "", visibility: "" });
  const quadrantKey = bossMatrix.ego && bossMatrix.visibility ? `${bossMatrix.ego}-${bossMatrix.visibility}` as keyof typeof matrixQuadrants : null;
  const result = quadrantKey ? matrixQuadrants[quadrantKey] : null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <h4 className="font-heading text-base md:text-lg text-gold mb-4">主管管理矩陣</h4>
      <div className="text-sm text-foreground leading-relaxed">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="font-medium mb-2">主管的自尊心</p>
            <div className="flex gap-2">
              {(["low", "high"] as const).map(v => (
                <button key={v} onClick={() => setBossMatrix(prev => ({ ...prev, ego: v }))}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${bossMatrix.ego === v ? "bg-gold/20 border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
                  {v === "low" ? "低" : "高"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">你的能見度</p>
            <div className="flex gap-2">
              {(["low", "high"] as const).map(v => (
                <button key={v} onClick={() => setBossMatrix(prev => ({ ...prev, visibility: v }))}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${bossMatrix.visibility === v ? "bg-gold/20 border-gold text-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>
                  {v === "low" ? "低" : "高"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr_1fr] text-xs sm:text-sm border border-border rounded-lg overflow-hidden">
          <div className="p-2 bg-muted/50 border-b border-r border-border" />
          <div className="p-2 bg-muted/50 border-b border-r border-border font-medium text-center">自尊心：低</div>
          <div className="p-2 bg-muted/50 border-b border-border font-medium text-center">自尊心：高</div>
          <div className="p-2 border-b border-r border-border font-medium bg-muted/50 flex items-center">能見度：低</div>
          <div className={`p-3 border-b border-r border-border transition-all ${quadrantKey === "low-low" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}>正常模式。做好工作即可。</div>
          <div className={`p-3 border-b border-border transition-all ${quadrantKey === "high-low" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}>法則 22。投降。安靜累積。</div>
          <div className="p-2 border-r border-border font-medium bg-muted/50 flex items-center">能見度：高</div>
          <div className={`p-3 border-r border-border transition-all ${quadrantKey === "low-high" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}>最佳狀態。雙贏。</div>
          <div className={`p-3 transition-all ${quadrantKey === "high-high" ? "bg-gold/10 ring-2 ring-gold ring-inset" : ""}`}><span className="text-gold font-medium">危險。</span>法則 1。讓他們看起來好。</div>
        </div>

        {result && (
          <div className={`mt-4 p-4 rounded-lg border-l-4 ${result.color} bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <p className="font-semibold text-foreground mb-1">你的象限：{result.label}</p>
            <p className="text-muted-foreground">{result.strategy}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Interactive: Reputation Flywheel ── */
const flywheelNodes = ["成果", "能見度", "信任", "機會", "更多成果"];

const ReputationFlywheel = () => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setActive(prev => (prev + 1) % 5), 2500);
    return () => clearInterval(timer);
  }, []);

  const positions = [
    { x: 50, y: 5 },
    { x: 93, y: 38 },
    { x: 77, y: 90 },
    { x: 23, y: 90 },
    { x: 7, y: 38 },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <h4 className="font-heading text-base md:text-lg text-gold mb-4">聲譽飛輪</h4>
      <div className="relative w-full max-w-xs mx-auto aspect-square">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" fill="none">
          {positions.map((from, i) => {
            const to = positions[(i + 1) % 5];
            return (
              <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="currentColor" className="text-border" strokeWidth="0.5" strokeDasharray="2 1" />
            );
          })}
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
        <p className="text-muted-foreground text-sm">斷掉任何一環，飛輪就停了。</p>
        <p className="text-gold font-medium text-sm">大多數人斷掉的是「能見度」這環。他們做了很好的工作，卻沒人看見。</p>
      </div>
    </div>
  );
};

/* ── Interactive: Brag Doc Template ── */
type BragEntry = { week: string; shipped: string; result: string; who: string; learned: string };
const emptyEntry = (): BragEntry => ({ week: "", shipped: "", result: "", who: "", learned: "" });

const BragDocTemplate = () => {
  const [entries, setEntries] = useGuideStorage<BragEntry[]>("48laws_bragdoc_zhtw", []);
  const filledCount = entries.filter(e => e.shipped || e.result).length;

  const addEntry = () => setEntries(prev => [emptyEntry(), ...prev]);
  const removeEntry = (idx: number) => setEntries(prev => prev.filter((_, i) => i !== idx));
  const updateEntry = (idx: number, field: keyof BragEntry, value: string) =>
    setEntries(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-heading text-base md:text-lg text-gold">戰績文件</h4>
        {filledCount > 0 && (
          <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full font-medium">{filledCount} 筆記錄</span>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4">每週五更新。5 分鐘。</p>

      <button onClick={addEntry}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-gold/40 text-gold text-sm font-medium hover:bg-gold/5 transition-colors mb-4">
        <Plus className="w-4 h-4" /> 新增一週
      </button>

      {entries.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-6">還沒有記錄。點擊「新增一週」開始追蹤你的成果。</p>
      )}

      <div className="space-y-4">
        {entries.map((entry, idx) => (
          <div key={idx} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
            <div className="flex items-center justify-between">
              <input type="text" placeholder="哪一週（例：1/6 那週）"
                value={entry.week} onChange={e => updateEntry(idx, "week", e.target.value)}
                className="bg-transparent border-none text-foreground text-sm font-medium placeholder:text-muted-foreground/50 focus:outline-none flex-1"
              />
              <button onClick={() => removeEntry(idx)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {([
              ["shipped", "我完成了什麼"],
              ["result", "可衡量的成果（數字、節省的時間、營收）"],
              ["who", "誰看到了 / 誰受益了"],
              ["learned", "我學到了什麼"],
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

      <p className="mt-4 pt-4 border-t border-border text-muted-foreground text-sm">績效考核時用這份文件。不要靠記憶。你的主管不會記得。你的戰績文件會。</p>
    </div>
  );
};

const tocSections = [
  { id: "intro", label: "前言" },
  { id: "find-direction", label: "先找到方向" },
  { id: "manage-up", label: "向上管理" },
  { id: "reputation", label: "建立聲譽" },
  { id: "irreplaceable", label: "無可取代" },
  { id: "get-what-you-want", label: "爭取你想要的" },
  { id: "office-politics", label: "辦公室政治" },
  { id: "long-game", label: "打長期戰" },
  { id: "quick-reference", label: "48 條法則速查" },
  { id: "power-audit", label: "權力稽核" },
  { id: "resources", label: "資源" },
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

  const activeLabel = tocSections.find(s => s.id === active)?.label || "目錄";
  const activeIdx = tocSections.findIndex(s => s.id === active);

  return (
    <>
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">目錄</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}
            >{label}</a>
          ))}
        </nav>
      </aside>
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full bg-executive-green text-cream shadow-lg px-4 py-2.5 hover:scale-105 transition-transform" aria-label="目錄">
          <Menu className="w-4 h-4 shrink-0" />
          <span className="text-xs font-medium truncate max-w-[140px]">
            {activeIdx >= 0 ? `${String(activeIdx).padStart(2, '0')} · ` : ""}{activeLabel}
          </span>
          <ChevronUp className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">目錄</p>
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

/* ── 48 Laws Reference Data (Chinese) ── */
const allLaws: { num: number; title: string; tag: "USE" | "DEFEND" | "AVOID"; workplace: string; example: string; action: string }[] = [
  { num: 1, title: "永遠不要蓋過你的上司", tag: "USE", workplace: "在公開場合讓你的主管看起來好。私下累積你的紀錄。", example: "你做的分析。你的主管去報告。你們雙贏。", action: "下次團隊有成果時，準備一份你的主管能轉寄給他們主管的摘要。" },
  { num: 2, title: "不要過度信任朋友", tag: "DEFEND", workplace: "不要跟會向你主管回報的同事分享職涯挫折感。", example: "你對「工作好朋友」抱怨主管。週五前主管就知道了。", action: "用私人日記發洩。職涯挫折只跟公司外的人分享。" },
  { num: 3, title: "隱藏你的意圖", tag: "DEFEND", workplace: "不要對同事宣布你在找工作、薪資目標或升遷時間表。", example: "你提到在面試其他公司。你的主管聽說了。", action: "在你有簽好的 offer 或確定的計畫前，對零個同事透露你的下一步。" },
  { num: 4, title: "永遠少說一點", tag: "USE", workplace: "精準地說。話少 = 更高的權威感。", example: "你做 2 分鐘的報告。副總記住你的簡潔。", action: "下次會議用三句話格式。發生了什麼。下一步。需要什麼。" },
  { num: 5, title: "用生命守護你的聲譽", tag: "USE", workplace: "一個壞印象傳得比 100 件好事快。永遠不要說前雇主壞話。", example: "你說了前公司的壞話。招募官記下來了。機會消失。", action: "今天 Google 你自己。修正任何不符合你想要的專業形象的東西。" },
  { num: 6, title: "不惜代價吸引注意", tag: "USE", workplace: "能見度驅動職涯成長。沒人看到的好工作 = 白做。", example: "你主動報告季度成果。高層注意到你了。", action: "下次團隊會議時，主動報告你自己的工作。不要讓別人代替你報告。" },
  { num: 7, title: "讓別人做事，自己拿功勞", tag: "DEFEND", workplace: "注意把你的工作當自己的來報告的主管或同事。", example: "同事報告你的提案，沒有提到你。", action: "持續記錄戰績文件。每週更新。你的紀錄能證明誰做了什麼。" },
  { num: 8, title: "讓別人來找你", tag: "DEFEND", workplace: "安排會議的人掌控議程。不要總是當追的人。", example: "你交出好到副總主動要求跟你跟進的成果。", action: "停止追趕。交出值得被主動邀約的成果。" },
  { num: 9, title: "用行動勝出，不要用爭論", tag: "USE", workplace: "不要爭論升遷。用有紀錄的成果建立案例。", example: "你拿出一頁報告，展示 12 個月的影響力。", action: "設定每週五 5 分鐘的戰績文件提醒。12 週的記錄勝過 12 個月的努力回想。" },
  { num: 10, title: "遠離不幸和倒楣的人", tag: "USE", workplace: "接近慣性負能量的人是職涯風險。", example: "你不再跟慣性抱怨的人一起吃午餐。事情開始改變。", action: "盤點你最常相處的 5 個工作關係。如果超過 2 個是慣性抱怨者，開始拉開距離。" },
  { num: 11, title: "學會讓人依賴你", tag: "USE", workplace: "掌握一個沒有其他人完全理解的流程或知識領域。", example: "你是唯一了解報表系統的人。裁員名單上從不出現你。", action: "選一個流程，深入到比團隊中任何人都深。成為出問題時被打電話的那個人。" },
  { num: 12, title: "用選擇性的坦誠來解除戒心", tag: "DEFEND", workplace: "注意用小恩小惠建立信任，然後提出大要求的人。", example: "新同事幾週來大方分享內部資訊。然後要求你支持他們的提案。", action: "當有人早期異常慷慨，問自己：他們之後會想要什麼回報？追蹤這個模式。" },
  { num: 13, title: "訴諸他人的利益，而非同情", tag: "USE", workplace: "每個請求都圍繞對方得到什麼來包裝。不是你值得什麼。", example: "「升我讓您有空間做策略性工作」勝過「我在這裡三年了」。", action: "用「這對您有什麼好處」改寫你的下一個請求，取代「為什麼我值得」。" },
  { num: 14, title: "裝作朋友，實為間諜", tag: "DEFEND", workplace: "別人在閒聊中蒐集情報。注意你分享的內容。", example: "同事在下班聚會中隨口問你團隊的預算。", action: "在社交場合分享前先暫停。這些話你會在團隊會議上說嗎？如果不會，這裡也不要說。" },
  { num: 15, title: "徹底消滅敵人", tag: "AVOID", workplace: "產業圈子小。今天的敵人明天變你的主管。", example: "你公開揭發對手的錯誤。兩年後他們在你夢想職位的面試委員會裡。", action: "贏，但不摧毀。永遠留住未來修復關係的可能。" },
  { num: 16, title: "用缺席增加尊重", tag: "USE", workplace: "不要隨時待命。稀缺性增加被感知的價值。", example: "你不再參加可選的會議。人們開始更重視你的時間。", action: "這週婉拒一場可選的會議。用那段時間做深度工作。觀察有沒有人因此對你不同。" },
  { num: 17, title: "培養不可預測的氣質", tag: "AVOID", workplace: "職場中的不可預測造成焦慮，不是尊重。", example: "一個每週換優先順序的主管失去團隊信任。", action: "保持一致性。一致性建立信任。把不可預測留給談判，不是日常運作。" },
  { num: 18, title: "不要建造堡壘", tag: "USE", workplace: "孤立是危險的。保持跨團隊的連結。", example: "你跳過所有可選的互動。升遷時沒人認識你。", action: "這個月跟一個不同團隊的人約咖啡或午餐。每月重複。" },
  { num: 19, title: "了解你在跟誰打交道", tag: "USE", workplace: "做涉及他人的動作前，先研究對方。", example: "你在會議上反駁一位記仇型的副總。你上了黑名單。", action: "任何敏感動作前，回答：誰得利？誰受損？最壞的解讀？" },
  { num: 20, title: "不要承諾給任何人", tag: "DEFEND", workplace: "小心在內部衝突中選邊站。", example: "兩位副總在爭一個新部門。你公開支持一方。另一方贏了。", action: "除非被迫，在政治衝突中保持中立。兩邊都建立關係。" },
  { num: 21, title: "裝笨來抓笨蛋", tag: "DEFEND", workplace: "注意裝謙虛來套取資訊的人。", example: "新人問你流程的「天真」問題。幾週後提議取代它。", action: "新人問你工作的詳細問題時，分享基本的。策略性的細節留著。" },
  { num: 22, title: "運用投降策略", tag: "USE", workplace: "挑選戰場。現在退讓，為更大的勝利保存精力。", example: "主管否決你的建議。你優雅接受。下次大決策時，他們信任你的判斷。", action: "跟主管意見不同前問自己：「6 個月後這件事還重要嗎？」不重要就退讓。" },
  { num: 23, title: "集中你的力量", tag: "USE", workplace: "在 2-3 個優先事項上深入。深度勝過廣度。", example: "你推掉附屬委員會，專注在一個高影響力的專案上。", action: "數你的活躍專案。超過 5 個就太分散。砍到影響力和能見度最高的 2-3 個。" },
  { num: 24, title: "扮演完美的朝臣", tag: "USE", workplace: "看懂場面。針對聽眾調整你的方式。", example: "對工程師用數據開場。對高管用成果開場。", action: "下次簡報前問：「誰會在場，他們最在意什麼？」你的第一張投影片要針對這個調整。" },
  { num: 25, title: "重新創造你自己", tag: "USE", workplace: "不要讓你的第一份工作定義你的整個職涯。", example: "你從客服起步。自學了數據分析。提案了一個新職位。", action: "更新你的 LinkedIn 標題和自我介紹，反映你要去的方向，而不是你去過的地方。" },
  { num: 26, title: "保持雙手乾淨", tag: "DEFEND", workplace: "注意把別人當替罪羊的主管。", example: "你的主管叫你去跟客戶傳壞消息。你變成失敗的代言人。", action: "被要求代替別人傳壞消息時，建議一起去傳達。不要獨自承擔。" },
  { num: 27, title: "利用人們想要相信的需求", tag: "DEFEND", workplace: "注意只賣願景不給實質的主管。", example: "新高管承諾「轉型」。所有人振奮。沒有計畫跟進。", action: "聽到宏大承諾時，問時間表和指標。願景沒有計畫就是表演。" },
  { num: 28, title: "大膽行動", tag: "USE", workplace: "做決定時全力以赴。半調子的措施招來抵抗。", example: "你帶著信念和試行計畫提出新流程。高層核准。", action: "下次提案只給一個建議。不是三個選項。自信傳達能力。" },
  { num: 29, title: "規劃到最後一步", tag: "USE", workplace: "每份工作都應該為下一份開門。", example: "你接受一個平調。看起來像側移。但它補上了你履歷需要的缺口。", action: "寫下你 5 年後的職稱。列出 3 個現在到那裡之間的缺口。今年填補一個。" },
  { num: 30, title: "讓成就看起來毫不費力", tag: "USE", workplace: "沉穩的能力傳達領導潛力。壓力外顯傳達你已到極限。", example: "你準時交付，沒有宣布你加了多少班。", action: "下次專案更新中移除所有「辛苦語言」。報告成果。描述影響。停在那裡。" },
  { num: 31, title: "控制選項", tag: "DEFEND", workplace: "注意所有「選擇」都對別人有利的情境。", example: "主管給你兩個新專案。兩個都服務他們的需要。", action: "被給有限選項時，問：「還有其他我應該知道的專案嗎？」創造你自己的第三選項。" },
  { num: 32, title: "利用人們的幻想", tag: "DEFEND", workplace: "未來獎勵的承諾常常替代現在的合理薪資。", example: "新創公司承諾股票。兩年後分文不值。", action: "被提供股票或未來獎金時，要求書面的歸屬時間表、估值和等值現金。" },
  { num: 33, title: "找出每個人的弱點", tag: "DEFEND", workplace: "每個人都有壓力點。保護你的。", example: "你過度分享職涯焦慮。同事在升遷競爭中拿來當彈藥。", action: "把職涯不安留在職場對話之外。跟公司外的朋友和導師分享。" },
  { num: 34, title: "以你的方式展現王者風範", tag: "USE", workplace: "表現得像已經在下一個層級的人。", example: "你的穿著、談吐和會議準備，像已經擁有你想要的頭銜。", action: "觀察比你高一個層級的人在會議中怎麼溝通。這個月模仿他們的準備和表達方式。" },
  { num: 35, title: "掌握時機的藝術", tag: "USE", workplace: "什麼時候問跟問什麼一樣重要。", example: "團隊贏下大案子的那週你要求加薪。主管秒答應。", action: "找出下一個組織「高點」。把你的請求安排在一週之內提出。" },
  { num: 36, title: "蔑視你得不到的東西", tag: "USE", workplace: "快速放下怨恨和被拒絕。", example: "你沒拿到職位。你優雅地走開。面試官記住你的風度，下次推薦了你。", action: "被拒絕後 24 小時內寄感謝信。問下次怎樣會是更強的候選人。" },
  { num: 37, title: "創造引人注目的場面", tag: "DEFEND", workplace: "注意用場面效果分散實質關注的主管。", example: "豪華的全員大會有免費食物和贈品，分散了今年沒有人加薪這件事。", action: "每次公司大活動後問：「對我和我的團隊來說，什麼改變了？」如果答案是沒有，記住這個模式。" },
  { num: 38, title: "想怎麼想都行，但表現得跟別人一樣", tag: "USE", workplace: "外在配合文化。私下意見留著。挑選戰場。", example: "你不同意開放式辦公室的政策。你找到變通辦法而不是四處宣戰。", action: "選一個你不同意的職場規範。這週不要公開反對，而是找出在它裡面運作的方式。" },
  { num: 39, title: "攪亂池水來捕魚", tag: "DEFEND", workplace: "注意故意激怒你，讓你失衡後趁機佔便宜的人。", example: "同事在會議中故意刺你。你保持冷靜。他們輸了。", action: "在職場被激怒時，等 24 小時再回應。冷靜的回應能解除挑釁者的武裝。" },
  { num: 40, title: "蔑視免費午餐", tag: "DEFEND", workplace: "免費的好處通常帶著隱藏的義務。", example: "一位導師大量投資在你身上。後來他們期待你在內部政治上支持他們。", action: "當有人免費給你東西，問自己：「他們期待什麼回報？」理解交換條件。" },
  { num: 41, title: "避免踏入偉大前任的鞋子", tag: "DEFEND", workplace: "接替一位備受愛戴的主管意味著不利的比較。", example: "你取代了一位傳奇團隊主管。你做的每件事都被拿來跟他們的遺產比較。", action: "取代一位備受喜愛的人時，公開肯定他們的貢獻。然後透過新的成績建立你自己的身分。" },
  { num: 42, title: "打擊牧羊人", tag: "DEFEND", workplace: "問題通常追溯到一個人。找到源頭。", example: "團隊士氣下降。追蹤到一個散播負能量的成員。", action: "團隊問題持續存在時，問：「誰開始了這個模式？」處理源頭，不是症狀。" },
  { num: 43, title: "贏得人心", tag: "USE", workplace: "用感情打動人。最好的領導者激發自願的投入。", example: "你展示新流程如何解決他們最大的日常挫折。他們自願採用。", action: "下次的變革提案，先講聽眾在意的問題。不是你得意的解決方案。" },
  { num: 44, title: "用鏡像效果解除武裝", tag: "DEFEND", workplace: "注意模仿你的想法來搶共同功勞的人。", example: "同事開始在會議中重複你的論點。", action: "分享原創想法後，用書面（email 或 Slack）附上你的名字和日期跟進。" },
  { num: 45, title: "鼓吹變革，但不要一次改太多", tag: "USE", workplace: "新上任？漸進地改變。急速大改引發抵抗。", example: "第一個月就什麼都改的新主管，失去團隊信任。", action: "新職位先花 30 天聆聽，再改變任何東西。先拿小贏。信任建立後再做大改變。" },
  { num: 46, title: "永遠不要表現得太完美", tag: "USE", workplace: "展現策略性的脆弱。提早承認錯誤。分享功勞。", example: "大勝之後，你公開讚揚團隊，提到下次你會改善的地方。", action: "下次明顯成功後，公開讚揚一位幫助你的人，並說一件你下次會做不同的事。" },
  { num: 47, title: "勝利時學會停下", tag: "USE", workplace: "贏了之後先鞏固。過度擴張讓盟友變對手。", example: "你升遷了。花 6 個月證明你屬於這個層級，再推下一步。", action: "贏了之後跟新層級的 3 位同儕約咖啡。先建立基礎再擴張。" },
  { num: 48, title: "保持無形", tag: "USE", workplace: "保持適應力。不要死守一個身分、一個技能、或一條路。", example: "你的專長被自動化取代。你學會管理自動化，變得更有價值。", action: "找出一項超出你目前工作範圍的技能。每週花 30 分鐘學習，持續 6 個月。" },
];

const TOTAL_ACTIONS = 19;
const AUDIT_AREAS = [
  { area: "1. 方向", question: "我知道我在為什麼努力嗎？我在活時間裡嗎？" },
  { area: "2. 向上管理", question: "我的主管把我視為盟友嗎？我會挑選戰場嗎？" },
  { area: "3. 聲譽", question: "除了我的直屬主管，高層主管知道我的名字和工作成果嗎？" },
  { area: "4. 不可取代性", question: "如果我離開，團隊會很吃力嗎？我掌握了沒有其他人理解的東西嗎？" },
  { area: "5. 爭取成果", question: "我有追蹤我的成果嗎？戰績文件是最新的嗎？我有為我贏得的東西開口嗎？" },
  { area: "6. 政治意識", question: "我知道誰有影響力嗎？我是否與建設者結盟？我有遠離負能量嗎？" },
  { area: "7. 長期賽局", question: "我目前的工作是否服務我的 5 年計畫？我是否在為我想到達的地方累積技能？" },
];

const ALIVE_AUDIT_QUESTIONS = [
  "你現在學到多少東西？",
  "你在為下一份工作累積技能嗎？",
  "你知道這個月學了什麼嗎？",
  "你有研究你的公司怎麼運作嗎？",
  "你有觀察決策怎麼做出來嗎？",
];

const IRREPLACEABLE_QUESTIONS = [
  { q: "如果你明天離職，要多久才能找到替代你的人？", labels: "2 週以內 (0) · 1-3 個月 (1) · 3 個月以上 (2)" },
  { q: "你是否掌握一個沒有其他人完全理解的流程、客戶、或知識領域？", labels: "沒有 (0) · 部分 (1) · 是 (2)" },
  { q: "過去 6 個月，是否有高層主管點名要你參與某個專案？", labels: "沒有 (0) · 一次 (1) · 多次 (2)" },
  { q: "其他團隊的人會來找你尋求建議或幫忙嗎？", labels: "不會 (0) · 偶爾 (1) · 經常 (2)" },
  { q: "如果公司裁員，你的主管會極力留下你嗎？", labels: "不確定 (0) · 應該會 (1) · 肯定會 (2)" },
];

const FortyEightLawsGuideZhTw = () => {
  useTrackGuideProgress("48-laws-zhtw");
  const { isLoggedIn } = useAuth();
  const [lawFilter, setLawFilter] = useState<"ALL" | "USE" | "DEFEND" | "AVOID">("ALL");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const [actionChecks, setActionChecks] = useGuideStorage<boolean[]>("48laws_actions_zhtw", Array(TOTAL_ACTIONS).fill(false));
  const [auditScores, setAuditScores] = useGuideStorage<number[]>("48laws_power_audit_zhtw", Array(7).fill(0));
  const [aliveScores, setAliveScores] = useGuideStorage<number[]>("48laws_alive_audit_zhtw", Array(5).fill(0));
  const [irrepScores, setIrrepScores] = useGuideStorage<number[]>("48laws_irreplaceable_audit_zhtw", Array(5).fill(0));

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
      <SEO schemaJson={guideSchema({ path: "/zh-tw/48-laws-guide", title: "職場權力的 48 條法則 — 辦公室政治與職涯策略指南", description: "改編自 Robert Greene 的《乘勝追擊的48條法則》，專為你的職涯量身打造的實戰指南" })} />

      <ReadingProgressBar />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            權力的48法則<br className="hidden sm:block" />職場實戰版
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">招募官的職場權力、辦公室政治與職涯策略指南</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden 著 · 職涯教練 · Uber 資深招募官</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">閱讀時間 45 分鐘</span>
            </div>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <FileText className="w-4 h-4" />
              <span className="text-sm">11 個章節</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">改編自 Robert Greene 所著《乘勝追擊的48條法則》（The 48 Laws of Power）</p>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />
      <TableOfContents />

      {/* ── How to Use ── */}
      <section className="py-10 md:py-14 px-5 md:px-6 bg-muted/30 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-xl md:text-2xl text-foreground mb-6">如何使用本指南</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr><th className="text-left p-3 border-b border-border text-foreground" colSpan={2}>你現在的狀況是？</th></tr>
              </thead>
              <tbody>
                {[
                  { situation: "「我很迷惘，不知道該往哪個方向走。」", start: "先找到你的方向", anchor: "#find-direction", extra: <> + <Link to="/zh-tw/ikigai-guide" className="text-gold hover:underline">Ikigai 職涯指南</Link></> },
                  { situation: "「我的主管把我的功勞據為己有。」", start: "向上管理", anchor: "#manage-up", extra: null },
                  { situation: "「我被跳過升遷了。」", start: "建立你的聲譽", anchor: "#reputation", extra: <> + <a href="#get-what-you-want" className="text-gold hover:underline">爭取你想要的</a></> },
                  { situation: "「辦公室政治快把我搞瘋了。」", start: "在辦公室政治中生存", anchor: "#office-politics", extra: null },
                  { situation: "「我不知道誰值得信任。」", start: "在辦公室政治中生存", anchor: "#office-politics", extra: null },
                  { situation: "「我想要求加薪，但不知道什麼時候開口。」", start: "爭取你想要的", anchor: "#get-what-you-want", extra: null },
                  { situation: "「我覺得自己卡住了，沒人看見我。」", start: "建立你的聲譽", anchor: "#reputation", extra: null },
                  { situation: "「我需要徹底重新規劃職涯。」", start: "先找到你的方向", anchor: "#find-direction", extra: <> + <Link to="/zh-tw/ikigai-guide" className="text-gold hover:underline">Ikigai 職涯指南</Link></> },
                  { situation: "「給我重點整理就好。」", start: "48 條法則完整速查表", anchor: "#quick-reference", extra: null },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-3 text-muted-foreground">{row.situation}</td>
                    <td className="p-3 text-foreground font-medium">→ 從這裡開始：<a href={row.anchor} className="text-gold hover:underline">{row.start}</a>{row.extra}</td>
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
          <p className="text-muted-foreground leading-relaxed mb-6">
            Robert Greene 在 39 歲出版第一本書之前，做過 50 到 80 份工作。希臘的建築工人、巴黎的飯店櫃檯、巴塞隆納的英文老師、好萊塢的編劇、雜誌編輯。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            在那些年裡，他在每一個職場觀察到相同的模式。人們想要權力。他們隱藏這份渴望。他們玩遊戲。他們在光鮮亮麗的職業外表下操弄、算計。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            他把這一切記錄下來。結果就是 1998 年出版的《乘勝追擊的48條法則》。這本書賣出數百萬冊，從 Fortune 500 的高層到嘻哈歌手，人手一本。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這本書取材自 3,000 年的歷史。國王、將軍、騙子、外交官。關於凱撒大帝和路易十四的故事，「和我在各種工作中親眼看見的故事一模一樣。只是沒那麼血腥。」
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            每一個職場都是現代的宮廷。政治不是系統的 bug。政治本身就是作業系統。拒絕學習規則的人，會被早已熟悉規則的人支配。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這不是一本教你操控他人的指南。大多數讀者「在人生中有點天真，後來才從政治遊戲中學到了慘痛教訓。」這本指南把 48 條法則當作防禦手冊。學會看懂遊戲規則。運用符合你價值觀的原則。辨認出別人何時對你使用其他法則。
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">本指南的使用方式</h3>
            <p className="text-foreground text-sm leading-relaxed">
              每個章節涵蓋一個職場挑戰。每個挑戰底下，你會看到書中特定的法則，翻譯成職場語言，搭配你在自己職涯中會認出的具體案例。指南最後有一份速查表，涵蓋全部 48 條法則，每條標記為<strong>使用</strong>（主動運用）、<strong>防禦</strong>（辨認別人是否對你使用）、或<strong>避免</strong>（風險太高）。部分法則包含「反轉」：法則失效或反彈的特定情境。
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">指南架構一覽</h3>
            <ol className="space-y-1 list-decimal list-inside text-foreground text-sm">
              <li>前言</li>
              <li>先找到你的方向</li>
              <li>向上管理</li>
              <li>建立你的聲譽</li>
              <li>讓自己無可取代</li>
              <li>爭取你想要的</li>
              <li>在辦公室政治中生存</li>
              <li>打長期戰</li>
              <li>48 條法則完整速查表</li>
              <li>你的權力稽核追蹤表</li>
              <li>資源</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-4">本指南與其他指南的關聯</h3>
            <ul className="space-y-2">
              {[
                { label: "職涯方向", link: "/zh-tw/ikigai-guide", text: "Ikigai 職涯指南與轉職指南" },
                { label: "辦公室政治", link: "/zh-tw/office-politics-guide", text: "辦公室政治指南（完整框架）" },
                { label: "升遷", link: "/zh-tw/career-game-guide", text: "職涯晉升攻略" },
                { label: "面試", link: "/zh-tw/interview-preparation-guide", text: "面試攻略" },
                { label: "Offer", link: "/zh-tw/job-offer-guide", text: "工作錄取指南" },
                { label: "薪資", link: "/zh-tw/salary-starter-kit", text: "薪資談判指南" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm"><strong>{item.label}：</strong><Link to={item.link} className="text-gold hover:underline">{item.text}</Link></span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-6">
            需要什麼就讀什麼。不需要的先跳過。之後再回來看。
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
                <h2 className="font-heading text-2xl md:text-3xl text-foreground">先找到你的方向</h2>
              </div>
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6">
              沒有方向的權力，是浪費精力。在你學習職場策略之前，先回答一個問題：你在為了什麼而努力？
            </p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">你的獨特性就是你的力量</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              在 48 條法則之前，有一個更深層的概念：你的「人生任務」（Life's Task）。你是獨一無二的。你的 DNA、你的經歷、你的大腦。忽略自己的獨特性，等於讓自己和履歷堆裡的其他人沒有任何差別。
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              找到方向的線索藏在你的童年。在別人告訴你什麼才「務實」之前，什麼事情吸引著你？哪些科目讓你忘了時間？什麼感覺像在玩，而其他一切都像在苦撐？
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              「第一步是最重要的：選擇一條符合你天性和興趣的職涯路線。在相關領域盡可能多發展技能。」
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              「最大的職涯危險，就是你可以被取代。」順著你獨特的天性走，是唯一真正的保護。
            </p>

            <ActionStep checked={safeActions[0]} onToggle={() => toggleAction(0)}>
              寫下童年三件你熱愛的事情（在任何人告訴你什麼才務實之前）。然後寫下目前工作中三件給你同樣感覺的事情。尋找重疊之處。如果沒有重疊，這個月把童年的某個技能帶進你現在的工作裡。找一個可以運用它的專案。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">活時間 vs. 死時間</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              死時間：上班打卡、下班打卡、什麼都沒學到。你只是在撐過一天。
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              活時間：你把每一份工作當教室。即使是一份爛工作，只要你觀察、學習、累積技能，都能教你東西。
            </p>
            <p className="text-foreground leading-relaxed mb-6 italic">
              「人生中最糟的事，就是你恨你的工作，沒有精力，沒有創意，也沒在想未來。對我來說，那跟死了沒兩樣。」
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              那 50 多份工作？全都是活時間。每一份都增加了一項技能、一個觀點、或一個後來用在書裡的故事。
            </p>

            <DiagramBox title="活時間稽核表">
              <p className="mb-3">為你目前的工作評分。每項 1-5 分。</p>
              <div className="space-y-4">
                {ALIVE_AUDIT_QUESTIONS.map((q, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <p className="flex-1 text-foreground text-sm">{i + 1}. {q}</p>
                    <div className="shrink-0 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} onClick={() => setAliveScore(i, n)}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${safeAlive[i] === n ? "bg-gold text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-2">
                  你的分數：<span className={`text-lg font-bold ${aliveTotal >= 20 ? "text-emerald-500" : aliveTotal >= 12 ? "text-gold" : aliveTotal > 0 ? "text-red-500" : "text-muted-foreground"}`}>{aliveTotal}</span> / 25
                </p>
                <div className="space-y-1">
                  <p><strong>20-25：</strong>強勁的活時間。繼續累積。</p>
                  <p><strong>12-19：</strong>混合。你正在浪費成長機會。</p>
                  <p><strong>5-11：</strong>死時間。開始把這份工作當學校，或開始規劃離開。</p>
                </div>
              </div>
            </DiagramBox>

            <ActionStep checked={safeActions[1]} onToggle={() => toggleAction(1)}>
              如果你的分數低於 12，這週從你現在的工作中挑一件事情學。不需要跟你的職稱有關。研究預算怎麼被批准。觀察你團隊裡表現最好的人怎麼溝通。讀公司的投資人簡報。從今天開始，把死時間變成活時間。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">職涯早期：技能重於薪水</h3>
            <p className="text-foreground leading-relaxed mb-6 italic">
              「你在這個過程中追求的黃金，是學習和技能的累積。不是一大筆薪水。」
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              這不代表接受低薪。這代表在你還在建立技能庫的階段，不要只看薪水選工作。把它想成「駭客模式」的職涯發展。「未來屬於那些學習更多技能，並以創新方式組合它們的人。」
            </p>

            <ActionStep checked={safeActions[2]} onToggle={() => toggleAction(2)}>
              列出你所有工作中累積的每一項技能。包含副業和有可轉移技能的嗜好。哪兩三項技能疊在一起，會讓你很難被取代？找出你技能組合中的缺口。然後在接下來 30 天內找一個專案、課程或任務開始補上。
            </ActionStep>

            <p className="text-muted-foreground leading-relaxed mt-6">
              一旦有了方向，下一步是學習在組織內運作。而你需要先了解的第一個人，就是你的主管。
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              完整的自我探索框架，請參考 <Link to="/zh-tw/ikigai-guide" className="text-gold hover:underline">Ikigai 職涯指南</Link>。
            </p>
          </div>
        </section>

        {/* ── Section 2: Manage Up ── */}
        <section id="manage-up" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="02" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">向上管理</h2></div>
            </div>
            <p className="text-foreground text-lg leading-relaxed mb-6">你的直屬主管控制你的任務分配、你的績效考核、你的能見度，以及你的升遷。搞砸這段關係，這本指南裡的其他內容都不重要了。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">向上管理不是操控。是覺察。大多數主管表面上有頭銜，內心卻帶著脆弱的自尊和隱藏的不安全感。理解這個現實，是駕馭它的第一步。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">三條法則構成向上管理的基礎：讓你的主管看起來好、說話精準、知道什麼時候退讓。</p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 1：永遠不要蓋過你的上司</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">它被列為法則 1 是有原因的。這是職場中最常見的錯誤。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">書中的故事：路易十四的財政大臣 Nicolas Fouquet 舉辦了一場華麗到讓國王感覺被比下去的宴會。花園比國王的壯觀，食物更豐盛，娛樂更精彩。三週後，Fouquet 被逮捕。他餘生都在監獄中度過。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">職場版本沒那麼戲劇化，但結果類似。如果你做出優秀的工作成果，又因此獲得高度關注，你冒著觸發主管不安全感的風險。結果不是坐牢。是被邊緣化、被跳過升遷、或被管理出局。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">解決辦法不是做差一點。是在成功的同時讓你的主管也分享到光環。記錄你的貢獻。但在公開場合讓你的主管發光。這個教訓在好萊塢上演了很多年。為一位導演寫了大量對白，功勞全歸導演。當時很刺痛。但組織就是這樣運作的。幕後的人打基礎。台前的人拿聚光燈。聰明的做法是在後台當關鍵人物，而不是在台上被嫉妒。</p>
            <Reversal>如果你的主管正在走下坡或即將離開，超越他們會加速他們被替換。但你需要在他們之上有盟友，以及萬一失敗的退路計畫。</Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[3]} onToggle={() => toggleAction(3)}>
                這週找一個方法主動讓你的主管看起來好。傳給他們一份重點摘要，是他們能轉寄給他們主管的那種。準備一張他們在下次主管會議中能用的投影片。目標：讓他們把你和「讓我工作更輕鬆的人」劃上等號。
              </ActionStep>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 4：永遠少說一點</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">法則 1 管的是你做什麼。法則 4 管的是你說什麼。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">想想季辛吉助手 Winston Lord 的故事。Lord 起草了一份報告。季辛吉退回去，只寫了一句：「這是你能做到的最好的嗎？」Lord 重寫了。季辛吉又退回來，同樣的話。Lord 第三次重寫。提交時他說：「是的，這是我能做到的最好的。」季辛吉回答：「好。現在我來讀。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">大多數人在會議中話太多。重複要點。加上修飾語。用廢話填補沉默。每多一句話都稀釋了你的訊息，讓你看起來更不自信。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">做法：精準地說。當你向主管或團隊報告時，目標三句話。</p>

            <DiagramBox title="三句話報告格式">
              <div className="space-y-2">
                <p><strong>發生了什麼：</strong>[一句話描述進度/成果]</p>
                <p><strong>下一步：</strong>[一句話描述接下來的計畫]</p>
                <p><strong>需要什麼：</strong>[一句話描述障礙/請求]</p>
              </div>
              <p className="mt-4 text-muted-foreground">用這個格式寫 email 更新、站會報告、進度報告。三句話。不囉唆。</p>
            </DiagramBox>

            <ActionStep checked={safeActions[4]} onToggle={() => toggleAction(4)}>
              在你的下一次會議中，用上面的三句話格式準備你的報告。開會前先寫下來。計時。如果超過 60 秒，再精簡。每週練習，直到變成自動反應。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 22：運用投降策略</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">法則 1 教你讓主管發光。法則 4 教你精準。法則 22 教你何時退讓。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">當你的主管做錯了，你也知道他錯了，本能反應是反擊。是頂回去。是證明你的觀點。但在公開場合跟主管對幹，很少幫你拿到升遷。更常讓你得到「很難搞」的名聲。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「當你處於弱勢，絕對不要為了面子而戰。選擇投降。投降讓你有時間恢復，有時間等對方的權力衰退。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">爛主管會被輪調走。組織改組會發生。領導層會換人。耐心是武器。在小事上優雅退讓的員工，會在大事上贏得信任。每場仗都打的員工，很快就用光了別人對他的善意。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">這不代表當軟柿子。這代表分辨哪些仗值得打，哪些退讓能保存你的精力和位置。如果情況涉及倫理或法律底線，正確的做法是記錄和向上反映，不是投降。</p>

            <BossManagementMatrix />

            <p className="text-muted-foreground leading-relaxed mt-6">向上管理讓你安全。但光靠安全不會推進你的職涯。要做到這一點，你需要讓主管以外的人知道你的名字。那就是聲譽。</p>
          </div>
        </section>

        {/* ── Section 3: Build Your Reputation ── */}
        <section id="reputation" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="03" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">建立你的聲譽</h2></div>
            </div>
            <p className="text-foreground text-lg leading-relaxed mb-6">你的聲譽比你先走進每一個房間。它走進每一場面試、每一次新團隊會議、每一個升遷委員會。在任何人讀你的履歷之前，他們已經從別人口中聽過你了。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「聲譽是權力的基石。光靠聲譽你就能威懾和勝出。一旦聲譽滑落，你就會暴露弱點，從四面八方遭到攻擊。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">三個面向決定你在職場的聲譽：你保護它的能力、你的能見度、以及你如何處理別人的嫉妒。</p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 5：用生命守護你的聲譽</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">聲譽是複利累積的。一個糟糕的瞬間傳播得比 100 件好事更快。在研討會上一句不專業的話、LinkedIn 上一篇抱怨前公司的文章、一封措辭不當被轉寄的 email。這些在專業人脈網路中傳播的速度，比任何成就都快。</p>
            <p className="text-muted-foreground leading-relaxed mb-4">守護聲譽的規則：</p>
            <ul className="space-y-2 mb-6">
              {["永遠不要說前公司、前主管、前同事的壞話。面試中不行。LinkedIn 上不行。下班聚會不行。", "假設每封 email 都會被轉寄。寫之前想清楚。", "假設每則 Slack 訊息都會被截圖。打字前想清楚。"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-6">聲譽是你職涯中最有價值的資產。也是最容易摧毀的。</p>
            <ActionStep checked={safeActions[5]} onToggle={() => toggleAction(5)}>
              現在就 Google 你自己。檢查 LinkedIn、社群媒體和任何公開資訊。如果搜尋結果不符合你想成為的專業形象，今天就修正。刪掉舊貼文。更新你的 LinkedIn 標題。問一個信任的朋友：「別人第一次見到我之後，會怎麼描述我？」如果答案讓你意外，你有工作要做。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 6：不惜一切代價吸引注意</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">守護聲譽讓你安全。但只有安全沒有能見度，只會讓你原地踏步。道理很直白：「一切都是以外表來評斷。看不見的東西，等於不存在。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">安靜做事，期待成果自己說話的人，每次都會被跳過。不是因為工作做得差。是因為沒有人看到。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">做法很具體：主動參與能讓新人看到你名字的專案。自己報告自己的工作成果，不要讓別人代為報告。高層來訪時舉手。寫有你名字的內部更新和總結。</p>
            <ActionStep checked={safeActions[6]} onToggle={() => toggleAction(6)}>
              找出一個你在做事但別人拿到能見度的專案。在下一次團隊會議中主動報告它，或寫一份有你名字的書面總結。每月做一次。一季之內，高層主管會知道你的名字。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 46：永遠不要表現得太完美</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">聲譽和能見度會產生一個新問題：嫉妒。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">嫉妒是「最常見的人類情緒，也是最少被討論的。」那個總是贏、總是交出成果、總是被表揚、從不顯露脆弱的同事，會成為目標。不是公開的。是悄悄的。透過私下的批評、隱瞞的資訊、微妙的打壓。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">解藥是策略性的脆弱。公開而提早地承認錯誤。讓別人看到你請求協助。大方地分享功勞。不要假裝弱點。人們一眼看穿表演出來的謙虛。但讓別人看到你的人性，和你的能力並存。</p>

            <ReputationFlywheel />

            <p className="text-muted-foreground leading-relaxed mt-6">聲譽讓你被注意到。但被注意到和被需要是不一樣的。下一節講的是兩者的差別。</p>
          </div>
        </section>

        {/* ── Section 4: Become Irreplaceable ── */}
        <section id="irreplaceable" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="04" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">讓自己無可取代</h2></div>
            </div>
            <p className="text-foreground text-lg leading-relaxed mb-6 italic">「人們會在不需要你的那一刻把你丟掉。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">聲譽讓人尊重你。無可取代讓人害怕失去你。兩者加在一起，是職涯安全感的基礎。</p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 11：學會讓人依賴你</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">這是職涯安全感最重要的一條法則。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「要維持你的獨立，你必須始終被需要、被想要。越多人依賴你，你的自由度越大。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">具體做法：掌握一個流程、一個客戶關係、或一個沒有其他人完全理解的知識領域。成為出問題時被打電話的那個人。在跨部門建立關係，讓你的價值延伸到直屬團隊之外。一旦你累積了不可或缺的紀錄，你就贏得了開口要更多的底氣。但要有耐心。讓它透過過程自然累積。</p>
            <Reversal>不要因為恐懼而囤積資訊。囤積的人會變成瓶頸。瓶頸最終會被繞過和移除。分享到足夠慷慨的程度。保留到足夠關鍵的程度。</Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[7]} onToggle={() => toggleAction(7)}>
                找出你在工作中做的一件沒有其他人完全理解的事情。如果你請假兩週，團隊會很吃力嗎？如果會，你有一定程度的不可取代性。如果不會，開始建立它。選擇一個流程、一個客戶關係、或一個知識領域，深入到比團隊中任何人都深。
              </ActionStep>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 23：集中你的力量</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">法則 11 告訴你要深入。法則 23 告訴你深入的方向。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「強度每次都勝過廣度。當你在尋找能提升你的力量來源時，找到那個關鍵的贊助人，那頭能長期供你牛奶的肥牛。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">大多數人把自己攤在太多專案、太多委員會、太多「有也不錯」的事情上。結果：每件事都做得普普通通，沒有一件做得出色。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">選定兩到三個優先事項。其餘的推掉。在少數高影響力的交付項目上做到深入，勝過在十幾個無人記住的事情上做到廣泛。</p>
            <ActionStep checked={safeActions[8]} onToggle={() => toggleAction(8)}>
              數一數你現在正在參與的活躍專案有幾個。如果超過 5 個，你太分散了。挑出影響力和能見度最高的 2-3 個。對其餘的說不。「我很想幫忙，但我目前在 [高影響力專案] 上已經滿載了。下一季可以再看看嗎？」推掉是一項職涯技能。
            </ActionStep>

            <DiagramBox title="職涯安全感的 3 條法則">
              <ol className="space-y-3 list-decimal list-inside">
                <li><strong>法則 11：讓人依賴你</strong> — 讓你變得不可或缺。</li>
                <li><strong>法則 13：訴諸他人的利益</strong> — 幫你拿到你想要的。</li>
                <li><strong>法則 29：規劃到最後一步</strong> — 讓你的職涯保持方向。</li>
              </ol>
            </DiagramBox>

            <DiagramBox title="不可取代性稽核表">
              <p className="mb-3">回答每個問題。點選你的分數（0-2）。</p>
              <div className="space-y-4">
                {IRREPLACEABLE_QUESTIONS.map((item, i) => (
                  <div key={i}>
                    <p className="text-foreground text-sm mb-1">{i + 1}. {item.q}</p>
                    <div className="flex items-center gap-1.5 ml-4">
                      {[0, 1, 2].map(n => (
                        <button key={n} onClick={() => setIrrepScore(i, n)}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${safeIrrep[i] === n ? "bg-gold text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
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
                  你的分數：<span className={`text-lg font-bold ${irrepTotal >= 7 ? "text-emerald-500" : irrepTotal >= 4 ? "text-gold" : irrepTotal > 0 ? "text-red-500" : "text-muted-foreground"}`}>{irrepTotal}</span> / 10
                </p>
                <div className="space-y-1">
                  <p><strong>0-3：</strong>可被取代。從今天開始建立你的位置。</p>
                  <p><strong>4-6：</strong>有價值。繼續強化你的位置。</p>
                  <p><strong>7-10：</strong>不可取代。現在專注於成長。</p>
                </div>
              </div>
            </DiagramBox>

            <p className="text-muted-foreground leading-relaxed mt-6">不可取代讓你有底氣開口。下一節講的是怎麼開口。</p>
          </div>
        </section>

        {/* ── Section 5: Get What You Want ── */}
        <section id="get-what-you-want" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="05" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">爭取你想要的</h2></div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">你找到了方向。你做好了向上管理。你建立了聲譽。你讓自己不可取代。現在你需要把這一切轉換成加薪、升遷、和值得拿到的專案。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">三條法則涵蓋這個過程：怎麼包裝你的請求、怎麼證明你的案例、以及過程中怎麼展現自己。</p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 13：訴諸他人的利益，而非同情或感恩</h3>
            <p className="text-foreground leading-relaxed mb-6 italic">「如果你需要向盟友求助，不要費心提醒他你過去幫過他什麼。他會找到方法忽略你。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">走進加薪談話時，永遠不要說「我在這裡三年了，我值得加薪。」沒有人因為年資而升遷。要展示的是：升你對他們有什麼好處。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">先證明你是不可或缺的。累積紀錄。讓案例不言自明。「到時候一切順理成章，你提出來，自然有道理。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">換個說法：「這是我交出的成果。這是我接下來計畫交出的成果。這是讓我做到最好的職位和薪資水準。」每一句話都聚焦在他們得到什麼，不是你值得什麼。</p>
            <ActionStep checked={safeActions[9]} onToggle={() => toggleAction(9)}>
              現在就用這個框架寫你的加薪請求。三句話。你交出了什麼（附數字）。你接下來計畫交出什麼。你需要什麼才能做到最好。先不要寄出。花一週精修。然後約一場會議。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 9：用行動勝出，永遠不要用爭論</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">法則 13 告訴你怎麼包裝請求。法則 9 告訴你帶什麼上場。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">不要爭論你為什麼該升遷。用證據建立案例。每週追蹤你的成果。記錄一份戰績文件。績效考核到來時，你拿出 12 個月有文件紀錄的影響力，而不是在那裡努力回想你做了什麼。</p>

            <BragDocTemplate />

            <ActionStep checked={safeActions[10]} onToggle={() => toggleAction(10)}>
              設定每週五下午 4 點的 5 分鐘行事曆提醒。標題「戰績文件」。填寫上面的四個欄位。連續做 12 週。績效考核時，你會有 12 週有紀錄的成果，而其他人都在努力回想自己做了什麼。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 30：讓成就看起來毫不費力</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">法則 13 包裝請求。法則 9 提供證據。法則 30 管的是整個過程中你的姿態。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「你的行動必須看起來自然而輕鬆。所有的辛苦、練習和巧妙的技巧，都必須被隱藏。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">沉穩的能力展現傳達領導潛力。明顯的恐慌和壓力傳達你還沒準備好承擔更多責任。同樣的簡報，冷靜交出的人看起來比一邊報告一邊強調自己加了多少班的人更適合升遷。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">交出成果。讓成果自己說話。不要在每一份產出上附加「這真的很辛苦」的敘事。如果你需要更多資源或更多時間，清楚而專業地提出要求。不要當烈士。</p>
            <ActionStep checked={safeActions[11]} onToggle={() => toggleAction(11)}>
              下次專案交付時，移除所有「辛苦語言」。不提加班、週末、或壓力。報告成果。描述影響。停在那裡。觀察當你展現沉穩而非疲憊時，人們的反應有什麼不同。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">加薪時機公式</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">先證明你不可或缺，然後再開口。</p>
            <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">最佳時機：</strong>在一個明顯的勝利之後。一次成功的產品上線、一個強勁的季度成果、一個被高層讚揚的專案完成。你的主管在這個位置上比較容易說好。趁著勢頭。</p>
            <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">最差時機：</strong>預算凍結期間、裁員期間、或你的主管正在承受壓力的時候。即使你的理由很充分，組織情境也會擋住一個「好」的回答。</p>
            <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">格式：</strong>不要突襲你的主管。要求一場專門的會議。帶著你的戰績文件、一個明確的數字、和一個以未來影響力為框架的理由。</p>
            <p className="text-muted-foreground leading-relaxed">薪資談判策略，請參考 <Link to="/zh-tw/salary-starter-kit" className="text-gold hover:underline">薪資談判指南</Link>。</p>
            <p className="text-muted-foreground leading-relaxed mt-6">爭取你想要的，不只需要對主管的策略。還需要解讀你周圍更廣泛的人際和聯盟網路。那就是政治。</p>
          </div>
        </section>

        {/* ── Section 6: Survive Office Politics ── */}
        <section id="office-politics" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="06" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">在辦公室政治中生存</h2></div>
            </div>
            <p className="text-foreground text-lg leading-relaxed mb-6">人的問題就是權力的問題。「要在你的領域做得好，你必須懂得跟人打交道。這佔了任何權力情境至少一半以上的比重。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">辦公室政治不是工作的腐敗。是人類群體的運作方式。每個組織都有聯盟、對立、不成文規定、以及按不同規則行事的人。三條法則涵蓋：看懂局勢、選擇盟友、挑選戰場。</p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 19：了解你在跟誰打交道</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">在任何組織中，你都會遇到五種危險的人。</p>
            <ol className="space-y-2 mb-6 list-decimal list-inside">
              <li className="text-foreground text-sm"><strong>自大型。</strong>對感知到的冒犯進行報復。</li>
              <li className="text-foreground text-sm"><strong>不安全型。</strong>把一切都當針對自己。</li>
              <li className="text-foreground text-sm"><strong>多疑型。</strong>到處看到敵人。</li>
              <li className="text-foreground text-sm"><strong>算計型。</strong>每一次互動都精心設計，為了自己的利益。</li>
              <li className="text-foreground text-sm"><strong>記仇型。</strong>永遠記恨。</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mb-4">在你做出任何重大動作之前，問三個問題：</p>
            <ol className="space-y-1 mb-6 list-decimal list-inside text-foreground text-sm">
              <li>誰從中得利？</li>
              <li>誰從中受損？</li>
              <li>我的話被最壞的方式解讀，會變成什麼？</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mb-6">如果三個都回答不出來，先慢下來。</p>
            <ActionStep checked={safeActions[12]} onToggle={() => toggleAction(12)}>
              在你下一封敏感的 email、會議邀請或向上反映之前，暫停，在紙上回答那三個問題。在桌上貼一張便條：「誰得利？誰受損？最壞的解讀？」養成習慣。這個過濾器防止的職涯傷害，比本指南中任何其他習慣都多。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 10：遠離不幸和倒楣的人</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">知道你在跟誰打交道之後，下一個問題是你跟誰共度時間。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「你會死於別人的苦難。情緒狀態像疾病一樣有傳染力。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">職場中，負面情緒傳播的速度比能力快。午餐桌上的慣性抱怨者、每場會議都散播冷嘲熱諷的團隊成員、對所有人說閒話的同事。跟這些人待在一起，你的聲譽也會被拖下水。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">有意識地選擇你的午餐桌、你的 Slack 頻道、和你的盟友。對所有人友善。但把你的時間和精力投入在建設的人身上，不是拆台的人。</p>
            <ActionStep checked={safeActions[13]} onToggle={() => toggleAction(13)}>
              盤點你的 5 個最主要的工作關係。你最常跟誰相處？他們是建設者還是抱怨者？如果超過兩個是慣性抱怨者，開始拉開距離。換個位置吃午餐。加入不同的 Slack 頻道。距離塑造觀感。刻意選擇。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 38：想怎麼想都行，但表現得跟別人一樣</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">法則 19 和 10 教你看人和選圈子。法則 38 教你怎麼在圈子裡運作。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「如果你大張旗鼓地反對時代潮流，炫耀你的非主流想法和不正統的做法，人們會認為你只是想要引人注目，並且看不起他們。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">不要當那個對每一項政策都反對、挑戰每一個規範、鄙視每一個公司傳統的叛逆者。即使你是對的，持續叛逆的代價是孤立。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">這對內向的人格外相關。「第一件事是不要試著成為你不是的人。如果你是內向的，愛上這一點。」但要學會遊戲的社交規則。理解文化。在其中運作，同時私下保持你自己的判斷。</p>
            <Reversal>沒有界線的順從會變成軟弱。知道你的底線在哪裡。有些山頭值得為之犧牲。刻意選擇。</Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[14]} onToggle={() => toggleAction(14)}>
                寫下你的三條不可妥協的專業底線。這些是無論壓力多大你都不會跨越的線：倫理的、個人的、或專業的。例如：「我不會對客戶說謊。」「我不會把別人的功勞據為己有。」「我不會對安全問題保持沉默。」在壓力來臨之前就知道你的底線，是正直和遺憾之間的差別。
              </ActionStep>
            </div>

            <DiagramBox title="辦公室權力地圖">
              <div className="space-y-4">
                <div><p className="font-medium mb-1">誰有真正的影響力？（不是頭銜。是誰的話人們真的在聽？）</p><p className="text-muted-foreground">列出組織中真正有影響力的 3 個人。</p></div>
                <div><p className="font-medium mb-1">誰和誰是盟友？</p><p className="text-muted-foreground">畫出關鍵的聯盟。</p></div>
                <div><p className="font-medium mb-1">誰和誰有衝突？</p><p className="text-muted-foreground">找出正在發生的緊張關係。</p></div>
                <div>
                  <p className="font-medium mb-1">你在哪裡？</p>
                  <ul className="text-muted-foreground space-y-1 ml-4 list-disc">
                    <li>和有影響力的人結盟</li>
                    <li>中立 / 不在地圖上</li>
                    <li>不小心落入衝突地帶</li>
                  </ul>
                  <p className="text-gold mt-2 text-sm font-medium">如果你不在地圖上，你是隱形的。如果你在衝突地帶，選邊或撤離。</p>
                </div>
              </div>
            </DiagramBox>

            <p className="text-muted-foreground leading-relaxed mt-6">
              完整的政治生存框架，請參考 <Link to="/zh-tw/office-politics-guide" className="text-gold hover:underline">辦公室政治指南</Link>。
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              政治保護你。但你的職涯還需要一個比當前這一季更長遠的方向。那就是長期賽局。
            </p>
          </div>
        </section>

        {/* ── Section 7: Play the Long Game ── */}
        <section id="long-game" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="07" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">打長期戰</h2></div>
            </div>
            <p className="text-foreground text-lg leading-relaxed mb-6 italic">「人生中真正的成功和真正的權力，是持續 10 年、20 年、30 年的。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">《乘勝追擊的48條法則》在 1998 年出版。作者寫這本書時 39 歲。他之前那 50 多份「失敗」的工作，成了整本書的基礎。每段職涯在中途都看起來很亂。問題是這些混亂是否在朝著某個方向累積。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「大多數人想要簡單、直接、筆直的路通往完美的位置和成功。但你必須歡迎走錯路和犯錯。它們讓你意識到自己的缺點。它們拓寬你的經驗。它們讓你更堅韌。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">四條法則涵蓋：規劃、時機、適應力、和知道何時停下。</p>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 29：規劃到最後一步</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">這是職涯成功三大法則之一。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「結局就是一切。一路規劃到結局，把所有可能的後果、障礙、和可能逆轉你辛苦成果的命運轉折都考慮進去。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">從你五年後想到達的位置倒推回來。每一份工作都是跳板，不是終點。接受一個新職位之前，問自己：「這份工作是否讓我更接近我想到達的地方？」</p>
            <ActionStep checked={safeActions[15]} onToggle={() => toggleAction(15)}>
              寫下你 5 年後理想的職稱。然後列出你的履歷缺少的 3 項技能或經驗。現在看你目前的工作：它是否填補了其中任何缺口？如果是，加倍投入。如果不是，開始規劃你的下一步。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 35：掌握時機的藝術</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">規劃給你方向。時機決定你的行動是否著陸。</p>
            <p className="text-foreground leading-relaxed mb-6 italic">「永遠不要顯得匆忙。匆忙暴露你對自己缺乏控制，也對時間缺乏控制。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">時機管控三個職涯決定：何時留下、何時離開、何時開始新事物。太多人離職太早（在建立紀錄之前）或太晚（在停止成長之後）。最佳的時間點是待得夠久來建立聲譽，但在工作變成死時間之前離開。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">職涯早期，為學習速度優化。「二十幾歲的時候，不要太看重錢和加薪。真正重要的是責任感和經驗。是更大的格局。」後來，為定位優化。讓你的行動時機配合市場對你技能組合的需求。</p>
            <Reversal>耐心如果待太久不成長，會變成停滯。如果你在同一個職位待了三年沒有發展，問題不是時機。是這份工作。</Reversal>
            <div className="mt-6">
              <ActionStep checked={safeActions[16]} onToggle={() => toggleAction(16)}>
                誠實回答：你在目前的工作還在學習嗎？如果答案已經是「沒有」超過 6 個月，開始準備離開。更新你的履歷。啟動你的人脈。不要等完美時機。離開的正確時間，是在你走投無路之前。
              </ActionStep>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 48：保持無形</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">規劃設定目的地。時機控制節奏。但路徑本身永遠不會是直的。「接受這個事實：沒有什麼是確定的，沒有法則是固定的。保護自己最好的方式，是像水一樣流動和無形。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">這本書本身就是證明。新聞業、電視、劇場、電影、偵探社、飯店。每份工作在當時看起來都是隨機的。加在一起，它們提供了寫書需要的每一項技能。寫作教會組織思緒。歷史教會想法。那些隨機的工作教會了人類心理學。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">如果你起步較晚？「你必須培養適合這個方向轉變的新技能組合，並找到方法將它們和你之前的技能融合。在這個過程中，沒有任何東西是浪費的。」</p>
            <ActionStep checked={safeActions[17]} onToggle={() => toggleAction(17)}>
              寫下一項超出你目前工作職責但值得在未來 6 個月學習的技能。不是因為你的主管要求。是因為市場在 3-5 年後會獎勵它。從每週 30 分鐘開始。這就是無形的起點。
            </ActionStep>

            <h3 className="font-heading text-xl text-foreground mt-10 mb-4">法則 47：在勝利中學會停下</h3>
            <p className="text-foreground leading-relaxed mb-6 italic">「勝利的那一刻，往往是最危險的時刻。在勝利的熱潮中，傲慢和過度自信會推著你越過你原本瞄準的目標。」</p>
            <p className="text-muted-foreground leading-relaxed mb-6">拿到升遷了？不要立刻開始爭取下一次。先鞏固。在你的新層級建立關係。先證明你屬於這個層級，再推進。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">分清鞏固和混日子的差別。鞏固是有意識的：為下一步行動建立基礎。混日子是被動的：你停止成長了。</p>

            <DiagramBox title="職涯時間軸">
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-foreground">20 多歲：技能累積</p>
                  <p className="text-muted-foreground">優先順序：什麼都學。對困難的任務說好。建立你的工具箱。薪水是次要的。「你追求的黃金是學習和技能的累積，不是一大筆薪水。」</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">30 多歲：定位</p>
                  <p className="text-muted-foreground">優先順序：把你的技能組合成獨特的東西。建立聲譽。找到你的利基。開始帶人。</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">40 歲以上：最大影響力</p>
                  <p className="text-muted-foreground">優先順序：發揮你獨特組合的最大影響力。指導他人。建立系統。創造遺產。</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-medium text-gold">任何年齡：這本書在作者 39 歲時出版。「開始這個過程，永遠不嫌晚。」</p>
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
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">48 條法則完整速查表</h2></div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">以上章節涵蓋了對你日常職涯最相關的 15 條法則。但書中有 48 條，其餘 33 條每天也在職場中上演。</p>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">每條法則標記為：</p>
              <div className="flex flex-wrap gap-2">
                {(["ALL", "USE", "DEFEND", "AVOID"] as const).map(tag => (
                  <button key={tag} onClick={() => setLawFilter(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      lawFilter === tag
                        ? tag === "USE" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : tag === "DEFEND" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : tag === "AVOID" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gold/15 text-gold"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}>
                    {tag === "ALL" ? `全部 (${allLaws.length})` : `${tagLabels[tag]} (${allLaws.filter(l => l.tag === tag).length})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-muted/30 border border-border p-3 mb-6 space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span><strong className="text-foreground">使用</strong> <span className="text-muted-foreground">— 主動運用，作為職涯策略</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span><strong className="text-foreground">防禦</strong> <span className="text-muted-foreground">— 辨認別人何時對你使用。保護自己</span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <span><strong className="text-foreground">避免</strong> <span className="text-muted-foreground">— 風險太高或有倫理疑慮</span></span>
              </div>
            </div>

            <div className="space-y-3">
              {filteredLaws.map(law => (
                <Collapsible key={law.num} title={`法則 ${law.num}：${law.title}`} tag={law.tag}>
                  <div className="space-y-3 pt-2">
                    <p className="text-foreground text-sm">{law.workplace}</p>
                    <p className="text-muted-foreground text-sm"><em>案例：{law.example}</em></p>
                    <p className="text-sm"><span className="text-gold font-medium">行動：</span>{law.action}</p>
                  </div>
                </Collapsible>
              ))}
            </div>

            <div className="mt-8 bg-card border border-border rounded-xl p-5 md:p-6">
              <h4 className="font-heading text-base text-gold mb-3">按標記分類</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li><strong>使用（主動運用）：</strong>法則 1、4、5、6、9、10、11、13、16、18、22、23、24、25、28、29、30、34、35、36、38、43、45、46、47、48（26 條）</li>
                <li><strong>防禦（辨認與保護）：</strong>法則 2、3、7、8、12、14、20、21、26、27、31、32、33、37、39、40、41、42、44（19 條）</li>
                <li><strong>避免（風險太高）：</strong>法則 15、17（2 條）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 9: Power Audit Tracker ── */}
        <section id="power-audit" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="09" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">你的權力稽核追蹤表</h2></div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">用這份追蹤表每 90 天衡量一次你的位置。根據上面的指南章節，為每個領域評分 1-5。</p>

            <DiagramBox title="你的權力稽核">
              <p className="mb-4">每個領域評分 1-5。每 90 天重複。</p>
              <div className="space-y-4">
                {AUDIT_AREAS.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.area}</p>
                      <p className="text-muted-foreground text-sm">{item.question}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} onClick={() => setScore(i, safeScores[i] === n ? 0 : n)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${safeScores[i] === n ? "bg-gold text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-3">
                  你的分數：<span className={`text-lg font-bold ${auditTotal >= 28 ? "text-emerald-500" : auditTotal >= 20 ? "text-gold" : auditTotal >= 12 ? "text-amber-500" : auditTotal > 0 ? "text-red-500" : "text-muted-foreground"}`}>{auditTotal}</span> / 35
                </p>
                <div className="space-y-1">
                  <p><strong>28-35：</strong>位置穩固。專注於成長和影響力。</p>
                  <p><strong>20-27：</strong>基礎扎實。一兩個領域需要注意。</p>
                  <p><strong>12-19：</strong>暴露弱點。挑最弱的領域。接下來 90 天專注在那。</p>
                  <p><strong>低於 12：</strong>職涯風險。今天就從向上管理和不可取代性開始。</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-2">評分之後：</p>
                <ol className="space-y-1 list-decimal list-inside text-muted-foreground text-sm">
                  <li>圈出你的最低分。</li>
                  <li>重讀那個領域的章節。</li>
                  <li>從那個章節挑一個行動步驟。</li>
                  <li>這週執行。</li>
                  <li>90 天後重新評分。</li>
                </ol>
              </div>
            </DiagramBox>

            <DiagramBox title="90 天權力稽核循環">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { day: "第 1 天", action: "7 個領域全部評分。找出最弱的領域。選一個行動步驟。", feel: "「我知道我的位置。」" },
                  { day: "第 30 天", action: "檢查：我是否執行了最弱領域的行動步驟？如果沒有，今天做。", feel: "「我正在行動。」" },
                  { day: "第 60 天", action: "檢查：我最弱的領域是否在改善？如果沒有就調整。選第二個行動步驟。", feel: "「我看到進步。」" },
                  { day: "第 90 天", action: "重新為 7 個領域評分。比較。選下一個最弱領域。", feel: "「我在成長。」" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-medium text-foreground text-sm">{item.day}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.action}</p>
                    <p className="text-gold text-xs mt-2 italic">{item.feel}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4">重複：下一個 90 天循環。專注在你新的最弱領域。隨時間堆疊改善。</p>
            </DiagramBox>

            <p className="text-muted-foreground leading-relaxed mt-6">
              追蹤表在你整個職涯中都是同樣的運作方式。你最弱的領域會隨著你的成長改變。48 條法則不變。你對它們的理解每一季都會加深。
            </p>
          </div>
        </section>

        {/* ── Section 10: Resources ── */}
        <section id="resources" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="10" />
              <div className="pt-3"><h2 className="font-heading text-2xl md:text-3xl text-foreground">資源</h2></div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">原著</h3>
                <p className="text-muted-foreground">《乘勝追擊的48條法則》（The 48 Laws of Power），Robert Greene 著（1998）</p>
              </div>
              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">Robert Greene 的其他著作</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>《乘勝追擊精通篇》（Mastery，2012）</li>
                  <li>《人性18法則》（The Laws of Human Nature，2018）</li>
                  <li>《每日法則》（The Daily Laws，2021）</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">本系列其他指南</h3>
                <ul className="space-y-2">
                  {[
                    { text: "Ikigai 職涯指南", desc: "找到目標和方向", link: "/zh-tw/ikigai-guide" },
                    { text: "辦公室政治指南", desc: "完整政治生存框架", link: "/zh-tw/office-politics-guide" },
                    { text: "職涯晉升攻略", desc: "升遷全攻略", link: "/zh-tw/career-game-guide" },
                    { text: "面試攻略", desc: "拿到 offer", link: "/zh-tw/interview-preparation-guide" },
                    { text: "工作錄取指南", desc: "評估和談判 offer", link: "/zh-tw/job-offer-guide" },
                    { text: "與招募官合作指南", desc: "讓招募官注意到你", link: "/zh-tw/recruiter-guide" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <GoldCheckBadge />
                      <span className="text-foreground text-sm">
                        <Link to={item.link} className="text-gold hover:underline">{item.text}</Link>（{item.desc}）
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
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
            <p className="text-sm font-medium text-foreground">{completedActions}/{TOTAL_ACTIONS} 個行動步驟已完成</p>
            {showSaveBanner && (
              <div className="flex items-center gap-2">
                <a href={`/zh-tw/join?returnUrl=${encodeURIComponent("/zh-tw/48-laws-guide")}`} className="text-xs font-semibold text-gold hover:text-gold/80 underline underline-offset-2">
                  儲存進度
                </a>
                <button onClick={() => setBannerDismissed(true)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <InlineRating contentId="guide_48_laws_zhtw" locale="zh-tw" />
      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default FortyEightLawsGuideZhTw;
