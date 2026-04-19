/**
 * Vector PDF renderer using @react-pdf/renderer.
 *
 * Reads the same ResumeData + CustomizeSettings used by the screen preview
 * and produces a real vector PDF with selectable text, embedded fonts,
 * and clickable hyperlinks — no html2canvas, no raster images.
 */
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Link,
  Image,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData, ResumeSection, ResumeSectionEntry } from "./types";
import type { CustomizeSettings } from "./customizeTypes";
import { SANS_FONTS, SERIF_FONTS, MONO_FONTS } from "./fontData";
import {
  CJK_FONT_FAMILY,
  CJK_FONT_FAMILY_TC,
  CJK_FONT_FAMILY_SC,
  CJK_FONT_FAMILY_JP,
  CJK_FONT_FAMILY_KR,
  ALL_CJK_FAMILIES,
  containsCJK,
  resumeHasCJK,
  resolveResumeCJKFamily,
  pickCJKFamily,
  type CJKFamily,
} from "@/lib/resumePdf/fontMap";

/* ═══════════════════════════════════════════════════════════
   Font Registration
   ═══════════════════════════════════════════════════════════ */

const ALL_FONTS = [...SANS_FONTS, ...SERIF_FONTS, ...MONO_FONTS];

/**
 * Extract the bare font name from a CSS font-family string
 * e.g. "'Source Sans 3', sans-serif" → "Source Sans 3"
 */
function extractFontName(cssFamily: string): string {
  const match = cssFamily.match(/^'([^']+)'/);
  return match ? match[1] : cssFamily.split(",")[0].trim().replace(/'/g, "");
}

/**
 * Font loading: use static TTF files via fontsource CDN.
 *
 * fontkit 2.x (used by react-pdf) has subsetting bugs with variable WOFF2
 * fonts from Google Fonts — glyphs render as invisible (correct metrics
 * but zero-visibility paths). This affects both URL-fetched and
 * base64-encoded WOFF2 data.
 *
 * Fix: use fontsource CDN (cdn.jsdelivr.net/fontsource) which serves
 * static, non-variable WOFF files in individual weight files.
 * fontkit handles static WOFF correctly.
 *
 * URL pattern: https://cdn.jsdelivr.net/fontsource/fonts/{id}@latest/latin-{weight}-normal.woff
 */

/** Convert font name to fontsource package ID (lowercase, hyphenated) */
function toFontsourceId(fontName: string): string {
  return fontName.toLowerCase().replace(/\s+/g, "-");
}

function fontsourceUrl(fontName: string, weight: number): string {
  const id = toFontsourceId(fontName);
  return `https://cdn.jsdelivr.net/fontsource/fonts/${id}@latest/latin-${weight}-normal.woff`;
}

const REGISTERED_FONTS = new Set<string>();
const FONT_REGISTRATION_PROMISES = new Map<string, Promise<string>>();

/**
 * fetch() with a hard timeout (browsers have none built in).
 * If the CDN stalls, the await never resolves and the preview loader
 * spins forever. AbortController lets us bail after 8s and treat the
 * registration as failed — downstream guards then fall back to Helvetica.
 * Do NOT remove this — it is the backstop for the CJK preview infinite-loading bug.
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/* ── CJK font registration ────────────────────────────────── */

/**
 * CJK font URL registry.
 *
 * Uses fontsource's legacy `/fontsource/fonts/...@latest/...` CDN path which
 * ships the full script subset as a single ~1.4 MB WOFF file (confirmed via
 * `curl -I` on 2026-04-19). CORS headers are correct. Do NOT switch to the
 * `@fontsource/...` npm-package path — that one splits CJK glyphs across
 * ~40 numeric chunk files per weight, which doesn't work with react-pdf
 * (react-pdf embeds a single file per weight, doesn't do browser-style
 * unicode-range lazy loading).
 *
 * Each family registers 400 (regular) + 700 (bold) to support bold headings
 * without relying on faux-bolding. Total download when all 4 CJK families
 * are triggered by a resume: ~12 MB. In practice 99% of resumes will only
 * need one family (TC OR SC) so the real cost is ~3 MB per bilingual resume.
 *
 * If we ever need to reduce this, options are:
 * 1. Drop weight 700 and let react-pdf faux-bold (slight visual artifact).
 * 2. Self-host a tree-shaken subset with just the glyphs the resume uses
 *    (complex — would need server-side subsetting pipeline).
 * 3. Move CJK glyph rendering server-side via a Puppeteer edge function.
 *
 * See `C:\Users\jbbug\My Drive\Vault-Sync\James AI OS\CJK Font Pipeline Deep Dive.md`.
 */
const CJK_URL_PATTERN = (pkg: string, subset: string, weight: number) =>
  `https://cdn.jsdelivr.net/fontsource/fonts/${pkg}@latest/${subset}-${weight}-normal.woff`;

// Self-hosted Noto Sans TC subset. ~1.1 MB WOFF2 each, containing the
// Taiwan MOE 4,808 common char set + ASCII + CJK punctuation.
// Built by `scripts/build-cjk-subset.mjs` — committed to public/fonts/.
// ~5,400 glyphs vs ~20,000 for the fontsource pan-CJK fallback. Fontkit
// parses this much faster; with the Web Worker render path (see
// pdfRenderer.worker.ts) the sync parse no longer blocks the main thread
// anyway, but the smaller subset still cuts first-render latency from
// 30-75s to single-digit seconds.
//
// Serves ~99.5% of real-world TC content. Rare chars outside MOE 4808
// render as tofu in preview but the Download path still uses the full
// pan-CJK font via serverPdfExport.ts, so downloaded PDFs are complete.
const TC_SUBSET_URL_400 = "/fonts/noto-sans-tc-subset-400.woff2";
const TC_SUBSET_URL_700 = "/fonts/noto-sans-tc-subset-700.woff2";

const CJK_FONT_SOURCES: Record<CJKFamily, { url400: string; url700: string }> = {
  [CJK_FONT_FAMILY_TC]: {
    url400: TC_SUBSET_URL_400,
    url700: TC_SUBSET_URL_700,
  },
  [CJK_FONT_FAMILY_SC]: {
    url400: CJK_URL_PATTERN("noto-sans-sc", "chinese-simplified", 400),
    url700: CJK_URL_PATTERN("noto-sans-sc", "chinese-simplified", 700),
  },
  [CJK_FONT_FAMILY_JP]: {
    url400: CJK_URL_PATTERN("noto-sans-jp", "japanese", 400),
    url700: CJK_URL_PATTERN("noto-sans-jp", "japanese", 700),
  },
  [CJK_FONT_FAMILY_KR]: {
    url400: CJK_URL_PATTERN("noto-sans-kr", "korean", 400),
    url700: CJK_URL_PATTERN("noto-sans-kr", "korean", 700),
  },
};

/**
 * Per-family registration promises. Without this we'd double-fetch a 1.4 MB
 * font every time the preview re-renders while the first fetch is still in
 * flight. Keyed by family name so TC + SC can race in parallel.
 */
const cjkRegistrationPromises = new Map<CJKFamily, Promise<boolean>>();

/**
 * Register ONE CJK family. Idempotent, cached, CORS-safe.
 *
 * Safety:
 * - HEAD-check before register so a 404/CORS fail doesn't produce a half-
 *   registered font that crashes fontkit during render.
 * - Font.register wrapped in try/catch. If fontkit's DataView parser throws
 *   on the WOFF (the same class of bug that killed JetBrains Mono), we catch
 *   it here and the family never enters REGISTERED_FONTS, so downstream
 *   `REGISTERED_FONTS.has(family)` guards fall back to Helvetica instead
 *   of crashing the preview.
 * - Failed registrations are NOT cached — next prepareFonts() call will
 *   retry (useful for transient CDN blips).
 */
async function registerCJKFamily(family: CJKFamily): Promise<boolean> {
  if (REGISTERED_FONTS.has(family)) return true;
  const cached = cjkRegistrationPromises.get(family);
  if (cached) return cached;

  const source = CJK_FONT_SOURCES[family];
  const promise = (async () => {
    try {
      const resp = await fetchWithTimeout(source.url400, { method: "HEAD" });
      if (!resp.ok) {
        if (import.meta.env.DEV) console.warn(`[ResumePDF] ${family} HEAD check failed (${resp.status})`);
        cjkRegistrationPromises.delete(family);
        return false;
      }

      try {
        Font.register({
          family,
          fonts: [
            { src: source.url400, fontWeight: 400 },
            { src: source.url700, fontWeight: 700 },
          ],
        });
      } catch (regErr) {
        // fontkit parser crash (e.g. DataView offset out of bounds).
        // Do NOT mark the family as registered — downstream guards will
        // fall back to the Latin body font automatically.
        if (import.meta.env.DEV) console.warn(`[ResumePDF] Font.register(${family}) threw:`, regErr);
        cjkRegistrationPromises.delete(family);
        return false;
      }

      REGISTERED_FONTS.add(family);
      return true;
    } catch (err) {
      if (import.meta.env.DEV) console.warn(`[ResumePDF] ${family} registration failed:`, err);
      cjkRegistrationPromises.delete(family);
      return false;
    }
  })();

  cjkRegistrationPromises.set(family, promise);
  return promise;
}

/**
 * Back-compat alias. Old callers used `registerCJKFont()` (TC only).
 * Prefer `registerCJKFamily(family)` for new code.
 */
async function registerCJKFont(): Promise<boolean> {
  return registerCJKFamily(CJK_FONT_FAMILY_TC);
}

