import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes } from '@/lib/mdx';
import { placeholderBlurDataURL } from '@/lib/placeholder-blur';

export const metadata = {
  title: 'Receitas',
  description: 'Receitas visuais e passo a passo',
  path: '/receitas',
};

const PER_PAGE = 10;

export default async function ReceitasIndex() {
  const recipes = await getAllRecipes();
  const totalPages = Math.ceil(recipes.length / PER_PAGE) || 1;
  const slice = recipes.slice(0, PER_PAGE);
  const items = slice.map(r => ({
    slug: r.slug,
    title: r.frontmatter.title,
    image: r.frontmatter.cover ?? r.frontmatter.image ?? '/images/placeholder-article.jpg'
  }));

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Receitas</h1>
        <p className="text-zinc-700 max-w-2xl">Página de receitas em formato visual — listas de ingredientes, passo a passo e notas. Cada card leva para a receita completa.</p>
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((e) => (
            <Link key={e.slug} href={`/receitas/${e.slug}`} className="block overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <div className="relative w-full h-44">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={placeholderBlurDataURL}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{e.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-10 flex items-center justify-between text-sm">
            <span className="text-zinc-500">Página 1 de {totalPages}</span>
            <div className="flex gap-2">
              <Link href="/receitas/page/2" className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-zinc-100">Próxima →</Link>
            </div>
          </nav>
        )}
      </Container>
    </Section>
  );
}
