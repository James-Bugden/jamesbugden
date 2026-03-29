import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const THREADS_API = "https://graph.threads.net/v1.0";

function supabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Token refresh ──────────────────────────────────────────────────
async function getAccessToken(sb: ReturnType<typeof supabaseAdmin>) {
  // Read credentials from env (set as Supabase secrets)
  let accessToken = Deno.env.get("THREADS_ACCESS_TOKEN")!;
  const userId = Deno.env.get("THREADS_USER_ID")!;

  // Try refreshing if we can (long-lived tokens last 60 days)
  try {
    const url = `${THREADS_API}/refresh_access_token?grant_type=th_refresh_token&access_token=${accessToken}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.access_token) {
        accessToken = data.access_token;
        console.log("Token refreshed successfully");
      }
    }
  } catch (e) {
    console.warn("Token refresh failed, using existing token:", e);
  }

  return { accessToken, userId };
}

// ── Fetch all posts with pagination ────────────────────────────────
async function fetchAllPosts(userId: string, token: string) {
  const posts: any[] = [];
  let url = `${THREADS_API}/${userId}/threads?fields=id,text,timestamp,media_type,media_url,thumbnail_url,permalink,shortcode,is_quote_post,children&limit=50&access_token=${token}`;

  while (url) {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch posts:", await res.text());
      break;
    }
    const data = await res.json();
    if (data.data) posts.push(...data.data);
    url = data.paging?.next || null;
    if (url) await delay(200);
  }

  return posts;
}

// ── Fetch post insights ────────────────────────────────────────────
async function fetchPostInsights(mediaId: string, token: string) {
  const url = `${THREADS_API}/${mediaId}/insights?metric=views,likes,replies,reposts,quotes,shares&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const metrics: Record<string, number> = {};
  for (const m of data.data || []) {
    metrics[m.name] = m.values?.[0]?.value ?? 0;
  }
  return metrics;
}

// ── AI image analysis via Anthropic ────────────────────────────────
async function analyzeImage(imageUrl: string): Promise<{ description: string; tags: string[] } | null> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "url", url: imageUrl },
              },
              {
                type: "text",
                text: `You are analyzing social media images for a career coaching account on Threads. Respond with JSON only, no markdown.

Describe this image in one sentence. Then classify it with 1-3 tags from this exact list: quote-graphic, screenshot, selfie, photo, carousel-slides, infographic, meme, text-overlay, branded-template, data-chart, book-cover, behind-the-scenes, testimonial, other. Return JSON: {"description": "...", "tags": ["..."]}`,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("Anthropic API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (e) {
    console.error("Image analysis failed:", e);
    return null;
  }
}

// ── Fetch user insights for a date range ───────────────────────────
async function fetchUserInsights(
  userId: string,
  token: string,
  since: number,
  until: number
) {
  const url = `${THREADS_API}/${userId}/threads_insights?metric=views,likes,replies,reposts,quotes&since=${since}&until=${until}&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("User insights error:", await res.text());
    return null;
  }
  return await res.json();
}

// ── Fetch follower count ───────────────────────────────────────────
async function fetchFollowerCount(userId: string, token: string) {
  const url = `${THREADS_API}/${userId}/threads_insights?metric=followers_count&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0]?.total_value?.value ?? null;
}

