import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSafeErrorMessage } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Copy, Trash2, LogOut, Check } from "lucide-react";
import { format } from "date-fns";
import bcrypt from "bcryptjs";

interface ClientReview {
  id: string;
  client_name: string;
  password: string;
  review_url: string;
  created_at: string;
  last_viewed_at: string | null;
}

// Validate that URL is an internal path only (prevents open redirect attacks)
const validateReviewUrl = (url: string): boolean => {
  // Must start with / for internal paths
  if (!url.startsWith('/')) {
    return false;
  }
  // Prevent protocol-relative URLs
  if (url.startsWith('//')) {
    return false;
  }
  // Prevent protocol handlers (XSS vectors)
  if (url.match(/^(javascript|data|vbscript):/i)) {
    return false;
  }
  return true;
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Form state
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [password, setPassword] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("client_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching reviews",
        description: getSafeErrorMessage(error),
        variant: "destructive",
      });
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const generateClientId = (name: string) => {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "short" }).toLowerCase();
    const year = now.getFullYear();
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return `${slug}-${month}${year}`;
  };

  const handleNameChange = (name: string) => {
    setClientName(name);
    if (name.trim()) {
      setClientId(generateClientId(name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate review URL is internal only
    if (!validateReviewUrl(reviewUrl)) {
      toast({
        title: "Invalid review URL",
        description: "Review URL must be an internal path starting with /",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // Hash password before storing (security best practice)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { error } = await supabase.from("client_reviews").insert({
      id: clientId,
      client_name: clientName,
      password: hashedPassword,
      review_url: reviewUrl,
    });

    setSubmitting(false);

    if (error) {
      toast({
        title: "Error creating review",
        description: getSafeErrorMessage(error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Review created",
        description: "Client review link has been generated.",
      });
      setIsDialogOpen(false);
      setClientId("");
      setClientName("");
      setPassword("");
      setReviewUrl("");
      fetchReviews();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("client_reviews")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error deleting review",
        description: getSafeErrorMessage(error),
        variant: "destructive",
      });
    } else {
      toast({
        title: "Review deleted",
        description: "Client review has been removed.",
      });
      fetchReviews();
    }
  };

  const copyToClipboard = async (id: string) => {
    const fullUrl = `${window.location.origin}/review/${id}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Link copied",
      description: "Client review link copied to clipboard.",
    });
  };

  const getFullUrl = (id: string) => {
    return `${window.location.origin}/review/${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-executive-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-executive-green text-cream py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-heading text-xl font-semibold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-cream hover:text-cream/80 hover:bg-cream/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              Client Reviews
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage password-protected review links for clients
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-executive-green hover:bg-executive-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Client Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Client Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={clientName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Sarah Wang"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID</Label>
                  <Input
                    id="clientId"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="sarah-wang-jan2025"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Auto-generated from name. Edit if needed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Client Password</Label>
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a simple password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewUrl">Review URL Path</Label>
                  <Input
                    id="reviewUrl"
                    value={reviewUrl}
                    onChange={(e) => setReviewUrl(e.target.value)}
                    placeholder="/reviews/sarah-wang"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be an internal path starting with /
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-executive-green hover:bg-executive-green/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Generate Link"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Client Link</TableHead>
                <TableHead>Last Viewed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No client reviews yet. Add your first one above.
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.client_name}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {getFullUrl(review.id)}
                      </code>
                    </TableCell>
                    <TableCell>
                      {review.last_viewed_at
                        ? format(new Date(review.last_viewed_at), "MMM d, yyyy 'at' h:mm a")
                        : <span className="text-muted-foreground">Not viewed yet</span>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(review.id)}
                        >
                          {copiedId === review.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Review?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the review link for {review.client_name}.
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(review.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminReviews;