/**
 * Register a Google Font for use in react-pdf.
 * Returns the font family name to use, or "Helvetica" as fallback.
 * This is async — must be called and awaited before rendering.
 *
 * Works with ANY Google Font — not limited to the fonts in fontData.ts.
 */
async function registerFontAsync(cssFamily: string): Promise<string> {
  const name = extractFontName(cssFamily);

  // react-pdf built-in fonts
  if (["Helvetica", "Times-Roman", "Courier"].includes(name)) return name;
  if (REGISTERED_FONTS.has(name)) return name;

  // Deduplicate concurrent requests for the same font
  if (FONT_REGISTRATION_PROMISES.has(name)) {
    return FONT_REGISTRATION_PROMISES.get(name)!;
  }

  const promise = (async () => {
    // Find the canonical font name for URL construction
    const def = ALL_FONTS.find(
      (f) => f.name === name || extractFontName(f.family) === name
    );
    const fontName = def?.name || name;

    // Verify the font exists on fontsource CDN before registering
    const testUrl = fontsourceUrl(fontName, 400);
    try {
      const testResp = await fetchWithTimeout(testUrl, { method: "HEAD" });
      if (!testResp.ok) {
        // Don't cache failures — allow retry on next call
        FONT_REGISTRATION_PROMISES.delete(name);
        if (import.meta.env.DEV) console.warn(`[ResumePDF] Font "${name}" HEAD check failed (${testResp.status}), falling back to Helvetica`);
        return "Helvetica";
      }
    } catch (fetchErr) {
      FONT_REGISTRATION_PROMISES.delete(name);
      if (import.meta.env.DEV) console.warn(`[ResumePDF] Font "${name}" network error, falling back to Helvetica:`, fetchErr);
      return "Helvetica";
    }

    // Register with direct fontsource CDN URLs (static WOFF files)
    const fonts: { src: string; fontWeight: number }[] = [
      { src: fontsourceUrl(fontName, 400), fontWeight: 400 },
      { src: fontsourceUrl(fontName, 600), fontWeight: 600 },
      { src: fontsourceUrl(fontName, 700), fontWeight: 700 },
    ];

    try {
      Font.register({ family: name, fonts });
      REGISTERED_FONTS.add(name);
      return name;
    } catch (regErr) {
      FONT_REGISTRATION_PROMISES.delete(name);
      if (import.meta.env.DEV) console.warn(`[ResumePDF] Font.register("${name}") failed, falling back to Helvetica:`, regErr);
      return "Helvetica";
    }
  })();

  FONT_REGISTRATION_PROMISES.set(name, promise);
  return promise;
}

/**
 * Synchronous font name resolver.
 * Returns the font name ONLY if it's already registered. Otherwise returns "Helvetica".
 * Callers must use `prepareFonts()` before creating the PDF document.
 */
function ensureFontRegistered(cssFamily: string): string {
  const name = extractFontName(cssFamily);
  if (["Helvetica", "Times-Roman", "Courier"].includes(name)) return name;
  if (REGISTERED_FONTS.has(name)) return name;
  // Font not registered — return Helvetica to avoid react-pdf crash.
  // prepareFonts() should have been called before we get here.
  return "Helvetica";
}

/**
 * Event: fired when a CJK family finishes registering. Used by the preview
 * component to trigger a re-render once the font is available. Without this,
 * the first render uses Helvetica fallback (tofu for Chinese) and no
 * re-render ever happens — the user is stuck with tofu even after the font
 * loads.
 *
 * Using a module-level Set of listeners instead of a BroadcastChannel so
 * this is synchronous and cheap.
 */
const cjkReadyListeners = new Set<() => void>();
export function onCJKFontReady(cb: () => void): () => void {
  cjkReadyListeners.add(cb);
  return () => cjkReadyListeners.delete(cb);
}
function emitCJKReady() {
  cjkReadyListeners.forEach((cb) => {
    try { cb(); } catch { /* noop */ }
  });
}

/**
 * Pre-register fonts needed for a given set of settings.
 *
 * IMPORTANT: this function AWAITS only the Latin font registrations (fast —
 * 30 KB WOFFs). CJK font registration (1.4+ MB per weight) is dispatched
 * WITHOUT await — it runs in the background and emits `onCJKFontReady()`
 * when complete. The preview can render IMMEDIATELY with Latin glyphs
 * (tofu for Chinese characters) and re-render once the CJK font arrives.
 *
 * Why: on slow CDN conditions, blocking the preview on a 1.4 MB CJK font
 * download causes the whole preview pipeline to exceed the 45s timeout,
 * leaving the user with a "預覽失敗" error and NO preview at all. Better
 * UX: show tofu immediately + crisp text soon, never nothing.
 *
 * The render-site guards at lines 913, 2119, 2245 already fall back to
 * Helvetica when `REGISTERED_FONTS.has(cjkFamily)` is false, so this
 * change is safe — it just moves CJK registration from the critical
 * path to the background.
 */
export async function prepareFonts(
  c?: CustomizeSettings,
  data?: ResumeData,
  opts: { skipCJK?: boolean; awaitCJK?: boolean } = {},
): Promise<void> {
  const families = new Set<string>();
  if (c?.bodyFont) families.add(c.bodyFont);
  if (c?.headingFont) families.add(c.headingFont);

  // Latin fonts — await these. Tiny (30 KB per weight), fast to register.
  const latinTasks = Array.from(families).map((f) => registerFontAsync(f));

  // CJK fonts.
  //
  // skipCJK=true: caller is the in-editor preview on the MAIN thread.
  // Do NOT register CJK at all — fontkit's synchronous parse of the
  // 1.4 MB WOFF blocks the main thread for 30-75 seconds on first use,
  // freezing the whole editor (confirmed via Chrome MCP profiling).
  // Preview falls back to Latin rendering with tofu squares for CJK
  // glyphs.
  //
  // skipCJK=false, awaitCJK=false (default): caller wants the preview
  // to show eventually but shouldn't block on CJK. Registration fires
  // in the background and `onCJKFontReady()` notifies subscribers.
  //
  // skipCJK=false, awaitCJK=true: caller is the PDF download or the
  // WEB WORKER preview. Wait until CJK registration resolves before
  // returning so the subsequent pdf().toBlob() uses the real font
  // instead of Helvetica fallback. Worker callers can safely await
  // the 30-75s parse because they're not blocking the main thread.
  let awaitedCjkTasks: Promise<boolean>[] | null = null;
  if (data && !opts.skipCJK) {
    const primary = resolveResumeCJKFamily(data);
    if (primary) {
      const cjkTasks: Promise<boolean>[] = [registerCJKFamily(primary)];
      // TC fallback when primary is SC (some resumes mix).
      if (primary === CJK_FONT_FAMILY_SC) {
        cjkTasks.push(registerCJKFamily(CJK_FONT_FAMILY_TC));
      }
      if (opts.awaitCJK) {
        awaitedCjkTasks = cjkTasks;
      } else {
        // Fire and forget. When all CJK registrations settle, emit the
        // ready event so any callers (e.g. downloads) waiting for CJK
        // can proceed.
        Promise.allSettled(cjkTasks).then((results) => {
          const anySucceeded = results.some((r) => r.status === "fulfilled" && r.value === true);
          if (anySucceeded) emitCJKReady();
          if (import.meta.env.DEV) {
            results.forEach((r, i) => {
              if (r.status === "rejected") console.warn(`[ResumePDF] CJK font ${i} registration rejected:`, r.reason);
            });
          }
        });
      }
    }
  }

  // Only await the Latin fonts so the critical path is fast.
  const settled = await Promise.allSettled(latinTasks);

  if (awaitedCjkTasks) {
    // Worker / download path — wait for the actual font registration
    // so fontkit has the glyphs before pdf().toBlob() runs. Emits the
    // ready event afterward so any main-thread subscribers also learn.
    const results = await Promise.allSettled(awaitedCjkTasks);
    const anySucceeded = results.some((r) => r.status === "fulfilled" && r.value === true);
    if (anySucceeded) emitCJKReady();
    if (import.meta.env.DEV) {
      results.forEach((r, i) => {
        if (r.status === "rejected") console.warn(`[ResumePDF] CJK font ${i} registration rejected:`, r.reason);
      });
    }
  }

  const familyArr = Array.from(families);
  for (let i = 0; i < familyArr.length; i++) {
    const requested = extractFontName(familyArr[i]);
    const outcome = settled[i];
    if (outcome.status === "rejected") {
      if (import.meta.env.DEV) console.warn(`[ResumePDF] Font "${requested}" registration rejected:`, outcome.reason);
      continue;
    }
    const resolved = outcome.value;
    if (typeof resolved === "string" && resolved !== requested) {
      if (import.meta.env.DEV) console.warn(`[ResumePDF] Font "${requested}" not available, using "${resolved}"`);
    }
  }
}

// Line-break policy:
//   - Latin words: never hyphenate/split (resumes shouldn't split "hypothesis"
//     into "hypo-thesis", and URLs/emails must stay atomic).
//   - CJK runs: every ideograph / kana / hangul character is a legal break
//     point. Without this, @react-pdf treats a whole Chinese sentence as one
//     unbreakable "word" (no whitespace) and overflows the page margin.
//   - Mixed tokens like "Uber員工": Latin run stays atomic, each CJK char is
//     a break point. Result: "Uber" never splits, line can wrap between 員/工.
// Confirmed not to affect Latin-only resumes (they hit the fast-path return).
const CJK_BREAK_RE = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uFF00-\uFFEF]/;
Font.registerHyphenationCallback((word) => {
  if (!CJK_BREAK_RE.test(word)) return [word];
  const parts: string[] = [];
  let latinRun = "";
  for (const ch of word) {
    if (CJK_BREAK_RE.test(ch)) {
      if (latinRun) { parts.push(latinRun); latinRun = ""; }
      parts.push(ch);
    } else {
      latinRun += ch;
    }
  }
  if (latinRun) parts.push(latinRun);
  return parts;
});

