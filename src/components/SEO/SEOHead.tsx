export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object | object[];
  noindex?: boolean;
  nofollow?: boolean;
  articlePublishedTime?: string;
  articleAuthor?: string[];
  articleSection?: string;
}

const DEFAULT_OG_IMAGE = `${import.meta.env.VITE_BASE_URL}/og-image.png`;
const DEFAULT_TWITTER_IMAGE = `${import.meta.env.VITE_BASE_URL}/twitter-image.png`;

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'TT Cyclopedia - Table Tennis Knowledge & Community',
  description = 'TT Cyclopedia is your comprehensive source for table tennis knowledge, equipment reviews, player tips, and community discussions. Join our table tennis community today!',
  keywords = 'table tennis, ping pong, equipment, racket, blade, rubber, reviews, tips, community, TT Cyclopedia, training, technique, tournament, player, coach',
  author = 'TT Cyclopedia Team',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage = DEFAULT_TWITTER_IMAGE,
  structuredData,
  noindex = false,
  nofollow = false,
  articlePublishedTime,
  articleAuthor,
  articleSection,
}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgUrl = ogUrl ? `${baseUrl}${ogUrl}` : baseUrl;
  const fullOgImage = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const fullTwitterImage = twitterImage?.startsWith('http') ? twitterImage : `${baseUrl}${twitterImage}`;

  const structuredDataArray = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];

  return (
    <>
      {/* Basic Meta Tags — React 19 hoists to <head> natively */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots Meta */}
      {noindex && <meta name="robots" content="noindex" />}
      {nofollow && <meta name="robots" content="nofollow" />}
      {!noindex && !nofollow && <meta name="robots" content="index, follow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullOgUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle || title} />
      <meta property="og:site_name" content="TT Cyclopedia" />
      <meta property="og:locale" content="en_US" />

      {/* Article Specific Open Graph */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleAuthor && articleAuthor.map((a, index) => (
        <meta key={index} property="article:author" content={a} />
      ))}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
      <meta name="twitter:image" content={fullTwitterImage} />
      <meta name="twitter:image:alt" content={twitterTitle || title} />

      {/* Structured Data - JSON-LD */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {/* Website + Organization Schema — only on homepage */}
      {(!canonical || canonical === '/') && (
        <>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TT Cyclopedia",
              "url": baseUrl,
              "description": description,
              "publisher": {
                "@type": "Organization",
                "name": "TT Cyclopedia",
                "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TT Cyclopedia",
              "url": baseUrl,
              "logo": `${baseUrl}/logo.png`,
              "description": description,
              "sameAs": [
                "https://twitter.com/ttcyclopedia",
                "https://www.facebook.com/ttcyclopedia",
                "https://www.instagram.com/ttcyclopedia"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@ttcyclopedia.space"
              }
            })}
          </script>
        </>
      )}
    </>
  );
};

export default SEOHead;
