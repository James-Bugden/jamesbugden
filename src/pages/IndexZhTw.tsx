import "@/styles/homepage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Users, FileCheck, X, CheckCircle2, Eye, Building, Plus, Minus } from "lucide-react";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import HomepageTestimonialsZhTw from "@/components/HomepageTestimonialsZhTw";
import LogoScrollZhTw from "@/components/LogoScrollZhTw";
import SelfSegmentationZhTw from "@/components/SelfSegmentationZhTw";
import SalaryProofSectionZhTw from "@/components/SalaryProofSectionZhTw";
import MailerLiteForm from "@/components/MailerLiteForm";
import LazySection from "@/components/LazySection";
import AboutSectionZhTw from "@/components/AboutSectionZhTw";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import PromoBanner from "@/components/PromoBanner";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";

const faqs = [
  { q: "\u70BA\u4EC0\u9EBC\u9019\u4E9B\u662F\u514D\u8CBB\u7684\uFF1F", a: "\u6211\u7684\u4F7F\u547D\u662F\u628A\u76E1\u53EF\u80FD\u591A\u7684\u4ED8\u8CBB\u5DE5\u5177\u548C\u8CC7\u8A0A\u514D\u8CBB\u958B\u653E\u3002\u6211\u60F3\u5E6B\u52A9\u66F4\u591A\u4EBA\u5F97\u5230\u4ED6\u5011\u60F3\u8981\u7684\u5DE5\u4F5C\u548C\u751F\u6D3B\u3002" },
  { q: "\u6211\u6C92\u6709\u81EA\u4FE1\u8AC7\u85AA\u6C34\u3002\u9019\u6703\u6709\u5E6B\u52A9\u55CE\uFF1F", a: "\u4F60\u4E0D\u9700\u8981\u5F37\u52E2\u3002\u4F60\u9700\u8981\u4E86\u89E3\u5C0D\u65B9\u8981\u4EC0\u9EBC\u3002\u6211\u8B93\u4F60\u7406\u89E3 HR \u7684\u601D\u7DAD\u65B9\u5F0F\uFF0C\u8B93\u4F60\u611F\u89BA\u51B7\u975C\u3001\u6E96\u5099\u597D\u3002" },
  { q: "\u6211\u4E00\u76F4\u6295\u5C65\u6B77\u4F46\u90FD\u6C92\u6709\u56DE\u97F3\u3002\u6211\u505A\u932F\u4E86\u4EC0\u9EBC\uFF1F", a: "\u901A\u5E38\u4E09\u4EF6\u4E8B\u4E4B\u4E00\uFF1A\u5C65\u6B77\u6C92\u901A\u904E\u96FB\u8166\u7BE9\u9078\u3001\u8077\u7A31\u8DDF\u8077\u7F3A\u4E0D\u5339\u914D\u3001\u6216\u6700\u597D\u7684\u6210\u679C\u653E\u5728\u932F\u8AA4\u4F4D\u7F6E\u3002\u6211\u7684\u5BE9\u67E5\u6703\u627E\u51FA\u554F\u984C\uFF0C\u544A\u8A34\u4F60\u600E\u9EBC\u6539\u3002" },
  { q: "\u6211\u4E0D\u77E5\u9053\u5728\u62DB\u52DF\u6D41\u7A0B\u4E2D\u600E\u9EBC\u8DDF HR \u6E9D\u901A\u3002\u4ED6\u5011\u611F\u89BA\u50CF\u5B88\u9580\u54E1\u3002", a: "HR \u60F3\u628A\u8077\u7F3A\u586B\u6EFF\u3002\u5927\u90E8\u5206\u4EBA\u4E0D\u4E86\u89E3 HR \u5728\u610F\u4EC0\u9EBC\u3002\u6211\u505A\u904E HR\u3002\u6211\u8B93\u4F60\u77E5\u9053\u4ED6\u5011\u6BCF\u500B\u968E\u6BB5\u770B\u4EC0\u9EBC\uFF0C\u8B93\u4F60\u5011\u5408\u4F5C\u3002" },
  { q: "\u70BA\u4EC0\u9EBC\u4E0D\u7528 ChatGPT \u6539\u5C65\u6B77\u5C31\u597D\uFF1F", a: "AI \u662F\u597D\u7684\u8D77\u9EDE\u3002\u4F46 AI \u4E0D\u77E5\u9053\u9762\u8A66\u5B98\u5728\u627E\u4EC0\u9EBC\u3002AI \u4E0D\u6703\u544A\u8A34\u4F60\u6700\u597D\u7684\u6210\u5C31\u88AB\u57CB\u5728\u7B2C\u4E8C\u9801\u3002\u5BE9\u95B1\u904E 20,000+ \u4EFD\u5C65\u6B77\u6559\u6703\u6211 AI \u9084\u6C92\u5B78\u5230\u7684\u4E8B\u3002" },
  { q: "\u4F60\u7684\u5C65\u6B77\u5065\u6AA2\u8DDF\u5176\u4ED6\u670D\u52D9\u6709\u4EC0\u9EBC\u4E0D\u540C\uFF1F", a: "\u5927\u90E8\u5206\u5C65\u6B77\u670D\u52D9\u4FEE\u6539\u932F\u5B57\u3001\u8ABF\u6574\u6392\u7248\u3002\u6211\u7528\u5C08\u696D\u7684\u89D2\u5EA6\u770B\u4F60\u7684\u5C65\u6B77\uFF0C\u544A\u8A34\u4F60\u600E\u9EBC\u6539\u624D\u80FD\u62FF\u5230\u66F4\u591A\u9762\u8A66\u3002\u4F60\u9084\u6703\u5F97\u5230\u4E00\u5957\u53EF\u91CD\u8907\u4F7F\u7528\u7684\u7CFB\u7D71\u3002" },
];