/* ═══════════════════════════════════════════════════════════
   Size & Color Helpers (mirroring ResumePreview.tsx)
   ═══════════════════════════════════════════════════════════ */

const MM_TO_PT = 2.8346; // 1mm = 2.8346pt

function mm(val: number): number {
  return val * MM_TO_PT;
}

const NAME_SIZES: Record<string, number> = {
  xs: 14,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
};
const TITLE_SIZES: Record<string, number> = { s: 9, m: 11, l: 13 };

function headingSizePt(base: number, size: string): number {
  const offsets: Record<string, number> = {
    s: -1.5,
    m: -0.5,
    l: 1.5,
    xl: 3.5,
  };
  return base + (offsets[size] ?? -0.5);
}

function bodyPt(base: number): number {
  return base - 1.5;
}
function datePt(base: number): number {
  return base - 2.5;
}
function contactPt(base: number): number {
  return base - 2.5;
}
function entryTitlePt(base: number, size: string): number {
  const offsets: Record<string, number> = {
    xs: -2.5,
    s: -2,
    m: -1.5,
    l: -0.5,
  };
  return base + (offsets[size] ?? -1.5);
}
function entrySubtitlePt(base: number, size: string): number {
  const offsets: Record<string, number> = {
    xs: -3.5,
    s: -3,
    m: -2.5,
    l: -1.5,
  };
  return base + (offsets[size] ?? -2.5);
}
function skillPt(base: number): number {
  return base - 2;
}
function smallPt(base: number): number {
  return base - 3;
}

/** Resolve CSS color variables to actual values */
function resolveColors(c?: CustomizeSettings) {
  // Blue-link toggle: when enabled, contact links render in the standard
  // hyperlink blue (#2563eb). When disabled, they use the same `linkIconColor`
  // as the icons beside them — a more understated look.
  // Previously this customize control was wired to the UI but not read by
  // any renderer, so toggling it did nothing.
  const defaultLinkColor = c?.linkIconColor ?? "#4B5563";
  const blueLinkColor = "#2563eb";
  const linkColor = c?.linkBlue ? blueLinkColor : defaultLinkColor;

  return {
    accent: c?.accentColor ?? "#1e293b",
    name: c?.nameColor ?? "#111827",
    title: c?.titleColor ?? "#6B7280",
    headings: c?.headingsColor ?? "#111827",
    dates: c?.datesColor ?? "#6B7280",
    subtitle: c?.subtitleColor ?? "#6B7280",
    body: c?.bodyColor ?? "#374151",
    background: c?.a4Background ?? "#ffffff",
    linkIcon: defaultLinkColor,
    link: linkColor,
  };
}

/* ═══════════════════════════════════════════════════════════
   Safe data helpers
   ═══════════════════════════════════════════════════════════ */

function safeData(data?: ResumeData): ResumeData {
  return {
    personalDetails: {
      fullName: data?.personalDetails?.fullName ?? "",
      professionalTitle: data?.personalDetails?.professionalTitle ?? "",
      email: data?.personalDetails?.email ?? "",
      phone: data?.personalDetails?.phone ?? "",
      location: data?.personalDetails?.location ?? "",
      photo: data?.personalDetails?.photo ?? "",
      extras: Array.isArray(data?.personalDetails?.extras)
        ? data!.personalDetails.extras
        : [],
    },
    sections: Array.isArray(data?.sections) ? data!.sections : [],
  };
}

// English → short (Jan, Feb, Mar) and Chinese → numeric (1 月, 2 月, 3 月)
// for compact rendering in the PDF. The full month names are localized for
// UI display via localizeMonth(); here we use shorter variants to save
// horizontal space in the PDF right-aligned date column.
const EN_SHORT_MONTHS: Record<string, string> = {
  January: "Jan", February: "Feb", March: "Mar", April: "Apr",
  May: "May", June: "Jun", July: "Jul", August: "Aug",
  September: "Sep", October: "Oct", November: "Nov", December: "Dec",
};
const ZH_NUM_MONTHS: Record<string, string> = {
  January: "1 月", February: "2 月", March: "3 月", April: "4 月",
  May: "5 月", June: "6 月", July: "7 月", August: "8 月",
  September: "9 月", October: "10 月", November: "11 月", December: "12 月",
};

function formatDateRange(fields: Record<string, string>, lang?: string) {
  const isZh = lang?.startsWith("zh");
  const shortMonth = (m?: string) => {
    if (!m) return "";
    if (isZh) return ZH_NUM_MONTHS[m] ?? m;
    return EN_SHORT_MONTHS[m] ?? m.slice(0, 3);
  };
  const fmt = (m?: string, y?: string) => {
    const mm = shortMonth(m);
    if (mm && y) return isZh ? `${y} ${mm}` : `${mm} ${y}`;
    return mm || y || "";
  };
  const start = fmt(fields.startMonth, fields.startYear);
  const endIsPresent = fields.currentlyHere === "true";
  const end = endIsPresent
    ? (isZh ? "至今" : "Present")
    : fmt(fields.endMonth, fields.endYear);
  return [start, end].filter(Boolean).join(" – ");
}

function isMeaningfulHtml(html?: string) {
  if (!html) return false;
  const plain = html
    .replace(/<br\s*\/?\s*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return plain.length > 0;
}

function hasContent(section: ResumeSection): boolean {
  if (!section.entries?.length) return false;
  return section.entries.some((entry) => {
    const fields = entry.fields || {};
    return Object.values(fields).some((v) => {
      if (!v) return false;
      if (typeof v !== "string") return !!v;
      if (v.includes("<")) return isMeaningfulHtml(v);
      return v.trim().length > 0;
    });
  });
}

function normalizeSectionOrder(
  sections: ResumeSection[],
  customize?: CustomizeSettings
) {
  const order = customize?.sectionOrder || [];
  if (!order.length) return sections;
  const rank = new Map<string, number>();
  order.forEach((id, idx) => rank.set(id, idx));
  return [...sections].sort((a, b) => {
    const ra = rank.has(a.id) ? rank.get(a.id)! : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.id) ? rank.get(b.id)! : Number.MAX_SAFE_INTEGER;
    return ra - rb;
  });
}

/* ═══════════════════════════════════════════════════════════
   HTML → react-pdf Text parser
   ═══════════════════════════════════════════════════════════ */

interface HtmlNode {
  type: "text" | "bold" | "italic" | "underline" | "link" | "li" | "br" | "block";
  text?: string;
  href?: string;
  children?: HtmlNode[];
}

/**
 * Decode HTML entities in text content.
 * Handles named, decimal, and hex entities.
 */
function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(parseInt(dec, 10))
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&"); // &amp; MUST be last to avoid double-decoding
}

/**
 * Very lightweight HTML parser that handles the subset used in resume descriptions:
 * <p>, <ul>, <ol>, <li>, <br>, <strong>/<b>, <em>/<i>, <u>, <a>
 *
 * Returns a flat-ish tree of HtmlNodes that we render with react-pdf <Text>.
 */
function parseHtml(html: string): HtmlNode[] {
  if (!html) return [];

  const nodes: HtmlNode[] = [];

  // Split by tags — do NOT decode entities before splitting,
  // as that would turn &lt; into < and corrupt the tag parsing.
  const parts = html.split(/(<[^>]+>)/g);

  const stack: { tag: string; node: HtmlNode }[] = [];

  function currentChildren(): HtmlNode[] {
    if (stack.length > 0) {
      const parent = stack[stack.length - 1].node;
      if (!parent.children) parent.children = [];
      return parent.children;
    }
    return nodes;
  }

  function tagsMatch(openTag: string, closeTag: string): boolean {
    if (openTag === closeTag) return true;
    const aliases: Record<string, string> = { b: "strong", strong: "b", i: "em", em: "i" };
    return aliases[openTag] === closeTag;
  }

  for (const part of parts) {
    if (!part) continue;

    // Opening tag
    const openMatch = part.match(
      /^<(p|div|ul|ol|li|strong|b|em|i|u|a|br|span|font)(\s[^>]*)?\/?>$/i
    );
    if (openMatch) {
      const tag = openMatch[1].toLowerCase();

      if (tag === "br") {
        currentChildren().push({ type: "br" });
        continue;
      }

      if (tag === "strong" || tag === "b") {
        const node: HtmlNode = { type: "bold", children: [] };
        currentChildren().push(node);
        stack.push({ tag, node });
        continue;
      }

      if (tag === "em" || tag === "i") {
        const node: HtmlNode = { type: "italic", children: [] };
        currentChildren().push(node);
        stack.push({ tag, node });
        continue;
      }

      if (tag === "u") {
        const node: HtmlNode = { type: "underline", children: [] };
        currentChildren().push(node);
        stack.push({ tag, node });
        continue;
      }

      if (tag === "a") {
        const hrefMatch = (openMatch[2] || "").match(/href=["']([^"']+)["']/);
        const node: HtmlNode = {
          type: "link",
          href: hrefMatch?.[1] ? decodeEntities(hrefMatch[1]) : "",
          children: [],
        };
        currentChildren().push(node);
        stack.push({ tag, node });
        continue;
      }

      if (tag === "li") {
        const node: HtmlNode = { type: "li", children: [] };
        currentChildren().push(node);
        stack.push({ tag, node });
        continue;
      }

      if (
        tag === "p" ||
        tag === "div" ||
        tag === "ul" ||
        tag === "ol" ||
        tag === "span" ||
        tag === "font"
      ) {
        const node: HtmlNode = { type: "block", children: [] };
        currentChildren().push(node);
        stack.push({ tag, node });
        continue;
      }
    }

    // Closing tag
    const closeMatch = part.match(
      /^<\/(p|div|ul|ol|li|strong|b|em|i|u|a|span|font)>$/i
    );
    if (closeMatch) {
      const tag = closeMatch[1].toLowerCase();
      // Pop only the innermost matching tag to handle misnested HTML correctly.
      // If a closing tag matches an ancestor but not the innermost open tag,
      // close all tags up to and including the match (browser-style recovery).
      const matchIdx = (() => {
        for (let i = stack.length - 1; i >= 0; i--) {
          if (tagsMatch(stack[i].tag.toLowerCase(), tag)) return i;
        }
        return -1;
      })();

      if (matchIdx >= 0) {
        // Close everything from matchIdx onwards (handles misnesting)
        stack.splice(matchIdx);
      }
      continue;
    }

    // Text content — decode entities here, after tag splitting
    if (part.trim() || part === " ") {
      currentChildren().push({ type: "text", text: decodeEntities(part) });
    }
  }

  return nodes;
}

