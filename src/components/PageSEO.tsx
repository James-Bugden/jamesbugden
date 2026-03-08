import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  lang?: string;
}

const BASE_URL = "https://jamesbugden.lovable.app";

/**
 * Bilingual path pairs: EN path ↔ ZH-TW path.
 * Used to auto-generate hreflang alternate links.
 */
const BILINGUAL_PAIRS: [string, string][] = [
  ["/", "/zh-tw"],
  ["/resume-guide", "/zh-tw/resume-guide"],
  ["/interview-prep-guide", "/zh-tw/interview-prep-guide"],
  ["/interview-preparation-guide", "/zh-tw/interview-preparation-guide"],
  ["/linkedin-guide", "/zh-tw/linkedin-guide"],
  ["/linkedin-branding-guide", "/zh-tw/linkedin-branding-guide"],
  ["/pivot-method-guide", "/zh-tw/pivot-method-guide"],
  ["/pivot-method-mini-guide", "/zh-tw/pivot-method-mini-guide"],
  ["/guides", "/zh-tw/guides"],
  ["/salary-starter-kit", "/zh-tw/salary-starter-kit"],
  ["/quiz", "/zh-tw/quiz"],
  ["/offer-calculator", "/zh-tw/offer-calculator"],
  ["/toolkit", "/zh-tw/toolkit"],
  ["/toolkit/scripts", "/zh-tw/toolkit/scripts"],
  ["/toolkit/offer-response", "/zh-tw/toolkit/offer-response"],
  ["/toolkit/counteroffer", "/zh-tw/toolkit/counteroffer"],
  ["/toolkit/calculator", "/zh-tw/toolkit/calculator"],
  ["/toolkit/calculator-interactive", "/zh-tw/toolkit/calculator-interactive"],
  ["/toolkit/pushback", "/zh-tw/toolkit/pushback"],
  ["/toolkit/raise", "/zh-tw/toolkit/raise"],
  ["/toolkit/log", "/zh-tw/toolkit/log"],
  ["/resume-quick-reference", "/zh-tw/resume-quick-reference"],
  ["/reviews/charlene-lee", "/zh-tw/reviews/charlene-lee"],
  ["/reviews/chien-jung-liu", "/zh-tw/reviews/chien-jung-liu"],
  ["/reviews/james-bugden", "/zh-tw/reviews/james-bugden"],
  ["/reviews/sam-lee", "/zh-tw/reviews/sam-lee"],
  ["/reviews/roger-lee", "/zh-tw/reviews/roger-lee"],
  ["/reviews/pin-wei-wu", "/zh-tw/reviews/pin-wei-wu"],
  ["/reviews/peihua-yeh", "/zh-tw/reviews/peihua-yeh"],
  ["/reviews/silvia-chen", "/zh-tw/reviews/silvia-chen"],
  ["/reviews/youting-chen", "/zh-tw/reviews/youting-chen"],
  ["/reviews/roy-tsai", "/zh-tw/reviews/roy-tsai"],
  ["/reviews/janelle-cheng", "/zh-tw/reviews/janelle-cheng"],
  ["/reviews/willy-lin", "/zh-tw/reviews/willy-lin"],
  ["/reviews/hope-chen", "/zh-tw/reviews/hope-chen"],
  ["/ai-job-search-guide", "/zh-tw/ai-job-search-guide"],
];

/** Look up index for fast matching */
const pairLookup = new Map<string, { en: string; zhTw: string }>();
for (const [en, zhTw] of BILINGUAL_PAIRS) {
  const entry = { en, zhTw };
  pairLookup.set(en, entry);
  pairLookup.set(zhTw, entry);
}

const PageSEO = ({ title, description, path, lang = "en" }: PageSEOProps) => {
  const url = `${BASE_URL}${path}`;
  const pair = pairLookup.get(path);

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {pair && (
        <>
          <link rel="alternate" hrefLang="en" href={`${BASE_URL}${pair.en}`} />
          <link rel="alternate" hrefLang="zh-Hant-TW" href={`${BASE_URL}${pair.zhTw}`} />
          <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${pair.en}`} />
        </>
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageSEO;
