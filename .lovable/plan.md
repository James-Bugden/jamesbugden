

## Make Personal Details Card Default to Edit Mode

Single change in `src/components/resume-builder/PersonalDetailsCard.tsx`:

Change the initial `editing` state from `false` to `true`:

```typescript
const [editing, setEditing] = useState(true);  // was false
```

This makes the form view (Full Name, Professional Title, Email, Phone, Location fields) the default view when the card loads, matching the screenshot. Users can still collapse it by clicking "Done".

