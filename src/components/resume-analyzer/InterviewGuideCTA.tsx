import { ArrowRight, Target } from "lucide-react";
import { track } from "@/lib/analytics";
import {
  bucketScore,
  interviewGuideUrl,
  levelLabel,
  normalizeLevel,
  type Lang,
} from "./crossToolCta";

interface InterviewGuideCTAProps {
  lang: Lang;
  score: number;
  seniorityLevel: string | null | undefined;
}

export function InterviewGuideCTA({ lang, score, seniorityLevel }: InterviewGuideCTAProps) {
  const bucket = bucketScore(score);
  const level = normalizeLevel(seniorityLevel);
  const destination = interviewGuideUrl(lang);
  const label = levelLabel(level, lang);

  const headline =
    lang === "zh-TW" ? `你的分數是 ${score}。` : `Your score is ${score}.`;

  let body: string;
  if (label) {
    body =
      lang === "zh-TW"
        ? `根據你的${label}經驗，這是幫助你準備下一步的面試指南。`
        : `Based on your ${label} experience, here's the interview guide to prepare for what comes next.`;
  } else {
    body =
      lang === "zh-TW"
        ? "這是幫助你準備下一步的面試指南。"
        : "Here's the interview guide to prepare for what comes next.";
  }

  const buttonText = lang === "zh-TW" ? "閱讀面試指南" : "Read the Interview Guide";

  const handleClick = () => {
    track("cta_click", "cross_tool_cta_click", {
      score_bucket: bucket,
      destination,
    });
  };

  return (
    <div
      className="rounded-2xl p-6 md:p-8 text-center"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: "2px solid rgba(43,71,52,0.25)",
        boxShadow: "0 4px 24px rgba(43,71,52,0.08)",
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: "rgba(43,71,52,0.1)" }}
      >
        <Target className="w-7 h-7" style={{ color: "hsl(var(--executive-green))" }} />
      </div>
      <h2
        className="font-heading text-xl font-bold mb-2"
        style={{ color: "hsl(var(--foreground))" }}
      >
        {headline}
      </h2>
      <p
        className="text-sm mb-5 max-w-md mx-auto"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {body}
      </p>
      <a
        href={destination}
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors text-white"
        style={{ backgroundColor: "hsl(var(--executive-green))" }}
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
