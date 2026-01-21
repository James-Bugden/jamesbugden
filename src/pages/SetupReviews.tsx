import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const reviews = [
  { id: "charlene-lee", name: "Charlene Lee", password: "charlene2025", url: "/zh-tw/reviews/charlene-lee" },
  { id: "chien-jung-liu", name: "Chien Jung Liu", password: "chienjung2025", url: "/zh-tw/reviews/chien-jung-liu" },
  { id: "james-bugden", name: "James Bugden", password: "james2025", url: "/zh-tw/reviews/james-bugden" },
];

const SetupReviews = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSetup = async () => {
    setLoading(true);
    const newResults: string[] = [];

    for (const review of reviews) {
      const hashedPassword = await bcrypt.hash(review.password, 10);
      
      const { error } = await supabase.from("client_reviews").upsert({
        id: review.id,
        client_name: review.name,
        password: hashedPassword,
        review_url: review.url,
      }, { onConflict: 'id' });

      if (error) {
        newResults.push(`❌ ${review.name}: ${error.message}`);
      } else {
        newResults.push(`✅ ${review.name}: Added with password "${review.password}"`);
      }
    }

    setResults(newResults);
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8">
        <h1 className="font-heading text-2xl text-center mb-6">Setup Client Reviews</h1>
        
        {!done ? (
          <>
            <p className="text-muted-foreground text-center mb-6">
              This will create 3 client review entries with properly hashed passwords.
            </p>
            <Button 
              onClick={handleSetup} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                "Create Review Entries"
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-executive-green" />
            </div>
            <div className="space-y-2 mb-6">
              {results.map((result, i) => (
                <p key={i} className="text-sm">{result}</p>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              You can now delete this page. Test at /review/charlene-lee
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SetupReviews;
