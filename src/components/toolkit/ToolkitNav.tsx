import { Link } from "react-router-dom";

interface ToolkitNavProps {
  currentTemplate: string;
}

const templates = [
  { id: "T1", label: "📧1 Scripts", href: "/toolkit/scripts" },
  { id: "T2", label: "📧2 Offer Response", href: "/toolkit/offer-response" },
  { id: "T3", label: "📧3 Counter", href: "/toolkit/counteroffer" },
  { id: "T4", label: "📧3 Calculator", href: "/toolkit/calculator" },
  { id: "T5", label: "📧4 Pushback", href: "/toolkit/pushback" },
  { id: "T6", label: "📧5 Raise", href: "/toolkit/raise" },
  { id: "T7", label: "📧5 Log", href: "/toolkit/log" },
];

const ToolkitNav = ({ currentTemplate }: ToolkitNavProps) => {
  return (
    <div className="pb-8 px-5 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-center gap-2">
          {templates.map((template) => (
            <Link
              key={template.id}
              to={template.href}
              className={`px-3 py-2 rounded-lg text-xs md:text-sm transition-colors ${
                template.id === currentTemplate
                  ? "bg-[#E94560] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {template.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolkitNav;