/* ═══════════════════════════════════════════════════════════
   React-PDF rendering components
   ═══════════════════════════════════════════════════════════ */

interface PdfColors {
  accent: string;
  name: string;
  title: string;
  headings: string;
  dates: string;
  subtitle: string;
  body: string;
  background: string;
  linkIcon: string;
  link: string;
}

/** Render parsed HTML nodes as react-pdf Text elements */
function RenderHtmlNodes({
  nodes,
  fontSize,
  color,
  lineHeight,
  listStyle,
}: {
  nodes: HtmlNode[];
  fontSize: number;
  color: string;
  lineHeight: number;
  listStyle?: string;
}): React.ReactElement {
  function renderNode(node: HtmlNode, key: number): React.ReactNode {
    if (node.type === "text") {
      return <Text key={key}>{node.text}</Text>;
    }
    if (node.type === "br") {
      return <Text key={key}>{"\n"}</Text>;
    }
    if (node.type === "bold") {
      return (
        <Text key={key} style={{ fontWeight: 700 }}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </Text>
      );
    }
    if (node.type === "italic") {
      return (
        <Text key={key} style={{ fontStyle: "italic" }}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </Text>
      );
    }
    if (node.type === "underline") {
      return (
        <Text key={key} style={{ textDecoration: "underline" }}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </Text>
      );
    }
    if (node.type === "link") {
      return (
        <Link key={key} src={node.href || ""} style={{ color, textDecoration: "underline" }}>
          {node.children?.map((c, i) => renderNode(c, i))}
        </Link>
      );
    }
    if (node.type === "li") {
      const bullet =
        listStyle === "hyphen" ? "–  " : listStyle === "none" ? "" : "•  ";
      return (
        <View
          key={key}
          style={{
            flexDirection: "row",
            marginBottom: mm(0.4),
            paddingLeft: listStyle === "none" ? 0 : mm(2),
          }}
        >
          {bullet ? (
            <Text
              style={{
                fontSize,
                color,
                lineHeight,
                width: mm(3),
              }}
            >
              {bullet}
            </Text>
          ) : null}
          <Text
            style={{
              fontSize,
              color,
              lineHeight,
              flex: 1,
            }}
          >
            {node.children?.map((c, i) => renderNode(c, i))}
          </Text>
        </View>
      );
    }
    if (node.type === "block") {
      // Check if this block contains list items
      const hasListItems = node.children?.some((c) => c.type === "li");
      if (hasListItems) {
        return (
          <View key={key} style={{ marginBottom: mm(1) }}>
            {node.children?.map((c, i) => renderNode(c, i))}
          </View>
        );
      }
      return (
        <Text
          key={key}
          style={{
            fontSize,
            color,
            lineHeight,
            marginBottom: mm(1),
          }}
        >
          {node.children?.map((c, i) => renderNode(c, i))}
        </Text>
      );
    }
    return null;
  }

  // Check if top-level contains any list items (direct or in block children)
  const hasAnyLi = nodes.some(
    (n) =>
      n.type === "li" || n.children?.some((c) => c.type === "li")
  );

  if (hasAnyLi) {
    return (
      <View>
        {nodes.map((n, i) => renderNode(n, i))}
      </View>
    );
  }

  return (
    <Text style={{ fontSize, color, lineHeight }}>
      {nodes.map((n, i) => renderNode(n, i))}
    </Text>
  );
}

/** HtmlBlock equivalent for PDF */
function PdfHtmlBlock({
  html,
  fontSize,
  color,
  lineHeight,
  listStyle,
}: {
  html?: string;
  fontSize: number;
  color: string;
  lineHeight: number;
  listStyle?: string;
}) {
  if (!isMeaningfulHtml(html)) return null;
  const nodes = parseHtml(html!);
  return (
    <View style={{ marginTop: mm(1) }}>
      <RenderHtmlNodes
        nodes={nodes}
        fontSize={fontSize}
        color={color}
        lineHeight={lineHeight}
        listStyle={listStyle}
      />
    </View>
  );
}

/* ── Section Heading ─────────────────────────────────────── */

function PdfSectionHeading({
  title,
  c,
  base,
  colors,
  fontFamily,
}: {
  title: string;
  c?: CustomizeSettings;
  base: number;
  colors: PdfColors;
  fontFamily: string;
}) {
  const style = c?.headingStyle || "underline";
  const fontSize = headingSizePt(base, c?.headingSize || "m");
  const uppercase = c?.headingUppercase !== false;
  const isCJK = containsCJK(title);
  const displayTitle = (uppercase && !isCJK) ? title.toUpperCase() : title;

  const headingFontFamily = c?.headingFont
    ? ensureFontRegistered(c.headingFont)
    : fontFamily;

  // Pick the right CJK family for THIS heading (TC / SC / JP / KR per text),
  // then only use it if actually registered. Otherwise fall back to the
  // chosen heading font — glyphs render as tofu but the preview stays up.
  const headingCjkFamily = isCJK ? pickCJKFamily(title) : null;
  const canUseCjk = headingCjkFamily !== null && REGISTERED_FONTS.has(headingCjkFamily);
  const textStyle = {
    fontSize,
    color: style === "background" ? "#ffffff" : colors.headings,
    fontFamily: canUseCjk ? headingCjkFamily : headingFontFamily,
    fontWeight: 700 as const,
    letterSpacing: canUseCjk ? fontSize * 0.02 : fontSize * 0.08,
  };

  if (style === "plain") {
    return (
      <Text style={{ ...textStyle, marginBottom: mm(2) }}>{displayTitle}</Text>
    );
  }

  if (style === "underline") {
    return (
      <View style={{ marginBottom: mm(2) }}>
        <Text style={textStyle}>{displayTitle}</Text>
        <View
          style={{
            marginTop: mm(0.8),
            height: mm(0.4),
            backgroundColor: colors.accent,
          }}
        />
      </View>
    );
  }

  if (style === "full-underline") {
    return (
      <Text
        style={{
          ...textStyle,
          marginBottom: mm(2),
          paddingBottom: mm(1),
          borderBottomWidth: mm(0.5),
          borderBottomColor: colors.accent,
        }}
      >
        {displayTitle}
      </Text>
    );
  }

  if (style === "left-accent") {
    return (
      <View
        style={{
          marginBottom: mm(2),
          flexDirection: "row",
          alignItems: "center",
          gap: mm(2),
        }}
      >
        <View
          style={{
            width: mm(1),
            height: mm(4),
            borderRadius: mm(0.5),
            backgroundColor: colors.accent,
          }}
        />
        <Text style={textStyle}>{displayTitle}</Text>
      </View>
    );
  }

  if (style === "background") {
    return (
      <View style={{ marginBottom: mm(2) }}>
        <Text
          style={{
            ...textStyle,
            backgroundColor: colors.accent,
            paddingHorizontal: mm(2),
            paddingVertical: mm(1),
            borderRadius: mm(0.5),
          }}
        >
          {displayTitle}
        </Text>
      </View>
    );
  }

  // left-border
  return (
    <View
      style={{
        marginBottom: mm(2),
        paddingLeft: mm(3),
        borderLeftWidth: mm(0.8),
        borderLeftColor: colors.accent,
      }}
    >
      <Text style={textStyle}>{displayTitle}</Text>
    </View>
  );
}

/* ── Contact separator rendering ─────────────────────────── */

function ContactSeparator({
  sep,
  index,
  fontSize,
  color,
}: {
  sep: string;
  index: number;
  fontSize: number;
  color: string;
}) {
  if (index === 0) return null;
  if (sep === "bullet") {
    return (
      <Text style={{ fontSize, color, marginHorizontal: mm(1) }}>·</Text>
    );
  }
  if (sep === "bar") {
    return (
      <Text style={{ fontSize, color, marginHorizontal: mm(1) }}>|</Text>
    );
  }
  // "icon" mode — no text separator, icons are rendered inline
  return null;
}

