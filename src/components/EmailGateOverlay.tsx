import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailGateOverlayProps {
  children: React.ReactNode;
  isUnlocked: boolean;
  onUnlock: (email: string) => void;
  headline?: string;
  subtext?: string;
}

export function EmailGateOverlay({
  children,
  isUnlocked,
  onUnlock,
  headline = "Unlock Full Breakdown",
  subtext = "Enter your email to see your detailed compensation analysis, 4-year projection, and scenario comparison.",
}: EmailGateOverlayProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (isUnlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onUnlock(trimmed);
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Blurred content */}
      <div className="pointer-events-none select-none" style={{ filter: "blur(6px)" }} aria-hidden>
        {children}
      </div>

      {/* Overlay card */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm z-10">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 max-w-[400px] w-full mx-4 text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-2">{headline}</h3>
          <p className="text-sm text-muted-foreground mb-5">{subtext}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@email.com"
              className="h-11"
            />
            {error && <p className="text-xs text-destructive text-left">{error}</p>}
            <Button type="submit" className="w-full h-11 font-semibold">
              Unlock Full Analysis
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-3">
            Plus weekly negotiation tips. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
