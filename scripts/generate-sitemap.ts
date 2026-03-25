import fs from "fs";
import path from "path";

const BASE_URL = "https://jamesbugden.com";

// Priority rules
function getPriority(route: string): number {
  if (route === "/") return 1.0;
  if (route === "/zh-tw") return 0.9;
  if (/^\/(guides|offer-calculator|quiz|salary-starter-kit|resume-guide|linkedin|interview|pivot-method|toolkit)$/.test(route)) return 0.7;
  if (/^\/zh-tw\/(guides|offer-calculator|quiz|salary-starter-kit|resume-guide|linkedin|interview|pivot-method|toolkit)$/.test(route)) return 0.7;
  if (/\/toolkit\//.test(route)) return 0.5;
  if (/\/reviews\//.test(route)) return 0.4;
  if (/\/(admin|login|signup|reset-password|review|site-directory)/.test(route)) return 0.3;
  if (/\/zh-tw\//.test(route)) return 0.6;
  return 0.6;
}

// Routes to exclude from sitemap
const EXCLUDED_PATTERNS = [/^\*$/, /^\/admin/, /^\/login$/, /^\/signup$/, /^\/reset-password$/, /^\/review$/];

function shouldExclude(route: string): boolean {
  return EXCLUDED_PATTERNS.some((p) => p.test(route));
}

export function generateSitemap(appTsxPath: string, outputPath: string) {
  const content = fs.readFileSync(appTsxPath, "utf-8");

  // Match <Route path="..." — skip Navigate redirects and catch-all
  const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{<(?!Navigate)/g;
  const routes: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = routeRegex.exec(content)) !== null) {
    const route = match[1];
    if (route !== "*" && !shouldExclude(route)) {
      routes.push(route);
    }
  }

  // Also catch routes where path and element are on separate lines
  const multiLineRegex = /<Route\s+path="([^"]+)"\s*\n\s*element=/g;
  while ((match = multiLineRegex.exec(content)) !== null) {
    const route = match[1];
    if (route !== "*" && !shouldExclude(route) && !routes.includes(route)) {
      routes.push(route);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  const urls = routes
    .sort()
    .map(
      (route) =>
        `  <url>\n    <loc>${BASE_URL}${route === "/" ? "/" : route}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${getPriority(route).toFixed(1)}</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`[sitemap] Generated ${routes.length} URLs → ${outputPath}`);
}
