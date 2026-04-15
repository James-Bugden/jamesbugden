import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const IMPORT_MONTHLY_LIMIT = 10;
const USAGE_TYPE = "import";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // ── Auth check ──
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Sign in required to import resumes." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;

    // ── Admin bypass ──
    const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: userId });

    // ── Rate limit check ──
    let currentCount = 0;
    if (!isAdmin) {
      const { data: countData } = await supabase.rpc("count_ai_usage_this_month", {
        p_user_id: userId,
        p_usage_type: USAGE_TYPE,
      });

      currentCount = (countData as number) ?? 0;
      if (currentCount >= IMPORT_MONTHLY_LIMIT) {
        return new Response(
          JSON.stringify({
            error: "Monthly import limit reached",
            limit: IMPORT_MONTHLY_LIMIT,
            used: currentCount,
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // ── Parse request ──
    const { resumeText, analysisResult } = await req.json();
    if (!resumeText || typeof resumeText !== "string") {
      return new Response(JSON.stringify({ error: "resumeText is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Build recommendations string from analysis result
    let recommendationsBlock = "";
    if (analysisResult) {
      const parts: string[] = [];

      if (analysisResult.bullet_rewrite) {
        const br = analysisResult.bullet_rewrite;
        if (br.original && br.improved) {
          parts.push(`BULLET REWRITE: Replace "${br.original}" with "${br.improved}"`);
          if (br.changes?.length) parts.push(`  Changes applied: ${br.changes.join("; ")}`);
        }
      }

      if (analysisResult.top_priorities?.length) {
        analysisResult.top_priorities.forEach((p: any) => {
          parts.push(`PRIORITY ${p.priority} (${p.level}): ${p.title} — ${p.description}`);
        });
      }

      if (analysisResult.sections?.length) {
        analysisResult.sections.forEach((s: any) => {
          if (s.score < 7) {
            const criticals = s.findings?.filter((f: any) => f.type === "critical" || f.type === "warning")
              .map((f: any) => `${f.principle}: ${f.text}`).join("; ");
            parts.push(`SECTION "${s.name}" scored ${s.score}/10: ${s.summary}${criticals ? ` | Issues: ${criticals}` : ""}`);
          }
        });
      }

      if (parts.length > 0) {
        recommendationsBlock = `\n\nIMPORTANT — ANALYSIS RECOMMENDATIONS TO APPLY:\nThe user's resume was analyzed and the following improvements were identified. You MUST apply these when generating the structured resume data:\n${parts.join("\n")}`;
      }
    }

    const systemPrompt = `You are a resume parser and improver. Given raw resume text, extract structured data AND apply any provided improvement recommendations.

Return a JSON object using this EXACT tool call schema. Extract as much as possible. For dates, use full month names (e.g. "January", "March"). Leave fields empty string "" if not found.

Guidelines:
- For experience: extract each role separately with company, position, location, dates, and description as HTML bullet list (<ul><li>...</li></ul>)
- For education: extract degree, institution, location, dates
- For skills: combine all skills as a single comma-separated string
- For languages: extract each language with proficiency level
- For summary/objective: extract as description text
- For certificates: extract name, issuer, date
- Keep descriptions concise but preserve key achievements and metrics

When improvement recommendations are provided:
- Apply bullet rewrites: replace the original bullet text with the improved version
- Add quantified metrics and achievements where recommended
- Incorporate missing keywords into skills or bullet descriptions
- Improve the professional summary based on feedback
- Ensure all critical issues are addressed in the output`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Parse this resume into structured data and apply all improvement recommendations:\n\n${resumeText.slice(0, 15000)}${recommendationsBlock}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_parsed_resume",
              description: "Return the parsed resume data",
              parameters: {
                type: "object",
                properties: {
                  personalDetails: {
                    type: "object",
                    properties: {
                      fullName: { type: "string" },
                      professionalTitle: { type: "string" },
                      email: { type: "string" },
                      phone: { type: "string" },
                      location: { type: "string" },
                    },
                    required: ["fullName", "professionalTitle", "email", "phone", "location"],
                  },
                  summary: { type: "string", description: "Professional summary or objective text" },
                  experience: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        position: { type: "string" },
                        company: { type: "string" },
                        location: { type: "string" },
                        startMonth: { type: "string" },
                        startYear: { type: "string" },
                        endMonth: { type: "string" },
                        endYear: { type: "string" },
                        currentlyHere: { type: "string", description: "'true' if current role, empty string otherwise" },
                        description: { type: "string", description: "HTML bullet list of achievements" },
                      },
                      required: ["position", "company"],
                    },
                  },
                  education: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        degree: { type: "string" },
                        institution: { type: "string" },
                        location: { type: "string" },
                        startYear: { type: "string" },
                        endYear: { type: "string" },
                        description: { type: "string" },
                      },
                      required: ["degree", "institution"],
                    },
                  },
                  skills: { type: "string", description: "Comma-separated list of skills" },
                  languages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        language: { type: "string" },
                        proficiency: { type: "string" },
                      },
                      required: ["language"],
                    },
                  },
                  certificates: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        issuer: { type: "string" },
                        date: { type: "string" },
                      },
                      required: ["name"],
                    },
                  },
                },
                required: ["personalDetails", "experience", "education", "skills"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_parsed_resume" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI processing failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No structured data returned" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = JSON.parse(toolCall.function.arguments);

    // Convert to ResumeData format
    const sections: any[] = [];

    if (parsed.summary) {
      sections.push({
        id: crypto.randomUUID(),
        type: "summary",
        title: "Summary",
        collapsed: false,
        showHeading: false,
        entries: [{ id: crypto.randomUUID(), fields: { description: parsed.summary } }],
      });
    }

    if (parsed.experience?.length) {
      sections.push({
        id: crypto.randomUUID(),
        type: "experience",
        title: "Professional Experience",
        collapsed: false,
        entries: parsed.experience.map((e: any) => ({
          id: crypto.randomUUID(),
          fields: {
            position: e.position || "",
            company: e.company || "",
            location: e.location || "",
            startMonth: e.startMonth || "",
            startYear: e.startYear || "",
            endMonth: e.endMonth || "",
            endYear: e.endYear || "",
            currentlyHere: e.currentlyHere || "",
            description: e.description || "",
          },
        })),
      });
    }

    if (parsed.education?.length) {
      sections.push({
        id: crypto.randomUUID(),
        type: "education",
        title: "Education",
        collapsed: false,
        entries: parsed.education.map((e: any) => ({
          id: crypto.randomUUID(),
          fields: {
            degree: e.degree || "",
            institution: e.institution || "",
            location: e.location || "",
            startMonth: "",
            startYear: e.startYear || "",
            endMonth: "",
            endYear: e.endYear || "",
            currentlyHere: "",
            description: e.description || "",
          },
        })),
      });
    }

    if (parsed.skills) {
      sections.push({
        id: crypto.randomUUID(),
        type: "skills",
        title: "Skills",
        collapsed: false,
        entries: [{ id: crypto.randomUUID(), fields: { skills: parsed.skills } }],
      });
    }

    if (parsed.languages?.length) {
      sections.push({
        id: crypto.randomUUID(),
        type: "languages",
        title: "Languages",
        collapsed: false,
        entries: parsed.languages.map((l: any) => ({
          id: crypto.randomUUID(),
          fields: { language: l.language || "", proficiency: l.proficiency || "" },
        })),
      });
    }

    if (parsed.certificates?.length) {
      sections.push({
        id: crypto.randomUUID(),
        type: "certificates",
        title: "Certificates",
        collapsed: false,
        entries: parsed.certificates.map((c: any) => ({
          id: crypto.randomUUID(),
          fields: { name: c.name || "", issuer: c.issuer || "", date: c.date || "", url: "" },
        })),
      });
    }

    const resumeData = {
      personalDetails: {
        fullName: parsed.personalDetails?.fullName || "",
        professionalTitle: parsed.personalDetails?.professionalTitle || "",
        email: parsed.personalDetails?.email || "",
        phone: parsed.personalDetails?.phone || "",
        location: parsed.personalDetails?.location || "",
        photo: "",
        extras: [],
      },
      sections,
    };

    // ── Log usage after successful parse ──
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      usage_type: USAGE_TYPE,
    });

    return new Response(JSON.stringify(resumeData), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "X-Import-Usage": `${currentCount + 1}/${IMPORT_MONTHLY_LIMIT}`,
      },
    });
  } catch (e) {
    console.error("parse-resume-to-builder error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
