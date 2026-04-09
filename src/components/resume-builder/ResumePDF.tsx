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
import { CJK_FONT_FAMILY, resumeHasCJK } from "@/lib/resumePdf/fontMap";

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

/* ── CJK font registration ────────────────────────────────── */

/**
 * Register Noto Sans TC for CJK glyph rendering in react-pdf.
 * Uses the variable TTF from Google Fonts GitHub — large (~16 MB) but
 * downloaded only when Chinese characters are detected in resume data.
 */
const CJK_FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf";

let cjkRegistrationPromise: Promise<boolean> | null = null;

async function registerCJKFont(): Promise<boolean> {
  if (REGISTERED_FONTS.has(CJK_FONT_FAMILY)) return true;
  if (cjkRegistrationPromise) return cjkRegistrationPromise;

  cjkRegistrationPromise = (async () => {
    try {
      const resp = await fetch(CJK_FONT_URL, { method: "HEAD" });
      if (!resp.ok) return false;

      Font.register({
        family: CJK_FONT_FAMILY,
        fonts: [
          { src: CJK_FONT_URL, fontWeight: 400 },
          // Re-use the same variable font file for bold — the variable axes
          // inside the TTF allow fontkit to select the correct weight.
          { src: CJK_FONT_URL, fontWeight: 700 },
        ],
      });
      REGISTERED_FONTS.add(CJK_FONT_FAMILY);
      return true;
    } catch (err) {
      console.warn("[ResumePDF] CJK font registration failed:", err);
      return false;
    }
  })();

  return cjkRegistrationPromise;
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
      const testResp = await fetch(testUrl, { method: "HEAD" });
      if (!testResp.ok) return "Helvetica";
    } catch {
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
    } catch {
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
 * Pre-register all fonts needed for a given set of settings.
 * MUST be called and awaited before creating the PDF document.
 */
export async function prepareFonts(c?: CustomizeSettings): Promise<void> {
  const families = new Set<string>();
  if (c?.bodyFont) families.add(c.bodyFont);
  if (c?.headingFont) families.add(c.headingFont);

  const results = await Promise.all(
    Array.from(families).map((f) => registerFontAsync(f))
  );

  // Log which fonts were resolved for debugging
  const familyArr = Array.from(families);
  for (let i = 0; i < familyArr.length; i++) {
    const requested = extractFontName(familyArr[i]);
    const resolved = results[i];
    if (resolved !== requested) {
      console.warn(`[ResumePDF] Font "${requested}" not available, using "${resolved}"`);
    }
  }
}

// Disable hyphenation — resumes should not hyphenate words
Font.registerHyphenationCallback((word) => [word]);

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
  return {
    accent: c?.accentColor ?? "#1e293b",
    name: c?.nameColor ?? "#111827",
    title: c?.titleColor ?? "#6B7280",
    headings: c?.headingsColor ?? "#111827",
    dates: c?.datesColor ?? "#6B7280",
    subtitle: c?.subtitleColor ?? "#6B7280",
    body: c?.bodyColor ?? "#374151",
    background: c?.a4Background ?? "#ffffff",
    linkIcon: c?.linkIconColor ?? "#4B5563",
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

function formatDateRange(fields: Record<string, string>) {
  const start = [fields.startMonth?.slice(0, 3), fields.startYear]
    .filter(Boolean)
    .join(" ");
  const end =
    fields.currentlyHere === "true"
      ? "Present"
      : [fields.endMonth?.slice(0, 3), fields.endYear]
          .filter(Boolean)
          .join(" ");
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
  const displayTitle = uppercase ? title.toUpperCase() : title;

  const headingFontFamily = c?.headingFont
    ? ensureFontRegistered(c.headingFont)
    : fontFamily;

  const textStyle = {
    fontSize,
    color: style === "background" ? "#ffffff" : colors.headings,
    fontFamily: headingFontFamily,
    fontWeight: 700 as const,
    letterSpacing: fontSize * 0.08,
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

  const formatLangLabel = (lang: string, prof: string) => {
    if (!prof) return lang;
    if (subStyle === "dash") return `${lang} — ${prof}`;
    if (subStyle === "bracket") return `${lang} (${prof})`;
    return `${lang}: ${prof}`;
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
            {entry.fields.proficiency?.trim()}
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
                  const roleDate = formatDateRange(f) || f.date || "";
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

  const date = formatDateRange(f) || f.date || "";

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
            color: colors.dates,
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

  // Resolve font
  const bodyFontFamily = ensureFontRegistered(
    c?.bodyFont || "'Source Sans 3', sans-serif"
  );

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
            const displayName = (p.fullName || "YOUR NAME").toUpperCase();
            const nameEl = (
              <Text
                style={{
                  fontSize: nameFontSize,
                  lineHeight: 1.3,
                  color: colors.name,
                  fontWeight: c?.nameBold !== false ? 700 : 400,
                  fontFamily: nameFontFamily,
                  letterSpacing: nameFontSize * 0.1,
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
                            color: colors.linkIcon,
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
