import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  lang?: string;
}

const BASE_URL = "https://jamesbugden.lovable.app";

const PageSEO = ({ title, description, path, lang = "en" }: PageSEOProps) => {
  const url = `${BASE_URL}${path}`;
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
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
