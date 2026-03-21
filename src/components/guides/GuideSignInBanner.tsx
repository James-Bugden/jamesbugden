import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuideSignInBannerProps {
  lang?: "en" | "zh";
}

const i18n = {
  en: {
    message: "Sign in to save your progress and access all guides",
    login: "Log In",
    signup: "Sign Up Free",
  },
  zh: {
    message: "登入以儲存進度並取得所有指南",
    login: "登入",
    signup: "免費註冊",
  },
};

export default function GuideSignInBanner({ lang = "en" }: GuideSignInBannerProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = i18n[lang] ?? i18n.en;

  if (isLoading || isLoggedIn) return null;

  return (
    <section className="py-4 px-5 md:px-6 bg-gold/5 border-b border-gold/20">
      <div className="container mx-auto max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground text-center sm:text-left">
          {t.message}
        </p>
        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
          >
            <LogIn className="w-3.5 h-3.5" />
            {t.login}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => navigate("/join", { state: { from: location.pathname } })}
          >
            <UserPlus className="w-3.5 h-3.5" />
            {t.signup}
          </Button>
        </div>
      </div>
    </section>
  );
}
