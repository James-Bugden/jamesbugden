

## Add Feedback Box to Resume Preview Panel

### Plan
Add a small floating feedback button in the bottom-left corner of the preview panel. Reuse the existing `FeedbackBox` component but update its email subject to say "Resume Builder Feedback" instead of "Offer Calculator Feedback".

### Changes

**`src/components/FeedbackBox.tsx`** — Add a `subject` prop so different pages can customize the email subject (default stays as-is for backward compatibility).

**`src/pages/ResumeBuilder.tsx`** — Import `FeedbackBox` and render it as a floating element in the bottom-left of the preview area (both desktop and mobile preview overlay). Position it with `absolute bottom-4 left-4 z-20` so it floats over the preview background without interfering with the resume page.

The feedback box will expand upward on click (as it already does) and send feedback via mailto to james@jamesbugden.com with subject "Resume Builder Feedback".

