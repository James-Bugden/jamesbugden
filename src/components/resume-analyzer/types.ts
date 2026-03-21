export interface Finding {
  type: "strength" | "warning" | "critical";
  principle: string;
  text: string;
  evidence: string;
}

export interface Section {
  name: string;
  score: number;
  summary: string;
  findings: Finding[];
}

export interface BulletRewrite {
  original: string;
  improved: string;
  changes: string[];
}

export interface BulletRewriteDetailed {
  original: string;
  improved: string;
  explanation: string;
}

export interface SummaryRewrite {
  original: string;
  improved: string;
  explanation: string;
}

export interface Priority {
  priority: number;
  level: "critical" | "warning";
  principle: string;
  title: string;
  description: string;
}

export interface Segmentation {
  years_experience: string;
  seniority_level: string;
  current_company_type: string;
  industry: string;
  target_readiness: string;
}

export interface FourTests {
  keyword_test: boolean;
  scan_test: boolean;
  qualifications_test: boolean;
  fit_test: boolean;
}

export interface AnalysisResult {
  overall_score: number;
  overall_verdict: string;
  four_tests: FourTests;
  sections: Section[];
  bullet_rewrite: BulletRewrite;
  bullet_rewrites?: BulletRewriteDetailed[];
  summary_rewrite?: SummaryRewrite;
  top_priorities: Priority[];
  segmentation: Segmentation;
}
