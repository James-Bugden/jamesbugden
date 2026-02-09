import { Link, useLocation } from "react-router-dom";

interface ToolkitNavZhTwProps {
  currentTemplate?: string;
}

const templates = [
  { id: "T1", label: "話術", href: "/zh-tw/toolkit/scripts" },
  { id: "T2", label: "Offer 回應", href: "/zh-tw/toolkit/offer-response" },
  { id: "T3", label: "還價信", href: "/zh-tw/toolkit/counteroffer" },
  { id: "T4", label: "計算表", href: "/zh-tw/toolkit/calculator" },
  { id: "T5", label: "回絕應對", href: "/zh-tw/toolkit/pushback" },
  { id: "T6", label: "加薪準備", href: "/zh-tw/toolkit/raise" },
  { id: "T7", label: "成就記錄", href: "/zh-tw/toolkit/log" },
];

const ToolkitNavZhTw = ({ currentTemplate }: ToolkitNavZhTwProps) => {
  const location = useLocation();

  return (
    <nav className="px-5 md:px-6 pb-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-center gap-2">
          {templates.map((template) => {
            const isActive = currentTemplate === template.id || location.pathname === template.href;
            return (
              <Link
                key={template.id}
                to={template.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gold text-white"
                    : "bg-muted text-muted-foreground hover:bg-executive/10 hover:text-executive"
                }`}
              >
                <span className="text-xs opacity-70 mr-1">{template.id}</span>
                {template.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ToolkitNavZhTw;
