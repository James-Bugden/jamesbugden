# Resume Builder — Issues & Improvement Plan

**Prepared:** 24 March 2026
**Audience:** Project stakeholders (non-technical)
**Status:** Assessment complete — awaiting prioritisation

---

## The Big Picture

The Resume Builder is the flagship tool on the platform. Users create resumes, customise the design, and download them as PDFs. The tool works well for basic use, but our review uncovered a set of problems — some visible to users (broken downloads), and some hidden beneath the surface (security gaps that could be exploited).

This document walks through what we found, why each issue matters, and what it would take to fix it.

---

## 1. PDF Downloads Are Broken at Page Breaks

**What users see:** When a resume is longer than one page, the downloaded PDF cuts content in half — text gets sliced mid-sentence, bullet points are split across pages, and section headings end up orphaned at the bottom of a page with no content following them.

**Why this happens:**

The tool has two separate systems that don't talk to each other properly:

- **The Preview** (what users see on screen) uses a custom page-splitting algorithm. It measures every element, figures out where page breaks should go, and pushes content down with spacing adjustments to avoid ugly splits. This works reasonably well on screen.

- **The PDF Download** strips out all of those spacing adjustments before sending the content to a remote printing service (Browserless). It then relies on basic CSS rules (`break-inside: avoid`) to handle page breaks — but those rules are much less intelligent than the preview algorithm. The printing service makes its own decisions about where to break, and those decisions often disagree with what the preview showed.

The result: what the user sees on screen and what they get in the PDF are two different things.

**Why this matters:**

- A resume with broken formatting reflects poorly on the applicant — and on the platform.
- Users lose trust when the preview looks right but the download doesn't match.
- This is the single most user-facing quality issue in the product.

**What fixing it involves:**

The core challenge is making the PDF output match the on-screen preview. There are two broad approaches:

- **Option A — Send the preview as-is to the printer.** Instead of stripping the pagination adjustments before export, keep them intact and let the remote printer render exactly what the user sees. This is the faster fix but requires careful testing across different resume lengths and layouts.

- **Option B — Move to a pixel-perfect export model.** Render each page as an image or use a more controlled PDF library that respects the exact layout. This is more work but eliminates the "two different rendering engines disagree" problem entirely.

---

## 2. Feature Locks Can Be Bypassed in Seconds

**What the issue is:** Several features on the platform are meant to be restricted — some require a login, others require an email address, and there's a limit of 2 resumes per account. Our review found that most of these restrictions exist only as visual overlays and can be removed by anyone with basic browser knowledge.

**How it works today:**

| Feature | How it's "protected" | Can it be bypassed? |
|---|---|---|
| Resume Builder access | A login popup appears over the tool — but the full tool is loaded and running underneath | Yes — remove the popup in browser inspector |
| Offer Calculator | Content is blurred with a CSS filter — but fully rendered in the page | Yes — turn off the blur in browser inspector |
| Resume limit (2 max) | The "New Resume" button is greyed out based on a count stored in the browser | Yes — edit the browser's local storage |
| Email gate (Offer tools) | An email check stored in browser memory | Yes — set a fake email in local storage |

**Why this matters:**

- Any feature gate that can be removed in under 10 seconds isn't a real gate — it's a suggestion.
- If the business model depends on these limits driving sign-ups or upgrades, they need to be enforced on the server, not just hidden with CSS.
- The good news: the AI-powered features (resume analysis, AI import, AI writing tools) already have proper server-side limits that cannot be bypassed. It's the non-AI features that are unprotected.

**What fixing it involves:**

- Replace the visual overlay approach with a proper redirect — if a user isn't logged in, don't load the tool at all. The admin dashboard already uses this secure pattern; it just needs to be applied to user-facing tools.
- Move resume storage to the server (Supabase) so the 2-resume limit is enforced by the database, not the browser.
- For the email gate, verify the email on the server before unlocking content.

---

## 3. The PDF Pipeline Has Security Gaps

**What the issue is:** The way PDFs are generated opens the door to misuse. The system takes whatever HTML content the browser sends and passes it to an external rendering service (Browserless) without checking what's in it.

**The specific concerns:**

- **No login required for PDF export.** If a user's session has expired, the system silently falls back to using a public API key instead of requiring them to log in again. This means anyone could potentially use the PDF service without an account.

- **No size or content checks.** The server accepts whatever HTML it receives — no limit on how large it can be, no check for suspicious content. This could be used to overload the rendering service or drive up costs.

