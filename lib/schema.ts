export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: process.env.BRAND_NAME || 'Confeitaria',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  };
}

export function productJsonLd(slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: slug,
  };
}

export function articleJsonLd(slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: slug,
  };
}
