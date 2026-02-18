import { Link } from "react-router-dom";

interface ToolkitNavProps {
  currentTemplate: string;
}

const templates = [
  { id: "scripts", label: "Scripts", href: "/toolkit/scripts" },
  { id: "offer-response", label: "Offer Response", href: "/toolkit/offer-response" },
  { id: "counter", label: "Counter", href: "/toolkit/counteroffer" },
  { id: "calculator", label: "Calculator", href: "/toolkit/calculator" },
  { id: "pushback", label: "Pushback", href: "/toolkit/pushback" },
  { id: "raise", label: "Raise", href: "/toolkit/raise" },
  { id: "log", label: "Log", href: "/toolkit/log" },
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
              className={`px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-300 ${
                template.id === currentTemplate
                  ? "bg-gold text-white shadow-gold"
                  : "bg-executive/10 text-executive hover:bg-executive/20"
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
