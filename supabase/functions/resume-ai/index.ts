import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SECTION_TYPES = [
  "experience", "education", "skills", "languages", "summary",
  "certificates", "interests", "projects", "courses", "awards",
  "organisations", "publications", "references", "declaration", "custom",
];

const parseResumeTool = {
  type: "function" as const,
  function: {
    name: "parsed_resume",
    description: "Return the structured resume data extracted from the text.",
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
            linkedin: { type: "string" },
            website: { type: "string" },
          },
          required: ["fullName", "professionalTitle", "email", "phone", "location"],
          additionalProperties: false,
        },
        sections: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: SECTION_TYPES },
              title: { type: "string", description: "The section heading as shown on the resume" },
              entries: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    fields: {
                      type: "object",
                      description: "Key-value pairs whose keys depend on section type.",
                      properties: {
                        position: { type: "string", description: "Job title (experience)" },
                        company: { type: "string", description: "Employer (experience)" },
                        degree: { type: "string", description: "Degree/qualification (education)" },
                        institution: { type: "string", description: "School name (education)" },
                        location: { type: "string", description: "Location" },
                        startMonth: { type: "string", description: "Full month name e.g. January" },
                        startYear: { type: "string", description: "4-digit year" },
                        endMonth: { type: "string", description: "Full month name" },
                        endYear: { type: "string", description: "4-digit year" },
                        currentlyHere: { type: "string", description: "\"true\" if ongoing, empty otherwise" },
                        description: { type: "string", description: "HTML content: <p> or <ul><li>" },
                        skills: { type: "string", description: "Comma-separated skills (skills section)" },
                        interests: { type: "string", description: "Comma-separated interests" },
                        language: { type: "string", description: "Language name" },
                        proficiency: { type: "string", description: "Native/Fluent/Advanced/Intermediate/Basic" },
                        name: { type: "string", description: "Name for certificates/awards/projects/courses/references" },
                        role: { type: "string", description: "Role in project/organisation" },
                        issuer: { type: "string", description: "Issuing authority" },
                        date: { type: "string", description: "Date string" },
                        url: { type: "string", description: "URL if available" },
                        title: { type: "string", description: "Title for publications" },
                        publisher: { type: "string", description: "Publisher name" },
                        email: { type: "string", description: "Email for references" },
                        phone: { type: "string", description: "Phone for references" },
                        relationship: { type: "string", description: "Relationship for references" },
                        sectionTitle: { type: "string", description: "Custom section title" },
                        fullName: { type: "string", description: "Full name for declaration" },
                        place: { type: "string", description: "Place for declaration" },
                        signature: { type: "string", description: "Signature text" },
                      },
                    },
                  },
                  required: ["fields"],
                },
              },
            },
            required: ["type", "title", "entries"],
            additionalProperties: false,
          },
        },
      },
      required: ["personalDetails", "sections"],
      additionalProperties: false,
    },
  },
};

