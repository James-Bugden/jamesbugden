import { useState, useCallback } from "react";
import { Sparkles, Target, AlignLeft, Wrench, Zap, Loader2 } from "lucide-react";
import { ResumeData } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AiToolsPanelProps {
  data: ResumeData;
  onUpdateData: (data: ResumeData) => void;
}

async function callResumeAi(action: string, text: string, context?: string) {
  const { data, error } = await supabase.functions.invoke("resume-ai", {
    body: { action, text, context },
  });
  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) throw new Error(data.error);
  return data?.result || "";
}

function extractResumeText(data: ResumeData): string {
  const parts: string[] = [];
  const pd = data.personalDetails;
  if (pd.fullName) parts.push(`Name: ${pd.fullName}`);
  if (pd.professionalTitle) parts.push(`Title: ${pd.professionalTitle}`);

  data.sections.forEach((s) => {
    parts.push(`\n## ${s.title}`);
    s.entries.forEach((e) => {
      const vals = Object.entries(e.fields)
        .filter(([, v]) => v && v.trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      if (vals) parts.push(vals);
    });
  });
  return parts.join("\n");
}

type ToolId = "tailor" | "summary" | "skills" | "optimize";

interface ToolCard {
  id: ToolId;
  title: string;
  description: string;
  icon: React.ElementType;
  needsInput: boolean;
  inputPlaceholder?: string;
}

const TOOLS: ToolCard[] = [
  {
    id: "tailor",
    title: "Tailor to Job Description",
    description: "Paste a job description to get keyword gap analysis and suggestions to improve your match rate.",
    icon: Target,
    needsInput: true,
    inputPlaceholder: "Paste the full job description here...",
  },
  {
    id: "summary",
    title: "Generate Summary",
    description: "Auto-generate a professional summary based on your experience sections.",
    icon: AlignLeft,
    needsInput: false,
  },
  {
    id: "skills",
    title: "Suggest Skills",
    description: "Get skill suggestions based on your experience and industry.",
    icon: Wrench,
    needsInput: false,
  },
  {
    id: "optimize",
    title: "Optimize All Bullets",
    description: "Batch-improve all bullet points across your experience sections with stronger action verbs.",
    icon: Zap,
    needsInput: false,
  },
];

export function AiToolsPanel({ data, onUpdateData }: AiToolsPanelProps) {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const resumeText = extractResumeText(data);

  const handleRun = useCallback(async (toolId: ToolId) => {
    setLoading(true);
    setResult(null);
    try {
      let res = "";
      switch (toolId) {
        case "tailor":
          res = await callResumeAi("tailor", resumeText, input);
          break;
        case "summary":
          res = await callResumeAi("summary", resumeText);
          break;
        case "skills":
          res = await callResumeAi("skills", resumeText);
          break;
        case "optimize":
          res = await callResumeAi("optimize", resumeText);
          break;
      }
      setResult(res);
      toast({ title: "AI analysis complete" });
    } catch (e: any) {
      toast({ title: "AI Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [resumeText, input]);

  const handleApplySummary = useCallback(() => {
    if (!result) return;
    const summarySection = data.sections.find((s) => s.type === "summary");
    if (summarySection) {
      const updated = data.sections.map((s) =>
        s.id === summarySection.id
          ? { ...s, entries: s.entries.map((e, i) => i === 0 ? { ...e, fields: { ...e.fields, description: result } } : e) }
          : s
      );
      onUpdateData({ ...data, sections: updated });
      toast({ title: "Summary applied to your resume" });
    } else {
      toast({ title: "No summary section", description: "Add a Summary section first, then apply.", variant: "destructive" });
    }
  }, [result, data, onUpdateData]);

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-800">AI Tools</h2>
      </div>

      {!activeTool ? (
        <div className="grid gap-3">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setResult(null); setInput(""); }}
              className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <tool.icon className="w-4.5 h-4.5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{tool.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => { setActiveTool(null); setResult(null); }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to tools
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-800">
              {TOOLS.find((t) => t.id === activeTool)?.title}
            </h3>
          </div>

          {TOOLS.find((t) => t.id === activeTool)?.needsInput && (
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={TOOLS.find((t) => t.id === activeTool)?.inputPlaceholder}
              className="min-h-[120px] text-sm"
            />
          )}

          <Button
            onClick={() => handleRun(activeTool)}
            disabled={loading || (activeTool === "tailor" && !input.trim())}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:opacity-90 text-white"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Analyzing..." : "Run"}
          </Button>

          {result && (
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 space-y-3">
              <div
                className="text-sm text-gray-700 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: result }}
              />
              {activeTool === "summary" && (
                <Button size="sm" variant="outline" onClick={handleApplySummary}>
                  Apply to Summary Section
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
