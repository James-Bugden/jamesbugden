import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
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
        submit: "更新密碼",
        successTitle: "密碼已更新",
        successMsg: "正在為您導向…",
        invalidLink: "無效或已過期的重設連結。",
        backToLogin: "← 返回登入",
        minLength: "密碼至少需要 6 個字元",
      }
    : {
        title: "Reset Password",
        heading: "Set new password",
        subtitle: "Enter your new password below.",
        placeholder: "New password (min. 6 characters)",
        submit: "Update Password",
        successTitle: "Password updated",
        successMsg: "Redirecting you now…",
        invalidLink: "Invalid or expired reset link.",
        backToLogin: "← Back to Sign In",
        minLength: "Password must be at least 6 characters",
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
      <div className="auth-page">
        <div className="w-full" style={{ maxWidth: 440 }}>
          <div className="auth-logo">
            <Link to="/">JAMES BUGDEN</Link>
          </div>
          <div className="auth-card text-center">
            <p className="text-sm text-gray-500">{t.invalidLink}</p>
            <Link to="/login" className="text-sm auth-link mt-4 inline-block">
              {t.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <SEO />
      <div className="w-full" style={{ maxWidth: 440 }}>
        <div className="auth-logo">
          <Link to="/">JAMES BUGDEN</Link>
        </div>

        <div className="auth-card">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" style={{ color: '#16A34A' }} />
              <h2 className="auth-title text-center" style={{ fontSize: 20 }}>{t.successTitle}</h2>
              <p className="auth-subtitle text-center">{t.successMsg}</p>
            </div>
          ) : (
            <>
              <h1 className="auth-title">{t.heading}</h1>
              <p className="auth-subtitle">{t.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t.placeholder}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="auth-input with-icon with-right-icon"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="auth-error"><AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{error}</p>}
                <Button type="submit" className="auth-btn-primary" disabled={loading}>
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