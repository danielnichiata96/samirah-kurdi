import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        {posts.length === 0 ? (
          <p className="text-zinc-600">Posts em breve.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-zinc-200 pb-6">
                <h2 className="text-xl font-semibold">
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    <span className="font-serif">{p.frontmatter.title}</span>
                  </Link>
                </h2>
                <p className="text-xs text-zinc-500 mt-1">{new Date(p.frontmatter.date).toLocaleDateString('pt-BR')}</p>
                {p.frontmatter.excerpt && (
                  <p className="text-zinc-700 mt-2">{p.frontmatter.excerpt}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
