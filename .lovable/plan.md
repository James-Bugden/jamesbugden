

## Make Experiment Pages the New Homepages

**What changes:**
- `/` will show `IndexExperiment` (currently at `/experiment`)
- `/zh-tw` will show `IndexExperimentZhTw` (currently at `/zh-tw/experiment`)
- `/experiment` and `/zh-tw/experiment` will redirect to `/` and `/zh-tw` respectively (so old links still work)
- The old `Index` and `IndexZhTw` homepage components remain in the codebase but are no longer routed

**File: `src/App.tsx` (lines 130-133)**

Replace the four route lines with:
```tsx
<Route path="/" element={<IndexExperiment />} />
<Route path="/zh-tw" element={<IndexExperimentZhTw />} />
<Route path="/experiment" element={<Navigate to="/" replace />} />
<Route path="/zh-tw/experiment" element={<Navigate to="/zh-tw" replace />} />
```

This is a straightforward route swap -- no other files need to change.
