import { useState, useCallback, useMemo } from "react";
import { ChevronDown, Copy, Check, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/* ── shared helpers ────────────────────────────────── */

type Lang = "en" | "zh";

const t = (en: string, zh: string, lang: Lang) => (lang === "en" ? en : zh);

const WidgetShell = ({ title, lang, children }: { title: string; lang: Lang; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gold/30 rounded-xl overflow-hidden my-6">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 bg-card hover:bg-muted/50 transition-colors text-left">
        <span className="text-foreground font-semibold text-sm md:text-base">
          {lang === "en" ? "Try it: " : "試試看："}{title}
        </span>
        <ChevronDown className={`w-5 h-5 text-gold transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 md:px-5 pb-4 md:pb-5 bg-card border-t border-gold/20">{children}</div>}
    </div>
  );
};

const CopyButton = ({ getText, lang }: { getText: () => string; lang: Lang }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="border-gold/40 text-gold hover:bg-gold/10 gap-1.5">
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? t("Copied", "已複製", lang) : t("Copy", "複製", lang)}
    </Button>
  );
};

/* ── SKILLS ────────────────────────────────────────── */

const SKILLS_EN = [
  "High integrity/honesty", "Technical/professional experience", "Solves problems/analyzes issues", "Innovates", "Learning agility/self-development",
  "Drives for results", "Establishes stretch goals", "Takes initiative", "Communicates powerfully", "Inspires/motivates others",
  "Builds relationships", "Collaboration and teamwork", "Strategic", "Champions change", "Customer and external focus",
  "Develops others", "Strong moral character", "Decision-making", "Risk-taking", "Values diversity",
];
const SKILLS_ZH = [
  "高度正直/誠實", "技術/專業經驗", "解決問題/分析問題", "創新", "學習敏捷度/自我發展",
  "追求結果", "設定挑戰性目標", "主動積極", "有力的溝通", "激勵/激發他人",
  "建立關係", "協作和團隊合作", "策略思維", "推動變革", "客戶和外部導向",
  "培養他人", "堅強的道德品格", "決策力", "冒險精神", "重視多元化",
];

type SkillScores = { you: string; boss: string; peer: string; stakeholder: string }[];

const emptySkillScores = (): SkillScores => Array.from({ length: 20 }, () => ({ you: "", boss: "", peer: "", stakeholder: "" }));

export const SkillAssessment = ({ lang }: { lang: Lang }) => {
  const skills = lang === "en" ? SKILLS_EN : SKILLS_ZH;
  const [scores, setScores] = useLocalStorage<SkillScores>(`career_game_skills_${lang}`, emptySkillScores());

  const updateScore = useCallback((idx: number, field: keyof SkillScores[0], val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    const clamped = num === "" ? "" : String(Math.min(10, Math.max(0, Number(num))));
    setScores(prev => prev.map((s, i) => i === idx ? { ...s, [field]: clamped } : s));
  }, [setScores]);

  const averages = useMemo(() => scores.map(s => {
    const vals = [s.you, s.boss, s.peer, s.stakeholder].map(Number).filter(n => !isNaN(n) && n > 0);
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
  }), [scores]);

  const top3 = useMemo(() => {
    const indexed = averages.map((a, i) => ({ avg: a === "—" ? 0 : Number(a), i }));
    indexed.sort((a, b) => b.avg - a.avg);
    return new Set(indexed.slice(0, 3).filter(x => x.avg > 0).map(x => x.i));
  }, [averages]);

  const getCopyText = () => {
    const header = lang === "en" ? "Skill | You | Boss | Peer | Stakeholder | Avg" : "技能 | 你 | 老闆 | 同事 | 利害關係人 | 平均";
    const rows = skills.map((sk, i) => `${sk} | ${scores[i].you || "-"} | ${scores[i].boss || "-"} | ${scores[i].peer || "-"} | ${scores[i].stakeholder || "-"} | ${averages[i]}`);
    return [header, ...rows].join("\n");
  };

  return (
    <WidgetShell title={t("20-Skill Assessment", "20 項技能評估", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("Skill", "技能", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-16">{t("You", "你", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-16">{t("Boss", "老闆", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-16">{t("Peer", "同事", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-20">{t("Stakeholder", "利害關係人", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-14">{t("Avg", "平均", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, i) => (
              <tr key={i} className={`border-b border-border/50 ${top3.has(i) ? "bg-gold/5" : ""}`}>
                <td className="py-1.5 pr-2 text-muted-foreground text-xs md:text-sm">
                  {top3.has(i) && <span className="text-gold mr-1">★</span>}
                  {skill}
                </td>
                {(["you", "boss", "peer", "stakeholder"] as const).map(field => (
                  <td key={field} className="py-1.5 px-1">
                    <Input type="text" inputMode="numeric" value={scores[i][field]} onChange={e => updateScore(i, field, e.target.value)}
                      className="h-7 w-14 text-center text-xs mx-auto" placeholder="1-10" />
                  </td>
                ))}
                <td className={`py-1.5 px-1 text-center font-semibold text-xs ${top3.has(i) ? "text-gold" : "text-muted-foreground"}`}>
                  {averages[i]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        {t("★ = Top 3 spikes (your differentiators)", "★ = 前 3 名尖峰技能（你的差異化因素）", lang)}
      </p>
    </WidgetShell>
  );
};

/* ── 11-LIST ───────────────────────────────────────── */

type ElevenListData = { want: string[]; dont: string[]; mission: string };
const emptyElevenList = (): ElevenListData => ({ want: ["", "", "", "", ""], dont: ["", "", "", "", ""], mission: "" });

export const ElevenList = ({ lang }: { lang: Lang }) => {
  const [data, setData] = useLocalStorage<ElevenListData>(`career_game_11list_${lang}`, emptyElevenList());

  const updateArr = (field: "want" | "dont", idx: number, val: string) => {
    setData(prev => ({ ...prev, [field]: prev[field].map((v, i) => i === idx ? val : v) }));
  };

  const getCopyText = () => {
    const wantLabel = t("Want to be known for:", "想被知道的：", lang);
    const dontLabel = t("Don't want to be known for:", "不想被知道的：", lang);
    const missionLabel = t("Mission Statement:", "使命宣言：", lang);
    return [wantLabel, ...data.want.map((v, i) => `${i + 1}. ${v || "—"}`), "", dontLabel, ...data.dont.map((v, i) => `${i + 1}. ${v || "—"}`), "", `${missionLabel} ${data.mission || "—"}`].join("\n");
  };

  return (
    <WidgetShell title={t("The 11-List", "11 清單", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-green-400 font-semibold text-sm mb-2">{t("Want to be known for:", "想被知道的：", lang)}</h4>
          {data.want.map((v, i) => (
            <Input key={i} value={v} onChange={e => updateArr("want", i, e.target.value)} placeholder={`${i + 1}.`} className="mb-2 h-8 text-sm" />
          ))}
        </div>
        <div>
          <h4 className="text-destructive font-semibold text-sm mb-2">{t("Don't want to be known for:", "不想被知道的：", lang)}</h4>
          {data.dont.map((v, i) => (
            <Input key={i} value={v} onChange={e => updateArr("dont", i, e.target.value)} placeholder={`${i + 1}.`} className="mb-2 h-8 text-sm" />
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-foreground font-semibold text-sm mb-2">{t("Mission Statement", "使命宣言", lang)}</h4>
        <Textarea value={data.mission} onChange={e => setData(prev => ({ ...prev, mission: e.target.value }))} placeholder={t("I want to...", "我想要...", lang)} className="min-h-[60px] text-sm" />
      </div>
    </WidgetShell>
  );
};

/* ── ELEVATOR PITCH ───────────────────────────────── */

type PitchData = { s1: string; s2: string };

export const ElevatorPitch = ({ lang }: { lang: Lang }) => {
  const [data, setData] = useLocalStorage<PitchData>(`career_game_pitch_${lang}`, { s1: "", s2: "" });
  const getCopyText = () => `${data.s1}\n${data.s2}`;

  return (
    <WidgetShell title={t("Elevator Pitch", "電梯簡報", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-foreground text-sm font-medium">{t("Sentence 1: Who you are + what you do", "第 1 句：你是誰 + 你做什麼", lang)}</label>
          <Textarea value={data.s1} onChange={e => setData(prev => ({ ...prev, s1: e.target.value }))} className="min-h-[60px] text-sm mt-1" />
          <p className="text-xs text-muted-foreground mt-1">{data.s1.length} {t("chars", "字", lang)}</p>
        </div>
        <div>
          <label className="text-foreground text-sm font-medium">{t("Sentence 2: What makes you different", "第 2 句：你有什麼不同", lang)}</label>
          <Textarea value={data.s2} onChange={e => setData(prev => ({ ...prev, s2: e.target.value }))} className="min-h-[60px] text-sm mt-1" />
          <p className="text-xs text-muted-foreground mt-1">{data.s2.length} {t("chars", "字", lang)}</p>
        </div>
      </div>
    </WidgetShell>
  );
};

/* ── INFLUENCER LIST ──────────────────────────────── */

const CRITERIA_EN = ["Relationship", "Seniority", "Risk", "Power", "Exposure", "Fear", "Validation", "Future influence"];
const CRITERIA_ZH = ["關係強度", "職級", "風險", "權力", "曝光", "威嚇度", "背書力", "未來影響力"];

type InfluencerRow = { name: string; scores: number[] };

export const InfluencerList = ({ lang }: { lang: Lang }) => {
  const criteria = lang === "en" ? CRITERIA_EN : CRITERIA_ZH;
  const [rows, setRows] = useLocalStorage<InfluencerRow[]>(`career_game_influencer_${lang}`, [{ name: "", scores: Array(8).fill(0) }]);

  const addRow = () => setRows(prev => [...prev, { name: "", scores: Array(8).fill(0) }]);
  const removeRow = (idx: number) => setRows(prev => prev.filter((_, i) => i !== idx));
  const updateName = (idx: number, name: string) => setRows(prev => prev.map((r, i) => i === idx ? { ...r, name } : r));
  const updateScore = (rowIdx: number, colIdx: number, val: string) => {
    const n = Math.min(5, Math.max(0, Number(val) || 0));
    setRows(prev => prev.map((r, i) => i === rowIdx ? { ...r, scores: r.scores.map((s, j) => j === colIdx ? n : s) } : r));
  };

  const sorted = useMemo(() => {
    return rows.map((r, i) => ({ ...r, total: r.scores.reduce((a, b) => a + b, 0), origIdx: i })).sort((a, b) => b.total - a.total);
  }, [rows]);

  const getCopyText = () => {
    const header = `${t("Name", "姓名", lang)} | ${criteria.join(" | ")} | ${t("Total", "總分", lang)}`;
    const body = sorted.map(r => `${r.name || "—"} | ${r.scores.join(" | ")} | ${r.total}`);
    return [header, ...body].join("\n");
  };

  return (
    <WidgetShell title={t("Influencer Scoring List", "影響力評分清單", lang)} lang={lang}>
      <div className="flex justify-between items-center mb-3">
        <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" />{t("Add Person", "新增人員", lang)}
        </Button>
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("Name", "姓名", lang)}</th>
              {criteria.map((c, i) => <th key={i} className="text-center py-2 px-1 text-foreground font-semibold min-w-[48px]">{c}</th>)}
              <th className="text-center py-2 px-1 text-foreground font-semibold">{t("Total", "總分", lang)}</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5 pr-2">
                  <Input value={row.name} onChange={e => updateName(i, e.target.value)} className="h-7 text-xs min-w-[100px]" placeholder={t("Name", "姓名", lang)} />
                </td>
                {row.scores.map((s, j) => (
                  <td key={j} className="py-1.5 px-1">
                    <Input type="number" min={0} max={5} value={s || ""} onChange={e => updateScore(i, j, e.target.value)} className="h-7 w-12 text-center text-xs mx-auto" />
                  </td>
                ))}
                <td className="py-1.5 px-1 text-center font-semibold text-muted-foreground">{row.scores.reduce((a, b) => a + b, 0)}</td>
                <td className="py-1.5">
                  {rows.length > 1 && (
                    <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{t("Score 1-5 per criterion. Focus on your top 5 accessible contacts.", "每項標準 1-5 分。專注於你的前五位可接觸對象。", lang)}</p>
    </WidgetShell>
  );
};

/* ── ACCOMPLISHMENT TRACKER ───────────────────────── */

type AccRow = { task: string; impact: string; whoKnows: string; type: string };
const emptyAccRows = (): AccRow[] => Array.from({ length: 5 }, () => ({ task: "", impact: "", whoKnows: "", type: "" }));

const DAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAYS_ZH = ["週一", "週二", "週三", "週四", "週五"];

export const AccomplishmentTracker = ({ lang }: { lang: Lang }) => {
  const [week, setWeek] = useLocalStorage(`career_game_acc_week_${lang}`, "");
  const [rows, setRows] = useLocalStorage<AccRow[]>(`career_game_acc_${lang}`, emptyAccRows());
  const days = lang === "en" ? DAYS_EN : DAYS_ZH;

  const updateRow = (idx: number, field: keyof AccRow, val: string) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: val } : r));
  };

  const getCopyText = () => {
    const header = `${t("Week", "週", lang)}: ${week || "—"}`;
    const colHeader = `${t("Day", "日", lang)} | ${t("What I did", "做了什麼", lang)} | ${t("Impact", "影響", lang)} | ${t("Who knows?", "誰知道？", lang)} | ${t("Type", "類型", lang)}`;
    const body = rows.map((r, i) => `${days[i]} | ${r.task || "—"} | ${r.impact || "—"} | ${r.whoKnows || "—"} | ${r.type || "—"}`);
    return [header, colHeader, ...body].join("\n");
  };

  return (
    <WidgetShell title={t("Weekly Accomplishment Tracker", "每週成就追蹤表", lang)} lang={lang}>
      <div className="flex justify-between items-center mb-3 gap-3">
        <div className="flex items-center gap-2">
          <label className="text-foreground text-sm font-medium whitespace-nowrap">{t("Week:", "週：", lang)}</label>
          <Input value={week} onChange={e => setWeek(e.target.value)} className="h-7 text-xs w-32" placeholder={t("e.g. Mar 24-28", "例：3/24-28", lang)} />
        </div>
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2 text-foreground font-semibold w-14">{t("Day", "日", lang)}</th>
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("What I did", "做了什麼", lang)}</th>
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("Impact", "影響", lang)}</th>
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("Who knows?", "誰知道？", lang)}</th>
              <th className="text-left py-2 text-foreground font-semibold w-20">{t("Type", "類型", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-muted-foreground font-medium">{days[i]}</td>
                <td className="py-1.5 pr-2"><Input value={row.task} onChange={e => updateRow(i, "task", e.target.value)} className="h-7 text-xs" /></td>
                <td className="py-1.5 pr-2"><Input value={row.impact} onChange={e => updateRow(i, "impact", e.target.value)} className="h-7 text-xs" /></td>
                <td className="py-1.5 pr-2"><Input value={row.whoKnows} onChange={e => updateRow(i, "whoKnows", e.target.value)} className="h-7 text-xs" /></td>
                <td className="py-1.5">
                  <select value={row.type} onChange={e => updateRow(i, "type", e.target.value)} className="h-7 w-full rounded-md border border-input bg-background text-xs px-1">
                    <option value="">—</option>
                    <option value="B">B (BAU)</option>
                    <option value="I">I ({t("Impact", "影響", lang)})</option>
                    <option value="D">D ({t("Dev", "發展", lang)})</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{t("Update every Friday. Bring to your one-on-ones.", "每週五更新。帶到你的一對一會議。", lang)}</p>
    </WidgetShell>
  );
};

/* ── ONE-ON-ONE PREP (10/10/10) ───────────────────── */

type OneOnOneData = { inform: string; escalate: string; advocate: string };

export const OneOnOnePrep = ({ lang }: { lang: Lang }) => {
  const [data, setData] = useLocalStorage<OneOnOneData>(`career_game_1on1_${lang}`, { inform: "", escalate: "", advocate: "" });
  const getCopyText = () => `${t("Inform (10 min)", "彙報（10 分鐘）", lang)}:\n${data.inform || "—"}\n\n${t("Escalate (10 min)", "上報（10 分鐘）", lang)}:\n${data.escalate || "—"}\n\n${t("Advocate (10 min)", "爭取（10 分鐘）", lang)}:\n${data.advocate || "—"}`;

  const sections: { key: keyof OneOnOneData; label: string; hint: string }[] = [
    { key: "inform", label: t("Inform (10 min)", "彙報（10 分鐘）", lang), hint: t("Updates, wins, progress on key projects", "更新、成就、關鍵專案進度", lang) },
    { key: "escalate", label: t("Escalate (10 min)", "上報（10 分鐘）", lang), hint: t("Blockers, risks, things you need help with", "障礙、風險、需要幫助的事項", lang) },
    { key: "advocate", label: t("Advocate (10 min)", "爭取（10 分鐘）", lang), hint: t("Your development, career goals, visibility requests", "你的發展、職涯目標、曝光請求", lang) },
  ];

  return (
    <WidgetShell title={t("One-on-One Prep (10/10/10)", "一對一會議準備（10/10/10）", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="space-y-4">
        {sections.map(s => (
          <div key={s.key}>
            <label className="text-foreground text-sm font-semibold">{s.label}</label>
            <p className="text-xs text-muted-foreground mb-1">{s.hint}</p>
            <Textarea value={data[s.key]} onChange={e => setData(prev => ({ ...prev, [s.key]: e.target.value }))} className="min-h-[60px] text-sm" />
          </div>
        ))}
      </div>
    </WidgetShell>
  );
};

/* ── BAU TRANSFORMER ──────────────────────────────── */

type BAUData = { task: string; transform: string; impact: string };

export const BAUTransformer = ({ lang }: { lang: Lang }) => {
  const [data, setData] = useLocalStorage<BAUData>(`career_game_bau_${lang}`, { task: "", transform: "", impact: "" });
  const getCopyText = () => `${t("BAU Task", "BAU 任務", lang)}: ${data.task || "—"}\n${t("How to transform", "如何轉化", lang)}: ${data.transform || "—"}\n${t("Expected impact", "預期影響", lang)}: ${data.impact || "—"}`;

  return (
    <WidgetShell title={t("BAU Task Transformer", "BAU 任務轉化器", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-foreground text-sm font-medium">{t("BAU task to transform", "要轉化的 BAU 任務", lang)}</label>
          <Input value={data.task} onChange={e => setData(prev => ({ ...prev, task: e.target.value }))} className="h-8 text-sm mt-1" />
        </div>
        <div>
          <label className="text-foreground text-sm font-medium">{t("How to bundle, rebrand, or automate", "如何整合、重新定位或自動化", lang)}</label>
          <Textarea value={data.transform} onChange={e => setData(prev => ({ ...prev, transform: e.target.value }))} className="min-h-[60px] text-sm mt-1" />
        </div>
        <div>
          <label className="text-foreground text-sm font-medium">{t("Expected impact", "預期影響", lang)}</label>
          <Input value={data.impact} onChange={e => setData(prev => ({ ...prev, impact: e.target.value }))} className="h-8 text-sm mt-1" />
        </div>
      </div>
    </WidgetShell>
  );
};

/* ── COMPETENCY RE-SCORE ──────────────────────────── */

export const CompetencyReScore = ({ lang }: { lang: Lang }) => {
  const skills = lang === "en" ? SKILLS_EN : SKILLS_ZH;
  const [prevScores] = useLocalStorage<SkillScores>(`career_game_skills_${lang}`, emptySkillScores());
  const [current, setCurrent] = useLocalStorage<string[]>(`career_game_rescore_${lang}`, Array(20).fill(""));

  const updateScore = (idx: number, val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    const clamped = num === "" ? "" : String(Math.min(10, Math.max(0, Number(num))));
    setCurrent(prev => prev.map((s, i) => i === idx ? clamped : s));
  };

  const getPrevAvg = (idx: number) => {
    const s = prevScores[idx];
    const vals = [s.you, s.boss, s.peer, s.stakeholder].map(Number).filter(n => !isNaN(n) && n > 0);
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  };

  const getCopyText = () => {
    const header = `${t("Skill", "技能", lang)} | ${t("Previous", "之前", lang)} | ${t("Current", "現在", lang)} | ${t("Delta", "差距", lang)}`;
    const rows = skills.map((sk, i) => {
      const prev = getPrevAvg(i);
      const cur = current[i] ? Number(current[i]) : null;
      const delta = prev !== null && cur !== null ? (cur - prev).toFixed(1) : "—";
      return `${sk} | ${prev !== null ? prev.toFixed(1) : "—"} | ${cur ?? "—"} | ${delta}`;
    });
    return [header, ...rows].join("\n");
  };

  return (
    <WidgetShell title={t("Competency Re-Score", "職能重新評分", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("Skill", "技能", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-16">{t("Previous", "之前", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-16">{t("Current", "現在", lang)}</th>
              <th className="text-center py-2 px-1 text-foreground font-semibold w-16">{t("Delta", "差距", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, i) => {
              const prev = getPrevAvg(i);
              const cur = current[i] ? Number(current[i]) : null;
              const delta = prev !== null && cur !== null ? cur - prev : null;
              return (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-1.5 pr-2 text-muted-foreground">{skill}</td>
                  <td className="py-1.5 px-1 text-center text-muted-foreground">{prev !== null ? prev.toFixed(1) : "—"}</td>
                  <td className="py-1.5 px-1">
                    <Input type="text" inputMode="numeric" value={current[i]} onChange={e => updateScore(i, e.target.value)} className="h-7 w-14 text-center text-xs mx-auto" placeholder="1-10" />
                  </td>
                  <td className={`py-1.5 px-1 text-center font-semibold ${delta !== null ? (delta > 0 ? "text-green-500" : delta < 0 ? "text-destructive" : "text-muted-foreground") : "text-muted-foreground"}`}>
                    {delta !== null ? (delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{t("Previous scores pulled from your initial self-assessment above.", "之前的分數來自你上面的初始自我評估。", lang)}</p>
    </WidgetShell>
  );
};

/* ── 40/40/20 REVIEW ──────────────────────────────── */

type SplitRow = { task: string; hours: string; category: string };
const emptySplitRows = (): SplitRow[] => Array.from({ length: 5 }, () => ({ task: "", hours: "", category: "" }));

export const FortyFortyTwentyReview = ({ lang }: { lang: Lang }) => {
  const days = lang === "en" ? DAYS_EN : DAYS_ZH;
  const [rows, setRows] = useLocalStorage<SplitRow[]>(`career_game_4020_${lang}`, emptySplitRows());

  const updateRow = (idx: number, field: keyof SplitRow, val: string) => {
    setRows(prev => prev.map((r, i) => i === idx ? { ...r, [field]: val } : r));
  };

  const totals = useMemo(() => {
    const result = { BAU: 0, HI: 0, SD: 0 };
    rows.forEach(r => {
      const h = Number(r.hours) || 0;
      if (r.category === "BAU") result.BAU += h;
      else if (r.category === "HI") result.HI += h;
      else if (r.category === "SD") result.SD += h;
    });
    return result;
  }, [rows]);

  const totalHours = totals.BAU + totals.HI + totals.SD;
  const pct = (v: number) => totalHours > 0 ? Math.round((v / totalHours) * 100) : 0;

  const getCopyText = () => {
    const header = `${t("Day", "日", lang)} | ${t("Task", "任務", lang)} | ${t("Hours", "時數", lang)} | ${t("Category", "類別", lang)}`;
    const body = rows.map((r, i) => `${days[i]} | ${r.task || "—"} | ${r.hours || "—"} | ${r.category || "—"}`);
    const summary = `\n${t("Split", "比例", lang)}: BAU ${pct(totals.BAU)}% | ${t("High-Impact", "高影響力", lang)} ${pct(totals.HI)}% | ${t("Self-Dev", "自我發展", lang)} ${pct(totals.SD)}% (${t("Target: 40/40/20", "目標：40/40/20", lang)})`;
    return [header, ...body, summary].join("\n");
  };

  const catLabel = (cat: string) => {
    if (cat === "BAU") return "BAU";
    if (cat === "HI") return t("High-Impact", "高影響力", lang);
    if (cat === "SD") return t("Self-Dev", "自我發展", lang);
    return "";
  };

  return (
    <WidgetShell title={t("40/40/20 Work Split Review", "40/40/20 工作比例檢視", lang)} lang={lang}>
      <div className="flex justify-end mb-3">
        <CopyButton getText={getCopyText} lang={lang} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-2 text-foreground font-semibold w-14">{t("Day", "日", lang)}</th>
              <th className="text-left py-2 pr-2 text-foreground font-semibold">{t("Task", "任務", lang)}</th>
              <th className="text-center py-2 pr-2 text-foreground font-semibold w-16">{t("Hours", "時數", lang)}</th>
              <th className="text-left py-2 text-foreground font-semibold w-28">{t("Category", "類別", lang)}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5 pr-2 text-muted-foreground font-medium">{days[i]}</td>
                <td className="py-1.5 pr-2"><Input value={row.task} onChange={e => updateRow(i, "task", e.target.value)} className="h-7 text-xs" /></td>
                <td className="py-1.5 pr-2"><Input type="number" min={0} max={24} value={row.hours} onChange={e => updateRow(i, "hours", e.target.value)} className="h-7 w-14 text-center text-xs mx-auto" /></td>
                <td className="py-1.5">
                  <select value={row.category} onChange={e => updateRow(i, "category", e.target.value)} className="h-7 w-full rounded-md border border-input bg-background text-xs px-1">
                    <option value="">—</option>
                    <option value="BAU">BAU</option>
                    <option value="HI">{t("High-Impact", "高影響力", lang)}</option>
                    <option value="SD">{t("Self-Dev", "自我發展", lang)}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual bar */}
      {totalHours > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-foreground font-semibold">{t("Your split vs target:", "你的比例 vs 目標：", lang)}</p>
          <div className="flex h-6 rounded-full overflow-hidden border border-border">
            {pct(totals.BAU) > 0 && <div style={{ width: `${pct(totals.BAU)}%` }} className="bg-muted-foreground/30 flex items-center justify-center text-[10px] text-foreground font-medium">BAU {pct(totals.BAU)}%</div>}
            {pct(totals.HI) > 0 && <div style={{ width: `${pct(totals.HI)}%` }} className="bg-gold/40 flex items-center justify-center text-[10px] text-foreground font-medium">{t("HI", "影響", lang)} {pct(totals.HI)}%</div>}
            {pct(totals.SD) > 0 && <div style={{ width: `${pct(totals.SD)}%` }} className="bg-green-500/30 flex items-center justify-center text-[10px] text-foreground font-medium">{t("SD", "發展", lang)} {pct(totals.SD)}%</div>}
          </div>
          <div className="flex h-6 rounded-full overflow-hidden border border-border/50">
            <div className="w-[40%] bg-muted-foreground/15 flex items-center justify-center text-[10px] text-muted-foreground">BAU 40%</div>
            <div className="w-[40%] bg-gold/15 flex items-center justify-center text-[10px] text-muted-foreground">{t("HI", "影響", lang)} 40%</div>
            <div className="w-[20%] bg-green-500/15 flex items-center justify-center text-[10px] text-muted-foreground">{t("SD", "發展", lang)} 20%</div>
          </div>
          <p className="text-[10px] text-muted-foreground">{t("Top bar = your actual split. Bottom bar = 40/40/20 target.", "上方 = 你的實際比例。下方 = 40/40/20 目標。", lang)}</p>
        </div>
      )}
    </WidgetShell>
  );
};
