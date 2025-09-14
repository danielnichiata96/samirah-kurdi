import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default async function TagsPage() {
  const posts = await getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => (p.frontmatter.tags || []).forEach((t) => map.set(t, (map.get(t) || 0) + 1)));
  const tags = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Tags</h1>
        {tags.length === 0 ? (
          <p className="text-zinc-600">Sem tags ainda.</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {tags.map(([tag, count]) => (
              <li key={tag}>
                <Link
                  href={`/blog/tags/${encodeURIComponent(tag)}` as any}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
                >
                  <span className="font-medium">{tag}</span>
                  <span className="text-xs text-zinc-500">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
