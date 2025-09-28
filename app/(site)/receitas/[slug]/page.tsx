import { getAllRecipes, getRecipe } from '@/lib/mdx';
import Container from '@/components/Container';
import Section from '@/components/Section';
import React from 'react';
import type { Metadata } from 'next';
import { buildBreadcrumbJsonLd, buildMetadata, buildRecipeJsonLd } from '@/lib/seo';
import Prose from '@/components/Prose';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import RecipeHeader from '@/components/RecipeHeader';
import MDXImage from '@/components/MDXImage';
import RecipeSummary from '@/components/RecipeSummary';

type Props = { params: { slug: string } };

// Revalidate recipe detail pages daily
export const revalidate = 86400;

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
    <Section className="pb-16">
      <Container>
        {/* Header */}
        <RecipeHeader
          title={post.frontmatter.title}
          excerpt={post.frontmatter.excerpt}
          date={post.frontmatter.date}
          cover={post.frontmatter.cover || post.frontmatter.image}
          category={post.frontmatter.category || post.frontmatter.tags?.[0]}
          rating={post.frontmatter.rating}
          reviews={post.frontmatter.reviews}
          prepTime={post.frontmatter.prepTime}
          cookTime={post.frontmatter.cookTime}
          totalTime={post.frontmatter.totalTime}
          className="mt-2"
        />

        {/* Content */}
        <div className="mx-auto mt-10 max-w-4xl">
          <Prose className="min-w-0">
            {/* Server-rendered MDX content */}
            <MDXRemote source={post.content} components={{ Image: MDXImage }} />
          </Prose>
          
          {/* Recipe Summary - Auto-generated from frontmatter */}
          <div className="mt-12">
            <RecipeSummary
              title={post.frontmatter.title}
              cover={post.frontmatter.cover || post.frontmatter.image}
              prepTime={post.frontmatter.prepTime}
              cookTime={post.frontmatter.cookTime}
              totalTime={post.frontmatter.totalTime}
              servings={post.frontmatter.servings}
              category={post.frontmatter.category || post.frontmatter.tags?.[0]}
              ingredients={post.frontmatter.ingredients}
              instructions={post.frontmatter.instructions}
            />
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Container>
    </Section>
  );
}
