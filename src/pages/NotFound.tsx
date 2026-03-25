import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const isZhTw = location.pathname.startsWith("/zh-tw");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO />
      <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <h1
          className="font-heading text-7xl sm:text-9xl font-bold text-gold tracking-tight"
          style={{ lineHeight: 1 }}
        >
          404
        </h1>
        <h2 className="mt-4 font-heading text-xl sm:text-2xl font-semibold text-foreground text-center">
          {isZhTw ? "找不到此頁面" : "This page doesn't exist"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
          {isZhTw
            ? "網址可能不正確，或此頁面已移動。"
            : "The URL may be incorrect or this page may have moved."}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Button asChild className="h-11 px-6 gap-2 font-semibold">
            <Link to={isZhTw ? "/zh-tw" : "/"}>
              {isZhTw ? "返回首頁" : "Return to Homepage"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-11 px-6 gap-2 font-semibold">
            <Link to={isZhTw ? "/zh-tw/join" : "/join"}>
              <UserPlus className="h-4 w-4" />
              {isZhTw ? "建立免費帳號" : "Create a Free Account"}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;