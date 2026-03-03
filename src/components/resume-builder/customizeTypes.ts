export interface CustomizeSettings {
  // Basics
  language: string;
  dateFormat: string;
  pageFormat: string;
  template: string;

  // Layout & Spacing
  columns: "one" | "two" | "mix";
  columnRatio: number;   // sidebar cols out of 12 (e.g. 4 = 4/12 sidebar, 8/12 main)
  sectionOrder: string[];
  fontSize: number;      // pt
  lineHeight: number;
  marginX: number;       // mm
  marginY: number;       // mm
  sectionSpacing: number; // mm

  // Design
  colorMode: "basic" | "advanced" | "border";
  colorType: "accent" | "multi" | "image";
  accentColor: string;   // hex
  linkUnderline: boolean;
  linkBlue: boolean;
  linkIcon: boolean;
  linkIconStyle: "link" | "external";

  // Header
  headerAlign: "left" | "center" | "right";
  headerArrangement: "stacked" | "inline";
  contactSeparator: "icon" | "bullet" | "bar";
  iconStyle: number;
  nameSize: "xs" | "s" | "m" | "l" | "xl";
  nameBold: boolean;
  nameFont: "body" | "creative";
  titleSize: "s" | "m" | "l";
  titleSameLine: boolean;

  // Font
  bodyFont: string;
  headingFont: string;
}

export const DEFAULT_CUSTOMIZE: CustomizeSettings = {
  language: "en-GB",
  dateFormat: "MMM YYYY",
  pageFormat: "a4",
  template: "classic",

  columns: "one",
  columnRatio: 4,
  sectionOrder: [],
  fontSize: 11,
  lineHeight: 1.5,
  marginX: 16,
  marginY: 16,
  sectionSpacing: 5,

  colorMode: "basic",
  colorType: "accent",
  accentColor: "#1e293b",
  linkUnderline: true,
  linkBlue: true,
  linkIcon: false,
  linkIconStyle: "link",

  headerAlign: "center",
  headerArrangement: "stacked",
  contactSeparator: "icon",
  iconStyle: 0,
  nameSize: "s",
  nameBold: true,
  nameFont: "body",
  titleSize: "m",
  titleSameLine: false,

  bodyFont: "'Source Sans 3', sans-serif",
  headingFont: "'Source Sans 3', sans-serif",
};

export const ACCENT_COLORS = [
  // Row 1: neutrals
  "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b",
  // Row 2: blues & teals
  "#0ea5e9", "#0284c7", "#0369a1", "#0c4a6e", "#14b8a6", "#0d9488", "#0f766e", "#134e4a", "#22c55e", "#16a34a",
  // Row 3: dark blues
  "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#312e81", "#4338ca", "#4f46e5", "#6366f1", "#818cf8",
  // Row 4: purples & pinks
  "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#ef4444", "#dc2626",
];

export const LANGUAGE_OPTIONS = [
  { value: "en-GB", label: "English (UK)" },
  { value: "en-US", label: "English (US)" },
  { value: "zh-TW", label: "中文 (繁體)" },
  { value: "zh-CN", label: "中文 (简体)" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];

export const DATE_FORMAT_OPTIONS = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "MMM YYYY", label: "MMM YYYY" },
];

export const PAGE_FORMAT_OPTIONS = [
  { value: "a4", label: "A4" },
  { value: "letter", label: "US Letter" },
];
