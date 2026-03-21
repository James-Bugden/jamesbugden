import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PairedLink {
  label: string;
  en: string;
  zh?: string;
}

interface Section {
  title: string;
  collapsible?: boolean;
  links: PairedLink[];
}

const sections: Section[] = [
  {
    title: "Main Pages",
    links: [
      { label: "Homepage", en: "/", zh: "/zh-tw" },
      { label: "Dashboard", en: "/dashboard", zh: "/zh-tw/dashboard" },
      { label: "Guides", en: "/guides", zh: "/zh-tw/guides" },
      { label: "Quiz", en: "/quiz", zh: "/zh-tw/quiz" },
      { label: "Login", en: "/login" },
      { label: "Sign Up", en: "/signup" },
      { label: "Reset Password", en: "/reset-password" },
      { label: "Site Directory", en: "/site-directory" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Resume Analyzer", en: "/resume-analyzer", zh: "/zh-tw/resume-analyzer" },
      { label: "Resume Builder", en: "/resume", zh: "/zh-tw/resume" },
      { label: "Resume Builder (Simple)", en: "/resume-simple", zh: "/zh-tw/resume-simple" },
      { label: "Offer Calculator", en: "/offer-calculator", zh: "/zh-tw/offer-calculator" },
      { label: "Offer Calculator Compare", en: "/offer-calculator/compare" },
      { label: "Job Tracker", en: "/jobs" },
      { label: "Tracker (LAMP)", en: "/tracker" },
      { label: "Interview Question Bank", en: "/interview-questions", zh: "/zh-tw/interview-questions" },
    ],
  },
  {
    title: "Salary",
    links: [
      { label: "Salary Database", en: "/salary", zh: "/zh-tw/salary" },
      { label: "Salary Explore", en: "/salary/explore", zh: "/zh-tw/salary/explore" },
      { label: "Salary Compare", en: "/salary/compare", zh: "/zh-tw/salary/compare" },
      { label: "Salary Insights", en: "/salary/insights", zh: "/zh-tw/salary/insights" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Resume Guide", en: "/resume-guide", zh: "/zh-tw/resume-guide" },
      { label: "Resume Quick Reference", en: "/resume-quick-reference", zh: "/zh-tw/resume-quick-reference" },
      { label: "Interview Prep Guide", en: "/interview-prep-guide", zh: "/zh-tw/interview-prep-guide" },
      { label: "Interview Preparation Guide", en: "/interview-preparation-guide", zh: "/zh-tw/interview-preparation-guide" },
      { label: "LinkedIn Guide", en: "/linkedin-guide", zh: "/zh-tw/linkedin-guide" },
      { label: "LinkedIn Branding Guide", en: "/linkedin-branding-guide", zh: "/zh-tw/linkedin-branding-guide" },
      { label: "Pivot Method Guide", en: "/pivot-method-guide", zh: "/zh-tw/pivot-method-guide" },
      { label: "Pivot Method Mini Guide", en: "/pivot-method-mini-guide", zh: "/zh-tw/pivot-method-mini-guide" },
      { label: "Salary Starter Kit", en: "/salary-starter-kit", zh: "/zh-tw/salary-starter-kit" },
      { label: "HR Interview Guide", en: "/hr-interview-guide", zh: "/zh-tw/hr-interview-guide" },
      { label: "AI Job Search Guide", en: "/ai-job-search-guide", zh: "/zh-tw/ai-job-search-guide" },
      { label: "Job Offer Guide", en: "/job-offer-guide", zh: "/zh-tw/job-offer-guide" },
      { label: "Problem Solving 101 Guide", en: "/problem-solving-guide", zh: "/zh-tw/problem-solving-guide" },
      { label: "Office Politics Guide", en: "/office-politics-guide", zh: "/zh-tw/office-politics-guide" },
      { label: "Recruiter Guide", en: "/recruiter-guide", zh: "/zh-tw/recruiter-guide" },
      { label: "Ikigai Career Guide", en: "/ikigai-guide", zh: "/zh-tw/ikigai-guide" },
      { label: "Career Game Guide", en: "/career-game-guide", zh: "/zh-tw/career-game-guide" },
    ],
  },
  {
    title: "Toolkit",
    links: [
      { label: "Toolkit Index", en: "/toolkit", zh: "/zh-tw/toolkit" },
      { label: "Deflection Scripts", en: "/toolkit/scripts", zh: "/zh-tw/toolkit/scripts" },
      { label: "Offer Response", en: "/toolkit/offer-response", zh: "/zh-tw/toolkit/offer-response" },
      { label: "Counteroffer Email", en: "/toolkit/counteroffer", zh: "/zh-tw/toolkit/counteroffer" },
      { label: "Compensation Calculator", en: "/toolkit/calculator", zh: "/zh-tw/toolkit/calculator" },
      { label: "Comp Calculator Interactive", en: "/toolkit/calculator-interactive", zh: "/zh-tw/toolkit/calculator-interactive" },
      { label: "Pushback Cheat Sheet", en: "/toolkit/pushback", zh: "/zh-tw/toolkit/pushback" },
      { label: "Raise One-Pager", en: "/toolkit/raise", zh: "/zh-tw/toolkit/raise" },
      { label: "Achievement Log", en: "/toolkit/log", zh: "/zh-tw/toolkit/log" },
    ],
  },
  {
    title: "Reviews",
    collapsible: true,
    links: [
      { label: "Charlene Lee", en: "/reviews/charlene-lee", zh: "/zh-tw/reviews/charlene-lee" },
      { label: "Chien Jung Liu", en: "/reviews/chien-jung-liu", zh: "/zh-tw/reviews/chien-jung-liu" },
      { label: "James Bugden", en: "/reviews/james-bugden", zh: "/zh-tw/reviews/james-bugden" },
      { label: "Sam Lee", en: "/reviews/sam-lee", zh: "/zh-tw/reviews/sam-lee" },
      { label: "Roger Lee", en: "/reviews/roger-lee", zh: "/zh-tw/reviews/roger-lee" },
      { label: "Pin Wei Wu", en: "/reviews/pin-wei-wu", zh: "/zh-tw/reviews/pin-wei-wu" },
      { label: "Peihua Yeh", en: "/reviews/peihua-yeh", zh: "/zh-tw/reviews/peihua-yeh" },
      { label: "Silvia Chen", en: "/reviews/silvia-chen", zh: "/zh-tw/reviews/silvia-chen" },
      { label: "Youting Chen", en: "/reviews/youting-chen", zh: "/zh-tw/reviews/youting-chen" },
      { label: "Roy Tsai", en: "/reviews/roy-tsai", zh: "/zh-tw/reviews/roy-tsai" },
      { label: "Janelle Cheng", en: "/reviews/janelle-cheng", zh: "/zh-tw/reviews/janelle-cheng" },
      { label: "Willy Lin", en: "/reviews/willy-lin", zh: "/zh-tw/reviews/willy-lin" },
      { label: "Hope Chen", en: "/reviews/hope-chen", zh: "/zh-tw/reviews/hope-chen" },
      { label: "Rema Rao", en: "/reviews/rema-rao" },
    ],
  },
  {
    title: "Admin",
    links: [
      { label: "Admin Login", en: "/admin/login" },
      { label: "Admin Dashboard", en: "/admin" },
      { label: "Client Review Gate", en: "/review" },
    ],
  },
];

const SectionBlock = ({ section, forceOpen }: { section: Section; forceOpen?: boolean }) => {
  const [open, setOpen] = useState(!section.collapsible);
  const isOpen = forceOpen || open;

  return (
    <div className="mb-8">
      <button
        onClick={() => section.collapsible && setOpen(!open)}
        className={`flex items-center gap-2 text-lg font-semibold text-foreground mb-3 border-b border-border pb-1 w-full text-left ${section.collapsible ? "cursor-pointer hover:text-gold transition-colors" : "cursor-default"}`}
      >
        {section.collapsible && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
        {section.title}
        {section.collapsible && (
          <span className="text-xs text-muted-foreground font-normal ml-1">({section.links.length})</span>
        )}
      </button>
      {isOpen && (
        <ul className="space-y-1">
          {section.links.map((link) => (
            <li key={link.en} className="flex items-center gap-3 text-sm">
              <span className="text-foreground font-medium min-w-[200px]">{link.label}</span>
              <Link to={link.en} className="text-muted-foreground hover:text-gold transition-colors font-mono text-xs">
                EN
              </Link>
              {link.zh && (
                <Link to={link.zh} className="text-muted-foreground hover:text-gold transition-colors font-mono text-xs">
                  中文
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SiteDirectory = () => {
  const [search, setSearch] = useState("");
  const isSearching = search.trim().length > 0;
  const query = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!isSearching) return sections;
    return sections
      .map((section) => ({
        ...section,
        links: section.links.filter(
          (link) =>
            link.label.toLowerCase().includes(query) ||
            section.title.toLowerCase().includes(query) ||
            link.en.toLowerCase().includes(query) ||
            (link.zh && link.zh.toLowerCase().includes(query))
        ),
      }))
      .filter((section) => section.links.length > 0);
  }, [query, isSearching]);

  return (
    <div className="min-h-screen bg-background p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-4">Site Directory</h1>
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pages..."
          className="pl-9"
        />
      </div>
      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm">No pages found matching "{search.trim()}"</p>
      )}
      {filtered.map((section) => (
        <SectionBlock key={section.title} section={section} forceOpen={isSearching} />
      ))}
    </div>
  );
};

export default SiteDirectory;
