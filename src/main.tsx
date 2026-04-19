import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Build tag: 2026-04-19 cache-bust forces Lovable to regenerate all chunk
// hashes after deploy graph went inconsistent post-revert.
const __BUILD_TAG__ = "2026-04-19T08:00:00Z";
if (typeof window !== "undefined") {
  (window as unknown as { __BUILD_TAG__?: string }).__BUILD_TAG__ = __BUILD_TAG__;
}

createRoot(document.getElementById("root")!).render(<App />);
