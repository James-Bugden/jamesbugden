import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Lock, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailGateOverlayProps {
  children: React.ReactNode;
  isUnlocked: boolean;
  onUnlock: (email: string) => void;
  headline?: string;
  subtext?: string;
  buttonText?: string;
  footerText?: string;
  errorText?: string;
  signInText?: string;
  createAccountText?: string;
  orEmailText?: string;
}

export function EmailGateOverlay({
  children,
  isUnlocked,
  onUnlock,
  headline = "Unlock Full Breakdown",
  subtext = "Enter your email to see your detailed compensation analysis, 4-year projection, and scenario comparison.",
  buttonText = "Unlock Full Analysis",
  footerText = "Plus weekly negotiation tips. Unsubscribe anytime.",
  errorText = "Please enter a valid email address.",
  signInText = "Sign in",
  createAccountText = "Create free account",
  orEmailText = "or continue with email only",
}: EmailGateOverlayProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const location = useLocation();

  if (isUnlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(errorText);
      return;
    }
    setError("");
    onUnlock(trimmed);
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Blurred content with gradient fade */}
      <div className="pointer-events-none select-none relative" aria-hidden>
        <div style={{ filter: "blur(6px)", maxHeight: "300px", overflow: "hidden" }}>
          {children}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Gate card */}
      <div className="bg-card border border-border rounded-xl shadow-lg p-8 max-w-[400px] w-full mx-auto text-center -mt-8 relative z-10">
        <div className="mx-auto w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
          <Lock className="w-5 h-5 text-gold" />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">{headline}</h3>
        <p className="text-sm text-muted-foreground mb-5">{subtext}</p>

        {/* Auth buttons */}
        <div className="space-y-2 mb-3">
          <Button asChild variant="default" className="w-full h-11 font-semibold gap-2">
            <Link to="/login" state={{ from: location.pathname }}>
              <LogIn className="w-4 h-4" />
              {signInText}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-11 gap-2">
            <Link to="/signup" state={{ from: location.pathname }}>
              <UserPlus className="w-4 h-4" />
              {createAccountText}
            </Link>
          </Button>
        </div>

        {/* Email fallback */}
        {!showEmail ? (
          <button
            onClick={() => setShowEmail(true)}
            className="text-xs text-muted-foreground hover:text-foreground underline mt-2"
          >
            {orEmailText}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 mt-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@email.com"
              className="h-11"
            />
            {error && <p className="text-xs text-destructive text-left">{error}</p>}
            <Button type="submit" className="w-full h-11 font-semibold">
              {buttonText}
            </Button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-3">
          {footerText}
        </p>
      </div>
    </div>
  );
}
