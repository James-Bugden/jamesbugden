

## One-Time "What's New" Popup for Returning Users

### What It Does
A modal popup shown once to returning users (those who already completed onboarding) explaining the dashboard redesign. Dismissed permanently via localStorage flag.

### Show Conditions
- User is logged in
- `onboarding_completed` is TRUE (they've used the old dashboard)
- localStorage key `james_careers_dashboard_v2_seen` is NOT set

### Content
**Heading:** "Your Dashboard Got an Upgrade"

**3 bullet points with icons:**
1. **Phase-based navigation** — Your journey sections now highlight what's relevant to your current stage (Applying / Interviewing / Negotiating). Switch anytime with the pill bar at the top.
2. **Pick up where you left off** — See your latest resume score, last viewed guide, and suggested next step in one glance.
3. **Collapsible sections** — Future phases are tucked away but always accessible. Click to expand any section.

**CTA button:** "Got it" (closes and sets localStorage flag)

### Design
- Same modal pattern as `OnboardingPhaseModal` (centered, dark overlay, fade-in)
- Forest green header area with a sparkle/refresh icon
- Brand colors: forest green, gold, cream
- Mobile: full-width with padding

### Implementation
1. **New component:** `src/components/dashboard/WhatsNewModal.tsx`
   - Uses existing `Dialog`/`DialogContent` from UI library
   - 3 icon+text rows for the changes
   - Single "Got it" button that sets localStorage and closes
   - Fade-in animation via existing dialog animations

2. **Dashboard.tsx:** Import and render `WhatsNewModal` alongside `OnboardingPhaseModal`
   - Only show when `profile?.onboarding_completed === true` (so new users who just picked a phase don't see it)
   - WhatsNewModal manages its own localStorage visibility state

3. **Bilingual:** Support `lang` prop — show Chinese copy when `lang === "zh"`

