

## Problem

The "Experiment" naming convention is leftover from an A/B test. The experiment pages ARE the homepage now (routes `/` and `/zh-tw` already point to them), but the filenames still say "Experiment", causing confusion when editing.

## Plan: Rename all "Experiment" files to remove the suffix

### Files to rename (12 total)

**Pages (4 files):**
- `IndexExperiment.tsx` → `Index.tsx`
- `IndexExperimentZhTw.tsx` → `IndexZhTw.tsx`

**Components (8 files):**
- `HomepageTestimonialsExperiment.tsx` → `HomepageTestimonials2.tsx`
- `HomepageTestimonialsExperimentZhTw.tsx` → `HomepageTestimonialsZhTw2.tsx`
- `LogoScrollExperiment.tsx` → `LogoScroll2.tsx`
- `LogoScrollExperimentZhTw.tsx` → `LogoScrollZhTw2.tsx`
- `SelfSegmentationExperiment.tsx` → `SelfSegmentation2.tsx`
- `SelfSegmentationExperimentZhTw.tsx` → `SelfSegmentationZhTw2.tsx`
- `CoachingCTAExperiment.tsx` → `CoachingCTA2.tsx`
- `CoachingCTAExperimentZhTw.tsx` → `CoachingCTAZhTw2.tsx`

> Note: Non-experiment versions of these components already exist (e.g. `HomepageTestimonials.tsx`, `LogoScroll.tsx`), so we use a `2` suffix to avoid conflicts. Alternatively, we can delete the old non-experiment versions if they're unused.

**Style file:**
- Rename CSS class `.experiment` → keep as-is (just a CSS class, no confusion)

### What changes in each file
- Create new files with updated names and identical content (just rename the exported function/component)
- Update all imports in consuming files (`IndexExperiment.tsx`, `IndexExperimentZhTw.tsx`, `Join.tsx`, `JoinZhTw.tsx`, `App.tsx`)
- Delete old files

### Alternative (simpler) approach
Since the old non-experiment homepage files don't exist anymore, we could:
1. Delete the old unused component files (`HomepageTestimonials.tsx`, `LogoScroll.tsx`, `SelfSegmentation.tsx`, `CoachingCTA.tsx` and their ZhTw variants) if nothing else imports them
2. Rename Experiment files to take their place (drop "Experiment" suffix entirely)

This is cleaner. I'll verify which old files are still imported before proceeding.

### Steps
1. Check if old non-experiment components are imported anywhere
2. If unused, delete old files and rename Experiment files to drop the suffix
3. Update all imports across the codebase
4. Rename `experiment` CSS class to something like `homepage` in `experiment.css` and all references

