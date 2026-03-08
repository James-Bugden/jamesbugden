import { Button } from "@/components/ui/button";
import { Linkedin, ArrowLeft, FileText, Briefcase, MessageSquare, Users, Phone, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";

interface Guide {
  icon: typeof FileText;
  title: string;
  description: string;
  href: string;
  category: string;
}

const guides: Guide[] = [
  // LinkedIn Guides
  {
    icon: Linkedin,
    title: "LinkedIn 求職攻略：讓獵頭主動找上你（迷你指南）",
    description: "快速優化 LinkedIn 個人檔案，提升求職成功率",
    href: "/zh-tw/linkedin-guide",
    category: "LinkedIn",
  },
  {
    icon: Linkedin,
    title: "LinkedIn 求職者必讀：別再投履歷，讓機會主動上門",
    description: "全面打造 LinkedIn 個人品牌的戰術指南",
    href: "/zh-tw/linkedin-branding-guide",
    category: "LinkedIn",
  },
  // Career Change Guides
  {
    icon: Briefcase,
    title: "轉職方法論：快速轉換職涯跑道（迷你指南）",
    description: "快速了解成功轉職的 5 階段框架",
    href: "/zh-tw/pivot-method-mini-guide",
    category: "職涯轉型",
  },
  {
    icon: Briefcase,
    title: "轉職方法論：快速轉換職涯跑道",
    description: "招募人員的完整職涯轉型指南，助你自信地開啟新篇章",
    href: "/zh-tw/pivot-method-guide",
    category: "職涯轉型",
  },
  // Resume Guide
  {
    icon: FileText,
    title: "履歷攻略：讓招募人員一眼選中你",
    description: "來自財富 100 強招募人員的履歷撰寫完整指南",
    href: "/zh-tw/resume-guide",
    category: "履歷撰寫",
  },
  // Interview Guides
  {
    icon: MessageSquare,
    title: "10 小時面試準備系統",
    description: "結構化的系統，讓你在 10 小時內準備好任何面試",
    href: "/zh-tw/interview-prep-guide",
    category: "面試準備",
  },
  {
    icon: MessageSquare,
    title: "完整面試準備指南",
    description: "涵蓋面試準備所有面向的完整指南",
    href: "/zh-tw/interview-preparation-guide",
    category: "面試準備",
  },
  {
    icon: Phone,
    title: "如何通過招募人員的電話篩選",
    description: "資深招募官的完整實戰手冊，含逐字範例與薪資話術",
    href: "/zh-tw/recruiter-screen-guide",
    category: "面試準備",
  },
  // AI 求職
  {
    icon: Bot,
    title: "如何用 AI 管理你的整個求職流程",
    description: "完整指南：從職涯探索到薪資談判，善用 ChatGPT 與 AI 工具提升求職每個階段的效率",
    href: "/zh-tw/ai-job-search-guide",
    category: "AI 求職",
  },
];

const categories = [
  { en: "LinkedIn", zh: "LinkedIn" },
  { en: "履歷撰寫", zh: "履歷撰寫" },
  { en: "職涯轉型", zh: "職涯轉型" },
  { en: "面試準備", zh: "面試準備" },
  { en: "AI 求職", zh: "AI 求職" },
];

const GuidesPageZhTw = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
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

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <Link 
            to="/zh-tw" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首頁
          </Link>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            免費職涯指南
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            來自財富 100 強現任招募人員的實用框架與策略，幫助你找到理想工作。
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="pb-20 md:pb-28 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          {categories.map((category) => (
            <div key={category.zh} className="mb-12 last:mb-0">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 flex items-center gap-3">
                {category.zh === "LinkedIn" && <Linkedin className="w-6 h-6 text-gold" />}
                {category.zh === "履歷撰寫" && <FileText className="w-6 h-6 text-gold" />}
                {category.zh === "職涯轉型" && <Briefcase className="w-6 h-6 text-gold" />}
                {category.zh === "面試準備" && <MessageSquare className="w-6 h-6 text-gold" />}
                {category.zh === "電話篩選" && <Phone className="w-6 h-6 text-gold" />}
                {category.zh}
              </h2>
              
              <div className="grid gap-4">
                {guides
                  .filter((guide) => guide.category === category.zh)
                  .map((guide, index) => {
                    const IconComponent = guide.icon;
                    return (
                      <Link
                        key={index}
                        to={guide.href}
                        className="group bg-card border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-gold" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-lg md:text-xl text-foreground font-semibold mb-1 group-hover:text-gold transition-colors">
                              {guide.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                              {guide.description}
                            </p>
                          </div>
                          <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. 版權所有。
            </span>
            <div className="flex items-center gap-6">
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
      </footer>
    </div>
  );
};

export default GuidesPageZhTw;
