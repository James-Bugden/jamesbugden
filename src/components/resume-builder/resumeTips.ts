export interface ResumeTip {
  title: string;
  summary: string;
  details: string[];
}

export const SECTION_TIPS: Record<string, ResumeTip> = {
  summary: {
    title: 'The "Hell Yea!" Test',
    summary: 'Your summary should make a recruiter say "Hell yea, let\'s interview this person!"',
    details: [
      "2–4 sentences max with quantified achievements",
      "Lead with your strongest credential or metric",
      "Mention domain expertise and target role clearly",
      "Avoid generic phrases like 'hard-working team player'",
    ],
  },
  experience: {
    title: "XYZ / CAR Framework",
    summary: "Write results-driven bullets: Accomplished [X] as measured by [Y], by doing [Z].",
    details: [
      "Golden Rule #7: Results, Not Responsibilities — start with impact, not duties",
      "5 for 5 Rule: aim for ~5 bullets per role for recent positions",
      "Three R Model: each bullet should show Result → Reason → Revenue/Impact",
      "Quantify everything — %, $, time saved, users impacted",
      "Use strong action verbs: Led, Drove, Increased, Reduced, Launched",
    ],
  },
  skills: {
    title: "Mirror the Job Description",
    summary: "Match your skills to exact keywords from target job descriptions.",
    details: [
      "Golden Rule #2: Mirror the JD — ATS systems scan for keyword matches",
      "List technical/hard skills first, group by category",
      "Avoid standalone soft skills (e.g. just 'leadership')",
      "Include tools, frameworks, and certifications by name",
    ],
  },
  education: {
    title: "Consistent Formatting",
    summary: "Keep education entries consistent: Degree, University, Year.",
    details: [
      "List most recent degree first",
      "Include GPA only if impressive (≥3.5) or if early career",
      "Add relevant coursework, honours, or thesis if space allows",
      "Remove high school once you have a university degree",
    ],
  },
  projects: {
    title: "Show, Don't Tell",
    summary: "Use projects to demonstrate applied skills with measurable outcomes.",
    details: [
      "Include links to live projects, GitHub repos, or demos",
      "Describe your specific contribution, not just the project",
      "Quantify scope: users, data size, team size, timeline",
    ],
  },
  certificates: {
    title: "Relevance Over Quantity",
    summary: "Only include certifications relevant to your target role.",
    details: [
      "List the issuing organisation and date obtained",
      "Prioritise industry-recognised certifications",
      "Remove expired or irrelevant certifications",
    ],
  },
  languages: {
    title: "Be Honest About Proficiency",
    summary: "Accurately represent your language abilities using standard levels.",
    details: [
      "Use recognised proficiency scales (e.g. Native, Professional Working)",
      "Only list languages you'd be comfortable using in a work setting",
    ],
  },
};

/** General tips shown in the analyzer prompt dialog */
export const GENERAL_TIPS = [
  "Golden Rule #4: One Page Rule — keep it to one page unless 10+ years of experience",
  "Golden Rule #5: The 6-Second Scan Test — recruiters scan before they read",
  "Golden Rule #9: Perfection Prevents Rejection — zero typos, perfect formatting",
];

/* ───── Traditional Chinese (zh-TW) translations ───── */

export const SECTION_TIPS_ZH_TW: Record<string, ResumeTip> = {
  summary: {
    title: "「太棒了！」測試",
    summary: "你的摘要應該讓招募官看完就說「太棒了，一定要面試這個人！」",
    details: [
      "最多 2–4 句話，搭配量化的成果",
      "用你最強的資歷或數據開頭",
      "清楚提及領域專長與目標職位",
      "避免「認真負責的團隊合作者」等空泛描述",
    ],
  },
  experience: {
    title: "XYZ / CAR 架構",
    summary: "用成果導向的方式撰寫：透過 [Z]，達成了 [X]，以 [Y] 衡量。",
    details: [
      "黃金法則 #7：寫成果，不是寫職責——先講影響力",
      "5 for 5 法則：近期職位每個寫約 5 個重點",
      "Three R 模型：每條重點展示 結果 → 原因 → 營收/影響",
      "盡量量化——百分比、金額、節省時間、影響用戶數",
      "使用強動詞：主導、推動、提升、降低、上線",
    ],
  },
  skills: {
    title: "對照職位描述",
    summary: "讓你的技能與目標職位描述中的關鍵字精準匹配。",
    details: [
      "黃金法則 #2：對照 JD——ATS 系統會掃描關鍵字",
      "先列技術/硬技能，按類別分組",
      "避免單獨列出軟實力（例如只寫「領導力」）",
      "列出工具、框架、證照的具體名稱",
    ],
  },
  education: {
    title: "格式一致",
    summary: "學歷格式保持統一：學位、學校、年份。",
    details: [
      "最近的學位放最前面",
      "GPA 只在優秀（≥3.5）或職涯初期時列出",
      "如有空間，可加相關課程、榮譽或論文",
      "有大學學歷後就移除高中資訊",
    ],
  },
  projects: {
    title: "展示，別只說",
    summary: "用專案來證明你的實際技能與可量化的成果。",
    details: [
      "附上作品連結、GitHub 或 Demo",
      "描述你個人的具體貢獻，不只是專案本身",
      "量化範圍：用戶數、資料量、團隊規模、時程",
    ],
  },
  certificates: {
    title: "質量重於數量",
    summary: "只列出與目標職位相關的證照。",
    details: [
      "列出發證機構與取得日期",
      "優先列出業界認可的證照",
      "移除已過期或不相關的證照",
    ],
  },
  languages: {
    title: "如實表述熟練度",
    summary: "使用標準等級準確描述你的語言能力。",
    details: [
      "使用公認的熟練度量表（如：母語、專業工作能力）",
      "只列出你有信心在工作中使用的語言",
    ],
  },
};

export const GENERAL_TIPS_ZH_TW = [
  "黃金法則 #4：一頁原則——除非有 10 年以上經驗，否則控制在一頁",
  "黃金法則 #5：六秒掃描測試——招募官先掃再讀",
  "黃金法則 #9：完美防止被刷——零錯字、完美排版",
];
