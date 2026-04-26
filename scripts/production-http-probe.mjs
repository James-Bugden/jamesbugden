#!/usr/bin/env node
/**
 * production-http-probe.mjs — fetch the live guest pages, check status
 * code + presence of a known marker string. Writes the list of failed
 * URLs to GITHUB_OUTPUT so the next workflow job can branch on it.
 *
 * Why marker strings: a 200 from the CDN can still be cached HTML from
 * a previous deploy, or a Cloudflare error page that returns 200. The
 * marker is something a real regression would change or remove.
 *
 * Pick markers carefully:
 *   - The site is a Vite SPA — every route returns the same static
 *     HTML shell from the CDN, with content rendered client-side.
 *     So HTTP-level markers must come from the shell: the <title>
 *     literal that ships in index.html, and the empty <div id="root">.
 *   - For per-route copy assertions, use the Playwright mount-check
 *     in the next workflow job (it actually executes the bundle).
 *
 * What an HTTP marker miss tells us:
 *   - Title gone or different → Cloudflare error page / wrong site
 *     served / Lovable broke the index.html template.
 *   - <div id="root"> gone → static asset shape changed; the bundle
 *     would mount nothing even if it loaded.
 *   - Bundle script tag pattern gone → build artifact missing; the
 *     page would render the shell only and stay blank.
 */

import { setTimeout as delay } from "node:timers/promises";
import { appendFileSync } from "node:fs";

const PROD_BASE = process.env.PROD_BASE || "https://jamesbugden.com";

// Vite SPA — all routes serve the same shell. Probe the canonical
// route plus one localized one to catch routing-level regressions
// (e.g. a deploy that drops /zh-tw at the CDN level).
const SHELL_MARKERS = [
  "<title>Hiresign",       // built site title; updated when Lovable changes brand
  '<div id="root">',       // React mount point
  "/assets/index-",        // hashed bundle script — proves a build was deployed
];

const TARGETS = [
  { path: "/", markers: SHELL_MARKERS },
  { path: "/zh-tw", markers: SHELL_MARKERS },
  { path: "/login", markers: SHELL_MARKERS },
];

const TIMEOUT_MS = 15_000;
const RETRIES = 2;       // total attempts = 1 + RETRIES
const RETRY_DELAY = 3_000;

async function fetchOnce(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "production-smoke/1 (jamesbugden.com CI)",
        "Cache-Control": "no-cache",
      },
      redirect: "follow",
    });
    const body = await res.text();
    return { status: res.status, body, ok: res.ok };
  } finally {
    clearTimeout(t);
  }
}

async function probe(target) {
  const url = `${PROD_BASE}${target.path}`;
  let lastErr = null;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    if (attempt > 0) await delay(RETRY_DELAY);
    try {
      const { status, body, ok } = await fetchOnce(url);
      if (!ok) {
        lastErr = `HTTP ${status}`;
        continue;
      }
      const missing = target.markers.filter((m) => !body.includes(m));
      if (missing.length > 0) {
        lastErr = `markers missing: ${missing.join(", ")}`;
        // Don't retry marker mismatches — body content was returned
        // successfully, retry won't help.
        return { url, ok: false, reason: lastErr, attempt: attempt + 1 };
      }
      return { url, ok: true, attempt: attempt + 1 };
    } catch (e) {
      lastErr = e.name === "AbortError" ? `timeout >${TIMEOUT_MS}ms` : `${e.code || e.name}: ${e.message}`;
    }
  }
  return { url, ok: false, reason: lastErr, attempt: RETRIES + 1 };
}

const results = [];
for (const target of TARGETS) {
  process.stdout.write(`probe ${target.path} ... `);
  const r = await probe(target);
  results.push(r);
  console.log(r.ok ? `OK (attempt ${r.attempt})` : `FAIL — ${r.reason}`);
}

const failed = results.filter((r) => !r.ok);

// Surface to next job via GITHUB_OUTPUT.
if (process.env.GITHUB_OUTPUT) {
  const failedList = failed.map((r) => `${r.url} (${r.reason})`).join(" | ");
  appendFileSync(process.env.GITHUB_OUTPUT, `failed=${failedList}\n`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length}/${results.length} probes failed`);
  process.exit(1);
}

console.log(`\nall ${results.length} probes passed`);
