

## Align Chinese "Why Work With an Insider" Section with English

### Changes to `src/pages/IndexExperimentZhTw.tsx`

**1. Section heading** (lines 229-234)
- Remove the subtitle paragraph
- Change heading from "為什麼要找內部人？" to match English structure: "大部分的職涯建議來自沒招募過任何人的人"
- Remove the separate `<p>` subtitle since the English version has no subtitle

**2. Card 3 — "Insider Knowledge"** (lines 252-258)
- Title: Change "財星500大內部人" to "內部知識"
- Body: Change from the Google/Amazon/Meta copy to match English: "我錄取過 750 位以上的人。我知道他們怎麼面試、怎麼給薪，還有什麼讓你脫穎而出。"

**3. Remove bottom text** (lines 261-263)
- Delete the line "這不是部落格上的建議。這來自親自做招募的人。" since the English version has no equivalent

### Summary

| Element | English | Chinese (current) | Chinese (fixed) |
|---|---|---|---|
| Heading | "Most career advice comes from people who've never hired anyone." | 為什麼要找內部人？ | 大部分的職涯建議來自沒招募過任何人的人 |
| Subtitle | None | 大部分的職涯建議來自... | Removed |
| Card 3 title | Insider Knowledge | 財星500大內部人 | 內部知識 |
| Card 3 body | "I've hired over 750 people..." | Google/Amazon/Meta copy | 我錄取過 750 位以上的人... |
| Bottom text | None | 這不是部落格上的建議... | Removed |

