import { Link, useLocation } from "react-router-dom";

const SiteFooter = () => {
  const { pathname } = useLocation();
  const isZh = pathname.startsWith("/zh-tw");
  const prefix = isZh ? "/zh-tw" : "";

  return (
    <footer className="bg-nav-green py-6 px-5 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-6">
          {/* Guides */}
          <div>
            <h4 className="text-cream-90 text-xs font-semibold uppercase tracking-wider mb-2">
              {isZh ? "指南" : "Guides"}
            </h4>
            <ul className="space-y-1 text-sm">
              <li><Link to={`${prefix}/guides`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "所有指南" : "All Guides"}</Link></li>
              <li><Link to={`${prefix}/resume-guide`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "履歷攻略" : "Resume Guide"}</Link></li>
              <li><Link to={`${prefix}/interview-prep-guide`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "面試準備" : "Interview Prep"}</Link></li>
              <li><Link to={`${prefix}/linkedin-guide`} className="text-cream-70 hover:text-cream transition-colors">LinkedIn</Link></li>
              <li><Link to={`${prefix}/salary-starter-kit`} className="text-cream-70 hover:text-cream transition-colors">{isZh ? "薪資談判入門" : "Salary Guide"}</Link></li>
            </ul>
          </div>

          {/* Tools */}
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

        <div className="border-t border-white/10 pt-4">
          <span className="text-xs text-cream-70">
            © {new Date().getFullYear()} James Bugden. {isZh ? "版權所有" : "All rights reserved"}.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
