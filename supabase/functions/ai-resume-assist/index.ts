import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const assistTool = {
  type: "function" as const,
  function: {
    name: "resume_assist_result",
    description: "Return the AI-generated content for the resume criterion.",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "The generated content — comma-separated skills, HTML description, or plain text depending on type.",
        },
        items: {
          type: "array",
          items: { type: "string" },
          description: "For skills/languages: individual items as an array.",
        },
      },
      required: ["content"],
      additionalProperties: false,
    },
  },
};

function buildPrompt(criterionType: string, resumeContext: string): string {
  switch (criterionType) {
    case "summary":
      return `Based on the following resume data, write a concise 2-3 sentence professional summary for this person. Use first-person implied voice (no "I"). Focus on years of experience, key expertise, and value proposition. Return it as HTML wrapped in <p> tags.

Resume data:
${resumeContext}`;

    case "experience":
      return `Based on the following resume data, suggest 3 strong bullet points for the most recent role. Each bullet should start with an action verb, include a quantified result where possible, and be specific. Return as HTML: <ul><li>...</li></ul>.

Resume data:
${resumeContext}`;

    case "experience-descriptions":
      return `Based on the following resume data, improve the existing experience descriptions to be more impactful. For each role, write 3-4 strong bullet points starting with action verbs and including quantified achievements where possible. Return as HTML: <ul><li>...</li></ul>.

Resume data:
${resumeContext}`;

    case "experience-quantified":
      return `Based on the following resume data, rewrite the experience descriptions to include quantified achievements (numbers, percentages, dollar amounts, team sizes). Make each bullet point impactful and specific. Return as HTML: <ul><li>...</li></ul>.

Resume data:
${resumeContext}`;

    case "skills":
      return `Based on the following resume data (job title, experience, industry), suggest 8-12 relevant professional skills. Include a mix of technical and soft skills appropriate for this person's level. Return ONLY as a comma-separated list (no bullets, no numbers).

Resume data:
${resumeContext}`;

    case "personal":
      return `Based on the following resume data, suggest what contact information might be missing. If email or phone appears to be missing, note that. Return a brief suggestion as plain text.

Resume data:
${resumeContext}`;

    default:
      return `Based on the following resume data, suggest content for the "${criterionType}" section. Be specific and professional.

Resume data:
${resumeContext}`;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { criterionType, resumeData } = await req.json();

    if (!criterionType || !resumeData) {
      return new Response(JSON.stringify({ error: "Missing criterionType or resumeData" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build a text summary of resume context
    const pd = resumeData.personalDetails || {};
    const contextParts: string[] = [];
    if (pd.fullName) contextParts.push(`Name: ${pd.fullName}`);
    if (pd.professionalTitle) contextParts.push(`Title: ${pd.professionalTitle}`);
    if (pd.email) contextParts.push(`Email: ${pd.email}`);
    if (pd.phone) contextParts.push(`Phone: ${pd.phone}`);

    const sections = resumeData.sections || [];
    for (const s of sections) {
      if (!s.entries?.length) continue;
      contextParts.push(`\n--- ${s.title || s.type} ---`);
      for (const e of s.entries) {
        const f = e.fields || {};
        const parts: string[] = [];
        if (f.position) parts.push(f.position);
        if (f.company) parts.push(`at ${f.company}`);
        if (f.degree) parts.push(f.degree);
        if (f.institution) parts.push(`at ${f.institution}`);
        if (f.name) parts.push(f.name);
        if (f.startYear) parts.push(`(${f.startMonth || ""} ${f.startYear} - ${f.currentlyHere === "true" ? "Present" : `${f.endMonth || ""} ${f.endYear || ""}`})`);
        if (parts.length) contextParts.push(parts.join(" "));
        if (f.description) {
          const plainDesc = f.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
          if (plainDesc) contextParts.push(`  ${plainDesc.slice(0, 300)}`);
        }
        if (f.skills) contextParts.push(`  Skills: ${f.skills}`);
      }
    }

    const resumeContext = contextParts.join("\n");
    const prompt = buildPrompt(criterionType, resumeContext);

    const body = {
      model: "google/gemini-3-flash-preview",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writing assistant. Generate high-quality, specific, and actionable resume content. Be concise and professional.",
        },
        { role: "user", content: prompt },
      ],
      stream: false,
      tools: [assistTool],
      tool_choice: { type: "function", function: { name: "resume_assist_result" } },
    };

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
      }
    }

    // Fallback: content as text
    const content = data.choices?.[0]?.message?.content || "";
    return new Response(JSON.stringify({ result: { content } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-resume-assist error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
