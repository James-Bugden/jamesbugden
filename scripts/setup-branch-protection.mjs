#!/usr/bin/env node
/**
 * setup-branch-protection.mjs — applies branch protection to `main`.
 *
 * Run once after PRs #30, #32, and the Phase 4 PR have all merged and
 * their workflows have run at least once on main (otherwise GitHub
 * doesn't know about the check names yet).
 *
 *   gh auth login          # if not already
 *   node scripts/setup-branch-protection.mjs --apply
 *
 * Without --apply it does a dry-run and prints what it would set.
 *
 * What it requires of every PR into main:
 *   - All ship-gate checks pass:
 *       * tsc + banned patterns
 *       * hallucination check (diff-aware)
 *       * e2e smoke
 *       * visual regression (guest pages)
 *       * Lovable protected paths            (only fires for the bot)
 *   - Branch is up-to-date with main (forces rebase before merge).
 *   - At least 1 review from CODEOWNERS where CODEOWNERS applies.
 *   - Conversation resolved.
 *   - No force-push, no branch deletion.
 *   - Linear history (no merge commits — keeps the log readable).
 *
 * Admins (you) can still bypass in an emergency, but every override
 * shows up in the audit log under "branch protection override".
 */

import { execSync } from "node:child_process";

const APPLY = process.argv.includes("--apply");
const REPO = process.env.GITHUB_REPOSITORY || "James-Bugden/jamesbugden";

const REQUIRED_CHECKS = [
  "tsc + banned patterns",
  "hallucination check (diff-aware)",
  "e2e smoke",
  "visual regression (guest pages)",
  // NOTE: "Lovable protected paths" is intentionally NOT required here.
  // It only runs for the gpt-engineer-app[bot] PRs; making it required
  // would block every human PR (the check would never run, GitHub would
  // sit at "expected"). The lovable-guard job uses `if:` to no-op for
  // non-Lovable actors, which from the protection rule's perspective
  // means it doesn't exist on those PRs.
];

const protection = {
  required_status_checks: {
    strict: true,                 // PR must be up-to-date with base
    contexts: REQUIRED_CHECKS,
  },
  enforce_admins: false,          // James can bypass in emergencies (audited)
  required_pull_request_reviews: {
    required_approving_review_count: 0,  // solo project — CODEOWNERS handles protected paths
    require_code_owner_reviews: true,
    dismiss_stale_reviews: true,
  },
  restrictions: null,             // no push restrictions beyond protection itself
  required_linear_history: true,
  allow_force_pushes: false,
  allow_deletions: false,
  required_conversation_resolution: true,
  lock_branch: false,
  allow_fork_syncing: true,
};

function gh(args, input) {
  return execSync(`gh ${args}`, { encoding: "utf8", input, stdio: ["pipe", "pipe", "inherit"] });
}

console.log(`Target: ${REPO} / main`);
console.log(`Required checks:`);
for (const c of REQUIRED_CHECKS) console.log(`  - ${c}`);

if (!APPLY) {
  console.log(`\n(dry-run) — re-run with --apply to push these settings`);
  process.exit(0);
}

const url = `repos/${REPO}/branches/main/protection`;
const body = JSON.stringify(protection);

console.log(`\nApplying...`);
gh(`api -X PUT ${url} -H "Accept: application/vnd.github+json" --input -`, body);
console.log(`\nDone. Verify in repo Settings → Branches.`);
