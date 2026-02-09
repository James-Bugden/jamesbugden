import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CalculatorSectionProps {
  title: string;
  description: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CalculatorSection({
  title,
  description,
  defaultOpen = false,
  children,
}: CalculatorSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 md:px-6 py-4 hover:bg-muted/50 transition-colors text-left"
        aria-expanded={open}
      >
        <div>
          <h3 className="font-semibold text-foreground text-base">{title}</h3>
          <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-6 pt-2 space-y-5 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}
