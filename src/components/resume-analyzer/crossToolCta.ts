export type Lang = "en" | "zh-TW";
export type ScoreBucket = "<60" | "60-74" | "75-89" | "90+";
export type Level = "entry" | "mid" | "senior" | "executive" | "unknown";

export function bucketScore(score: number): ScoreBucket {
  if (!Number.isFinite(score) || score < 60) return "<60";
  if (score < 75) return "60-74";
  if (score < 90) return "75-89";
  return "90+";
}

// Strong entry signals win over later keywords — an "Associate Product Manager"
// in a rotation programme is entry-level despite "Manager" in the title.
const STRONG_ENTRY_KEYWORDS = ["intern", "associate", "junior", "graduate", "trainee"];
const EXECUTIVE_KEYWORDS = ["manager", "director", "vp", "vice president", "head of", "chief", "cto", "ceo", "cfo", "coo", "founder", "executive"];
const SENIOR_KEYWORDS = ["senior", "staff", "principal", "lead"];
const MID_KEYWORDS = ["mid-level", "mid level", "midlevel", "mid-", "mid ", "intermediate"];
const WEAK_ENTRY_KEYWORDS = ["entry"];

export function normalizeLevel(input: string | null | undefined): Level {
  if (!input) return "unknown";
  const text = input.toLowerCase().trim();
  if (!text) return "unknown";
  if (STRONG_ENTRY_KEYWORDS.some((k) => text.includes(k))) return "entry";
  if (EXECUTIVE_KEYWORDS.some((k) => text.includes(k))) return "executive";
  if (SENIOR_KEYWORDS.some((k) => text.includes(k))) return "senior";
  if (MID_KEYWORDS.some((k) => text.includes(k))) return "mid";
  if (WEAK_ENTRY_KEYWORDS.some((k) => text.includes(k))) return "entry";
  return "unknown";
}

export function interviewGuideUrl(lang: Lang): string {
  return lang === "zh-TW"
    ? "/zh-tw/interview-preparation-guide"
    : "/interview-preparation-guide";
}

const LEVEL_LABELS_EN: Record<Exclude<Level, "unknown">, string> = {
  entry: "entry-level",
  mid: "mid-level",
  senior: "senior-level",
  executive: "executive-level",
};

const LEVEL_LABELS_ZH: Record<Exclude<Level, "unknown">, string> = {
  entry: "初階",
  mid: "中階",
  senior: "資深",
  executive: "主管",
};

export function levelLabel(level: Level, lang: Lang): string | null {
  if (level === "unknown") return null;
  return lang === "zh-TW" ? LEVEL_LABELS_ZH[level] : LEVEL_LABELS_EN[level];
}
