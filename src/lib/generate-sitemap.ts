// Sitemap generation script
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as parser from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import { JSXAttribute, JSXIdentifier, JSXOpeningElement } from "@babel/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ———————————————
// CONFIGURATION
// ———————————————

const BASE_URL = "https://jamesbugden.com";
const ROUTER_FILE_PATH = path.resolve(__dirname, "../App.tsx");
const OUTPUT_DIR = path.resolve(__dirname, "../../public");
const IGNORE_PATHS: string[] = [
  "/admin/*",
  "/login",
  "/signup",
  "/reset-password",
  "/dashboard",
  "/zh-tw/dashboard",
  "/review",
  "/jobs",
  "/tracker",
  "/site-directory",
];

// ———————————————
// SITEMAP SCRIPT
// ———————————————

const SITEMAP_PATH = path.join(OUTPUT_DIR, "sitemap.xml");

function getAttributeValue(
  astPath: NodePath<JSXOpeningElement>,
  attributeName: string
): string | null {
  const attribute = astPath.node.attributes.find(
    (attr): attr is JSXAttribute =>
      attr.type === "JSXAttribute" && attr.name.name === attributeName
  );
  if (!attribute) return null;
  const value = attribute.value;
  if (value?.type === "StringLiteral") return value.value;
  return null;
}

function joinPaths(paths: string[]): string {
  if (paths.length === 0) return "/";
  const joined = paths.join("/");
  const cleaned = ("/" + joined).replace(/\/+/g, "/");
  if (cleaned.length > 1 && cleaned.endsWith("/")) return cleaned.slice(0, -1);
  return cleaned;
}

function shouldIgnoreRoute(route: string): boolean {
  for (const ignorePattern of IGNORE_PATHS) {
    if (ignorePattern === route) return true;
    if (ignorePattern.endsWith("/*")) {
      const prefix = ignorePattern.slice(0, -2);
      if (route.startsWith(prefix + "/") || route === prefix) return true;
    }
  }
  return false;
}

function createSitemapXml(routes: string[]): string {
  const today = new Date().toISOString().split("T")[0];
  const urls = routes
    .map((route) => {
      const fullUrl = new URL(route, BASE_URL).href;
      return `
    <url>
      <loc>${fullUrl}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;
}

async function generateSitemap() {
  console.log("Generating sitemap...");
  if (!BASE_URL.startsWith("http")) {
    console.error('Error: BASE_URL must be a full URL (e.g., "https://example.com")');
    process.exit(1);
  }
  const content = fs.readFileSync(ROUTER_FILE_PATH, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
  const pathStack: string[] = [];
  const foundRoutes: string[] = [];
  traverse(ast, {
    JSXOpeningElement: {
      enter(astPath) {
        const nodeName = astPath.node.name as JSXIdentifier;
        if (nodeName.name !== "Route") return;
        const pathProp = getAttributeValue(astPath, "path");
        const hasElement = astPath.node.attributes.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "element"
        );
        if (pathProp) pathStack.push(pathProp);
        if (hasElement && pathProp) {
          const fullRoute = joinPaths(pathStack);
          foundRoutes.push(fullRoute);
        }
      },
      exit(astPath) {
        const nodeName = astPath.node.name as JSXIdentifier;
        if (nodeName.name !== "Route") return;
        const pathProp = getAttributeValue(astPath, "path");
        if (pathProp) pathStack.pop();
      },
    },
  });
  const staticRoutes = foundRoutes.filter(
    (route) => !route.includes(":") && !route.includes("*")
  );
  const filteredRoutes = staticRoutes.filter(
    (route) => !shouldIgnoreRoute(route)
  );
  console.log(`Found ${foundRoutes.length} total routes.`);
  console.log(`Filtered ${staticRoutes.length - filteredRoutes.length} ignored routes.`);
  console.log(`Final ${filteredRoutes.length} routes in sitemap.`);
  if (filteredRoutes.length > 0) console.log("Routes:", filteredRoutes.join(", "));
  const sitemapXml = createSitemapXml(filteredRoutes);
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, sitemapXml);
  console.log(`Sitemap successfully generated at ${SITEMAP_PATH}`);
}

generateSitemap().catch(console.error);
