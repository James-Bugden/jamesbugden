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
      navigate("/");
    } else {
      navigate("/zh-tw");
    }
  };

  if (variant === "nav") {
    return (
      <button 
        onClick={toggleLanguage}
        className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
      >
        {isZhTw ? "EN" : "中文"}
      </button>
    );
  }

  if (variant === "mobile") {
    return (
      <button 
        onClick={toggleLanguage}
        className="w-full py-3 text-lg font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200"
      >
        {isZhTw ? "Switch to English" : "切換至中文"}
      </button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="text-sm font-medium"
    >
      {isZhTw ? "EN" : "中文"}
    </Button>
  );
};

export default LanguageToggle;
