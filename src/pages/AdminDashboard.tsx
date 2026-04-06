import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getSafeErrorMessage } from "@/lib/utils";
import {
  Loader2, Plus, Copy, Trash2, LogOut, Check, ArrowUpDown, Search, Download,
  FileText, DollarSign, Users, Mail, UserCheck, MessageSquare, Activity,
  Share2, MousePointerClick,
} from "lucide-react";
import { format, subDays, startOfDay } from "date-fns";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import bcrypt from "bcryptjs";
import { SEO } from "@/components/SEO";
import InsightsTab from "@/components/admin/InsightsTab";

// ── Types ───────────────────────────────────────────────────────────────────────

interface ClientReview {
  id: string;
  client_name: string;
  password: string;
  review_url: string;
  created_at: string;
  last_viewed_at: string | null;
}

interface SalaryCheck {
  id: string;
  job_title: string;
  role: string;
  salary: number;
  sector: string | null;
  experience: string | null;
  median: number | null;
  verdict: string | null;
  lang: string | null;
  created_at: string;
}

interface ResumeLead {
  id: string;
  email: string;
  name: string | null;
  overall_score: number | null;
  seniority_level: string | null;
  industry: string | null;
  language: string | null;
  job_title: string | null;
  years_experience: string | null;
  resume_text: string | null;
  created_at: string;
}

interface EmailLead {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

interface FeedbackItem {
  id: string;
  message: string;
  page: string | null;
  locale: string | null;
  created_at: string;
  type: string | null;
  rating: number | null;
  context: string | null;
  user_id: string | null;
  metadata: Record<string, any> | null;
}

interface AccountUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  provider: string;
  email_confirmed: boolean;
}

type SalarySortKey = "created_at" | "salary" | "job_title" | "role";

interface AiUsageRow {
  id: string;
  user_id: string;
  usage_type: string;
  created_at: string;
}
// ── Helpers ─────────────────────────────────────────────────────────────────────

const validateReviewUrl = (url: string): boolean => {
  if (!url.startsWith("/")) return false;
  if (url.startsWith("//")) return false;
  if (url.match(/^(javascript|data|vbscript):/i)) return false;
  return true;
};

const formatNTD = (val: number) => `NT$${val.toLocaleString()}`;

const verdictColor = (v: string | null) => {
  if (!v) return "";
  if (v.includes("above") || v.includes("高於")) return "text-emerald-600 dark:text-emerald-400";
  if (v.includes("below") || v.includes("低於")) return "text-red-600 dark:text-red-400";
  return "text-amber-600 dark:text-amber-400";
};

