
Fix the dashboard search duplication by making the search index canonical and deduplicated.

1. Inspect and update `src/pages/Dashboard.tsx` search indexing
- Keep `buildSearchable()` as the single source for dashboard search results.
- Remove the extra hardcoded `interview-questions` entry currently appended at the end.
- Add deduplication by `id` while building the combined list from `tools` and `journeyItems`.

2. Preserve the intended result priority
- Keep `tools` indexed first, then `journeyItems`.
- When the same `id` exists in both places, keep the first one and skip later duplicates.
- This means shared items like `interview-questions` will appear once in search, using the tool version as the canonical result.

3. Keep language-aware routing intact
- For tools, use the localized path (`zhPath` when available) instead of always indexing `path`.
- For guides, continue using the existing localized `enPath`/`zhPath` logic.

4. Validate affected UI behavior
- Confirm search results no longer repeat the same card for queries like “interview”.
- Check both English and Traditional Chinese dashboards.
- Verify recently used cards still resolve correctly after the deduplicated search list is used as the lookup source.

Technical details
- Root cause: `interview-questions` is currently indexed 3 times:
  1. in `tools`
  2. in `journeyItems`
  3. in a manual `items.push(...)` inside `buildSearchable()`
- Recommended implementation shape:
```ts
function buildSearchable(lang: "en" | "zh"): SearchableItem[] {
  const items: SearchableItem[] = [];
  const seen = new Set<string>();

  tools.forEach((t) => {
    if (seen.has(t.id)) return;
    seen.add(t.id);
    items.push({
      id: t.id,
      type: "tool",
      title: t.title,
      desc: t.description,
      path: lang === "zh" && t.zhPath ? t.zhPath : t.path,
    });
  });

  journeyItems.forEach((g) => {
    if (seen.has(g.id)) return;
    seen.add(g.id);
    items.push({
      id: g.id,
      type: "guide",
      title: g.title,
      desc: g.description,
      path: lang === "zh" && g.zhPath ? g.zhPath : g.enPath,
    });
  });

  return items;
}
```
