import { getPost } from '@/lib/mdx';
import Container from '@/components/Container';
import Section from '@/components/Section';
import { renderMdx } from '@/lib/mdx';
import React from 'react';

type Props = { params: { slug: string } };

export default async function ReceitaPage({ params }: Props) {
  const { slug } = params;
  // For now reuse MDX loader used for blog (you can create separate recipes loader later)
  const post = await getPost(slug as string, { includeDrafts: true });
  if (!post) return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold">Receita não encontrada</h1>
        <p className="text-zinc-600">Crie um arquivo em content/recipes/{slug}.mdx</p>
      </Container>
    </Section>
  );

  const mdx = await renderMdx(post.content);

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="text-zinc-700 mb-6">{post.frontmatter.excerpt}</div>
        <article className="prose max-w-none">
          {/* @ts-ignore-next-line */}
          <div dangerouslySetInnerHTML={{ __html: mdx }} />
        </article>
      </Container>
    </Section>
  );
}