const downloadCsv = (headers: string[], rows: (string | number | null)[][], filename: string) => {
  const csv = [headers, ...rows].map(r => r.map(v => `"${v ?? ""}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ── Component ───────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const activeSub = searchParams.get("sub") || "";
  const setActiveTab = (tab: string) => {
    const params: Record<string, string> = { tab };
    setSearchParams(params, { replace: true });
  };
  const setActiveSub = (tab: string, sub: string) => setSearchParams({ tab, sub }, { replace: true });
  const navigateTo = (tab: string, sub?: string) => {
    const params: Record<string, string> = { tab };
    if (sub) params.sub = sub;
    setSearchParams(params, { replace: true });
  };

  const navigate = useNavigate();
  const { toast } = useToast();

  // Counts
  const [counts, setCounts] = useState({ reviews: 0, salary: 0, resumes: 0, emails: 0, accounts: 0, feedback: 0 });
  // Sparkline trends (30-day daily counts)
  const [trends, setTrends] = useState<Record<string, { date: string; count: number }[]>>({});

  // Reviews state
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [password, setPassword] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Salary state
  const [checks, setChecks] = useState<SalaryCheck[]>([]);
  const [checksLoading, setChecksLoading] = useState(true);
  const [salarySearch, setSalarySearch] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SalarySortKey>("created_at");
  const [sortAsc, setSortAsc] = useState(false);

  // Resume leads state
  const [resumeLeads, setResumeLeads] = useState<ResumeLead[]>([]);
  const [resumeLeadsLoading, setResumeLeadsLoading] = useState(true);
  const [resumeSearch, setResumeSearch] = useState("");
  const [resumeSeniorityFilter, setResumeSeniorityFilter] = useState("all");

  // Email leads state
  const [emailLeads, setEmailLeads] = useState<EmailLead[]>([]);
  const [emailLeadsLoading, setEmailLeadsLoading] = useState(true);

  // Feedback state
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState<string>("all");

  // Accounts state
  const [accounts, setAccounts] = useState<AccountUser[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountSearch, setAccountSearch] = useState("");
  const [accountSort, setAccountSort] = useState<{ col: "created_at" | "last_sign_in_at"; dir: "asc" | "desc" }>({ col: "created_at", dir: "desc" });

  // AI Usage state
  const [aiUsageRows, setAiUsageRows] = useState<AiUsageRow[]>([]);
  const [aiUsageLoading, setAiUsageLoading] = useState(true);

  // Share clicks state
  const [shareClicks, setShareClicks] = useState<{ channel: string; page: string; created_at: string }[]>([]);
  const [shareClicksLoading, setShareClicksLoading] = useState(true);

  // Event tracks state
  const [eventTracks, setEventTracks] = useState<{ event_type: string; event_name: string; page: string; metadata: any; created_at: string }[]>([]);
  const [eventTracksLoading, setEventTracksLoading] = useState(true);

  // Documents state (for insights)
  const [documents, setDocuments] = useState<{ type: string; created_at: string; user_id: string }[]>([]);

  // Profiles state (for insights)
  const [profileRows, setProfileRows] = useState<{ user_id: string; onboarding_completed: boolean | null; career_phase: string | null; created_at: string | null }[]>([]);

  // Guide progress state (for insights)
  const [guideProgressRows, setGuideProgressRows] = useState<{ guide_key: string; user_id: string; data: any }[]>([]);

  // Interview questions state (for insights)
  const [interviewQuestions, setInterviewQuestions] = useState<{ category: string; difficulty: number }[]>([]);

  // ── Data fetching ───────────────────────────────────────────────────────────

  useEffect(() => {
    fetchCounts();
    fetchReviews();
    fetchChecks();
    fetchResumeLeads();
    fetchEmailLeads();
    fetchFeedback();
    fetchAccounts();
    fetchTrends();
    fetchAiUsage();
    fetchShareClicks();
    fetchEventTracks();
    fetchDocuments();
    fetchProfiles();
    fetchGuideProgress();
    fetchInterviewQuestions();
  }, []);

  const fetchCounts = async () => {
    const [r1, r2, r3, r4, r5] = await Promise.all([
      supabase.from("client_reviews").select("*", { count: "exact", head: true }),
      supabase.from("salary_checks").select("*", { count: "exact", head: true }),
      supabase.from("resume_leads").select("*", { count: "exact", head: true }),
      supabase.from("email_gate_leads").select("*", { count: "exact", head: true }),
      supabase.from("feedback" as any).select("*", { count: "exact", head: true }),
    ]);
    setCounts({
      reviews: r1.count ?? 0,
      salary: r2.count ?? 0,
      resumes: r3.count ?? 0,
      emails: r4.count ?? 0,
      feedback: (r5 as any).count ?? 0,
      accounts: 0,
    });
  };

  const fetchTrends = async () => {
    const since = subDays(new Date(), 30).toISOString();
    const tables = [
      { key: "resumes", table: "resume_leads" as const },
      { key: "emails", table: "email_gate_leads" as const },
      { key: "salary", table: "salary_checks" as const },
      { key: "feedback", table: "feedback" as const },
    ];

    const results = await Promise.all(
      tables.map(async ({ key, table }) => {
        const { data } = await supabase.from(table as any).select("created_at").gte("created_at", since);
        return { key, data: data || [] };
      })
    );

    // Build 30-day buckets
    const buckets: Record<string, { date: string; count: number }[]> = {};
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = startOfDay(subDays(new Date(), 29 - i));
      return format(d, "yyyy-MM-dd");
    });

    for (const { key, data } of results) {
      const countMap: Record<string, number> = {};
      days.forEach(d => (countMap[d] = 0));
      for (const row of data) {
        const day = format(new Date((row as any).created_at), "yyyy-MM-dd");
        if (countMap[day] !== undefined) countMap[day]++;
      }
      buckets[key] = days.map(d => ({ date: d, count: countMap[d] }));
    }

    setTrends(buckets);
  };

  const fetchAiUsage = async () => {
    setAiUsageLoading(true);
    const since = startOfDay(subDays(new Date(), 90)).toISOString();
    const { data } = await supabase.from("ai_usage_log").select("id, user_id, usage_type, created_at").gte("created_at", since).order("created_at", { ascending: false });
    if (data) setAiUsageRows(data);
    setAiUsageLoading(false);
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    const { data, error } = await supabase.from("client_reviews").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Error", description: getSafeErrorMessage(error), variant: "destructive" });
    else setReviews(data || []);
    setReviewsLoading(false);
  };

  const fetchChecks = async () => {
    setChecksLoading(true);
    const { data } = await supabase.from("salary_checks").select("*").order("created_at", { ascending: false }).limit(500);
    if (data) setChecks(data);
    setChecksLoading(false);
  };

  const fetchResumeLeads = async () => {
    setResumeLeadsLoading(true);
    const { data } = await supabase.from("resume_leads").select("id, email, name, overall_score, seniority_level, industry, language, job_title, years_experience, resume_text, created_at").order("created_at", { ascending: false }).limit(500);
    if (data) setResumeLeads(data);
    setResumeLeadsLoading(false);
  };

  const fetchEmailLeads = async () => {
    setEmailLeadsLoading(true);
    const { data } = await supabase.from("email_gate_leads").select("*").order("created_at", { ascending: false }).limit(500);
    if (data) setEmailLeads(data);
    setEmailLeadsLoading(false);
  };

  const fetchFeedback = async () => {
    setFeedbackLoading(true);
    const { data } = await supabase.from("feedback" as any).select("*").order("created_at", { ascending: false }).limit(500);
    if (data) setFeedbackItems(data as any);
    setFeedbackLoading(false);
  };

  const fetchShareClicks = async () => {
    setShareClicksLoading(true);
    const { data } = await supabase.from("share_clicks" as any).select("channel, page, created_at").order("created_at", { ascending: false }).limit(1000);
    if (data) setShareClicks(data as any);
    setShareClicksLoading(false);
  };

  const fetchDocuments = async () => {
    const { data } = await supabase.from("user_documents").select("type, created_at, user_id").order("created_at", { ascending: false }).limit(1000);
    if (data) setDocuments(data as any);
  };

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("user_id, onboarding_completed, career_phase, created_at").limit(1000);
    if (data) setProfileRows(data as any);
  };

  const fetchEventTracks = async () => {
    setEventTracksLoading(true);
    const { data } = await supabase.from("event_tracks" as any).select("event_type, event_name, page, metadata, created_at").order("created_at", { ascending: false }).limit(1000);
    if (data) setEventTracks(data as any);
    setEventTracksLoading(false);
  };

  const fetchGuideProgress = async () => {
    const { data } = await supabase.from("guide_progress").select("guide_key, user_id, data").limit(1000);
    if (data) setGuideProgressRows(data as any);
  };

  const handleDeleteFeedback = async (id: string) => {
    const { error } = await supabase.from("feedback" as any).delete().eq("id", id);
    if (error) toast({ title: "Error", description: getSafeErrorMessage(error), variant: "destructive" });
    else { toast({ title: "Feedback deleted" }); fetchFeedback(); fetchCounts(); }
  };

  const filteredFeedback = useMemo(() => {
    let items = feedbackItems;
    if (feedbackTypeFilter !== "all") items = items.filter(f => (f.type || "general") === feedbackTypeFilter);
    if (!feedbackSearch) return items;
    const q = feedbackSearch.toLowerCase();
    return items.filter(f => f.message.toLowerCase().includes(q) || f.page?.toLowerCase().includes(q) || f.context?.toLowerCase().includes(q));
  }, [feedbackItems, feedbackSearch, feedbackTypeFilter]);

  const fetchAccounts = async () => {
    setAccountsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await supabase.functions.invoke("list-users", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.error) throw res.error;
      const users = res.data?.users || [];
      setAccounts(users);
      setCounts(prev => ({ ...prev, accounts: users.length }));
    } catch (err: any) {
      toast({ title: "Error loading accounts", description: err.message, variant: "destructive" });
    } finally {
      setAccountsLoading(false);
    }
  };

  // ── Reviews logic ───────────────────────────────────────────────────────────

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const generateClientId = (name: string) => {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "short" }).toLowerCase();
    const year = now.getFullYear();
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return `${slug}-${month}${year}`;
  };

  const handleNameChange = (name: string) => {
    setClientName(name);
    if (name.trim()) setClientId(generateClientId(name));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateReviewUrl(reviewUrl)) {
      toast({ title: "Invalid URL", description: "Must start with /", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const hashedPassword = await bcrypt.hash(password, 10);
    const { error } = await supabase.from("client_reviews").insert({
      id: clientId, client_name: clientName, password: hashedPassword, review_url: reviewUrl,
    });
    setSubmitting(false);
    if (error) toast({ title: "Error", description: getSafeErrorMessage(error), variant: "destructive" });
    else {
      toast({ title: "Review created" });
      setIsDialogOpen(false);
      setClientId(""); setClientName(""); setPassword(""); setReviewUrl("");
      fetchReviews();
      fetchCounts();
    }
  };

  const handleDeleteReview = async (id: string) => {
    const { error } = await supabase.from("client_reviews").delete().eq("id", id);
    if (error) toast({ title: "Error", description: getSafeErrorMessage(error), variant: "destructive" });
    else { toast({ title: "Review deleted" }); fetchReviews(); fetchCounts(); }
  };

  const copyToClipboard = async (id: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/review/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ── Salary logic ────────────────────────────────────────────────────────────

  const handleSalarySort = (key: SalarySortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const filteredChecks = useMemo(() => {
    let result = checks;
    if (salarySearch) {
      const q = salarySearch.toLowerCase();
      result = result.filter(c => c.job_title.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || (c.sector && c.sector.toLowerCase().includes(q)));
    }
    if (verdictFilter !== "all") result = result.filter(c => c.verdict === verdictFilter);
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "created_at") cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortKey === "salary") cmp = a.salary - b.salary;
      else if (sortKey === "job_title") cmp = a.job_title.localeCompare(b.job_title);
      else if (sortKey === "role") cmp = a.role.localeCompare(b.role);
      return sortAsc ? cmp : -cmp;
    });
    return result;
  }, [checks, salarySearch, verdictFilter, sortKey, sortAsc]);

  const verdicts = useMemo(() => [...new Set(checks.map(c => c.verdict).filter(Boolean))].sort(), [checks]);

  const exportSalaryCsv = () => {
    downloadCsv(
      ["Date", "Job Title", "Role", "Sector", "Experience", "Salary", "Median", "Verdict", "Lang"],
      filteredChecks.map(c => [format(new Date(c.created_at), "yyyy-MM-dd HH:mm"), c.job_title, c.role, c.sector, c.experience, c.salary, c.median, c.verdict, c.lang]),
      `salary-checks-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
  };

  const filteredResumeLeads = useMemo(() => {
    let result = resumeLeads;
    if (resumeSearch) {
      const q = resumeSearch.toLowerCase();
      result = result.filter(r => r.email.toLowerCase().includes(q) || r.name?.toLowerCase().includes(q) || r.job_title?.toLowerCase().includes(q) || r.industry?.toLowerCase().includes(q));
    }
    if (resumeSeniorityFilter !== "all") result = result.filter(r => r.seniority_level === resumeSeniorityFilter);
    return result;
  }, [resumeLeads, resumeSearch, resumeSeniorityFilter]);

  const resumeSeniorities = useMemo(() => [...new Set(resumeLeads.map(r => r.seniority_level).filter(Boolean))].sort(), [resumeLeads]);

  const exportResumeCsv = () => {
    downloadCsv(
      ["Date", "Email", "Name", "Job Title", "Score", "Seniority", "Years Exp", "Industry", "Language"],
      filteredResumeLeads.map(r => [format(new Date(r.created_at), "yyyy-MM-dd HH:mm"), r.email, r.name, r.job_title, r.overall_score, r.seniority_level, r.years_experience, r.industry, r.language]),
      `resume-leads-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
  };

  const exportEmailCsv = () => {
    downloadCsv(
      ["Date", "Email", "Source"],
      emailLeads.map(e => [format(new Date(e.created_at), "yyyy-MM-dd HH:mm"), e.email, e.source]),
      `email-leads-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
  };

  const SortHeader = ({ label, k }: { label: string; k: SalarySortKey }) => (
    <button onClick={() => handleSalarySort(k)} className="flex items-center gap-1 hover:text-foreground transition-colors">
      {label}
      <ArrowUpDown className={`w-3 h-3 ${sortKey === k ? "text-foreground" : "text-muted-foreground/50"}`} />
    </button>
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  const filteredAccounts = useMemo(() => {
    let list = accounts;
    if (accountSearch) {
      const q = accountSearch.toLowerCase();
      list = list.filter(a => a.email?.toLowerCase().includes(q) || a.provider.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => {
      const av = a[accountSort.col] ?? "";
      const bv = b[accountSort.col] ?? "";
      return accountSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [accounts, accountSearch, accountSort]);

  const exportAccountsCsv = () => {
    downloadCsv(
      ["Email", "Provider", "Confirmed", "Created", "Last Sign In"],
      accounts.map(a => [a.email, a.provider, a.email_confirmed ? "Yes" : "No", format(new Date(a.created_at), "yyyy-MM-dd HH:mm"), a.last_sign_in_at ? format(new Date(a.last_sign_in_at), "yyyy-MM-dd HH:mm") : "Never"]),
      `accounts-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
  };

  // Build account trends from already-fetched accounts
  const accountTrend = useMemo(() => {
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = startOfDay(subDays(new Date(), 29 - i));
      return format(d, "yyyy-MM-dd");
    });
    const countMap: Record<string, number> = {};
    days.forEach(d => (countMap[d] = 0));
    for (const a of accounts) {
      const day = format(new Date(a.created_at), "yyyy-MM-dd");
      if (countMap[day] !== undefined) countMap[day]++;
    }
    return days.map(d => ({ date: d, count: countMap[d] }));
  }, [accounts]);

  // Estimated cost per usage type (USD) based on actual models used:
  // analyze → gemini-2.5-flash (~4K in + 4K out tokens)
  // ai_tool → gemini-3-flash-preview (~2K in + 1K out tokens)
  // import  → gemini-2.5-flash (~3K in + 2K out tokens)
  const COST_PER_TYPE: Record<string, number> = {
    analyze: 0.003,
    ai_tool: 0.0006,
    import: 0.002,
  };
  const DEFAULT_COST = 0.001;

  // AI Usage computed data
  const aiUsageStats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonth = aiUsageRows.filter(r => new Date(r.created_at) >= monthStart && r.usage_type !== "pdf_export");
    
    const byType: Record<string, number> = {};
    const byUser: Record<string, { total: number; types: Record<string, number>; cost: number }> = {};
    
    let totalCost = 0;
    const costByType: Record<string, number> = {};

    for (const row of thisMonth) {
      const unitCost = COST_PER_TYPE[row.usage_type] ?? DEFAULT_COST;
      byType[row.usage_type] = (byType[row.usage_type] || 0) + 1;
      costByType[row.usage_type] = (costByType[row.usage_type] || 0) + unitCost;
      totalCost += unitCost;
      if (!byUser[row.user_id]) byUser[row.user_id] = { total: 0, types: {}, cost: 0 };
      byUser[row.user_id].total++;
      byUser[row.user_id].cost += unitCost;
      byUser[row.user_id].types[row.usage_type] = (byUser[row.user_id].types[row.usage_type] || 0) + 1;
    }
    
    const topUsers = Object.entries(byUser)
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 15)
      .map(([userId, data]) => ({ userId: userId.slice(0, 8) + "…", ...data }));

    // Daily trend for last 30 days
    const days = Array.from({ length: 30 }, (_, i) => format(startOfDay(subDays(new Date(), 29 - i)), "yyyy-MM-dd"));
    const dailyByType: { date: string; import: number; ai_tool: number; analyze: number; cost: number; [k: string]: number | string }[] = days.map(d => ({ date: d, import: 0, ai_tool: 0, analyze: 0, cost: 0 }));
    for (const row of aiUsageRows.filter(r => r.usage_type !== "pdf_export")) {
      const day = format(new Date(row.created_at), "yyyy-MM-dd");
      const entry = dailyByType.find(e => e.date === day);
      if (entry) {
        (entry as any)[row.usage_type] = ((entry as any)[row.usage_type] || 0) + 1;
        (entry as any).cost = ((entry as any).cost || 0) + (COST_PER_TYPE[row.usage_type] ?? DEFAULT_COST);
      }
    }

    const typeData = Object.entries(byType).map(([type, count]) => ({ type, count, cost: costByType[type] || 0 })).sort((a, b) => b.count - a.count);

    return { totalThisMonth: thisMonth.length, totalCost, typeData, topUsers, dailyByType };
  }, [aiUsageRows]);

  // Resolve user emails for AI usage top users
  const topUserEmails = useMemo(() => {
    const map: Record<string, string> = {};
    for (const a of accounts) {
      const short = a.id.slice(0, 8) + "…";
      map[short] = a.email;
    }
    return map;
  }, [accounts]);

  const statCards = [
    { label: "Accounts", value: counts.accounts, icon: UserCheck, color: "text-teal-600", sparkColor: "#0d9488", trend: accountTrend, nav: { tab: "people", sub: "accounts" } },
    { label: "Resume Leads", value: counts.resumes, icon: Users, color: "text-violet-600", sparkColor: "#7c3aed", trend: trends.resumes || [], nav: { tab: "people", sub: "resumes" } },
    { label: "Email Leads", value: counts.emails, icon: Mail, color: "text-amber-600", sparkColor: "#d97706", trend: trends.emails || [], nav: { tab: "people", sub: "emails" } },
    { label: "Salary Checks", value: counts.salary, icon: DollarSign, color: "text-emerald-600", sparkColor: "#059669", trend: trends.salary || [], nav: { tab: "data", sub: "salary" } },
    { label: "Feedback", value: counts.feedback, icon: MessageSquare, color: "text-pink-600", sparkColor: "#db2777", trend: trends.feedback || [], nav: { tab: "data", sub: "feedback" } },
    { label: "AI Usage", value: aiUsageStats.totalThisMonth, icon: Activity, color: "text-cyan-600", sparkColor: "#0891b2", trend: aiUsageStats.dailyByType.map(d => ({ date: d.date, count: d.import + d.ai_tool + d.analyze })), nav: { tab: "data", sub: "ai-usage" } },
    { label: "Shares", value: shareClicks.length, icon: Share2, color: "text-indigo-600", sparkColor: "#4f46e5", trend: [] as { date: string; count: number }[], nav: { tab: "insights" } },
    { label: "Events", value: eventTracks.length, icon: MousePointerClick, color: "text-orange-600", sparkColor: "#ea580c", trend: [] as { date: string; count: number }[], nav: { tab: "insights" } },
  ];

  return (
      <div className="min-h-screen bg-background">
        <SEO />
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-heading font-bold text-foreground text-lg">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/analytics")}>
              <Activity className="w-4 h-4 mr-2" /> Threads Analytics
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map(s => (
            <Card
              key={s.label}
              className={`overflow-hidden cursor-pointer transition-all hover:border-primary/30 hover:shadow-md ${
                activeTab === s.nav.tab && (!s.nav.sub || activeSub === s.nav.sub)
                  ? "ring-2 ring-primary/20"
                  : ""
              }`}
              onClick={() => navigateTo(s.nav.tab, s.nav.sub)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2.5">
                  <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} />
                  <div className="min-w-0">
                    <p className="text-xl font-bold text-foreground leading-tight">{s.value.toLocaleString()}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{s.label}</p>
                  </div>
                </div>
                {s.trend.length > 0 && (
                  <div className="mt-1.5 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={s.trend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Area type="monotone" dataKey="count" stroke={s.sparkColor} fill={s.sparkColor} fillOpacity={0.15} strokeWidth={1.5} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ══ Main Tabs ══ */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start gap-0.5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* ── Overview Tab ── */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Recent Signups */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Recent Signups</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigateTo("people", "accounts")} className="text-xs">View all →</Button>
                  </div>
                  <div className="space-y-2">
                    {accounts.slice(0, 5).map(a => (
                      <div key={a.id} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{a.email}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(a.created_at), "MMM d")}</span>
                      </div>
                    ))}
                    {accounts.length === 0 && <p className="text-sm text-muted-foreground">No accounts yet</p>}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Recent Resume Leads */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">Recent Resume Leads</h3>
                      <Button variant="ghost" size="sm" onClick={() => navigateTo("people", "resumes")} className="text-xs">View all →</Button>
                    </div>
                    <div className="space-y-2">
                      {resumeLeads.slice(0, 5).map(r => (
                        <div key={r.id} className="flex items-center justify-between text-sm">
                          <span className="text-foreground truncate max-w-[200px]">{r.email}</span>
                          <span className="text-xs text-muted-foreground">{r.overall_score !== null ? `Score: ${r.overall_score}` : "—"}</span>
                        </div>
                      ))}
                      {resumeLeads.length === 0 && <p className="text-sm text-muted-foreground">No resume leads yet</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Feedback */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">Recent Feedback</h3>
                      <Button variant="ghost" size="sm" onClick={() => navigateTo("data", "feedback")} className="text-xs">View all →</Button>
                    </div>
                    <div className="space-y-2">
                      {feedbackItems.slice(0, 3).map(f => (
                        <div key={f.id} className="text-sm">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              f.type === "nps" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                              "bg-muted text-muted-foreground"
                            }`}>{f.type || "general"}</span>
                            {f.rating !== null && <span className="text-xs text-muted-foreground">{f.type === "nps" ? `${f.rating}/10` : f.rating > 0 ? "👍" : "👎"}</span>}
                          </div>
                          <p className="text-muted-foreground text-xs truncate mt-1">{f.message}</p>
                        </div>
                      ))}
                      {feedbackItems.length === 0 && <p className="text-sm text-muted-foreground">No feedback yet</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── People Tab ── */}
          <TabsContent value="people">
            <Tabs value={activeSub || "accounts"} onValueChange={(sub) => setActiveSub("people", sub)}>
              <TabsList className="w-max bg-muted/50 h-8 gap-0">
                <TabsTrigger value="accounts" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Accounts</TabsTrigger>
                <TabsTrigger value="resumes" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Resume Leads</TabsTrigger>
                <TabsTrigger value="emails" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Email Leads</TabsTrigger>
              </TabsList>

              {/* Accounts */}
              <TabsContent value="accounts">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={accountSearch} onChange={e => setAccountSearch(e.target.value)} placeholder="Search by email or provider..." className="pl-9 h-10" />
                  </div>
                  <Button variant="outline" size="sm" onClick={exportAccountsCsv} className="h-10"><Download className="w-4 h-4 mr-1" /> CSV</Button>
                </div>
                {accountsLoading ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                ) : (
                  <div className="border border-border rounded-xl overflow-hidden overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-36 cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => setAccountSort(s => s.col === "created_at" ? { col: "created_at", dir: s.dir === "asc" ? "desc" : "asc" } : { col: "created_at", dir: "desc" })}>
                            Created {accountSort.col === "created_at" ? (accountSort.dir === "asc" ? "↑" : "↓") : ""}
                          </TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Confirmed</TableHead>
                          <TableHead className="cursor-pointer select-none hover:text-foreground transition-colors" onClick={() => setAccountSort(s => s.col === "last_sign_in_at" ? { col: "last_sign_in_at", dir: s.dir === "asc" ? "desc" : "asc" } : { col: "last_sign_in_at", dir: "desc" })}>
                            Last Sign In {accountSort.col === "last_sign_in_at" ? (accountSort.dir === "asc" ? "↑" : "↓") : ""}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAccounts.length === 0 ? (
                          <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No accounts found</TableCell></TableRow>
                        ) : filteredAccounts.map(a => (
                          <TableRow key={a.id}>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(a.created_at), "MMM d, yyyy")}</TableCell>
                            <TableCell className="text-sm">{a.email}</TableCell>
                            <TableCell className="text-xs text-muted-foreground capitalize">{a.provider}</TableCell>
                            <TableCell>{a.email_confirmed ? <Check className="w-4 h-4 text-emerald-500" /> : <span className="text-xs text-muted-foreground">No</span>}</TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{a.last_sign_in_at ? format(new Date(a.last_sign_in_at), "MMM d, yyyy HH:mm") : "Never"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Resume Leads */}
              <TabsContent value="resumes">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={resumeSearch} onChange={e => setResumeSearch(e.target.value)} placeholder="Search by email, name, job title, industry..." className="pl-9 h-10" />
                  </div>
                  <Select value={resumeSeniorityFilter} onValueChange={setResumeSeniorityFilter}>
                    <SelectTrigger className="w-40 h-10"><SelectValue placeholder="Seniority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Seniority</SelectItem>
                      {resumeSeniorities.map(s => <SelectItem key={s} value={s!}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={exportResumeCsv} className="h-10"><Download className="w-4 h-4 mr-1" /> CSV</Button>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{filteredResumeLeads.length} of {resumeLeads.length} leads</p>
                {resumeLeadsLoading ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                ) : (
                  <div className="border border-border rounded-xl overflow-hidden overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-36">Date</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="w-[120px]">Name</TableHead>
                          <TableHead className="w-[120px]">Job Title</TableHead>
                          <TableHead className="text-center">Score</TableHead>
                          <TableHead>Seniority</TableHead>
                          <TableHead>Yrs Exp</TableHead>
                          <TableHead className="w-[100px]">Industry</TableHead>
                          <TableHead>Lang</TableHead>
                          <TableHead className="w-[180px]">Resume Preview</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResumeLeads.length === 0 ? (
                          <TableRow><TableCell colSpan={10} className="text-center py-12 text-muted-foreground">No resume leads found</TableCell></TableRow>
                        ) : filteredResumeLeads.map(r => (
                          <TableRow key={r.id}>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(r.created_at), "MMM d, HH:mm")}</TableCell>
                            <TableCell className="text-sm max-w-[160px] truncate" title={r.email}>{r.email}</TableCell>
                            <TableCell className="text-sm max-w-[120px] truncate" title={r.name || ""}>{r.name || "—"}</TableCell>
                            <TableCell className="text-sm max-w-[120px] truncate" title={r.job_title || ""}>{r.job_title || "—"}</TableCell>
                            <TableCell className="text-center text-sm font-semibold">{r.overall_score ?? "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{r.seniority_level || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{r.years_experience || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-[100px] truncate" title={r.industry || ""}>{r.industry || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{r.language || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-[180px] truncate" title={r.resume_text || ""}>{r.resume_text ? r.resume_text.slice(0, 60) + "…" : "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Email Leads */}
              <TabsContent value="emails">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{emailLeads.length} leads</p>
                  <Button variant="outline" size="sm" onClick={exportEmailCsv}><Download className="w-4 h-4 mr-1" /> CSV</Button>
                </div>
                {emailLeadsLoading ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                ) : (
                  <div className="border border-border rounded-xl overflow-hidden overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-36">Date</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Source</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {emailLeads.length === 0 ? (
                          <TableRow><TableCell colSpan={3} className="text-center py-12 text-muted-foreground">No email leads yet</TableCell></TableRow>
                        ) : emailLeads.map(e => (
                          <TableRow key={e.id}>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(e.created_at), "MMM d, HH:mm")}</TableCell>
                            <TableCell className="text-sm">{e.email}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{e.source || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* ── Data Tab ── */}
          <TabsContent value="data">
            <Tabs value={activeSub || "reviews"} onValueChange={(sub) => setActiveSub("data", sub)}>
              <TabsList className="w-max bg-muted/50 h-8 gap-0">
                <TabsTrigger value="reviews" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Reviews</TabsTrigger>
                <TabsTrigger value="salary" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Salary</TabsTrigger>
                <TabsTrigger value="feedback" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Feedback</TabsTrigger>
                <TabsTrigger value="ai-usage" className="text-xs h-7 px-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Usage</TabsTrigger>
              </TabsList>

              {/* Reviews */}
              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Manage password-protected review links</p>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader><DialogTitle>Add New Client Review</DialogTitle></DialogHeader>
                      <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="clientName">Client Name</Label>
                          <Input id="clientName" value={clientName} onChange={e => handleNameChange(e.target.value)} placeholder="Sarah Wang" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="clientId">Client ID</Label>
                          <Input id="clientId" value={clientId} onChange={e => setClientId(e.target.value)} required />
                          <p className="text-xs text-muted-foreground">Auto-generated. Edit if needed.</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reviewUrl">Review URL Path</Label>
                          <Input id="reviewUrl" value={reviewUrl} onChange={e => setReviewUrl(e.target.value)} placeholder="/reviews/sarah-wang" required />
                          <p className="text-xs text-muted-foreground">Internal path starting with /</p>
                        </div>
                        <Button type="submit" disabled={submitting} className="w-full">
                          {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : "Generate Link"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {reviewsLoading ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                ) : (
                  <div className="border border-border rounded-xl overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client Name</TableHead>
                          <TableHead>Link</TableHead>
                          <TableHead>Last Viewed</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reviews.length === 0 ? (
                          <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No reviews yet</TableCell></TableRow>
                        ) : reviews.map(r => (
                          <TableRow key={r.id}>
                            <TableCell className="font-medium">{r.client_name}</TableCell>
                            <TableCell><code className="text-xs bg-muted px-2 py-1 rounded">{`${window.location.origin}/review/${r.id}`}</code></TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {r.last_viewed_at ? format(new Date(r.last_viewed_at), "MMM d, yyyy h:mm a") : "Not viewed"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(r.id)}>
                                  {copiedId === r.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Review?</AlertDialogTitle>
                                      <AlertDialogDescription>Permanently delete the link for {r.client_name}.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteReview(r.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Salary */}
              <TabsContent value="salary">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={salarySearch} onChange={e => setSalarySearch(e.target.value)} placeholder="Search job title, role, sector..." className="pl-9 h-10" />
                  </div>
                  <Select value={verdictFilter} onValueChange={setVerdictFilter}>
                    <SelectTrigger className="w-48 h-10"><SelectValue placeholder="All verdicts" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All verdicts</SelectItem>
                      {verdicts.map(v => <SelectItem key={v!} value={v!}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={exportSalaryCsv} className="h-10"><Download className="w-4 h-4 mr-1" /> CSV</Button>
                </div>
                {checksLoading ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                ) : (
                  <div className="border border-border rounded-xl overflow-hidden overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-36"><SortHeader label="Date" k="created_at" /></TableHead>
                          <TableHead><SortHeader label="Job Title" k="job_title" /></TableHead>
                          <TableHead><SortHeader label="Role" k="role" /></TableHead>
                          <TableHead>Sector</TableHead>
                          <TableHead>Exp</TableHead>
                          <TableHead className="text-right"><SortHeader label="Salary" k="salary" /></TableHead>
                          <TableHead className="text-right">Median</TableHead>
                          <TableHead>Verdict</TableHead>
                          <TableHead>Lang</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredChecks.length === 0 ? (
                          <TableRow><TableCell colSpan={9} className="text-center py-12 text-muted-foreground">No results</TableCell></TableRow>
                        ) : filteredChecks.map(c => (
                          <TableRow key={c.id}>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(c.created_at), "MMM d, HH:mm")}</TableCell>
                            <TableCell className="font-medium text-sm max-w-48 truncate">{c.job_title}</TableCell>
                            <TableCell className="text-sm">{c.role}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{c.sector || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{c.experience || "—"}</TableCell>
                            <TableCell className="text-right text-sm font-semibold tabular-nums">{formatNTD(c.salary)}</TableCell>
                            <TableCell className="text-right text-sm tabular-nums text-muted-foreground">{c.median ? formatNTD(c.median) : "—"}</TableCell>
                            <TableCell className={`text-xs font-medium ${verdictColor(c.verdict)}`}>{c.verdict || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{c.lang || "en"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              {/* Feedback */}
              <TabsContent value="feedback">
                {(() => {
                  const byType: Record<string, number> = {};
                  const npsItems = feedbackItems.filter(f => f.type === "nps");
                  const npsScores: number[] = [];
                  let thumbsUp = 0, thumbsDown = 0;
                  let promoters = 0, passives = 0, detractors = 0;
                  const npsComments: { score: number; message: string; date: string; category: string; metadata: Record<string, any> | null }[] = [];

                  feedbackItems.forEach(f => {
                    const tp = f.type || "general";
                    byType[tp] = (byType[tp] || 0) + 1;
                    if (tp === "nps" && f.rating !== null) {
                      npsScores.push(f.rating);
                      const cat = f.rating >= 9 ? "promoter" : f.rating >= 7 ? "passive" : "detractor";
                      if (f.rating >= 9) promoters++;
                      else if (f.rating >= 7) passives++;
                      else detractors++;
                      if (f.message && !f.message.startsWith("NPS score:")) {
                        npsComments.push({ score: f.rating, message: f.message, date: f.created_at, category: cat, metadata: f.metadata });
                      }
                    }
                    if ((tp === "micro_survey" || tp === "inline_rating") && f.rating !== null) {
                      if (f.rating > 0) thumbsUp++; else thumbsDown++;
                    }
                  });

                  const totalNps = npsScores.length;
                  const avgNps = totalNps ? (npsScores.reduce((a, b) => a + b, 0) / totalNps).toFixed(1) : "—";
                  const npsScore = totalNps ? Math.round(((promoters - detractors) / totalNps) * 100) : 0;

                  const scoreDist = Array.from({ length: 11 }, (_, i) => ({
                    score: i,
                    count: npsScores.filter(s => s === i).length,
                  }));

                  const segmentStats = (category: string) => {
                    const items = npsItems.filter(f => {
                      if (f.rating === null) return false;
                      const cat = f.rating >= 9 ? "promoter" : f.rating >= 7 ? "passive" : "detractor";
                      return cat === category;
                    });
                    const sessions = items.map(f => (f.metadata as any)?.session_count).filter(Boolean);
                    const days = items.map(f => (f.metadata as any)?.days_since_first_visit).filter(Boolean);
                    const pages = items.map(f => ((f.metadata as any)?.pages_this_session as any[])?.length).filter(Boolean);
                    const avg = (arr: number[]) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : "—";
                    return { count: items.length, avgSessions: avg(sessions), avgDays: avg(days), avgPages: avg(pages) };
                  };

                  const promoterStats = segmentStats("promoter");
                  const passiveStats = segmentStats("passive");
                  const detractorStats = segmentStats("detractor");

                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                        <div className="col-span-2 rounded-xl border border-border bg-card p-5 text-center">
                          <p className="text-xs text-muted-foreground mb-1">NPS Score</p>
                          <p className={`text-4xl font-bold ${npsScore >= 50 ? "text-emerald-600" : npsScore >= 0 ? "text-amber-600" : "text-destructive"}`}>
                            {totalNps ? npsScore : "—"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{totalNps} responses</p>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-3 text-center">
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                          <p className="text-2xl font-bold text-foreground">{avgNps}</p>
                        </div>
                        <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-3 text-center">
                          <p className="text-xs text-emerald-700 dark:text-emerald-400">Promoters (9-10)</p>
                          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{promoters}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-500">{totalNps ? Math.round((promoters / totalNps) * 100) : 0}%</p>
                        </div>
                        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-3 text-center">
                          <p className="text-xs text-amber-700 dark:text-amber-400">Passives (7-8)</p>
                          <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{passives}</p>
                          <p className="text-xs text-amber-600 dark:text-amber-500">{totalNps ? Math.round((passives / totalNps) * 100) : 0}%</p>
                        </div>
                        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-3 text-center">
                          <p className="text-xs text-red-700 dark:text-red-400">Detractors (0-6)</p>
                          <p className="text-2xl font-bold text-red-700 dark:text-red-400">{detractors}</p>
                          <p className="text-xs text-red-600 dark:text-red-500">{totalNps ? Math.round((detractors / totalNps) * 100) : 0}%</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-border bg-card p-4">
                          <h3 className="text-sm font-semibold text-foreground mb-3">Score Distribution</h3>
                          <div className="flex items-end gap-1 h-28">
                            {scoreDist.map(d => {
                              const maxCount = Math.max(...scoreDist.map(x => x.count), 1);
                              const heightPct = (d.count / maxCount) * 100;
                              const color = d.score >= 9 ? "bg-emerald-500" : d.score >= 7 ? "bg-amber-400" : "bg-red-400";
                              return (
                                <div key={d.score} className="flex-1 flex flex-col items-center gap-1">
                                  <span className="text-[10px] text-muted-foreground">{d.count || ""}</span>
                                  <div className={`w-full rounded-t ${color} transition-all`} style={{ height: `${Math.max(heightPct, 2)}%` }} />
                                  <span className="text-[10px] text-muted-foreground">{d.score}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="rounded-xl border border-border bg-card p-4">
                          <h3 className="text-sm font-semibold text-foreground mb-3">Behavioral Patterns by Segment</h3>
                          <div className="overflow-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-left py-1.5 text-muted-foreground font-medium">Segment</th>
                                  <th className="text-center py-1.5 text-muted-foreground font-medium">Count</th>
                                  <th className="text-center py-1.5 text-muted-foreground font-medium">Avg Sessions</th>
                                  <th className="text-center py-1.5 text-muted-foreground font-medium">Avg Days</th>
                                  <th className="text-center py-1.5 text-muted-foreground font-medium">Pages/Session</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { label: "Promoters", color: "text-emerald-600", ...promoterStats },
                                  { label: "Passives", color: "text-amber-600", ...passiveStats },
                                  { label: "Detractors", color: "text-red-500", ...detractorStats },
                                ].map(row => (
                                  <tr key={row.label} className="border-b border-border/50">
                                    <td className={`py-2 font-medium ${row.color}`}>{row.label}</td>
                                    <td className="py-2 text-center text-foreground">{row.count}</td>
                                    <td className="py-2 text-center text-foreground">{row.avgSessions}</td>
                                    <td className="py-2 text-center text-foreground">{row.avgDays}</td>
                                    <td className="py-2 text-center text-foreground">{row.avgPages}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {!npsItems.some(f => f.metadata) && (
                            <p className="text-xs text-muted-foreground mt-3 italic">Behavioral data will populate as new NPS responses come in.</p>
                          )}
                        </div>
                      </div>

                      {npsComments.length > 0 && (
                        <div className="rounded-xl border border-border bg-card p-4">
                          <h3 className="text-sm font-semibold text-foreground mb-3">Comment Highlights ({npsComments.length})</h3>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {npsComments.map((c, i) => (
                              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                                <span className={`shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded ${
                                  c.category === "promoter" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" :
                                  c.category === "passive" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" :
                                  "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                }`}>
                                  {c.score}
                                </span>
                                <p className="text-sm text-foreground flex-1">{c.message}</p>
                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{format(new Date(c.date), "MMM d")}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(thumbsUp + thumbsDown > 0) && (
                        <div className="rounded-lg border border-border bg-card p-3">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">Micro Survey & Inline Ratings:</span>{" "}
                            👍 {thumbsUp} / 👎 {thumbsDown} ({((thumbsUp / (thumbsUp + thumbsDown)) * 100).toFixed(0)}% positive)
                          </p>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">{filteredFeedback.length} submissions</p>
                            <select
                              value={feedbackTypeFilter}
                              onChange={e => setFeedbackTypeFilter(e.target.value)}
                              className="text-xs border border-border rounded px-2 py-1 bg-background text-foreground"
                            >
                              <option value="all">All types</option>
                              <option value="general">General</option>
                              <option value="micro_survey">Micro Survey</option>
                              <option value="inline_rating">Inline Rating</option>
                              <option value="nps">NPS</option>
                            </select>
                          </div>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search feedback…" value={feedbackSearch} onChange={e => setFeedbackSearch(e.target.value)} className="pl-9 w-64" />
                          </div>
                        </div>
                        {feedbackLoading ? (
                          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                        ) : (
                          <div className="rounded-md border border-border overflow-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[130px]">Date</TableHead>
                                  <TableHead className="w-[100px]">Type</TableHead>
                                  <TableHead className="w-[60px]">Rating</TableHead>
                                  <TableHead>Message</TableHead>
                                  <TableHead className="w-[140px]">Context</TableHead>
                                  <TableHead className="w-[160px]">Page</TableHead>
                                  <TableHead className="w-[60px]" />
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredFeedback.length === 0 ? (
                                  <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No feedback yet</TableCell></TableRow>
                                ) : filteredFeedback.map(f => (
                                  <TableRow key={f.id}>
                                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(f.created_at), "MMM d, yyyy HH:mm")}</TableCell>
                                    <TableCell>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        f.type === "nps" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                                        f.type === "micro_survey" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                                        f.type === "inline_rating" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" :
                                        "bg-muted text-muted-foreground"
                                      }`}>
                                        {f.type || "general"}
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-center">
                                      {f.rating !== null ? (
                                        f.type === "nps" ? <span className="font-medium">{f.rating}/10</span> :
                                        f.rating > 0 ? "👍" : "👎"
                                      ) : "—"}
                                    </TableCell>
                                    <TableCell className="text-sm max-w-xs truncate">{f.message}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground font-mono">{f.context || "—"}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground font-mono truncate max-w-[160px]">{f.page}</TableCell>
                                    <TableCell>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete feedback?</AlertDialogTitle>
                                            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteFeedback(f.id)}>Delete</AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </TabsContent>

              {/* AI Usage */}
              <TabsContent value="ai-usage">
                {aiUsageLoading ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-3xl font-bold text-foreground">{aiUsageStats.totalThisMonth}</p>
                          <p className="text-xs text-muted-foreground">Total this month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-3xl font-bold text-emerald-600">${aiUsageStats.totalCost.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Est. Cost (USD)</p>
                        </CardContent>
                      </Card>
                      {aiUsageStats.typeData.slice(0, 3).map(t => (
                        <Card key={t.type}>
                          <CardContent className="p-4 text-center">
                            <p className="text-3xl font-bold text-foreground">{t.count}</p>
                            <p className="text-xs text-muted-foreground capitalize">{t.type.replace(/_/g, " ")}</p>
                            <p className="text-xs text-muted-foreground">${t.cost.toFixed(2)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Daily Usage (30 days)</h3>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={aiUsageStats.dailyByType} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={v => format(new Date(v), "M/d")} />
                              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                              <Tooltip labelFormatter={v => format(new Date(v as string), "MMM d, yyyy")} />
                              <Bar dataKey="import" stackId="a" fill="#7c3aed" name="Import" />
                              <Bar dataKey="ai_tool" stackId="a" fill="#0891b2" name="AI Tool" />
                              <Bar dataKey="analyze" stackId="a" fill="#d97706" name="Analyze" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Top Users This Month</h3>
                        <div className="border border-border rounded-xl overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center">Est. Cost</TableHead>
                                {aiUsageStats.typeData.map(t => (
                                  <TableHead key={t.type} className="text-center capitalize">{t.type.replace(/_/g, " ")}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {aiUsageStats.topUsers.length === 0 ? (
                                <TableRow><TableCell colSpan={3 + aiUsageStats.typeData.length} className="text-center py-12 text-muted-foreground">No usage this month</TableCell></TableRow>
                              ) : aiUsageStats.topUsers.map(u => (
                                <TableRow key={u.userId}>
                                  <TableCell className="text-sm font-mono">{topUserEmails[u.userId] || u.userId}</TableCell>
                                  <TableCell className="text-center font-semibold">{u.total}</TableCell>
                                  <TableCell className="text-center text-sm font-medium text-emerald-600">${u.cost.toFixed(2)}</TableCell>
                                  {aiUsageStats.typeData.map(t => (
                                    <TableCell key={t.type} className="text-center text-sm text-muted-foreground">{u.types[t.type] || 0}</TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* ── Insights Tab (merged with Analytics) ── */}
          <TabsContent value="insights">
            <InsightsTab
              accounts={accounts}
              resumeLeads={resumeLeads}
              aiUsageRows={aiUsageRows}
              documents={documents}
              profiles={profileRows}
              emailLeadsCount={counts.emails}
              eventTracks={eventTracks}
              shareClicks={shareClicks}
              salaryChecks={checks}
              guideProgress={guideProgressRows}
              analyticsData={{
                feedbackItems,
                shareClicksLoading,
                eventTracksLoading,
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}