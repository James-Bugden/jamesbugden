import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Build tag: 2026-04-26 Hiresign rebrand cache-bust, old Playfair-Display
// CSS chunk was sticking on the CDN even after main bundle hash rotated.
// Bumping this forces Vite to regenerate the entire chunk graph so the new
// Geist-only font stack lands in production.
const __BUILD_TAG__ = "2026-04-26T22:30:00Z-tailwind-geist";
if (typeof window !== "undefined") {
  (window as unknown as { __BUILD_TAG__?: string }).__BUILD_TAG__ = __BUILD_TAG__;
}

createRoot(document.getElementById("root")!).render(<App />);
