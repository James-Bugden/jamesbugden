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
  // Worker bundling: the PDF render worker (src/workers/pdfRenderer.worker.ts)
  // uses dynamic import() to dodge module-init side effects from react-pdf
  // before we shim `window`/`document`. Rollup defaults to IIFE for worker
  // output, which is incompatible with code-splitting (dynamic imports).
  // Use ES modules so the worker can code-split freely.
  worker: {
    format: "es",
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
          // The critical fix. 85+ icons → 1 chunk.
          if (id.includes("lucide-react")) return "vendor-lucide";
          // Standalone, ~750 KB gz, only used by the resume-builder + analyzer.
          if (id.includes("pdfjs-dist")) return "vendor-pdfjs";
          // Consolidate the Radix UI primitives. On the current CDN, each
          // tiny Radix sub-package was getting its own ~500-2000 byte chunk
          // and each one took 20-25s to download — the resume-builder route
          // pulls 10+ of these and the serial waterfall exceeded the 45s
          // preview timeout. Collapsing them to one chunk cuts the serial
          // dep chain drastically.
          if (id.includes("@radix-ui/")) return "vendor-radix";
          // Same story for framer-motion, cmdk, vaul — small-ish standalones
          // that produced their own chunks.
          if (id.includes("framer-motion") || id.includes("cmdk") || id.includes("vaul")) return "vendor-motion";
          // tiptap — editor stack. Consolidate to reduce chunk count.
          if (id.includes("@tiptap/")) return "vendor-editor";
          // recharts — admin/salary charts. Single chunk.
          if (id.includes("recharts")) return "vendor-charts";
          // @dnd-kit — drag-drop UI. Single chunk.
          if (id.includes("@dnd-kit/")) return "vendor-dnd";
          // Everything else stays in the default vendor chunk.
          // Do NOT split mammoth / pdf-lib / jspdf / html2canvas — those
          // have circular imports with lodash and produce TDZ crashes
          // when split (see PR #17).
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
}));