/* ── Section Entry Renderers ─────────────────────────────── */

function PdfSkillsSection({
  section,
  c,
  base,
  colors,
}: {
  section: ResumeSection;
  c?: CustomizeSettings;
  base: number;
  colors: PdfColors;
}) {
  const raw = section.entries?.[0]?.fields?.skills || section.entries?.[0]?.fields?.interests || "";
  const items = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!items.length) return null;

  const layout = section.layout || c?.skillsDisplay || "bubble";
  const sep = section.separator || c?.skillsSeparator || "bullet";
  const subStyle = section.subtitleStyle || "dash";

  const formatItem = (item: string) => {
    const colonIdx = item.indexOf(":");
    if (colonIdx === -1) return item;
    const cat = item.slice(0, colonIdx).trim();
    const rest = item.slice(colonIdx + 1).trim();
    if (!rest) return item;
    if (subStyle === "dash") return `${cat} — ${rest}`;
    if (subStyle === "bracket") return `${cat} (${rest})`;
    return `${cat}: ${rest}`;
  };

  const sepChar = sep === "pipe" ? " | " : sep === "none" ? "  " : " · ";
  const fs = skillPt(base);

  if (layout === "grid") {
    const rows: string[][] = [];
    for (let i = 0; i < items.length; i += 3) {
      rows.push(items.slice(i, i + 3));
    }
    // Note: outer View uses explicit marginBottom per row instead of `gap`.
    // react-pdf treats Views with `gap` as non-splittable across pages;
    // explicit margins allow row-by-row page-break flow.
    // Rows are NOT wrap={false} — skills are single-line so they won't visually
    // split, but keeping them wrappable lets react-pdf find break points between
    // rows rather than moving the entire grid to the next page.
    // No marginTop here — the heading's own marginBottom: mm(2) provides the gap.
    // Adding marginTop increases the minimum chunk needed to start on page 1,
    // which causes oscillation (section jumps to page 2) near page boundaries.
    return (
      <View wrap={true}>
        {rows.map((row, ri) => (
          <View
            key={ri}
            style={{
              flexDirection: "row",
              marginBottom: ri < rows.length - 1 ? mm(1) : 0,
            }}
          >
            {row.map((item, ci) => (
              <View
                key={`${ri}-${ci}`}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: ci < 2 ? mm(3) : 0,
                }}
              >
                {sep !== "newline" && sep !== "none" && (
                  <Text style={{ fontSize: fs, color: colors.accent, marginRight: mm(1.5) }}>
                    {sep === "pipe" ? "|" : "·"}
                  </Text>
                )}
                <Text style={{ fontSize: fs, color: colors.body }}>
                  {formatItem(item)}
                </Text>
              </View>
            ))}
            {/* Pad incomplete rows so all rows have 3 flex:1 cells — keeps column widths consistent */}
            {Array.from({ length: 3 - row.length }).map((_, pi) => (
              <View key={`pad-${ri}-${pi}`} style={{ flex: 1 }} />
            ))}
          </View>
        ))}
      </View>
    );
  }

  if (layout === "compact") {
    if (sep === "newline") {
      return (
        <View style={{ marginTop: mm(1.2), gap: mm(0.8) }}>
          {items.map((item, i) => (
            <Text key={i} style={{ fontSize: fs, color: colors.body }}>
              {formatItem(item)}
            </Text>
          ))}
        </View>
      );
    }
    return (
      <Text
        style={{
          marginTop: mm(1.2),
          fontSize: fs,
          color: colors.body,
        }}
      >
        {items.map(formatItem).join(sepChar)}
      </Text>
    );
  }

  // bubble (default)
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: mm(1.6),
        marginTop: mm(1.2),
      }}
    >
      {items.map((item, i) => (
        <Text
          key={i}
          style={{
            fontSize: fs,
            color: colors.body,
            backgroundColor: mixColor(colors.accent, 0.1),
            borderWidth: mm(0.3),
            borderColor: mixColor(colors.accent, 0.25),
            borderRadius: mm(3),
            paddingHorizontal: mm(2.5),
            paddingVertical: mm(0.8),
          }}
        >
          {formatItem(item)}
        </Text>
      ))}
    </View>
  );
}

