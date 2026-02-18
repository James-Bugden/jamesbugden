import { Calculator, ArrowRightLeft, TrendingUp, BarChart3 } from "lucide-react";

export default function OfferCalculatorCTAZhTw() {
  return (
    <section id="calculator" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
          拿到 Offer 了？算算它真正值多少。
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          看清你的真實總薪酬。
        </p>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 max-w-xl mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
          <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
            <Calculator className="w-7 h-7 text-gold" />
          </div>

          <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
            <div className="flex items-start gap-3">
              <ArrowRightLeft className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">比較你目前的薪資與新 offer</p>
            </div>
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">一眼看清第一年總薪酬，包含股票、簽約獎金和福利</p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">看看你的 package 在 4 年內實際值多少</p>
            </div>
          </div>

          <a
            href="/zh-tw/offer-calculator"
            className="inline-flex h-12 px-8 items-center justify-center rounded-lg btn-gold text-base font-semibold"
          >
            計算我的 Offer
          </a>

          <p className="text-xs text-muted-foreground/70 mt-3 max-w-sm mx-auto">
            免費工具 · 由在台灣談判過 100+ 外商 offer 的招募官打造
          </p>
        </div>
      </div>
    </section>
  );
}
