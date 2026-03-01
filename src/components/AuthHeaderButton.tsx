import { Link, useLocation } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthHeaderButtonProps {
  variant?: "nav" | "light";
}

export function AuthHeaderButton({ variant = "nav" }: AuthHeaderButtonProps) {
  const { isLoggedIn, user, signOut, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  const isNav = variant === "nav";
  const baseClass = isNav
    ? "text-cream-70 hover:text-cream transition-colors"
    : "text-muted-foreground hover:text-foreground transition-colors";

  // Determine dashboard path based on current locale
  const isZhTw = location.pathname.startsWith("/zh-tw") || location.pathname.startsWith("/zh");
  const dashboardPath = isZhTw ? "/zh-tw/dashboard" : "/dashboard";

  if (!isLoggedIn) {
    return (
      <Link
        to="/login"
        state={{ from: location.pathname }}
        className={`flex items-center gap-1.5 text-sm ${baseClass}`}
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign in</span>
      </Link>
    );
  }

  const initial = (user?.email?.[0] || "U").toUpperCase();

  const dashboardLabel = isZhTw ? "我的專區" : "My Toolkit";

  return (
    <div className="flex items-center gap-3">
      <Link
        to={dashboardPath}
        className={`flex items-center gap-2 text-sm font-medium ${baseClass}`}
      >
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            isNav ? "bg-gold/20 text-gold" : "bg-accent/20 text-accent"
          }`}
        >
          {initial}
        </span>
        <span>{dashboardLabel}</span>
      </Link>
      <button
        onClick={signOut}
        className={`flex items-center gap-1 text-sm ${baseClass}`}
        title={isZhTw ? "登出" : "Sign out"}
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
