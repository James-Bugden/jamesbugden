import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, BookOpen, Sparkles, PartyPopper } from "lucide-react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import type { CareerPhase } from "@/hooks/useProfile";
import type { JourneyItem } from "@/components/dashboard/JourneySection";

interface Props {
  lang: "en" | "zh";
  latestAnalysis: { overall_score: number | null; created_at: string } | null;
  lastViewedGuide: string | null;
  lastViewedGuideAt: string | null;
  careerPhase: CareerPhase | null;
  journeyItems: JourneyItem[];
}

const PHASE_ORDER: CareerPhase[] = ["applying", "interviewing", "negotiating"];

function PickUpWhereYouLeftOffInner({ lang, latestAnalysis, lastViewedGuide, lastViewedGuideAt, careerPhase, journeyItems }: Props) {
  const { isComplete } = useReadingProgress();

  // Card 1: Resume Score
  const scoreCard = useMemo(() => {
    if (!latestAnalysis?.overall_score) return null;
    const date = new Date(latestAnalysis.created_at).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", { month: "short", day: "numeric" });
    return { score: latestAnalysis.overall_score, date };
  }, [latestAnalysis, lang]);

  // Card 2: Last Viewed Guide
  const guideCard = useMemo(() => {
    if (!lastViewedGuide) return null;
    const item = journeyItems.find((i) => i.id === lastViewedGuide);
    if (!item) return null;
    const path = lang === "zh" && item.zhPath ? item.zhPath : item.enPath;
    return { title: item.title[lang], path };
  }, [lastViewedGuide, journeyItems, lang]);

  // Card 3: Suggested Next Step
  const nextStep = useMemo(() => {
    if (!careerPhase) return null;

    const phaseIdx = PHASE_ORDER.indexOf(careerPhase);

    for (let i = phaseIdx; i < PHASE_ORDER.length; i++) {
      const phase = PHASE_ORDER[i];
      const phaseItems = journeyItems.filter((item) => (item.tag as string) === phase && !item.miniOf);
      const uncompleted = phaseItems.find((item) => !isComplete(item.id));
      if (uncompleted) {
        const path = lang === "zh" && uncompleted.zhPath ? uncompleted.zhPath : uncompleted.enPath;
        if (i === phaseIdx) {
          return {
            text: lang === "zh" ? `下一步：${uncompleted.title[lang]}` : `Up next: ${uncompleted.title[lang]}`,
            path,
            type: "next" as const,
          };
        } else {
          const phaseLabels: Record<string, string> = { applying: "投遞申請", interviewing: "面試準備", negotiating: "薪資談判" };
          const phaseLabel = lang === "zh" ? phaseLabels[phase] : phase.charAt(0).toUpperCase() + phase.slice(1);
          return {
            text: lang === "zh"
              ? `準備好進入${phaseLabel}了嗎？從「${uncompleted.title[lang]}」開始`
              : `Ready for ${phaseLabel}? Start with ${uncompleted.title[lang]}`,
            path,
            type: "next-phase" as const,
          };
        }
      }
    }

    return { text: lang === "zh" ? "🎉 全部完成！你準備好了！" : "🎉 All complete! You're ready!", path: null, type: "done" as const };
  }, [careerPhase, journeyItems, isComplete, lang]);

  const cards: React.ReactNode[] = [];

  // Card 1
  if (scoreCard) {
    cards.push(
      <div key="score" className="rounded-2xl p-5 flex items-center gap-4 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border">
        <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212,168,67,0.12)" }}>
          <BarChart3 className="w-6 h-6" style={{ color: "#D4A843" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-foreground">{scoreCard.score}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
          <p className="text-xs text-muted-foreground">{lang === "zh" ? "履歷分數" : "Resume Score"} · {scoreCard.date}</p>
          <div className="flex gap-3 mt-2">
            <Link to={lang === "zh" ? "/zh-tw/resume-analyzer?report=latest" : "/resume-analyzer?report=latest"} className="text-xs font-semibold hover:underline" style={{ color: "#D4A843" }}>
              {lang === "zh" ? "查看報告" : "View Report"}
            </Link>
            <Link to={lang === "zh" ? "/zh-tw/resume-analyzer?view=history" : "/resume-analyzer?view=history"} className="text-xs font-semibold text-muted-foreground hover:underline">
              {lang === "zh" ? "歷史紀錄" : "History"}
            </Link>
            <Link to={lang === "zh" ? "/zh-tw/resume-analyzer" : "/resume-analyzer"} className="text-xs font-semibold text-muted-foreground hover:underline">
              {lang === "zh" ? "重新分析" : "Retake"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Card 2
  if (guideCard) {
    cards.push(
      <Link key="guide" to={guideCard.path} className="rounded-2xl p-5 flex items-center gap-4 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border hover:-translate-y-0.5 transition-all duration-200">
        <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(35,78,62,0.08)" }}>
          <BookOpen className="w-6 h-6" style={{ color: "#234E3E" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{lang === "zh" ? "繼續閱讀" : "Continue Reading"}</p>
          <p className="text-sm font-bold text-foreground line-clamp-2">{guideCard.title}</p>
        </div>
        <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#D4A843" }} />
      </Link>
    );
  }

  // Card 3 — Suggested Next
  if (nextStep) {
    cards.push(
      nextStep.path ? (
        <Link
          key="next"
          to={nextStep.path}
          className="rounded-2xl p-5 flex items-center gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border hover:-translate-y-0.5 transition-all duration-200"
          style={{ backgroundColor: "#FDF6E7", borderLeft: "3px solid #D4A843" }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212,168,67,0.12)" }}>
            <Sparkles className="w-6 h-6" style={{ color: "#D4A843" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{lang === "zh" ? "建議下一步" : "Suggested Next"}</p>
            <p className="text-sm font-bold line-clamp-2" style={{ color: "#D4A843" }}>{nextStep.text}</p>
          </div>
          <ArrowRight className="w-5 h-5 shrink-0" style={{ color: "#D4A843" }} />
        </Link>
      ) : (
        <div key="next" className="rounded-2xl p-5 flex items-center gap-4 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(212,168,67,0.12)" }}>
            <PartyPopper className="w-6 h-6" style={{ color: "#D4A843" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">{nextStep.text}</p>
          </div>
        </div>
      )
    );
  }

  if (cards.length === 0) return null;

  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted-foreground">
        {lang === "zh" ? "接續上次進度" : "Pick Up Where You Left Off"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards}
      </div>
    </div>
  );
}

const PickUpWhereYouLeftOff = memo(PickUpWhereYouLeftOffInner);
export default PickUpWhereYouLeftOff;
