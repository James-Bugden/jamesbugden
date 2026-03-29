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
async function getAccessToken() {
  let accessToken = Deno.env.get("THREADS_ACCESS_TOKEN")!;
  const userId = Deno.env.get("THREADS_USER_ID")!;

  try {
    const url = `${THREADS_API}/refresh_access_token?grant_type=th_refresh_token&access_token=${accessToken}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.access_token) {
        accessToken = data.access_token;
        console.log("Token refreshed successfully");
      }
    } else {
      await res.text(); // consume body
    }
  } catch (e) {
    console.warn("Token refresh failed, using existing token:", e);
  }

  return { accessToken, userId };
}

// ── Fetch all posts with pagination ────────────────────────────────
async function fetchAllPosts(userId: string, token: string) {
  const posts: any[] = [];
  let url: string | null = `${THREADS_API}/${userId}/threads?fields=id,text,timestamp,media_type,media_url,thumbnail_url,permalink,shortcode,is_quote_post,children&limit=50&access_token=${token}`;

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
  if (!res.ok) {
    await res.text(); // consume
    return null;
  }
  const data = await res.json();
  const metrics: Record<string, number> = {};
  for (const m of data.data || []) {
    metrics[m.name] = m.values?.[0]?.value ?? 0;
  }
  return metrics;
}

// ── Batch fetch insights with concurrency ──────────────────────────
async function batchFetchInsights(
  mediaIds: string[],
  token: string,
  concurrency = 5
): Promise<Map<string, Record<string, number>>> {
  const results = new Map<string, Record<string, number>>();
  for (let i = 0; i < mediaIds.length; i += concurrency) {
    const batch = mediaIds.slice(i, i + concurrency);
    const settled = await Promise.allSettled(
      batch.map(async (id) => {
        const insights = await fetchPostInsights(id, token);
        return { id, insights };
      })
    );
    for (const result of settled) {
      if (result.status === "fulfilled" && result.value.insights) {
        results.set(result.value.id, result.value.insights);
      }
    }
    if (i + concurrency < mediaIds.length) await delay(100);
  }
  return results;
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
              { type: "image", source: { type: "url", url: imageUrl } },
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
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return null;
  } catch (e) {
    console.error("Image analysis failed:", e);
    return null;
  }
}

// ── Fetch user insights for a date range ───────────────────────────
async function fetchUserInsights(userId: string, token: string, since: number, until: number) {
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
  if (!res.ok) {
    await res.text();
    return null;
  }
  const data = await res.json();
  return data.data?.[0]?.total_value?.value ?? null;
}

// ── Fetch link clicks ──────────────────────────────────────────────
async function fetchLinkClicks(userId: string, token: string, since: number, until: number) {
  const url = `${THREADS_API}/${userId}/threads_insights?metric=clicks&since=${since}&until=${until}&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    await res.text();
    return null;
  }
  return await res.json();
}

// ── Fetch demographics ─────────────────────────────────────────────
async function fetchDemographics(userId: string, token: string, breakdownType: string) {
  const url = `${THREADS_API}/${userId}/threads_insights?metric=follower_demographics&breakdown=${breakdownType}&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Demographics ${breakdownType} error:`, await res.text());
    return null;
  }
  return await res.json();
}

