#!/usr/bin/env node
/**
 * Check i18n drift between paired EN / ZH page files.
 *
 * For every `Foo.tsx` in src/pages/** with a sibling `FooZhTw.tsx`, compare
 * structural signals. String content is expected to differ (that's the
 * point), but structural signals should match: same number of links, same
 * hooks called, same components rendered, same SEO presence.
 *
 * Exit 0 = clean, 1 = drift found (useful for CI).
 * Prints a summary to stdout and writes a full markdown report to
 * `tmp/i18n-drift-report.md`.
 *
 * Usage:  node scripts/check-i18n-drift.js
 *         npm run i18n:drift
 *
 * No runtime deps. Node >= 18.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PAGES_DIRS = [
  "src/pages",
  "src/pages/toolkit",
  "src/pages/reviews",
];

/* ---------- collect pairs ---------- */
const pairs = [];
const unpairedEn = [];
const unpairedZh = [];

for (const rel of PAGES_DIRS) {
  const dir = path.join(ROOT, rel);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));
  const byBase = new Map();
  for (const f of files) {
    const isZh = f.endsWith("ZhTw.tsx");
    const base = isZh ? f.slice(0, -"ZhTw.tsx".length) : f.slice(0, -".tsx".length);
    if (!byBase.has(base)) byBase.set(base, {});
    byBase.get(base)[isZh ? "zh" : "en"] = path.join(dir, f);
  }
  for (const [base, entry] of byBase) {
    if (entry.en && entry.zh) pairs.push({ base, dir: rel, en: entry.en, zh: entry.zh });
    else if (entry.en) unpairedEn.push({ base, dir: rel, path: entry.en });
    else if (entry.zh) unpairedZh.push({ base, dir: rel, path: entry.zh });
  }
}

