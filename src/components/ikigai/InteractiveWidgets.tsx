import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useGuideStorage } from "@/hooks/useGuideStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

type Lang = "en" | "zh";

/* ── Save Progress Banner ──────────────────────────────────── */

function SaveProgressBanner({ lang, dismissed, onDismiss }: { lang: Lang; dismissed: boolean; onDismiss: () => void }) {
  const location = useLocation();
  if (dismissed) return null;
  const returnUrl = encodeURIComponent(location.pathname);
  return (
    <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mt-4">
      <p className="text-muted-foreground text-xs flex-1">
        {lang === "zh"
          ? "你的回答已儲存在此裝置。建立免費帳號即可在任何裝置存取。"
          : "Your answers are saved on this device. Create a free account to access them anywhere."}
      </p>
      <a
        href={`/join?returnUrl=${returnUrl}`}
        className="shrink-0 text-xs font-semibold text-gold hover:text-gold/80 underline underline-offset-2"
      >
        {lang === "zh" ? "建立帳號" : "Create Account"}
      </a>
      <button onClick={onDismiss} className="shrink-0 text-muted-foreground hover:text-foreground">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ── beforeunload hook ──────────────────────────────────────── */

function useBeforeUnloadWarning(shouldWarn: boolean) {
  useEffect(() => {
    if (!shouldWarn) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [shouldWarn]);
}

/* ── Interactive Career Map ────────────────────────────────── */

const CAREER_MAP_DATA = {
  en: {
    areas: [
      { title: "WHAT I LOVE", desc: "Activities where time disappears. Work I would do for free." },
      { title: "WHAT I'M GOOD AT", desc: "Skills people ask you for. Things you do easier than others." },
      { title: "WHAT THE WORLD NEEDS", desc: "Problems your skills solve. Gaps you fill. Work helping other people." },
      { title: "WHAT I GET PAID FOR", desc: "Roles, industries, or tasks where your skills have market value." },
    ],
    ikigaiLabel: "My ikigai (for now):",
    ikigaiPlaceholder: "Write your ikigai here...",
    placeholder: "Type here...",
  },
  zh: {
    areas: [
      { title: "我熱愛的事", desc: "讓時間消失的活動。就算沒有薪水也願意做的工作。" },
      { title: "我擅長的事", desc: "別人常請你幫忙的技能。你比別人做起來更輕鬆的事。" },
      { title: "世界需要的事", desc: "你的技能能解決的問題。你填補的缺口。幫助其他人的工作。" },
      { title: "我能獲得報酬的事", desc: "你的技能有市場價值的職位、產業或任務。" },
    ],
    ikigaiLabel: "我的 ikigai（目前）：",
    ikigaiPlaceholder: "在這裡寫下你的 ikigai...",
    placeholder: "在這裡輸入...",
  },
};

export function InteractiveCareerMap({ lang }: { lang: Lang }) {
  const data = CAREER_MAP_DATA[lang];
  const defaultEntries = Object.fromEntries(data.areas.map(a => [a.title, ["", "", ""]]));

  const [entries, setEntries] = useGuideStorage<Record<string, string[]>>(
    `ikigai_career_map_${lang}`,
    defaultEntries
  );
  const [ikigai, setIkigai] = useGuideStorage(`ikigai_career_map_ikigai_${lang}`, "");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isLoggedIn } = useAuth();

  const updateEntry = (areaTitle: string, index: number, value: string) => {
    setEntries(prev => ({
      ...prev,
      [areaTitle]: (prev[areaTitle] || ["", "", ""]).map((v, i) => i === index ? value : v),
    }));
  };

  const filledCount = Object.values(entries).flat().filter(v => v.trim()).length;
  const hasInput = filledCount > 0 || ikigai.trim().length > 0;

  useBeforeUnloadWarning(hasInput && !isLoggedIn);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {data.areas.map((area, i) => (
        <div key={area.title} className={`p-4 md:p-5 ${i < 3 ? "border-b border-border" : ""}`}>
          <p className="text-gold text-sm font-bold uppercase mb-1">{area.title}</p>
          <p className="text-muted-foreground text-xs mb-3">{area.desc}</p>
          <div className="space-y-2">
            {[0, 1, 2].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs shrink-0">{n + 1}.</span>
                <Input
                  value={(entries[area.title] || ["", "", ""])[n]}
                  onChange={e => updateEntry(area.title, n, e.target.value)}
                  placeholder={data.placeholder}
                  className="h-8 text-sm border-border/50 bg-background/50 focus:bg-background"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="bg-gold/10 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <p className="text-foreground text-sm font-medium shrink-0">{data.ikigaiLabel}</p>
          <Input
            value={ikigai}
            onChange={e => setIkigai(e.target.value)}
            placeholder={data.ikigaiPlaceholder}
            className="h-8 text-sm border-gold/30 bg-background/50 focus:bg-background"
          />
        </div>
        <p className="text-muted-foreground text-xs mt-2">
          {lang === "zh" ? `已填 ${filledCount}/12 項` : `${filledCount}/12 filled`}
        </p>
        {filledCount >= 3 && !isLoggedIn && (
          <SaveProgressBanner lang={lang} dismissed={bannerDismissed} onDismiss={() => setBannerDismissed(true)} />
        )}
      </div>
    </div>
  );
}

/* ── Interactive Scorecard ─────────────────────────────────── */

const SCORECARD_DATA = {
  en: {
    pillars: [
      { name: "Purpose", sub: "Do I know why I'm here?" },
      { name: "Flow", sub: "Does my work absorb me?" },
      { name: "Community", sub: "Do I have real relationships?" },
      { name: "Resilience", sub: "Am I growing stronger?" },
      { name: "Sustainable Pace", sub: "Am I working at 80%?" },
    ],
    headers: { pillar: "Pillar", weight: "Weight (1-3)", score: "Score (1-5)", weighted: "Weighted" },
    finalLabel: "Final Score",
  },
  zh: {
    pillars: [
      { name: "使命感", sub: "我知道自己為什麼在這裡嗎？" },
      { name: "心流", sub: "我的工作讓我忘記時間嗎？" },
      { name: "社群", sub: "我在這裡有真正的關係嗎？" },
      { name: "韌性", sub: "我在變強，還是變脆弱？" },
      { name: "永續節奏", sub: "我在用 80% 工作，還是在燃燒殆盡？" },
    ],
    headers: { pillar: "支柱", weight: "權重 (1-3)", score: "分數 (1-5)", weighted: "加權分數" },
    finalLabel: "最終分數",
  },
};

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-gold";
  if (score >= 40) return "text-orange-500";
  return "text-destructive";
}

function getScoreLabel(score: number, lang: Lang): string {
  if (lang === "zh") {
    if (score >= 80) return "強烈的 ikigai 對齊 ✓";
    if (score >= 60) return "謹慎前進";
    if (score >= 40) return "是時候改變了";
    return "你的 ikigai 缺失了";
  }
  if (score >= 80) return "Strong ikigai alignment ✓";
  if (score >= 60) return "Proceed with awareness";
  if (score >= 40) return "Time to make changes";
  return "Your ikigai is missing";
}

export function InteractiveScorecard({ lang }: { lang: Lang }) {
  const data = SCORECARD_DATA[lang];
  const [weights, setWeights] = useGuideStorage<number[]>(`ikigai_scorecard_weights_${lang}`, Array(5).fill(0));
  const [scores, setScores] = useGuideStorage<number[]>(`ikigai_scorecard_scores_${lang}`, Array(5).fill(0));
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isLoggedIn } = useAuth();

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  const updateWeight = (i: number, raw: string) => {
    const v = raw === "" ? 0 : clamp(parseInt(raw) || 0, 0, 3);
    setWeights(prev => prev.map((w, idx) => idx === i ? v : w));
  };

  const updateScore = (i: number, raw: string) => {
    const v = raw === "" ? 0 : clamp(parseInt(raw) || 0, 0, 5);
    setScores(prev => prev.map((s, idx) => idx === i ? v : s));
  };

  const weightedScores = weights.map((w, i) => w * scores[i]);
  const totalWeighted = weightedScores.reduce((a, b) => a + b, 0);
  const totalWeights = weights.reduce((a, b) => a + b, 0);
  const finalScore = totalWeights > 0 ? Math.round((totalWeighted / (totalWeights * 5)) * 100) : 0;
  const hasInput = totalWeights > 0;
  const filledFields = weights.filter(w => w > 0).length + scores.filter(s => s > 0).length;

  useBeforeUnloadWarning(hasInput && !isLoggedIn);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="grid grid-cols-4 bg-muted/30 p-3 border-b border-border text-xs font-bold text-foreground">
        <span>{data.headers.pillar}</span>
        <span className="text-center">{data.headers.weight}</span>
        <span className="text-center">{data.headers.score}</span>
        <span className="text-center">{data.headers.weighted}</span>
      </div>
      {data.pillars.map((pillar, i) => (
        <div key={pillar.name} className={`grid grid-cols-4 p-3 items-center ${i < 4 ? "border-b border-border" : ""}`}>
          <div>
            <p className="text-foreground text-sm font-medium">{pillar.name}</p>
            <p className="text-muted-foreground text-xs">{pillar.sub}</p>
          </div>
          <div className="flex justify-center">
            <Input
              type="number"
              min={1}
              max={3}
              value={weights[i] || ""}
              onChange={e => updateWeight(i, e.target.value)}
              className="w-14 h-8 text-center text-sm border-border/50"
              placeholder="–"
            />
          </div>
          <div className="flex justify-center">
            <Input
              type="number"
              min={1}
              max={5}
              value={scores[i] || ""}
              onChange={e => updateScore(i, e.target.value)}
              className="w-14 h-8 text-center text-sm border-border/50"
              placeholder="–"
            />
          </div>
          <div className="text-center">
            <span className={`text-sm font-medium ${weightedScores[i] > 0 ? "text-foreground" : "text-muted-foreground"}`}>
              {weightedScores[i] > 0 ? weightedScores[i] : "–"}
            </span>
          </div>
        </div>
      ))}
      <div className="bg-gold/10 p-4 text-center">
        {hasInput ? (
          <div>
            <p className={`text-2xl font-bold font-heading ${getScoreColor(finalScore)}`}>
              {finalScore} / 100
            </p>
            <p className={`text-sm font-medium mt-1 ${getScoreColor(finalScore)}`}>
              {getScoreLabel(finalScore, lang)}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            {lang === "zh"
              ? "填入權重和分數以計算你的最終分數"
              : "Enter weights and scores to calculate your final score"}
          </p>
        )}
        {filledFields >= 3 && !isLoggedIn && (
          <SaveProgressBanner lang={lang} dismissed={bannerDismissed} onDismiss={() => setBannerDismissed(true)} />
        )}
      </div>
    </div>
  );
}

/* ── Interactive Pulse Check ──────────────────────────────── */

const PULSE_DATA = {
  en: {
    title: "The 5-Minute Career Pulse Check",
    q1label: "1. Flow Signal",
    q1desc: "When was the last time you lost track of time at work? What were you doing?",
    q1aLabel: "Activity:",
    q1aPlaceholder: "What were you doing?",
    q1bLabel: "How long ago:",
    q1bPlaceholder: "e.g., yesterday, 3 months ago...",
    q2label: "2. Purpose Check",
    q2desc: "In one sentence, why do you work (beyond the paycheck)?",
    q2placeholder: "Your answer...",
    q3label: "3. Pace Check",
    q3desc: "On a scale of 1-10, how sustainable is your current pace? (1 = burning out, 10 = plenty of margin)",
    readTitle: "Quick Read:",
    reads: [
      { condition: (f: PulseState) => f.activity.trim().length > 0 && f.howLongAgo.trim().length > 0 && !f.howLongAgo.toLowerCase().includes("month"), text: "Flow activity was recent + clear? → Your flow is healthy.", positive: true },
      { condition: (f: PulseState) => f.howLongAgo.toLowerCase().includes("month") || (f.activity.trim() === "" && f.pace > 0), text: "Flow activity was months ago or blank? → Read Pillar 2 (Flow) and track for a week.", positive: false, link: "#pillar-2" },
      { condition: (f: PulseState) => f.purpose.trim().length > 10, text: "Purpose answer came easily? → You know your direction. Protect it.", positive: true },
      { condition: (f: PulseState) => f.purpose.trim().length > 0 && f.purpose.trim().length <= 10, text: "Purpose answer was vague? → Start with the Ikigai Career Map.", positive: false, link: "#pillar-1" },
      { condition: (f: PulseState) => f.pace >= 7, text: "Pace score 7-10? → Sustainable. Keep going.", positive: true },
      { condition: (f: PulseState) => f.pace >= 4 && f.pace <= 6, text: "Pace score 4-6? → Warning zone. Read Pillar 5 (Sustainable Pace).", positive: false, link: "#pillar-5" },
      { condition: (f: PulseState) => f.pace >= 1 && f.pace <= 3, text: "Pace score 1-3? → You're burning out. This is urgent.", positive: false, link: "#pillar-5" },
    ],
  },
  zh: {
    title: "5 分鐘職涯脈搏檢查",
    q1label: "1. 心流訊號",
    q1desc: "上次你在工作中忘記時間是什麼時候？你在做什麼？",
    q1aLabel: "活動：",
    q1aPlaceholder: "你在做什麼？",
    q1bLabel: "多久以前：",
    q1bPlaceholder: "例如：昨天、3 個月前...",
    q2label: "2. 使命感檢查",
    q2desc: "用一句話說明你為什麼工作（除了薪水以外）？",
    q2placeholder: "你的回答...",
    q3label: "3. 節奏檢查",
    q3desc: "1-10 分，你目前的節奏有多可持續？（1 = 燃燒殆盡，10 = 很有餘裕）",
    readTitle: "快速解讀：",
    reads: [
      { condition: (f: PulseState) => f.activity.trim().length > 0 && f.howLongAgo.trim().length > 0, text: "心流活動清晰且近期？→ 你的心流很健康。", positive: true },
      { condition: (f: PulseState) => f.activity.trim() === "" && f.pace > 0, text: "心流活動很久以前或空白？→ 閱讀支柱 2（心流）並追蹤一週。", positive: false, link: "#pillar-2" },
      { condition: (f: PulseState) => f.purpose.trim().length > 5, text: "使命感回答很容易？→ 你知道方向。保護它。", positive: true },
      { condition: (f: PulseState) => f.purpose.trim().length > 0 && f.purpose.trim().length <= 5, text: "使命感回答模糊？→ 從 Ikigai 職涯地圖開始。", positive: false, link: "#pillar-1" },
      { condition: (f: PulseState) => f.pace >= 7, text: "節奏分數 7-10？→ 可持續。繼續保持。", positive: true },
      { condition: (f: PulseState) => f.pace >= 4 && f.pace <= 6, text: "節奏分數 4-6？→ 警告區。閱讀支柱 5（永續節奏）。", positive: false, link: "#pillar-5" },
      { condition: (f: PulseState) => f.pace >= 1 && f.pace <= 3, text: "節奏分數 1-3？→ 你正在燃燒殆盡。這很緊急。", positive: false, link: "#pillar-5" },
    ],
  },
};

interface PulseState {
  activity: string;
  howLongAgo: string;
  purpose: string;
  pace: number;
}

export function InteractivePulseCheck({ lang }: { lang: "en" | "zh" }) {
  const data = PULSE_DATA[lang];
  const [state, setState] = useGuideStorage<PulseState>(`ikigai_pulse_${lang}`, {
    activity: "",
    howLongAgo: "",
    purpose: "",
    pace: 0,
  });
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isLoggedIn } = useAuth();

  const hasInput = !!(state.activity || state.howLongAgo || state.purpose || state.pace > 0);
  const matchingReads = hasInput ? data.reads.filter(r => r.condition(state)) : [];
  const filledFields = [state.activity, state.howLongAgo, state.purpose].filter(v => v.trim()).length + (state.pace > 0 ? 1 : 0);

  useBeforeUnloadWarning(hasInput && !isLoggedIn);

  return (
    <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6">
      <h4 className="text-gold font-semibold mb-4">{data.title}</h4>
      <div className="space-y-5">
        {/* Q1: Flow Signal */}
        <div>
          <p className="text-foreground text-sm font-medium mb-2">{data.q1label}</p>
          <p className="text-muted-foreground text-xs mb-3">{data.q1desc}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs shrink-0 w-20">{data.q1aLabel}</span>
              <Input
                value={state.activity}
                onChange={e => setState(s => ({ ...s, activity: e.target.value }))}
                placeholder={data.q1aPlaceholder}
                className="h-8 text-sm border-border/50 bg-background/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs shrink-0 w-20">{data.q1bLabel}</span>
              <Input
                value={state.howLongAgo}
                onChange={e => setState(s => ({ ...s, howLongAgo: e.target.value }))}
                placeholder={data.q1bPlaceholder}
                className="h-8 text-sm border-border/50 bg-background/50"
              />
            </div>
          </div>
        </div>

        {/* Q2: Purpose Check */}
        <div>
          <p className="text-foreground text-sm font-medium mb-2">{data.q2label}</p>
          <p className="text-muted-foreground text-xs mb-3">{data.q2desc}</p>
          <Input
            value={state.purpose}
            onChange={e => setState(s => ({ ...s, purpose: e.target.value }))}
            placeholder={data.q2placeholder}
            className="h-8 text-sm border-border/50 bg-background/50"
          />
        </div>

        {/* Q3: Pace Check */}
        <div>
          <p className="text-foreground text-sm font-medium mb-2">{data.q3label}</p>
          <p className="text-muted-foreground text-xs mb-3">{data.q3desc}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setState(s => ({ ...s, pace: s.pace === n ? 0 : n }))}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    state.pace === n
                      ? n <= 3
                        ? "bg-red-500 text-white"
                        : n <= 6
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-500 text-white"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {state.pace > 0 && (
              <span className={`text-sm font-bold ${
                state.pace <= 3 ? "text-red-500" : state.pace <= 6 ? "text-amber-500" : "text-emerald-500"
              }`}>
                {state.pace}/10
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Quick Read */}
      {matchingReads.length > 0 && (
        <div className="border-t border-border mt-5 pt-4">
          <h4 className="text-foreground text-sm font-semibold mb-2">{data.readTitle}</h4>
          <ul className="space-y-1.5">
            {matchingReads.map((read, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`text-xs mt-0.5 ${read.positive ? "text-emerald-500" : "text-amber-500"}`}>
                  {read.positive ? "✓" : "⚠"}
                </span>
                {read.link ? (
                  <a href={read.link} className="text-xs text-gold underline underline-offset-2 hover:text-gold/80">
                    {read.text}
                  </a>
                ) : (
                  <span className="text-muted-foreground text-xs">{read.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Save Progress Banner */}
      {filledFields >= 3 && !isLoggedIn && (
        <SaveProgressBanner lang={lang} dismissed={bannerDismissed} onDismiss={() => setBannerDismissed(true)} />
      )}
    </div>
  );
}
