

## Fix: Gold Button Color for MailerLite Forms on Dark Green Backgrounds

### Problem
The MailerLite submit buttons in the salary proof sections (both EN and ZH) show dark green (#2D3A2E) instead of gold (#D4930D). This happens because:
- The `.experiment .ml-embedded button[type="submit"]` CSS rule forces dark green on ALL MailerLite buttons
- There's no matching exception for MailerLite buttons on dark backgrounds (only `.btn-gold` has the exception)

### Solution
Add CSS rules in `src/index.css` to override the MailerLite button color when inside a dark green background section, mirroring the existing `.btn-gold` exception pattern.

### Technical Details

**File: `src/index.css`**

Add new rules after the existing MailerLite experiment overrides (around line 525):

```css
/* Exception: gold MailerLite button on dark backgrounds */
.experiment #coaching .ml-embedded button[type="submit"],
.experiment #coaching .ml-embedded .ml-form-embedSubmit button,
.experiment [style*="background-color: rgb(27, 58, 47)"] .ml-embedded button[type="submit"],
.experiment [style*="background-color: rgb(27, 58, 47)"] .ml-embedded .ml-form-embedSubmit button,
.experiment [style*="#1B3A2F"] .ml-embedded button[type="submit"],
.experiment [style*="#1B3A2F"] .ml-embedded .ml-form-embedSubmit button {
  background: #D4930D !important;
  box-shadow: 0 2px 6px rgba(212, 147, 13, 0.25) !important;
}
.experiment #coaching .ml-embedded button[type="submit"]:hover,
.experiment #coaching .ml-embedded .ml-form-embedSubmit button:hover,
.experiment [style*="background-color: rgb(27, 58, 47)"] .ml-embedded button[type="submit"]:hover,
.experiment [style*="background-color: rgb(27, 58, 47)"] .ml-embedded .ml-form-embedSubmit button:hover,
.experiment [style*="#1B3A2F"] .ml-embedded button[type="submit"]:hover,
.experiment [style*="#1B3A2F"] .ml-embedded .ml-form-embedSubmit button:hover {
  background: #B87D0A !important;
  box-shadow: 0 4px 12px rgba(212, 147, 13, 0.35) !important;
}
```

This affects both `/experiment` and `/zh-tw/experiment` pages since both use the same CSS and have MailerLite forms inside `#1B3A2F` background sections.

