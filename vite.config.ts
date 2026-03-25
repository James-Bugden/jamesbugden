import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

function sitemapPlugin() {
  return {
    name: "sitemap-generator",
    buildEnd: () => {
      console.log("Running sitemap generator...");
      try {
        execSync("bun run src/lib/generate-sitemap.ts", { stdio: "inherit" });
      } catch (error) {
        console.error("Failed to generate sitemap:", error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
