import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

const PER_PAGE = 10;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const params: { page: string }[] = [];
  for (let i = 2; i <= totalPages; i++) params.push({ page: String(i) });
  return params;
}

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const pageNum = Number(params.page);
  if (Number.isNaN(pageNum) || pageNum < 2) {
    return buildMetadata({ title: 'Blog', path: '/blog' });
  }
  return buildMetadata({ title: `Blog - Página ${pageNum}`, path: `/blog/page/${pageNum}` });
}

export default async function BlogPaginatedPage({ params }: { params: { page: string } }) {
  const pageNum = Number(params.page);
  if (Number.isNaN(pageNum) || pageNum < 2) return null;
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PER_PAGE) || 1;
  if (pageNum > totalPages) return null;
  const start = (pageNum - 1) * PER_PAGE;
  const pagePosts = posts.slice(start, start + PER_PAGE);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: `Página ${pageNum}`, path: `/blog/page/${pageNum}` },
  ]);
  const isDev = process.env.NODE_ENV !== 'production';
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
              {p.frontmatter.excerpt && <p className="text-zinc-700 mt-2">{p.frontmatter.excerpt}</p>}
            </li>
          ))}
        </ul>
        <nav aria-label="Paginação" className="mt-10 flex items-center justify-between text-sm">
          <div className="flex gap-2 items-center text-zinc-500">Página {pageNum} de {totalPages}</div>
          <div className="flex gap-2">
            {pageNum > 1 && (
              <Link href={pageNum === 2 ? '/blog' : `/blog/page/${pageNum - 1}`} className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-zinc-100">← Anterior</Link>
            )}
            {pageNum < totalPages && (
              <Link href={`/blog/page/${pageNum + 1}`} className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-zinc-100">Próxima →</Link>
            )}
          </div>
        </nav>
      </Container>
    </Section>
  );
}
