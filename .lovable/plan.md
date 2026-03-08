
Goal: make resume import reliably map content into the correct sections/fields, with far fewer “wrong section” outcomes.

What the deep dive found
1) The current parser is heuristic-only (`src/lib/documentImport.ts`, ~1,000 lines): regex + score rules for headers, title/company swaps, date-driven boundaries.
2) Most misclassification comes from structural ambiguity:
   - Header detection (`isSectionHeader`) can still treat content lines as section breaks.
   - Experience/Education entry starts are date-biased; resumes without consistent dates get merged/split incorrectly.
   - `splitTitleOrg` and smart swaps are inherently brittle for unconventional formats.
3) Import UI (`ImportModal.tsx`) is synchronous + single-pass, so there’s no quality gate/confidence check before creating the doc.

Implementation plan
1) Add AI-first structured parser in backend function
   - File: `supabase/functions/resume-ai/index.ts`
   - Add new `action: "parse_resume"`.
   - Use tool-calling (not free-form JSON) to force schema-safe structured output:
     - `personalDetails` (name/title/email/phone/location/linkedin/website)
     - `sections[]` with strict section `type` enum and per-type entry fields matching `getDefaultFieldsForType`.
   - Keep existing 429/402 handling and return a normalized payload (not HTML prose).

2) Add normalization + validation layer in import library
   - File: `src/lib/documentImport.ts`
   - Add `aiParseResume(text)` that invokes backend function.
   - Add `normalizeParsedResume()` to:
     - enforce known section types only
     - coerce missing fields to defaults
     - remove impossible combinations (e.g., empty section with no entries)
     - sanitize/standardize description HTML structure
   - Keep `mapTextToResumeSections` as fallback only.

3) Build hybrid parsing strategy (reliability over fragility)
   - File: `src/lib/documentImport.ts`
   - New orchestrator: `parseResumeWithFallback(text)`:
     - Try AI parse first
     - If AI fails/invalid -> fallback to heuristic parse
     - If AI succeeds but quality is low (very few sections, suspicious empty core fields), run heuristic parse and pick best result via simple quality score.
   - Return parse metadata (`source: "ai" | "heuristic" | "hybrid"`, `warnings[]`) for UI messaging.

4) Wire ImportModal to async parser pipeline
   - File: `src/components/document-dashboard/ImportModal.tsx`
   - Replace direct `mapTextToResumeSections` call with `parseResumeWithFallback`.
   - Loading messages by stage:
     - “Extracting text…”
     - “Analyzing structure…”
     - “Finalizing sections…”
   - Toast behavior:
     - success with source (“AI import” or “Fallback import”)
     - warning toast when fallback was used
   - Keep file/paste flows unchanged otherwise.

5) Add import-quality guardrails (practical fixes for common bad outcomes)
   - File: `src/lib/documentImport.ts`
   - Post-parse repair rules:
     - if summary is huge and experience empty, attempt section redistribution
     - if skills section contains sentence-like paragraphs, move to summary/custom
     - if experience entries missing both company+position, demote to custom section
   - These run after AI/fallback before document creation.

Technical details (implementation-specific)
- Use existing model default (`google/gemini-3-flash-preview`) in backend.
- For structured extraction, use tool/function schema in gateway payload instead of “return JSON” prompt text.
- Keep client prompts out of frontend; all extraction prompts stay in backend function.
- No database migration required.
- No auth/RLS changes required for this feature.

Validation plan (deep-dive acceptance tests)
1) Build a 15–20 resume fixture set (formats: chronological, functional, no dates, bilingual EN/ZH, PDF/DOCX).
2) Compare before vs after:
   - section accuracy (% entries in correct section)
   - field accuracy for experience/education (title/company/degree/institution/date)
3) Acceptance target:
   - +30% relative reduction in wrong-section imports
   - fallback rate visible and <20% on clean DOCX.
4) Manual end-to-end checks:
   - upload PDF/DOCX and paste-text paths
   - import into dashboard and import-into-existing resume flow in editor.

Files to update
- `supabase/functions/resume-ai/index.ts`
- `src/lib/documentImport.ts`
- `src/components/document-dashboard/ImportModal.tsx`
