import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import bcrypt from "bcryptjs";

// Validate that URL is an internal path only (prevents open redirect attacks)
const isInternalUrl = (url: string): boolean => {
  return url.startsWith('/') && 
         !url.startsWith('//') && 
         !url.match(/^(javascript|data|vbscript):/i);
};

const ClientReviewGate = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!clientId) {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    // Add minimum response time to prevent timing attacks
    const minResponseTime = 500;
    const startTime = Date.now();

    // Use secure RPC function to get review data (no direct table access)
    const { data, error: fetchError } = await supabase
      .rpc('get_review_for_verification', {
        review_id: clientId
      });

    // Use bcrypt.compare for secure password verification
    let passwordMatches = false;
    let reviewUrl = '';
    
    if (data && data.length > 0 && data[0].password_hash) {
      passwordMatches = await bcrypt.compare(password, data[0].password_hash);
      reviewUrl = data[0].review_url || '';
    }
    
    // Ensure minimum response time regardless of result
    const elapsed = Date.now() - startTime;
    if (elapsed < minResponseTime) {
      await new Promise(resolve => setTimeout(resolve, minResponseTime - elapsed));
    }

    // Same error message whether review doesn't exist or password is wrong
    if (fetchError || !data || data.length === 0 || !passwordMatches) {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    // Validate review URL is internal only (defense in depth)
    if (!isInternalUrl(reviewUrl)) {
      setError("Invalid review configuration. Please contact support.");
      setSubmitting(false);
      return;
    }

    // Update last_viewed_at using secure RPC function
    await supabase.rpc('mark_review_viewed', {
      review_id: clientId
    });

    // Redirect to the actual review page
    navigate(reviewUrl);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-executive-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-executive-green" />
            </div>
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Resume Review Access
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your password to access your personalized review
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your password"
                required
                className={error ? "border-destructive" : ""}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-executive-green hover:bg-executive-green/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "View Review"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:james@james.careers"
            className="text-executive-green hover:underline"
          >
            Contact James
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClientReviewGate;
