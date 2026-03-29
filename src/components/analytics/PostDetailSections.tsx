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
  FileText, ExternalLink, ChevronDown, ChevronUp, Download,
  ChevronLeft, ChevronRight, Search,
} from "lucide-react";
import { type DateRange, type ThreadsPost, useAllPosts, fmt, pct } from "./analyticsShared";

// ── helpers ────────────────────────────────────────────────────────
function truncate(s: string | null, n: number) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n) + "…" : s;
}

function toTaiwanTime(iso: string | null) {
  if (!iso) return { day: "", time: "", dayOfWeek: "" };
  const d = new Date(iso);
  const tw = new Date(d.getTime() + 8 * 60 * 60 * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days[tw.getUTCDay()],
    time: `${tw.getUTCHours().toString().padStart(2, "0")}:${tw.getUTCMinutes().toString().padStart(2, "0")}`,
    dayOfWeek: days[tw.getUTCDay()],
  };
}

const MEDIA_LABELS: Record<string, string> = {
  TEXT_POST: "Text", IMAGE: "Image", CAROUSEL_ALBUM: "Carousel", VIDEO: "Video",
};

const TAG_COLORS: Record<string, string> = {
  "quote-graphic": "bg-purple-100 text-purple-700",
  "text-overlay": "bg-blue-100 text-blue-700",
  "branded-template": "bg-amber-100 text-amber-700",
  "screenshot": "bg-gray-100 text-gray-700",
  "selfie": "bg-pink-100 text-pink-700",
  "photo": "bg-green-100 text-green-700",
  "infographic": "bg-cyan-100 text-cyan-700",
  "meme": "bg-orange-100 text-orange-700",
  "testimonial": "bg-emerald-100 text-emerald-700",
};

type SortKey = "engagement_rate" | "views" | "virality_rate" | "conversation_rate";

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

