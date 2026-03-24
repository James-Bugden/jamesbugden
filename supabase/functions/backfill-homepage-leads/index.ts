import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const API_KEY = Deno.env.get("MAILERLITE_API_KEY");
    if (!API_KEY) throw new Error("MAILERLITE_API_KEY not set");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const GROUP_ID = "181733295867823354"; // "Homepage and login Signup"
    let cursor: string | null = null;
    const emails: string[] = [];

    while (true) {
      const url = new URL(
        `https://connect.mailerlite.com/api/groups/${GROUP_ID}/subscribers`
      );
      url.searchParams.set("limit", "100");
      if (cursor) url.searchParams.set("cursor", cursor);

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();

      for (const sub of data.data || []) {
        if (sub.email) emails.push(sub.email);
      }

      cursor = data.meta?.next_cursor;
      if (!cursor) break;
    }

    // Insert with upsert (ignore duplicates on email)
    let inserted = 0;
    const batchSize = 50;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const rows = batch.map((e) => ({ email: e, source: "homepage-backfill" }));

      const { error } = await supabase
        .from("email_gate_leads")
        .insert(rows);

      if (error) {
        console.error("Batch insert error:", error.message);
      } else {
        inserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({ total_found: emails.length, inserted }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Backfill error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
