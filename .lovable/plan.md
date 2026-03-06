

## Fix Duplicate Bullets in Resume Import

### Problem
When importing a resume, bullet points get duplicated. This happens because:

1. **Wrapped bullet lines**: PDF extraction often wraps a single long bullet across multiple lines. The first line starts with `•` and is correctly captured, but the continuation line (without a `•` prefix) falls through to line 638 and gets added as a **separate** bullet.

2. **Embedded bullet markers**: Some PDFs produce lines like `● Bullet text` with Unicode characters not in the current regex (e.g., `●` U+25CF, `○`, `◦`, `⦿`).

### Fix — `src/lib/documentImport.ts`

**1. Expand the bullet character regex** to catch more Unicode bullet variants:
Change `/^[•\-\*·▪▸►→]/` → `/^[•\-\*·▪▸►→●○◦⦿◆◇■□❖➤➢✦✧∙]/`

Apply this in all 8+ places where this regex appears.

**2. Merge continuation lines into the previous bullet** instead of creating new bullets:
At line 638 (the fallback `else` in the experience parser), if `current.bullets.length > 0` and the line doesn't look like a new entry (no dates, not a bullet marker, short-ish), **append** it to the last bullet instead of pushing a new one:

```typescript
} else {
  // Continuation of previous bullet — merge instead of creating new
  if (current.bullets.length > 0 && line.length < 120) {
    current.bullets[current.bullets.length - 1] += " " + line.trim();
  } else {
    current.bullets.push(line);
  }
}
```

**3. Apply the same continuation-merge logic** in `parseEducationEntries` (around line 710+) and `parseProjectEntries` (around line 870+) which have identical fallback patterns.

**4. Deduplicate bullets before flushing**: In `flush()`, deduplicate by checking if any bullet is a substring of another (handles cases where the same text appears both as a full bullet and a partial):

```typescript
const deduped = current.bullets.filter((b, i) =>
  !current.bullets.some((other, j) => j !== i && other.includes(b) && other.length > b.length)
);
```

### Files changed
- `src/lib/documentImport.ts`

