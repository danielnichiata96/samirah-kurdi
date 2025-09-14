import { notFound } from 'next/navigation';
import Image from 'next/image';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import { getPost, renderMdx } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return notFound();
  const mdx = await renderMdx(post.content);

  return (
    <Section>
      <Container>
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="font-serif">{post.frontmatter.title}</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-2">
              {new Date(post.frontmatter.date).toLocaleDateString('pt-BR')}
            </p>
            {post.frontmatter.cover && (
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg ring-1 ring-black/5">
                <Image src={post.frontmatter.cover} alt={post.frontmatter.title} fill className="object-cover" />
              </div>
            )}
          </header>
          <Prose>
            <MDXRemote source={mdx} />
          </Prose>
        </article>
      </Container>
    </Section>
  );
}
