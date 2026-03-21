import { useState, useMemo, useCallback } from "react";
import { Plus, Trash2, AlertTriangle, Download, Copy, Check, ChevronDown, X, ArrowUpDown, Bot, Sparkles, Pencil } from "lucide-react";
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
  rows: Array.from({ length: 20 }, emptyRow),
});

/* ─── i18n Labels ─── */
const LABELS = {
  en: {
    title: "Interactive Resume Workbook",
    subtitle: "Plan your resume keyword by keyword. Each tab = one target job title.",
    skills: "Skills",
    count: "Count",
    experience: "Experience",
    achievement: "Achievement",
    keywords: "Keywords",
    bulletPoint: "Bullet Point",
    addRow: "Add Row",
    addRows: "Add 3 Rows (New Experience)",
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
    emptyState: "Start by entering your target job title above, then add 20 skills from job descriptions.",
    generateAi: "Generate with AI",
    matchAi: "Match with AI",
    buildBullet: "Build bullet with AI",
    getIdeas: "Get ideas with AI",
    copyPrompt: "Copy prompt",
    copied: "Copied!",
    howToUse: "How to use this workbook",
    target: "Target: 50%",
    sortByCount: "Sort by count",
    copyBullet: "Copy",
    selectKeywords: "Select keywords...",
    instructions: [
      { title: "Step 1: Skills Column", body: 'List the 20 most common skills from job descriptions for your target role.\nUse AI prompt: "Generate the 20 most important keywords from across [ROLE] job descriptions."' },
      { title: "Step 2: Count Column", body: "Record how many times each skill appears across job postings to identify priority skills." },
      { title: "Step 3: Experience Column", body: "Enter your relevant work experiences or company names." },
      { title: "Step 4: Achievement Column", body: 'Add specific, quantifiable achievements for each experience (e.g., "Increased sales 25%").' },
      { title: "Step 5: Keywords Column", body: 'Fill in the keywords that best match each achievement (from the Skills column).\nUse AI prompt: "Which of these keywords best match this achievement?"' },
      { title: "Step 6: Bullet Point Column", body: 'Use AI to combine achievement + keywords into a complete resume bullet.\nPrompt: "Please combine this achievement and these keywords to make a great resume bullet."' },
      { title: "Step 7: Repeat + Select", body: "Repeat for all experiences and skills, then select the best bullets for your final resume." },
    ],
    goal: "Goal: Build a keyword-optimized, achievement-driven resume for each target job title.",
    credit: "Based on the Career Coach GPT system by Jeremy Schifeling, adapted by James Bugden.",
  },
  zh: {
    title: "互動式履歷工作手冊",
    subtitle: "逐個關鍵字規劃你的履歷。每個分頁 = 一個目標職稱。",
    skills: "技能",
    count: "次數",
    experience: "經歷",
    achievement: "成就",
    keywords: "關鍵字",
    bulletPoint: "條列句",
    addRow: "新增列",
    addRows: "新增 3 列（新經歷）",
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
    emptyState: "先在上方輸入你的目標職稱，然後從職缺描述中加入 20 個技能。",
    generateAi: "AI 產生",
    matchAi: "AI 配對",
    buildBullet: "AI 生成條列句",
    getIdeas: "AI 提供靈感",
    copyPrompt: "複製提示詞",
    copied: "已複製！",
    howToUse: "如何使用此工作手冊",
    target: "目標：50%",
    sortByCount: "依次數排序",
    copyBullet: "複製",
    selectKeywords: "選擇關鍵字...",
    instructions: [
      { title: "步驟 1：技能欄", body: "列出該職缺說明中 20 個最常出現的關鍵技能。\n使用 AI 指令：「根據 _____ 職位的職缺說明，產生 20 個最重要的關鍵字。」" },
      { title: "步驟 2：次數欄", body: "記錄每個技能在職缺中出現的次數，以辨識優先技能。" },
      { title: "步驟 3：經歷欄", body: "輸入相關工作經歷或公司名稱。" },
      { title: "步驟 4：成就欄", body: "為每段經歷加入具體且可量化的成果（例：「提升銷售 25%」）。" },
      { title: "步驟 5：關鍵字欄", body: "填入與該成果最匹配的關鍵字（取自技能欄）。\n可用 AI 指令：「哪些關鍵字最適合這項成就？」" },
      { title: "步驟 6：條列句欄", body: "請 AI 將成就與關鍵字結合成完整履歷條列句。\n指令：「請將這個成就與這些關鍵字結合成履歷條列句。」" },
      { title: "步驟 7：重複並選擇", body: "對所有經歷與技能重複以上步驟，最後將最佳條列句放入你的最終履歷中。" },
    ],
    goal: "目標：為每個目標職稱打造一份關鍵字優化、以成就為導向的履歷。",
    credit: "基於 Jeremy Schifeling 的 Career Coach GPT 系統，由 James Bugden 改編。",
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
        {/* Target line at 50% */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-foreground/30" />
      </div>
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">{t.target}</span>
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
  const [showInstructions, setShowInstructions] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const t = LABELS[lang];

  // Ensure activeTabId is valid
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
    updateActiveRows(() => Array.from({ length: 20 }, emptyRow));
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

  const jobTitle = activeTab?.title || "";

  return (
    <div className="space-y-5">
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
        {activeTab && editingTabId !== activeTab.id && (
          <button
            onClick={() => setEditingTabId(activeTab.id)}
            className="ml-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Pencil className="w-3 h-3" /> {t.renameTab}
          </button>
        )}
      </div>

      {/* ─── Instructions ─── */}
      <div className="border border-gold/20 rounded-xl overflow-hidden bg-gold/5">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-gold/10 transition-colors"
        >
          <span className="text-sm font-semibold text-gold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> {t.howToUse}
          </span>
          <ChevronDown className={`w-4 h-4 text-gold transition-transform ${showInstructions ? "rotate-180" : ""}`} />
        </button>
        {showInstructions && (
          <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-gold/20 space-y-2">
            <ol className="space-y-2 mt-2">
              {t.instructions.map((step, i) => (
                <li key={i} className="text-sm">
                  <span className="font-semibold text-foreground">{step.title}</span>
                  <p className="text-muted-foreground whitespace-pre-line mt-0.5 text-xs leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="text-xs text-gold font-medium pt-1">{t.goal}</p>
          </div>
        )}
      </div>

      {/* ─── Empty state ─── */}
      {!jobTitle && (
        <div className="text-center py-8 text-muted-foreground space-y-3">
          <p className="text-sm">{t.emptyState}</p>
          <AiPromptHelper prompt={getSkillsPrompt(jobTitle, lang)} label={t.generateAi} lang={lang} />
        </div>
      )}

      {/* ─── AI Prompt Helpers Row ─── */}
      {jobTitle && (
        <div className="flex flex-wrap items-center gap-3">
          <AiPromptHelper prompt={getSkillsPrompt(jobTitle, lang)} label={t.generateAi} lang={lang} />
        </div>
      )}

      {/* ─── Desktop Table ─── */}
      <div className="hidden lg:block overflow-x-auto border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-executive-green text-cream">
              <th className="px-2 py-2.5 text-left font-medium w-8">#</th>
              <th className="px-2 py-2.5 text-left font-medium min-w-[140px]">
                <div className="flex items-center gap-2">
                  {t.skills}
                </div>
              </th>
              <th className="px-2 py-2.5 text-left font-medium w-20">
                <div className="flex items-center gap-1">
                  {t.count}
                  <button onClick={sortByCount} className="text-cream/60 hover:text-cream" title={t.sortByCount}>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </div>
              </th>
              <th className="px-2 py-2.5 text-left font-medium min-w-[140px]">
                <div className="flex items-center gap-2">
                  {t.experience}
                  <AiPromptHelper prompt={getIdeasPrompt("", lang)} label={t.getIdeas} lang={lang} />
                </div>
              </th>
              <th className="px-2 py-2.5 text-left font-medium min-w-[180px]">{t.achievement}</th>
              <th className="px-2 py-2.5 text-left font-medium min-w-[160px]">
                <div className="flex items-center gap-2">
                  {t.keywords}
                </div>
              </th>
              <th className="px-2 py-2.5 text-left font-medium min-w-[200px]">{t.bulletPoint}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isGroupStart = i % 3 === 0;
              return (
                <tr
                  key={i}
                  className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "bg-background" : "bg-muted/10"} ${isGroupStart ? "border-l-2 border-l-gold/40" : ""}`}
                >
                  <td className="px-2 py-1 text-muted-foreground text-xs">{i + 1}</td>
                  <td className="px-1 py-1">
                    <input type="text" value={row.skill} onChange={e => updateCell(i, "skill", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                      placeholder="—" />
                  </td>
                  <td className="px-1 py-1">
                    <input type="number" min="1" value={row.count} onChange={e => updateCell(i, "count", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground outline-none" />
                  </td>
                  <td className="px-1 py-1">
                    <input type="text" value={row.experience} onChange={e => updateCell(i, "experience", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                      placeholder="—" />
                  </td>
                  <td className="px-1 py-1">
                    <textarea value={row.achievement} onChange={e => updateCell(i, "achievement", e.target.value)}
                      className="w-full bg-transparent border-0 focus:ring-1 focus:ring-gold/30 rounded px-1.5 py-1 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none min-h-[28px]"
                      placeholder="—" rows={1} />
                  </td>
                  <td className="px-1 py-1">
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
                        placeholder="—" rows={1} />
                      {row.bulletPoint && (
                        <CopyButton text={row.bulletPoint} label={t.copyBullet} />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile Cards ─── */}
      <div className="lg:hidden space-y-3">
        {rows.map((row, i) => (
          <div key={i} className={`border border-border rounded-xl p-3 bg-card space-y-2 ${i % 3 === 0 ? "border-l-2 border-l-gold/40" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{t.row} {i + 1}</p>
              <div className="flex gap-2">
                {row.achievement && (
                  <AiPromptHelper prompt={getMatchPrompt(allSkills, row.achievement, lang)} label={t.matchAi} lang={lang} />
                )}
                {row.achievement && row.keywords.length > 0 && (
                  <AiPromptHelper prompt={getBulletPrompt(row.achievement, row.keywords, lang)} label={t.buildBullet} lang={lang} />
                )}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.skills}</label>
              <Input type="text" value={row.skill} onChange={e => updateCell(i, "skill", e.target.value)} className="h-8 text-sm mt-0.5" placeholder="—" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.count}</label>
              <Input type="number" min="1" value={row.count} onChange={e => updateCell(i, "count", e.target.value)} className="h-8 text-sm mt-0.5" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.experience}</label>
              <Input type="text" value={row.experience} onChange={e => updateCell(i, "experience", e.target.value)} className="h-8 text-sm mt-0.5" placeholder="—" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.achievement}</label>
              <textarea value={row.achievement} onChange={e => updateCell(i, "achievement", e.target.value)}
                className="w-full border border-border rounded-md px-3 py-1.5 text-sm bg-background text-foreground mt-0.5 resize-none"
                placeholder="—" rows={2} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.keywords}</label>
              <KeywordSelector
                selected={row.keywords}
                allSkills={allSkills}
                onChange={kw => updateCell(i, "keywords", kw)}
                placeholder={t.selectKeywords}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{t.bulletPoint}</label>
              <div className="flex items-start gap-1">
                <textarea value={row.bulletPoint} onChange={e => updateCell(i, "bulletPoint", e.target.value)}
                  className="flex-1 border border-border rounded-md px-3 py-1.5 text-sm bg-background text-foreground mt-0.5 resize-none"
                  placeholder="—" rows={2} />
                {row.bulletPoint && <CopyButton text={row.bulletPoint} label={t.copyBullet} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Keyword Match Tracker (sticky on mobile) ─── */}
      <div className="sticky bottom-0 z-20 lg:relative">
        <MatchTracker rows={rows} lang={lang} />
      </div>

      {/* ─── Footer Actions ─── */}
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

      {/* ─── Credit ─── */}
      <p className="text-xs text-muted-foreground/60 text-center pt-2">{t.credit}</p>
    </div>
  );
}
