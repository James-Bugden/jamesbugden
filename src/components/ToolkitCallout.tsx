import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";

interface ToolkitCalloutProps {
  to: string;
  label: string;
  toolName: string;
}

const ToolkitCallout = ({ to, label, toolName }: ToolkitCalloutProps) => (
  <Link
    to={to}
    className="group mt-8 flex items-center gap-3 rounded-xl border-l-4 border-gold bg-gold/5 hover:bg-gold/10 px-5 py-4 transition-colors"
  >
    <Wrench className="w-5 h-5 text-gold flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{toolName}</p>
    </div>
    <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform flex-shrink-0" />
  </Link>
);

export default ToolkitCallout;
