import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface LoginGateProps {
  children: ReactNode;
  /** Custom message shown on the overlay */
  message?: string;
  /** "en" | "zh" — controls button labels and default message */
  lang?: "en" | "zh";
  /** Extra className on the wrapper */
  className?: string;
}

const i18n = {
  en: {
    defaultMessage: "Log in to use this tool",
    login: "Log In",
    signup: "Sign Up",
  },
  zh: {
    defaultMessage: "請登入以使用此工具",
    login: "登入",
    signup: "註冊",
  },
};

export default function LoginGate({ children, message, lang = "en", className }: LoginGateProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = i18n[lang] ?? i18n.en;

  // While loading auth state, or if logged in, just render children
  if (isLoading || isLoggedIn) {
    return <>{children}</>;
  }

  const loginPath = "/login";
  const signupPath = "/join";

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Dimmed, non-interactive children */}
      <div className="pointer-events-none select-none opacity-50 blur-[1px]" aria-hidden>
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="bg-card border border-border rounded-2xl shadow-xl px-8 py-7 flex flex-col items-center gap-4 max-w-xs text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold text-foreground leading-snug">
            {message ?? t.defaultMessage}
          </p>
          <div className="flex gap-3 w-full">
            <Button
              className="flex-1"
              onClick={() => navigate(loginPath, { state: { from: location.pathname + location.search } })}
            >
              {t.login}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(signupPath, { state: { from: location.pathname + location.search } })}
            >
              {t.signup}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