// ── Fetch link clicks ──────────────────────────────────────────────
async function fetchLinkClicks(
  userId: string,
  token: string,
  since: number,
  until: number
) {
  const url = `${THREADS_API}/${userId}/threads_insights?metric=clicks&since=${since}&until=${until}&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return await res.json();
}

// ── Fetch demographics ─────────────────────────────────────────────
async function fetchDemographics(
  userId: string,
  token: string,
  breakdownType: string
) {
  const url = `${THREADS_API}/${userId}/threads_insights?metric=follower_demographics&breakdown=${breakdownType}&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Demographics ${breakdownType} error:`, await res.text());
    return null;
  }
  return await res.json();
}

// ── Main sync logic ────────────────────────────────────────────────
async function syncThreads(action?: string) {
  const sb = supabaseAdmin();
  const { accessToken, userId } = await getAccessToken(sb);

  console.log("Starting sync for user:", userId);

  // ── 1. Fetch and upsert posts ──────────────────────────────────
  const posts = await fetchAllPosts(userId, accessToken);
  console.log(`Fetched ${posts.length} posts`);

  let analyzedCount = 0;

  for (const post of posts) {
    // Skip reposts
    if (post.media_type === "REPOST_FACADE") continue;

    // Fetch insights
    const insights = await fetchPostInsights(post.id, accessToken);
    await delay(200);

    const row = {
      media_id: post.id,
      text_content: post.text || null,
      media_type: post.media_type || null,
      permalink: post.permalink || null,
      shortcode: post.shortcode || null,
      is_quote_post: post.is_quote_post || false,
      posted_at: post.timestamp || null,
      media_url: post.media_url || null,
      thumbnail_url: post.thumbnail_url || null,
      views: insights?.views ?? 0,
      likes: insights?.likes ?? 0,
      replies: insights?.replies ?? 0,
      reposts: insights?.reposts ?? 0,
      quotes: insights?.quotes ?? 0,
      shares: insights?.shares ?? 0,
      fetched_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await sb.from("threads_posts").upsert(row, {
      onConflict: "media_id",
    });
    if (error) console.error("Upsert post error:", error);
  }

  // ── 1b. AI image analysis for un-analyzed posts ────────────────
  const { data: unanalyzed } = await sb
    .from("threads_posts")
    .select("id, media_id, media_url, media_type")
    .not("media_url", "is", null)
    .is("image_analyzed_at", null)
    .limit(50);

  if (unanalyzed && unanalyzed.length > 0) {
    console.log(`Analyzing ${unanalyzed.length} images...`);
    for (const post of unanalyzed) {
      const imageUrl = post.media_url;
      if (!imageUrl) continue;

      const result = await analyzeImage(imageUrl);
      if (result) {
        await sb
          .from("threads_posts")
          .update({
            image_description: result.description,
            image_tags: result.tags,
            image_analyzed_at: new Date().toISOString(),
          })
          .eq("id", post.id);
        analyzedCount++;
      }
      await delay(500); // Rate limit
    }
    console.log(`Analyzed ${analyzedCount} images`);
  }

  // ── 2. Daily user insights ─────────────────────────────────────
  if (action === "backfill") {
    await backfillInsights(sb, userId, accessToken);
  } else {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    const since = Math.floor(yesterday.getTime() / 1000);
    const until = Math.floor(todayMidnight.getTime() / 1000);

    const insightsData = await fetchUserInsights(
      userId,
      accessToken,
      since,
      until
    );
    const followerCount = await fetchFollowerCount(userId, accessToken);

    if (insightsData?.data) {
      const metrics: Record<string, number> = {};
      for (const m of insightsData.data) {
        // For time-series metrics, sum the values
        if (m.values) {
          metrics[m.name] = m.values.reduce(
            (sum: number, v: any) => sum + (v.value || 0),
            0
          );
        } else if (m.total_value) {
          metrics[m.name] = m.total_value.value || 0;
        }
      }

      const dateStr = yesterday.toISOString().split("T")[0];
      await sb.from("threads_user_insights").upsert(
        {
          metric_date: dateStr,
          profile_views: metrics.views ?? 0,
          total_likes: metrics.likes ?? 0,
          total_replies: metrics.replies ?? 0,
          total_reposts: metrics.reposts ?? 0,
          total_quotes: metrics.quotes ?? 0,
          follower_count: followerCount ?? 0,
        },
        { onConflict: "metric_date" }
      );
    }

    // ── 3. Link clicks ─────────────────────────────────────────────
    const clicksData = await fetchLinkClicks(
      userId,
      accessToken,
      since,
      until
    );
    if (clicksData?.data) {
      for (const metric of clicksData.data) {
        if (metric.values) {
          for (const v of metric.values) {
            if (v.value && typeof v.value === "object") {
              for (const [url, clicks] of Object.entries(v.value)) {
                const dateStr = yesterday.toISOString().split("T")[0];
                await sb.from("threads_link_clicks").upsert(
                  {
                    metric_date: dateStr,
                    link_url: url,
                    clicks: clicks as number,
                  },
                  { onConflict: "metric_date,link_url" }
                );
              }
            }
          }
        }
      }
    }

    // ── 4. Demographics (Mondays only) ─────────────────────────────
    if (now.getDay() === 1) {
      console.log("Monday — refreshing demographics");
      for (const breakdownType of ["country", "city", "age", "gender"]) {
        const demoData = await fetchDemographics(
          userId,
          accessToken,
          breakdownType
        );
        if (demoData?.data) {
          for (const metric of demoData.data) {
            const breakdowns = metric.total_value?.breakdowns?.[0]?.results || [];
            const total = breakdowns.reduce(
              (s: number, r: any) => s + (r.count || 0),
              0
            );
            for (const result of breakdowns) {
              const value = result.dimension_values?.[0] || "unknown";
              const pct = total > 0 ? ((result.count / total) * 100) : 0;
              await sb.from("threads_demographics").upsert(
                {
                  breakdown_type: breakdownType,
                  breakdown_value: value,
                  percentage: Math.round(pct * 100) / 100,
                  fetched_at: new Date().toISOString(),
                },
                { onConflict: "breakdown_type,breakdown_value" }
              );
            }
          }
        }
        await delay(500);
      }
    }
  }

  return { posts: posts.length, analyzed: analyzedCount };
}

// ── Backfill logic ─────────────────────────────────────────────────
async function backfillInsights(
  sb: ReturnType<typeof supabaseAdmin>,
  userId: string,
  token: string
) {
  const startDate = new Date("2024-04-13T00:00:00Z");
  const now = new Date();
  let chunkStart = new Date(startDate);

  console.log("Starting backfill from", startDate.toISOString());

  while (chunkStart < now) {
    const chunkEnd = new Date(chunkStart);
    chunkEnd.setDate(chunkEnd.getDate() + 30);
    if (chunkEnd > now) chunkEnd.setTime(now.getTime());

    const since = Math.floor(chunkStart.getTime() / 1000);
    const until = Math.floor(chunkEnd.getTime() / 1000);

    console.log(
      `Backfill chunk: ${chunkStart.toISOString()} → ${chunkEnd.toISOString()}`
    );

    const insightsData = await fetchUserInsights(userId, token, since, until);

    if (insightsData?.data) {
      // Process daily values from the response
      const metricsByDate: Record<string, Record<string, number>> = {};

      for (const m of insightsData.data) {
        if (m.values) {
          for (const v of m.values) {
            const dateStr =
              v.end_time?.split("T")[0] ||
              new Date(chunkStart).toISOString().split("T")[0];
            if (!metricsByDate[dateStr]) metricsByDate[dateStr] = {};
            metricsByDate[dateStr][m.name] =
              (metricsByDate[dateStr][m.name] || 0) + (v.value || 0);
          }
        }
      }

      for (const [date, metrics] of Object.entries(metricsByDate)) {
        await sb.from("threads_user_insights").upsert(
          {
            metric_date: date,
            profile_views: metrics.views ?? 0,
            total_likes: metrics.likes ?? 0,
            total_replies: metrics.replies ?? 0,
            total_reposts: metrics.reposts ?? 0,
            total_quotes: metrics.quotes ?? 0,
          },
          { onConflict: "metric_date" }
        );
      }
    }

    // Get follower count for the end of this chunk
    const followerCount = await fetchFollowerCount(userId, token);
    if (followerCount !== null) {
      const lastDate = chunkEnd.toISOString().split("T")[0];
      await sb
        .from("threads_user_insights")
        .update({ follower_count: followerCount })
        .eq("metric_date", lastDate);
    }

    chunkStart = new Date(chunkEnd);
    await delay(1000);
  }

  console.log("Backfill complete");
}

// ── HTTP handler ───────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await sb.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin
    const userId = claimsData.claims.sub as string;
    const { data: isAdmin } = await supabaseAdmin().rpc("is_admin", {
      _user_id: userId,
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine action
    let action: string | undefined;
    const url = new URL(req.url);
    action = url.searchParams.get("action") || undefined;

    if (!action && req.method === "POST") {
      try {
        const body = await req.json();
        action = body.action;
      } catch {
        // no body
      }
    }

    const result = await syncThreads(action);

    return new Response(JSON.stringify({ success: true, ...result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("threads-sync error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
