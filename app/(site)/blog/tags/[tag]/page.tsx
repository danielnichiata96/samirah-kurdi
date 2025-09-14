import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata, buildBreadcrumbJsonLd } from '@/lib/seo';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => (p.frontmatter.tags || []).forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const posts = await getAllPosts();
  const tag = decodeURIComponent(params.tag);
  const filtered = posts.filter((p) => (p.frontmatter.tags || []).includes(tag));
  if (filtered.length === 0) return buildMetadata({ title: 'Tag', path: `/blog/tags/${params.tag}` });
  return buildMetadata({
    title: `Tag: ${tag}`,
    description: `Posts marcados com ${tag}`,
    path: `/blog/tags/${encodeURIComponent(tag)}`,
    tags: [tag],
  });
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getAllPosts();
  const tag = decodeURIComponent(params.tag);
  const filtered = posts.filter((p) => (p.frontmatter.tags || []).includes(tag));
  if (filtered.length === 0) return notFound();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tags', path: '/blog/tags' },
    { name: tag, path: `/blog/tags/${encodeURIComponent(tag)}` },
  ]);
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Tag: <span className="font-serif">{tag}</span></h1>
        <ul className="space-y-6">
          {filtered.map((p) => (
            <li key={p.slug} className="border-b border-zinc-200 pb-6">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  <span className="font-serif">{p.frontmatter.title}</span>
                </Link>
              </h2>
              <p className="text-xs text-zinc-500 mt-1">{new Date(p.frontmatter.date).toLocaleDateString('pt-BR')}</p>
              {p.frontmatter.excerpt && <p className="text-zinc-700 mt-2">{p.frontmatter.excerpt}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm"><Link href="/blog/tags" className="text-brand hover:underline">← Todas as tags</Link></p>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Container>
    </Section>
  );
}
