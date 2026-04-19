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
  build: {
    rollupOptions: {
      output: {
        // CRITICAL: without manualChunks, Rollup produces one chunk per
        // lucide icon import (`save.js`, `sparkles.js`, ...) resulting in
        // 80+ tiny files the browser loads serially. The `/resume` route
        // was taking 30+ seconds to boot on real networks — users saw the
        // "JAMES BUGDEN" spinner indefinitely. Grouping deps into named
        // vendor chunks fixes the loading time + makes future bundle
        // regressions visible in the build output.
        //
        // A function form of manualChunks lets us catch ANY node_modules
        // import (including transitive) so a new dep added by Lovable's
        // bot doesn't silently fall back to per-file splitting.
        //
        // Do NOT remove this block. Fixes the "app stuck on splash
        // screen" bug on production.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("lucide-react")) return "vendor-lucide";
          if (id.includes("@react-pdf")) return "vendor-pdf-render";
          if (id.includes("pdfjs-dist") || id.includes("pdf-lib")) return "vendor-pdf-parse";
          if (id.includes("jspdf") || id.includes("html2canvas") || id.includes("html-to-image")) return "vendor-pdf-other";
          if (id.includes("mammoth")) return "vendor-docx";
          if (id.includes("@tiptap")) return "vendor-editor";
          if (id.includes("recharts")) return "vendor-charts";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@supabase")) return "vendor-supabase";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("react-dom") || id.includes("react/") || id.match(/node_modules\/react\/index/)) return "vendor-react";
          return "vendor-misc";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
