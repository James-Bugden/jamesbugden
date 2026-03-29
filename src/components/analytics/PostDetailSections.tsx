import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  FileText, ExternalLink, ChevronDown, Download, Search,
} from "lucide-react";
import { type DateRange, type ThreadsPost, useAllPosts, fmt, pct } from "./analyticsShared";

// ── helpers ────────────────────────────────────────────────────────
function truncate(s: string | null, n: number) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n) + "…" : s;
}

function toTaiwanTime(iso: string | null) {
  if (!iso) return { day: "", time: "" };
  const d = new Date(iso);
  const tw = new Date(d.getTime() + 8 * 60 * 60 * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days[tw.getUTCDay()],
    time: `${tw.getUTCHours().toString().padStart(2, "0")}:${tw.getUTCMinutes().toString().padStart(2, "0")}`,
  };
}

const MEDIA_LABELS: Record<string, string> = {
  TEXT_POST: "Text", IMAGE: "Image", CAROUSEL_ALBUM: "Carousel", VIDEO: "Video",
};

type SortKey = "engagement_rate" | "views";

// ── Thumbnail ──────────────────────────────────────────────────────
function PostThumb({ post, size = 60 }: { post: ThreadsPost; size?: number }) {
  const url = post.thumbnail_url || post.media_url;
  if (url) {
    return (
      <img src={url} alt="" className="rounded-md object-cover bg-muted flex-shrink-0"
        style={{ width: size, height: size }} loading="lazy" />
    );
  }
  return (
    <div className="rounded-md bg-muted flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}>
      <FileText className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}

// ── Top Performing Posts (simplified) ──────────────────────────────
function TopPostsSection({ posts }: { posts: ThreadsPost[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("engagement_rate");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showCount, setShowCount] = useState(20);

  const medianEng = useMemo(() => {
    const sorted = posts.map(p => Number(p.engagement_rate)).sort((a, b) => a - b);
    return sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  }, [posts]);

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.text_content?.toLowerCase().includes(q));
    }
    result.sort((a, b) => Number(b[sortBy]) - Number(a[sortBy]));
    return result;
  }, [posts, sortBy, search]);

  const visible = filtered.slice(0, showCount);

  const toggle = (id: string) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  // CSV export
  const exportCsv = () => {
    const headers = [
      "media_id", "text_content", "media_type", "posted_at",
      "views", "likes", "replies", "reposts", "quotes", "shares",
      "engagement_rate", "permalink",
    ];
    const escape = (v: any) => {
      const s = v == null ? "" : String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = filtered.map(p => headers.map(h => escape((p as any)[h])).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "threads_posts.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Top Performing Posts</h3>
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="w-3 h-3 mr-1" /> Export CSV
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{posts.length}</div>
            <div className="text-[11px] text-muted-foreground">Total Posts</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{pct(medianEng)}</div>
            <div className="text-[11px] text-muted-foreground">Median Engagement</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-600">
              {filtered.length && medianEng > 0 ? (Number(filtered[0].engagement_rate) / medianEng).toFixed(1) + "×" : "—"}
            </div>
            <div className="text-[11px] text-muted-foreground">#1 vs Median</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search posts…" value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9" />
          </div>
          <Select value={sortBy} onValueChange={v => setSortBy(v as SortKey)}>
            <SelectTrigger className="w-[180px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
              <SelectItem value="views">Views</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts list */}
        <div className="space-y-2">
          {visible.map((p, i) => {
            const tw = toTaiwanTime(p.posted_at);
            const isExpanded = expanded.has(p.id);
            const eng = Number(p.engagement_rate);
            const isAboveAvg = eng >= medianEng;
            return (
              <div key={p.id} className="border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                <div className="flex gap-3 cursor-pointer" onClick={() => toggle(p.id)}>
                  <span className="text-lg font-bold text-muted-foreground w-6 shrink-0 pt-1">
                    {i + 1}
                  </span>
                  <PostThumb post={p} />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <p className="text-sm leading-relaxed">
                      {isExpanded ? p.text_content : truncate(p.text_content, 200)}
                      {!isExpanded && (p.text_content?.length || 0) > 200 && (
                        <ChevronDown className="inline w-3 h-3 ml-1" />
                      )}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px] py-0">
                        {MEDIA_LABELS[p.media_type || ""] || p.media_type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] py-0">{tw.day} {tw.time}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span>{fmt(p.views)} views</span>
                      <span>{fmt(p.likes)} ❤️</span>
                      <span>{fmt(p.replies)} 💬</span>
                      <span>{fmt(p.reposts + p.quotes)} 🔄</span>
                    </div>
                    <div className="flex gap-3 text-xs items-center">
                      <span className={`font-semibold inline-flex items-center gap-1 ${isAboveAvg ? "text-green-600" : "text-muted-foreground"}`}>
                        <span className={`w-2 h-2 rounded-full ${isAboveAvg ? "bg-green-500" : "bg-red-400"}`} />
                        {pct(eng)} engagement
                      </span>
                      {p.permalink && (
                        <a href={p.permalink} target="_blank" rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-0.5 ml-auto"
                          onClick={e => e.stopPropagation()}>
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more */}
        {showCount < filtered.length && (
          <div className="text-center">
            <Button variant="outline" size="sm" onClick={() => setShowCount(prev => prev + 20)}>
              Show more ({filtered.length - showCount} remaining)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Export ──────────────────────────────────────────────────────────
export default function PostDetailSections({ range }: { range: DateRange }) {
  const postsQ = useAllPosts(range);
  const posts = postsQ.data || [];

  if (postsQ.isLoading) {
    return <Skeleton className="h-[400px] rounded-lg" />;
  }

  if (!posts.length) return null;

  return (
    <div className="space-y-6">
      <TopPostsSection posts={posts} />
    </div>
  );
}
