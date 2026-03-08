

## Update Language Proficiency Levels to Match LinkedIn

### Change
In `src/components/resume-builder/types.ts`, replace the `PROFICIENCY_LEVELS` constant (line ~66):

**From:**
```typescript
export const PROFICIENCY_LEVELS = [
  "Native", "Fluent", "Advanced", "Intermediate", "Basic",
] as const;
```

**To:**
```typescript
export const PROFICIENCY_LEVELS = [
  "Native or bilingual proficiency",
  "Full professional proficiency",
  "Professional working proficiency",
  "Limited working proficiency",
  "Elementary proficiency",
] as const;
```

This single change propagates everywhere the constant is used (language dropdowns in `SectionCard.tsx`, resume preview rendering).

