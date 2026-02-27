import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { generateSitemap } from "./scripts/generate-sitemap";

function sitemapPlugin() {
  const appPath = path.resolve(__dirname, "src/App.tsx");
  const outPath = path.resolve(__dirname, "public/sitemap.xml");
  return {
    name: "vite-plugin-sitemap",
    buildStart() {
      generateSitemap(appPath, outPath);
    },
    configureServer() {
      generateSitemap(appPath, outPath);
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
