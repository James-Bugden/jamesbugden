import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import PageSEO from "@/components/PageSEO";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setHasToken(true);
    }

    // Listen for PASSWORD_RECOVERY event
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
      setError("Password must be at least 6 characters");
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
        <PageSEO title="Reset Password | James Bugden" description="Set a new password" path="/reset-password" />
        <div className="w-full max-w-[400px] bg-card border border-border rounded-xl shadow-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">Invalid or expired reset link.</p>
          <Link to="/login" className="text-sm text-foreground font-medium hover:underline mt-4 inline-block">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <PageSEO title="Reset Password | James Bugden" description="Set a new password" path="/reset-password" />
      <div className="w-full max-w-[400px]">
        <div className="mb-6">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-foreground mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">Password Updated</h2>
              <p className="text-sm text-muted-foreground">Redirecting you now…</p>
            </div>
          ) : (
            <>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Set New Password</h1>
              <p className="text-sm text-muted-foreground mb-6">Enter your new password below.</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password (min. 6 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                  {loading ? "..." : "Update Password"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
