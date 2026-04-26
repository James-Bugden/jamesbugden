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
 *   2. Supabase tables (`.from("X")`) and RPCs (`.rpc("X")`) must
 *      exist in src/integrations/supabase/types.ts (the generated
 *      schema is the source of truth).
 *
 *   3. import.meta.env.X / process.env.X references that look like
 *      VITE_*, SUPABASE_*, or other app-specific names must be either
 *      already used elsewhere in the codebase or documented in a
 *      .env*.example file. Built-in vars (NODE_ENV, CI, DEV, MODE,
 *      PROD, SSR, etc.) are allowed.
 *
 * Diff-aware so legacy occurrences don't block unrelated PRs. Pass
 * --base <ref> to compare against a specific ref (default origin/main).
 *
 * Exits non-zero with a per-violation report.
 */

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve, extname, isAbsolute } from "node:path";

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const baseRef = baseIdx >= 0 ? args[baseIdx + 1] : "origin/main";

// ── Step 1: load schema sources ──────────────────────────────────────
function loadPackageJson() {
  return JSON.parse(readFileSync("package.json", "utf8"));
}

function loadSupabaseSchema() {
  // Parse types.ts. The structure is:
  //   public: {
  //     Tables: { table_name: { Row: { col: type, ... } } }
  //     Views: { view_name: ... }
  //     Functions: { fn_name: ... }
  //   }
  // We only need names — regex is sufficient and avoids a TS parser dep.
  const path = "src/integrations/supabase/types.ts";
  if (!existsSync(path)) return { tables: new Set(), functions: new Set() };
  const src = readFileSync(path, "utf8");

  // Tables block sits at 4-space indent under `public:`; each table key is
  // at 6 spaces. Block ends at `    }` (4 spaces, closing brace alone on line).
  const tables = new Set();
  const tablesBlock = src.match(/Tables:\s*\{([\s\S]*?)\n    \}/);
  if (tablesBlock) {
    for (const m of tablesBlock[1].matchAll(/^      ([a-z_][a-z0-9_]*):\s*\{/gm)) {
      tables.add(m[1]);
    }
  }

  // Functions block — same indent, but values may be inline `{ Args: ...; Returns: ... }`
  // or multi-line block. Match identifier followed by `:` at 6-space indent.
  const functions = new Set();
  const fnBlock = src.match(/Functions:\s*\{([\s\S]*?)\n    \}/);
  if (fnBlock) {
    for (const m of fnBlock[1].matchAll(/^      ([a-z_][a-z0-9_]*):/gm)) {
      functions.add(m[1]);
    }
  }

  return { tables, functions };
}

function loadKnownEnvVars() {
  // Collect VITE_*/etc. names already used anywhere in src/ + scripts/, plus
  // anything documented in .env*.example.
  const known = new Set([
    "NODE_ENV", "CI", "DEV", "PROD", "MODE", "SSR", "BASE_URL",
    "GITHUB_ACTOR", "GITHUB_TOKEN", "GH_TOKEN",
    "QA_BASE_URL", "QA_TEST_EMAIL", "QA_TEST_PASSWORD", "LOCAL",
  ]);

  // Examples files.
  for (const f of ["env.example", ".env.example", ".env.test.example"]) {
    if (existsSync(f)) {
      for (const line of readFileSync(f, "utf8").split("\n")) {
        const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=/);
        if (m) known.add(m[1]);
      }
    }
  }

  // Existing usage in tracked source AT baseRef (not HEAD). Scanning at HEAD
  // would let a new file's own bogus env var "vouch for itself" — circular.
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

// ── Step 2: walk the diff for added lines, by file ───────────────────
function getDiffFiles() {
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

function getAddedLines(file) {
  const out = execSync(
    `git diff -U0 ${baseRef}...HEAD -- ${JSON.stringify(file)}`,
    { encoding: "utf8" },
  );
  const added = [];
  let newLine = 0;
  for (const ln of out.split("\n")) {
    const hunk = ln.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunk) { newLine = parseInt(hunk[1], 10); continue; }
    if (ln.startsWith("+++") || ln.startsWith("---")) continue;
    if (ln.startsWith("+")) { added.push({ lineNo: newLine, text: ln.slice(1) }); newLine++; }
    else if (!ln.startsWith("-")) { newLine++; }
  }
  return added;
}

// ── Step 3: per-line checks ──────────────────────────────────────────
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
  // "lucide-react" → "lucide-react"; "@radix-ui/react-toast" → "@radix-ui/react-toast";
  // "react-dom/client" → "react-dom"; "@scope/pkg/sub" → "@scope/pkg".
  if (spec.startsWith("@")) {
    const parts = spec.split("/");
    return parts.slice(0, 2).join("/");
  }
  return spec.split("/")[0];
}

