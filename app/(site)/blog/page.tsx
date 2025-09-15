import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import type { Metadata } from 'next';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';

const PER_PAGE = 10;

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Artigos sobre confeitaria profissional, precificação e gestão',
  path: '/blog',
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PER_PAGE) || 1;
  const pagePosts = posts.slice(0, PER_PAGE);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);
  const isDev = process.env.NODE_ENV !== 'production';
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        {pagePosts.length === 0 ? (
          <p className="text-zinc-600">Posts em breve.</p>
        ) : (
          <ul className="space-y-6">
            {pagePosts.map((p) => (
              <li key={p.slug} className="border-b border-zinc-200 pb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 flex-wrap">
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    <span className="font-sans">{p.frontmatter.title}</span>
                  </Link>
                  {isDev && p.frontmatter.draft && (
                    <span className="inline-block rounded bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 text-[10px] uppercase tracking-wide">Draft</span>
                  )}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">{new Date(p.frontmatter.date).toLocaleDateString('pt-BR')}</p>
                {p.frontmatter.excerpt && (
                  <p className="text-zinc-700 mt-2">{p.frontmatter.excerpt}</p>
                )}
              </li>
            ))}
          </ul>
        )}
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-10 flex items-center justify-between text-sm">
            <span className="text-zinc-500">Página 1 de {totalPages}</span>
            <div className="flex gap-2">
              <Link href="/blog/page/2" className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-zinc-100">Próxima →</Link>
            </div>
          </nav>
        )}
      </Container>
    </Section>
  );
}
