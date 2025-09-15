import { notFound } from 'next/navigation';
import Image from 'next/image';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import { getPost, renderMdx } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import { buildMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import { getAllPosts } from '@/lib/mdx';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return buildMetadata({ title: 'Post não encontrado', path: `/blog/${params.slug}` });
  const { frontmatter } = post;
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt || frontmatter.title,
    path: `/blog/${post.slug}`,
    image: frontmatter.cover,
    publishedTime: frontmatter.date,
    tags: frontmatter.tags,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return notFound();
  const mdx = await renderMdx(post.content);
  const wordCount = post.content.trim().split(/\s+/).length;
  const articleJsonLd = buildArticleJsonLd({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    date: post.frontmatter.date,
    cover: post.frontmatter.cover,
    tags: post.frontmatter.tags,
    wordCount,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.frontmatter.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <Section>
      <Container>
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight font-sans flex items-center gap-3 flex-wrap">
              {post.frontmatter.title}
              {process.env.NODE_ENV !== 'production' && post.frontmatter.draft && (
                <span className="inline-block rounded bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 text-[10px] uppercase tracking-wide">Draft</span>
              )}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Container>
    </Section>
  );
}
