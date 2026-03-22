import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import PageSEO from "@/components/PageSEO";
import { syncToMailerLite } from "@/lib/mailerlite";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isZhTw = location.state?.from?.startsWith("/zh-tw") || false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const defaultDash = isZhTw ? "/zh-tw/dashboard" : "/dashboard";
      const redirectTo = location.state?.from || sessionStorage.getItem("auth_redirect") || defaultDash;
      sessionStorage.removeItem("auth_redirect");
      navigate(redirectTo, { replace: true });
    }
  }, [isLoggedIn, navigate, location.state, isZhTw]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError(isZhTw ? "密碼至少需要 6 個字元" : "Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      syncToMailerLite(email.trim());
    }
  };

  const handleGoogle = async () => {
    setError("");
    const from = location.state?.from;
    if (from) sessionStorage.setItem("auth_redirect", from);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) setError(error.message);
  };

  const t = {
    title: isZhTw ? "建立帳號" : "Create Account",
    subtitle: isZhTw ? "建立免費帳號以使用所有工具" : "Create a free account to access all tools",
    email: isZhTw ? "電子郵件" : "Email",
    password: isZhTw ? "密碼（至少 6 個字元）" : "Password (min. 6 characters)",
    signUp: isZhTw ? "建立帳號" : "Create Account",
    google: isZhTw ? "使用 Google 註冊" : "Continue with Google",
    hasAccount: isZhTw ? "已經有帳號？" : "Already have an account?",
    signIn: isZhTw ? "登入" : "Sign In",
    back: isZhTw ? "返回" : "Back",
    successTitle: isZhTw ? "請檢查您的電子郵件" : "Check your email",
    successMsg: isZhTw ? "我們已發送驗證連結到您的電子郵件。請點擊連結以啟用您的帳號。" : "We've sent a verification link to your email. Click the link to activate your account.",
    or: isZhTw ? "或" : "or",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <PageSEO title={`${t.title} | James Bugden`} description={t.subtitle} path="/signup" />
      <div className="w-full max-w-[400px]">
        <div className="mb-6">
          <Link to={isZhTw ? "/zh-tw" : "/"} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          {success ? (
            <div className="text-center py-4">
              <Mail className="w-10 h-10 text-gold mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">{t.successTitle}</h2>
              <p className="text-sm text-muted-foreground">{t.successMsg}</p>
              <Link to="/login" state={location.state} className="text-sm text-foreground font-medium hover:underline mt-4 inline-block">
                ← {t.signIn}
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-1">{t.title}</h1>
              <p className="text-sm text-muted-foreground mb-6">{t.subtitle}</p>

              <Button variant="outline" className="w-full h-11 mb-4 gap-2" onClick={handleGoogle}>
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {t.google}
              </Button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">{t.or}</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <form onSubmit={handleSignup} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-11" required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 h-11" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                  {loading ? "..." : t.signUp}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                {t.hasAccount}{" "}
                <Link to="/login" state={location.state} className="text-foreground font-medium hover:underline">
                  {t.signIn}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
