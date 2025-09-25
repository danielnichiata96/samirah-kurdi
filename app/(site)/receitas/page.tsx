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

// Revalidate the recipes listing every 6 hours
export const revalidate = 21600;

const PER_PAGE = 12;

type PageProps = {
  searchParams?: { cat?: string };
};

export default async function ReceitasIndex({ searchParams }: PageProps) {
  const recipes = await getAllRecipes();
  const categories = Array.from(
    new Set(
      recipes
        .map((r) => (r.frontmatter as any).category as string | undefined)
        .filter(Boolean)
    )
  ).sort((a, b) => a!.localeCompare(b!));

  const selectedCat = searchParams?.cat || '';
  const filtered = selectedCat
    ? recipes.filter((r) => (r.frontmatter as any).category === selectedCat)
    : recipes;

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const slice = filtered.slice(0, PER_PAGE);
  const items = slice.map((r) => ({
    slug: r.slug,
    title: r.frontmatter.title,
    image: r.frontmatter.cover ?? (r.frontmatter as any).image ?? '/images/placeholder-ebook.png',
    category: (r.frontmatter as any).category as string | undefined,
    rating: (r.frontmatter as any).rating as number | undefined,
    totalTime: (r.frontmatter as any).totalTime as string | undefined,
  }));

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="uppercase tracking-[0.2em] text-xs text-zinc-500">novidades</p>
          <h1 className="font-display text-3xl md:text-5xl leading-tight text-zinc-900 mt-2">Receitas</h1>
          <p className="text-zinc-700 max-w-2xl mt-3">Receitas em formato visual — listas de ingredientes, passo a passo e notas. Explore por categorias e encontre sua próxima sobremesa.</p>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
            <Link
              href="/receitas"
              className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm ${
                !selectedCat
                  ? 'border-rose-300 bg-rose-50 text-rose-700'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-rose-300 hover:bg-rose-50'
              }`}
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/receitas?cat=${encodeURIComponent(cat!)}`}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm ${
                  selectedCat === cat
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        {/* Grid */}
        {items.length === 0 ? (
          <p className="text-zinc-600 mt-6">Nenhuma receita encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((e) => (
              <Link
                key={e.slug}
                href={`/receitas/${e.slug}`}
                className="block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm hover:shadow-md hover:border-rose-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
              >
                <div className="relative w-full aspect-[4/3]">
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
                  <div className="flex items-center gap-2 mb-2">
                    {e.category && (
                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-700">
                        {e.category}
                      </span>
                    )}
                    {e.totalTime && (
                      <span className="text-[12px] text-zinc-500">⏱ {e.totalTime}</span>
                    )}
                    {typeof e.rating === 'number' && (
                      <span className="ml-auto text-[12px] text-zinc-600">
                        <span className="text-rose-500">★</span> {e.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-sm text-rose-700">
                      Ver receita
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-10 flex items-center justify-between text-sm">
            <span className="text-zinc-500">Página 1 de {totalPages}</span>
            <div className="flex gap-2">
              <Link href="/receitas/page/2" className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-rose-50 hover:border-rose-300">Próxima →</Link>
            </div>
          </nav>
        )}
      </Container>
    </Section>
  );
}
