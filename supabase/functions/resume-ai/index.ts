import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, text, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
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
