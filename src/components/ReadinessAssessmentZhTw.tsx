import { Users } from "lucide-react";

export default function ReadinessAssessmentZhTw() {
  return (
    <section id="assessment" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
          你準備好進外商了嗎？
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-10">
          免費 2 分鐘測驗，找出你目前的準備程度。
        </p>

        <div className="bg-background border border-border rounded-2xl p-8 md:p-10 max-w-xl mx-auto shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
          <div className="mx-auto w-28 h-28 mb-6 relative">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 52 * 0.75} ${2 * Math.PI * 52 * 0.25}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold text-foreground">
              ?
            </span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
            評估你在 5 個關鍵領域的準備程度：英語能力、履歷格式、面試準備、文化適配度和薪資知識。根據你的分數獲得個人化的行動計畫。
          </p>

          <a
            href="/zh-tw/quiz"
            className="inline-flex h-12 px-8 items-center justify-center rounded-lg btn-gold text-base font-semibold"
          >
            開始測驗
          </a>

          <p className="text-xs text-muted-foreground/70 mt-3">
            免費 · 2 分鐘 · 不需註冊即可開始
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-5">
            <Users className="w-4 h-4 text-gold flex-shrink-0" />
            <span>1,200+ 位專業人士已完成此測驗</span>
          </div>
        </div>
      </div>
    </section>
  );
}
