import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { SEO } from "@/components/SEO";

// Validate that URL is an internal path only (prevents open redirect attacks)
const isInternalUrl = (url: string): boolean => {
  return url.startsWith('/') && 
         !url.startsWith('//') && 
         !url.match(/^(javascript|data|vbscript):/i);
};

const ClientReviewGate = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // Prefer explicit ?lang=zh query param (so emails/Notion links can target
  // per-client locale), otherwise fall back to /zh-tw/... pathname.
  const langParam = searchParams.get("lang");
  const isZhTw = langParam === "zh" || langParam === "zh-tw" || location.pathname.startsWith("/zh-tw");

  const t = isZhTw
    ? {
        title: "履歷審閱存取",
        subtitle: "請輸入您的密碼以檢視個人化審閱",
        passwordLabel: "密碼",
        passwordPlaceholder: "輸入您的密碼",
        submit: "檢視我的審閱",
        verifying: "驗證中…",
        showPassword: "顯示密碼",
        hidePassword: "隱藏密碼",
        errorIncorrect: "密碼錯誤，請再試一次。",
        errorInvalid: "審閱設定無效，請聯繫客服。",
        needHelp: "需要協助？",
        contactJames: "聯繫 James",
      }
    : {
        title: "Resume Review Access",
        subtitle: "Enter your password to access your personalized review",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        submit: "View My Review",
        verifying: "Verifying...",
        showPassword: "Show password",
        hidePassword: "Hide password",
        errorIncorrect: "Incorrect password. Please try again.",
        errorInvalid: "Invalid review configuration. Please contact support.",
        needHelp: "Need help?",
        contactJames: "Contact James",
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Add minimum response time to prevent timing attacks
    const minResponseTime = 500;
    const startTime = Date.now();

    // Use secure RPC function that verifies password server-side
    const { data, error: rpcError } = await supabase
      .rpc('verify_client_password', { input_password: password });

    // Ensure minimum response time regardless of result
    const elapsed = Date.now() - startTime;
    if (elapsed < minResponseTime) {
      await new Promise(resolve => setTimeout(resolve, minResponseTime - elapsed));
    }

    if (rpcError || !data || data.length === 0) {
      setError(t.errorIncorrect);
      setSubmitting(false);
      return;
    }

    const matchedReview = data[0];

    // Validate review URL is internal only (defense in depth)
    if (!isInternalUrl(matchedReview.review_url)) {
      setError(t.errorInvalid);
      setSubmitting(false);
      return;
    }

    // Update last_viewed_at using secure RPC function
    await supabase.rpc('mark_review_viewed', {
      review_id: matchedReview.review_id
    });

    // Redirect to the actual review page
    navigate(matchedReview.review_url);
  };

  return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <SEO />
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-2xl shadow-lg p-10 md:p-12">
          <div className="text-center mb-8">
            <Lock className="h-8 w-8 mx-auto mb-6 text-foreground" strokeWidth={1.5} />
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
              {t.title}
            </h1>
            <p className="text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                {t.passwordLabel}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder={t.passwordPlaceholder}
                  required
                  autoComplete="current-password"
                  className={`h-14 text-base px-4 pr-12 bg-muted/50 border-border ${error ? "border-destructive" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-lg text-base font-medium text-cream transition-all duration-300 disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, hsl(153 38% 17%) 0%, hsl(153 30% 23%) 100%)',
              }}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t.verifying}
                </span>
              ) : (
                t.submit
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          {t.needHelp}{" "}
          <a
            href="mailto:james@james.careers"
            className="text-foreground hover:underline font-medium"
          >
            {t.contactJames}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClientReviewGate;