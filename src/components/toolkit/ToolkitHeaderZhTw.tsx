import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";

const ToolkitHeaderZhTw = () => {
  return (
    <header className="bg-nav-green border-b border-executive-light/20">
      <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between relative z-10">
        <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
          JAMES BUGDEN
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
            <ThreadsIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default ToolkitHeaderZhTw;
