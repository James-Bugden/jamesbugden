import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, Sparkles, FileText, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResumeData } from "./types";

export interface Suggestion {
  id: string;
  type: "summary" | "bullet";
  original: string;
  improved: string;
  explanation: string;
}

interface Props {
  suggestions: Suggestion[];
  onApply: (suggestion: Suggestion) => void;
  onDismiss: (id: string) => void;
}

export function AnalyzerSuggestionsPanel({ suggestions, onApply, onDismiss }: Props) {
  const [expanded, setExpanded] = useState(true);

  if (suggestions.length === 0) return null;

  // Collapsed badge
  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="absolute bottom-4 right-4 z-30 flex items-center gap-2 px-3 py-2 rounded-full shadow-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#2b4734",
          color: "#fff",
        }}
      >
        <Sparkles className="w-4 h-4" />
        {suggestions.length} suggestion{suggestions.length !== 1 ? "s" : ""}
        <ChevronUp className="w-3.5 h-3.5 opacity-70" />
      </button>
    );
  }

  return (
    <div
      className="absolute bottom-4 right-4 z-30 w-[340px] max-h-[60vh] flex flex-col rounded-xl shadow-2xl border overflow-hidden"
      style={{
        backgroundColor: "#FDFBF7",
        borderColor: "#e5e7eb",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(false)}
        className="flex items-center justify-between px-4 py-3 border-b w-full text-left"
        style={{ borderColor: "#e5e7eb", backgroundColor: "#2b4734" }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-sm font-semibold text-white">
            Analyzer Suggestions
          </span>
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            {suggestions.length}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-white/70" />
      </button>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {suggestions.map((s, i) => (
          <SuggestionCard
            key={s.id}
            suggestion={s}
            index={i + 1}
            onApply={() => onApply(s)}
            onDismiss={() => onDismiss(s.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SuggestionCard({
  suggestion,
  index,
  onApply,
  onDismiss,
}: {
  suggestion: Suggestion;
  index: number;
  onApply: () => void;
  onDismiss: () => void;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const icon = suggestion.type === "summary" ? FileText : RotateCcw;
  const Icon = icon;
  const label = suggestion.type === "summary" ? "Summary Rewrite" : "Bullet Improvement";

  return (
    <div
      className="rounded-lg border p-3 space-y-2 text-sm"
      style={{ borderColor: "#e5e7eb", backgroundColor: "#fff" }}
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#D4930D" }} />
        <span className="font-medium" style={{ color: "#1A1A1A" }}>
          {label}
        </span>
        <span
          className="ml-auto text-xs px-1.5 py-0.5 rounded font-medium"
          style={{ backgroundColor: "#e8f0eb", color: "#2b4734" }}
        >
          #{index}
        </span>
      </div>

      {/* Toggle original/improved */}
      <button
        onClick={() => setShowOriginal(!showOriginal)}
        className="text-xs underline underline-offset-2 transition-colors"
        style={{ color: "#6B6B6B" }}
      >
        {showOriginal ? "Show improved" : "Show original"}
      </button>

      {/* Text */}
      <div
        className={cn(
          "text-xs leading-relaxed rounded-md p-2 max-h-[120px] overflow-y-auto",
          showOriginal ? "bg-red-50 line-through opacity-70" : "bg-emerald-50"
        )}
        style={{ color: "#1A1A1A" }}
      >
        {showOriginal ? suggestion.original : suggestion.improved}
      </div>

      {/* Explanation */}
      {suggestion.explanation && (
        <p className="text-xs italic" style={{ color: "#6B6B6B" }}>
          {suggestion.explanation}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onApply}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-colors hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#2b4734" }}
        >
          <Check className="w-3 h-3" />
          Apply
        </button>
        <button
          onClick={onDismiss}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:bg-gray-100 active:scale-95"
          style={{ color: "#6B6B6B", border: "1px solid #e5e7eb" }}
        >
          <X className="w-3 h-3" />
          Dismiss
        </button>
      </div>
    </div>
  );
}

/** Extract suggestions from an analysis result object */
export function extractSuggestions(analysisResult: any): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (analysisResult?.summary_rewrite?.original && analysisResult.summary_rewrite.improved) {
    suggestions.push({
      id: "summary-rewrite",
      type: "summary",
      original: analysisResult.summary_rewrite.original,
      improved: analysisResult.summary_rewrite.improved,
      explanation: analysisResult.summary_rewrite.explanation || "",
    });
  }

  if (analysisResult?.bullet_rewrites?.length) {
    analysisResult.bullet_rewrites.forEach((br: any, i: number) => {
      if (br.original && br.improved) {
        suggestions.push({
          id: `bullet-${i}`,
          type: "bullet",
          original: br.original,
          improved: br.improved,
          explanation: br.explanation || "",
        });
      }
    });
  }

  // Fallback to single bullet_rewrite
  if (suggestions.filter(s => s.type === "bullet").length === 0 && analysisResult?.bullet_rewrite?.original && analysisResult.bullet_rewrite.improved) {
    suggestions.push({
      id: "bullet-0",
      type: "bullet",
      original: analysisResult.bullet_rewrite.original,
      improved: analysisResult.bullet_rewrite.improved,
      explanation: analysisResult.bullet_rewrite.changes?.join("; ") || "",
    });
  }

  return suggestions;
}

/** Apply a suggestion by finding and replacing the original text in resume data */
export function applySuggestionToData(data: ResumeData, suggestion: Suggestion): ResumeData {
  const originalClean = suggestion.original.trim().toLowerCase();

  return {
    ...data,
    sections: data.sections.map(section => ({
      ...section,
      entries: section.entries.map(entry => {
        const newFields = { ...entry.fields };
        for (const key of Object.keys(newFields)) {
          const val = newFields[key];
          if (typeof val === "string" && val.toLowerCase().includes(originalClean)) {
            // Replace the matched portion with the improved text
            // Use case-insensitive replace
            const regex = new RegExp(escapeRegex(suggestion.original.trim()), "gi");
            newFields[key] = val.replace(regex, suggestion.improved);
          }
        }
        return { ...entry, fields: newFields };
      }),
    })),
  };
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
