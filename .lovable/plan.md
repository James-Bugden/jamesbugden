

# Add Login Button to All Page Headers

## Overview
The `AuthHeaderButton` component already exists and works in the toolkit headers. The task is to add it to every other page that has a navigation bar -- the homepage, guides pages, and all individual guide pages.

## Current State
- `AuthHeaderButton` is already used in `ToolkitHeader.tsx` and `ToolkitHeaderZhTw.tsx`
- All other pages (homepage, guides, individual guide pages) have inline `<nav>` bars with a `LanguageToggle` but no sign-in button
- There are approximately 18 pages with inline nav bars that need updating

## Changes

For each page listed below, add two lines:
1. Import `AuthHeaderButton`
2. Place `<AuthHeaderButton variant="nav" />` next to the `LanguageToggle` inside the nav's flex container

### Pages to Update (18 files)

**Homepage (2)**
- `src/pages/Index.tsx`
- `src/pages/IndexZhTw.tsx`

**Guides Hub (2)**
- `src/pages/GuidesPage.tsx`
- `src/pages/GuidesPageZhTw.tsx`

**Individual Guides - English (8)**
- `src/pages/ResumeGuide.tsx`
- `src/pages/ResumeQuickReference.tsx`
- `src/pages/LinkedInGuide.tsx`
- `src/pages/LinkedInBrandingGuide.tsx`
- `src/pages/InterviewPrepGuide.tsx`
- `src/pages/InterviewPreparationGuide.tsx`
- `src/pages/PivotMethodGuide.tsx`
- `src/pages/PivotMethodMiniGuide.tsx`

**Individual Guides - Chinese (8)**
- `src/pages/ResumeGuideZhTw.tsx`
- `src/pages/ResumeQuickReferenceZhTw.tsx`
- `src/pages/LinkedInGuideZhTw.tsx`
- `src/pages/LinkedInBrandingGuideZhTw.tsx`
- `src/pages/InterviewPrepGuideZhTw.tsx`
- `src/pages/InterviewPreparationGuideZhTw.tsx`
- `src/pages/PivotMethodGuideZhTw.tsx`
- `src/pages/PivotMethodMiniGuideZhTw.tsx`

**Salary Starter Kit (2)**
- `src/pages/SalaryStarterKit.tsx`
- `src/pages/SalaryStarterKitZhTw.tsx`

### No New Components Needed
The existing `AuthHeaderButton` handles both states (guest shows "Sign in" link, logged-in shows avatar + sign-out) and already supports the `variant="nav"` style that matches the dark green nav bars used across all pages.

