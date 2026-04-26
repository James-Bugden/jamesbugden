import { useState, useMemo, useCallback } from "react";
import { Plus, Trash2, AlertTriangle, Download, Copy, Check, ChevronDown, X, ArrowUpDown, Bot, Sparkles, Pencil, Search, FileText, Briefcase, Target } from "lucide-react";
import { useGuideStorage } from "@/hooks/useGuideStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* ─── Types ─── */
export interface WorksheetRow {
  skill: string;
  count: string;
  experience: string;
  achievement: string;
  keywords: string[];
  bulletPoint: string;
}

interface WorksheetTab {
  id: string;
  title: string;
  rows: WorksheetRow[];
}

const emptyRow = (): WorksheetRow => ({
  skill: "", count: "1", experience: "", achievement: "", keywords: [], bulletPoint: "",
});

const createTab = (title = ""): WorksheetTab => ({
  id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
  title,
  rows: Array.from({ length: 5 }, emptyRow),
});

/* ─── i18n Labels ─── */
const LABELS = {
  en: {
    title: "Job Title Keyword Worksheet",
    subtitle: "Turn job description keywords into resume bullet points. One tab per target role.",
    skills: "Skill",
    count: "#",
    experience: "Experience",
    achievement: "Achievement",
    keywords: "Keywords",
    bulletPoint: "Resume Bullet",
    addRow: "Add Row",
    addRows: "Add 3 Rows",
    exportCsv: "Export CSV",
    clearAll: "Clear All",
    clearConfirm: "Are you sure? This will erase all data in this tab.",
    matched: "Keyword Match Rate",
    of: "of",
    skillsMatched: "skills matched",
    row: "Row",
    newTab: "New Job Title",
    renameTab: "Rename",
    deleteTab: "Delete Tab",
    deleteTabConfirm: "Delete this tab and all its data?",
    enterTitle: "Enter job title...",
    emptyState: "Enter your target job title to get started",
    emptyStateHint: "e.g. Product Manager, Data Analyst, UX Designer",
    getStarted: "Get Started",
    generateAi: "Generate with AI",
    matchAi: "Match with AI",
    buildBullet: "Build bullet with AI",
    getIdeas: "Get ideas with AI",
    copyPrompt: "Copy prompt",
    copied: "Copied!",
    target: "Target: 50%",
    sortByCount: "Sort by count",
    copyBullet: "Copy",
    selectKeywords: "Select keywords...",
    // Phase stepper
    phase1Title: "Research the Job",
    phase1Desc: "List 5–20 skills from job descriptions. Use AI to extract keywords.",
    phase2Title: "Map Your Background",
    phase2Desc: "Add your experiences and achievements that match those skills.",
    phase3Title: "Build Bullet Points",
    phase3Desc: "Tag keywords and generate optimized resume bullets.",
    // Column groups
    groupJob: "The Job",
    groupYou: "Your Background",
    groupMatch: "The Match",
    // Mobile phases
    phaseJob: "Job Skills",
    phaseBackground: "Your Background",
    phaseOutput: "Resume Output",
    credit: "Based on the Career Coach GPT system by Jeremy Schifeling, adapted by James Bugden.",
    // Placeholders
    phSkill: "e.g. Project Management",
    phExperience: "e.g. Led product launch at Acme Corp",
    phAchievement: "e.g. Increased user retention by 35%",
    phBullet: "e.g. Spearheaded product launch driving 35% retention increase",
  },
  zh: {
    title: "職稱關鍵字工作表",
    subtitle: "將職缺描述中的關鍵字轉化為履歷條列句。每個分頁對應一個目標職位。",
    skills: "技能",
    count: "#",
    experience: "經歷",
    achievement: "成就",
    keywords: "關鍵字",
    bulletPoint: "履歷條列句",
    addRow: "新增列",
    addRows: "新增 3 列",
    exportCsv: "匯出 CSV",
    clearAll: "全部清除",
    clearConfirm: "確定要清除嗎？這將刪除此分頁所有資料。",
    matched: "關鍵字匹配率",
    of: "/",
    skillsMatched: "已匹配",
    row: "第",
    newTab: "新職稱",
    renameTab: "重新命名",
    deleteTab: "刪除分頁",
    deleteTabConfirm: "刪除此分頁及所有資料？",
    enterTitle: "輸入職稱...",
    emptyState: "輸入你的目標職稱即可開始",
    emptyStateHint: "例如：產品經理、資料分析師、UX 設計師",
    getStarted: "開始",
    generateAi: "AI 產生",
    matchAi: "AI 配對",
    buildBullet: "AI 生成條列句",
    getIdeas: "AI 提供靈感",
    copyPrompt: "複製提示詞",
    copied: "已複製！",
    target: "目標：50%",
    sortByCount: "依次數排序",
    copyBullet: "複製",
    selectKeywords: "選擇關鍵字...",
    phase1Title: "研究職缺",
    phase1Desc: "從職缺描述中列出 5–20 個關鍵技能。可用 AI 擷取關鍵字。",
    phase2Title: "對應你的背景",
    phase2Desc: "加入與這些技能相關的經歷和成就。",
    phase3Title: "產生條列句",
    phase3Desc: "標記關鍵字並生成優化的履歷條列句。",
    groupJob: "職缺需求",
    groupYou: "你的背景",
    groupMatch: "最終產出",
    phaseJob: "職缺技能",
    phaseBackground: "你的背景",
    phaseOutput: "履歷產出",
    credit: "基於 Jeremy Schifeling 的 Career Coach GPT 系統，由 James Bugden 改編。",
    phSkill: "例如：專案管理",
    phExperience: "例如：在 Acme 公司主導產品上線",
    phAchievement: "例如：提升用戶留存率 35%",
    phBullet: "例如：主導產品上線，帶動留存率提升 35%",
  },
} as const;

