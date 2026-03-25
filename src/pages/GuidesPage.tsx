import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { SEO } from "@/components/SEO";


interface GuideItem {
  title: string;
  description: string;
  en: string;
  zh: string;
  mini?: GuideItem;
}

interface Category {
  label: string;
  guides: GuideItem[];
}

const categories: Category[] = [
  {
    label: "Resume & LinkedIn",
    guides: [
      {
        title: "Resume Guide",
        description: "How to write a resume that gets interviews",
        en: "/resume-guide",
        zh: "/zh-tw/resume-guide",
        mini: {
          title: "Resume Quick Reference",
          description: "One-page cheat sheet",
          en: "/resume-quick-reference",
          zh: "/zh-tw/resume-quick-reference",
        },
      },
      {
        title: "LinkedIn Guide",
        description: "Optimize your LinkedIn for recruiters",
        en: "/linkedin-guide",
        zh: "/zh-tw/linkedin-guide",
        mini: {
          title: "LinkedIn Branding Guide",
          description: "Build your personal brand",
          en: "/linkedin-branding-guide",
          zh: "/zh-tw/linkedin-branding-guide",
        },
      },
    ],
  },
  {
    label: "Interview Prep",
    guides: [
      {
        title: "Interview Prep Guide",
        description: "Step-by-step interview preparation",
        en: "/interview-prep-guide",
        zh: "/zh-tw/interview-prep-guide",
        mini: {
          title: "Interview Preparation Guide",
          description: "Deep dive with examples",
          en: "/interview-preparation-guide",
          zh: "/zh-tw/interview-preparation-guide",
        },
      },
      {
        title: "HR Interview Guide",
        description: "Pass the HR screening round",
        en: "/hr-interview-guide",
        zh: "/zh-tw/hr-interview-guide",
      },
      {
        title: "Recruiter Screen Guide",
        description: "Ace the first phone call",
        en: "/recruiter-guide",
        zh: "/zh-tw/recruiter-guide",
      },
      {
        title: "Problem Solving 101",
        description: "Structured thinking for interviews",
        en: "/problem-solving-guide",
        zh: "/zh-tw/problem-solving-guide",
      },
    ],
  },
  {
    label: "Career Strategy",
    guides: [
      {
        title: "Pivot Method Guide",
        description: "Change careers successfully",
        en: "/pivot-method-guide",
        zh: "/zh-tw/pivot-method-guide",
        mini: {
          title: "Pivot Method Mini Guide",
          description: "Quick-start framework",
          en: "/pivot-method-mini-guide",
          zh: "/zh-tw/pivot-method-mini-guide",
        },
      },
      {
        title: "Ikigai Career Guide",
        description: "Find work that gives you purpose",
        en: "/ikigai-guide",
        zh: "/zh-tw/ikigai-guide",
      },
      {
        title: "Career Game Guide",
        description: "Play your career strategically",
        en: "/career-game-guide",
        zh: "/zh-tw/career-game-guide",
      },
      {
        title: "Office Politics Guide",
        description: "Navigate workplace dynamics",
        en: "/office-politics-guide",
        zh: "/zh-tw/office-politics-guide",
      },
      {
        title: "Recruiter Guide",
        description: "How recruiters think (insider guide)",
        en: "/recruiter-guide",
        zh: "/zh-tw/recruiter-guide",
      },
    ],
  },
  {
    label: "Job Search & Offers",
    guides: [
      {
        title: "AI Job Search Guide",
        description: "Use AI tools to find jobs faster",
        en: "/ai-job-search-guide",
        zh: "/zh-tw/ai-job-search-guide",
      },
      {
        title: "Job Offer Guide",
        description: "Evaluate and negotiate offers",
        en: "/job-offer-guide",
        zh: "/zh-tw/job-offer-guide",
      },
      {
        title: "Salary Starter Kit",
        description: "Negotiation templates and framework",
        en: "/salary-starter-kit",
        zh: "/zh-tw/salary-starter-kit",
      },
    ],
  },
];

function PillLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-gold/50 transition-colors"
    >
      {label}
    </a>
  );
}

function GuideRow({ guide, isNested = false }: { guide: GuideItem; isNested?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2.5 ${isNested ? "pl-6 md:pl-8" : ""}`}>
      <div className="flex-1 min-w-0">
        {isNested && <span className="text-muted-foreground mr-1.5 text-sm">↳</span>}
        <span className={`font-medium ${isNested ? "text-sm text-muted-foreground" : "text-base text-foreground"}`}>
          {guide.title}
        </span>
        <span className={`hidden sm:inline ml-2 ${isNested ? "text-xs" : "text-sm"} text-muted-foreground`}>
          — {guide.description}
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <PillLink href={guide.en} label="EN" />
        <PillLink href={guide.zh} label="中文" />
      </div>
    </div>
  );
}

const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
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

      {/* Content */}
      <main className="flex-1 pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">Career Guides</h1>
          <p className="text-muted-foreground mb-10">
            Written by a senior recruiter with 13+ years of experience.
          </p>

          {categories.map((cat) => (
            <section key={cat.label} className="mb-10 last:mb-0">
              <h2 className="font-heading text-lg font-semibold text-executive-green mb-3">{cat.label}</h2>
              <div className="divide-y divide-border">
                {cat.guides.map((guide) => (
                  <div key={guide.en}>
                    <GuideRow guide={guide} />
                    {guide.mini && <GuideRow guide={guide.mini} isNested />}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default GuidesPage;
