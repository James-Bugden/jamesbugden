export type FontCategory = "sans" | "serif" | "mono";

export interface FontDef {
  name: string;
  family: string; // CSS font-family value
}

export const SANS_FONTS: FontDef[] = [
  { name: "Source Sans Pro", family: "'Source Sans 3', sans-serif" },
  { name: "Karla", family: "'Karla', sans-serif" },
  { name: "Mulish", family: "'Mulish', sans-serif" },
  { name: "Lato", family: "'Lato', sans-serif" },
  { name: "Titillium Web", family: "'Titillium Web', sans-serif" },
  { name: "Work Sans", family: "'Work Sans', sans-serif" },
  { name: "Barlow", family: "'Barlow', sans-serif" },
  { name: "Jost", family: "'Jost', sans-serif" },
  { name: "Fira Sans", family: "'Fira Sans', sans-serif" },
  { name: "Roboto", family: "'Roboto', sans-serif" },
  { name: "Rubik", family: "'Rubik', sans-serif" },
  { name: "Asap", family: "'Asap', sans-serif" },
  { name: "Nunito", family: "'Nunito', sans-serif" },
  { name: "Open Sans", family: "'Open Sans', sans-serif" },
  { name: "IBM Plex Sans", family: "'IBM Plex Sans', sans-serif" },
];

export const SERIF_FONTS: FontDef[] = [
  { name: "Merriweather", family: "'Merriweather', serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif" },
  { name: "Lora", family: "'Lora', serif" },
  { name: "PT Serif", family: "'PT Serif', serif" },
  { name: "Libre Baskerville", family: "'Libre Baskerville', serif" },
  { name: "Crimson Text", family: "'Crimson Text', serif" },
  { name: "EB Garamond", family: "'EB Garamond', serif" },
  { name: "Source Serif Pro", family: "'Source Serif 4', serif" },
];

export const MONO_FONTS: FontDef[] = [
  { name: "Fira Code", family: "'Fira Code', monospace" },
  // NOTE: "JetBrains Mono" was removed because fontkit (used by
  // @react-pdf/renderer) throws `RangeError: Offset is outside the bounds
  // of the DataView` when parsing fontsource's JetBrains Mono .woff file,
  // even though the file is a valid WOFF. Reproduced in the headless
  // matrix test (qa-tmp/matrix-headless.mjs). If fontkit is upgraded and
  // the issue is resolved, JetBrains Mono can be re-added with a quick
  // render-test to confirm.
  { name: "IBM Plex Mono", family: "'IBM Plex Mono', monospace" },
  { name: "Source Code Pro", family: "'Source Code Pro', monospace" },
];

/* Google Fonts URL — load all at once */
const ALL_FONT_NAMES = [
  ...SANS_FONTS,
  ...SERIF_FONTS,
  ...MONO_FONTS,
].map((f) => f.name.replace(/ /g, "+"));

export const GOOGLE_FONTS_URL = `https://fonts.googleapis.com/css2?${ALL_FONT_NAMES.map((n) => `family=${n}:wght@400;600;700`).join("&")}&display=swap`;

export function getFontsForCategory(cat: FontCategory): FontDef[] {
  switch (cat) {
    case "sans": return SANS_FONTS;
    case "serif": return SERIF_FONTS;
    case "mono": return MONO_FONTS;
  }
}
