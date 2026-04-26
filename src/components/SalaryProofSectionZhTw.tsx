import { X, CheckCircle2 } from "lucide-react";
import MailerLiteForm from "@/components/MailerLiteForm";
import { CoinStackIcon, DownloadCloudIcon } from "@/assets/illustrations/HiresignIcons";

export default function SalaryProofSectionZhTw() {
  return (
    <>
      {/* Part A, Big Impact Numbers */}
      <section className="py-16 md:py-24 px-4 sm:px-5 md:px-6 bg-paper-alt">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: 'hsl(var(--gold))',
              }}
            >
              證據
            </p>
            <h2
              className="font-heading tracking-[-0.025em] text-foreground"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              數字會說話
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { Icon: CoinStackIcon, num: "8 千萬以上", desc: "接受第一個 Offer 和策略性談判之間的差距。30 年職涯計算。" },
              { Icon: DownloadCloudIcon, num: "1 萬以上", desc: "免費工具、模板和指南的下載次數。" },
            ].map(({ Icon, num, desc }) => (
              <div key={num} className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <Icon size={56} />
                </div>
                <div className="mb-2">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
                    {num}
                  </span>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part B, Salary Comparison */}
      <section className="pb-16 md:pb-24 px-4 sm:px-5 md:px-6 bg-paper-alt">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                fontWeight: 600,
                color: 'hsl(var(--gold))',
              }}
            >
              複利效應
            </p>
            <h2
              className="font-heading tracking-[-0.025em] text-foreground mb-3"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              談判到底差多少
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: '1rem' }}>
              同樣的起薪。兩種不同策略。30 年後：
            </p>
          </div>

          {/* Bar Chart Comparison */}
          <div className="card-hairline p-6 md:p-10 mb-6 bg-card">
            <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-sm md:max-w-md mx-auto">
              {/* Bar 1, Accept First Offer */}
              <div className="flex flex-col items-center">
                <p className="tnum-geist mb-3 text-muted-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>7 千萬</p>
                <div className="flex items-end w-full justify-center" style={{ height: '260px' }}>
                  <div
                    className="rounded-t-md w-16 md:w-20"
                    style={{
                      height: '38%',
                      background: 'hsl(var(--executive-green) / 0.10)',
                      border: '1px solid hsl(var(--executive-green) / 0.25)',
                      borderBottom: 'none',
                    }}
                  />
                </div>
                <div className="mt-5 text-center w-full">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <X className="w-4 h-4 text-destructive flex-shrink-0" strokeWidth={2.5} />
                    <span className="font-semibold text-foreground leading-tight" style={{ fontSize: '0.8125rem' }}>直接接受 Offer</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>每次加薪 15%</p>
                </div>
              </div>

              {/* Bar 2, Negotiate Strategically */}
              <div className="flex flex-col items-center">
                <p className="tnum-geist mb-3" style={{ fontSize: '1rem', fontWeight: 700, color: 'hsl(var(--gold))' }}>1 億 5 千萬</p>
                <div className="flex items-end w-full justify-center" style={{ height: '260px' }}>
                  <div
                    className="rounded-t-md w-16 md:w-20"
                    style={{
                      height: '100%',
                      background: 'linear-gradient(to top, hsl(var(--gold)), hsl(var(--gold) / 0.85))',
                      border: '1px solid hsl(var(--gold))',
                      borderBottom: 'none',
                      boxShadow: '0 4px 24px hsl(var(--gold) / 0.18)',
                    }}
                  />
                </div>
                <div className="mt-5 text-center w-full">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-executive-green flex-shrink-0" strokeWidth={2.25} />
                    <span className="font-semibold text-foreground leading-tight" style={{ fontSize: '0.8125rem' }}>策略性談判</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>每次加薪 30%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Big Callout, refined */}
          <div className="text-center mb-8 py-6">
            <p
              className="font-heading tnum-geist"
              style={{
                color: 'hsl(var(--gold))',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              +8,033 萬
            </p>
            <p className="font-heading mt-3 text-foreground" style={{ fontSize: '1.0625rem', fontWeight: 500 }}>
              職涯收入多 <span className="tnum">109.9%</span>。
            </p>
          </div>

          {/* Two stat cards, hairline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            <div className="card-hairline p-5 text-center">
              <p className="tnum-geist mb-1" style={{ color: 'hsl(var(--gold))', fontSize: '1.25rem', fontWeight: 700 }}>22 萬</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>每個月不談判損失的金額</p>
            </div>
            <div className="card-hairline p-5 text-center">
              <p className="tnum-geist mb-1" style={{ color: 'hsl(var(--gold))', fontSize: '1.25rem', fontWeight: 700 }}>8,033 萬</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>30 年累計少拿的金額</p>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-center mb-8 text-muted-foreground" style={{ fontSize: '0.75rem' }}>
            以年薪 120 萬起薪、每 3 年換一次工作計算。
          </p>

          {/* CTA */}
          <div className="max-w-md mx-auto">
            <MailerLiteForm formId="sM1X80" className="ml-embedded ml-inline" buttonText="免費獲取工具包" />
          </div>
        </div>
      </section>
    </>
  );
}
