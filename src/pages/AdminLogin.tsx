import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const checkAdminAndRedirect = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: user.id });
      if (isAdmin) {
        navigate("/admin");
        return true;
      } else {
        toast({ title: "Access denied", description: "You are not an admin.", variant: "destructive" });
        await supabase.auth.signOut();
      }
    }
    return false;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        await checkAdminAndRedirect();
      }
    } catch {
      toast({ title: "Login failed", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setResetSent(true);
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      sessionStorage.setItem("auth_redirect", "/admin");
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
        setGoogleLoading(false);
      }
    } catch {
      setGoogleLoading(false);
    }
  };

  // Handle redirect back from OAuth — if already logged in, check admin and go
  useEffect(() => {
    const handleOAuthReturn = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const redirected = await checkAdminAndRedirect();
        if (!redirected) setGoogleLoading(false);
      }
    };
    // Only run if we have an auth_redirect pending (just came back from OAuth)
    if (sessionStorage.getItem("auth_redirect") === "/admin") {
      handleOAuthReturn();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              {mode === "login" ? "Admin Login" : "Reset Password"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login"
                ? "Sign in with your admin credentials"
                : "Enter your email to receive a password reset link"}
            </p>
          </div>

          {mode === "login" ? (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 text-base">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <button
                onClick={() => { setMode("forgot"); setResetSent(false); }}
                className="text-xs text-muted-foreground hover:text-foreground mt-3 block"
              >
                Forgot password?
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                variant="outline"
                className="w-full h-12 text-base"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {resetSent ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-10 h-10 text-foreground mx-auto mb-4" />
                  <p className="text-sm text-foreground font-medium mb-1">Reset link sent!</p>
                  <p className="text-sm text-muted-foreground">Check your email for a password reset link.</p>
                  <button
                    onClick={() => { setMode("login"); setResetSent(false); }}
                    className="text-sm text-muted-foreground hover:text-foreground mt-4 inline-block"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-12 text-base">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => { setMode("login"); }}
                    className="text-xs text-muted-foreground hover:text-foreground block"
                  >
                    ← Back to Sign In
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
