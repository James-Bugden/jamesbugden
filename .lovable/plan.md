

# Fix: Chinese Dashboard Showing English-Only Components

## Problem
When switching to the Chinese dashboard (`/zh-tw/dashboard`), two components render in English only, making the page feel like the "old UI":

1. **OnboardingPhaseModal** — hardcoded English strings for heading, descriptions, and button text. No `lang` prop.
2. **NpsPulse** — hardcoded `locale="en"` on line 535 of Dashboard.tsx instead of using the `lang` variable.

## Changes

### 1. Add bilingual support to `OnboardingPhaseModal`
**File:** `src/components/OnboardingPhaseModal.tsx`

- Add a `lang` prop (`"en" | "zh"`)
- Add Chinese translations for:
  - Heading: "你目前在求職的哪個階段？"
  - Subtitle: "這會幫助我們優先顯示最相關的工具和指南。你隨時可以更改。"
  - Phase labels: "投遞申請" / "面試準備" / "薪資談判"
  - Phase descriptions (Chinese equivalents)
  - Button: "繼續" / "儲存中…"

### 2. Pass `lang` to OnboardingPhaseModal in Dashboard.tsx
**File:** `src/pages/Dashboard.tsx`

- Line 301: Change `<OnboardingPhaseModal onSelect={...} />` to `<OnboardingPhaseModal lang={lang} onSelect={...} />`

### 3. Fix NpsPulse locale
**File:** `src/pages/Dashboard.tsx`

- Line 535: Change `<NpsPulse locale="en" />` to `<NpsPulse locale={lang === "zh" ? "zh" : "en"} />`

### Technical Details
- No data or structural changes — only i18n string additions
- The `OnboardingPhaseModal` will use the same pattern as `WhatsNewModal`: an `i18n` object keyed by `"en" | "zh"`
- All existing functionality (phase selection, Supabase update) remains unchanged

