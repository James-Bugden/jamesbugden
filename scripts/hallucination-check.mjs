#!/usr/bin/env node
/**
 * hallucination-check.mjs — fails CI when a PR introduces references
 * to things that don't exist.
 *
 * Catches the most common AI-agent failure mode: confidently writing
 * code that imports a package that isn't installed, references a
 * Supabase table that doesn't exist, or calls an env var that's never
 * been declared.
 *
 * Checks performed against lines newly added in the PR (vs origin/main):
 *
 *   1. Imports must resolve. Bare specifiers must appear in package.json
 *      dependencies/devDependencies. Relative paths must point to a
 *      file that exists (with .ts/.tsx/.js/.jsx/.mjs/index.* extension
 *      probing).
 *
 *   2. Supabase tables and RPCs must exist in
 *      src/integrations/supabase/types.ts (the generated schema is the
 *      source of truth).
 *
 *   3. Env-var references that look like VITE_*, SUPABASE_*, or other
 *      app-specific names must already be in use elsewhere or
 *      documented in a .env*.example file. Built-in vars (NODE_ENV,
 *      CI, DEV, MODE, PROD, SSR, etc.) are allowed.
 *
 * Anti-self-flag posture (added 2026-04-26 per HIR-72):
 *
 *   a) Self-exclusion: this script never scans its own source. Doc
 *      examples and error-message templates here would otherwise
 *      false-flag.
 *
 *   b) Comment + string-literal scrubbing: before regexing any source
 *      body, contents of line comments, block comments, and single /
 *      double / template-literal strings are replaced with spaces
 *      (preserving line offsets). Regexes match against the scrubbed
 *      buffer; the matched span is then re-extracted from the original
 *      to recover the actual import / table / env name. This means a
 *      doc-block example or a fixture string that looks like an import
 *      no longer trips the check, while a real import is still caught.
 *
 * Diff-aware so legacy occurrences don't block unrelated PRs. Pass
 * --base <ref> to compare against a specific ref (default origin/main).
 *
 * Exits non-zero with a per-violation report.
 */

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve, isAbsolute, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// ── Self-path resolution (used to skip our own file when scanning) ───
const SELF_REL_PATH = relative(process.cwd(), fileURLToPath(import.meta.url));

// ── Comment + string-literal scrubber ────────────────────────────────
// Replaces non-code character spans with spaces so the same byte offsets
// align with the original source. Line breaks are preserved verbatim.
//
// Note: this is a pragmatic scanner, not a full JS lexer. Regex-literal
// boundaries are not detected — a regex literal containing unbalanced
// quotes can confuse the state machine on the rest of the line. That
// is an accepted limitation; the script still catches the dominant
// false-positive sources (JSDoc examples, error-message templates,
// fixture strings).
export function stripCommentsAndStrings(src) {
  const out = new Array(src.length);
  const n = src.length;
  // States: code | line | block | sq | dq | tpl
  let state = "code";
  let i = 0;

  const blank = (c) => (c === "\n" ? "\n" : c === "\t" ? "\t" : " ");

  while (i < n) {
    const c = src[i];
    const c2 = i + 1 < n ? src[i + 1] : "";

    if (state === "code") {
      if (c === "/" && c2 === "/") {
        out[i] = " ";
        out[i + 1] = " ";
        i += 2;
        state = "line";
        continue;
      }
      if (c === "/" && c2 === "*") {
        out[i] = " ";
        out[i + 1] = " ";
        i += 2;
        state = "block";
        continue;
      }
      if (c === "'") { out[i] = c; i++; state = "sq"; continue; }
      if (c === '"') { out[i] = c; i++; state = "dq"; continue; }
      if (c === "`") { out[i] = c; i++; state = "tpl"; continue; }
      out[i] = c;
      i++;
      continue;
    }

    if (state === "line") {
      if (c === "\n") { out[i] = "\n"; i++; state = "code"; continue; }
      out[i] = blank(c);
      i++;
      continue;
    }

    if (state === "block") {
      if (c === "*" && c2 === "/") {
        out[i] = " ";
        out[i + 1] = " ";
        i += 2;
        state = "code";
        continue;
      }
      out[i] = blank(c);
      i++;
      continue;
    }

    // String / template states share most logic. Backslash escapes
    // consume the next character (preserving newline if it's a line
    // continuation). Unescaped newlines in single/double-quoted strings
    // close the string (per JS spec); template literals span newlines.
    if (state === "sq" || state === "dq" || state === "tpl") {
      if (c === "\\" && i + 1 < n) {
        out[i] = " ";
        out[i + 1] = src[i + 1] === "\n" ? "\n" : " ";
        i += 2;
        continue;
      }
      const closer = state === "sq" ? "'" : state === "dq" ? '"' : "`";
      if (c === closer) {
        out[i] = c;
        i++;
        state = "code";
        continue;
      }
      if ((state === "sq" || state === "dq") && c === "\n") {
        out[i] = "\n";
        i++;
        state = "code";
        continue;
      }
      out[i] = blank(c);
      i++;
      continue;
    }
  }

  return out.join("");
}