/** Normalize a CSS color string to 6-digit lowercase hex. Returns fallback on failure. */
function normalizeHex(color: string, fallback = "#e2e8f0"): string {
  const c = color.trim().toLowerCase();
  // Already 6-digit hex
  if (/^#[0-9a-f]{6}$/.test(c)) return c;
  // 3-digit hex → expand
  const m3 = c.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/);
  if (m3) return `#${m3[1]}${m3[1]}${m3[2]}${m3[2]}${m3[3]}${m3[3]}`;
  // 8-digit hex (with alpha) → strip alpha
  if (/^#[0-9a-f]{8}$/.test(c)) return c.slice(0, 7);
  return fallback;
}

/** Simple color mixer — produces a lighter version of color for bubble backgrounds */
function mixColor(hex: string, opacity: number): string {
  const normalized = normalizeHex(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  // Mix with white
  const mr = Math.round(r * opacity + 255 * (1 - opacity));
  const mg = Math.round(g * opacity + 255 * (1 - opacity));
  const mb = Math.round(b * opacity + 255 * (1 - opacity));
  return `#${mr.toString(16).padStart(2, "0")}${mg.toString(16).padStart(2, "0")}${mb.toString(16).padStart(2, "0")}`;
}

function PdfLanguagesSection({
  section,
  c,
  base,
  colors,
}: {
  section: ResumeSection;
  c?: CustomizeSettings;
  base: number;
  colors: PdfColors;
}) {
  const langDisplay = section.layout || c?.languagesDisplay || "grid";
  const sep = section.separator || c?.languagesSeparator || "bullet";
  const subStyle = section.subtitleStyle || "dash";

  // Translate proficiency labels to match UI language (storage stays English
  // for backward-compat; display form is localized).
  const localizeProf = (prof: string): string => {
    const isZh = c?.language?.startsWith("zh");
    if (!isZh) return prof;
    switch (prof) {
      case "Native or bilingual proficiency": return "母語或雙語程度";
      case "Full professional proficiency": return "完全專業程度";
      case "Professional working proficiency": return "工作專業程度";
      case "Limited working proficiency": return "有限工作程度";
      case "Elementary proficiency": return "初級程度";
      default: return prof;
    }
  };

  const formatLangLabel = (lang: string, prof: string) => {
    const localized = localizeProf(prof);
    if (!localized) return lang;
    if (subStyle === "dash") return `${lang} — ${localized}`;
    if (subStyle === "bracket") return `${lang} (${localized})`;
    return `${lang}: ${localized}`;
  };

  const sepChar = sep === "pipe" ? " | " : sep === "none" ? "  " : " · ";
  const validEntries = section.entries.filter(
    (e) => e.fields.language?.trim() || e.fields.proficiency?.trim()
  );
  const fs = skillPt(base);

  if (langDisplay === "compact") {
    if (sep === "newline") {
      return (
        <View style={{ marginTop: mm(1), gap: mm(0.8) }}>
          {validEntries.map((entry) => (
            <Text key={entry.id} style={{ fontSize: fs, color: colors.body }}>
              {formatLangLabel(
                entry.fields.language?.trim() || "",
                entry.fields.proficiency?.trim() || ""
              )}
            </Text>
          ))}
        </View>
      );
    }
    return (
      <Text style={{ marginTop: mm(1), fontSize: fs, color: colors.body }}>
        {validEntries
          .map((e) =>
            formatLangLabel(
              e.fields.language?.trim() || "",
              e.fields.proficiency?.trim() || ""
            )
          )
          .join(sepChar)}
      </Text>
    );
  }

  if (langDisplay === "bubble") {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: mm(1.6),
          marginTop: mm(1),
        }}
      >
        {validEntries.map((entry) => (
          <Text
            key={entry.id}
            style={{
              fontSize: fs,
              color: colors.body,
              backgroundColor: mixColor(colors.accent, 0.1),
              borderWidth: mm(0.3),
              borderColor: mixColor(colors.accent, 0.25),
              borderRadius: mm(3),
              paddingHorizontal: mm(2.5),
              paddingVertical: mm(0.8),
            }}
          >
            {formatLangLabel(
              entry.fields.language?.trim() || "",
              entry.fields.proficiency?.trim() || ""
            )}
          </Text>
        ))}
      </View>
    );
  }

  // grid (default)
  return (
    <View style={{ marginTop: mm(1), gap: mm(1.4) }}>
      {validEntries.map((entry) => (
        <View
          key={entry.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: mm(3),
          }}
        >
          <Text
            style={{
              fontSize: bodyPt(base),
              color: colors.body,
              fontWeight: 600,
            }}
          >
            {entry.fields.language?.trim() || "Language"}
          </Text>
          <Text style={{ fontSize: datePt(base), color: colors.dates }}>
            {localizeProf(entry.fields.proficiency?.trim() || "")}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PdfReferencesSection({
  section,
  base,
  colors,
}: {
  section: ResumeSection;
  base: number;
  colors: PdfColors;
}) {
  return (
    <View style={{ marginTop: mm(1), gap: mm(2) }}>
      {section.entries.map((entry) => {
        const f = entry.fields;
        if (!Object.values(f).some(Boolean)) return null;
        return (
          <View key={entry.id}>
            <Text
              style={{
                fontSize: bodyPt(base),
                fontWeight: 700,
                color: colors.name,
              }}
            >
              {f.name || "Reference"}
            </Text>
            <Text style={{ fontSize: datePt(base), color: colors.subtitle }}>
              {[f.position, f.company].filter(Boolean).join(" · ")}
            </Text>
            <Text style={{ fontSize: datePt(base), color: colors.dates }}>
              {[f.phone, f.email].filter(Boolean).join(" · ")}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function PdfDeclarationSection({
  section,
  base,
  colors,
  lineHeight,
}: {
  section: ResumeSection;
  base: number;
  colors: PdfColors;
  lineHeight: number;
}) {
  const entry = section.entries?.[0];
  if (!entry) return null;
  const f = entry.fields;
  return (
    <View style={{ marginTop: mm(1) }}>
      <PdfHtmlBlock
        html={f.description}
        fontSize={bodyPt(base)}
        color={colors.body}
        lineHeight={lineHeight}
      />
      {f.signature && (
        <Image
          src={f.signature}
          style={{ height: mm(12), marginTop: mm(2), objectFit: "contain" }}
        />
      )}
      {(f.fullName || f.place || f.date) && (
        <Text
          style={{
            fontSize: skillPt(base),
            color: colors.subtitle,
            marginTop: mm(2),
          }}
        >
          {[f.fullName, f.place, f.date].filter(Boolean).join(" · ")}
        </Text>
      )}
    </View>
  );
}

/* ── Patterned entry renderer (experience, education, etc.) ── */

function PdfPatternedEntries({
  section,
  c,
  base,
  colors,
  lineHeight,
}: {
  section: ResumeSection;
  c?: CustomizeSettings;
  base: number;
  colors: PdfColors;
  lineHeight: number;
}) {
  const layout = c?.entryLayout ?? "stacked";
  const tsSize = c?.titleSubtitleSize ?? "m";
  const subStyle = c?.subtitleStyle ?? "normal";
  const subPlace = c?.subtitlePlacement ?? "next-line";
  const listSt = c?.listStyle ?? "bullet";

  const titleFS = entryTitlePt(base, tsSize);
  const subtitleFS = entrySubtitlePt(base, tsSize);
  const subtitleFW = subStyle === "bold" ? 700 : 400;
  const subtitleFSty = subStyle === "italic" ? ("italic" as const) : ("normal" as const);
  const entryGap = layout === "compact" ? mm(1.6) : mm(2.8);

  // --- Group promotions for experience ---
  if (section.type === "experience" && c?.groupPromotions) {
    type EntryGroup = { company: string; entries: ResumeSectionEntry[] };
    const groups: EntryGroup[] = [];
    for (const entry of section.entries) {
      const f = entry.fields;
      if (!Object.values(f).some(Boolean)) continue;
      const comp = (f.company || "").trim();
      const last = groups[groups.length - 1];
      if (last && last.company && last.company === comp) {
        last.entries.push(entry);
      } else {
        groups.push({ company: comp, entries: [entry] });
      }
    }

    return (
      <View style={{ marginTop: mm(1), gap: entryGap }}>
        {groups.map((group, gi) => {
          if (group.entries.length === 1) {
            const entry = group.entries[0];
            return (
              <PdfSingleEntry
                key={entry.id}
                entry={entry}
                section={section}
                c={c}
                base={base}
                colors={colors}
                lineHeight={lineHeight}
                layout={layout}
                titleFS={titleFS}
                subtitleFS={subtitleFS}
                subtitleFW={subtitleFW}
                subtitleFSty={subtitleFSty}
                subPlace={subPlace}
                listSt={listSt}
              />
            );
          }

          // Grouped entries (promotions at same company)
          const firstEntry = group.entries[group.entries.length - 1];
          const lastEntry = group.entries[0];
          const groupStart = [
            firstEntry.fields.startMonth?.slice(0, 3),
            firstEntry.fields.startYear,
          ]
            .filter(Boolean)
            .join(" ");
          const groupEnd =
            lastEntry.fields.currentlyHere === "true"
              ? "Present"
              : [
                  lastEntry.fields.endMonth?.slice(0, 3),
                  lastEntry.fields.endYear,
                ]
                  .filter(Boolean)
                  .join(" ");

          return (
            <View key={`group-${gi}`}>
              <View minPresenceAhead={20}>
                <Text
                  style={{
                    fontSize: titleFS,
                    fontWeight: 700,
                    color: colors.name,
                  }}
                >
                  {group.company || "Company"}
                </Text>
              </View>
              <View style={{ marginTop: mm(1.5), gap: mm(2) }}>
                {group.entries.map((entry) => {
                  const f = entry.fields;
                  const roleDate = formatDateRange(f, c?.language) || f.date || "";
                  return (
                    <View key={entry.id}>
                      <View
                        wrap={false}
                        minPresenceAhead={20}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: mm(4),
                        }}
                      >
                        <Text
                          style={{
                            fontSize: subtitleFS,
                            fontWeight: 600,
                            fontStyle: "italic",
                            color: colors.name,
                          }}
                        >
                          {f.position || "Role"}
                        </Text>
                        <View style={{ alignItems: "flex-end", flexShrink: 0 }}>
                          {roleDate ? (
                            <Text
                              style={{
                                fontSize: subtitleFS,
                                color: colors.dates,
                              }}
                            >
                              {roleDate}
                            </Text>
                          ) : null}
                          {f.location ? (
                            <Text
                              style={{
                                fontSize: subtitleFS,
                                color: colors.subtitle,
                              }}
                            >
                              {f.location}
                            </Text>
                          ) : null}
                        </View>
                      </View>
                      <PdfHtmlBlock
                        html={f.description}
                        fontSize={bodyPt(base)}
                        color={colors.body}
                        lineHeight={lineHeight}
                        listStyle={listSt}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  // Standard entries
  return (
    <View style={{ marginTop: mm(1), gap: entryGap }}>
      {section.entries.map((entry) => {
        if (!Object.values(entry.fields).some(Boolean)) return null;
        return (
          <PdfSingleEntry
            key={entry.id}
            entry={entry}
            section={section}
            c={c}
            base={base}
            colors={colors}
            lineHeight={lineHeight}
            layout={layout}
            titleFS={titleFS}
            subtitleFS={subtitleFS}
            subtitleFW={subtitleFW}
            subtitleFSty={subtitleFSty}
            subPlace={subPlace}
            listSt={listSt}
          />
        );
      })}
    </View>
  );
}

function PdfSingleEntry({
  entry,
  section,
  c,
  base,
  colors,
  lineHeight,
  layout,
  titleFS,
  subtitleFS,
  subtitleFW,
  subtitleFSty,
  subPlace,
  listSt,
}: {
  entry: ResumeSectionEntry;
  section: ResumeSection;
  c?: CustomizeSettings;
  base: number;
  colors: PdfColors;
  lineHeight: number;
  layout: string;
  titleFS: number;
  subtitleFS: number;
  subtitleFW: number;
  subtitleFSty: "italic" | "normal";
  subPlace: string;
  listSt: string;
}) {
  const f = entry.fields;

  let primaryText: string;
  let secondaryText: string | undefined;

  if (section.type === "education") {
    const order = c?.educationOrder ?? "degree-first";
    primaryText =
      order === "degree-first" ? f.degree || "" : f.institution || "";
    secondaryText =
      order === "degree-first" ? f.institution || "" : f.degree || "";
  } else if (section.type === "experience") {
    const order = c?.experienceOrder ?? "title-first";
    primaryText =
      order === "title-first" ? f.position || "" : f.company || "";
    secondaryText =
      order === "title-first" ? f.company || "" : f.position || "";
  } else {
    primaryText = f.name || f.title || "";
    secondaryText =
      f.company || f.institution || f.issuer || f.publisher || f.role || "";
  }

  const date = formatDateRange(f, c?.language) || f.date || "";

  if (layout === "inline") {
    const headline = [primaryText, secondaryText].filter(Boolean).join(" · ");
    return (
      <View>
        {/* Keep title row together + ensure at least 1 line follows on same page */}
        <View
          wrap={false}
          minPresenceAhead={20}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: mm(4),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline", flex: 1 }}>
            <Text style={{ fontSize: titleFS, fontWeight: 700, color: colors.name }}>
              {headline || "Entry"}
            </Text>
            {date ? (
              <Text
                style={{
                  fontSize: subtitleFS,
                  fontWeight: 400,
                  color: colors.dates,
                  marginLeft: mm(3),
                }}
              >
                {date}
              </Text>
            ) : null}
          </View>
        </View>
        {f.location && (
          <Text
            style={{
              fontSize: subtitleFS,
              color: colors.subtitle,
              fontWeight: subtitleFW,
              fontStyle: subtitleFSty,
              marginTop: mm(0.5),
            }}
          >
            {f.location}
          </Text>
        )}
        <PdfHtmlBlock
          html={f.description}
          fontSize={bodyPt(base)}
          color={colors.body}
          lineHeight={lineHeight}
          listStyle={listSt}
        />
      </View>
    );
  }

  if (layout === "academic") {
    return (
      <View>
        {/* Keep title + subtitle together + ensure content follows */}
        <View wrap={false} minPresenceAhead={20}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={{ fontSize: titleFS, fontWeight: 700, color: colors.name }}>
              {primaryText || "Entry"}
            </Text>
            {date ? (
              <Text
                style={{
                  fontSize: subtitleFS,
                  fontWeight: 400,
                  color: colors.dates,
                  marginLeft: mm(3),
                }}
              >
                {date}
              </Text>
            ) : null}
          </View>
          {secondaryText && (
            <Text
              style={{
                fontSize: subtitleFS,
                color: colors.subtitle,
                fontStyle: "italic",
                marginTop: mm(0.3),
              }}
            >
              {secondaryText}
            </Text>
          )}
          {f.location && (
            <Text
              style={{
                fontSize: subtitleFS,
                color: colors.subtitle,
                fontStyle: "italic",
                marginTop: mm(0.3),
              }}
            >
              {f.location}
            </Text>
          )}
        </View>
        {/* Description wraps across pages naturally */}
        <PdfHtmlBlock
          html={f.description}
          fontSize={bodyPt(base)}
          color={colors.body}
          lineHeight={lineHeight}
          listStyle={listSt}
        />
      </View>
    );
  }

  // stacked / compact (default)
  return (
    <View>
      {/* Keep title + subtitle + date together + ensure content follows */}
      <View
        wrap={false}
        minPresenceAhead={20}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: mm(4),
        }}
      >
        <View style={{ flex: 1 }}>
          {subPlace === "same-line" ? (
            <Text
              style={{
                fontSize: titleFS,
                fontWeight: 700,
                color: colors.name,
              }}
            >
              {primaryText || "Entry"}
              {secondaryText ? (
                <Text
                  style={{
                    fontWeight: subtitleFW,
                    fontStyle: subtitleFSty,
                    color: colors.subtitle,
                  }}
                >
                  {" · "}{secondaryText}
                </Text>
              ) : null}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  fontSize: titleFS,
                  fontWeight: 700,
                  color: colors.name,
                }}
              >
                {primaryText || "Entry"}
              </Text>
              {secondaryText && (
                <Text
                  style={{
                    fontSize: subtitleFS,
                    color: colors.subtitle,
                    fontWeight: subtitleFW,
                    fontStyle: subtitleFSty,
                    marginTop: mm(0.5),
                  }}
                >
                  {secondaryText}
                </Text>
              )}
            </>
          )}
        </View>
        {date && (
          <Text
            style={{
              fontSize: subtitleFS,
              color: colors.dates,
            }}
          >
            {date}
          </Text>
        )}
      </View>

      {f.location && (
        <Text
          style={{
            fontSize: subtitleFS,
            color: colors.subtitle,
            fontWeight: subtitleFW,
            fontStyle: subtitleFSty,
            marginTop: mm(0.5),
          }}
        >
          {f.location}
        </Text>
      )}

      {(f.url || f.link) && (
        <Link
          src={f.url || f.link || ""}
          style={{
            fontSize: subtitleFS,
            // Use colors.link so the `linkBlue` customize flag is honored here
            // too. Was previously hardcoded to colors.dates which ignored the flag.
            color: colors.link,
            marginTop: mm(0.5),
            textDecoration: c?.linkUnderline ? "underline" : "none",
          }}
        >
          {f.url || f.link}
        </Link>
      )}

      {/* Description wraps across pages naturally */}
      <PdfHtmlBlock
        html={f.description}
        fontSize={bodyPt(base)}
        color={colors.body}
        lineHeight={lineHeight}
        listStyle={listSt}
      />
    </View>
  );
}

/* ── Section renderer dispatcher ─────────────────────────── */

function PdfSectionEntries({
  section,
  c,
  base,
  colors,
  lineHeight,
}: {
  section: ResumeSection;
  c?: CustomizeSettings;
  base: number;
  colors: PdfColors;
  lineHeight: number;
}) {
  if (section.type === "summary") {
    return (
      <PdfHtmlBlock
        html={section.entries?.[0]?.fields?.description}
        fontSize={bodyPt(base)}
        color={colors.body}
        lineHeight={lineHeight}
      />
    );
  }

  if (section.type === "skills" || section.type === "interests") {
    return (
      <PdfSkillsSection section={section} c={c} base={base} colors={colors} />
    );
  }

  if (section.type === "languages") {
    return (
      <PdfLanguagesSection
        section={section}
        c={c}
        base={base}
        colors={colors}
      />
    );
  }

  if (section.type === "references") {
    return (
      <PdfReferencesSection section={section} base={base} colors={colors} />
    );
  }

  if (section.type === "declaration") {
    return (
      <PdfDeclarationSection
        section={section}
        base={base}
        colors={colors}
        lineHeight={lineHeight}
      />
    );
  }

  if (section.type === "custom") {
    return (
      <View style={{ marginTop: mm(1), gap: mm(2) }}>
        {section.entries.map((entry) => (
          <PdfHtmlBlock
            key={entry.id}
            html={entry.fields.description}
            fontSize={bodyPt(base)}
            color={colors.body}
            lineHeight={lineHeight}
          />
        ))}
      </View>
    );
  }

  // Patterned types
  const patternedTypes = new Set([
    "experience",
    "education",
    "courses",
    "certificates",
    "projects",
    "awards",
    "organisations",
    "publications",
  ]);

  if (patternedTypes.has(section.type)) {
    return (
      <PdfPatternedEntries
        section={section}
        c={c}
        base={base}
        colors={colors}
        lineHeight={lineHeight}
      />
    );
  }

  return null;
}

/* ── Section block with page break control ───────────────── */

/**
 * Wraps a section heading + entries with orphan protection.
 *
 * - `minPresenceAhead={20}` on the heading wrapper ensures at least ~20pt
 *   of content follows on the current page (prevents a completely orphaned
 *   heading). Matches the preview's spaceAfterHeading < 20px threshold.
 *
 * - Only entry *title rows* use `wrap={false}` so the title/date line stays
 *   together. Description content (PdfHtmlBlock) wraps freely line by line.
 */
// Section types that use small grid rows (~5mm) — hoisted to avoid per-render allocation
const SHORT_ROW_TYPES = new Set(["skills", "languages", "interests", "certificates", "courses", "awards"]);

function PdfSectionBlock({
  section,
  c,
  baseFontSize,
  colors,
  fontFamily,
  lineHeight,
  sectionSpacing,
  isFirst,
}: {
  section: ResumeSection;
  c?: CustomizeSettings;
  baseFontSize: number;
  colors: PdfColors;
  fontFamily: string;
  lineHeight: number;
  sectionSpacing: number;
  isFirst?: boolean;
}) {
  const title =
    section.type === "custom" && section.entries?.[0]?.fields?.sectionTitle
      ? section.entries[0].fields.sectionTitle
      : section.title;

  // Skills/languages/interests rows are wrap={false} so they won't orphan.
  // Setting minPresenceAhead=0 lets the heading anchor wherever it fits;
  // rows flow naturally without pushing the entire section to the next page.
  // Other section types keep 20pt to prevent orphan headings.
  const headingPresence = SHORT_ROW_TYPES.has(section.type) ? 0 : 20;

  return (
    // marginTop (not marginBottom) keeps trailing margin OUT of endOfPresence.
    // react-pdf's breakingImprovesPresence heuristic fires when
    //   endOfPresence = top + height + marginBottom > pageHeight
    // even if the section content alone fits on the page. Using marginTop means
    //   endOfPresence = top + height  (no trailing margin added)
    // so the heuristic can't push the section to page 2 when there's room for it.
    <View wrap={true} style={{ marginTop: isFirst ? 0 : mm(sectionSpacing) }}>
      {section.showHeading !== false && (
        <View minPresenceAhead={headingPresence}>
          <PdfSectionHeading
            title={title}
            c={c}
            base={baseFontSize}
            colors={colors}
            fontFamily={fontFamily}
          />
        </View>
      )}
      <PdfSectionEntries
        section={section}
        c={c}
        base={baseFontSize}
        colors={colors}
        lineHeight={lineHeight}
      />
    </View>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Document Component
   ═══════════════════════════════════════════════════════════ */

interface ResumePDFProps {
  data: ResumeData;
  customize?: CustomizeSettings;
}

export function ResumePDF({ data, customize }: ResumePDFProps) {
  const safe = safeData(data);
  const p = safe.personalDetails;
  const c = customize;
  const colors = resolveColors(c);
  const baseFontSize = c?.fontSize ?? 10.5;
  const lineHeight = c?.lineHeight ?? 1.5;

  // Resolve body font. If the resume has any CJK content, pick the best CJK
  // family (TC / SC / JP / KR) based on script signal, but only use it if it
  // actually registered. Otherwise fall back to the user-chosen Latin body
  // font — CJK glyphs will render as tofu squares, which is strictly better
  // than crashing the preview.
  const resolvedCjkFamily = resolveResumeCJKFamily(safe);
  const bodyFontFamily = resolvedCjkFamily && REGISTERED_FONTS.has(resolvedCjkFamily)
    ? resolvedCjkFamily
    : ensureFontRegistered(c?.bodyFont || "'Source Sans 3', sans-serif");

  // Page dimensions
  const pageFormat = c?.pageFormat || "a4";
  const pageSize =
    pageFormat === "letter"
      ? ([215.9 * MM_TO_PT, 279.4 * MM_TO_PT] as [number, number])
      : "A4";

  const marginX = c?.marginX ?? 16;
  const marginY = c?.marginY ?? 16;
  const headerSafe = 4;
  // When footer is shown, increase bottom clearance so content doesn't overlap it.
  // Footer sits at bottom: mm(marginY + 1); text height ≈ 3mm → needs ~8mm total safe zone.
  const hasFooter = !!(c?.showPageNumbers || c?.showFooterEmail || c?.showFooterName);
  const footerSafe = hasFooter ? 8 : 4;

  // Section ordering
  const orderedSections = normalizeSectionOrder(safe.sections, c);

  // Two-column support
  const isTwoColumn = c?.columns === "two" || c?.columns === "mix";
  const ratio = Math.min(8, Math.max(3, c?.columnRatio || 4));
  const sidebarTypes = new Set([
    "skills",
    "languages",
    "interests",
    "certificates",
    "courses",
    "awards",
  ]);
  const sidebarSections = isTwoColumn
    ? orderedSections.filter((s) => sidebarTypes.has(s.type))
    : [];
  const mainSections = isTwoColumn
    ? orderedSections.filter((s) => !sidebarTypes.has(s.type))
    : orderedSections;

  const titleSameLine = c?.titleSameLine === true && !!p.professionalTitle;

  // Contact items
  const contactItems: { text: string; href?: string }[] = [];
  if (p.email) contactItems.push({ text: p.email, href: `mailto:${p.email}` });
  if (p.phone) contactItems.push({ text: p.phone, href: `tel:${p.phone}` });
  if (p.location) contactItems.push({ text: p.location });
  for (const extra of p.extras || []) {
    if (!extra.value?.trim()) continue;
    const t = (extra.type || "").toLowerCase();
    const href = extra.value.startsWith("http")
      ? extra.value
      : t.includes("linkedin") || t.includes("website")
        ? `https://${extra.value}`
        : undefined;
    contactItems.push({ text: extra.value, href });
  }

  const contactSep = c?.contactSeparator ?? "bar";
  const headerAlign = c?.headerAlign || "center";
  const textAlign =
    headerAlign === "right"
      ? ("right" as const)
      : headerAlign === "left"
        ? ("left" as const)
        : ("center" as const);

  const contactJustify =
    headerAlign === "right"
      ? ("flex-end" as const)
      : headerAlign === "left"
        ? ("flex-start" as const)
        : ("center" as const);

  // Name font
  const nameFontFamily =
    c?.nameFont === "creative" && c?.headingFont
      ? ensureFontRegistered(c.headingFont)
      : bodyFontFamily;

  const sectionSpacing = c?.sectionSpacing ?? 5;

  return (
    <Document>
      <Page
        size={pageSize}
        style={{
          fontFamily: bodyFontFamily,
          fontSize: baseFontSize,
          lineHeight,
          paddingTop: mm(marginY + headerSafe),
          paddingBottom: mm(marginY + footerSafe),
          paddingHorizontal: mm(marginX),
          backgroundColor: colors.background,
          color: colors.body,
        }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <View style={{ marginBottom: mm(4.5), textAlign }}>
          {(() => {
            const showPhoto = p.photo && c?.showPhoto !== false;
            const photoSizeMM =
              { s: 12, m: 18, l: 24 }[c?.photoSize || "m"] || 18;
            const photoShape = c?.photoShape || "circle";
            const photoBorderRadius =
              photoShape === "circle"
                ? mm(photoSizeMM / 2)
                : photoShape === "rounded"
                  ? mm(2)
                  : 0;

            const nameFontSize = NAME_SIZES[c?.nameSize || "s"];
            // Apply uppercase in JS, not via textTransform — react-pdf's
            // font subsetter builds the glyph set from the raw input string
            // BEFORE textTransform is applied, so uppercase glyphs get
            // excluded from the subset and render as blank.
            // Skip uppercase for CJK names — it garbles Chinese characters.
            const nameIsCJK = containsCJK(p.fullName);
            const displayName = nameIsCJK
              ? (p.fullName || "YOUR NAME")
              : (p.fullName || "YOUR NAME").toUpperCase();
            // Pick the right CJK family for THIS name (covers Chinese, Japanese
            // and Korean names). Only use it if the specific family actually
            // registered — otherwise the name falls back to the Latin name
            // font (tofu but won't crash).
            const nameCjkFamily = nameIsCJK ? pickCJKFamily(p.fullName || "") : null;
            const nameCanUseCjk = nameCjkFamily !== null && REGISTERED_FONTS.has(nameCjkFamily);
            const nameEl = (
              <Text
                style={{
                  fontSize: nameFontSize,
                  lineHeight: 1.3,
                  color: colors.name,
                  fontWeight: c?.nameBold !== false ? 700 : 400,
                  fontFamily: nameCanUseCjk ? nameCjkFamily : nameFontFamily,
                  letterSpacing: nameCanUseCjk ? nameFontSize * 0.02 : nameFontSize * 0.1,
                  textAlign,
                }}
              >
                {displayName}
              </Text>
            );

            const titleEl = p.professionalTitle ? (
              <Text
                style={{
                  fontSize: TITLE_SIZES[c?.titleSize || "m"],
                  lineHeight: 1.4,
                  color: colors.title,
                  marginTop: titleSameLine ? 0 : mm(1),
                  textAlign,
                }}
              >
                {p.professionalTitle}
              </Text>
            ) : null;

            const nameBlock = titleSameLine ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  gap: mm(3),
                  justifyContent: contactJustify,
                }}
              >
                {nameEl}
                {titleEl}
              </View>
            ) : (
              <View>
                {nameEl}
                {titleEl}
              </View>
            );

            const contacts =
              contactItems.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: mm(2.5),
                    columnGap: mm(4),
                    rowGap: mm(1),
                    justifyContent: contactJustify,
                    alignItems: "center",
                  }}
                >
                  {contactItems.map((item, i) => (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ContactSeparator
                        sep={contactSep}
                        index={i}
                        fontSize={contactPt(baseFontSize)}
                        color={colors.linkIcon}
                      />
                      {item.href ? (
                        <Link
                          src={item.href}
                          style={{
                            fontSize: contactPt(baseFontSize),
                            // Use `colors.link` which respects the
                            // `linkBlue` customize flag (blue vs body color).
                            color: colors.link,
                            textDecoration: c?.linkUnderline
                              ? "underline"
                              : "none",
                          }}
                        >
                          {item.text}
                        </Link>
                      ) : (
                        <Text
                          style={{
                            fontSize: contactPt(baseFontSize),
                            color: colors.linkIcon,
                          }}
                        >
                          {item.text}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              ) : null;

            if (showPhoto && p.photo) {
              return (
                <View
                  style={{
                    flexDirection:
                      headerAlign === "right" ? "row-reverse" : "row",
                    alignItems: "center",
                    gap: mm(4),
                    justifyContent:
                      headerAlign === "center" ? "center" : "flex-start",
                  }}
                >
                  <Image
                    src={p.photo}
                    style={{
                      width: mm(photoSizeMM),
                      height: mm(photoSizeMM),
                      borderRadius: photoBorderRadius,
                      objectFit: "cover",
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    {nameBlock}
                    {contacts}
                  </View>
                </View>
              );
            }

            return (
              <>
                {nameBlock}
                {contacts}
              </>
            );
          })()}
        </View>

        {/* ── Accent divider ─────────────────────────────── */}
        <View
          style={{
            height: mm(0.3),
            backgroundColor: mixColor(colors.accent, 0.2),
            marginBottom: mm(5),
          }}
        />

        {/* ── Body ───────────────────────────────────────── */}
        {isTwoColumn ? (
          <View
            style={{
              flexDirection: "row",
              gap: mm(sectionSpacing),
            }}
          >
            {/* Sidebar */}
            <View style={{ flex: ratio }}>
              {sidebarSections.map((section, i) => (
                <PdfSectionBlock
                  key={section.id}
                  section={section}
                  c={c}
                  baseFontSize={baseFontSize}
                  colors={colors}
                  fontFamily={bodyFontFamily}
                  lineHeight={lineHeight}
                  sectionSpacing={sectionSpacing}
                  isFirst={i === 0}
                />
              ))}
            </View>

            {/* Main */}
            <View style={{ flex: 12 - ratio }}>
              {mainSections.map((section, i) => (
                <PdfSectionBlock
                  key={section.id}
                  section={section}
                  c={c}
                  baseFontSize={baseFontSize}
                  colors={colors}
                  fontFamily={bodyFontFamily}
                  lineHeight={lineHeight}
                  sectionSpacing={sectionSpacing}
                  isFirst={i === 0}
                />
              ))}
            </View>
          </View>
        ) : (
          <>
            {mainSections.map((section, i) => (
              <PdfSectionBlock
                key={section.id}
                section={section}
                c={c}
                baseFontSize={baseFontSize}
                colors={colors}
                fontFamily={bodyFontFamily}
                lineHeight={lineHeight}
                sectionSpacing={sectionSpacing}
                isFirst={i === 0}
              />
            ))}
          </>
        )}

        {/* ── Footer ─────────────────────────────────────── */}
        {(c?.showPageNumbers || c?.showFooterName || c?.showFooterEmail) && (
          <View
            style={{
              position: "absolute",
              bottom: mm(marginY + 1),
              left: mm(marginX),
              right: mm(marginX),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              fixed
              style={{
                fontSize: smallPt(baseFontSize),
                color: colors.dates,
              }}
              render={() => (c?.showFooterName ? p.fullName : "")}
            />
            <Text
              fixed
              style={{
                fontSize: smallPt(baseFontSize),
                color: colors.dates,
              }}
              render={({ pageNumber, totalPages }) => {
                const parts: string[] = [];
                if (c?.showFooterEmail && p.email) parts.push(p.email);
                if (c?.showPageNumbers)
                  parts.push(`Page ${pageNumber} of ${totalPages}`);
                return parts.join(" · ");
              }}
            />
          </View>
        )}
      </Page>
    </Document>
  );
}
