import { Mail, ClipboardList, Briefcase, BookOpen, CheckSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Resource {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  featured: boolean;
  showEmailIcon?: boolean;
  isInternalLink?: boolean;
}

const resources: Resource[] = [
  {
    icon: ClipboardList,
    title: "招募人員履歷檢查清單",
    description: "我在 Uber 前 6 秒會檢查什麼",
    buttonText: "免費下載",
    href: "#",
    featured: false,
  },
  {
    icon: Briefcase,
    title: "面試準備表",
    description: "用我實證有效的方法準備任何面試",
    buttonText: "取得準備表",
    href: "#",
    featured: false,
  },
  {
    icon: BookOpen,
    title: "職涯指南合集",
    description: "LinkedIn、面試準備、職涯轉型完整指南",
    buttonText: "查看指南",
    href: "/zh-tw/guides",
    featured: false,
    isInternalLink: true,
  },
  {
    icon: CheckSquare,
    title: "Offer 決策評分卡",
    description: "用我的決策框架客觀評估工作機會",
    buttonText: "取得評分卡",
    href: "#",
    featured: true,
    showEmailIcon: true,
  },
];

const FreeResourcesSectionZhTw = () => {
  return (
    <section id="resources" className="py-16 md:py-24 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header - matching "What Clients Say" style */}
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          免費資源
        </h2>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div
                key={index}
                className={`
                  relative bg-card rounded-2xl p-8 md:p-10 flex flex-col items-center text-center
                  transition-all duration-300 hover:-translate-y-1
                  ${resource.featured 
                    ? "border-2 border-gold/40 shadow-lg" 
                    : "border border-border shadow-md"
                  }
                  hover:shadow-xl
                `}
              >
                {/* Featured Badge */}
                {resource.featured && (
                  <div className="absolute top-4 right-4 bg-gold/15 text-gold text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gold" />
                    最受歡迎
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-gold" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl md:text-2xl text-foreground font-semibold mb-3">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground mb-6 flex-grow">
                  {resource.description}
                </p>

                {/* Button */}
                <Button
                  asChild
                  className="btn-gold h-11 px-6 font-medium text-sm uppercase tracking-wider"
                >
                  {resource.isInternalLink ? (
                    <Link to={resource.href} className="flex items-center justify-center gap-2">
                      {resource.showEmailIcon && <Mail className="w-4 h-4" />}
                      {resource.buttonText}
                    </Link>
                  ) : (
                    <a href={resource.href} className="flex items-center justify-center gap-2">
                      {resource.showEmailIcon && <Mail className="w-4 h-4" />}
                      {resource.buttonText}
                    </a>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreeResourcesSectionZhTw;
