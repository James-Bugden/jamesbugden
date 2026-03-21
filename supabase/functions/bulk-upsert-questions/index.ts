import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const questions = await req.json();

    if (!Array.isArray(questions)) {
      return new Response(JSON.stringify({ error: "Expected array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Process in batches of 50
    const batchSize = 50;
    let upserted = 0;
    let errors: string[] = [];

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize).map((q: any) => ({
        id: q.id,
        question_en: q.question_en,
        question_zh: q.question_zh,
        category: q.category,
        tags: q.tags,
        difficulty: q.difficulty,
        audience: q.audience,
        source: q.source || null,
        answer_en: q.answer_en || null,
        answer_zh: q.answer_zh || null,
      }));

      const { error } = await supabase
        .from("interview_questions")
        .upsert(batch, { onConflict: "id" });

      if (error) {
        errors.push(`Batch ${i / batchSize}: ${error.message}`);
      } else {
        upserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({ upserted, total: questions.length, errors }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
