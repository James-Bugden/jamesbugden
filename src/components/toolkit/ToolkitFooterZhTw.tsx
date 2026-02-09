import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ToolkitFooterZhTw = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-5 md:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-muted-foreground mb-4">
          來自薪資談判工具包 by{" "}
          <Link to="/zh-tw" className="text-gold hover:underline">
            James Bugden
          </Link>
        </p>
        <Link 
          to="/zh-tw" 
          className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors"
        >
          取得完整的免費資源
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </footer>
  );
};

export default ToolkitFooterZhTw;
