import type { Metadata } from 'next';
import { siteConfig } from './config';

// Metadata base do site. Evite repetir textos em páginas.
export const defaultMetadata: Metadata = {
  title: siteConfig.brand.name,
  description: siteConfig.brand.slogan,
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    title: siteConfig.brand.name,
    description: siteConfig.brand.slogan,
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.baseUrl,
  siteName: siteConfig.brand.name,
    images: [
      {
  url: '/images/avatar.svg',
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

type BuildMetaInput = {
  title?: string;
  description?: string;
  path?: string; // caminho relativo começando com /
  image?: string; // caminho absoluto ou relativo ao site
  publishedTime?: string; // ISO
  modifiedTime?: string; // ISO
  tags?: string[];
};

// Helper para compor Metadata de páginas reutilizando defaults.
export function buildMetadata(input: BuildMetaInput = {}): Metadata {
  const {
    title,
    description,
    path = '/',
    image,
    publishedTime,
    modifiedTime,
    tags = [],
  } = input;

  const url = new URL(path, siteConfig.baseUrl).toString();
  const imgUrl = image ? (image.startsWith('http') ? image : new URL(image, siteConfig.baseUrl).toString()) : undefined;

  return {
    ...defaultMetadata,
    title: title ? `${title} | ${siteConfig.brand.name}` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    alternates: { canonical: url },
    openGraph: {
      ...defaultMetadata.openGraph,
  url,
      title: title ? `${title} | ${siteConfig.brand.name}` : defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description,
      ...(imgUrl ? { images: [{ url: imgUrl }] } : {}),
      ...(publishedTime || modifiedTime
        ? { article: { publishedTime, modifiedTime, authors: [siteConfig.brand.name] } }
        : {}),
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...(imgUrl ? { images: [imgUrl] } : {}),
    },
    // Palavras chave adicionais derivadas de tags
    keywords: tags.length ? Array.from(new Set([...(tags || [])])) : defaultMetadata.keywords,
  } as Metadata;
}

// Gera JSON-LD para um artigo/post de blog.
export function buildArticleJsonLd(args: {
  slug: string;
  title: string;
  description?: string;
  date: string; // ISO
  modified?: string; // ISO
  cover?: string;
  tags?: string[];
  wordCount?: number;
}) {
  const { slug, title, description, date, modified, cover, tags = [], wordCount } = args;
  const url = new URL(`/blog/${slug}`, siteConfig.baseUrl).toString();
  const image = cover
    ? [cover.startsWith('http') ? cover : new URL(cover, siteConfig.baseUrl).toString()]
    : undefined;
  const logoUrl = new URL('/images/avatar.svg', siteConfig.baseUrl).toString();
  const data: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: title,
    name: title,
    description: description || siteConfig.brand.slogan,
    datePublished: date,
    dateModified: modified || date,
    author: { '@type': 'Organization', name: siteConfig.brand.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand.name,
      logo: { '@type': 'ImageObject', url: logoUrl }
    },
    isAccessibleForFree: true,
  };
  if (image) data.image = image;
  if (tags.length) data.keywords = tags.join(', ');
  if (tags.length) data.articleSection = tags[0];
  if (wordCount) data.wordCount = wordCount;
  return data;
}

// Gera JSON-LD para uma Receita.
export function buildRecipeJsonLd(args: {
  slug: string;
  title: string;
  description?: string;
  date: string; // ISO
  cover?: string;
  tags?: string[];
}) {
  const { slug, title, description, date, cover, tags = [] } = args;
  const url = new URL(`/receitas/${slug}`, siteConfig.baseUrl).toString();
  const image = cover
    ? [cover.startsWith('http') ? cover : new URL(cover, siteConfig.baseUrl).toString()]
    : undefined;
  const logoUrl = new URL('/images/avatar.svg', siteConfig.baseUrl).toString();
  const data: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    name: title,
    headline: title,
    description: description || siteConfig.brand.slogan,
    datePublished: date,
    author: { '@type': 'Organization', name: siteConfig.brand.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brand.name,
      logo: { '@type': 'ImageObject', url: logoUrl },
    },
    isAccessibleForFree: true,
  };
  if (image) data.image = image;
  if (tags.length) {
    data.keywords = tags.join(', ');
    data.recipeCategory = tags[0];
  }
  return data;
}

// BreadcrumbList JSON-LD
export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  const itemListElement = items.map((it, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: it.name,
    item: new URL(it.path, siteConfig.baseUrl).toString(),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

// JSON-LD para Product (e-book)
export function buildProductJsonLd(args: {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  currency?: string; // default BRL
  url?: string; // checkout or detail
  priceValidUntil?: string; // ISO, optional
  brand?: { name: string } | string; // optional
}) {
  const { slug, name, description, image, price, currency = 'BRL', url, priceValidUntil, brand } = args;
  const pageUrl = url || new URL(`/ebooks/${slug}`, siteConfig.baseUrl).toString();
  const img = image ? (image.startsWith('http') ? image : new URL(image, siteConfig.baseUrl).toString()) : undefined;
  const data: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description || siteConfig.brand.slogan,
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
  };
  if (img) data.image = [img];
  if (priceValidUntil) data.offers.priceValidUntil = priceValidUntil;
  if (brand) data.brand = typeof brand === 'string' ? { '@type': 'Brand', name: brand } : { '@type': 'Brand', ...(brand as any) };
  return data;
}

