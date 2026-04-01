import { memo, useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, MessageSquareText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: { en: "Dashboard", zh: "首頁" },
    path: { en: "/dashboard", zh: "/zh-tw/dashboard" },
  },
  {
    id: "resume",
    icon: FileText,
    label: { en: "Resume", zh: "履歷" },
    path: { en: "/resume", zh: "/zh-tw/resume" },
  },
  {
    id: "interview",
    icon: MessageSquareText,
    label: { en: "Interview", zh: "面試題庫" },
    path: { en: "/interview-questions", zh: "/zh-tw/interview-questions" },
  },
];

interface MobileBottomNavProps {
  lang?: "en" | "zh";
}

function isActiveRoute(pathname: string, itemId: string): boolean {
  if (itemId === "dashboard") return pathname === "/dashboard" || pathname === "/zh-tw/dashboard";
  if (itemId === "resume") return ["/resume", "/zh-tw/resume", "/resume-analyzer", "/resume-simple", "/zh-tw/resume-simple", "/zh-tw/resume-analyzer"].some(p => pathname.startsWith(p));
  if (itemId === "interview") return pathname.includes("/interview-questions");
  return false;
}

// Pages where the bottom nav should be hidden (they have their own nav/footer)
const HIDDEN_ON_PATHS = [
  "/resume-guide", "/interview-prep-guide", "/interview-preparation-guide",
  "/linkedin-guide", "/linkedin-branding-guide", "/pivot-method-guide",
  "/pivot-method-mini-guide", "/guides", "/ikigai-guide", "/office-politics-guide",
  "/problem-solving-guide", "/recruiter-guide", "/hr-interview-guide",
  "/career-game-guide", "/ai-job-search-guide",
  "/job-offer-guide", "/salary-starter-kit", "/salary",
  "/review", "/resume",
];

function shouldHideNav(pathname: string): boolean {
  const normalized = pathname.replace("/zh-tw", "");
  return HIDDEN_ON_PATHS.some(p => normalized.startsWith(p));
}

const MobileBottomNav = memo(function MobileBottomNav({ lang = "en" }: MobileBottomNavProps) {
  const { pathname } = useLocation();
  const { isLoggedIn, isLoading } = useAuth();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY.current + 10) setVisible(false);
    else if (currentY < lastScrollY.current - 10) setVisible(true);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading || !isLoggedIn || shouldHideNav(pathname)) return null;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-card/95 backdrop-blur-md safe-area-bottom transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map((item) => {
          const active = isActiveRoute(pathname, item.id);
          const Icon = item.icon;
          const to = item.path[lang === "zh" ? "zh" : "en"];

          return (
            <Link
              key={item.id}
              to={to}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors"
              aria-label={item.label[lang]}
            >
              <Icon
                className="w-5 h-5 transition-colors"
                style={{ color: active ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }}
              />
              <span
                className="text-[10px] font-medium transition-colors"
                style={{ color: active ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }}
              >
                {item.label[lang]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

export default MobileBottomNav;
