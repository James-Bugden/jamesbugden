## Plan: Add SiteFooter to All Pages via Layout Wrapper

### Approach

Instead of manually adding `<SiteFooter />` to every page component (100+ files), create a `SiteLayout` wrapper component and use it in `App.tsx` to wrap all routes. The footer will render automatically on every page except those that should not have it (admin, resume builder, login/signup, 404).

&nbsp;

it doesnt need to be a new section, it should integate into current layouts, like it should be link on the current footers

&nbsp;

### Changes

**1. Create `src/components/SiteLayout.tsx**`

- A simple wrapper that renders `{children}` followed by `<SiteFooter />`
- Uses `useLocation` to check the current path and hide the footer on excluded routes:
  - `/admin/*` (admin pages)
  - `/resume`, `/resume-simple` (full-screen builder)
  - `/login`, `/signup`, `/reset-password` (auth pages)
  - `/review` (client review gate)
  - `/jobs`, `/tracker` (full-screen app tools)

**2. Update `App.tsx**`

- Import `SiteLayout`
- Wrap the `<Routes>` block inside `<SiteLayout>` so the footer appears after every route's content automatically
- Place it inside `<Suspense>` so it shares the same loading state

**3. Remove manual `<SiteFooter />` from `GuidesPage.tsx` and `GuidesPageZhTw.tsx**`

- These two pages currently import and render `SiteFooter` directly — remove those to avoid duplicate footers

### Pages excluded from footer


| Path pattern                           | Reason                |
| -------------------------------------- | --------------------- |
| `/admin/*`                             | Admin dashboard       |
| `/resume`, `/resume-simple`            | Full-screen builder   |
| `/login`, `/signup`, `/reset-password` | Auth flows            |
| `/review`                              | Client review gate    |
| `/jobs`, `/tracker`                    | Full-screen app tools |


All other pages (homepage, guides, toolkit, salary, offer calculator, reviews, quiz, interview questions, join, dashboard, 404, etc.) will get the footer automatically.