/* ─── AI Prompt Helpers ─── */
const getSkillsPrompt = (jobTitle: string, lang: "en" | "zh") =>
  lang === "en"
    ? `Generate the 20 most important keywords from across ${jobTitle || "[JOB TITLE]"} job descriptions.`
    : `根據 ${jobTitle || "[職稱]"} 職位的職缺說明，產生 20 個最重要的關鍵字。`;

const getIdeasPrompt = (experience: string, lang: "en" | "zh") =>
  lang === "en"
    ? `What are some example numeric or eye-catching accomplishments I could list for ${experience || "[EXPERIENCE]"}?`
    : `我在 ${experience || "[經歷]"} 中可以列出哪些有數據或引人注目的成就？`;

const getMatchPrompt = (skills: string[], achievement: string, lang: "en" | "zh") =>
  lang === "en"
    ? `Which of these keywords best fit this achievement?\nKeywords: ${skills.join(", ") || "[SKILLS LIST]"}\nAchievement: ${achievement || "[ACHIEVEMENT]"}`
    : `以下哪些關鍵字最適合這項成就？\n關鍵字：${skills.join("、") || "[技能列表]"}\n成就：${achievement || "[成就]"}`;

const getBulletPrompt = (achievement: string, keywords: string[], lang: "en" | "zh") =>
  lang === "en"
    ? `Please combine this achievement and these keywords to make a great resume bullet:\nAchievement: ${achievement || "[ACHIEVEMENT]"}\nKeywords: ${keywords.join(", ") || "[KEYWORDS]"}`
    : `請將這個成就與這些關鍵字結合成一個出色的履歷條列句：\n成就：${achievement || "[成就]"}\n關鍵字：${keywords.join("、") || "[關鍵字]"}`;

/* ─── Small Components ─── */
const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 transition-colors whitespace-nowrap">
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "✓" : label}
    </button>
  );
};

const AiPromptHelper = ({ prompt, label, lang }: { prompt: string; label: string; lang: "en" | "zh" }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = LABELS[lang];

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 transition-colors font-medium"
      >
        <Bot className="w-3 h-3" />
        {label}
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-72 bg-card border border-border rounded-xl shadow-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gold flex items-center gap-1"><Bot className="w-3.5 h-3.5" /> AI Prompt</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
          </div>
          <pre className="text-xs text-foreground whitespace-pre-wrap font-mono bg-muted/50 rounded-lg p-2.5 max-h-40 overflow-y-auto">{prompt}</pre>
          <button
            onClick={() => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-background bg-gold hover:bg-gold/90 rounded-lg py-1.5 transition-colors"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? t.copied : t.copyPrompt}
          </button>
        </div>
      )}
    </span>
  );
};

