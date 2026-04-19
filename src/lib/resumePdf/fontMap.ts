/**
 * Maps Google Font CSS families to PDF-safe built-in fonts.
 * @react-pdf/renderer ships with Helvetica, Times-Roman, Courier by default.
 * We map user-chosen fonts to the closest built-in family for reliable export.
 *
 * Also exports CJK script detection used by ResumePDF to pick the right
 * Noto font (Traditional vs Simplified Chinese vs Japanese vs Korean).
 *
 * See also: `C:\Users\jbbug\My Drive\Vault-Sync\James AI OS\CJK Font Pipeline Deep Dive.md`
 * for the architecture decisions behind this file.
 */

const SANS_MAP: Record<string, string> = {
  "Source Sans 3": "Helvetica",
  "Karla": "Helvetica",
  "Mulish": "Helvetica",
  "Lato": "Helvetica",
  "Titillium Web": "Helvetica",
  "Work Sans": "Helvetica",
  "Barlow": "Helvetica",
  "Jost": "Helvetica",
  "Fira Sans": "Helvetica",
  "Roboto": "Helvetica",
  "Rubik": "Helvetica",
  "Asap": "Helvetica",
  "Nunito": "Helvetica",
  "Open Sans": "Helvetica",
  "IBM Plex Sans": "Helvetica",
};

const SERIF_MAP: Record<string, string> = {
  "Merriweather": "Times-Roman",
  "Playfair Display": "Times-Roman",
  "Lora": "Times-Roman",
  "PT Serif": "Times-Roman",
  "Libre Baskerville": "Times-Roman",
  "Crimson Text": "Times-Roman",
  "EB Garamond": "Times-Roman",
  "Source Serif 4": "Times-Roman",
};

const MONO_MAP: Record<string, string> = {
  "Fira Code": "Courier",
  "JetBrains Mono": "Courier",
  "IBM Plex Mono": "Courier",
  "Source Code Pro": "Courier",
};

const ALL_MAP = { ...SANS_MAP, ...SERIF_MAP, ...MONO_MAP };

/* ───────── CJK font family constants ─────────
 * Registered lazily in ResumePDF.tsx when the resume contains the relevant
 * script. The resolver picks ONE family per resume based on which scripts
 * dominate — we don't split runs per character because react-pdf doesn't
 * do per-glyph fallback anyway and run-splitting is fragile.
 */
export const CJK_FONT_FAMILY_TC = "Noto Sans TC";
export const CJK_FONT_FAMILY_SC = "Noto Sans SC";
export const CJK_FONT_FAMILY_JP = "Noto Sans JP";
export const CJK_FONT_FAMILY_KR = "Noto Sans KR";

/** Back-compat default — callers that don't do script detection get TC. */
export const CJK_FONT_FAMILY = CJK_FONT_FAMILY_TC;

/** Union of all CJK family names — used for REGISTERED_FONTS.has() checks. */
export const ALL_CJK_FAMILIES = [
  CJK_FONT_FAMILY_TC,
  CJK_FONT_FAMILY_SC,
  CJK_FONT_FAMILY_JP,
  CJK_FONT_FAMILY_KR,
] as const;
export type CJKFamily = typeof ALL_CJK_FAMILIES[number];

/* ───────── Script detection ─────────
 * Why we don't try to distinguish TC vs SC purely by Unicode block:
 * CJK Unified Ideographs (U+4E00-U+9FFF) contains both — there's no clean
 * split. We use curated hint lists of characters that are MUCH more common
 * in one tradition than the other. If unambiguous Japanese kana (hiragana
 * or katakana) or Korean hangul is present we hard-classify accordingly.
 *
 * Order of precedence when resume has mixed signals:
 *   Hangul > Kana > SC-hint > TC-hint > default-TC (Taiwan audience)
 */

/** Any CJK-Unified / CJK Ext A / CJK Compat range — the broadest "is CJK" test. */
const RE_CJK_UNIFIED = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/** Japanese-specific kana (unambiguous). */
const RE_JP_KANA = /[\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff]/;

/** Korean hangul syllables + jamo + compat. */
const RE_KR_HANGUL = /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]/;

/** High-frequency Simplified-only characters — strong SC signal. */
const RE_SC_HINT = /[国个们这会来时对发说还没长见经过让钱学问东车飞书电视话图报军队动务华产开关业务师范头价买卖战争历]/;

/** High-frequency Traditional-only characters — strong TC signal. */
const RE_TC_HINT = /[國個們這會來時對發說還沒長見經過讓錢學問東車飛書電視話圖報軍隊動務華產開關業務師範頭價買賣戰爭歷]/;

/** Detect whether a string contains any CJK-range character. */
export function containsCJK(text: string): boolean {
  return RE_CJK_UNIFIED.test(text)
    || RE_JP_KANA.test(text)
    || RE_KR_HANGUL.test(text);
}

