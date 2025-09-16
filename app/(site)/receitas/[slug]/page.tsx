import { getAllRecipes, getRecipe } from '@/lib/mdx';
import Container from '@/components/Container';
import Section from '@/components/Section';
import { renderMdx } from '@/lib/mdx';
import React from 'react';
import type { Metadata } from 'next';
import { buildBreadcrumbJsonLd, buildMetadata, buildRecipeJsonLd } from '@/lib/seo';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getRecipe(params.slug);
  if (!post) return buildMetadata({ title: 'Receita não encontrada', path: `/receitas/${params.slug}` });
  const { frontmatter } = post;
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt || frontmatter.title,
    path: `/receitas/${post.slug}`,
    image: frontmatter.cover || frontmatter.image,
    publishedTime: frontmatter.date,
    tags: frontmatter.tags,
  });
}

export default async function ReceitaPage({ params }: Props) {
  const { slug } = params;
  // For now reuse MDX loader used for blog (you can create separate recipes loader later)
  const post = await getRecipe(slug as string, { includeDrafts: true });
  if (!post) return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold">Receita não encontrada</h1>
        <p className="text-zinc-600">Crie um arquivo em content/recipes/{slug}.mdx</p>
      </Container>
    </Section>
  );

  const mdx = await renderMdx(post.content);
  const recipeJsonLd = buildRecipeJsonLd({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    date: post.frontmatter.date,
    cover: post.frontmatter.cover || post.frontmatter.image,
    tags: post.frontmatter.tags,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', path: '/' },
    { name: 'Receitas', path: '/receitas' },
    { name: post.frontmatter.title, path: `/receitas/${post.slug}` },
  ]);

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="text-zinc-700 mb-6">{post.frontmatter.excerpt}</div>
        <article className="prose max-w-none">
          {/* @ts-ignore-next-line */}
          <div dangerouslySetInnerHTML={{ __html: mdx }} />
        </article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Container>
    </Section>
  );
}
