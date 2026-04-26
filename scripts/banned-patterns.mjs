#!/usr/bin/env node
/**
 * banned-patterns.mjs — fails CI when a PR adds patterns we don't allow in main.
 *
 * Runs against the diff (vs origin/main by default), not the whole tree, so
 * legacy occurrences don't block unrelated PRs. We only fail on lines that
 * are NEW in this PR.
 *
 * Why each pattern:
 *   @ts-ignore / @ts-nocheck  — silently disables type checking, exact bug-class
 *                               we got burned on. Use @ts-expect-error with a
 *                               comment if you genuinely need it.
 *   debugger                  — left over from local debugging, ships to prod.
 *   .only(                    — focused tests in suites mean other tests skip
 *                               on CI silently.
 *   FIXME-NOW                 — sentinel for "must fix before merge" — agents
 *                               occasionally leave these in to remind themselves.
 *   console.log(              — verbose noise in prod console; the codebase
 *                               uses src/lib/logger.ts. Allowed inside scripts/
 *                               and src/test/.
 *   eslint-disable (file-level)— file-wide rule disable should be exceptional
 *                               and reviewed; line-level is fine.
 *
 * Pass --staged to scan staged changes (for pre-commit hook).
 * Pass --base <ref> to compare against a specific ref. Default origin/main.
 *
 * Exits non-zero with a per-file/line report on any violation.
 */

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const staged = args.includes("--staged");
const baseIdx = args.indexOf("--base");
const baseRef = baseIdx >= 0 ? args[baseIdx + 1] : "origin/main";

// Pattern → human-readable reason. Patterns are RegExp source.
const BANNED = [
  { pattern: /@ts-ignore\b/, reason: "use @ts-expect-error with a comment, not @ts-ignore" },
  { pattern: /@ts-nocheck\b/, reason: "@ts-nocheck disables type checking for the entire file" },
  { pattern: /^\s*debugger\s*;?\s*$/, reason: "remove `debugger` before committing" },
  { pattern: /\.only\s*\(/, reason: "remove `.only(` — focused tests skip the rest of the suite silently" },
  { pattern: /FIXME-NOW/, reason: "FIXME-NOW sentinel: resolve before merging" },
  { pattern: /^\s*console\.log\s*\(/, reason: "use src/lib/logger.ts instead of console.log (or move this file under scripts/ or src/test/)" },
  { pattern: /^\s*\/[*\/]\s*eslint-disable\s*$/, reason: "file-level eslint-disable: scope to a single line/rule instead" },
];

// Files where console.log etc. are legitimately allowed.
const ALLOW_PATHS = [
  /^scripts\//,
  /^src\/test\//,
  /^playwright\//,
  /\.config\.(ts|js|mjs)$/,
  /^src\/workers\/.*pdfRenderer/, // worker uses postMessage; intermediate console allowed
];

function isAllowedPath(path) {
  return ALLOW_PATHS.some((rx) => rx.test(path));
}

function getDiffFiles() {
  if (staged) {
    return execSync("git diff --cached --name-only --diff-filter=AM", { encoding: "utf8" })
      .split("\n").filter(Boolean);
  }
  // Fallback to working-tree diff if no upstream ref is reachable (local clone).
  try {
    execSync(`git rev-parse ${baseRef}`, { stdio: "ignore" });
  } catch {
    console.error(`banned-patterns: base ref ${baseRef} not reachable; nothing to scan`);
    process.exit(0);
  }
  return execSync(`git diff --name-only --diff-filter=AM ${baseRef}...HEAD`, { encoding: "utf8" })
    .split("\n").filter(Boolean);
}

function getAddedLines(file) {
  // Returns [{ lineNo, text }] for lines newly added in this file vs baseRef.
  const flag = staged ? "--cached" : `${baseRef}...HEAD`;
  const out = execSync(`git diff -U0 ${flag} -- ${JSON.stringify(file)}`, { encoding: "utf8" });
  const lines = out.split("\n");
  const added = [];
  let newLine = 0;
  for (const ln of lines) {
    const hunk = ln.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) {
      newLine = parseInt(hunk[1], 10);
      continue;
    }
    if (ln.startsWith("+++") || ln.startsWith("---")) continue;
    if (ln.startsWith("+")) {
      added.push({ lineNo: newLine, text: ln.slice(1) });
      newLine++;
    } else if (!ln.startsWith("-")) {
      newLine++;
    }
  }
  return added;
}

const files = getDiffFiles().filter((f) =>
  /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(f) && existsSync(f),
);

const violations = [];
for (const file of files) {
  if (isAllowedPath(file)) continue;
  const added = getAddedLines(file);
  for (const { lineNo, text } of added) {
    for (const { pattern, reason } of BANNED) {
      if (pattern.test(text)) {
        violations.push({ file, lineNo, snippet: text.trim().slice(0, 100), reason });
      }
    }
  }
}

if (violations.length === 0) {
  console.log(`banned-patterns: clean (${files.length} files scanned)`);
  process.exit(0);
}

console.error(`\nbanned-patterns: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.lineNo}`);
  console.error(`    > ${v.snippet}`);
  console.error(`    ${v.reason}\n`);
}
process.exit(1);
