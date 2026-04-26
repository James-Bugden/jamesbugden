import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  FileText, ExternalLink, ChevronDown, Download, Search, Eye, Heart, MessageCircle, Repeat2,
} from "lucide-react";
import { type DateRange, type ThreadsPost, useAllPosts, fmt, pct } from "./analyticsShared";

function truncate(s: string | null, n: number) { if (!s) return ""; return s.length > n ? s.slice(0, n) + "…" : s; }

function toTaiwanTime(iso: string | null) {
  if (!iso) return { day: "", time: "", date: "" };
  const d = new Date(iso);
  const tw = new Date(d.getTime() + 8 * 60 * 60 * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days[tw.getUTCDay()],
    time: `${tw.getUTCHours().toString().padStart(2, "0")}:${tw.getUTCMinutes().toString().padStart(2, "0")}`,
    date: `${tw.getUTCMonth() + 1}/${tw.getUTCDate()}`,
  };
}

const MEDIA_LABELS: Record<string, string> = { TEXT_POST: "Text", IMAGE: "Image", CAROUSEL_ALBUM: "Carousel", VIDEO: "Video" };
const MEDIA_COLORS: Record<string, string> = { TEXT_POST: "bg-blue-50 text-blue-600 border-blue-200", IMAGE: "bg-purple-50 text-purple-600 border-purple-200", CAROUSEL_ALBUM: "bg-indigo-50 text-indigo-600 border-indigo-200", VIDEO: "bg-pink-50 text-pink-600 border-pink-200" };

type SortKey = "engagement_rate" | "views";

function PostThumb({ post, size = 52 }: { post: ThreadsPost; size?: number }) {
  const url = post.thumbnail_url || post.media_url;
  if (url) return <img src={url} alt="" className="rounded-lg object-cover bg-gray-100 shrink-0" style={{ width: size, height: size }} loading="lazy" />;
  return <div className="rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100" style={{ width: size, height: size }}><FileText className="w-5 h-5 text-gray-300" /></div>;
}

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
    if (search) { const q = search.toLowerCase(); result = result.filter(p => p.text_content?.toLowerCase().includes(q)); }
    result.sort((a, b) => Number(b[sortBy]) - Number(a[sortBy]));
    return result;
  }, [posts, sortBy, search]);

  const visible = filtered.slice(0, showCount);
  const toggle = (id: string) => setExpanded(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  const exportCsv = () => {
    const headers = ["media_id", "text_content", "media_type", "posted_at", "views", "likes", "replies", "reposts", "quotes", "shares", "engagement_rate", "permalink"];
    const escape = (v: any) => { const s = v == null ? "" : String(v); return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s; };
    const rows = filtered.map(p => headers.map(h => escape((p as any)[h])).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "threads_posts.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input placeholder="Search posts…" value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10 bg-white border-gray-200 rounded-lg text-sm" />
        </div>
        <Select value={sortBy} onValueChange={v => setSortBy(v as SortKey)}>
          <SelectTrigger className="w-[160px] h-10 text-xs bg-white border-gray-200 rounded-lg"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
            <SelectItem value="views">Views</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={exportCsv} className="h-10 text-xs border-gray-200 rounded-lg px-4">
          <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Posts</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{pct(medianEng)}</div>
          <div className="text-xs text-gray-500 mt-1">Median Engagement</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">
            {filtered.length && medianEng > 0 ? (Number(filtered[0].engagement_rate) / medianEng).toFixed(1) + "×" : ", "}
          </div>
          <div className="text-xs text-gray-500 mt-1">#1 vs Median</div>
        </div>
      </div>

      {/* Posts list */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {visible.map((p, i) => {
          const tw = toTaiwanTime(p.posted_at);
          const isExpanded = expanded.has(p.id);
          const eng = Number(p.engagement_rate);
          const isAboveAvg = eng >= medianEng;
          return (
            <button key={p.id} type="button" className={`w-full text-left p-4 hover:bg-gray-50/50 transition-colors cursor-pointer ${i > 0 ? "border-t border-gray-50" : ""}`} onClick={() => toggle(p.id)}>
              <div className="flex gap-4">
                <div className="flex items-start gap-3 shrink-0">
                  <span className="text-sm font-bold text-gray-300 w-7 text-right pt-1">{i + 1}</span>
                  <PostThumb post={p} />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {isExpanded ? p.text_content : truncate(p.text_content, 180)}
                    {!isExpanded && (p.text_content?.length || 0) > 180 && <ChevronDown className="inline w-3.5 h-3.5 ml-1 text-gray-300" />}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="outline" className={`text-[10px] py-0.5 px-2 border ${MEDIA_COLORS[p.media_type || ""] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
                      {MEDIA_LABELS[p.media_type || ""] || p.media_type}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] py-0.5 px-2 border-gray-200 text-gray-400 bg-gray-50">
                      {tw.date} {tw.day} {tw.time}
                    </Badge>
                    {p.content_topic && (
                      <Badge className="text-[10px] py-0.5 px-2 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100">
                        {p.content_topic}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1"><Eye className="w-3 h-3" />{fmt(p.views)}</span>
                    <span className="inline-flex items-center gap-1"><Heart className="w-3 h-3" />{fmt(p.likes)}</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle className="w-3 h-3" />{fmt(p.replies)}</span>
                    <span className="inline-flex items-center gap-1"><Repeat2 className="w-3 h-3" />{fmt(p.reposts + p.quotes)}</span>
                    <span className={`inline-flex items-center gap-1.5 font-semibold ${isAboveAvg ? "text-emerald-600" : "text-gray-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${isAboveAvg ? "bg-emerald-500" : "bg-red-400"}`} />
                      {pct(eng)}
                    </span>
                    {p.permalink && (
                      <a href={p.permalink} target="_blank" rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-0.5 ml-auto"
                        onClick={e => e.stopPropagation()}>
                        Open <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {showCount < filtered.length && (
        <div className="text-center">
          <Button variant="outline" size="sm" onClick={() => setShowCount(prev => prev + 20)} className="text-xs border-gray-200 rounded-lg px-6">
            Show more ({filtered.length - showCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PostDetailSections({ range }: { range: DateRange }) {
  const postsQ = useAllPosts(range);
  const posts = postsQ.data || [];

  if (postsQ.isLoading) return <Skeleton className="h-[400px] rounded-xl" />;
  if (!posts.length) return null;

  return <TopPostsSection posts={posts} />;
}