// ── Section 13: Top Performing Posts ────────────────────────────────
function TopPostsSection({ posts }: { posts: ThreadsPost[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("engagement_rate");
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => p.image_tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.text_content?.toLowerCase().includes(q));
    }
    if (langFilter !== "all") result = result.filter(p => p.detected_language === langFilter);
    if (tagFilter !== "all") result = result.filter(p => p.image_tags?.includes(tagFilter));
    result.sort((a, b) => Number(b[sortBy]) - Number(a[sortBy]));
    return result.slice(0, 50);
  }, [posts, sortBy, search, langFilter, tagFilter]);

  const toggle = (id: string) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const summaryStats = useMemo(() => {
    const engRates = posts.map(p => Number(p.engagement_rate)).sort((a, b) => a - b);
    const median = engRates.length ? engRates[Math.floor(engRates.length / 2)] : 0;
    const topEng = filtered.length ? Number(filtered[0]?.engagement_rate || 0) : 0;
    const ratio = median > 0 ? (topEng / median).toFixed(1) : "—";
    return { total: posts.length, median, topEng, ratio };
  }, [posts, filtered]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6 space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Top Performing Posts</h3>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{summaryStats.total}</div>
            <div className="text-[11px] text-muted-foreground">Posts Analyzed</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{pct(summaryStats.median)}</div>
            <div className="text-[11px] text-muted-foreground">Median Engagement</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-600">{summaryStats.ratio}×</div>
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
              <SelectItem value="virality_rate">Virality Rate</SelectItem>
              <SelectItem value="conversation_rate">Conversation Rate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={langFilter} onValueChange={setLangFilter}>
            <SelectTrigger className="w-[100px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Lang</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
          {allTags.length > 0 && (
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[140px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Posts list */}
        <div className="space-y-2">
          {filtered.map((p, i) => {
            const tw = toTaiwanTime(p.posted_at);
            const isExpanded = expanded.has(p.id);
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
                    {p.image_description && (
                      <p className="text-[11px] text-muted-foreground">{isExpanded ? p.image_description : truncate(p.image_description, 100)}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px] py-0">
                        {MEDIA_LABELS[p.media_type || ""] || p.media_type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] py-0">
                        {p.detected_language === "zh" ? "ZH" : "EN"}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] py-0">{tw.day}</Badge>
                      <Badge variant="outline" className="text-[10px] py-0">{tw.time}</Badge>
                      {(p.image_tags || []).map(tag => (
                        <Badge key={tag} variant="secondary" className={`text-[10px] py-0 ${TAG_COLORS[tag] || ""}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span>{fmt(p.views)} views</span>
                      <span>{fmt(p.likes)} likes</span>
                      <span>{fmt(p.replies)} replies</span>
                      <span>{fmt(p.reposts)} reposts</span>
                      <span>{fmt(p.quotes)} quotes</span>
                      <span>{fmt(p.shares)} shares</span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="font-semibold text-green-600">{pct(Number(p.engagement_rate))} eng</span>
                      <span className="font-medium">{pct(Number(p.virality_rate))} vir</span>
                      <span className="font-medium">{pct(Number(p.conversation_rate))} conv</span>
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
      </CardContent>
    </Card>
  );
}

// ── Section 14: Full Post Table ────────────────────────────────────
function PostTableSection({ posts }: { posts: ThreadsPost[] }) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string>("posted_at");
  const [sortAsc, setSortAsc] = useState(false);
  const [search, setSearch] = useState("");
  const [mediaFilter, setMediaFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const perPage = 20;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => p.image_tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.text_content?.toLowerCase().includes(q) ||
        p.image_description?.toLowerCase().includes(q)
      );
    }
    if (mediaFilter !== "all") result = result.filter(p => p.media_type === mediaFilter);
    if (langFilter !== "all") result = result.filter(p => p.detected_language === langFilter);
    if (tagFilter !== "all") result = result.filter(p => p.image_tags?.includes(tagFilter));

    result.sort((a, b) => {
      const av = (a as any)[sortKey] ?? "";
      const bv = (b as any)[sortKey] ?? "";
      if (typeof av === "number" && typeof bv === "number") return sortAsc ? av - bv : bv - av;
      return sortAsc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return result;
  }, [posts, search, mediaFilter, langFilter, tagFilter, sortKey, sortAsc]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice(page * perPage, (page + 1) * perPage);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
    setPage(0);
  };

  const SortHeader = ({ k, label, className = "" }: { k: string; label: string; className?: string }) => (
    <th className={`p-2 cursor-pointer hover:text-foreground select-none ${className}`}
      onClick={() => handleSort(k)}>
      <span className="inline-flex items-center gap-0.5">
        {label}
        {sortKey === k && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
      </span>
    </th>
  );

  const exportCsv = () => {
    const headers = [
      "media_id", "text_content", "media_type", "detected_language", "posted_at", "media_url",
      "views", "likes", "replies", "reposts", "quotes", "shares",
      "engagement_rate", "virality_rate", "conversation_rate",
      "image_description", "image_tags", "hashtag", "text_length", "is_quote_post", "permalink",
    ];
    const escape = (v: any) => {
      const s = v == null ? "" : String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = filtered.map(p => headers.map(h => {
      const v = (p as any)[h];
      if (Array.isArray(v)) return escape(v.join("; "));
      return escape(v);
    }).join(","));
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
          <h3 className="text-sm font-medium text-muted-foreground">All Posts ({filtered.length})</h3>
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="w-3 h-3 mr-1" /> Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[160px]">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search…" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
              className="pl-9 h-9" />
          </div>
          <Select value={mediaFilter} onValueChange={v => { setMediaFilter(v); setPage(0); }}>
            <SelectTrigger className="w-[120px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="TEXT_POST">Text</SelectItem>
              <SelectItem value="IMAGE">Image</SelectItem>
              <SelectItem value="CAROUSEL_ALBUM">Carousel</SelectItem>
              <SelectItem value="VIDEO">Video</SelectItem>
            </SelectContent>
          </Select>
          <Select value={langFilter} onValueChange={v => { setLangFilter(v); setPage(0); }}>
            <SelectTrigger className="w-[100px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Lang</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
          {allTags.length > 0 && (
            <Select value={tagFilter} onValueChange={v => { setTagFilter(v); setPage(0); }}>
              <SelectTrigger className="w-[140px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="p-2 w-[60px]"></th>
                <SortHeader k="text_content" label="Post" className="min-w-[160px]" />
                <SortHeader k="detected_language" label="Lang" />
                <SortHeader k="media_type" label="Type" />
                <th className="p-2">Tags</th>
                <SortHeader k="posted_at" label="Date" />
                <SortHeader k="views" label="Views" className="text-right" />
                <SortHeader k="likes" label="Likes" className="text-right" />
                <SortHeader k="replies" label="Replies" className="text-right" />
                <SortHeader k="reposts" label="Reposts" className="text-right" />
                <SortHeader k="quotes" label="Quotes" className="text-right" />
                <SortHeader k="shares" label="Shares" className="text-right" />
                <SortHeader k="engagement_rate" label="Eng%" className="text-right" />
                <SortHeader k="virality_rate" label="Vir%" className="text-right" />
                <SortHeader k="conversation_rate" label="Conv%" className="text-right" />
              </tr>
            </thead>
            <tbody>
              {pageData.map(p => {
                const isExp = expandedId === p.id;
                return (
                  <tr key={p.id} className="border-b hover:bg-muted/30 cursor-pointer"
                    onClick={() => setExpandedId(isExp ? null : p.id)}>
                    <td className="p-2"><PostThumb post={p} size={40} /></td>
                    <td className="p-2 max-w-[200px]">
                      <span className="block truncate">{truncate(p.text_content, 80)}</span>
                    </td>
                    <td className="p-2">{p.detected_language === "zh" ? "ZH" : "EN"}</td>
                    <td className="p-2">{MEDIA_LABELS[p.media_type || ""] || p.media_type}</td>
                    <td className="p-2">
                      <div className="flex gap-0.5 flex-wrap max-w-[120px]">
                        {(p.image_tags || []).slice(0, 2).map(t => (
                          <Badge key={t} variant="secondary" className={`text-[9px] py-0 ${TAG_COLORS[t] || ""}`}>{t}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">{p.posted_at?.split("T")[0]}</td>
                    <td className="p-2 text-right">{fmt(p.views)}</td>
                    <td className="p-2 text-right">{fmt(p.likes)}</td>
                    <td className="p-2 text-right">{fmt(p.replies)}</td>
                    <td className="p-2 text-right">{fmt(p.reposts)}</td>
                    <td className="p-2 text-right">{fmt(p.quotes)}</td>
                    <td className="p-2 text-right">{fmt(p.shares)}</td>
                    <td className="p-2 text-right font-medium text-green-600">{pct(Number(p.engagement_rate))}</td>
                    <td className="p-2 text-right">{pct(Number(p.virality_rate))}</td>
                    <td className="p-2 text-right">{pct(Number(p.conversation_rate))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expanded detail */}
        {expandedId && (() => {
          const p = posts.find(x => x.id === expandedId);
          if (!p) return null;
          return (
            <div className="border rounded-lg p-4 bg-muted/20 space-y-3">
              <div className="flex gap-4">
                {(p.media_url || p.thumbnail_url) && (
                  <img src={p.media_url || p.thumbnail_url || ""} alt=""
                    className="rounded-md object-cover max-w-[300px] max-h-[300px]" />
                )}
                <div className="space-y-2 min-w-0 flex-1">
                  <p className="text-sm whitespace-pre-wrap">{p.text_content}</p>
                  {p.image_description && (
                    <p className="text-xs text-muted-foreground">{p.image_description}</p>
                  )}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                    <div><span className="text-muted-foreground">Views:</span> {fmt(p.views)}</div>
                    <div><span className="text-muted-foreground">Likes:</span> {fmt(p.likes)}</div>
                    <div><span className="text-muted-foreground">Replies:</span> {fmt(p.replies)}</div>
                    <div><span className="text-muted-foreground">Reposts:</span> {fmt(p.reposts)}</div>
                    <div><span className="text-muted-foreground">Quotes:</span> {fmt(p.quotes)}</div>
                    <div><span className="text-muted-foreground">Shares:</span> {fmt(p.shares)}</div>
                  </div>
                  <div className="flex gap-3 text-xs font-medium">
                    <span className="text-green-600">{pct(Number(p.engagement_rate))} engagement</span>
                    <span>{pct(Number(p.virality_rate))} virality</span>
                    <span>{pct(Number(p.conversation_rate))} conversation</span>
                  </div>
                  {p.permalink && (
                    <a href={p.permalink} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                      View on Threads <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              <ChevronRight className="w-3 h-3" />
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
    return (
      <div className="space-y-6">
        <Skeleton className="h-[400px] rounded-lg" />
        <Skeleton className="h-[400px] rounded-lg" />
      </div>
    );
  }

  if (!posts.length) return null;

  return (
    <div className="space-y-6">
      <TopPostsSection posts={posts} />
      <PostTableSection posts={posts} />
    </div>
  );
}
