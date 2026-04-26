#!/usr/bin/env node
/**
 * lovable-protected-paths.mjs — fails CI when Lovable's bot edits paths
 * we've reserved for human/Claude-driven work.
 *
 * Why: per AGENTS.md "Protected paths (Lovable coordination — agreed
 * 2026-04-19)", these paths are off-limits to gpt-engineer-app[bot] so we
 * can land defensive code there without it getting silently stripped on
 * the next Lovable "Changes" commit.
 *
 * The CODEOWNERS file already requires James's review on these paths,
 * but Lovable can still author commits. This script makes the policy
 * explicit and machine-checked.
 *
 * Detection logic:
 *   1. Get the PR author from $GITHUB_ACTOR (CI) or `gh pr view` fallback.
 *   2. If author is NOT gpt-engineer-app[bot], pass.
 *   3. Otherwise, list changed files vs origin/main; fail if any match
 *      a protected path.
 *
 * Outside CI (no $GITHUB_ACTOR), runs in dry-run mode and just prints
 * which files would be flagged for a hypothetical Lovable PR.
 */

import { execSync } from "node:child_process";

const PROTECTED = [
  /^src\/components\/resume-builder\//,
  /^src\/lib\/resumePdf\//,
  /^src\/workers\/pdfRenderer\.worker\.ts$/,
];

const LOVABLE_ACTOR = "gpt-engineer-app[bot]";

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const baseRef = baseIdx >= 0 ? args[baseIdx + 1] : "origin/main";
const forceLovable = args.includes("--simulate-lovable");

function getActor() {
  if (forceLovable) return LOVABLE_ACTOR;
  if (process.env.GITHUB_ACTOR) return process.env.GITHUB_ACTOR;
  // Local dev: use the latest commit author as a best-effort signal.
  try {
    return execSync("git log -1 --format=%an", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

function getChangedFiles() {
  try {
    execSync(`git rev-parse ${baseRef}`, { stdio: "ignore" });
  } catch {
    console.error(`lovable-protected-paths: base ref ${baseRef} not reachable; nothing to check`);
    return [];
  }
  return execSync(`git diff --name-only ${baseRef}...HEAD`, { encoding: "utf8" })
    .split("\n").filter(Boolean);
}

const actor = getActor();
const isLovable = actor === LOVABLE_ACTOR;

if (!isLovable) {
  console.log(`lovable-protected-paths: actor=${actor} (not Lovable bot, skipping)`);
  process.exit(0);
}

const changed = getChangedFiles();
const violations = changed.filter((f) => PROTECTED.some((rx) => rx.test(f)));

if (violations.length === 0) {
  console.log(`lovable-protected-paths: Lovable PR clean (${changed.length} files changed, none protected)`);
  process.exit(0);
}

console.error(`\nlovable-protected-paths: Lovable bot touched ${violations.length} protected file(s)\n`);
for (const f of violations) {
  console.error(`  ${f}`);
}
console.error(`\nThese paths are reserved per AGENTS.md → Protected paths.`);
console.error(`Either revert the changes or escalate to James for an explicit override.`);
process.exit(1);
