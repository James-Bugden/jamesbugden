import { useState, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { trackEvent } from "@/lib/trackEvent";

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 60;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const fromPath: string = location.state?.from || "";
  const isZhTw = fromPath.startsWith("/zh-tw") || fromPath.startsWith("/zh");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Separate flag for the Google button — the OAuth redirect takes 2–3s to
  // resolve the Supabase signInWithOAuth → Google URL round-trip, and without
  // immediate visual feedback the button felt dead on click.
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  const attemptsRef = useRef(0);
  const lockoutTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLockout = useCallback(() => {
    setLockoutRemaining(LOCKOUT_SECONDS);
    lockoutTimerRef.current = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current);
          attemptsRef.current = 0;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Always land on the dashboard after sign-in, regardless of where the
      // user came from. (Users explicitly asked for this — previously we
      // respected `location.state.from` / `auth_redirect`, which sometimes
      // sent them back to the homepage or the page they bounced off.)
      sessionStorage.removeItem("auth_redirect");
      const dashboard = isZhTw ? "/zh-tw/dashboard" : "/dashboard";
      navigate(dashboard, { replace: true });
    }
  }, [isLoggedIn, navigate, isZhTw]);

  useEffect(() => {
    return () => { if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current); };
  }, []);

  const isLockedOut = lockoutRemaining > 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;
    setError("");
    setLoading(true);
    trackEvent("auth", "login_attempt", { method: "email" });
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      attemptsRef.current += 1;
      trackEvent("auth", "login_failed", { method: "email", reason: error.message });
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        startLockout();
        setError(isZhTw
          ? `嘗試次數過多，請在 ${LOCKOUT_SECONDS} 秒後重試`
          : `Too many attempts. Please wait ${LOCKOUT_SECONDS} seconds.`);
      } else {
        setError(error.message === "Invalid login credentials"
          ? (isZhTw ? "電子郵件或密碼錯誤" : "Invalid email or password")
          : error.message);
      }
    } else {
      attemptsRef.current = 0;
      trackEvent("auth", "login_succeeded", { method: "email" });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
  };

  const handleGoogle = async () => {
    if (googleLoading) return;
    setError("");
    setGoogleLoading(true);
    trackEvent("auth", "oauth_clicked", { provider: "google", flow: "login" });
    const from = location.state?.from;
    if (from) sessionStorage.setItem("auth_redirect", from);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    // On success the tab navigates away to accounts.google.com, so there's
    // no need to reset the flag. Only clear it if the call errored.
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
      trackEvent("auth", "oauth_failed", { provider: "google", flow: "login", reason: error.message });
    }
  };

  const t = {
    title: isZhTw ? "登入" : "Sign In",
    subtitle: isZhTw ? "登入以使用所有工具" : "Sign in to access all tools",
    email: isZhTw ? "電子郵件" : "Email",
    password: isZhTw ? "密碼" : "Password",
    signIn: isZhTw ? "登入" : "Sign In",
    google: isZhTw ? "使用 Google 登入" : "Continue with Google",
    googleLoading: isZhTw ? "連線至 Google…" : "Connecting to Google…",
    forgot: isZhTw ? "忘記密碼？" : "Forgot password?",
    noAccount: isZhTw ? "還沒有帳號？" : "Don't have an account?",
    signUp: isZhTw ? "建立帳號" : "Sign Up",
    back: isZhTw ? "返回" : "Back",
    forgotTitle: isZhTw ? "重設密碼" : "Reset Password",
    forgotSubtitle: isZhTw ? "輸入您的電子郵件，我們將發送重設連結" : "Enter your email and we'll send a reset link",
    sendLink: isZhTw ? "發送重設連結" : "Send Reset Link",
    resetSent: isZhTw ? "重設連結已發送！請檢查您的電子郵件。" : "Reset link sent! Check your email.",
    or: isZhTw ? "或" : "or",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO />
      <div className="w-full max-w-[400px]">
        <div className="mb-6">
          <Link to={isZhTw ? "/zh-tw" : "/"} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">
            {mode === "login" ? t.title : t.forgotTitle}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "login" ? t.subtitle : t.forgotSubtitle}
          </p>

          {mode === "login" ? (
            <>
              <Button variant="outline" className="w-full h-11 mb-4 gap-2" onClick={handleGoogle} disabled={googleLoading}>
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                )}
                {googleLoading ? t.googleLoading : t.google}
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">{t.or}</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-11" required autoComplete="email" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 h-11" required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button type="submit" className="w-full h-11 font-semibold" disabled={loading || isLockedOut}>
                  {isLockedOut
                    ? (isZhTw ? `請等待 ${lockoutRemaining} 秒` : `Wait ${lockoutRemaining}s`)
                    : loading ? "..." : t.signIn}
                </Button>
              </form>

              <button onClick={() => { setMode("forgot"); setError(""); }} className="text-xs text-muted-foreground hover:text-foreground mt-3 block">
                {t.forgot}
              </button>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                {t.noAccount}{" "}
                <Link to="/join" state={location.state} className="text-foreground font-medium hover:underline">
                  {t.signUp}
                </Link>
              </p>
            </>
          ) : (
            <>
              {resetSent ? (
                <div className="text-center py-4">
                  <p className="text-sm text-foreground">{t.resetSent}</p>
                  <button onClick={() => { setMode("login"); setResetSent(false); }} className="text-sm text-muted-foreground hover:text-foreground mt-3">
                    ← {t.signIn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-11" required autoComplete="email" />
                  </div>
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                    {loading ? "..." : t.sendLink}
                  </Button>
                  <button type="button" onClick={() => { setMode("login"); setError(""); }} className="text-xs text-muted-foreground hover:text-foreground block">
                    ← {t.signIn}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}