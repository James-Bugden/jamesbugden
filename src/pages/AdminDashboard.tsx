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
  FileText, DollarSign, Users, Mail, UserCheck, MessageSquare,
} from "lucide-react";
import { format, subDays, startOfDay } from "date-fns";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import bcrypt from "bcryptjs";

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
  const activeTab = searchParams.get("tab") || "reviews";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: true });

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

  // Accounts state
  const [accounts, setAccounts] = useState<AccountUser[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountSearch, setAccountSearch] = useState("");
  const [accountSort, setAccountSort] = useState<{ col: "created_at" | "last_sign_in_at"; dir: "asc" | "desc" }>({ col: "created_at", dir: "desc" });

  // ── Data fetching ───────────────────────────────────────────────────────────

  useEffect(() => {
    fetchCounts();
    fetchReviews();
    fetchChecks();
    fetchResumeLeads();
    fetchEmailLeads();
    fetchFeedback();
    fetchAccounts();
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
    const { data } = await supabase.from("resume_leads").select("id, email, name, overall_score, seniority_level, industry, language, job_title, years_experience, created_at").order("created_at", { ascending: false }).limit(500);
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

  const handleDeleteFeedback = async (id: string) => {
    const { error } = await supabase.from("feedback" as any).delete().eq("id", id);
    if (error) toast({ title: "Error", description: getSafeErrorMessage(error), variant: "destructive" });
    else { toast({ title: "Feedback deleted" }); fetchFeedback(); fetchCounts(); }
  };

  const filteredFeedback = useMemo(() => {
    if (!feedbackSearch) return feedbackItems;
    const q = feedbackSearch.toLowerCase();
    return feedbackItems.filter(f => f.message.toLowerCase().includes(q) || f.page?.toLowerCase().includes(q));
  }, [feedbackItems, feedbackSearch]);

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

  const statCards = [
    { label: "Accounts", value: counts.accounts, icon: UserCheck, color: "text-teal-600" },
    { label: "Reviews", value: counts.reviews, icon: FileText, color: "text-blue-600" },
    { label: "Salary Checks", value: counts.salary, icon: DollarSign, color: "text-emerald-600" },
    { label: "Resume Leads", value: counts.resumes, icon: Users, color: "text-violet-600" },
    { label: "Email Leads", value: counts.emails, icon: Mail, color: "text-amber-600" },
    { label: "Feedback", value: counts.feedback, icon: MessageSquare, color: "text-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-heading font-bold text-foreground text-lg">Admin Dashboard</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {statCards.map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="salary">Salary Checks</TabsTrigger>
            <TabsTrigger value="resumes">Resume Leads</TabsTrigger>
            <TabsTrigger value="emails">Email Leads</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* ── Reviews Tab ──────────────────────────────────────────────── */}
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

          {/* ── Salary Checks Tab ────────────────────────────────────────── */}
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

          {/* ── Resume Leads Tab ─────────────────────────────────────────── */}
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
                      <TableHead>Name</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead>Seniority</TableHead>
                      <TableHead>Yrs Exp</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Lang</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResumeLeads.length === 0 ? (
                      <TableRow><TableCell colSpan={9} className="text-center py-12 text-muted-foreground">No resume leads found</TableCell></TableRow>
                    ) : filteredResumeLeads.map(r => (
                      <TableRow key={r.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(r.created_at), "MMM d, HH:mm")}</TableCell>
                        <TableCell className="text-sm">{r.email}</TableCell>
                        <TableCell className="text-sm">{r.name || "—"}</TableCell>
                        <TableCell className="text-sm">{r.job_title || "—"}</TableCell>
                        <TableCell className="text-center text-sm font-semibold">{r.overall_score ?? "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{r.seniority_level || "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{r.years_experience || "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{r.industry || "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{r.language || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ── Email Leads Tab ──────────────────────────────────────────── */}
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

          {/* ── Accounts Tab ─────────────────────────────────────────────── */}
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

          {/* ── Feedback Tab ─────────────────────────────────────────────── */}
          <TabsContent value="feedback">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-sm text-muted-foreground">{filteredFeedback.length} feedback submissions</p>
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
                      <TableHead className="w-[140px]">Date</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[180px]">Page</TableHead>
                      <TableHead className="w-[80px]">Lang</TableHead>
                      <TableHead className="w-[60px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No feedback yet</TableCell></TableRow>
                    ) : filteredFeedback.map(f => (
                      <TableRow key={f.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{format(new Date(f.created_at), "MMM d, yyyy HH:mm")}</TableCell>
                        <TableCell className="text-sm max-w-md">{f.message}</TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">{f.page}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{f.locale}</TableCell>
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