// ── Action: sync (optimized) ───────────────────────────────────────
async function actionSync(sb: ReturnType<typeof supabaseAdmin>, userId: string, token: string) {
  console.log("=== ACTION: sync ===");

  // 1. Fetch all posts from API
  const posts = await fetchAllPosts(userId, token);
  console.log(`Fetched ${posts.length} posts from API`);

  // 2. Get existing post media_ids with their current views from DB
  const { data: existingPosts } = await sb
    .from("threads_posts")
    .select("media_id, views, posted_at")
    .limit(1000);
  const existingMap = new Map(
    (existingPosts || []).map((p: any) => [p.media_id, { views: p.views || 0, posted_at: p.posted_at }])
  );

  // 3. Determine which posts need insight fetches:
  //    - New posts (not in DB)
  //    - Posts from last 7 days
  //    - Posts with 0 views (never had insights fetched)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const postsNeedingInsights: string[] = [];
  const filteredPosts = posts.filter((p: any) => p.media_type !== "REPOST_FACADE");

  for (const post of filteredPosts) {
    const existing = existingMap.get(post.id);
    if (!existing) {
      // New post
      postsNeedingInsights.push(post.id);
    } else if (existing.views === 0) {
      // Never had insights
      postsNeedingInsights.push(post.id);
    } else if (existing.posted_at && new Date(existing.posted_at) > sevenDaysAgo) {
      // Recent post - refresh insights
      postsNeedingInsights.push(post.id);
    }
  }

  console.log(`Posts needing insight refresh: ${postsNeedingInsights.length} of ${filteredPosts.length}`);

  // 4. Batch fetch insights (concurrency 5)
  const insightsMap = await batchFetchInsights(postsNeedingInsights, token, 5);
  console.log(`Fetched insights for ${insightsMap.size} posts`);

  // 5. Upsert all posts (with insights where available)
  let upsertCount = 0;
  for (const post of filteredPosts) {
    const insights = insightsMap.get(post.id);
    const row: any = {
      media_id: post.id,
      text_content: post.text || null,
      media_type: post.media_type || null,
      permalink: post.permalink || null,
      shortcode: post.shortcode || null,
      is_quote_post: post.is_quote_post || false,
      posted_at: post.timestamp || null,
      media_url: post.media_url || null,
      thumbnail_url: post.thumbnail_url || null,
      fetched_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (insights) {
      row.views = insights.views ?? 0;
      row.likes = insights.likes ?? 0;
      row.replies = insights.replies ?? 0;
      row.reposts = insights.reposts ?? 0;
      row.quotes = insights.quotes ?? 0;
      row.shares = insights.shares ?? 0;
    }

    const { error } = await sb.from("threads_posts").upsert(row, { onConflict: "media_id" });
    if (error) console.error("Upsert post error:", error);
    else upsertCount++;
  }
  console.log(`Upserted ${upsertCount} posts`);

  // 6. Daily user insights (yesterday)
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const todayMidnight = new Date(now);
  todayMidnight.setHours(0, 0, 0, 0);

  const since = Math.floor(yesterday.getTime() / 1000);
  const until = Math.floor(todayMidnight.getTime() / 1000);

  const insightsData = await fetchUserInsights(userId, token, since, until);
  const followerCount = await fetchFollowerCount(userId, token);

  if (insightsData?.data) {
    const metrics: Record<string, number> = {};
    for (const m of insightsData.data) {
      if (m.values) {
        metrics[m.name] = m.values.reduce((sum: number, v: any) => sum + (v.value || 0), 0);
      } else if (m.total_value) {
        metrics[m.name] = m.total_value.value || 0;
      }
    }

    const dateStr = yesterday.toISOString().split("T")[0];
    const { error } = await sb.from("threads_user_insights").upsert(
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
    if (error) console.error("Upsert daily insights error:", error);
    else console.log(`Daily insights saved for ${dateStr}`);
  } else {
    console.log("No daily insights data returned");
  }

  // 7. Link clicks
  const clicksData = await fetchLinkClicks(userId, token, since, until);
  if (clicksData?.data) {
    for (const metric of clicksData.data) {
      if (metric.values) {
        for (const v of metric.values) {
          if (v.value && typeof v.value === "object") {
            for (const [url, clicks] of Object.entries(v.value)) {
              const dateStr = yesterday.toISOString().split("T")[0];
              await sb.from("threads_link_clicks").upsert(
                { metric_date: dateStr, link_url: url, clicks: clicks as number },
                { onConflict: "metric_date,link_url" }
              );
            }
          }
        }
      }
    }
    console.log("Link clicks saved");
  }

  console.log("=== sync complete ===");
  return { posts: filteredPosts.length, insightsFetched: insightsMap.size };
}

// ── Action: demographics ───────────────────────────────────────────
async function actionDemographics(sb: ReturnType<typeof supabaseAdmin>, userId: string, token: string) {
  console.log("=== ACTION: demographics ===");
  let saved = 0;

  for (const breakdownType of ["country", "city", "age", "gender"]) {
    const demoData = await fetchDemographics(userId, token, breakdownType);
    if (demoData?.data) {
      for (const metric of demoData.data) {
        const breakdowns = metric.total_value?.breakdowns?.[0]?.results || [];
        const total = breakdowns.reduce((s: number, r: any) => s + (r.count || 0), 0);
        for (const result of breakdowns) {
          const value = result.dimension_values?.[0] || "unknown";
          const pctVal = total > 0 ? (result.count / total) * 100 : 0;
          await sb.from("threads_demographics").upsert(
            {
              breakdown_type: breakdownType,
              breakdown_value: value,
              percentage: Math.round(pctVal * 100) / 100,
              fetched_at: new Date().toISOString(),
            },
            { onConflict: "breakdown_type,breakdown_value" }
          );
          saved++;
        }
      }
    }
    await delay(300);
  }

  console.log(`Demographics: saved ${saved} entries`);
  return { demographics: saved };
}

// ── Action: analyze-images ─────────────────────────────────────────
async function actionAnalyzeImages(sb: ReturnType<typeof supabaseAdmin>) {
  console.log("=== ACTION: analyze-images ===");

  const { data: unanalyzed } = await sb
    .from("threads_posts")
    .select("id, media_id, media_url, media_type")
    .not("media_url", "is", null)
    .is("image_analyzed_at", null)
    .limit(10); // Process 10 at a time

  if (!unanalyzed?.length) {
    console.log("No unanalyzed images");
    return { analyzed: 0, remaining: 0 };
  }

  let analyzedCount = 0;
  for (const post of unanalyzed) {
    if (!post.media_url) continue;
    const result = await analyzeImage(post.media_url);
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
    await delay(500);
  }

  // Count remaining
  const { count } = await sb
    .from("threads_posts")
    .select("id", { count: "exact", head: true })
    .not("media_url", "is", null)
    .is("image_analyzed_at", null);

  console.log(`Analyzed ${analyzedCount}, remaining: ${count || 0}`);
  return { analyzed: analyzedCount, remaining: count || 0 };
}

// ── Action: backfill (one 30-day chunk) ────────────────────────────
async function actionBackfill(
  sb: ReturnType<typeof supabaseAdmin>,
  userId: string,
  token: string,
  fromDate?: string
) {
  console.log("=== ACTION: backfill ===");

  const startDate = fromDate ? new Date(fromDate + "T00:00:00Z") : new Date("2024-04-13T00:00:00Z");
  const now = new Date();

  if (startDate >= now) {
    console.log("Backfill complete — start date is in the future");
    return { done: true, nextFrom: null, daysProcessed: 0 };
  }

  const chunkEnd = new Date(startDate);
  chunkEnd.setDate(chunkEnd.getDate() + 30);
  if (chunkEnd > now) chunkEnd.setTime(now.getTime());

  const since = Math.floor(startDate.getTime() / 1000);
  const until = Math.floor(chunkEnd.getTime() / 1000);

  console.log(`Backfill chunk: ${startDate.toISOString().split("T")[0]} → ${chunkEnd.toISOString().split("T")[0]}`);

  const insightsData = await fetchUserInsights(userId, token, since, until);
  let daysProcessed = 0;

  if (insightsData?.data) {
    const metricsByDate: Record<string, Record<string, number>> = {};
    for (const m of insightsData.data) {
      if (m.values) {
        for (const v of m.values) {
          const dateStr = v.end_time?.split("T")[0] || startDate.toISOString().split("T")[0];
          if (!metricsByDate[dateStr]) metricsByDate[dateStr] = {};
          metricsByDate[dateStr][m.name] = (metricsByDate[dateStr][m.name] || 0) + (v.value || 0);
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
      daysProcessed++;
    }
  }

  // Follower count for end of chunk
  const followerCount = await fetchFollowerCount(userId, token);
  if (followerCount !== null) {
    const lastDate = chunkEnd.toISOString().split("T")[0];
    await sb
      .from("threads_user_insights")
      .update({ follower_count: followerCount })
      .eq("metric_date", lastDate);
  }

  const nextFrom = chunkEnd >= now ? null : chunkEnd.toISOString().split("T")[0];
  console.log(`Backfill chunk done. Days: ${daysProcessed}, next: ${nextFrom || "DONE"}`);

  return { done: !nextFrom, nextFrom, daysProcessed };
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

    const token = authHeader.replace("Bearer ", "");
    const isCronCall = token === Deno.env.get("SUPABASE_ANON_KEY");

    if (!isCronCall) {
      const sb = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );

      const { data: claimsData, error: claimsError } = await sb.auth.getClaims(token);
      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userId = claimsData.claims.sub as string;
      const { data: isAdmin } = await supabaseAdmin().rpc("is_admin", { _user_id: userId });
      if (!isAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Parse action
    let action: string | undefined;
    let fromDate: string | undefined;
    const url = new URL(req.url);
    action = url.searchParams.get("action") || undefined;

    if (!action && req.method === "POST") {
      try {
        const body = await req.json();
        action = body.action;
        fromDate = body.fromDate;
      } catch {
        // no body
      }
    }

    const sb = supabaseAdmin();
    const { accessToken, userId } = await getAccessToken();

    let result: any;

    switch (action) {
      case "demographics":
        result = await actionDemographics(sb, userId, accessToken);
        break;
      case "analyze-images":
        result = await actionAnalyzeImages(sb);
        break;
      case "backfill":
        result = await actionBackfill(sb, userId, accessToken, fromDate);
        break;
      case "tag-content":
        result = await actionTagContent(sb);
        break;
      default:
        result = await actionSync(sb, userId, accessToken);
        break;
    }

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