/** Detect whether a string contains Japanese-specific kana. */
export function containsJapanese(text: string): boolean {
  return RE_JP_KANA.test(text);
}

/** Detect whether a string contains Korean hangul. */
export function containsKorean(text: string): boolean {
  return RE_KR_HANGUL.test(text);
}

/** Detect a strong Simplified-Chinese signal (vs ambiguous CJK). */
export function containsSimplifiedHint(text: string): boolean {
  return RE_SC_HINT.test(text);
}

/** Detect a strong Traditional-Chinese signal. */
export function containsTraditionalHint(text: string): boolean {
  return RE_TC_HINT.test(text);
}

/**
 * Pick the right CJK family for a string of mixed content.
 * Returns null if the string has no CJK at all.
 *
 * Precedence: Hangul → JP kana → SC-hint → TC-hint → TC (default).
 */
export function pickCJKFamily(text: string): CJKFamily | null {
  if (containsKorean(text)) return CJK_FONT_FAMILY_KR;
  if (containsJapanese(text)) return CJK_FONT_FAMILY_JP;
  if (!RE_CJK_UNIFIED.test(text)) return null;
  if (containsSimplifiedHint(text) && !containsTraditionalHint(text)) return CJK_FONT_FAMILY_SC;
  return CJK_FONT_FAMILY_TC;
}

/* ───────── Resume-wide scans ───────── */

type ResumeShape = {
  personalDetails?: { fullName?: string; professionalTitle?: string; location?: string; extras?: { value?: string }[] };
  sections?: { entries?: { fields?: Record<string, string> }[] }[];
};

/** Extract every text field from the resume into a flat array. */
function collectResumeText(data: ResumeShape): string[] {
  const texts: string[] = [];
  const pd = data?.personalDetails;
  if (pd?.fullName) texts.push(pd.fullName);
  if (pd?.professionalTitle) texts.push(pd.professionalTitle);
  if (pd?.location) texts.push(pd.location);
  for (const ex of pd?.extras || []) {
    if (ex.value) texts.push(ex.value);
  }
  for (const sec of data?.sections || []) {
    for (const entry of sec.entries || []) {
      for (const v of Object.values(entry.fields || {})) {
        if (v) texts.push(v);
      }
    }
  }
  return texts;
}

/** Scan resume data and return true if any field contains CJK. */
export function resumeHasCJK(data: ResumeShape): boolean {
  return collectResumeText(data).some(containsCJK);
}

/**
 * Pick the single CJK family that best covers the resume.
 * Returns null if the resume has no CJK content.
 *
 * Precedence: Hangul > Japanese kana > Simplified-hint > Traditional-hint > TC default.
 * This picks one family per resume; we do NOT split text runs per character.
 */
export function resolveResumeCJKFamily(data: ResumeShape): CJKFamily | null {
  const texts = collectResumeText(data);
  if (texts.length === 0) return null;

  let hasKorean = false;
  let hasJapanese = false;
  let hasSCHint = false;
  let hasTCHint = false;
  let hasAnyCJK = false;

  for (const t of texts) {
    if (containsKorean(t)) hasKorean = true;
    if (containsJapanese(t)) hasJapanese = true;
    if (containsSimplifiedHint(t)) hasSCHint = true;
    if (containsTraditionalHint(t)) hasTCHint = true;
    if (!hasAnyCJK && RE_CJK_UNIFIED.test(t)) hasAnyCJK = true;
  }

  if (hasKorean) return CJK_FONT_FAMILY_KR;
  if (hasJapanese) return CJK_FONT_FAMILY_JP;
  if (!hasAnyCJK) return null;
  // Pick SC only when there's a clear Simplified signal AND no Traditional
  // signal — protects Taiwan (TC) users who mention one or two mainland-only
  // words in their resume.
  if (hasSCHint && !hasTCHint) return CJK_FONT_FAMILY_SC;
  return CJK_FONT_FAMILY_TC;
}

/* ───────── Built-in-font mapping helpers ───────── */

/**
 * Convert a CSS font-family string like "'Lora', serif" to a PDF-safe font name.
 */
export function toPdfFont(cssFamily: string): string {
  // Extract the first quoted font name
  const match = cssFamily.match(/['"]([^'"]+)['"]/);
  const name = match ? match[1] : cssFamily.split(",")[0].trim().replace(/['"]/g, "");
  return ALL_MAP[name] || "Helvetica";
}

/**
 * Get the bold variant name for a PDF built-in font.
 */
export function toPdfFontBold(pdfFont: string): string {
  if (pdfFont === "Times-Roman") return "Times-Bold";
  if (pdfFont === "Courier") return "Courier-Bold";
  return "Helvetica-Bold";
}

/**
 * Get the italic variant name for a PDF built-in font.
 */
export function toPdfFontItalic(pdfFont: string): string {
  if (pdfFont === "Times-Roman") return "Times-Italic";
  if (pdfFont === "Courier") return "Courier-Oblique";
  return "Helvetica-Oblique";
}
