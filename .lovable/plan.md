

## Update Mini Guide Link Text

**Change:** One line in `src/pages/Dashboard.tsx` (line 338)

**From:**
```
⚡ {lang === "zh" ? `懶人包 · ${miniGuide.title.zh}` : `Mini guide · ${miniGuide.title.en}`}
```

**To:**
```
{lang === "zh" ? "想看精簡版？點這裡 →" : "Want the mini guide version? Click here →"}
```

Drops the emoji, uses conversational phrasing, and adds a directional arrow for clarity.

