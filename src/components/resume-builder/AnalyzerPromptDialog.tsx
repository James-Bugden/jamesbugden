import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileSearch, ArrowRight } from "lucide-react";

const STORAGE_KEY = "resume_analyzer_prompt_dismissed";

interface AnalyzerPromptDialogProps {
  fromAnalyzer: boolean;
}

export function AnalyzerPromptDialog({ fromAnalyzer }: AnalyzerPromptDialogProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Skip if user came from the analyzer
    if (fromAnalyzer) return;
    // Skip if already dismissed
    if (localStorage.getItem(STORAGE_KEY)) return;
    // Skip if user has already used the analyzer before
    if (localStorage.getItem("resume_analysis_result")) return;
    // Skip if user already has documents (editing existing, not starting fresh)
    try {
      const docs = localStorage.getItem("james_careers_documents");
      if (docs) {
        const parsed = JSON.parse(docs);
        if (Array.isArray(parsed) && parsed.length > 0) return;
      }
    } catch {}
    // Small delay so the builder loads first
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, [fromAnalyzer]);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const handleAnalyze = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
    navigate("/resume-analyzer");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <FileSearch className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-lg">
            Want to know how your resume stacks up?
          </DialogTitle>
          <DialogDescription className="text-center">
            Our free Resume Analyzer scores your resume against recruiter standards and gives you actionable suggestions to improve it, before you start editing.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-2">
          <Button onClick={handleAnalyze} className="gap-2">
            Analyze My Resume <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" onClick={handleDismiss} className="text-muted-foreground">
            Skip, I'll build from scratch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
