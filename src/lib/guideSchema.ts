import { SITE_URL, SITE_NAME } from "@/config/seo-config";

interface GuideSchemaOptions {
  path: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}

/**
 * Generates Article JSON-LD structured data for guide pages.
 * Helps Google show rich results (breadcrumbs, author info, dates).
 */
export function guideSchema({
  path,
  title,
  description,
  datePublished = "2024-06-01",
  dateModified = "2025-06-01",
}: GuideSchemaOptions): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: "James Bugden",
      url: SITE_URL,
      jobTitle: "Senior Recruiter & Career Coach",
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    inLanguage: path.startsWith("/zh-tw") ? "zh-TW" : "en",
  };
}
