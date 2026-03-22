import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ScanSearch, FileText, BookOpen, Loader2, ShieldCheck } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useAuth } from "@/contexts/AuthContext";
import PageSEO from "@/components/PageSEO";
import LogoScroll from "@/components/LogoScroll";
import { motion } from "framer-motion";
import { syncToMailerLite } from "@/lib/mailerlite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UNLOCK_BADGES = [
  { icon: ScanSearch, label: "AI Resume Analyzer" },
  { icon: FileText, label: "Resume Builder" },
  { icon: BookOpen, label: "Career Guides" },
];

const FAQ_ITEMS = [
  {
    q: "Is this really free?",
    a: "Yes. These tools are completely free. It's my mission to make as many online paid tools free.",
  },
  {
    q: "What do I get with an account?",
    a: "Access to the AI Resume Analyzer, Resume Builder, downloadable career guides, and your personal dashboard.",
  },
  {
    q: "I already subscribed to the newsletter. Is this different?",
    a: "Your newsletter subscription delivers content to your inbox. An account gives you access to the interactive tools and your personal dashboard.",
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
  if (score <= 1) return { level: 1, label: "Weak", color: "bg-destructive" };
  if (score <= 3) return { level: 2, label: "Fair", color: "bg-gold" };
  return { level: 3, label: "Strong", color: "bg-executive-green" };
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Join() {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Capture UTM params for signup metadata
  const utmSource = searchParams.get("utm_source") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmMedium = searchParams.get("utm_medium") || "";

  useEffect(() => {
    if (isLoggedIn) {
      const fromPath: string = location.state?.from || "";
      const isZh = fromPath.startsWith("/zh-tw") || fromPath.startsWith("/zh");
      const defaultDash = isZh ? "/zh-tw/dashboard" : "/dashboard";
      const homePaths = ["/", "/zh-tw", "/zh-tw/"];
      let redirectTo = fromPath || defaultDash;
      if (!fromPath || homePaths.includes(redirectTo)) redirectTo = defaultDash;
      navigate(redirectTo, { replace: true });
    }
  }, [isLoggedIn, navigate, location.state]);

  // Auto-focus password field when email is pre-filled
  useEffect(() => {
    if (prefilledEmail && passwordRef.current) {
      setTimeout(() => passwordRef.current?.focus(), 400);
    }
  }, [prefilledEmail]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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
        title="Join Free — Unlock Your Career Toolkit | James Bugden"
        description="Create your free account to access the Resume Builder, AI Resume Analyzer, and all career guides."
        path="/join"
      />

      {/* Minimal header */}
      <header className="py-6 px-4 flex items-center justify-between max-w-[440px] mx-auto w-full">
        <Link to="/" className="font-heading text-sm tracking-[0.25em] text-foreground hover:text-gold transition-colors">
          JAMES BUGDEN
        </Link>
        <LanguageToggle variant="nav" />
      </header>

      {/* Main content — centered card */}
      <main className="flex flex-col items-center px-4 pb-16">
        <div className="w-full max-w-[440px]">

          {/* Headline */}
          <motion.div
            className="text-center mb-8"
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
          >
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Unlock Your Free Career Toolkit
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Create your free account to access the Resume Builder, AI Resume Analyzer, and all career guides.
            </p>
          </motion.div>

          {/* Signup card */}
          <motion.div
            className="bg-card border border-border rounded-xl shadow-lg p-8 mb-6"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
          >
            {success ? (
              <div className="text-center py-4">
                <Mail className="w-10 h-10 text-gold mx-auto mb-4" />
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">Check your email</h2>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification link to your email. Click the link to activate your account.
                </p>
                <Link to="/login" className="text-sm text-foreground font-medium hover:underline mt-4 inline-block">
                  ← Sign In
                </Link>
              </div>
            ) : (
              <>
                {/* Google OAuth */}
                <Button variant="outline" className="w-full h-11 mb-4 gap-2" onClick={handleGoogle}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Email + Password form */}
                <form onSubmit={handleSignup} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
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
                        placeholder="Password (min. 6 characters)"
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
                    {/* Password strength indicator */}
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
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create My Free Account"}
                  </Button>
                </form>

                {/* No credit card micro-copy */}
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  No credit card required
                </p>

                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-foreground font-medium hover:underline">
                    Log in
                  </Link>
                </p>
              </>
            )}
          </motion.div>

          {/* Unlock badges */}
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

          {/* Trust strip */}
          <motion.div
            className="text-center mb-8"
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Join 3,459+ professionals from companies like
            </p>
            <LogoScroll />
          </motion.div>

          {/* FAQ — first item pre-expanded */}
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
