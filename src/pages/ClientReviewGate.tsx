import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Add minimum response time to prevent timing attacks
    const minResponseTime = 500;
    const startTime = Date.now();

    // Fetch all reviews to check password against each
    const { data: reviews, error: fetchError } = await supabase
      .from('client_reviews')
      .select('id, password, review_url');

    if (fetchError || !reviews || reviews.length === 0) {
      // Ensure minimum response time
      const elapsed = Date.now() - startTime;
      if (elapsed < minResponseTime) {
        await new Promise(resolve => setTimeout(resolve, minResponseTime - elapsed));
      }
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    // Check password against each review
    let matchedReview: { id: string; review_url: string } | null = null;
    
    for (const review of reviews) {
      if (review.password) {
        const matches = await bcrypt.compare(password, review.password);
        if (matches) {
          matchedReview = { id: review.id, review_url: review.review_url || '' };
          break;
        }
      }
    }

    // Ensure minimum response time regardless of result
    const elapsed = Date.now() - startTime;
    if (elapsed < minResponseTime) {
      await new Promise(resolve => setTimeout(resolve, minResponseTime - elapsed));
    }

    if (!matchedReview) {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    // Validate review URL is internal only (defense in depth)
    if (!isInternalUrl(matchedReview.review_url)) {
      setError("Invalid review configuration. Please contact support.");
      setSubmitting(false);
      return;
    }

    // Update last_viewed_at using secure RPC function
    await supabase.rpc('mark_review_viewed', {
      review_id: matchedReview.id
    });

    // Redirect to the actual review page
    navigate(matchedReview.review_url);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-2xl shadow-lg p-10 md:p-12">
          <div className="text-center mb-8">
            <Lock className="h-8 w-8 mx-auto mb-6 text-foreground" strokeWidth={1.5} />
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
              Resume Review Access
            </h1>
            <p className="text-muted-foreground">
              Enter your password to access your personalized review
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
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
                className={`h-14 text-base px-4 bg-muted/50 border-border ${error ? "border-destructive" : ""}`}
              />
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
                  Verifying...
                </span>
              ) : (
                "View My Review"
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:james@james.careers"
            className="text-foreground hover:underline font-medium"
          >
            Contact James
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClientReviewGate;
