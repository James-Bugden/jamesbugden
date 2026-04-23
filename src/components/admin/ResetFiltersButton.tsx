import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResetFiltersButtonProps {
  /** Which URL params should be considered "filters" for this view. */
  filterKeys: readonly string[];
  className?: string;
  label?: string;
}

/**
 * Clears the given filter params from the current URL when any of them are set.
 * Renders nothing when no filters are active so the toolbar stays clean.
 */
export default function ResetFiltersButton({
  filterKeys,
  className,
  label = "Reset filters",
}: ResetFiltersButtonProps) {
  const sp = new URLSearchParams(window.location.search);
  const hasActive = filterKeys.some(k => {
    const v = sp.get(k);
    return v !== null && v !== "" && v !== "all";
  });

  if (!hasActive) return null;

  const handleReset = () => {
    const url = new URL(window.location.href);
    filterKeys.forEach(k => url.searchParams.delete(k));
    window.history.replaceState({}, "", url.toString());
    // Trigger a popstate so react-router's useSearchParams picks up the change.
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 h-10 text-xs font-medium rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors whitespace-nowrap",
        className
      )}
    >
      <X className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
