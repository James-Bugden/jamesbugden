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
        // MINIMAL chunking — only split deps that are (a) huge and (b)
        // have NO circular imports with other deps.
        //
        // Previous attempt split mammoth / pdf-lib / jspdf / html2canvas
        // into their own chunks, which triggered a Temporal Dead Zone
        // crash at load time:
        //   ReferenceError: Cannot access '_' before initialization
        //   at vendor-docx-*.js:1:1150
        // …caused by circular imports between chunks (mammoth uses
        // lodash; lodash modules end up in vendor-misc; a cycle at
        // module-init time).
        //
        // The safe pattern: only split deps that are standalone
        // internally. Everything else stays in one big vendor chunk
        // so Rollup can resolve the dep graph naturally.
        //
        // Root cause we're solving: without ANY manualChunks, Rollup
        // creates ONE FILE PER lucide-react icon (85+ files, 600 bytes
        // each), which makes the app take 30s to boot.
        //
        // Do NOT split mammoth, pdf-lib, jspdf, html2canvas, html-to-image,
        // @tiptap, or recharts without first verifying no TDZ crash.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          // lucide-react: the critical fix. 85+ icons → 1 chunk.
          if (id.includes("lucide-react")) return "vendor-lucide";
          // pdfjs-dist: standalone, ~750 KB gz, only used by the
          // resume-builder + analyzer — worth isolating.
          if (id.includes("pdfjs-dist")) return "vendor-pdfjs";
          // Everything else stays in the default vendor chunk.
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
}));
