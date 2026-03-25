import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { seoConfig, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/config/seo-config";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: Record<string, unknown>;
}

export function SEO({ title, description, ogImage, noIndex, schemaJson }: SEOProps) {
  const { pathname } = useLocation();

  const config = seoConfig[pathname];

  const pageTitle = title || config?.title || `${SITE_NAME} | Career Coach`;
  const pageDescription =
    description ||
    config?.description ||
    "Career coaching for professionals targeting top multinational companies.";
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE;
  const shouldNoIndex = noIndex ?? config?.noIndex ?? false;
  const canonicalUrl = `${SITE_URL}${pathname}`;

  const lang = pathname.startsWith("/zh-tw") ? "zh-TW" : "en";

  const isZhTw = pathname.startsWith("/zh-tw");
  const alternatePath = isZhTw ? pathname.replace("/zh-tw", "") || "/" : `/zh-tw${pathname}`;
  const hasAlternate = seoConfig[alternatePath] !== undefined;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {config?.keywords && <meta name="keywords" content={config.keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {shouldNoIndex && <meta name="robots" content="noindex, nofollow" />}

      {hasAlternate && (
        <link
          rel="alternate"
          hrefLang={isZhTw ? "en" : "zh-Hant-TW"}
          href={`${SITE_URL}${alternatePath}`}
        />
      )}
      <link rel="alternate" hrefLang={lang === "zh-TW" ? "zh-Hant-TW" : "en"} href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${isZhTw ? (alternatePath || "/") : pathname}`} />

      <meta property="og:type" content={config?.ogType || "website"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === "zh-TW" ? "zh_TW" : "en_US"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />

      {schemaJson && (
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
      )}
    </Helmet>
  );
}

export default SEO;
