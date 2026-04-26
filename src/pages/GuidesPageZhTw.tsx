import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";


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
    label: "履歷與 LinkedIn",
    guides: [
      {
        title: "履歷攻略",
        description: "如何寫出讓你獲得面試的履歷",
        en: "/resume-guide",
        zh: "/zh-tw/resume-guide",
        mini: {
          title: "履歷速查表",
          description: "一頁重點整理",
          en: "/resume-quick-reference",
          zh: "/zh-tw/resume-quick-reference",
        },
      },
      {
        title: "LinkedIn 指南",
        description: "讓招募人員主動找上你",
        en: "/linkedin-guide",
        zh: "/zh-tw/linkedin-guide",
        mini: {
          title: "LinkedIn 品牌指南",
          description: "打造個人品牌",
          en: "/linkedin-branding-guide",
          zh: "/zh-tw/linkedin-branding-guide",
        },
      },
    ],
  },
  {
    label: "面試準備",
    guides: [
      {
        title: "面試準備指南",
        description: "步驟式面試準備法",
        en: "/interview-prep-guide",
        zh: "/zh-tw/interview-prep-guide",
        mini: {
          title: "完整面試準備指南",
          description: "深度解析與範例",
          en: "/interview-preparation-guide",
          zh: "/zh-tw/interview-preparation-guide",
        },
      },
      {
        title: "HR 面試指南",
        description: "通過 HR 篩選關",
        en: "/hr-interview-guide",
        zh: "/zh-tw/hr-interview-guide",
      },
      {
        title: "招募人員篩選指南",
        description: "搞定第一通電話",
        en: "/recruiter-guide",
        zh: "/zh-tw/recruiter-guide",
      },
      {
        title: "問題解決 101",
        description: "面試中的結構化思維",
        en: "/problem-solving-guide",
        zh: "/zh-tw/problem-solving-guide",
      },
    ],
  },
  {
    label: "職涯策略",
    guides: [
      {
        title: "轉職方法論",
        description: "成功轉換跑道",
        en: "/pivot-method-guide",
        zh: "/zh-tw/pivot-method-guide",
        mini: {
          title: "轉職迷你指南",
          description: "快速入門框架",
          en: "/pivot-method-mini-guide",
          zh: "/zh-tw/pivot-method-mini-guide",
        },
      },
      {
        title: "Ikigai 職涯指南",
        description: "找到有使命感的工作",
        en: "/ikigai-guide",
        zh: "/zh-tw/ikigai-guide",
      },
      {
        title: "職涯遊戲指南",
        description: "策略性經營你的職涯",
        en: "/career-game-guide",
        zh: "/zh-tw/career-game-guide",
      },
      {
        title: "職場政治指南",
        description: "掌握職場動態",
        en: "/office-politics-guide",
        zh: "/zh-tw/office-politics-guide",
      },
      {
        title: "招募人員指南",
        description: "了解招募人員的思維（內部人士指南）",
        en: "/recruiter-guide",
        zh: "/zh-tw/recruiter-guide",
      },
    ],
  },
  {
    label: "求職與 Offer",
    guides: [
      {
        title: "AI 求職指南",
        description: "用 AI 工具更快找到工作",
        en: "/ai-job-search-guide",
        zh: "/zh-tw/ai-job-search-guide",
      },
      {
        title: "工作 Offer 指南",
        description: "評估與談判 Offer",
        en: "/job-offer-guide",
        zh: "/zh-tw/job-offer-guide",
      },
      {
        title: "薪資談判入門",
        description: "談判範本與框架",
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

const GuidesPageZhTw = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="職涯指南 | James Bugden"
        description="由資深科技招募官撰寫，經實戰驗證的履歷、LinkedIn、面試、Offer 談判與職涯策略指南。"
        schemaJson={guideSchema({
          path: "/zh-tw/guides",
          title: "職涯指南 | James Bugden",
          description: "由資深科技招募官撰寫，經實戰驗證的履歷、LinkedIn、面試、Offer 談判與職涯策略指南。",
        })}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            hiresign
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
            to="/zh-tw"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首頁
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">求職指南</h1>
          <p className="text-muted-foreground mb-10">
            由擁有13年以上經驗的資深招募官撰寫
          </p>

          {categories.map((cat) => (
            <section key={cat.label} className="mb-10 last:mb-0">
              <h2 className="font-heading text-lg font-semibold text-executive-green mb-3">{cat.label}</h2>
              <div className="divide-y divide-border">
                {cat.guides.map((guide) => (
                  <div key={guide.zh}>
                    <GuideRow guide={guide} />
                    {guide.mini && <GuideRow guide={guide.mini} isNested />}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default GuidesPageZhTw;
