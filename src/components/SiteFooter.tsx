import { Link, useLocation } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ThemeToggle from "@/components/ThemeToggle";
import { Wordmark } from "@/components/Wordmark";

const SiteFooter = () => {
  const { pathname } = useLocation();
  const isZh = pathname.startsWith("/zh-tw");
  const prefix = isZh ? "/zh-tw" : "";

  return (
    <footer className="bg-nav-green py-6 px-5 md:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Brand lockup */}
        <div className="text-gold mb-5">
          <Wordmark variant="primary" size={36} />
        </div>
        {/* Social icons */}
        <div className="flex items-center gap-5 mb-5">
          <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
            <ThreadsIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Link groups */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-12 mb-5">
          <div>
            <h4 className="text-cream-90 text-xs font-semibold uppercase tracking-wider mb-2">
              {isZh ? "指南" : "Guides"}
            </h4>
            <ul className="space-y-1 text-sm">
              <li><Link to={`${prefix}/guides`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "所有指南" : "All Guides"}</Link></li>
              <li><Link to={`${prefix}/resume-guide`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "履歷攻略" : "Resume Guide"}</Link></li>
              <li><Link to={`${prefix}/interview-preparation-guide`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "面試準備" : "Interview Prep"}</Link></li>
              <li><Link to={`${prefix}/linkedin-guide`} className="text-cream-70 hover:text-cream transition-colors">LinkedIn</Link></li>
              <li><Link to={`${prefix}/salary-starter-kit`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "薪資談判入門" : "Salary Guide"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-90 text-xs font-semibold uppercase tracking-wider mb-2">
              {isZh ? "工具" : "Tools"}
            </h4>
            <ul className="space-y-1 text-sm">
              <li><Link to={`${prefix}/toolkit`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "談判工具箱" : "Negotiation Toolkit"}</Link></li>
              <li><Link to={`${prefix}/offer-calculator`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "Offer 計算機" : "Offer Calculator"}</Link></li>
              <li><Link to={`${prefix}/resume-analyzer`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "履歷分析器" : "Resume Analyzer"}</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <span className="text-xs text-cream-90">
            © {new Date().getFullYear()} Hiresign, {isZh ? "由 James Bugden 創辦" : "by James Bugden"}. {isZh ? "版權所有" : "All rights reserved"}.
          </span>
          <div className="flex items-center gap-3 text-xs">
            <Link to="/privacy" className="text-cream-70 hover:text-cream transition-colors">
              {isZh ? "隱私權政策" : "Privacy Policy"}
            </Link>
            <span className="text-cream-70">·</span>
            <Link to="/terms" className="text-cream-70 hover:text-cream transition-colors">
              {isZh ? "服務條款" : "Terms of Service"}
            </Link>
          </div>
          <div className="sm:ml-auto">
            <ThemeToggle variant="nav" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
