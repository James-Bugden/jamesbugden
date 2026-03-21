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