- **External resource loading.** The HTML sent to the printer includes links to external stylesheets pulled from the user's browser. A malicious user could inject links to internal systems, potentially tricking the printer into fetching data it shouldn't have access to.

- **Browser print fallback bypasses limits.** When the server export fails (or the user hits their monthly limit of 50), the system automatically falls back to printing directly from the browser — which has no limit at all. This undermines the rate limiting.

**Why this matters:**

- The Browserless service has real per-use costs. Unrestricted access could lead to unexpected bills.
- The silent auth fallback means usage tracking is unreliable — some exports may not be attributed to any user.
- The external resource loading creates a potential pathway for server-side request forgery (a recognised security risk).

**What fixing it involves:**

- Require a valid login for PDF export — no fallback to public keys.
- Add a maximum payload size on the server (e.g., 5 MB).
- Only allow stylesheet links from known domains (Google Fonts).
- Gate the browser print fallback behind the same monthly limit, or remove it entirely and show a clear "try again later" message.

---

## 4. Personal Data Is Stored Without Protection

**What the issue is:** All resume content — including names, email addresses, phone numbers, and work history — is stored in the browser's local storage with no encryption. This is the primary data store; there is no server-side backup for documents.

**Why this matters:**

- If a user's browser is compromised (e.g., through a malicious browser extension or a cross-site scripting attack), all of their resume data is immediately accessible.
- If a user clears their browser data or switches devices, all their resumes are gone — there's no way to recover them.
- From a compliance perspective, storing personal data in an unencrypted, client-side store with no expiry or access controls is a risk.

**What fixing it involves:**

- Move document storage to Supabase (the existing database) so resumes are backed up server-side.
- This also enables cross-device access, which is a user-facing benefit.
- Adding a Content Security Policy (CSP) header would reduce the risk of malicious scripts accessing stored data.

---

## 5. One Unprotected Rendering Point

**What the issue is:** There is one place in the salary comparison tool where content is rendered directly into the page without sanitisation. While all resume and cover letter content is properly cleaned (using a library called DOMPurify), this particular spot was missed.

**Location:** The "Am I Underpaid?" tab in the salary comparison tool.

**Why this matters:**

- It's a small surface area, but it's a real cross-site scripting (XSS) vector.
- An attacker who could control the data shown in that view could inject malicious code.
- The fix is straightforward — use the same sanitisation that's already applied everywhere else.

---

## Summary: What to Fix and in What Order

### Must Fix (before next release)

| # | Issue | User Impact | Effort |
|---|---|---|---|
| 1 | **PDF page-break distortion** | Users get broken downloads — the most visible quality problem | Medium–High |
| 2 | **Auth bypass on feature gates** | Premium features accessible without login | Low–Medium |
| 3 | **PDF export auth fallback** | Unauthenticated users can generate PDFs using platform resources | Low |

### Should Fix (near-term)

| # | Issue | User Impact | Effort |
|---|---|---|---|
| 4 | **Resume limit is browser-only** | Limit is meaningless — anyone can create unlimited resumes | Medium (requires moving storage to server) |
| 5 | **PDF payload validation** | Platform costs at risk from oversized or malicious payloads | Low |
| 6 | **Stylesheet whitelist for PDF** | Prevents potential security exploit via the rendering service | Low |
| 7 | **XSS in salary tool** | Small but real security hole | Very Low |

### Plan For (longer-term)

| # | Issue | User Impact | Effort |
|---|---|---|---|
| 8 | **Move documents to server storage** | Enables cross-device access, real backup, real limits | High |
| 9 | **Add Content Security Policy** | Reduces overall XSS risk across the platform | Low–Medium |
| 10 | **Remove or gate browser print fallback** | Closes the rate-limit bypass for PDF exports | Low |

---

## Appendix: What Already Works Well

It's worth noting what the platform gets right:

- **AI features are properly rate-limited.** Resume analysis (3/month), AI imports (2/month), and AI writing tools (6/month) are all enforced on the server. Users cannot bypass these limits.
- **The admin dashboard is properly protected.** It uses a redirect-based auth check — the correct pattern that should be extended to all protected routes.
- **Resume content is sanitised.** DOMPurify is used consistently across the resume and cover letter previews, preventing script injection through user content.
- **Database security is strong.** Row-level security policies are in place on all database tables, and privileged operations use secure PostgreSQL functions.
- **The design system is solid.** The UI is built on a well-structured component library (shadcn/ui + Tailwind) with consistent branding and responsive design.

The issues above are real but contained — the foundation is sound, and the fixes are well-scoped.
