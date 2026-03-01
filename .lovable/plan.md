

## Remove Duplicate Chinese Dashboard Route

**What changes:**
- In `src/App.tsx`, replace the `/zh/dashboard` route with a redirect to `/zh-tw/dashboard`
- In `src/components/AuthHeaderButton.tsx`, update the `dashboardPath` logic to use `/zh-tw/dashboard` instead of `/zh/dashboard`

**Why `/zh-tw/dashboard` stays:**
The entire site uses `/zh-tw/` as the Chinese prefix convention. `/zh/dashboard` is the only outlier. Keeping `/zh-tw/dashboard` and redirecting `/zh/dashboard` ensures consistency and preserves any bookmarked links.

**Technical details:**
1. `src/App.tsx` line for `/zh/dashboard` changes from rendering `<DashboardZhTw />` to `<Navigate to="/zh-tw/dashboard" replace />`
2. `src/components/AuthHeaderButton.tsx` changes `dashboardPath` from `/zh/dashboard` to `/zh-tw/dashboard`

