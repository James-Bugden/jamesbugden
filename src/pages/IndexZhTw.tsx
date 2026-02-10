import { Button } from "@/components/ui/button";
import { Linkedin, Users, Briefcase, FileCheck } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
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
      {/* Navigation */}
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
            <a href="#resources" className="md:hidden text-sm text-cream-70 hover:text-cream transition-colors">
              免費資源
            </a>
            <LanguageToggle variant="nav" />
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
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-24 md:pt-36 pb-16 md:pb-24 px-5 md:px-6 bg-background relative">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">

            <div className="order-2 md:order-1 w-full">
              {/* Photo — mobile only */}
              <div className="flex justify-center mb-3 md:hidden">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                  <img
                    src={jamesPhoto}
                    alt="James Bugden"
                    className="relative w-36 h-36 rounded-full object-cover hero-photo-shadow border-4 border-card"
                  />
                </div>
              </div>

              {/* Credential badge */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-executive-green/8 border border-executive-green/15 text-sm text-executive-green font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  Uber 資深招募官 · 財富 500 大
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] text-foreground leading-[1.15] tracking-tight mb-5 max-w-2xl mx-auto md:mx-0">
                拿到年薪 200 萬+ 的外商 offer，進你真正想去的公司
              </h1>

              {/* Subhead */}
              <p className="text-[1.0625rem] md:text-lg text-foreground/85 leading-relaxed max-w-xl mx-auto md:mx-0 mb-6">
                我是 Uber 的資深招募官。審過 20,000+ 份履歷，在財富500大企業錄取超過 750 人。每週免費分享薪資談判、履歷優化和面試攻略。
              </p>

              {/* Social proof — ABOVE form */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-5">
                <Users className="w-4 h-4 text-gold flex-shrink-0" />
                <span>加入 2,000+ 位專業人士，每週收到來自招募官的內部求職情報</span>
              </div>

              {/* CTA block */}
              <div className="mb-2 max-w-md mx-auto md:mx-0">
                <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="免費索取攻略" />
              </div>

              {/* Micro-commitment reducer */}
              <p className="text-[13px] text-muted-foreground/70 mb-8">
                免費加入 · 隨時取消 · 絕不發垃圾郵件
              </p>

              {/* Stats bar */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 border-t border-border/60">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-foreground flex items-center gap-1.5">
                    <FileCheck className="w-5 h-5 text-executive-green/60" />
                    20,000+
                  </span>
                  <span className="text-sm text-foreground/60">份履歷審閱</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-foreground flex items-center gap-1.5">
                    <Briefcase className="w-5 h-5 text-executive-green/60" />
                    750+
                  </span>
                  <span className="text-sm text-foreground/60">人成功錄取</span>
                </div>
              </div>
            </div>

            {/* Photo — desktop only */}
            <div className="hidden md:flex justify-end order-2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
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
