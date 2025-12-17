import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock } from "lucide-react";

const ClientReviewGate = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [clientName, setClientName] = useState<string | null>(null);
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchClientData();
  }, [clientId]);

  const fetchClientData = async () => {
    if (!clientId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("client_reviews")
      .select("client_name, review_url")
      .eq("id", clientId)
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
    } else {
      setClientName(data.client_name);
      setReviewUrl(data.review_url);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Verify password
    const { data, error: fetchError } = await supabase
      .from("client_reviews")
      .select("password, review_url")
      .eq("id", clientId)
      .maybeSingle();

    if (fetchError || !data) {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    if (data.password !== password) {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    // Update last_viewed_at
    await supabase
      .from("client_reviews")
      .update({ last_viewed_at: new Date().toISOString() })
      .eq("id", clientId);

    // Redirect to the actual review page
    navigate(data.review_url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-executive-green" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Review Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            This review link may be invalid or expired.
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-executive-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-executive-green" />
            </div>
            <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Resume Review for {clientName}
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
