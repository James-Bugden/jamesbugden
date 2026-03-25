import { Link, useLocation } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { ThreadsIcon } from "@/components/SocialIcons";

const SiteFooter = () => {
  const { pathname } = useLocation();
  const isZh = pathname.startsWith("/zh-tw");
  const prefix = isZh ? "/zh-tw" : "";

  return (
    <footer className="py-10 md:py-14 px-5 md:px-6 bg-card border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Guides */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">
              {isZh ? "指南" : "Guides"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={`${prefix}/guides`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "所有指南" : "All Guides"}</Link></li>
              <li><Link to={`${prefix}/resume-guide`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "履歷攻略" : "Resume Guide"}</Link></li>
              <li><Link to={`${prefix}/interview-prep-guide`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "面試準備" : "Interview Prep"}</Link></li>
              <li><Link to={`${prefix}/linkedin-guide`} className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</Link></li>
            </ul>
          </div>

          {/* Salary */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">
              {isZh ? "薪資" : "Salary"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={`${prefix}/salary`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "薪資資料庫" : "Salary Database"}</Link></li>
              <li><Link to={`${prefix}/salary/explore`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "探索薪資" : "Explore Salaries"}</Link></li>
              <li><Link to={`${prefix}/salary-starter-kit`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "薪資談判入門" : "Starter Kit"}</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">
              {isZh ? "工具" : "Tools"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={`${prefix}/toolkit`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "談判工具箱" : "Negotiation Toolkit"}</Link></li>
              <li><Link to={`${prefix}/offer-calculator`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "Offer 計算機" : "Offer Calculator"}</Link></li>
              <li><Link to={`${prefix}/resume-analyzer`} className="text-muted-foreground hover:text-foreground transition-colors">{isZh ? "履歷分析器" : "Resume Analyzer"}</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">
              {isZh ? "聯繫" : "Connect"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <ThreadsIcon className="w-3.5 h-3.5" /> Threads
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} James Bugden. {isZh ? "版權所有" : "All rights reserved"}.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
