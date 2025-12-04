import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LanguageToggle = () => {
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
