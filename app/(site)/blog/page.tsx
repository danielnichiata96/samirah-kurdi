import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import Image from 'next/image';
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagePosts.map((p) => {
              const imgSrc = p.frontmatter.cover ?? p.frontmatter.image ?? '/images/placeholder-article.jpg';
              return (
                <article key={p.slug} className="group">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-zinc-200">
                      <div className="relative w-full h-44">
                        <Image
                          src={imgSrc}
                          alt={p.frontmatter.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="/images/placeholder-article.jpg"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-zinc-900">{p.frontmatter.title}</h3>
                        <p className="text-xs text-zinc-500 mt-1">{new Date(p.frontmatter.date).toLocaleDateString('pt-BR')}</p>
                        {p.frontmatter.excerpt && <p className="text-zinc-700 mt-2 line-clamp-3">{p.frontmatter.excerpt}</p>}
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
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