// ── Per-line regex helpers ───────────────────────────────────────────
// Each helper takes the SCRUBBED text (used for match positioning) and
// the ORIGINAL text (used to read the actual captured span). Because
// the scrubber preserves byte offsets, a match at index `m.index` in
// scrubbed corresponds to the same span in original.

// Two-regex pattern: a permissive `*_SCAN` regex matches the structural
// shape of the call against the scrubbed buffer (where string contents
// are spaces). A stricter `*_PICK` regex re-extracts and validates the
// real identifier from the original source at the same byte offsets.
const IMPORT_SCAN = /import(?:\s+[^"';]+\s+from)?\s*["']([^"']+)["']/g;
const IMPORT_PICK = /import(?:\s+[^"';]+\s+from)?\s*["']([^"']+)["']/;
const DYN_IMPORT_SCAN = /import\s*\(\s*["']([^"']+)["']/g;
const DYN_IMPORT_PICK = /import\s*\(\s*["']([^"']+)["']/;
const REQUIRE_SCAN = /require\s*\(\s*["']([^"']+)["']/g;
const REQUIRE_PICK = /require\s*\(\s*["']([^"']+)["']/;
const FROM_SCAN = /\.from\s*\(\s*["']([^"']+)["']/g;
const FROM_PICK = /\.from\s*\(\s*["']([a-z_][a-z0-9_]*)["']/;
const RPC_SCAN = /\.rpc\s*\(\s*["']([^"']+)["']/g;
const RPC_PICK = /\.rpc\s*\(\s*["']([a-z_][a-z0-9_]*)["']/;
// Env access reads an identifier in code (not inside a string), so the
// same regex works on scrubbed and original.
const ENV_SCAN = /(?:import\.meta\.env|process\.env)\.([A-Z][A-Z0-9_]*)/g;
const ENV_PICK = /(?:import\.meta\.env|process\.env)\.([A-Z][A-Z0-9_]*)/;

function captureFromOriginal(scrubbed, original, scanRe, pickRe) {
  const out = [];
  for (const m of scrubbed.matchAll(scanRe)) {
    const slice = original.substr(m.index, m[0].length);
    const m2 = slice.match(pickRe);
    if (m2 && m2[1]) out.push(m2[1]);
  }
  return out;
}

export function findImportSpecs(scrubbed, original) {
  return [
    ...captureFromOriginal(scrubbed, original, IMPORT_SCAN, IMPORT_PICK),
    ...captureFromOriginal(scrubbed, original, DYN_IMPORT_SCAN, DYN_IMPORT_PICK),
    ...captureFromOriginal(scrubbed, original, REQUIRE_SCAN, REQUIRE_PICK),
  ];
}

export function findFromCalls(scrubbed, original) {
  return captureFromOriginal(scrubbed, original, FROM_SCAN, FROM_PICK);
}

export function findRpcCalls(scrubbed, original) {
  return captureFromOriginal(scrubbed, original, RPC_SCAN, RPC_PICK);
}

export function findEnvVars(scrubbed, original) {
  return captureFromOriginal(scrubbed, original, ENV_SCAN, ENV_PICK);
}

// ── Schema / package / env loaders ───────────────────────────────────
function loadPackageJson() {
  return JSON.parse(readFileSync("package.json", "utf8"));
}

function loadSupabaseSchema() {
  const path = "src/integrations/supabase/types.ts";
  if (!existsSync(path)) return { tables: new Set(), functions: new Set() };
  const src = readFileSync(path, "utf8");

  const tables = new Set();
  const tablesBlock = src.match(/Tables:\s*\{([\s\S]*?)\n {4}\}/);
  if (tablesBlock) {
    for (const m of tablesBlock[1].matchAll(/^ {6}([a-z_][a-z0-9_]*):\s*\{/gm)) {
      tables.add(m[1]);
    }
  }

  const functions = new Set();
  const fnBlock = src.match(/Functions:\s*\{([\s\S]*?)\n {4}\}/);
  if (fnBlock) {
    for (const m of fnBlock[1].matchAll(/^ {6}([a-z_][a-z0-9_]*):/gm)) {
      functions.add(m[1]);
    }
  }

  return { tables, functions };
}

function loadKnownEnvVars(baseRef) {
  const known = new Set([
    "NODE_ENV", "CI", "DEV", "PROD", "MODE", "SSR", "BASE_URL",
    "GITHUB_ACTOR", "GITHUB_TOKEN", "GH_TOKEN",
    // GitHub Actions runner-provided + workflow-set variables.
    "GITHUB_REPOSITORY", "GITHUB_OUTPUT", "RUN_URL", "FAILED_URLS",
    "QA_BASE_URL", "QA_TEST_EMAIL", "QA_TEST_PASSWORD", "LOCAL",
  ]);

  for (const f of ["env.example", ".env.example", ".env.test.example"]) {
    if (existsSync(f)) {
      for (const line of readFileSync(f, "utf8").split("\n")) {
        const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=/);
        if (m) known.add(m[1]);
      }
    }
  }

  // Existing usage at baseRef (not HEAD): scanning at HEAD would let a
  // brand-new file's bogus env name "vouch for itself" — circular.
  try {
    const out = execSync(
      `git grep -hE "(import\\.meta\\.env|process\\.env)\\.[A-Z][A-Z0-9_]*" ${baseRef} -- 'src/**' 'scripts/**' 'playwright.config.ts' 'vite.config.ts'`,
      { encoding: "utf8" },
    );
    for (const m of out.matchAll(/(?:import\.meta\.env|process\.env)\.([A-Z][A-Z0-9_]*)/g)) {
      known.add(m[1]);
    }
  } catch {
    // git grep returns 1 on no matches — that's fine.
  }

  return known;
}

// ── Diff walker ──────────────────────────────────────────────────────
function getDiffFiles(baseRef) {
  try {
    execSync(`git rev-parse ${baseRef}`, { stdio: "ignore" });
  } catch {
    console.error(`hallucination-check: base ref ${baseRef} not reachable; nothing to scan`);
    process.exit(0);
  }
  return execSync(`git diff --name-only --diff-filter=AM ${baseRef}...HEAD`, { encoding: "utf8" })
    .split("\n").filter(Boolean)
    .filter((f) => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(f) && existsSync(f));
}

function getAddedLineNumbers(file, baseRef) {
  const out = execSync(
    `git diff -U0 ${baseRef}...HEAD -- ${JSON.stringify(file)}`,
    { encoding: "utf8" },
  );
  const added = new Set();
  let newLine = 0;
  for (const ln of out.split("\n")) {
    const hunk = ln.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) { newLine = parseInt(hunk[1], 10); continue; }
    if (ln.startsWith("+++") || ln.startsWith("---")) continue;
    if (ln.startsWith("+")) { added.add(newLine); newLine++; }
    else if (!ln.startsWith("-")) { newLine++; }
  }
  return added;
}

// ── Import resolution ────────────────────────────────────────────────
const NODE_BUILTINS = new Set([
  "node:fs", "node:path", "node:child_process", "node:url", "node:crypto",
  "node:stream", "node:os", "node:util", "node:events", "node:http",
  "node:https", "node:net", "node:tls", "node:zlib", "node:buffer",
  "node:process", "node:assert", "node:querystring", "node:readline",
  "fs", "path", "child_process", "url", "crypto", "stream", "os", "util",
  "events", "http", "https", "net", "tls", "zlib", "buffer", "process",
  "assert", "querystring", "readline",
]);

function packageNameOf(spec) {
  if (spec.startsWith("@")) {
    const parts = spec.split("/");
    return parts.slice(0, 2).join("/");
  }
  return spec.split("/")[0];
}

function checkImport(spec, fromFile, pkg) {
  if (NODE_BUILTINS.has(spec)) return null;
  // Accept any node: subpath (node:assert/strict, node:test/reporters, etc.).
  if (spec.startsWith("node:")) return null;

  // Vite/tsconfig path alias: '@/foo' resolves to './src/foo' (see
  // vite.config.ts and vitest.config.ts: alias: { "@": "./src" }).
  if (spec.startsWith("@/")) {
    const base = resolve(process.cwd(), "src", spec.slice(2));
    const candidates = [
      base,
      ...["ts", "tsx", "js", "jsx", "mjs", "cjs"].map((e) => `${base}.${e}`),
      ...["ts", "tsx", "js", "jsx", "mjs", "cjs"].map((e) => `${base}/index.${e}`),
    ];
    return candidates.some(existsSync) ? null : `alias import '${spec}' resolves to nothing under src/`;
  }

  if (spec.startsWith(".") || isAbsolute(spec)) {
    const base = isAbsolute(spec) ? spec : resolve(dirname(fromFile), spec);
    const candidates = [
      base,
      ...["ts", "tsx", "js", "jsx", "mjs", "cjs"].map((e) => `${base}.${e}`),
      ...["ts", "tsx", "js", "jsx", "mjs", "cjs"].map((e) => `${base}/index.${e}`),
    ];
    return candidates.some(existsSync) ? null : `relative import '${spec}' resolves to nothing`;
  }

  const name = packageNameOf(spec);
  const inPkg =
    (pkg.dependencies && name in pkg.dependencies) ||
    (pkg.devDependencies && name in pkg.devDependencies) ||
    (pkg.peerDependencies && name in pkg.peerDependencies);
  return inPkg ? null : `import '${spec}' but '${name}' is not in package.json`;
}

// ── Main orchestration ───────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const baseIdx = args.indexOf("--base");
  const baseRef = baseIdx >= 0 ? args[baseIdx + 1] : "origin/main";

  const pkg = loadPackageJson();
  const { tables, functions: rpcFns } = loadSupabaseSchema();
  const knownEnv = loadKnownEnvVars(baseRef);
  const allFiles = getDiffFiles(baseRef);
  const files = allFiles.filter((f) => f !== SELF_REL_PATH);

  const violations = [];
  function addViolation(file, lineNo, snippet, reason) {
    violations.push({ file, lineNo, snippet: snippet.trim().slice(0, 120), reason });
  }

  for (const file of files) {
    const fullSrc = readFileSync(file, "utf8");
    const scrubbedSrc = stripCommentsAndStrings(fullSrc);
    const origLines = fullSrc.split("\n");
    const scrubbedLines = scrubbedSrc.split("\n");
    const added = getAddedLineNumbers(file, baseRef);

    for (const lineNo of added) {
      const orig = origLines[lineNo - 1] ?? "";
      const scrubbed = scrubbedLines[lineNo - 1] ?? "";

      for (const spec of findImportSpecs(scrubbed, orig)) {
        const err = checkImport(spec, file, pkg);
        if (err) addViolation(file, lineNo, orig, err);
      }

      if (tables.size > 0) {
        for (const t of findFromCalls(scrubbed, orig)) {
          if (!tables.has(t)) {
            addViolation(file, lineNo, orig, `.from("${t}") — table not in src/integrations/supabase/types.ts`);
          }
        }
        for (const fn of findRpcCalls(scrubbed, orig)) {
          if (!rpcFns.has(fn)) {
            addViolation(file, lineNo, orig, `.rpc("${fn}") — function not in src/integrations/supabase/types.ts`);
          }
        }
      }

      for (const v of findEnvVars(scrubbed, orig)) {
        if (!knownEnv.has(v)) {
          addViolation(file, lineNo, orig, `env var ${v} is undeclared (add to .env.test.example or use an existing name)`);
        }
      }
    }
  }

  if (violations.length === 0) {
    console.log(`hallucination-check: clean (${files.length} files scanned, ${tables.size} tables / ${rpcFns.size} RPCs / ${knownEnv.size} env names known)`);
    process.exit(0);
  }

  console.error(`\nhallucination-check: ${violations.length} suspect reference(s)\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.lineNo}`);
    console.error(`    > ${v.snippet}`);
    console.error(`    ${v.reason}\n`);
  }
  console.error(`If a reference is real but the script can't see it, regenerate src/integrations/supabase/types.ts`);
  console.error(`(\`npx supabase gen types typescript --project-id <id>\`) or update .env.test.example.`);
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
