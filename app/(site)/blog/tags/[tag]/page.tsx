import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getAllPosts();
  const tag = decodeURIComponent(params.tag);
  const filtered = posts.filter((p) => (p.frontmatter.tags || []).includes(tag));
  if (filtered.length === 0) return notFound();
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
      </Container>
    </Section>
  );
}
