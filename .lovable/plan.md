

## Smart Language Output for Resume Analyzer

### The Rules
1. **Same page + same resume language** → everything in that language
2. **Cross-language** (page language ≠ resume language) → rewrite suggestions match the resume language, but explanations/reasons/UI stay in the page language

### How
The edge function already receives `language` (page lang). We add a second signal: detect the resume's language from the text itself, then build the prompt instruction accordingly.

### Changes

**`supabase/functions/analyze-resume/index.ts`**

Replace the current `outputLanguageInstruction` block (lines 227-229) with logic for 4 scenarios:

1. Detect resume language using a simple heuristic (count CJK characters — if >15% of characters are CJK, it's Chinese)
2. Build a nuanced instruction:

| Page lang | Resume lang | Instruction |
|-----------|-------------|-------------|
| zh-TW | Chinese | Everything in 繁體中文 |
| zh-TW | English | `bullet_rewrites[].improved`, `summary_rewrite.improved`, `bullet_rewrite.improved` → English. Everything else (findings, explanations, verdicts, priorities, summaries, `overall_verdict`) → 繁體中文 |
| en | English | Everything in English |
| en | Chinese | `bullet_rewrites[].improved`, `summary_rewrite.improved`, `bullet_rewrite.improved` → 繁體中文. Everything else → English |

3. Prepend this instruction at the **top** of the system prompt (not appended at the end) for stronger enforcement
4. Add a reinforcing reminder at the end of the user message

No frontend changes needed — the edge function handles all the logic.

### Files changed
1. `supabase/functions/analyze-resume/index.ts` — replace language instruction with 4-scenario logic + resume language detection

