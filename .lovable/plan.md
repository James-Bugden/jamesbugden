

## Apply Classic Template on Import

When a resume is imported (file upload or paste), the flow currently opens a template picker overlay. Instead, it should automatically apply the "classic" template preset and skip the picker.

### File to Edit
**`src/pages/ResumeBuilder.tsx`**

In `handleImported` (~line 462): after setting data and settings, automatically apply the classic template instead of opening the template picker. Replace `setTemplatePickerOpen(true)` with direct application of the classic preset:

```typescript
const classicSettings = applyTemplatePreset(doc.settings as any, "classic");
store.updateCustomize(classicSettings);
updateDocument(doc.id, { settings: classicSettings });
setActiveDocId(doc.id);
setViewMode("resume-editor");
setActiveTab("content");
historyRef.current = { past: [], future: [] };
```

This removes the template picker step for imports while still allowing users to change templates later via the Customize tab.

