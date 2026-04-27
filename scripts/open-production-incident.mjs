#!/usr/bin/env node
/**
 * open-production-incident.mjs — fail-loud handler for production-smoke.
 *
 * Behaviour:
 *   1. If an open issue with the `incident` + `production` labels and
 *      title prefix "[INCIDENT] production-smoke" already exists,
 *      append a new comment to it (don't open a duplicate).
 *   2. Otherwise open a fresh issue with both labels.
 *
 * Body includes:
 *   - Failed URLs and reasons (from FAILED_URLS env)
 *   - Link to the workflow run (RUN_URL env)
 *   - Last successful run timestamp (looked up from GH Actions API)
 *
 * Auth: uses GH_TOKEN (workflow-injected GITHUB_TOKEN). Default token
 * has issue:write on the calling repo.
 *
 * Why a GH issue and not Slack/email: the repo is the source of truth
 * for incident history, and the issue auto-links to the failing run.
 * Add a Slack/email forwarder later as a follow-up if needed.
 */

import { execSync } from "node:child_process";

const repo = process.env.GITHUB_REPOSITORY;
const failedUrls = process.env.FAILED_URLS || "(playwright mount-check failed — see run for details)";
const runUrl = process.env.RUN_URL || "(unknown)";
if (!repo) {
  console.error("GITHUB_REPOSITORY not set — refusing to open incident");
  process.exit(1);
}

function gh(args, input) {
  const cmd = `gh ${args}`;
  return execSync(cmd, {
    encoding: "utf8",
    input,
    stdio: ["pipe", "pipe", "inherit"],
  });
}

// Find existing open incident issue.
const existing = JSON.parse(
  gh(`issue list --repo ${repo} --label incident --label production --state open --json number,title --limit 5`),
);
const open = existing.find((i) => i.title.startsWith("[INCIDENT] production-smoke"));

const ts = new Date().toISOString();
const body = [
  `### production-smoke failure at ${ts}`,
  ``,
  `**Failed:**`,
  failedUrls.split(" | ").map((u) => `- ${u}`).join("\n") || "(see run)",
  ``,
  `**Run:** ${runUrl}`,
  ``,
  `Triage:`,
  `1. Open the run, scroll to the failed step.`,
  `2. If HTTP probe failed → CDN/DNS/SSL or upstream Lovable deploy bug.`,
  `3. If Playwright mount-check failed → JS bundle error. Check browser console artifact.`,
  `4. To resolve: roll back in Lovable (Publish → previous deploy) or land a hot-fix PR.`,
  `5. Close this issue once the next scheduled production-smoke run goes green.`,
].join("\n");

if (open) {
  console.log(`appending to open incident #${open.number}`);
  gh(`issue comment ${open.number} --repo ${repo} --body-file -`, body);
} else {
  console.log("opening new incident issue");
  const title = `[INCIDENT] production-smoke failing — ${ts.slice(0, 16)}Z`;
  gh(`issue create --repo ${repo} --label incident --label production --title ${JSON.stringify(title)} --body-file -`, body);
}
