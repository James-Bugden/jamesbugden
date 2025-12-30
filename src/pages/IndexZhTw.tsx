import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import TestimonialsSectionZhTw from "@/components/TestimonialsSectionZhTw";

const IndexZhTw = () => {
  const navLinks = [
    { href: "#about", label: "關於我" },
    { href: "#testimonials", label: "客戶評價" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation - Executive Green */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-cream-70 hover:text-cream transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <LanguageToggle variant="nav" />
            </div>
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
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </nav>

      {/* Hero Section - New Conversion-Focused Design */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="font-heading text-[40px] md:text-[56px] lg:text-[64px] text-executive-dark leading-[1.1] mb-6 tracking-tight">
                別再被招募人員已讀不回
              </h1>
              <p className="text-lg md:text-xl text-foreground mb-4 max-w-[50ch]">
                我是現役 Uber 招募人員，我知道什麼真的有效。
              </p>
              <p className="text-base md:text-lg text-foreground mb-8 max-w-[60ch] leading-relaxed">
                我已經審閱過 <span className="font-bold text-gold">20,000+ 份履歷</span>，錄用了 <span className="font-bold text-gold">500+ 人</span>。
                <br />
                我完全清楚為什麼你的履歷沒有得到回覆。
              </p>
              <p className="text-base md:text-lg text-foreground mb-2 max-w-[50ch]">
                加入等候名單，獲得免費履歷健檢。
              </p>
              <p className="text-gold font-semibold text-base md:text-lg mb-8">
                （價值 $200 美元 - 每月僅 5 個名額）
              </p>
              
              {/* MailerLite Form */}
              <div className="ml-embedded max-w-[400px] mb-4" data-form="sM1X80"></div>
              
              <p className="text-sm text-muted-foreground">
                你的資訊絕對保密。不會發垃圾郵件。絕對不會。
              </p>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="w-64 h-64 md:w-[360px] md:h-[360px] rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Shorter, Authoritative */}
      <section id="about" className="py-20 md:py-28 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-[40px] md:text-[56px] text-foreground text-center mb-10 md:mb-14 tracking-tight">
            嗨，我是 James
          </h2>
          <div className="max-w-[65ch] mx-auto space-y-6">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              我是台灣 <span className="font-bold">Uber 的資深招募人員</span>。
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              我每天都在 Uber 審閱履歷。我已經審閱過 <span className="font-bold text-gold">20,000+ 份履歷</span>，錄用了 <span className="font-bold text-gold">500+ 人</span>。
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              在做招募之前，我在台灣當英文老師。這就是為什麼我知道如何把複雜的回饋，變成你真的可以用的修改建議。
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed font-semibold">
              我不教理論。我教的是今天真正有效的方法。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-11 px-5">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </Button>
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-11 px-5">
                <InstagramIcon className="w-4 h-4" /> Instagram
              </Button>
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-11 px-5">
                <ThreadsIcon className="w-4 h-4" /> Threads
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSectionZhTw />

      {/* Minimal Footer - Copyright + Social Only */}
      <footer className="py-6 px-5 md:px-6 bg-background border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. 版權所有。
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexZhTw;
