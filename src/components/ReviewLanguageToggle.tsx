import { useNavigate, useLocation } from "react-router-dom";

const ReviewLanguageToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isZhTw = location.pathname.includes("/zh-tw/");
  
  const toggleLanguage = () => {
    if (isZhTw) {
      // Switch from Chinese to English
      const englishPath = location.pathname.replace("/zh-tw/reviews/", "/reviews/");
      navigate(englishPath);
    } else {
      // Switch from English to Chinese
      const chinesePath = location.pathname.replace("/reviews/", "/zh-tw/reviews/");
      navigate(chinesePath);
    }
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors text-sm font-medium"
    >
      {isZhTw ? "EN" : "中文"}
    </button>
  );
};

export default ReviewLanguageToggle;
