import { useState, memo, MouseEvent, useCallback, ReactNode, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Check, ArrowRight, Sparkles, BookOpen, Wrench, Calculator } from "lucide-react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CareerPhase } from "@/hooks/useProfile";

function useIsSmallScreen() {
  const [small, setSmall] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const onChange = () => setSmall(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return small;
}

export function useSeenNewItems() {
  const [seen, setSeen] = useLocalStorage<string[]>("dashboard_seen_new", []);
  const markSeen = useCallback((id: string) => {
    setSeen((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [setSeen]);
  const hasSeen = useCallback((id: string) => seen.includes(id), [seen]);
  return { markSeen, hasSeen };
}

export type GuideTag = "end-to-end" | "applying" | "interviewing" | "negotiating";

export interface JourneyItem {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  enPath: string;
  zhPath?: string;
  tag: GuideTag;
  isNew?: boolean;
  miniOf?: string;
  contentType: "guide" | "template" | "calculator";
  pinned?: boolean;
  pinnedLabel?: { en: string; zh: string };
}

interface JourneySectionProps {
  tag: GuideTag;
  label: string;
  icon: ReactNode;
  color: string;
  items: JourneyItem[];
  lang: "en" | "zh";
  onTrack: (id: string) => void;
  allItems: JourneyItem[];
  hasSeen: (id: string) => boolean;
  careerPhase?: CareerPhase | null;
}

const CONTENT_TYPE_LABELS = {
  guide: { en: "Guide", zh: "指南", Icon: BookOpen },
  template: { en: "Template", zh: "範本", Icon: Wrench },
  calculator: { en: "Calculator", zh: "計算器", Icon: Calculator },
};

/* ── Badge classes, Hiresign hairline chip system ── */
const BADGE_CLS = {
  // GUIDE / TOOL / CALCULATOR, content type (subtle hairline chip)
  contentType:
    "bg-green-soft text-executive-green border border-executive-green/20",
  // NEW, gold callout (most prominent)
  new:
    "bg-gold text-executive-green border border-gold-dark/30 shadow-sm",
  // Beta tags
  beta:
    "bg-green-soft text-executive-green border border-executive-green/20",
  // START HERE, gold callout
  startHere:
    "bg-gold-soft text-executive-green border border-gold/40",
  // counter pill
  counter:
    "bg-green-soft text-executive-green border border-executive-green/20",
};

/* ── Full Card (desktop) ── */
const JourneyCard = memo(function JourneyCard({
  item,
  lang,
  onTrack,
  allItems,
  hasSeen,
}: {
  item: JourneyItem;
  lang: "en" | "zh";
  onTrack: (id: string) => void;
  allItems: JourneyItem[];
  hasSeen: (id: string) => boolean;
}) {
  const navigate = useNavigate();
  const path = lang === "zh" && item.zhPath ? item.zhPath : item.enPath;
  const { isComplete, toggleComplete, getProgress } = useReadingProgress();
  const completed = isComplete(item.id);
  const progress = completed ? 100 : getProgress(item.id);
  const typeInfo = CONTENT_TYPE_LABELS[item.contentType];

  const miniGuide = allItems.find((g) => g.miniOf === item.id);
  const miniPath = miniGuide
    ? lang === "zh" && miniGuide.zhPath
      ? miniGuide.zhPath
      : miniGuide.enPath
    : null;

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComplete(item.id);
  };

  if (item.pinned) {
    return (
      <Link
        to={path}
        onClick={() => onTrack(item.id)}
        className="relative block rounded-2xl border-l-[4px] p-6 md:p-7 mb-4 transition-all duration-200 hover:-translate-y-0.5 bg-card shadow-[var(--dash-card-shadow)] hover:shadow-[var(--dash-card-hover-shadow)]"
        style={{ borderLeftColor: "hsl(var(--gold))" }}
      >
        <span
          className={`absolute top-4 right-4 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${BADGE_CLS.startHere}`}
        >
          {item.pinnedLabel?.[lang] || (lang === "zh" ? "從這開始" : "START HERE")}
        </span>
        <span className="text-2xl mb-3 block">📖</span>
        <h3 className="text-lg font-bold mb-1 text-foreground">{item.title[lang]}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description[lang]}</p>
      </Link>
    );
  }

  return (
    <Link
      to={path}
      onClick={() => onTrack(item.id)}
      className="relative rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 overflow-hidden bg-card shadow-[var(--dash-card-shadow)] hover:shadow-[var(--dash-card-hover-shadow)]"
    >
      <button
        onClick={handleToggle}
        className="absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors z-10"
        style={{
          borderColor: completed ? "hsl(var(--gold))" : "hsl(var(--muted-foreground) / 0.3)",
          backgroundColor: completed ? "hsl(var(--gold))" : "transparent",
        }}
        aria-label={completed ? (lang === "zh" ? "已完成" : "Done") : "Mark as done"}
      >
        {completed && <Check className="w-3 h-3 text-white dark:text-background" strokeWidth={3} />}
      </button>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${BADGE_CLS.contentType}`}
          >
            <typeInfo.Icon className="w-3 h-3" /> {typeInfo[lang]}
          </span>
          {item.isNew && !hasSeen(item.id) && (
            <span
              className={`inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${BADGE_CLS.new}`}
            >
              <Sparkles className="w-3 h-3" /> {lang === "zh" ? "新" : "NEW"}
            </span>
          )}
          {progress > 0 && (
            <span
              className="text-[10px] font-semibold"
              style={{
                color: completed ? "hsl(var(--gold))" : "hsl(var(--dash-text-secondary))",
              }}
            >
              {completed ? (lang === "zh" ? "已完成" : "Done") : `${progress}% ${lang === "zh" ? "已讀" : "read"}`}
            </span>
          )}
        </div>
        <h4 className="text-base font-bold mb-1 pr-6 text-foreground">{item.title[lang]}</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description[lang]}</p>

        {miniGuide && miniPath && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onTrack(miniGuide.id);
              navigate(miniPath);
            }}
            className="inline-flex items-center gap-1 mt-3 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: "hsl(var(--gold))" }}
          >
            {lang === "zh" ? "想看精簡版？點這裡 →" : "Want the mini guide version? Click here →"}
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: "hsl(var(--gold))" }}
        />
      </div>
    </Link>
  );
});

/* ── Compact Row (mobile) ── */
const CompactRow = memo(function CompactRow({
  item,
  lang,
  onTrack,
  hasSeen,
}: {
  item: JourneyItem;
  lang: "en" | "zh";
  onTrack: (id: string) => void;
  hasSeen: (id: string) => boolean;
}) {
  const navigate = useNavigate();
  const path = lang === "zh" && item.zhPath ? item.zhPath : item.enPath;
  const { isComplete, toggleComplete } = useReadingProgress();
  const completed = isComplete(item.id);
  const typeInfo = CONTENT_TYPE_LABELS[item.contentType];

  return (
    <div
      className="flex items-center gap-3 py-3 border-b border-border last:border-b-0 cursor-pointer active:bg-muted/40 transition-colors"
      onClick={() => {
        onTrack(item.id);
        navigate(path);
      }}
    >
      {/* Checkbox, 44x44 touch target */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleComplete(item.id);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleComplete(item.id);
        }}
        className="shrink-0 flex items-center justify-center"
        style={{ minWidth: 44, minHeight: 44, WebkitTapHighlightColor: "transparent" }}
        aria-label={completed ? (lang === "zh" ? "已完成" : "Done") : "Mark as done"}
      >
        <span
          className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
          style={{
            borderColor: completed ? "hsl(var(--gold))" : "hsl(var(--muted-foreground) / 0.3)",
            backgroundColor: completed ? "hsl(var(--gold))" : "transparent",
          }}
        >
          {completed && <Check className="w-3 h-3 text-white dark:text-background" strokeWidth={3} />}
        </span>
      </button>

      {/* Title */}
      <span className={`flex-1 text-sm font-medium min-w-0 ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
        {item.title[lang]}
      </span>

      {/* Badges */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          
        >
          <typeInfo.Icon className="w-2.5 h-2.5" /> {typeInfo[lang]}
        </span>
        {item.isNew && !hasSeen(item.id) && (
          <span
            className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
            
          >
            <Sparkles className="w-2.5 h-2.5" />
          </span>
        )}
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </div>
  );
});

export default function JourneySection({
  tag,
  label,
  icon,
  color,
  items,
  lang,
  onTrack,
  allItems,
  hasSeen,
  careerPhase,
}: JourneySectionProps) {
  const isMobile = useIsSmallScreen();

  const getDefaultCollapsed = () => {
    if (tag === "end-to-end") return isMobile;
    if (!careerPhase) return false;
    if (tag === careerPhase) return false;
    if (careerPhase === "applying") return tag === "interviewing" || tag === "negotiating";
    if (careerPhase === "interviewing") return tag === "negotiating";
    return false;
  };

  const [manualToggle, setManualToggle] = useState<boolean | null>(null);
  const collapsed = manualToggle !== null ? manualToggle : getDefaultCollapsed();

  useEffect(() => {
    setManualToggle(null);
  }, [careerPhase]);

  const isCurrentPhase = !!careerPhase && careerPhase === (tag as string) && tag !== "end-to-end";

  const { isComplete } = useReadingProgress();

  const primaryItems = items.filter((i) => !i.miniOf);
  const pinnedItems = primaryItems.filter((i) => i.pinned);
  const regularItems = primaryItems.filter((i) => !i.pinned);
  const completedCount = primaryItems.filter((i) => isComplete(i.id)).length;
  const totalCount = primaryItems.length;

  const buildSummary = () => {
    const types = primaryItems.reduce<Record<string, number>>((acc, i) => {
      acc[i.contentType] = (acc[i.contentType] || 0) + 1;
      return acc;
    }, {});
    const parts: string[] = [];
    if (lang === "zh") {
      if (types.guide) parts.push(`${types.guide} 個指南`);
      if (types.template) parts.push(`${types.template} 個範本`);
      if (types.calculator) parts.push(`${types.calculator} 個計算器`);
      return `${totalCount} 項資源：${parts.join("、")}`;
    }
    if (types.guide) parts.push(`${types.guide} ${types.guide === 1 ? "guide" : "guides"}`);
    if (types.template) parts.push(`${types.template} ${types.template === 1 ? "template" : "templates"}`);
    if (types.calculator) parts.push(`${types.calculator} ${types.calculator === 1 ? "calculator" : "calculators"}`);
    return `${totalCount} resources: ${parts.join(", ")}`;
  };

  if (collapsed) {
    return (
      <div className="mb-6">
        <button
          onClick={() => setManualToggle((v) => (v !== null ? !v : !getDefaultCollapsed()))}
          className="w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-colors duration-200"
          style={{ borderColor: "hsl(var(--border))", backgroundColor: "hsl(var(--card))" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "hsl(var(--paper))"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "hsl(var(--card))"; }}
        >
          <span style={{ color }}>{icon}</span>
          <span className="font-heading text-lg font-bold text-foreground flex-1">{label}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">{buildSummary()}</span>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
            
          >
            {completedCount}/{totalCount}
          </span>
          <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="mb-10 rounded-xl transition-all duration-300"
      style={{
        borderLeft: isCurrentPhase ? "3px solid hsl(var(--gold))" : "3px solid transparent",
        paddingLeft: isCurrentPhase ? "12px" : "0px",
        backgroundColor: isCurrentPhase ? "rgba(212, 168, 67, 0.04)" : "transparent",
      }}
    >
      <button
        onClick={() => setManualToggle((v) => (v !== null ? !v : !getDefaultCollapsed()))}
        className="w-full flex items-center gap-3 mb-4 group text-left"
      >
        <span className="text-foreground" style={{ color }}>{icon}</span>
        <span className="font-heading text-lg md:text-xl font-bold text-foreground flex-1">
          {label}
          {isCurrentPhase && (
            <span
              className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full align-middle"
              style={{ backgroundColor: "rgba(212, 168, 67, 0.15)", color: "hsl(var(--gold))" }}
            >
              {lang === "zh" ? "目前階段" : "current phase"}
            </span>
          )}
        </span>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          
        >
          {completedCount}/{totalCount}
        </span>
        <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90 transition-transform duration-200" />
      </button>

      {/* Mobile: compact list */}
      {isMobile ? (
        <div className="bg-card rounded-xl border border-border px-3">
          {pinnedItems.map((item) => (
            <CompactRow key={item.id} item={item} lang={lang} onTrack={onTrack} hasSeen={hasSeen} />
          ))}
          {regularItems.map((item) => (
            <CompactRow key={item.id} item={item} lang={lang} onTrack={onTrack} hasSeen={hasSeen} />
          ))}
        </div>
      ) : (
        <>
          {pinnedItems.map((item) => (
            <JourneyCard key={item.id} item={item} lang={lang} onTrack={onTrack} allItems={allItems} hasSeen={hasSeen} />
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularItems.map((item) => (
              <JourneyCard key={item.id} item={item} lang={lang} onTrack={onTrack} allItems={allItems} hasSeen={hasSeen} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
