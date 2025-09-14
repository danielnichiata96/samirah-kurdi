import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const staticRoutes = ['', '/sobre', '/servicos', '/ebooks', '/blog', '/contato', '/blog/tags'].map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  const posts = await getAllPosts({ includeDrafts: false });
  const postEntries = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const tagSet = new Set<string>();
  posts.forEach((p) => (p.frontmatter.tags || []).forEach((t) => tagSet.add(t)));
  const tagEntries = Array.from(tagSet).map((t) => ({
    url: `${base}/blog/tags/${encodeURIComponent(t)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));
  return [...staticRoutes, ...postEntries, ...tagEntries];
}
