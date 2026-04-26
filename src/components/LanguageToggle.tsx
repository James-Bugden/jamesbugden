import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  variant?: "nav" | "mobile" | "default";
}

const LanguageToggle = ({ variant = "default" }: LanguageToggleProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isZhTw = location.pathname.startsWith("/zh-tw");
  
  const toggleLanguage = () => {
    if (isZhTw) {
      // Remove /zh-tw prefix to get English path
      const enPath = location.pathname.replace(/^\/zh-tw/, "") || "/";
      navigate(enPath);
    } else {
      // Add /zh-tw prefix for Chinese path
      const zhPath = location.pathname === "/" ? "/zh-tw" : `/zh-tw${location.pathname}`;
      navigate(zhPath);
    }
  };

  if (variant === "nav") {
    const goEn = () => { if (isZhTw) toggleLanguage(); };
    const goZh = () => { if (!isZhTw) toggleLanguage(); };
    const baseSeg = "px-3 py-1 text-[12px] font-semibold rounded-full transition-colors whitespace-nowrap leading-none";
    return (
      <div
        className="inline-flex items-center gap-0.5 p-1 rounded-full"
        style={{
          background: 'hsl(var(--paper-alt))',
          border: '1px solid hsl(var(--border))',
        }}
      >
        <button
          onClick={goEn}
          aria-pressed={!isZhTw}
          className={baseSeg}
          style={
            !isZhTw
              ? { background: 'hsl(var(--executive-green))', color: '#fff' }
              : { background: 'transparent', color: 'hsl(var(--foreground))' }
          }
        >
          EN
        </button>
        <button
          onClick={goZh}
          aria-pressed={isZhTw}
          className={baseSeg}
          style={
            isZhTw
              ? { background: 'hsl(var(--executive-green))', color: '#fff' }
              : { background: 'transparent', color: 'hsl(var(--foreground))' }
          }
        >
          中文
        </button>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <button 
        onClick={toggleLanguage}
        className="w-full py-3 text-lg font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200"
      >
        {isZhTw ? "Switch to English" : "切換為中文"}
      </button>
    );
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
    >
      {isZhTw ? "English" : "中文"}
    </button>
  );
};

export default LanguageToggle;
