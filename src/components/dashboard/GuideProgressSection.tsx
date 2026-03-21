import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { GUIDE_CHECKLIST_REGISTRY, type GuideRegistryEntry } from "@/lib/guideChecklistRegistry";
import ScoreGauge from "@/components/ScoreGauge";

const MAX_EXPANDED_GUIDES = 4;

interface GuideProgressSectionProps {
  lang: "en" | "zh";
  compact?: boolean;
}

interface GuideProgress {
  guide: GuideRegistryEntry;
  checked: number;
  total: number;
  pct: number;
}

function readLocalChecked(key: string): number {
  try {
    const raw = localStorage.getItem(`guide_${key}`);
    if (!raw) return 0;
    const arr: boolean[] = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter(Boolean).length : 0;
  } catch {
    return 0;
  }
}

export default function GuideProgressSection({ lang, compact = false }: GuideProgressSectionProps) {
  const { user, isLoggedIn } = useAuth();
  const [cloudData, setCloudData] = useState<Record<string, boolean[]>>({});
  const [showAll, setShowAll] = useState(false);

  // Fetch cloud data for logged-in users
  useEffect(() => {
    if (!isLoggedIn || !user) return;
    (async () => {
      try {
        const { data } = await supabase
          .from("guide_progress")
          .select("guide_key, data")
          .eq("user_id", user.id);
        if (data) {
          const map: Record<string, boolean[]> = {};
          data.forEach((row) => {
            if (Array.isArray(row.data)) {
              map[row.guide_key] = row.data as boolean[];
            }
          });
          setCloudData(map);
        }
      } catch { /* silent */ }
    })();
  }, [isLoggedIn, user]);

  const progressList = useMemo<GuideProgress[]>(() => {
    return GUIDE_CHECKLIST_REGISTRY.map((guide) => {
      // Prefer checklists for current language, but fall back to all if none have progress
      const currentLangChecklists = guide.checklists.filter(
        (c) => c.lang === (lang === "zh" ? "zh" : "en")
      );
      const otherLangChecklists = guide.checklists.filter(
        (c) => c.lang !== (lang === "zh" ? "zh" : "en")
      );

      // Check if current language has any progress
      const currentHasProgress = currentLangChecklists.some((cl) => {
        if (cloudData[cl.key] && Array.isArray(cloudData[cl.key])) {
          return cloudData[cl.key].some(Boolean);
        }
        return readLocalChecked(cl.key) > 0;
      });

      // Use current language checklists if they exist; otherwise fall back to other language
      const checklists = currentLangChecklists.length > 0
        ? (currentHasProgress ? currentLangChecklists : 
           // If no current-lang progress, check other lang and use whichever has progress
           otherLangChecklists.some((cl) => {
             if (cloudData[cl.key] && Array.isArray(cloudData[cl.key])) return cloudData[cl.key].some(Boolean);
             return readLocalChecked(cl.key) > 0;
           }) ? otherLangChecklists : currentLangChecklists)
        : guide.checklists;

      let totalChecked = 0;
      let totalItems = 0;

      checklists.forEach((cl) => {
        totalItems += cl.itemCount;
        if (cloudData[cl.key] && Array.isArray(cloudData[cl.key])) {
          totalChecked += cloudData[cl.key].filter(Boolean).length;
        } else {
          totalChecked += readLocalChecked(cl.key);
        }
      });

      return {
        guide,
        checked: totalChecked,
        total: totalItems,
        pct: totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0,
      };
    });
  }, [lang, cloudData]);

  const started = progressList.filter((p) => p.pct > 0);
  const notStarted = progressList.filter((p) => p.pct === 0);
  const overallChecked = progressList.reduce((s, p) => s + p.checked, 0);
  const overallTotal = progressList.reduce((s, p) => s + p.total, 0);
  const overallPct = overallTotal > 0 ? Math.round((overallChecked / overallTotal) * 100) : 0;
  const [compactExpanded, setCompactExpanded] = useState(false);

  // Don't render if no progress at all
  if (started.length === 0) return null;

  // Compact mode: single progress bar inline
  if (compact) {
    const inProgress = progressList.filter((p) => p.pct > 0 && p.pct < 100);
    const unstarted = progressList.filter((p) => p.pct === 0);
    const expandedGuides = [...inProgress, ...unstarted].slice(0, MAX_EXPANDED_GUIDES);

    return (
      <div className="mb-8">
        <button
          onClick={() => setCompactExpanded((v) => !v)}
          className="w-full rounded-2xl border border-border p-4 flex items-center gap-4 transition-all hover:border-gold/40 hover:shadow-sm bg-card text-left"
        >
          <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {lang === "zh" ? "指南進度" : "Guide Progress"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "zh"
                ? `${started.length} / ${progressList.length} 個指南已開始`
                : `${started.length} of ${progressList.length} guides started`}
            </p>
          </div>
          {compactExpanded ? (
            <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
          )}
        </button>

        {compactExpanded && expandedGuides.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {expandedGuides.map((item) => (
              <Link
                key={item.guide.guideId}
                to={lang === "zh" ? item.guide.path.zh : item.guide.path.en}
                className="flex items-center gap-3 rounded-xl border border-border p-3 transition-all hover:border-gold/40 hover:shadow-sm bg-card"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.guide.title[lang]}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                      {item.pct}%
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const displayed = showAll ? progressList : started;

  return (
    <div className="mb-10">
      <h2 className="font-heading text-2xl md:text-3xl mb-2 text-foreground">
        {lang === "zh" ? "指南進度" : "Guide Progress"}
      </h2>
      <p className="text-sm md:text-base mb-6 text-muted-foreground">
        {lang === "zh"
          ? "你在各指南中的學習進度"
          : "Your learning progress across all guides"}
      </p>

      <div className="rounded-2xl bg-card shadow-[var(--dash-card-shadow)] border border-border p-6 md:p-8">
        {/* Overall ring + guide grid */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Overall progress */}
          <div className="flex flex-col items-center shrink-0">
            <ScoreGauge
              score={overallPct}
              label={lang === "zh" ? "整體" : "Overall"}
              size="lg"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {overallChecked}/{overallTotal} {lang === "zh" ? "已完成" : "completed"}
            </p>
          </div>

          {/* Per-guide cards */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayed.map((item) => (
              <Link
                key={item.guide.guideId}
                to={lang === "zh" ? item.guide.path.zh : item.guide.path.en}
                className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-all hover:border-gold/40 hover:shadow-sm bg-background"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {item.guide.title[lang]}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                      {item.checked}/{item.total}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Show all toggle */}
        {notStarted.length > 0 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="mt-4 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
          >
            {showAll ? (
              <>
                {lang === "zh" ? "隱藏未開始" : "Hide not started"}
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                {lang === "zh" ? `顯示全部 (${notStarted.length} 個未開始)` : `Show all (${notStarted.length} not started)`}
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
