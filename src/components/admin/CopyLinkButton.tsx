import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyLinkButtonProps {
  /** Optional override params to set/delete on the current URL before copying. */
  paramsOverride?: Record<string, string | null>;
  className?: string;
  label?: string;
  copiedLabel?: string;
}

/**
 * Copies the current /admin URL (with query params) to the clipboard,
 * stripping internal Lovable preview tokens. Used across admin tabs so any
 * filtered view can be shared.
 */
export default function CopyLinkButton({
  paramsOverride,
  className,
  label = "Copy link",
  copiedLabel = "Copied",
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("__lovable_token");
      if (paramsOverride) {
        for (const [k, v] of Object.entries(paramsOverride)) {
          if (v === null) url.searchParams.delete(k);
          else url.searchParams.set(k, v);
        }
      }
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.warn("[CopyLinkButton] clipboard write failed:", e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors",
        className
      )}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
