import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const isZhTw = location.state?.from?.startsWith("/zh-tw") || false;

  const t = isZhTw
    ? {
        title: "重設密碼",
        heading: "設定新密碼",
        subtitle: "請在下方輸入您的新密碼。",
        placeholder: "新密碼（至少 6 個字元）",
        confirmPlaceholder: "再次輸入新密碼",
        submit: "更新密碼",
        successTitle: "密碼已更新",
        successMsg: "正在為您導向…",
        invalidLink: "無效或已過期的重設連結。",
        backToLogin: "← 返回登入",
        back: "返回",
        minLength: "密碼至少需要 6 個字元",
        mismatch: "兩次輸入的密碼不一致",
      }
    : {
        title: "Reset Password",
        heading: "Set New Password",
        subtitle: "Enter your new password below.",
        placeholder: "New password (min. 6 characters)",
        confirmPlaceholder: "Confirm new password",
        submit: "Update Password",
        successTitle: "Password Updated",
        successMsg: "Redirecting you now…",
        invalidLink: "Invalid or expired reset link.",
        backToLogin: "← Back to Sign In",
        back: "Back",
        minLength: "Password must be at least 6 characters",
        mismatch: "Passwords do not match",
      };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setHasToken(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setHasToken(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError(t.minLength);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.mismatch);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  if (!hasToken && !success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-[400px] bg-card border border-border rounded-xl shadow-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">{t.invalidLink}</p>
          <Link to="/login" className="text-sm text-foreground font-medium hover:underline mt-4 inline-block">
            {t.backToLogin}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO />
      <div className="w-full max-w-[400px]">
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">{t.successTitle}</h2>
              <p className="text-sm text-muted-foreground">{t.successMsg}</p>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-1">{t.heading}</h1>
              <p className="text-sm text-muted-foreground mb-6">{t.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t.placeholder}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11"
                    required
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t.confirmPlaceholder}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                    autoComplete="new-password"
                  />
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                  {loading ? "..." : t.submit}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}