/* ─── Keyword Tag Selector ─── */
const KeywordSelector = ({ selected, allSkills, onChange, placeholder }: {
  selected: string[];
  allSkills: string[];
  onChange: (keywords: string[]) => void;
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  const available = allSkills.filter(s => s.trim() && !selected.includes(s));

  return (
    <div className="relative">
      <div
        className="min-h-[32px] flex flex-wrap gap-1 items-center cursor-pointer border border-transparent hover:border-border rounded px-1.5 py-1"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0 ? selected.map(kw => (
          <span key={kw} className="inline-flex items-center gap-0.5 bg-gold/15 text-gold text-xs px-1.5 py-0.5 rounded-md font-medium">
            {kw}
            <button
              onClick={e => { e.stopPropagation(); onChange(selected.filter(k => k !== kw)); }}
              className="hover:text-gold/60"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        )) : (
          <span className="text-xs text-muted-foreground/40">{placeholder}</span>
        )}
      </div>
      {open && available.length > 0 && (
        <div className="absolute z-40 top-full left-0 mt-1 w-48 max-h-40 overflow-y-auto bg-card border border-border rounded-xl shadow-xl p-1.5">
          {available.map(skill => (
            <button
              key={skill}
              onClick={() => { onChange([...selected, skill]); }}
              className="w-full text-left text-xs px-2 py-1.5 rounded-md hover:bg-gold/10 text-foreground transition-colors"
            >
              {skill}
            </button>
          ))}
          <button onClick={() => setOpen(false)} className="w-full text-left text-xs px-2 py-1 text-muted-foreground mt-1 border-t border-border pt-1.5">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── Match Progress Bar ─── */
const MatchTracker = ({ rows, lang }: { rows: WorksheetRow[]; lang: "en" | "zh" }) => {
  const t = LABELS[lang];
  const allSkills = rows.map(r => r.skill.trim()).filter(Boolean);
  const uniqueSkills = new Set(allSkills);
  const usedKeywords = new Set(rows.flatMap(r => r.keywords));
  const matched = [...uniqueSkills].filter(s => usedKeywords.has(s)).length;
  const total = uniqueSkills.size || 1;
  const pct = Math.round((matched / total) * 100);

  const barColor = pct >= 50 ? "bg-green-500" : pct >= 30 ? "bg-orange-400" : "bg-red-400";

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{t.matched}</span>
        <span className={`text-sm font-bold ${pct >= 50 ? "text-green-600" : pct >= 30 ? "text-orange-500" : "text-red-500"}`}>
          {matched} {t.of} {uniqueSkills.size} {t.skillsMatched} ({pct}%)
        </span>
      </div>
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${Math.min(pct, 100)}%` }} />
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-foreground/30" />
      </div>
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">{t.target}</span>
      </div>
    </div>
  );
};

/* ─── Phase Stepper ─── */
const PhaseStepper = ({ lang, jobTitle }: { lang: "en" | "zh"; jobTitle: string }) => {
  const t = LABELS[lang];
  const phases = [
    { icon: Search, title: t.phase1Title, desc: t.phase1Desc, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
    { icon: Briefcase, title: t.phase2Title, desc: t.phase2Desc, color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    { icon: Target, title: t.phase3Title, desc: t.phase3Desc, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {phases.map((phase, i) => (
        <div key={i} className={`rounded-xl border p-3 md:p-4 ${phase.color}`}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-current/10 text-xs font-bold">{i + 1}</div>
            <phase.icon className="w-4 h-4" />
            <span className="text-sm font-semibold">{phase.title}</span>
          </div>
          <p className="text-xs leading-relaxed opacity-80">{phase.desc}</p>
          {i === 0 && jobTitle && (
            <div className="mt-2">
              <AiPromptHelper prompt={getSkillsPrompt(jobTitle, lang)} label={t.generateAi} lang={lang} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ─── Mobile Card with Phases ─── */
const MobileCard = ({ row, index, allSkills, lang, updateCell }: {
  row: WorksheetRow;
  index: number;
  allSkills: string[];
  lang: "en" | "zh";
  updateCell: (rowIdx: number, col: keyof WorksheetRow, value: any) => void;
}) => {
  const t = LABELS[lang];
  const [expandedPhase, setExpandedPhase] = useState<number | null>(row.skill ? null : 0);
  const hasContent = row.skill || row.experience || row.bulletPoint;
  const completeness = [row.skill, row.experience, row.achievement, row.keywords.length > 0 ? "y" : "", row.bulletPoint].filter(Boolean).length;

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
          {row.skill ? (
            <span className="text-sm font-medium text-foreground">{row.skill}</span>
          ) : (
            <span className="text-sm italic text-muted-foreground/50">{t.phSkill}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < completeness ? "bg-gold" : "bg-muted-foreground/20"}`} />
          ))}
        </div>
      </div>

      {/* Phase 1: Job Skills */}
      <div className="border-b border-border">
        <button
          onClick={() => setExpandedPhase(expandedPhase === 0 ? null : 0)}
          className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted/20 transition-colors"
        >
          <span className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
            <Search className="w-3 h-3" /> {t.phaseJob}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${expandedPhase === 0 ? "rotate-180" : ""}`} />
        </button>
        {expandedPhase === 0 && (
          <div className="px-3 pb-3 space-y-2">
            <div>
              <label className="text-xs text-muted-foreground">{t.skills}</label>
              <Input type="text" value={row.skill} onChange={e => updateCell(index, "skill", e.target.value)} className="h-8 text-sm mt-0.5" placeholder={t.phSkill} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.count}</label>
              <Input type="number" min="1" value={row.count} onChange={e => updateCell(index, "count", e.target.value)} className="h-8 text-sm mt-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Phase 2: Your Background */}
      <div className="border-b border-border">
        <button
          onClick={() => setExpandedPhase(expandedPhase === 1 ? null : 1)}
          className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted/20 transition-colors"
        >
          <span className="text-xs font-semibold text-amber-600 flex items-center gap-1.5">
            <Briefcase className="w-3 h-3" /> {t.phaseBackground}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${expandedPhase === 1 ? "rotate-180" : ""}`} />
        </button>
        {expandedPhase === 1 && (
          <div className="px-3 pb-3 space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">{t.experience}</label>
                {row.experience && <AiPromptHelper prompt={getIdeasPrompt(row.experience, lang)} label={t.getIdeas} lang={lang} />}
              </div>
              <Input type="text" value={row.experience} onChange={e => updateCell(index, "experience", e.target.value)} className="h-8 text-sm mt-0.5" placeholder={t.phExperience} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.achievement}</label>
              <textarea value={row.achievement} onChange={e => updateCell(index, "achievement", e.target.value)}
                className="w-full border border-input rounded-md px-3 py-1.5 text-sm bg-background text-foreground mt-0.5 resize-none"
                placeholder={t.phAchievement} rows={2} />
            </div>
          </div>
        )}
      </div>

      {/* Phase 3: Resume Output */}
      <div>
        <button
          onClick={() => setExpandedPhase(expandedPhase === 2 ? null : 2)}
          className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-muted/20 transition-colors"
        >
          <span className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
            <Target className="w-3 h-3" /> {t.phaseOutput}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${expandedPhase === 2 ? "rotate-180" : ""}`} />
        </button>
        {expandedPhase === 2 && (
          <div className="px-3 pb-3 space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">{t.keywords}</label>
                {row.achievement && <AiPromptHelper prompt={getMatchPrompt(allSkills, row.achievement, lang)} label={t.matchAi} lang={lang} />}
              </div>
              <KeywordSelector
                selected={row.keywords}
                allSkills={allSkills}
                onChange={kw => updateCell(index, "keywords", kw)}
                placeholder={t.selectKeywords}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">{t.bulletPoint}</label>
                {row.achievement && row.keywords.length > 0 && (
                  <AiPromptHelper prompt={getBulletPrompt(row.achievement, row.keywords, lang)} label={t.buildBullet} lang={lang} />
                )}
              </div>
              <div className="flex items-start gap-1">
                <textarea value={row.bulletPoint} onChange={e => updateCell(index, "bulletPoint", e.target.value)}
                  className="flex-1 border border-input rounded-md px-3 py-1.5 text-sm bg-background text-foreground mt-0.5 resize-none"
                  placeholder={t.phBullet} rows={2} />
                {row.bulletPoint && <CopyButton text={row.bulletPoint} label={t.copyBullet} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
export default function JobTitleWorksheet({ lang }: { lang: "en" | "zh" }) {
  const storageKey = `ai_guide_resume_workbook_${lang}`;
  const [tabs, setTabs] = useGuideStorage<WorksheetTab[]>(storageKey, [createTab("")]);
  const [activeTabId, setActiveTabId] = useState(() => tabs[0]?.id ?? "");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState("");

  const t = LABELS[lang];

  const activeTab = tabs.find(t => t.id === activeTabId) ?? tabs[0];
  const rows = activeTab?.rows ?? [];
  const allSkills = useMemo(() => rows.map(r => r.skill.trim()).filter(Boolean), [rows]);

  const updateTabs = useCallback((updater: (prev: WorksheetTab[]) => WorksheetTab[]) => {
    setTabs(prev => updater(prev));
  }, [setTabs]);

  const updateActiveRows = useCallback((updater: (rows: WorksheetRow[]) => WorksheetRow[]) => {
    updateTabs(prev => prev.map(tab =>
      tab.id === activeTab?.id ? { ...tab, rows: updater(tab.rows) } : tab
    ));
  }, [updateTabs, activeTab?.id]);

  const updateCell = (rowIdx: number, col: keyof WorksheetRow, value: any) => {
    updateActiveRows(prev => prev.map((r, i) => i === rowIdx ? { ...r, [col]: value } : r));
  };

  const addTab = () => {
    const newTab = createTab("");
    updateTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setEditingTabId(newTab.id);
  };

  const renameTab = (id: string, title: string) => {
    updateTabs(prev => prev.map(t => t.id === id ? { ...t, title } : t));
  };

  const deleteTab = (id: string) => {
    updateTabs(prev => {
      const next = prev.filter(t => t.id !== id);
      if (next.length === 0) return [createTab("")];
      return next;
    });
    if (activeTabId === id) {
      const remaining = tabs.filter(t => t.id !== id);
      setActiveTabId(remaining[0]?.id ?? "");
    }
    setShowDeleteConfirm(null);
  };

  const addRows = (count: number) => updateActiveRows(prev => [...prev, ...Array.from({ length: count }, emptyRow)]);

  const sortByCount = () => {
    updateActiveRows(prev => [...prev].sort((a, b) => (parseInt(b.count) || 0) - (parseInt(a.count) || 0)));
  };

  const clearAll = () => {
    updateActiveRows(() => Array.from({ length: 5 }, emptyRow));
    setShowClearConfirm(false);
  };

  const exportCsv = () => {
    const headers = [t.skills, t.count, t.experience, t.achievement, t.keywords, t.bulletPoint];
    const csvRows = [headers.join(","), ...rows.map(r =>
      [r.skill, r.count, r.experience, r.achievement, r.keywords.join("; "), r.bulletPoint]
        .map(v => `"${(v ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume_workbook_${activeTab?.title || "untitled"}_${lang}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGetStarted = () => {
    if (titleInput.trim()) {
      renameTab(activeTab?.id ?? "", titleInput.trim());
      setTitleInput("");
    }
  };

  const jobTitle = activeTab?.title || "";

  return (
    <div className="space-y-5">
      {/* ─── Header ─── */}
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
          <FileText className="w-5 h-5 text-gold" />
          {t.title}
        </h3>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* ─── Tab Bar ─── */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-border">
        {tabs.map(tab => (
          <div key={tab.id} className="relative flex items-center group">
            {editingTabId === tab.id ? (
              <input
                autoFocus
                value={tab.title}
                onChange={e => renameTab(tab.id, e.target.value)}
                onBlur={() => setEditingTabId(null)}
                onKeyDown={e => { if (e.key === "Enter") setEditingTabId(null); }}
                placeholder={t.enterTitle}
                className="px-3 py-2 text-sm bg-transparent border-b-2 border-gold outline-none min-w-[120px] text-foreground"
              />
            ) : (
              <button
                onClick={() => setActiveTabId(tab.id)}
                onDoubleClick={() => setEditingTabId(tab.id)}
                className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-1.5 ${
                  activeTabId === tab.id
                    ? "bg-card border border-border border-b-card text-foreground -mb-px"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {tab.title || (
                  <span className="italic text-muted-foreground/50">{t.enterTitle}</span>
                )}
                {tabs.length > 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); setShowDeleteConfirm(tab.id); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </button>
            )}
            {showDeleteConfirm === tab.id && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-xl shadow-xl p-3 w-56">
                <p className="text-xs text-muted-foreground mb-2">{t.deleteTabConfirm}</p>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => deleteTab(tab.id)} className="text-xs">
                    {t.deleteTab}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(null)} className="text-xs">✕</Button>
                </div>
              </div>
            )}
          </div>
        ))}
        <button onClick={addTab} className="px-2.5 py-2 text-muted-foreground hover:text-gold transition-colors" title={t.newTab}>
          <Plus className="w-4 h-4" />
        </button>
        {activeTab && editingTabId !== activeTab.id && jobTitle && (
          <button
            onClick={() => setEditingTabId(activeTab.id)}
            className="ml-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" /> {t.renameTab}
          </button>
        )}
      </div>

      {/* ─── Empty state: Get Started card ─── */}
      {!jobTitle && (
        <div className="border-2 border-dashed border-gold/30 rounded-2xl bg-gold/5 p-6 md:p-8 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
            <Search className="w-6 h-6 text-gold" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">{t.emptyState}</p>
            <p className="text-sm text-muted-foreground">{t.emptyStateHint}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
            <Input
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleGetStarted(); }}
              placeholder={t.enterTitle}
              className="h-10 text-sm"
            />
            <Button onClick={handleGetStarted} disabled={!titleInput.trim()} className="gap-1.5 bg-gold hover:bg-gold/90 text-background whitespace-nowrap">
              <Sparkles className="w-4 h-4" /> {t.getStarted}
            </Button>
          </div>
        </div>
      )}

      {/* ─── Phase Stepper (show when job title exists) ─── */}
      {jobTitle && <PhaseStepper lang={lang} jobTitle={jobTitle} />}

      {/* ─── Desktop Table ─── */}
      {jobTitle && (
        <div className="hidden lg:block overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-sm">
            <thead>
              {/* Column group headers */}
              <tr className="bg-executive-green/90 text-cream">
                <th className="px-2 py-1.5" />
                <th colSpan={2} className="px-2 py-1.5 text-center text-xs font-semibold border-l border-cream/20">
                  <span className="flex items-center justify-center gap-1"><Search className="w-3 h-3" /> {t.groupJob}</span>
                </th>
                <th colSpan={2} className="px-2 py-1.5 text-center text-xs font-semibold border-l border-cream/20">
                  <span className="flex items-center justify-center gap-1"><Briefcase className="w-3 h-3" /> {t.groupYou}</span>
                </th>
                <th colSpan={2} className="px-2 py-1.5 text-center text-xs font-semibold border-l border-cream/20">
                  <span className="flex items-center justify-center gap-1"><Target className="w-3 h-3" /> {t.groupMatch}</span>
                </th>
              </tr>
              {/* Column headers */}
              <tr className="bg-executive-green text-cream">
                <th className="px-2 py-2.5 text-left font-medium w-8">#</th>
                <th className="px-2 py-2.5 text-left font-medium min-w-[140px] border-l border-cream/10">{t.skills}</th>
                <th className="px-2 py-2.5 text-left font-medium w-16">
                  <div className="flex items-center gap-1">
                    {t.count}
                    <button onClick={sortByCount} className="text-cream/60 hover:text-cream" title={t.sortByCount}>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </div>
                </th>
                <th className="px-2 py-2.5 text-left font-medium min-w-[140px] border-l border-cream/10">{t.experience}</th>
                <th className="px-2 py-2.5 text-left font-medium min-w-[180px]">{t.achievement}</th>
                <th className="px-2 py-2.5 text-left font-medium min-w-[160px] border-l border-cream/10">{t.keywords}</th>
                <th className="px-2 py-2.5 text-left font-medium min-w-[200px]">{t.bulletPoint}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                >
                  <td className="px-2 py-1 text-muted-foreground text-xs">{i + 1}</td>
                  {/* The Job columns */}
                  <td className="px-1 py-1 border-l border-border/30">
                    <input type="text" value={row.skill} onChange={e => updateCell(i, "skill", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                      placeholder={i === 0 ? t.phSkill : ", "} />
                  </td>
                  <td className="px-1 py-1">
                    <input type="number" min="1" value={row.count} onChange={e => updateCell(i, "count", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground outline-none" />
                  </td>
                  {/* Your Background columns */}
                  <td className="px-1 py-1 border-l border-border/30">
                    <input type="text" value={row.experience} onChange={e => updateCell(i, "experience", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                      placeholder={i === 0 ? t.phExperience : ", "} />
                  </td>
                  <td className="px-1 py-1">
                    <textarea value={row.achievement} onChange={e => updateCell(i, "achievement", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none min-h-[28px]"
                      placeholder={i === 0 ? t.phAchievement : ", "} rows={1} />
                  </td>
                  {/* The Match columns */}
                  <td className="px-1 py-1 border-l border-border/30">
                    <KeywordSelector
                      selected={row.keywords}
                      allSkills={allSkills}
                      onChange={kw => updateCell(i, "keywords", kw)}
                      placeholder={t.selectKeywords}
                    />
                  </td>
                  <td className="px-1 py-1">
                    <div className="flex items-start gap-1">
                      <textarea value={row.bulletPoint} onChange={e => updateCell(i, "bulletPoint", e.target.value)}
                        className="flex-1 bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none min-h-[28px]"
                        placeholder={i === 0 ? t.phBullet : ", "} rows={1} />
                      {row.bulletPoint && (
                        <CopyButton text={row.bulletPoint} label={t.copyBullet} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Mobile Cards ─── */}
      {jobTitle && (
        <div className="lg:hidden space-y-3">
          {rows.map((row, i) => (
            <MobileCard
              key={i}
              row={row}
              index={i}
              allSkills={allSkills}
              lang={lang}
              updateCell={updateCell}
            />
          ))}
        </div>
      )}

      {/* ─── Keyword Match Tracker ─── */}
      {jobTitle && (
        <div className="sticky bottom-0 z-20 lg:relative">
          <MatchTracker rows={rows} lang={lang} />
        </div>
      )}

      {/* ─── Footer Actions ─── */}
      {jobTitle && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => addRows(1)} className="gap-1.5">
              <Plus className="w-3.5 h-3.5" /> {t.addRow}
            </Button>
            <Button variant="outline" size="sm" onClick={() => addRows(3)} className="gap-1.5">
              <Plus className="w-3.5 h-3.5" /> {t.addRows}
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} className="gap-1.5">
              <Download className="w-3.5 h-3.5" /> {t.exportCsv}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {showClearConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> {t.clearConfirm}</span>
                <Button variant="destructive" size="sm" onClick={clearAll}>✓</Button>
                <Button variant="ghost" size="sm" onClick={() => setShowClearConfirm(false)}>✕</Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowClearConfirm(true)} className="text-muted-foreground gap-1.5">
                <Trash2 className="w-3.5 h-3.5" /> {t.clearAll}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ─── Credit ─── */}
      <p className="text-xs text-muted-foreground/60 text-center pt-2">{t.credit}</p>
    </div>
  );
}