const AI_TOOL_MONTHLY_LIMIT = 6;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, text, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Auth extraction (required for rate limiting)
    let userId: string | null = null;
    let supabase: any = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      try {
        supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_ANON_KEY")!,
          { global: { headers: { Authorization: authHeader } } }
        );
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabase.auth.getClaims(token);
        userId = data?.claims?.sub ?? null;
      } catch { /* skip silently */ }
    }

    // Rate limit check for authenticated users
    if (userId && supabase) {
      try {
        const { data: countData } = await supabase.rpc("count_ai_usage_this_month", {
          p_user_id: userId,
          p_usage_type: "ai_tool",
        });
        const currentCount = (countData as number) ?? 0;
        if (currentCount >= AI_TOOL_MONTHLY_LIMIT) {
          return new Response(
            JSON.stringify({
              error: "Monthly AI tool limit reached",
              limit: AI_TOOL_MONTHLY_LIMIT,
              used: currentCount,
            }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } catch { /* don't block on rate limit check failure */ }
    }

    let systemPrompt = "";
    let userPrompt = "";
    let tools: any[] | undefined;
    let tool_choice: any | undefined;

    switch (action) {
      case "parse_resume": {
        systemPrompt = `You are a resume parser. Given raw resume text, extract ALL content into structured sections.

Rules:
- Identify the person's name, title, email, phone, location, LinkedIn, and website from the header area.
- Map each section to the correct type: experience, education, skills, languages, summary, certificates, interests, projects, courses, awards, organisations, publications, references, declaration, or custom.
- For experience entries: position = job title, company = employer name, description = bullet points as HTML (<ul><li>...</li></ul>).
- For education entries: degree = degree/qualification, institution = school name, description = any additional details as HTML.
- For skills/interests: provide a single comma-separated string of all items.
- For languages: each language is a separate entry with proficiency level (Native, Fluent, Advanced, Intermediate, Basic).
- Month names should be full English: January, February, etc.
- If an entry says "Present", "Current", or "Now" for end date, set currentlyHere to "true" and leave endMonth/endYear empty.
- Do NOT skip any content. Every piece of information should appear in some section.
- If a section doesn't match any known type, use "custom".
- description fields should use HTML: <p> for paragraphs, <ul><li> for bullets.
- Preserve the original section ordering from the resume.`;
        userPrompt = text;
        tools = [parseResumeTool];
        tool_choice = { type: "function", function: { name: "parsed_resume" } };
        break;
      }
      case "improve":
        systemPrompt = "You are a professional resume writer. Improve the following text to be more impactful, concise, and use strong action verbs. Keep bullet points if present. Return ONLY the improved text in the same HTML format, no explanation.";
        userPrompt = text;
        break;
      case "grammar":
        systemPrompt = "You are an expert proofreader. Fix any grammar, spelling, punctuation, and style issues in the following resume text. Return ONLY the corrected text in the same HTML format, no explanation.";
        userPrompt = text;
        break;
      case "starter":
        systemPrompt = "You are a professional resume writer. Generate 3-4 bullet points for a resume entry based on the context provided. Use strong action verbs and quantify achievements where possible. Return ONLY HTML bullet list, no explanation.";
        userPrompt = context || "Generate professional resume bullet points for a typical role.";
        break;
      case "tailor":
        systemPrompt = `You are a resume optimization expert. The user will provide their resume text and a job description (in context). Analyze the match and return HTML with:
1. <h3>Match Score</h3> with an estimated percentage match
2. <h3>Missing Keywords</h3> with a bullet list of important keywords/skills from the JD not found in the resume
3. <h3>Suggested Improvements</h3> with specific bullet point rewrites that incorporate missing keywords naturally
Keep it actionable and concise.`;
        userPrompt = text;
        if (context) userPrompt += "\n\n--- JOB DESCRIPTION ---\n" + context;
        break;
      case "summary":
        systemPrompt = "You are a professional resume writer. Based on the resume content provided, generate a compelling 2-3 sentence professional summary. Return ONLY the summary text as a paragraph, no HTML tags, no explanation.";
        userPrompt = text;
        break;
      case "skills":
        systemPrompt = "You are a career advisor. Based on the resume content, suggest 10-15 relevant skills the candidate should add. Return as an HTML bullet list grouped by category (Technical, Soft Skills, Tools). No explanation.";
        userPrompt = text;
        break;
      case "optimize":
        systemPrompt = "You are a professional resume writer. Take all the experience bullet points from this resume and rewrite them to be more impactful using strong action verbs and quantified results. Return the improved bullets as HTML, grouped by role/company. Preserve the original meaning.";
        userPrompt = text;
        break;
      default:
        throw new Error("Unknown action: " + action);
    }

    const body: any = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream: false,
    };

    if (tools) {
      body.tools = tools;
      body.tool_choice = tool_choice;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    // Best-effort usage logging
    if (userId) {
      try {
        const sb = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await sb.from("ai_usage_log").insert({ user_id: userId, usage_type: "ai_tool" });
      } catch { /* don't fail the request */ }
    }

    // Handle tool-call response for parse_resume
    if (action === "parse_resume") {
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        try {
          const parsed = typeof toolCall.function.arguments === "string"
            ? JSON.parse(toolCall.function.arguments)
            : toolCall.function.arguments;
          return new Response(JSON.stringify({ result: parsed }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        } catch (parseErr) {
          console.error("Failed to parse tool call arguments:", parseErr);
          return new Response(JSON.stringify({ error: "Failed to parse AI structured output" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
      // Fallback: try content as JSON
      const content = data.choices?.[0]?.message?.content || "";
      try {
        const parsed = JSON.parse(content);
        return new Response(JSON.stringify({ result: parsed }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        console.error("AI did not return structured output for parse_resume");
        return new Response(JSON.stringify({ error: "AI did not return structured data" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const result = data.choices?.[0]?.message?.content || "";
    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("resume-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
