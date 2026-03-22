import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const mailerliteKey = Deno.env.get("MAILERLITE_API_KEY")!;

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Get all users created today
    const allUsers: any[] = [];
    let page = 1;
    while (true) {
      const { data: { users }, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) throw error;
      allUsers.push(...users);
      if (users.length < 1000) break;
      page++;
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayUsers = allUsers.filter(
      (u) => new Date(u.created_at) >= today
    );

    console.log(`Found ${todayUsers.length} users created today`);

    const results: any[] = [];
    for (const u of todayUsers) {
      const email = u.email;
      if (!email) continue;
      const name = u.user_metadata?.full_name || u.user_metadata?.name || "";
      const parts = name.trim().split(/\s+/);

      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mailerliteKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          fields: { name: parts[0] || "", last_name: parts.slice(1).join(" ") || "" },
          groups: ["181733295867823354"],
        }),
      });

      const data = await res.json();
      results.push({ email, status: res.status, subscriber_status: data?.data?.status });
      console.log(`Synced ${email}: ${res.status}`);
    }

    return new Response(JSON.stringify({ synced: results.length, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("backfill error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
