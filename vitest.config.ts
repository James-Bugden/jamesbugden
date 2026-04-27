import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Override any inherited NODE_ENV so React (and act()) load test/dev builds
// instead of the production min build.
process.env.NODE_ENV = "test";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
