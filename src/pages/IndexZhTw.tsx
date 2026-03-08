import { useState, useEffect } from "react";
import { Briefcase, Users, Linkedin, FileCheck } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import HomepageTestimonialsZhTw from "@/components/HomepageTestimonialsZhTw";
import LogoScroll from "@/components/LogoScroll";
import SelfSegmentationZhTw from "@/components/SelfSegmentationZhTw";
import ReadinessAssessmentZhTw from "@/components/ReadinessAssessmentZhTw";
import OfferCalculatorCTAZhTw from "@/components/OfferCalculatorCTAZhTw";
import CoachingCTAZhTw from "@/components/CoachingCTAZhTw";
import MailerLiteForm from "@/components/MailerLiteForm";
import LazySection from "@/components/LazySection";

const IndexZhTw = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden scroll-smooth">
      <PageSEO
        title="James Bugden — 拿到年薪200萬+外商Offer"
        description="Career Coach �入Google、Uber、Microsoft等頂尖企業。"
        path="/zh-tw"
        lang="zh-Hant-TW"
      />

      {/* ── Navigation ── */}
      <header>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 bg-executive-green transition-shadow duration-300 ${
            scrolled ? "shadow-lg shadow-black/20" : ""
          }`}
        >
          <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
            <span className="font-heading text-lg md:text-xl font-bold text-cream tracking-tight">
              JAMES BUGDEN
            </span>
            <div className="flex items-center gap-4">
              <AuthHeaderButton variant="nav" />
              <LanguageToggle variant="nav" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="about" className="pt-20 md:pt-36 pb-10 md:pb-24 px-5 md:px-6 bg-background relative">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">
              <div className="order-2 md:order-1 w-full">
                {/* Photo — mobile only */}
                <div className="flex justify-center mb-2 md:hidden">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                    <img src={jamesPhoto} alt="James Bugden" className="relative w-40 h-40 rounded-full object-cover hero-photo-shadow border-4 border-card" />
                  </div>
                </div>


                <h1 className="font-heading text-[1.875rem] md:text-[3.5rem] lg:text-[4rem] text-foreground leading-[1.12] tracking-tight mb-4 max-w-2xl mx-auto md:mx-0">
                  拿到年薪 200 萬+ 的�300 萬以上;300 萬以上 300 萬以上   </h1>

                <p className="text-[0.9375rem] md:text-lg text-foreground/85 leading-relaxed max-w-xl mx-auto md:mx-0 mb-5">
                  我在 Google、Uber、Microsoft 等企業成功錄取超過 750 位候選人的內部招募策略
                </p>

                <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>加入 2,000+ 位專業人士，每週收到來自招募官的內部求職情報</span>
                </div>

                <div className="mb-2 max-w-md mx-auto md:mx-0">
                  <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="立即註冊" />
                </div>

                <p className="text-[13px] text-muted-foreground/70 mb-5">
                  免費加入 · 隨時取消 · 絕不發垃圾郵件
                </p>

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
                  <img src={jamesPhoto} alt="James Bugden" className="relative w-80 h-80 lg:w-88 lg:h-88 rounded-full object-cover hero-photo-shadow border-4 border-card" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar ── */}
        <LogoScroll heading="我曾協助來自以下企業的專業人士" />

        {/* ── Testimonials ── */}
        <LazySection>
          <HomepageTestimonialsZhTw />
        </LazySection>

        {/* ── Self-Segmentation ── */}
        <LazySection>
          <SelfSegmentationZhTw />
        </LazySection>

        {/* ── Offer Calculator ── */}
        <LazySection>
          <OfferCalculatorCTAZhTw />
        </LazySection>

        {/* ── Readiness Assessment ── */}
        <LazySection>
          <ReadinessAssessmentZhTw />
        </LazySection>

        {/* ── Coaching CTA ── */}
        <LazySection>
          <CoachingCTAZhTw />
        </LazySection>
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4">
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
          <span className="text-sm text-muted-foreground text-center w-full">
            © 2026 James Bugden. 版權所有。
          </span>
        </div>
      </footer>
    </div>
  );
};

export default IndexZhTw;
