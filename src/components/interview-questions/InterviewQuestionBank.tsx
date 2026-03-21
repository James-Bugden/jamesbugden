import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown, ArrowLeft, X, Shuffle, ChevronRight, Info, Mail, Copy, Eye, ChevronsDown, ChevronsUp, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { motion, AnimatePresence } from "framer-motion";
import PageSEO from "@/components/PageSEO";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type Lang = "en" | "zh";

/* ── Formatted Answer helper ── */
function FormattedAnswer({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className={`pl-4 border-l-2 border-accent/30 ${className ?? "text-foreground/85"}`}>
      {paragraphs.map((para, i) => (
        <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0">
          {para.split(/(\[.*?\])/g).map((part, j) =>
            part.startsWith("[") && part.endsWith("]") ? (
              <span key={j} className="bg-accent/15 text-accent px-1.5 py-0.5 rounded text-xs font-medium">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </p>
      ))}
    </div>
  );
}


interface Question {
  id: number;
  question_en: string;
  question_zh: string;
  category: string;
  tags: string[];
  difficulty: number;
  audience: string[];
  source: string | null;
  answer_en: string | null;
  answer_zh: string | null;
}

const CATEGORIES = [
  { key: "behavioral", en: "Behavioral", zh: "行為題", desc_en: '"Tell me about a time…" — tests past actions & decisions', desc_zh: "「請分享一個經驗…」— 測試過去的行為與決策" },
  { key: "situational", en: "Situational", zh: "情境題", desc_en: '"What would you do if…" — tests hypothetical judgment', desc_zh: "「如果你遇到…」— 測試假設情境的判斷力" },
  { key: "salary_comp", en: "Salary & Compensation", zh: "薪資與福利", desc_en: "Questions about pay expectations & negotiation", desc_zh: "關於薪資期望與談判的問題" },
  { key: "career_history", en: "Career History", zh: "職涯經歷", desc_en: "Walk me through your background & transitions", desc_zh: "介紹你的職涯背景與轉換經歷" },
  { key: "culture_fit", en: "Culture Fit", zh: "文化適配", desc_en: "How you work with teams & handle workplace dynamics", desc_zh: "你如何融入團隊與處理職場互動" },
  { key: "strengths_weaknesses", en: "Strengths & Weaknesses", zh: "優勢與弱點", desc_en: "Self-awareness questions about your abilities", desc_zh: "關於自我能力認知的問題" },
  { key: "company_knowledge", en: "Company Knowledge", zh: "公司了解", desc_en: "Tests your research on the company & role", desc_zh: "測試你對公司與職位的了解" },
  { key: "curveball", en: "Curveball & Creative", zh: "出其不意題", desc_en: "Unexpected questions that test quick thinking", desc_zh: "出其不意、測試臨場反應的問題" },
  { key: "management_leadership", en: "Management & Leadership", zh: "管理與領導", desc_en: "Leading teams, delegation & conflict resolution", desc_zh: "團隊領導、授權與衝突處理" },
  { key: "self_assessment", en: "Self Assessment", zh: "自我評估", desc_en: "Reflect on your career goals & growth areas", desc_zh: "反思職涯目標與成長方向" },
  { key: "motivation_values", en: "Motivation & Values", zh: "動機與價值觀", desc_en: "Why this role, company, or career path?", desc_zh: "為什麼選擇這個職位、公司或職涯方向？" },
] as const;

const DIFFICULTIES = [
  { value: 1, en: "Easy", zh: "簡單", color: "text-emerald-600 dark:text-emerald-400", desc_en: "Common questions most candidates should prepare for", desc_zh: "大多數求職者都應準備的常見問題" },
  { value: 2, en: "Medium", zh: "中等", color: "text-amber-600 dark:text-amber-400", desc_en: "Requires structured thinking & specific examples", desc_zh: "需要結構化思考與具體案例" },
  { value: 3, en: "Hard", zh: "困難", color: "text-red-600 dark:text-red-400", desc_en: "Complex scenarios testing deep expertise & judgment", desc_zh: "測試深度專業與判斷力的複雜情境" },
] as const;

const AUDIENCES = [
  { key: "entry", en: "Entry Level", zh: "初階", desc_en: "New grads & those with 0–2 years experience", desc_zh: "新鮮人與 0-2 年經驗者" },
  { key: "mid", en: "Mid Career", zh: "中階", desc_en: "Professionals with 3–7 years experience", desc_zh: "3-7 年經驗的專業人士" },
  { key: "senior", en: "Senior", zh: "資深", desc_en: "Directors, VPs & seasoned leaders (8+ years)", desc_zh: "總監、副總與資深領導者（8年以上）" },
  { key: "career_changer", en: "Career Changer", zh: "轉職者", desc_en: "Switching industries, functions, or career paths", desc_zh: "轉換產業、職能或職涯方向者" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  behavioral: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  situational: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  salary_comp: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  career_history: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  culture_fit: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  strengths_weaknesses: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  company_knowledge: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  curveball: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  management_leadership: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  self_assessment: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  motivation_values: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
};

const PAGE_SIZE = 20;

/** Strip characters that break Postgres array literal syntax */
const sanitizeForArrayContains = (input: string) =>
  input.replace(/[{},\\]/g, "");

export default function InterviewQuestionBank({ lang: initialLang }: { lang: Lang }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>(initialLang);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("cat")?.split(",").filter(Boolean) || []
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>(
    searchParams.get("diff")?.split(",").filter(Boolean).map(Number) || []
  );
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(
    searchParams.get("aud")?.split(",").filter(Boolean) || []
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const t = useCallback((en: string, zh: string) => lang === "zh" ? zh : en, [lang]);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch category counts once on mount
  useEffect(() => {
    const fetchCounts = async () => {
      const { data } = await supabase
        .from("interview_questions")
        .select("category");
      if (data) {
        const counts: Record<string, number> = {};
        data.forEach(row => {
          counts[row.category] = (counts[row.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      }
    };
    fetchCounts();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("q", debouncedSearch);
    if (selectedCategories.length) params.set("cat", selectedCategories.join(","));
    if (selectedDifficulties.length) params.set("diff", selectedDifficulties.join(","));
    if (selectedAudiences.length) params.set("aud", selectedAudiences.join(","));
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, selectedCategories, selectedDifficulties, selectedAudiences, setSearchParams]);

  // Reset page on filter change
  useEffect(() => {
    setPage(0);
    setQuestions([]);
    setAllExpanded(false);
    setExpandedIds(new Set());
  }, [debouncedSearch, selectedCategories, selectedDifficulties, selectedAudiences]);

  // Fetch questions (sanitized tag search)
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const sanitized = sanitizeForArrayContains(debouncedSearch);
      let query = supabase
        .from("interview_questions")
        .select("*", { count: "exact" });

      if (debouncedSearch) {
        query = query.or(
          `question_en.ilike.%${debouncedSearch}%,question_zh.ilike.%${debouncedSearch}%${sanitized ? `,tags.cs.{${sanitized}}` : ""}`
        );
      }

      if (selectedCategories.length) {
        query = query.in("category", selectedCategories);
      }

      if (selectedDifficulties.length) {
        query = query.in("difficulty", selectedDifficulties);
      }

      if (selectedAudiences.length) {
        query = query.or(
          selectedAudiences.map(a => `audience.cs.{${a}}`).join(",")
        );
      }

      query = query
        .order("id", { ascending: true })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      const { data, count, error } = await query;

      if (!error && data) {
        if (page === 0) {
          setQuestions(data as Question[]);
        } else {
          setQuestions(prev => [...prev, ...(data as Question[])]);
        }
        setTotalCount(count || 0);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [page, debouncedSearch, selectedCategories, selectedDifficulties, selectedAudiences]);

  // Infinite scroll with IntersectionObserver
  const hasMore = questions.length < totalCount;
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(p => p + 1);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  const toggleCategory = (key: string) => {
    setSelectedCategories(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );
  };

  const toggleDifficulty = (value: number) => {
    setSelectedDifficulties(prev =>
      prev.includes(value) ? prev.filter(d => d !== value) : [...prev, value]
    );
  };

  const toggleAudience = (key: string) => {
    setSelectedAudiences(prev =>
      prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key]
    );
  };

  const clearAll = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedAudiences([]);
  };

  // Optimized random: fetch count first, then pick one with offset
  const handleRandomQuestion = async () => {
    const sanitized = sanitizeForArrayContains(debouncedSearch);
    let countQuery = supabase.from("interview_questions").select("*", { count: "exact", head: true });
    if (debouncedSearch) {
      countQuery = countQuery.or(
        `question_en.ilike.%${debouncedSearch}%,question_zh.ilike.%${debouncedSearch}%${sanitized ? `,tags.cs.{${sanitized}}` : ""}`
      );
    }
    if (selectedCategories.length) countQuery = countQuery.in("category", selectedCategories);
    if (selectedDifficulties.length) countQuery = countQuery.in("difficulty", selectedDifficulties);
    if (selectedAudiences.length) {
      countQuery = countQuery.or(selectedAudiences.map(a => `audience.cs.{${a}}`).join(","));
    }
    const { count } = await countQuery;
    if (!count || count === 0) return;

    const randomOffset = Math.floor(Math.random() * count);
    let query = supabase.from("interview_questions").select("*");
    if (debouncedSearch) {
      query = query.or(
        `question_en.ilike.%${debouncedSearch}%,question_zh.ilike.%${debouncedSearch}%${sanitized ? `,tags.cs.{${sanitized}}` : ""}`
      );
    }
    if (selectedCategories.length) query = query.in("category", selectedCategories);
    if (selectedDifficulties.length) query = query.in("difficulty", selectedDifficulties);
    if (selectedAudiences.length) {
      query = query.or(selectedAudiences.map(a => `audience.cs.{${a}}`).join(","));
    }
    query = query.order("id", { ascending: true }).range(randomOffset, randomOffset);
    const { data } = await query;
    if (data && data.length > 0) {
      setRandomQuestion(data[0] as Question);
    }
  };

  const handleLangToggle = () => {
    const newLang = lang === "en" ? "zh" : "en";
    setLang(newLang);
    const params = searchParams.toString();
    const base = newLang === "zh" ? "/zh-tw/interview-questions" : "/interview-questions";
    navigate(params ? `${base}?${params}` : base, { replace: true });
  };

  const handleTagClick = (tag: string) => {
    setSearch(tag);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleToggleAllAnswers = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
      setAllExpanded(false);
    } else {
      const allIds = new Set(questions.map(q => q.id));
      setExpandedIds(allIds);
      setAllExpanded(true);
    }
  };

  const hasFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedAudiences.length > 0 || search.length > 0;
  const activeFilterCount = selectedCategories.length + selectedDifficulties.length + selectedAudiences.length;

  const getCategoryLabel = (key: string) => {
    const cat = CATEGORIES.find(c => c.key === key);
    return cat ? (lang === "zh" ? cat.zh : cat.en) : key;
  };

  const getDifficultyLabel = (level: number) => {
    const d = DIFFICULTIES.find(d => d.value === level);
    return d ? (lang === "zh" ? d.zh : d.en) : "";
  };

  const getDifficultyColor = (level: number) => {
    const d = DIFFICULTIES.find(d => d.value === level);
    return d?.color || "";
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={lang === "zh" ? "面試問答資料庫 | 203題真實面試問題附參考回答" : "Interview Question & Answer Database | 203 Real Questions"}
        description={lang === "zh"
          ? "203題真實面試問題附參考回答，涵蓋行為題、情境題、薪資談判等11大類別，幫助你準備下一次面試。"
          : "203 real interview questions with sample answers across 11 categories including behavioral, situational, salary negotiation, and more."}
        path={lang === "zh" ? "/zh-tw/interview-questions" : "/interview-questions"}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to={lang === "zh" ? "/zh-tw" : "/"} className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <button
              onClick={handleLangToggle}
              className="px-3 py-1 rounded-full text-sm font-medium border border-cream/30 text-cream hover:bg-cream/10 transition-colors"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-12 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-5xl">

          <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-3">
            {t("Interview Question & Answer Database", "面試問答資料庫")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-5">
            {t(
              "203 real interview questions with sample answers to prepare for your next interview",
              "203題真實面試問題附參考回答，幫助你準備下一次面試"
            )}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => {
                const subject = encodeURIComponent(
                  lang === "zh" ? "推薦給你的面試題庫" : "Interview question bank I found helpful"
                );
                const body = encodeURIComponent(
                  `${lang === "zh" ? "我覺得這個面試題庫很有幫助，分享給你：" : "I found this interview question bank helpful and wanted to share it with you:"}\n\n${window.location.href}`
                );
                window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors text-sm font-medium"
              aria-label="Share via Email"
            >
              <Mail className="w-5 h-5" />
              Email
            </button>
            <button
              onClick={() => {
                const text = encodeURIComponent(window.location.href);
                window.location.href = `https://line.me/R/share?text=${text}`;
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-[#06C755] text-white hover:bg-[#05b34d] transition-colors text-sm font-medium"
              aria-label="Share via LINE"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .348-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .349-.281.631-.63.631h-2.386c-.345 0-.627-.282-.627-.631V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .349-.281.631-.629.631M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINE
            </button>
            {/* Copy link button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors text-sm font-medium"
              aria-label="Copy link"
            >
              <Copy className="w-4 h-4" />
              {copiedLink ? t("Copied!", "已複製！") : t("Copy link", "複製連結")}
            </button>
          </div>
        </div>
      </section>

      {/* Search + Filters + Results */}
      <section className="pb-20 md:pb-28 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Sticky search/filter bar */}
          <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm pb-4 -mx-5 px-5 md:-mx-6 md:px-6 border-b border-transparent [&:not(:first-child)]:border-border/50">
            {/* Search Bar */}
            <div className="relative mb-4 pt-2">
              <Search className="absolute left-4 top-1/2 mt-1 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t("Search questions or tags...", "搜尋問題或標籤...")}
                className="pl-12 h-12 text-base rounded-xl border-border bg-card"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters toggle (mobile) */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden flex items-center gap-2 text-sm font-medium text-foreground mb-3"
            >
              <Filter className="w-4 h-4" />
              {t("Filters", "篩選")}
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFilterCount}
                </Badge>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Active filter chips (visible when filters collapsed on mobile) */}
            {!filtersOpen && activeFilterCount > 0 && (
              <div className="md:hidden flex flex-wrap gap-1.5 mb-3">
                {selectedCategories.map(key => (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-accent/15 text-accent-foreground border border-accent/30"
                  >
                    {getCategoryLabel(key)}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedDifficulties.map(val => (
                  <button
                    key={val}
                    onClick={() => toggleDifficulty(val)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-accent/15 text-accent-foreground border border-accent/30"
                  >
                    {getDifficultyLabel(val)}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedAudiences.map(key => {
                  const aud = AUDIENCES.find(a => a.key === key);
                  return (
                    <button
                      key={key}
                      onClick={() => toggleAudience(key)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-accent/15 text-accent-foreground border border-accent/30"
                    >
                      {aud ? (lang === "zh" ? aud.zh : aud.en) : key}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Filter Section */}
            <TooltipProvider delayDuration={300}>
            <div className={`space-y-4 ${filtersOpen ? "block" : "hidden md:block"}`}>
              {/* Category */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  {t("Category", "類別")}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" aria-label={t("Filter info", "篩選說明")}>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="text-sm max-w-[200px] text-center p-2 w-auto">
                      {t("Tap each badge to filter. Hold to see description.", "點選標籤篩選，長按查看說明。")}
                    </PopoverContent>
                  </Popover>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <Tooltip key={cat.key}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => toggleCategory(cat.key)}
                          aria-pressed={selectedCategories.includes(cat.key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedCategories.includes(cat.key)
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-card text-muted-foreground border-border hover:border-accent/50"
                          }`}
                        >
                          {lang === "zh" ? cat.zh : cat.en}
                          {categoryCounts[cat.key] != null && (
                            <span className="ml-1 opacity-60">({categoryCounts[cat.key]})</span>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[220px] text-center">
                        {lang === "zh" ? cat.desc_zh : cat.desc_en}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  {t("Difficulty", "難度")}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" aria-label={t("Filter info", "篩選說明")}>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="text-sm max-w-[200px] text-center p-2 w-auto">
                      {t("Tap each badge to filter. Hold to see description.", "點選標籤篩選，長按查看說明。")}
                    </PopoverContent>
                  </Popover>
                </h3>
                <div className="flex gap-2">
                  {DIFFICULTIES.map(d => (
                    <Tooltip key={d.value}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => toggleDifficulty(d.value)}
                          aria-pressed={selectedDifficulties.includes(d.value)}
                          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedDifficulties.includes(d.value)
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-card text-muted-foreground border-border hover:border-accent/50"
                          }`}
                        >
                          {lang === "zh" ? d.zh : d.en}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[220px] text-center">
                        {lang === "zh" ? d.desc_zh : d.desc_en}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Audience */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  {t("Audience", "對象")}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" aria-label={t("Filter info", "篩選說明")}>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" className="text-sm max-w-[200px] text-center p-2 w-auto">
                      {t("Tap each badge to filter. Hold to see description.", "點選標籤篩選，長按查看說明。")}
                    </PopoverContent>
                  </Popover>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {AUDIENCES.map(a => (
                    <Tooltip key={a.key}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => toggleAudience(a.key)}
                          aria-pressed={selectedAudiences.includes(a.key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedAudiences.includes(a.key)
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-card text-muted-foreground border-border hover:border-accent/50"
                          }`}
                        >
                          {lang === "zh" ? a.zh : a.en}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[220px] text-center">
                        {lang === "zh" ? a.desc_zh : a.desc_en}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                  >
                    {t("Clear all filters", "清除所有篩選")}
                  </button>
                )}
              </div>
            </div>
            </TooltipProvider>
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mt-6 mb-6 flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              {t(
                `Showing ${questions.length} of ${totalCount} questions`,
                `顯示 ${questions.length} / ${totalCount} 題`
              )}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleAllAnswers}
                className="gap-2"
              >
                {allExpanded ? <ChevronsUp className="w-4 h-4" /> : <ChevronsDown className="w-4 h-4" />}
                {allExpanded ? t("Collapse All", "收合全部") : t("Show All Answers", "展開全部答案")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRandomQuestion}
                className="gap-2"
              >
                <Shuffle className="w-4 h-4" />
                {t("Random", "隨機")}
              </Button>
            </div>
          </div>

          {/* Random question spotlight */}
          <AnimatePresence>
            {randomQuestion && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-accent/10 border-2 border-accent rounded-xl p-5 relative">
                  <button
                    onClick={() => setRandomQuestion(null)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                    {t("🎲 Random Question", "🎲 隨機題目")}
                  </p>
                  <p className="text-foreground font-medium leading-relaxed text-lg">
                    {lang === "zh" ? randomQuestion.question_zh : randomQuestion.question_en}
                  </p>
                  {lang === "zh" && (
                    <p className="text-sm text-muted-foreground mt-1">{randomQuestion.question_en}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${CATEGORY_COLORS[randomQuestion.category] || "bg-muted text-muted-foreground"}`}>
                      {getCategoryLabel(randomQuestion.category)}
                    </span>
                    <span className={`text-xs font-medium ${getDifficultyColor(randomQuestion.difficulty)}`}>
                      {getDifficultyLabel(randomQuestion.difficulty)}
                     </span>
                   </div>
                   {/* Random question answer — show both languages in zh mode */}
                   {(randomQuestion.answer_en || randomQuestion.answer_zh) && (
                     <div className="mt-4 pt-4 border-t border-accent/20">
                       <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                         {t("Sample Answer", "參考回答")}
                       </p>
                       <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                         {lang === "zh" ? (randomQuestion.answer_zh || randomQuestion.answer_en) : randomQuestion.answer_en}
                       </div>
                       {lang === "zh" && randomQuestion.answer_en && randomQuestion.answer_zh && (
                         <div className="mt-3 pt-3 border-t border-accent/10">
                           <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                             English
                           </p>
                           <div className="text-sm text-muted-foreground/70 leading-relaxed whitespace-pre-line">
                             {randomQuestion.answer_en}
                           </div>
                         </div>
                       )}
                     </div>
                   )}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="space-y-3">
            {questions.map((q, index) => {
              const hasAnswer = !!(q.answer_en || q.answer_zh);
              const isExpanded = expandedIds.has(q.id);
              const toggleExpand = () => {
                setExpandedIds(prev => {
                  const next = new Set(prev);
                  if (next.has(q.id)) next.delete(q.id);
                  else next.add(q.id);
                  return next;
                });
              };

              return (
              <div
                key={q.id}
                className="bg-card border border-border rounded-xl p-5 transition-all cursor-pointer hover:border-accent/40 hover:shadow-sm"
                onClick={toggleExpand}
              >
                <div className="flex items-start gap-4">
                  {/* Sequential display number */}
                  <span className="text-xs font-mono text-muted-foreground mt-1 min-w-[2rem] text-right">
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    {/* Primary language */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-foreground font-medium leading-relaxed mb-1">
                        {lang === "zh" ? q.question_zh : q.question_en}
                      </p>
                       <div className="flex items-center gap-1.5 shrink-0 mt-1">
                         {/* Answer availability badge */}
                         {hasAnswer && !isExpanded && (
                           <span className="text-[10px] text-accent-foreground/60 bg-accent/10 px-1.5 py-0.5 rounded font-medium">
                             💡 {t("Answer", "有解答")}
                           </span>
                         )}
                         <ChevronDownIcon className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                       </div>
                    </div>
                    {/* Secondary language — only show English subtitle in Chinese mode */}
                    {lang === "zh" && (
                      <p className="text-sm text-muted-foreground/70 leading-relaxed mb-3">
                        {q.question_en}
                      </p>
                    )}
                     {/* "Tap to expand" hint */}
                     {!isExpanded && index < 3 && (
                       <p className="text-[11px] text-muted-foreground/50 mb-2 flex items-center gap-1">
                         <Eye className="w-3 h-3" />
                         {hasAnswer ? t("Tap to see sample answer", "點擊查看參考回答") : t("Tap to expand", "點擊展開")}
                       </p>
                     )}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCategory(q.category); }}
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${CATEGORY_COLORS[q.category] || "bg-muted text-muted-foreground"}`}
                      >
                        {getCategoryLabel(q.category)}
                      </button>
                      {/* Difficulty: dots + text label */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleDifficulty(q.difficulty); }}
                        className={`inline-flex items-center gap-1 text-[11px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${getDifficultyColor(q.difficulty)}`}
                      >
                        <span className="inline-flex gap-0.5">
                          {[1, 2, 3].map(i => (
                            <span
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i <= q.difficulty
                                  ? q.difficulty === 3
                                    ? "bg-red-500"
                                    : q.difficulty === 2
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                  : "bg-muted"
                              }`}
                            />
                          ))}
                        </span>
                        {getDifficultyLabel(q.difficulty)}
                      </button>
                      {q.audience.filter(a => a !== "all").map(a => {
                        const aud = AUDIENCES.find(au => au.key === a);
                        return (
                          <button
                            key={a}
                            onClick={(e) => { e.stopPropagation(); toggleAudience(a); }}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                          >
                            {aud ? (lang === "zh" ? aud.zh : aud.en) : a}
                          </button>
                        );
                      })}
                      {/* Tags as clickable chips */}
                      {q.tags && q.tags.length > 0 && q.tags.map(tag => (
                        <button
                          key={tag}
                          onClick={(e) => { e.stopPropagation(); handleTagClick(tag); }}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent-foreground/70 hover:bg-accent/20 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                     {/* Expandable answer */}
                     <AnimatePresence>
                       {isExpanded && (
                         <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           transition={{ duration: 0.2 }}
                           className="overflow-hidden"
                         >
                           <div className="mt-4 pt-4 border-t border-border">
                             {hasAnswer ? (
                               <>
                                 <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                                   {t("Sample Answer", "參考回答")}
                                 </p>
                                  <FormattedAnswer
                                    text={(lang === "zh" ? (q.answer_zh || q.answer_en) : (q.answer_en || q.answer_zh)) || ""}
                                  />
                                 {lang === "zh" && q.answer_en && q.answer_zh && (
                                   <div className="mt-3 pt-3 border-t border-border/50">
                                     <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                       English
                                     </p>
                                      <FormattedAnswer text={q.answer_en} className="text-muted-foreground/70" />
                                   </div>
                                 )}
                               </>
                             ) : (
                               <p className="text-sm text-muted-foreground italic">
                                 {t("No sample answer available yet. Check back soon!", "尚無參考回答，請稍後再來查看！")}
                               </p>
                             )}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Empty state */}
          {!loading && questions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {t(
                  "No questions match your filters. Try broadening your search.",
                  "沒有符合條件的問題。請嘗試放寬搜尋條件。"
                )}
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && questions.length === 0 && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-1" />

          {loading && questions.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} James Bugden. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to={lang === "zh" ? "/zh-tw" : "/"} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("Home", "首頁")}
              </Link>
              <Link to={lang === "zh" ? "/zh-tw/guides" : "/guides"} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("Guides", "指南")}
              </Link>
              <div className="flex items-center gap-4 ml-2">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ThreadsIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