/* ---------- signal extractors ---------- */
function extractSignals(filepath) {
  const src = fs.readFileSync(filepath, "utf8");
  const lines = src.split("\n").length;
  const nonBlankLines = src.split("\n").filter((l) => l.trim() !== "").length;
  // Imports: unique module specifiers
  const importMatches = [...src.matchAll(/^import\s+.*?from\s+["']([^"']+)["']/gm)];
  const imports = new Set(importMatches.map((m) => m[1]));
  // React-router Links
  const linkToMatches = [...src.matchAll(/<Link\s+[^>]*?to=["']([^"']+)["']/g)];
  const linkTargets = linkToMatches.map((m) => m[1]);
  // External anchors
  const anchorMatches = [...src.matchAll(/<a\s+[^>]*?href=["']([^"']+)["']/g)];
  const anchorHrefs = anchorMatches.map((m) => m[1]);
  // Progress-tracking hook
  const progMatch = src.match(/useTrackGuideProgress\(\s*["']([^"']+)["']\s*\)/);
  const progressId = progMatch ? progMatch[1] : null;
  // Key component renders
  const hasSEO = /<SEO[\s/>]/.test(src);
  const hasShareButtons = /<GuideShareButtons[\s/>]/.test(src);
  const hasBottomCTA = /<GuideBottomCTA[\s/>]/.test(src);
  const hasSignInBanner = /<GuideSignInBanner[\s/>]/.test(src);
  // Hooks called at top level (rough)
  const hookCalls = [...src.matchAll(/\buse[A-Z]\w*\s*\(/g)].map((m) => m[0].replace(/\s*\($/, ""));
  return {
    filepath,
    lines,
    nonBlankLines,
    imports,
    linkTargets,
    anchorHrefs,
    progressId,
    hasSEO,
    hasShareButtons,
    hasBottomCTA,
    hasSignInBanner,
    hookCalls: new Set(hookCalls),
  };
}

/* ---------- diff pair ---------- */
// React / router utility hooks — parity differences are not meaningful drift.
const UTILITY_HOOKS = new Set([
  "useState", "useEffect", "useMemo", "useCallback", "useRef", "useContext",
  "useReducer", "useLayoutEffect", "useImperativeHandle", "useId",
  "useNavigate", "useLocation", "useSearchParams", "useParams",
  "useOutletContext",
]);

// If either side has < this many non-blank lines, assume it's the "already
// consolidated" thin-wrapper pattern (e.g. `SalaryDatabaseZhTw.tsx` is 38
// lines re-exporting a shared component with lang="zh"). Line-count drift
// isn't meaningful in that case.
const THIN_WRAPPER_LINE_THRESHOLD = 60;

function diffPair(pair) {
  const en = extractSignals(pair.en);
  const zh = extractSignals(pair.zh);
  const issues = [];
  const isThinWrapper = en.nonBlankLines < THIN_WRAPPER_LINE_THRESHOLD || zh.nonBlankLines < THIN_WRAPPER_LINE_THRESHOLD;

  // line-count drift (flag if >30% delta and neither side is a thin wrapper)
  const lineDelta = Math.abs(en.nonBlankLines - zh.nonBlankLines) / Math.max(en.nonBlankLines, zh.nonBlankLines);
  if (lineDelta > 0.3 && !isThinWrapper) {
    issues.push({
      severity: "warn",
      kind: "line-count",
      message: `Non-blank line count differs by ${Math.round(lineDelta * 100)}% (EN: ${en.nonBlankLines}, ZH: ${zh.nonBlankLines}). Content may have drifted.`,
    });
  }

  // link count parity
  if (en.linkTargets.length !== zh.linkTargets.length) {
    issues.push({
      severity: "warn",
      kind: "link-count",
      message: `Different number of <Link> elements (EN: ${en.linkTargets.length}, ZH: ${zh.linkTargets.length}).`,
    });
  }

  // anchor count parity
  if (en.anchorHrefs.length !== zh.anchorHrefs.length) {
    issues.push({
      severity: "warn",
      kind: "anchor-count",
      message: `Different number of <a href> elements (EN: ${en.anchorHrefs.length}, ZH: ${zh.anchorHrefs.length}).`,
    });
  }

  // progress-id collision
  if (en.progressId && zh.progressId && en.progressId === zh.progressId) {
    issues.push({
      severity: "error",
      kind: "progress-id-collision",
      message: `Both EN and ZH use the same useTrackGuideProgress id "${en.progressId}". ZH reads will log under the EN DB bucket.`,
    });
  }

  // progress-id only-one
  if (!!en.progressId !== !!zh.progressId) {
    issues.push({
      severity: "warn",
      kind: "progress-id-missing",
      message: `useTrackGuideProgress present in only one of the pair (EN: ${en.progressId || "—"}, ZH: ${zh.progressId || "—"}).`,
    });
  }

  // SEO parity
  if (en.hasSEO !== zh.hasSEO) {
    issues.push({
      severity: "error",
      kind: "seo-missing",
      message: `<SEO /> rendered in only one of the pair (EN: ${en.hasSEO}, ZH: ${zh.hasSEO}).`,
    });
  }

  // shared component parity
  const components = [
    { key: "hasShareButtons", name: "<GuideShareButtons>" },
    { key: "hasBottomCTA", name: "<GuideBottomCTA>" },
    { key: "hasSignInBanner", name: "<GuideSignInBanner>" },
  ];
  for (const c of components) {
    if (en[c.key] !== zh[c.key]) {
      issues.push({
        severity: "warn",
        kind: "component-parity",
        message: `${c.name} rendered in only one of the pair (EN: ${en[c.key]}, ZH: ${zh[c.key]}).`,
      });
    }
  }

  // hook-call parity — only flag custom hooks (skip React/router utility hooks)
  const onlyEn = [...en.hookCalls].filter((h) => !zh.hookCalls.has(h) && !UTILITY_HOOKS.has(h));
  const onlyZh = [...zh.hookCalls].filter((h) => !en.hookCalls.has(h) && !UTILITY_HOOKS.has(h));
  if ((onlyEn.length || onlyZh.length) && !isThinWrapper) {
    issues.push({
      severity: "warn",
      kind: "hook-parity",
      message: `Custom hook call sites differ. Only-EN: [${onlyEn.join(", ") || "—"}]. Only-ZH: [${onlyZh.join(", ") || "—"}].`,
    });
  }

  return { pair, en, zh, issues };
}

/* ---------- run ---------- */
const results = pairs.map(diffPair);

let errorCount = 0;
let warnCount = 0;
for (const r of results) {
  for (const i of r.issues) {
    if (i.severity === "error") errorCount++;
    else warnCount++;
  }
}

/* ---------- report ---------- */
const lines = [];
lines.push(`# i18n Drift Report`);
lines.push("");
lines.push(`Generated ${new Date().toISOString()}`);
lines.push("");
lines.push(`- **Pairs checked:** ${pairs.length}`);
lines.push(`- **Errors:** ${errorCount}`);
lines.push(`- **Warnings:** ${warnCount}`);
lines.push(`- **Unpaired EN files:** ${unpairedEn.length}${unpairedEn.length ? " — " + unpairedEn.map((u) => u.base).join(", ") : ""}`);
lines.push(`- **Unpaired ZH files:** ${unpairedZh.length}${unpairedZh.length ? " — " + unpairedZh.map((u) => u.base).join(", ") : ""}`);
lines.push("");

const withIssues = results.filter((r) => r.issues.length > 0);
if (withIssues.length === 0) {
  lines.push("All paired files are structurally in sync.");
} else {
  lines.push(`## ${withIssues.length} pair(s) have drift signals`);
  lines.push("");
  for (const r of withIssues) {
    lines.push(`### ${r.pair.base} \`(${r.pair.dir})\``);
    for (const i of r.issues) {
      const icon = i.severity === "error" ? "🔴" : "🟡";
      lines.push(`- ${icon} **${i.kind}** — ${i.message}`);
    }
    lines.push("");
  }
}

const reportDir = path.join(ROOT, "tmp");
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir);
const reportPath = path.join(reportDir, "i18n-drift-report.md");
fs.writeFileSync(reportPath, lines.join("\n"));

/* ---------- stdout summary ---------- */
console.log("");
console.log(`i18n-drift: ${pairs.length} pair(s) checked, ${errorCount} error(s), ${warnCount} warning(s).`);
if (unpairedEn.length) console.log(`Unpaired EN: ${unpairedEn.map((u) => u.base).join(", ")}`);
if (unpairedZh.length) console.log(`Unpaired ZH: ${unpairedZh.map((u) => u.base).join(", ")}`);
console.log(`Full report: tmp/i18n-drift-report.md`);
console.log("");

process.exit(errorCount > 0 ? 1 : 0);
