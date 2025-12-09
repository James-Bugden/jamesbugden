import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  variant?: "nav" | "default";
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
        className="text-sm font-medium text-white hover:text-white/80 transition-colors"
      >
        {isZhTw ? "EN" : "中文"}
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
