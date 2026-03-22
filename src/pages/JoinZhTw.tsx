import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ScanSearch, FileText, BookOpen, Loader2, ShieldCheck } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import PageSEO from "@/components/PageSEO";
import LogoScrollZhTw from "@/components/LogoScrollZhTw";
import { motion } from "framer-motion";
import { syncToMailerLite } from "@/lib/mailerlite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UNLOCK_BADGES = [
  { icon: ScanSearch, label: "AI 履歷健檢" },
  { icon: FileText, label: "履歷產生器" },
  { icon: BookOpen, label: "職涯攻略" },
];

const FAQ_ITEMS = [
  {
    q: "這真的免費嗎？",
    a: "是的，這些工具完全免費。我的使命是讓更多線上付費工具變成免費。",
  },
  {
    q: "建立帳號後可以使用什麼？",
    a: "你可以使用 AI 履歷健檢、履歷產生器、可下載的職涯攻略，以及你的個人儀表板。",
  },
  {
    q: "我已經訂閱電子報了，這有什麼不同？",
    a: "電子報會將內容寄到你的信箱。帳號則讓你使用互動工具和個人儀表板。",
  },
];

function getPasswordStrength(pw: string): { level: number; label: string; color: string } {
  if (pw.length === 0) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "弱", color: "bg-destructive" };
  if (score <= 3) return { level: 2, label: "中等", color: "bg-gold" };
  return { level: 3, label: "強", color: "bg-executive-green" };
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function JoinZhTw() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const passwordRef = useRef<HTMLInputElement>(null);

  const prefilledEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(password);

  const utmSource = searchParams.get("utm_source") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmMedium = searchParams.get("utm_medium") || "";

  useEffect(() => {
    if (isLoggedIn) navigate("/zh-tw/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (prefilledEmail && passwordRef.current) {
      setTimeout(() => passwordRef.current?.focus(), 400);
    }
  }, [prefilledEmail]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("密碼至少需要 6 個字元");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          ...(utmSource && { utm_source: utmSource }),
          ...(utmCampaign && { utm_campaign: utmCampaign }),
          ...(utmMedium && { utm_medium: utmMedium }),
        },
      },
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
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="免費加入 — 解鎖你的職涯工具箱 | James Bugden"
        description="建立免費帳號，使用履歷產生器、AI 履歷健檢和所有職涯攻略。"
        path="/zh-tw/join"
      />

      <header className="py-6 px-4 flex items-center justify-between max-w-[440px] mx-auto w-full">
        <Link to="/zh-tw" className="font-heading text-sm tracking-[0.25em] text-foreground hover:text-gold transition-colors">
          JAMES BUGDEN
        </Link>
        <LanguageToggle variant="nav" />
      </header>

      <main className="flex flex-col items-center px-4 pb-16">
        <div className="w-full max-w-[440px]">

          <motion.div
            className="text-center mb-8"
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
          >
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
              解鎖你的免費職涯工具箱
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              建立免費帳號，使用履歷產生器、AI 履歷健檢和所有職涯攻略。
            </p>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-xl shadow-lg p-8 mb-6"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
          >
            {success ? (
              <div className="text-center py-4">
                <Mail className="w-10 h-10 text-gold mx-auto mb-4" />
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">請檢查您的電子郵件</h2>
                <p className="text-sm text-muted-foreground">
                  我們已發送驗證連結到您的電子郵件。請點擊連結以啟用您的帳號。
                </p>
                <Link to="/login" className="text-sm text-foreground font-medium hover:underline mt-4 inline-block">
                  ← 登入
                </Link>
              </div>
            ) : (
              <>
                <Button variant="outline" className="w-full h-11 mb-4 gap-2" onClick={handleGoogle}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  使用 Google 註冊
                </Button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">或</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="電子郵件"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="密碼（至少 6 個字元）"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {password.length > 0 && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 flex gap-1">
                          {[1, 2, 3].map(i => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                i <= strength.level ? strength.color : "bg-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-muted-foreground">{strength.label}</span>
                      </div>
                    )}
                  </div>
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <Button type="submit" className="w-full h-12 font-semibold text-base" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "建立免費帳號"}
                  </Button>
                </form>

                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  不需要信用卡
                </p>

                <p className="text-sm text-muted-foreground mt-3 text-center">
                  已經有帳號？{" "}
                  <Link to="/login" className="text-foreground font-medium hover:underline">
                    登入
                  </Link>
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-3 mb-12"
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
          >
            {UNLOCK_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card/50 p-4 text-center"
              >
                <Icon className="w-6 h-6 text-gold" />
                <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mb-8"
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            <p className="text-sm text-muted-foreground mb-4">
              超過 3,459 位專業人士已加入，來自以下企業
            </p>
            <LogoScrollZhTw />
          </motion.div>

          <motion.div
            className="max-w-[440px] mx-auto"
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
          >
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
