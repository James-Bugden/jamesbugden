import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const systemPrompt = `You are an expert resume analyst and senior technical recruiter with 15+ years of experience hiring for top companies in the Taiwan market. You evaluate resumes for professionals at all career stages, whether they're targeting local companies, foreign multinationals, or startups.

You must analyze the provided resume and return a JSON object with your assessment. Be specific, cite evidence from the resume, and provide actionable feedback. Every finding and recommendation must reference a specific named principle (listed below).

## CRITICAL: EXPLAIN EVERY PRINCIPLE YOU REFERENCE
When you reference any named principle or framework in your findings, you MUST include a brief 1-sentence explanation of what it means so the user understands. For example:
- "The XYZ Framework (write bullets as 'Accomplished [X] as measured by [Y] by doing [Z]'): Your bullet lacks the [Y] measurement component..."
- "The Three R Model (every bullet should be Relevant, Relative, and Results-oriented): This bullet describes a duty but not a result..."
- "The 5 for 5 Rule (max 5 bullets per role within 5 years, max 3 for older roles): You have 8 bullets for this position..."
- "The Hell Yea! Test (does reading this make you say 'Hell Yea!'? If not, it needs more energy): This summary reads flat..."

## NAMED PRINCIPLES LIBRARY

### The Four Tests
1. **The Keyword Test**: Does the resume contain keywords matching the target job description?
2. **The Scan Test**: In 6 seconds of scanning, can a recruiter find your name, current role, previous role, and education?
3. **The Qualifications Test**: Does the resume demonstrate the required skills, experience level, and education?
4. **The Fit Test**: Does the communication style, professionalism, and overall impression suggest good fit?

### Golden Rules of Resume Writing
- **Golden Rule #2: Mirror the Job Description**
- **Golden Rule #3: Substance Over Style**
- **Golden Rule #4: One Page Rule** (except for 10+ year veterans)
- **Golden Rule #5: Scan Before Read** — Recruiters spend only 6 seconds on initial scan
- **Golden Rule #6: Active Voice**
- **Golden Rule #7: Results, Not Responsibilities**
- **Golden Rule #8: Relevance First**
- **Golden Rule #9: Perfection Prevents Rejection**
- **Golden Rule #10: Persistently Consistent**

### The Three R Model
Every bullet should be: Relevant, Relative, Results-oriented

### The Hell Yea! Test
Does reading it make you say "Hell Yea!"? If not, rephrase with more energy.

### The Framing Technique
Reframe accomplishments to maximize impact without lying.

### The 5 for 5 Rule
Within past 5 years: max 5 bullets per position. Over 5 years ago: max 3 bullets.

### The XYZ/CAR Framework
- XYZ: "Accomplished [X] as measured by [Y] by doing [Z]"
- CAR: Challenge, Action, Result

## WEAK PATTERNS TO FLAG
IMPORTANT: Only reference patterns relevant to the language of the resume being analyzed. If the resume is in English, do NOT mention Chinese patterns or vice versa.

### English resumes:
Weak verbs: "Responsible for...", "Helped with...", "Served as...", "Managed..." (without metrics), "Participated in...", "Handled...", "Duties included...", bullets starting with nouns, passive voice.
Strong verbs to PRAISE: "Led", "Drove", "Launched", "Built", "Increased", "Reduced", "Delivered", "Designed", "Implemented", "Optimized", "Spearheaded", "Achieved"

### Chinese resumes (ONLY apply to Chinese-language resumes):
弱動詞：「負責...」「協助...」「參與...」「處理...」「配合...」「支援...」「維護...」「執行...」, bullets listing duties without quantified results.
強動詞 to PRAISE: 推動、帶領、提升、優化、建立、開發、達成、創造、拓展、整合
Quantified results: 提升XX%、降低XX%、達成XX目標

## SCORING (7 sections, each scored 1-10)

1. Header & Contact Info (10%) — Professional email, LinkedIn URL, phone, location, clean layout
2. Professional Summary (15%) — 2-4 sentences, role identity, quantified achievements, passes Hell Yea! Test
3. Skills (10%) — Categorized technical skills, no soft skills as standalone, ATS-optimized
4. Work Experience (35%) — Three R Model, XYZ/CAR framework, 60%+ bullets with metrics, strong action verbs, 5 for 5 Rule
5. Education (10%) — Degree, university, graduation year, consistent formatting
6. Additional Sections (5%) — Certifications, languages, projects that add value
7. Formatting & ATS Compatibility (15%) — Consistent formatting, standard headers, appropriate length

Overall = (Header*0.10 + Summary*0.15 + Skills*0.10 + Experience*0.35 + Education*0.10 + Additional*0.05 + Formatting*0.15) * 10

## FOUR TESTS: Determine pass/fail for Keyword, Scan, Qualifications, and Fit tests.

## BULLET REWRITES: Find ALL weak bullets in the resume. For EACH weak bullet, provide the original text, an improved version using the Three R Model + XYZ framework, and a brief explanation of what was changed and why. Add plausible metrics with [X] placeholders if none exist. Return these as an array called "bullet_rewrites". Also keep a single "bullet_rewrite" with the weakest one for backward compatibility.

## SUMMARY REWRITE: If the resume has a professional summary, rewrite it to be more impactful. If it does NOT have a summary, write one based on the candidate's experience. Include the original (or empty string if missing), the improved version, and an explanation. Return as "summary_rewrite".

## TOP 3 PRIORITIES: All marked critical/warning. Each references a named principle with evidence.

## SEGMENTATION: Extract years_experience ("0-2","3-5","5-10","10-15","15+"), seniority_level, current_company_type ("Local","Foreign/MNC","Startup","Unknown"), industry, target_readiness.

## IMPORTANT FOR WORK EXPERIENCE:
Count total bullets, count weak-pattern bullets, count bullets with metrics. Report these counts.

## OUTPUT: Return ONLY valid JSON, no markdown, no backticks:

{
  "overall_score": number,
  "overall_verdict": "string",
  "four_tests": {
    "keyword_test": boolean,
    "scan_test": boolean,
    "qualifications_test": boolean,
    "fit_test": boolean
  },
  "sections": [
    {
      "name": "string",
      "score": number,
      "summary": "string",
      "findings": [
        {
          "type": "strength" | "warning" | "critical",
          "principle": "string",
          "text": "string (MUST include a brief explanation of the principle being referenced)",
          "evidence": "string"
        }
      ]
    }
  ],
  "bullet_rewrite": {
    "original": "string",
    "improved": "string",
    "changes": ["string"]
  },
  "bullet_rewrites": [
    {
      "original": "string",
      "improved": "string",
      "explanation": "string"
    }
  ],
  "summary_rewrite": {
    "original": "string (empty string if resume has no summary)",
    "improved": "string",
    "explanation": "string"
  },
  "top_priorities": [
    {
      "priority": number,
      "level": "critical" | "warning",
      "principle": "string",
      "title": "string",
      "description": "string"
    }
  ],
  "segmentation": {
    "years_experience": "string",
    "seniority_level": "string",
    "current_company_type": "string",
    "industry": "string",
    "target_readiness": "string"
  }
}`;

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MONTHLY_LIMIT = 10;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Auth check (optional — guests can analyze, full report gated in UI) ---
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const supabaseAuth = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader } } }
      );

      const token = authHeader.replace('Bearer ', '');
      try {
        const { data: claimsData, error: claimsError } = await (supabaseAuth.auth as any).getClaims(token);
        if (!claimsError && claimsData?.claims?.sub) {
          userId = claimsData.claims.sub;
        } else {
          throw new Error('getClaims failed');
        }
      } catch {
        const { data: { user } } = await supabaseAuth.auth.getUser();
        if (user) userId = user.id;
      }
    }

    // Create a service-level client for DB operations (works for both guest and auth)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // --- Usage limit (only for authenticated users) ---
    if (userId) {
      const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: userId });

      if (!isAdmin) {
        const { count: usageCount, error: usageError } = await supabase
          .from('resume_analyses')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .gte('created_at', `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01T00:00:00.000Z`);

        if (!usageError && typeof usageCount === 'number' && usageCount >= MONTHLY_LIMIT) {
          return new Response(
            JSON.stringify({ error: 'Monthly analysis limit reached', limit: MONTHLY_LIMIT, used: usageCount }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // Parse the body defensively — malformed JSON should surface as a 400,
    // not bubble up to the outer try/catch and log a 500 with
    // sb-error-code: EDGE_FUNCTION_ERROR. The outer handler is for genuine
    // failures (AI gateway down, DB errors); client-side input errors deserve
    // a dedicated 4xx response.
    let parsed: { resumeText?: string; language?: string };
    try {
      parsed = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    const { resumeText, language } = parsed;

    if (!resumeText || resumeText.length < 100) {
      return new Response(
        JSON.stringify({ error: 'Resume text too short' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Detect resume language via CJK character density
    const cjkMatch = resumeText.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g);
    const cjkCount = cjkMatch ? cjkMatch.length : 0;
    const totalChars = resumeText.replace(/\s/g, '').length;
    const isChineseResume = totalChars > 0 && (cjkCount / totalChars) > 0.15;

    const pageLang = language || 'en';
    const sameLanguage = (pageLang === 'zh-TW' && isChineseResume) || (pageLang !== 'zh-TW' && !isChineseResume);

    let outputLanguageInstruction: string;
    let userReminder: string;

    if (pageLang === 'zh-TW' && isChineseResume) {
      // Both Chinese
      outputLanguageInstruction = `CRITICAL INSTRUCTION: You MUST respond ENTIRELY in Traditional Chinese (繁體中文). Every single field value in your JSON output — including all findings, summaries, bullet rewrites, explanations, verdicts, descriptions, and overall_verdict — MUST be written in Traditional Chinese. The ONLY exceptions are proper nouns (company names, tool names) and the JSON keys themselves. When referencing named principles, keep the English name in parentheses after the Chinese translation, e.g. "三R模型 (Three R Model)".`;
      userReminder = `提醒：你的整個 JSON 回應必須使用繁體中文。`;
    } else if (pageLang === 'zh-TW' && !isChineseResume) {
      // Chinese UI, English resume
      outputLanguageInstruction = `CRITICAL INSTRUCTION: This resume is in English but the user's interface is in Traditional Chinese (繁體中文). Follow these rules strictly:
- The "improved" field in bullet_rewrites[], summary_rewrite, and bullet_rewrite MUST be in English (matching the resume language).
- ALL other fields — including findings[].text, findings[].evidence, summary, overall_verdict, top_priorities[].title, top_priorities[].description, bullet_rewrites[].explanation, summary_rewrite.explanation, bullet_rewrite.changes[] — MUST be in Traditional Chinese (繁體中文).
- When referencing named principles, keep the English name in parentheses, e.g. "三R模型 (Three R Model)".`;
      userReminder = `REMINDER: The "improved" rewrites must stay in English. All explanations, findings, verdicts, and descriptions must be in 繁體中文.`;
    } else if (pageLang !== 'zh-TW' && isChineseResume) {
      // English UI, Chinese resume
      outputLanguageInstruction = `CRITICAL INSTRUCTION: This resume is in Chinese but the user's interface is in English. Follow these rules strictly:
- The "improved" field in bullet_rewrites[], summary_rewrite, and bullet_rewrite MUST be in Traditional Chinese (繁體中文) (matching the resume language).
- ALL other fields — including findings[].text, findings[].evidence, summary, overall_verdict, top_priorities[].title, top_priorities[].description, bullet_rewrites[].explanation, summary_rewrite.explanation, bullet_rewrite.changes[] — MUST be in English.
- When referencing named principles, use the English name.`;
      userReminder = `REMINDER: The "improved" rewrites must stay in Traditional Chinese. All explanations, findings, verdicts, and descriptions must be in English.`;
    } else {
      // Both English
      outputLanguageInstruction = `CRITICAL INSTRUCTION: You MUST respond ENTIRELY in English. Every single field value in your JSON output must be in English.`;
      userReminder = `REMINDER: Your entire JSON response must be in English.`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        max_tokens: 16384,
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `${outputLanguageInstruction}\n\n${systemPrompt}`
          },
          {
            role: 'user',
            content: `Today's date is ${new Date().toISOString().slice(0, 10)}. Use this to determine whether dates in the resume are in the past or future.\n\nAnalyze this resume and return ONLY a valid JSON object. Do not include any text outside the JSON. Make sure all strings are properly escaped (especially quotes within strings).\n\n${userReminder}\n\nResume:\n\n${resumeText.substring(0, 15000)}`
          }
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'AI API error');
    }

    const analysisText = data.choices?.[0]?.message?.content || '';

    // Parse JSON, stripping any accidental markdown
    let cleanJson = analysisText.replace(/```json\n?|```\n?/g, '').trim();
    
    let analysis;
    try {
      analysis = JSON.parse(cleanJson);
    } catch (parseErr) {
      // Try to fix common JSON issues: unescaped quotes in strings
      console.error('JSON parse failed, attempting repair:', (parseErr as Error).message);
      // Extract JSON object between first { and last }
      const firstBrace = cleanJson.indexOf('{');
      const lastBrace = cleanJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
      }
      analysis = JSON.parse(cleanJson);
    }

    // Normalize score: if AI returned 1-10 scale instead of 1-100, multiply by 10
    if (analysis.overall_score && analysis.overall_score <= 10) {
      analysis.overall_score = Math.round(analysis.overall_score * 10);
    } else if (analysis.overall_score) {
      analysis.overall_score = Math.round(analysis.overall_score);
    }

    // Log AI usage after successful analysis (only for authenticated users)
    if (userId) {
      await supabase.from('ai_usage_log').insert({
        user_id: userId,
        usage_type: 'analyze',
      });
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Analysis failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
