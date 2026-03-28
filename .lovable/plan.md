

## Translate Resume Builder Tip Banners to Chinese

### Problem
The `ResumeTipBanner` component (showing tips like "The Hell Yea! Test", "XYZ / CAR Framework", etc.) pulls from `SECTION_TIPS` in `resumeTips.ts`, which is English-only. The Chinese resume builder renders the same English tips.

### Solution
Make `ResumeTipBanner` language-aware by adding Chinese translations to the tips data and using the current lang context.

### Changes

**1. `src/components/resume-builder/resumeTips.ts`**
- Add a parallel `SECTION_TIPS_ZH_TW` export with Chinese translations for all 7 section tips (summary, experience, skills, education, projects, certificates, languages)
- Translations:
  - "The Hell Yea! Test" → "「太棒了！」測試"
  - "XYZ / CAR Framework" → "XYZ / CAR 架構"
  - "Mirror the Job Description" → "對照職位描述"
  - "Consistent Formatting" → "格式一致"
  - "Show, Don't Tell" → "展示，別只說"
  - "Relevance Over Quantity" → "質量重於數量"
  - "Be Honest About Proficiency" → "如實表述熟練度"
- Also translate all `summary` and `details` strings
- Translate `GENERAL_TIPS` → `GENERAL_TIPS_ZH_TW`

**2. `src/components/resume-builder/ResumeTipBanner.tsx`**
- Import `useResumeBuilderLang` from `i18n`
- Import `SECTION_TIPS_ZH_TW` from `resumeTips`
- Select tip source based on lang: `lang === "zh-tw" ? SECTION_TIPS_ZH_TW : SECTION_TIPS`