function checkImport(spec, fromFile, pkg) {
  if (NODE_BUILTINS.has(spec)) return null;

  if (spec.startsWith(".") || isAbsolute(spec)) {
    // Relative: try the literal path, then common extensions and /index.*
    const base = isAbsolute(spec) ? spec : resolve(dirname(fromFile), spec);
    const candidates = [
      base,
      ...["ts", "tsx", "js", "jsx", "mjs", "cjs"].map((e) => `${base}.${e}`),
      ...["ts", "tsx", "js", "jsx", "mjs", "cjs"].map((e) => `${base}/index.${e}`),
    ];
    return candidates.some(existsSync) ? null : `relative import '${spec}' resolves to nothing`;
  }

  // Bare: must be in package.json
  const name = packageNameOf(spec);
  const inPkg =
    (pkg.dependencies && name in pkg.dependencies) ||
    (pkg.devDependencies && name in pkg.devDependencies) ||
    (pkg.peerDependencies && name in pkg.peerDependencies);
  return inPkg ? null : `import '${spec}' but '${name}' is not in package.json`;
}

function findImports(text) {
  const imports = [];
  // import ... from "x"; import "x"; import("x")
  for (const m of text.matchAll(/import(?:\s+[^"';]+\s+from)?\s*["']([^"']+)["']/g)) {
    imports.push(m[1]);
  }
  for (const m of text.matchAll(/import\s*\(\s*["']([^"']+)["']/g)) {
    imports.push(m[1]);
  }
  for (const m of text.matchAll(/require\s*\(\s*["']([^"']+)["']/g)) {
    imports.push(m[1]);
  }
  return imports;
}

function findFromCalls(text) {
  // .from("table") OR supabase.from('table')
  return [...text.matchAll(/\.from\s*\(\s*["']([a-z_][a-z0-9_]*)["']/g)].map((m) => m[1]);
}

function findRpcCalls(text) {
  return [...text.matchAll(/\.rpc\s*\(\s*["']([a-z_][a-z0-9_]*)["']/g)].map((m) => m[1]);
}

function findEnvVars(text) {
  return [...text.matchAll(/(?:import\.meta\.env|process\.env)\.([A-Z][A-Z0-9_]*)/g)].map((m) => m[1]);
}

// ── Step 4: orchestrate ──────────────────────────────────────────────
const pkg = loadPackageJson();
const { tables, functions: rpcFns } = loadSupabaseSchema();
const knownEnv = loadKnownEnvVars();
const files = getDiffFiles();

const violations = [];
function addViolation(file, lineNo, snippet, reason) {
  violations.push({ file, lineNo, snippet: snippet.trim().slice(0, 120), reason });
}

for (const file of files) {
  const added = getAddedLines(file);
  for (const { lineNo, text } of added) {
    // Imports
    for (const spec of findImports(text)) {
      const err = checkImport(spec, file, pkg);
      if (err) addViolation(file, lineNo, text, err);
    }
    // Supabase tables
    if (tables.size > 0) {
      for (const t of findFromCalls(text)) {
        if (!tables.has(t)) {
          addViolation(file, lineNo, text, `.from("${t}") — table not in src/integrations/supabase/types.ts`);
        }
      }
      for (const fn of findRpcCalls(text)) {
        if (!rpcFns.has(fn)) {
          addViolation(file, lineNo, text, `.rpc("${fn}") — function not in src/integrations/supabase/types.ts`);
        }
      }
    }
    // Env vars
    for (const v of findEnvVars(text)) {
      if (!knownEnv.has(v)) {
        addViolation(file, lineNo, text, `env var ${v} is undeclared (add to .env.test.example or use an existing name)`);
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
