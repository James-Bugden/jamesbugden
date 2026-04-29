import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Eye, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useShareLinks } from "@/hooks/useShareLinks";
import { AnalysisResult } from "@/components/resume-analyzer/types";
import { toast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/trackEvent";

interface PublicAnalysisData {
  share_links: {
    id: string;
    share_id: string;
    views: number;
    last_viewed_at: string | null;
    created_at: string;
    analysis: {
      id: string;
      overall_score: number | null;
      analysis_result: AnalysisResult | null;
      created_at: string;
      language: string | null;
    };
  };
}

const PublicScoreCardView = () => {
  const { id: shareId } = useParams<{ id: string }>();
  const { getPublicShareLink } = useShareLinks();
  const [data, setData] = useState<PublicAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shareId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPublicShareLink(shareId);
        setData(result as PublicAnalysisData);
      } catch (err) {
        console.error("Error fetching public score card:", err);
        setError("This analysis is no longer available or the link is invalid.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shareId, getPublicShareLink]);

  const handleCopyLink = async () => {
    if (!shareId) return;
    
    const url = `${window.location.origin}/r/${shareId}`;
    await navigator.clipboard.writeText(url);
    
    toast({
      title: "Link copied!",
      description: "Share this link with others",
    });
    
    // Track the share link copy event from public page
    trackEvent("share_link", "share_link_copied_public", {
      share_id: shareId,
    });
  };

  const handleShare = async () => {
    if (!shareId || !data) return;

    const url = `${window.location.origin}/r/${shareId}`;
    const score = data.share_links.analysis.overall_score;
    const text = `Resume score: ${score}/100 - View my analysis: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume Analysis Score",
          text,
          url,
        });
        // Track successful Web Share API usage
        trackEvent("share_link", "share_link_web_shared", {
          share_id: shareId,
          method: "web_share_api",
        });
      } catch (err) {
        // User cancelled share
        console.log("Share cancelled:", err);
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Score message copied!",
        description: "Paste it anywhere to share",
      });
      // Track fallback copy action
      trackEvent("share_link", "share_link_copied_fallback", {
        share_id: shareId,
        method: "clipboard_fallback",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4 py-8">
                <AlertTriangle className="w-12 h-12 text-destructive" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Analysis Not Found</h2>
                  <p className="text-muted-foreground">
                    {error || "This analysis is no longer available or the link is invalid."}
                  </p>
                </div>
                <Button asChild>
                  <Link to="/resume-analyzer">Try Free Analysis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { share_links: shareLink } = data;
  const analysis = shareLink.analysis;
  const analysisResult = analysis.analysis_result as AnalysisResult | null;
  const overallScore = analysis.overall_score || 0;

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-executive-green";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  // Get grade
  const getGrade = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4" />
              jamesbugden.com
            </Link>
            <h1 className="text-3xl font-bold">Resume Analysis Score</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(analysis.created_at)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {shareLink.views} views
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button size="sm" onClick={handleShare}>
              Share Score
            </Button>
          </div>
        </div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-8 border-muted flex items-center justify-center">
<div className="text-center">
                       <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>
                         {getGrade(overallScore)}
                       </div>
                       <div className={`text-3xl font-bold mt-2 ${getScoreColor(overallScore)}`}>
                         {overallScore}
                         <span className="text-lg text-muted-foreground">/100</span>
                       </div>
                       {/* Seniority Level */}
                       {analysisResult?.segmentation?.seniority_level && (
                         <div className="mt-3">
                           <Badge variant="outline" className="text-sm font-normal">
                             {analysisResult.segmentation.seniority_level}
                           </Badge>
                         </div>
                       )}
                     </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-current"
                    style={{ 
                      borderTopColor: `hsl(var(--${overallScore >= 80 ? 'executive-green' : overallScore >= 60 ? 'warning' : 'destructive'}))`,
                      transform: 'rotate(45deg)',
                      clipPath: 'inset(0 0 50% 0)'
                    }}
                  />
                </div>

                {/* Score Details */}
<div className="flex-1">
                   <h2 className="text-2xl font-bold mb-4">Overall Resume Score</h2>
                   <p className="text-sm text-muted-foreground mb-2">Analyzed by jamesbugden.com</p>
                   
                   {analysisResult && analysisResult.overall_verdict && (
                     <p className="text-lg mb-6">{analysisResult.overall_verdict}</p>
                   )}

                  {analysisResult && analysisResult.sections && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {analysisResult.sections.map((section) => (
                        <div key={section.name} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-medium capitalize">
                              {section.name.replace('_', ' ')}
                            </span>
                            <Badge variant={section.score >= 7 ? "default" : "secondary"}>
                              {section.score}/10
                            </Badge>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${section.score >= 7 ? 'bg-executive-green' : section.score >= 5 ? 'bg-warning' : 'bg-destructive'}`}
                              style={{ width: `${section.score * 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        {analysisResult && analysisResult.top_priorities && analysisResult.top_priorities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Key Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.top_priorities.slice(0, 3).map((priority, index) => (
                    <div key={index} className="flex gap-3 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${priority.level === 'critical' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'}`}>
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{priority.title}</h3>
                        <p className="text-sm text-muted-foreground">{priority.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Get Your Own Free Analysis</h3>
                  <p className="text-muted-foreground">
                    Upload your resume and get personalized feedback in 30 seconds
                  </p>
                </div>
                <Button size="lg" asChild className="bg-gold hover:bg-gold/90 text-white">
                  <Link to="/resume-analyzer">Try Free Analysis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <Link to="/" className="text-foreground hover:underline font-medium">
              jamesbugden.com
            </Link>
            {" • "}
            <Link to="/privacy" className="text-foreground hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p className="mt-1">
            This public score card shows anonymized analysis results. No personal information is displayed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicScoreCardView;