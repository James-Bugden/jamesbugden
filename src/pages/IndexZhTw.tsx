import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import TestimonialsSectionZhTw from "@/components/TestimonialsSectionZhTw";
import FreeResourcesSectionZhTw from "@/components/FreeResourcesSectionZhTw";
import MailerLiteForm from "@/components/MailerLiteForm";

const IndexZhTw = () => {
  const navLinks = [
    { href: "#resources", label: "免費資源" },
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

      {/* Hero Section */}
      <section id="about" className="pt-32 md:pt-40 pb-20 md:pb-28 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Content */}
            <div className="order-2 md:order-1">
              {/* Headline Block - Dominant element with breathing room */}
              <div className="mb-14 md:mb-16">
                <h1 className="font-heading text-[2.5rem] md:text-6xl lg:text-7xl text-executive-green leading-[1.2] tracking-tight mb-3">
                  你的履歷沒有幫你拿到工作
                </h1>
                <p className="font-heading text-xl md:text-2xl text-foreground/70 font-normal">
                  讓我告訴你為什麼
                </p>
              </div>

              {/* Authority lines - Tightly grouped, neutral */}
              <div className="mb-8 md:mb-10">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  我是 Uber 現任招募人員。
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  我已審閱超過 20,000 份履歷，錄用超過 500 人。
                </p>
              </div>

              {/* Diagnosis lines - Separate section, slightly more emphasis */}
              <div className="mb-10 md:mb-12">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  招募人員在 10 秒內就決定是否淘汰一份履歷。
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  我會告訴你到底是什麼讓你的履歷被刷掉。
                </p>
              </div>

              {/* Value + Scarcity + CTA - Grouped together */}
              <div className="space-y-5">
                <p className="text-gold font-semibold text-base md:text-lg">
                  價值 1萬元 · 測試期間免費 · 每月僅限 5 位
                </p>
                
                <MailerLiteForm formId="sM1X80" className="ml-embedded max-w-[400px]" buttonText="加入等候名單" />
                
                <p className="text-sm text-muted-foreground">
                  你的資訊絕對保密。絕不發送垃圾郵件。
                </p>
              </div>
            </div>

            {/* Photo */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSectionZhTw />

      {/* Free Resources Section */}
      <FreeResourcesSectionZhTw />

      {/* Waitlist CTA Section */}
      <section id="results" className="py-16 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            加入等候名單：免費履歷健檢
          </h2>
          <p className="text-gold font-semibold text-lg md:text-xl mb-2">
            價值 1萬元 · 測試期間免費
          </p>
          <p className="text-base md:text-lg text-foreground mb-8">
            每月僅限 5 位
          </p>
          
          <div className="bg-background border border-border rounded-lg p-6 md:p-8 mb-8 text-left max-w-xl mx-auto">
            <p className="text-foreground mb-4 font-medium">為什麼有等候名單：</p>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              好的履歷回饋需要時間。<br />
              倉促的回饋對任何人都沒有幫助。
            </p>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              為了保持品質，<br />
              我每月只接受 5 位候選人。
            </p>
            <p className="text-foreground mb-6 text-sm md:text-base leading-relaxed">
              這樣每份履歷都能得到<br />
              基於真實招募決策的用心、誠實回饋。
            </p>
            <p className="text-foreground font-medium mb-3">當你的名額開放時，你會獲得：</p>
            <ul className="space-y-2 mb-0">
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>完整報告和修改後的英文履歷</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>來自現任財富 100 強招募人員的真實回饋</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>學習如何針對你的夢想工作優化履歷</span>
              </li>
            </ul>
          </div>

          <MailerLiteForm formId="sM1X80" className="ml-embedded max-w-[500px] mx-auto" buttonText="加入等候名單" />
          <p className="text-sm text-muted-foreground mt-4">
            你的資訊絕對保密。我絕不發送垃圾郵件。
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-executive-green relative border-t border-cream/10">
        <div className="container mx-auto max-w-xl text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl text-cream mb-4">
            有任何問題都可以問我
          </h2>
          <p className="text-cream/70 text-base md:text-lg mb-8 leading-relaxed">
            我也可以幫助你準備面試和薪資談判。
          </p>
          <a href="mailto:james@jamesbugden.com?subject=履歷健檢相關問題">
            <Button size="lg" className="h-14 px-10 btn-gold font-medium text-base uppercase tracking-wider">
              快速提問
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
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
