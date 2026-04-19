#!/usr/bin/env node
/**
 * Build pre-baked Noto Sans TC subset WOFFs.
 *
 * Takes the full Noto Sans TC regional-subset OTF files from the
 * notofonts/noto-cjk GitHub repo, subsets each down to the Taiwan MOE
 * 4,808 常用國字 character set (plus ASCII + CJK punctuation + full-width
 * forms), and writes WOFF output to public/fonts/.
 *
 * The resulting fonts are ~400-500 KB each (vs 1.4 MB for the full
 * fontsource version), which parses in fontkit fast enough (~500ms-1s)
 * to survive synchronous main-thread use in the preview pipeline.
 *
 * Usage:  node scripts/build-cjk-subset.mjs
 *         (or `npm run build:cjk-subset` once the package.json script is wired)
 *
 * Produces:
 *   public/fonts/noto-sans-tc-subset-400.woff
 *   public/fonts/noto-sans-tc-subset-700.woff
 *
 * These files are committed to the repo and served as static assets.
 * Re-run only if the MOE char list changes (rare).
 *
 * No runtime deps. Uses `subset-font` (devDep) which wraps harfbuzz-subset
 * via wasm — works on Windows/Mac/Linux with just Node, no Python.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Noto Sans TC regional subset OTFs from Adobe's official noto-cjk GitHub.
// These files are themselves ~5-7 MB (already region-subsetted to TC-relevant
// glyphs ~13k), but we need a SMALLER subset (~4.8k) to parse fast enough.
const SOURCES = [
  {
    weight: 400,
    url: "https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/TC/NotoSansTC-Regular.otf",
    out: "public/fonts/noto-sans-tc-subset-400.woff2",
  },
  {
    weight: 700,
    url: "https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/TC/NotoSansTC-Bold.otf",
    out: "public/fonts/noto-sans-tc-subset-700.woff2",
  },
];

// Character set to keep:
// 1. Taiwan MOE 4,808 常用國字 from scripts/moe-common-chars.txt
// 2. ASCII printable + Latin-1 Supplement (so Latin text mixed with CJK
//    falls back gracefully inside the same font)
// 3. CJK punctuation + full-width forms
async function loadCharSet() {
  const moeRaw = await fs.readFile(path.join(ROOT, "scripts", "moe-common-chars.txt"), "utf8");
  // Strip the title line + whitespace; keep only CJK-Unified codepoints.
  const moeChars = new Set();
  for (const ch of moeRaw) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    // CJK Unified + Ext A + Compat
    if ((cp >= 0x3400 && cp <= 0x4dbf) || (cp >= 0x4e00 && cp <= 0x9fff) || (cp >= 0xf900 && cp <= 0xfaff)) {
      moeChars.add(ch);
    }
  }

  // ASCII printable (space through tilde)
  for (let cp = 0x20; cp <= 0x7e; cp++) moeChars.add(String.fromCodePoint(cp));
  // Latin-1 Supplement printable range
  for (let cp = 0xa0; cp <= 0xff; cp++) moeChars.add(String.fromCodePoint(cp));
  // General Punctuation (en-dash, em-dash, bullet, etc.)
  for (let cp = 0x2000; cp <= 0x206f; cp++) moeChars.add(String.fromCodePoint(cp));
  // CJK Symbols and Punctuation (fullwidth comma, period, quotes, etc.)
  for (let cp = 0x3000; cp <= 0x303f; cp++) moeChars.add(String.fromCodePoint(cp));
  // Halfwidth and Fullwidth Forms (fullwidth ASCII alternatives)
  for (let cp = 0xff00; cp <= 0xffef; cp++) moeChars.add(String.fromCodePoint(cp));

  return Array.from(moeChars).join("");
}

async function buildOne({ weight, url, out }, charText) {
  console.log(`\n[weight ${weight}] fetching ${url}`);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Fetch failed ${resp.status} for ${url}`);
  const sourceBuf = Buffer.from(await resp.arrayBuffer());
  console.log(`[weight ${weight}] source: ${(sourceBuf.length / 1024).toFixed(0)} KB`);

  console.log(`[weight ${weight}] subsetting to ${charText.length} chars via harfbuzz-subset…`);
  const subsetBuf = await subsetFont(sourceBuf, charText, {
    targetFormat: "woff2",
    // Drop OpenType layout feature expansion — for Chinese we don't need
    // ligatures / contextual alternates / stylistic sets, and those tables
    // balloon the file size. Glyph shapes stay intact.
    noLayoutClosure: true,
  });

  const outPath = path.join(ROOT, out);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, subsetBuf);
  console.log(`[weight ${weight}] ✓ wrote ${out} (${(subsetBuf.length / 1024).toFixed(0)} KB)`);
  return subsetBuf.length;
}

async function main() {
  const charText = await loadCharSet();
  console.log(`Character set loaded: ${charText.length} chars total`);

  const results = [];
  for (const src of SOURCES) {
    results.push({ weight: src.weight, size: await buildOne(src, charText) });
  }

  console.log("\n=== Summary ===");
  for (const r of results) {
    console.log(`  weight ${r.weight}: ${(r.size / 1024).toFixed(0)} KB`);
  }
  console.log("\nRe-run only if scripts/moe-common-chars.txt changes or the upstream Noto Sans TC is revised.");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
