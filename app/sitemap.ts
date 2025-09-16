import type { MetadataRoute } from 'next';
import { getAllPosts, getAllRecipes } from '@/lib/mdx';
import ebooks from '@/content/ebooks.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const staticRoutes = ['', '/sobre', '/servicos', '/ebooks', '/blog', '/contato', '/blog/tags', '/receitas', '/politica-de-privacidade', '/termos'].map((p) => ({
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
  // Ebooks detail pages
  const ebookEntries = Array.isArray(ebooks)
    ? (ebooks as any[]).map((e) => ({
        url: `${base}/ebooks/${e.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
      }))
    : [];
  // Recipes detail + paginated routes
  const recipes = await getAllRecipes({ includeDrafts: false });
  const recipeEntries = recipes.map((r) => ({
    url: `${base}/receitas/${r.slug}`,
    lastModified: new Date(r.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  const PER_PAGE = 10;
  const totalPages = Math.ceil(recipes.length / PER_PAGE);
  const paginatedEntries = totalPages > 1
    ? Array.from({ length: totalPages - 1 }, (_, i) => ({
        url: `${base}/receitas/page/${i + 2}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
    : [];
  return [...staticRoutes, ...postEntries, ...tagEntries, ...ebookEntries, ...recipeEntries, ...paginatedEntries];
}