function FAQSection() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <section className="py-12 md:py-20 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-center mb-6 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}>
          {"\u4F60\u5FC3\u88E1\u7684\u7591\u554F"}
        </h2>
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-zh-${i}`}
                >
                  <span className="font-bold text-lg text-foreground">{faq.q}</span>
                  {isOpen
                    ? <Minus className="w-5 h-5 flex-shrink-0 transition-transform duration-200 text-muted-foreground" />
                    : <Plus className="w-5 h-5 flex-shrink-0 transition-transform duration-200 text-muted-foreground" />
                  }
                </button>
                <div
                  id={`faq-panel-zh-${i}`}
                  role="region"
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 text-base text-foreground" style={{ paddingTop: '0' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const IndexZhTw = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    const pending = sessionStorage.getItem("auth_redirect");
    if (pending) {
      sessionStorage.removeItem("auth_redirect");
      navigate(pending === "/zh-tw" ? "/zh-tw/dashboard" : pending, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="homepage min-h-screen overflow-x-hidden scroll-smooth bg-cream">
      <SEO />

      {/* ── Promo Banner + Navigation (sticky together) ── */}
      <header className="sticky top-0 z-50">
        <PromoBanner lang="zh" />
        <nav
          className={`transition-shadow duration-300 bg-cream ${
            scrolled ? "shadow-md shadow-black/8" : ""
          }`}
          aria-label="主要導覽"
        >
          <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
            <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-bold tracking-tight text-executive-green cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              JAMES BUGDEN
            </Link>
            <div className="flex items-center gap-4">
              <AuthHeaderButton variant="light" />
              <LanguageToggle variant="default" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero — cream #FDFBF7 ── */}
        <section id="about" className="pt-8 md:pt-16 pb-12 md:pb-20 px-5 md:px-6 relative bg-cream">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">
              <div className="order-2 md:order-1 w-full">
                {/* Photo — mobile only */}
                <div className="flex justify-center mb-4 pt-4 md:hidden">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                    <img src={jamesPhoto} alt="James Bugden" className="relative w-40 h-40 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                  </div>
                </div>

                <h1 className="font-heading leading-[1.12] tracking-tight mb-3 max-w-3xl mx-auto md:mx-0 text-foreground" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.2 }}>
                  {"\u5728\u5922\u60F3\u516C\u53F8\u62FF\u5230\u5E74\u85AA"}<span style={{ fontFamily: 'system-ui, sans-serif', position: 'relative', top: '-0.05em' }}>3</span>{"\u767E\u842C\u4EE5\u4E0A\u7684\u00A0Offer"}
                </h1>

                {/* Credential badge */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/40 text-muted-foreground text-[0.9375rem]">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    {`Uber \u8CC7\u6DF1 Recruiter`}
                  </span>
                </div>

                <p className="leading-relaxed max-w-xl mx-auto md:mx-0 mb-5 text-foreground text-[1.0625rem]">
                  {"\u514D\u8CBB\u5DE5\u5177\u3001\u6A21\u677F\u548C\u5167\u90E8\u7B56\u7565\uFF0C\u4F86\u81EA\u5E6B\u52A9 750 \u4F4D\u4EE5\u4E0A\u6C42\u8077\u8005\u6210\u529F\u9304\u53D6\u7684\u8077\u6DAF\u6559\u7DF4\u3002"}
                </p>

                <div className="mb-2 max-w-md mx-auto md:mx-0">
              <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText={"\u514D\u8CBB\u7D22\u53D6\u653B\u7565"} successHeading="成功加入！" successBody="請查看您的信箱，免費求職指南已寄出。" successCta="建立免費帳號，儲存進度並探索更多工具" successCtaLink="/join" />
                </div>

                <p className="mb-5 text-muted-foreground text-[0.8125rem] mt-2">
                  {"\u52A0\u5165 10,000 \u4EE5\u4E0A\u4F4D\u5C08\u696D\u4EBA\u58EB \u00B7 \u6C38\u4E45\u514D\u8CBB \u00B7 \u96A8\u6642\u53D6\u6D88\u8A02\u95B1"}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 border-t border-border/60">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5 text-foreground">
                      <FileCheck className="w-5 h-5 text-executive-green/70" />
                      {"20,000 \u4EE5\u4E0A"}
                    </span>
                    <span className="text-sm text-muted-foreground">{"\u4EFD\u5C65\u6B77\u5BE9\u95B1"}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5 text-foreground">
                      <Users className="w-5 h-5 text-executive-green/70" />
                      {"750 \u4EE5\u4E0A"}
                    </span>
                    <span className="text-sm text-muted-foreground">{"\u4EBA\u6210\u529F\u9304\u53D6"}</span>
                  </div>
                </div>
              </div>

              {/* Photo — desktop only */}
              <div className="hidden md:flex justify-end order-2">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                  <img src={jamesPhoto} alt="James Bugden" className="relative w-80 h-80 lg:w-88 lg:h-88 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar ── */}
        <div className="bg-cream">
          <LogoScrollZhTw />
        </div>

        {/* ── Testimonials ── */}
        <LazySection>
          <div className="bg-card">
            <HomepageTestimonialsZhTw />
          </div>
        </LazySection>

        {/* ── Sound Familiar? ── */}
        <section className="py-12 md:py-20 px-5 md:px-6 bg-cream">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-heading mb-6 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}>
              {"\u807D\u8D77\u4F86\u5F88\u719F\u6089\uFF1F"}
            </h2>

            <div className="flex flex-col gap-5 mb-8 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" strokeWidth={2.5} />
                <p className="text-foreground text-lg">{"\u4F60\u6295\u4E86\u4E00\u5806\u5DE5\u4F5C\uFF0C\u5B8C\u5168\u6C92\u6709\u56DE\u97F3\u3002"}</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" strokeWidth={2.5} />
                <p className="text-foreground text-lg">{"\u4F60\u9032\u5230\u6700\u7D42\u9762\u8A66\uFF0C\u7136\u5F8C\u6C92\u6709\u4E0B\u6587\u3002\u6C92\u6709 Email\u3002\u6C92\u6709\u96FB\u8A71\u3002"}</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" strokeWidth={2.5} />
                <p className="text-foreground text-lg">{"\u4F60\u62FF\u5230 Offer\uFF0C\u4F46\u4F60\u4E0D\u77E5\u9053\u85AA\u6C34\u5408\u4E0D\u5408\u7406\uFF0C\u4E5F\u4E0D\u77E5\u9053\u8A72\u4E0D\u8A72\u518D\u8AC7\u3002"}</p>
              </div>
            </div>

            <div className="flex items-start justify-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-executive-green" />
              <p className="text-muted-foreground text-base">
                {"\u4F60\u4E0D\u9700\u8981\u53E6\u4E00\u500B\u6C42\u8077\u5E73\u53F0\u3002\u4F60\u9700\u8981\u4E00\u500B\u5750\u5728\u684C\u5B50\u53E6\u4E00\u908A\u7684\u4EBA\u3002"}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText={"\u514D\u8CBB\u7D22\u53D6\u653B\u7565"} successHeading="成功加入！" successBody="請查看您的信箱，免費求職指南已寄出。" successCta="建立免費帳號，儲存進度並探索更多工具" successCtaLink="/join" />
            </div>
            <p className="text-center mt-2 text-muted-foreground text-[0.8125rem]">
              {"\u4E0D\u704C\u6C34\u3001\u4E0D\u5EE2\u8A71\u3002\u6BCF\u9031\u4E00\u5247\u62DB\u52DF\u5167\u5E55\u7B56\u7565\u3002"}
            </p>
          </div>
        </section>

        {/* ── Why Work With an Insider ── */}
        <section className="py-12 md:py-20 px-5 md:px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="font-heading mb-3 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}>
                {"\u5927\u90E8\u5206\u7684\u8077\u6DAF\u5EFA\u8B70\u4F86\u81EA\u6C92\u62DB\u52DF\u904E\u4EFB\u4F55\u4EBA\u7684\u4EBA"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mb-10">
              <div className="rounded-xl p-6 text-center md:text-left bg-cream border-t-[3px] border-gold">
                <Eye className="w-10 h-10 mx-auto md:mx-0 mb-4 text-executive-green" strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2 text-foreground">{"\u5BE9\u95B1\u904E 20,000 \u4EE5\u4E0A\u4EFD\u5C65\u6B77"}</p>
                <p className="text-base text-foreground">
                  {"\u6211\u77E5\u9053\u4EC0\u9EBC\u8B93\u9762\u8A66\u5B98\u505C\u4E0B\u4F86\u770B\u3002\u4E5F\u77E5\u9053\u4EC0\u9EBC\u8B93\u5C65\u6B77 6 \u79D2\u5167\u88AB\u6DD8\u6C70\u3002\u4E0D\u7528\u731C\uFF0C\u770B\u904E\u5E7E\u5343\u6B21\u4E86\u3002"}
                </p>
              </div>
              <div className="rounded-xl p-6 text-center md:text-left bg-cream border-t-[3px] border-gold">
                <Users className="w-10 h-10 mx-auto md:mx-0 mb-4 text-executive-green" strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2 text-foreground">{"\u9304\u53D6\u904E 750 \u4EE5\u4E0A\u4EBA"}</p>
                <p className="text-base text-foreground">
                  {"\u6211\u5750\u5728\u6C7A\u5B9A\u4F60 Offer \u7684\u6703\u8B70\u5BA4\u88E1\u3002\u6211\u77E5\u9053 HR \u600E\u9EBC\u60F3\u3001\u7528\u4EBA\u4E3B\u7BA1\u5728\u610F\u4EC0\u9EBC\uFF0C\u9084\u6709\u5927\u90E8\u5206\u4EBA\u5728\u54EA\u88E1\u5C11\u62FF\u4E86\u9322\u3002"}
                </p>
              </div>
              <div className="rounded-xl p-6 text-center md:text-left bg-cream border-t-[3px] border-gold">
                <Building className="w-10 h-10 mx-auto md:mx-0 mb-4 text-executive-green" strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2 text-foreground">{"\u5167\u90E8\u77E5\u8B58"}</p>
                <p className="text-base text-foreground">
                  {"\u6211\u9304\u53D6\u904E 750 \u4F4D\u4EE5\u4E0A\u7684\u4EBA\u3002\u6211\u77E5\u9053\u4ED6\u5011\u600E\u9EBC\u9762\u8A66\u3001\u600E\u9EBC\u7D66\u85AA\uFF0C\u9084\u6709\u4EC0\u9EBC\u8B93\u4F60\u812B\u7A4E\u800C\u51FA\u3002"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <LazySection>
          <SelfSegmentationZhTw />
        </LazySection>

        {/* ── Salary Proof ── */}
        <LazySection>
          <SalaryProofSectionZhTw />
        </LazySection>

        {/* ── About ── */}
        <LazySection>
          <AboutSectionZhTw />
        </LazySection>

        {/* ── FAQ ── */}
        <LazySection>
          <FAQSection />
        </LazySection>

        {/* ── Create Account CTA ── */}
        {!isLoggedIn && (
          <LazySection>
            <section className="py-16 md:py-24 px-5 md:px-6 bg-cream">
              <div className="container mx-auto max-w-2xl text-center">
                <h2 className="font-heading mb-4 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
                  免費建立帳號
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  免費取得所有職涯指南、履歷工具、薪資數據等完整資源。
                </p>
                <div className="flex flex-col gap-3 mb-8 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-executive-green" />
                    <span className="text-foreground">10+ 份職涯與面試指南</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-executive-green" />
                    <span className="text-foreground">履歷建立器與 AI 分析工具</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-executive-green" />
                    <span className="text-foreground">面試題庫與談判工具</span>
                  </div>
                </div>
                <Link
                  to="/zh-tw/join"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-bold text-white bg-gold hover:bg-gold/90 transition-colors text-lg"
                >
                  免費取得完整資源
                </Link>
                
              </div>
            </section>
          </LazySection>
        )}

      </main>

      <ExitIntentPopup lang="zh" />
    </div>
  );
};

export default IndexZhTw;