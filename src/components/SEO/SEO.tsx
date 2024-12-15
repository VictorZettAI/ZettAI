import { Helmet } from 'react-helmet-async';
import { CONFIG } from '@/constants/config';
import { env } from '@/config/env';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
}

const DEFAULT_TITLE = CONFIG.site.name;
const DEFAULT_DESCRIPTION = CONFIG.site.description;
const DEFAULT_IMAGE = `${CONFIG.site.url}/og-image.jpg`;
const SITE_NAME = CONFIG.site.name;
const TWITTER_HANDLE = CONFIG.social.twitter ? CONFIG.social.twitter.split('/').pop() : '';

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = CONFIG.site.url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords = CONFIG.meta.keywords,
  noindex = false,
}: SEOProps) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {TWITTER_HANDLE && (
        <meta name="twitter:creator" content={`@${TWITTER_HANDLE}`} />
      )}

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: fullTitle,
          description,
          image,
          url,
          ...(type === 'article' && {
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            author: {
              '@type': 'Person',
              name: author,
            },
          }),
        })}
      </script>
    </Helmet>
  );
}
