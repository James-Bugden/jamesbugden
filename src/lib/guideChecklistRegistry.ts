/**
 * Central registry of all guide checklists for progress tracking.
 * Each entry maps a guide to its checklist keys and item counts.
 */

export interface ChecklistEntry {
  key: string;
  lang: "en" | "zh";
  itemCount: number;
}

export interface GuideRegistryEntry {
  guideId: string;
  title: { en: string; zh: string };
  path: { en: string; zh: string };
  checklists: ChecklistEntry[];
}

export const GUIDE_CHECKLIST_REGISTRY: GuideRegistryEntry[] = [
  {
    guideId: "interview-preparation",
    title: { en: "Interview Preparation", zh: "面試準備" },
    path: { en: "/interview-preparation-guide", zh: "/zh-tw/interview-preparation-guide" },
    checklists: [
      { key: "interview_prep_pre_en", lang: "en", itemCount: 10 },
      { key: "interview_prep_dayof_en", lang: "en", itemCount: 6 },
      { key: "interview_prep_online_en", lang: "en", itemCount: 6 },
      { key: "interview_prep_post_en", lang: "en", itemCount: 3 },
      { key: "interview_prep_pre_zh", lang: "zh", itemCount: 10 },
      { key: "interview_prep_dayof_zh", lang: "zh", itemCount: 6 },
      { key: "interview_prep_online_zh", lang: "zh", itemCount: 6 },
      { key: "interview_prep_post_zh", lang: "zh", itemCount: 3 },
    ],
  },
  {
    guideId: "linkedin",
    title: { en: "LinkedIn Guide", zh: "LinkedIn 指南" },
    path: { en: "/linkedin-guide", zh: "/zh-tw/linkedin-guide" },
    checklists: [
      { key: "linkedin_guide_wk1_en", lang: "en", itemCount: 4 },
      { key: "linkedin_guide_wk2_en", lang: "en", itemCount: 4 },
      { key: "linkedin_guide_wk3_en", lang: "en", itemCount: 4 },
      { key: "linkedin_guide_wk4_en", lang: "en", itemCount: 4 },
      { key: "li_guide_action1_zh", lang: "zh", itemCount: 1 },
      { key: "li_guide_action2_zh", lang: "zh", itemCount: 1 },
      { key: "li_guide_action3_zh", lang: "zh", itemCount: 1 },
      { key: "li_guide_action4_zh", lang: "zh", itemCount: 1 },
      { key: "li_guide_action5_zh", lang: "zh", itemCount: 1 },
      { key: "li_guide_action6_zh", lang: "zh", itemCount: 1 },
      { key: "linkedin_guide_wk1_zh", lang: "zh", itemCount: 4 },
      { key: "linkedin_guide_wk2_zh", lang: "zh", itemCount: 4 },
      { key: "linkedin_guide_wk3_zh", lang: "zh", itemCount: 4 },
      { key: "linkedin_guide_wk4_zh", lang: "zh", itemCount: 4 },
    ],
  },
  {
    guideId: "linkedin-branding",
    title: { en: "LinkedIn Branding", zh: "LinkedIn 個人品牌" },
    path: { en: "/linkedin-personal-branding-guide", zh: "/zh-tw/linkedin-personal-branding-guide" },
    checklists: [
      { key: "linkedin_branding_wk12_en", lang: "en", itemCount: 5 },
      { key: "linkedin_branding_wk34_en", lang: "en", itemCount: 6 },
      { key: "linkedin_branding_wk58_en", lang: "en", itemCount: 6 },
      { key: "linkedin_branding_wk912_en", lang: "en", itemCount: 5 },
      { key: "li_brand_week1_audit_zh", lang: "zh", itemCount: 4 },
      { key: "li_brand_week1_makeover1_zh", lang: "zh", itemCount: 4 },
      { key: "li_brand_week1_makeover2_zh", lang: "zh", itemCount: 4 },
      { key: "li_brand_week3_content_zh", lang: "zh", itemCount: 8 },
      { key: "li_brand_week5_optimize_zh", lang: "zh", itemCount: 9 },
      { key: "li_brand_week9_scale_zh", lang: "zh", itemCount: 8 },
    ],
  },
  {
    guideId: "pivot-method",
    title: { en: "Pivot Method", zh: "轉職方法" },
    path: { en: "/pivot-method-guide", zh: "/zh-tw/pivot-method-guide" },
    checklists: [
      { key: "pivot_ref_plant_en", lang: "en", itemCount: 4 },
      { key: "pivot_ref_scan_en", lang: "en", itemCount: 3 },
      { key: "pivot_ref_pilot_en", lang: "en", itemCount: 3 },
      { key: "pivot_ref_launch_en", lang: "en", itemCount: 4 },
      { key: "pivot_ref_lead_en", lang: "en", itemCount: 4 },
      { key: "pivot_ref_plant_zh", lang: "zh", itemCount: 4 },
      { key: "pivot_ref_scan_zh", lang: "zh", itemCount: 3 },
      { key: "pivot_ref_pilot_zh", lang: "zh", itemCount: 3 },
      { key: "pivot_ref_launch_zh", lang: "zh", itemCount: 3 },
      { key: "pivot_ref_lead_zh", lang: "zh", itemCount: 2 },
    ],
  },
  {
    guideId: "pivot-method-mini",
    title: { en: "Pivot Method Mini", zh: "轉職方法精簡版" },
    path: { en: "/pivot-method-mini-guide", zh: "/zh-tw/pivot-method-mini-guide" },
    checklists: [
      { key: "pivot_mini_launch_financial_en", lang: "en", itemCount: 3 },
      { key: "pivot_mini_launch_professional_en", lang: "en", itemCount: 3 },
      { key: "pivot_mini_launch_personal_en", lang: "en", itemCount: 3 },
      { key: "pivot_mini_launch_financial_zh", lang: "zh", itemCount: 3 },
      { key: "pivot_mini_launch_professional_zh", lang: "zh", itemCount: 3 },
      { key: "pivot_mini_launch_personal_zh", lang: "zh", itemCount: 3 },
    ],
  },
  {
    guideId: "resume-zh",
    title: { en: "Resume Guide", zh: "履歷指南" },
    path: { en: "/resume-guide", zh: "/zh-tw/resume-guide" },
    checklists: [
      { key: "resume_checklist_plan_zh", lang: "zh", itemCount: 4 },
      { key: "resume_checklist_format_zh", lang: "zh", itemCount: 7 },
      { key: "resume_checklist_content_zh", lang: "zh", itemCount: 12 },
      { key: "resume_checklist_polish_zh", lang: "zh", itemCount: 7 },
    ],
  },
  {
    guideId: "ai-job-search",
    title: { en: "AI Job Search Guide", zh: "AI 求職指南" },
    path: { en: "/ai-job-search-guide", zh: "/zh-tw/ai-job-search-guide" },
    checklists: [
      { key: "ai_guide_job_title_worksheet_en", lang: "en", itemCount: 20 },
      { key: "ai_guide_job_title_worksheet_zh", lang: "zh", itemCount: 20 },
    ],
  },
];
