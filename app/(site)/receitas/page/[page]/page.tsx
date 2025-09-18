import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes } from '@/lib/mdx';
import { placeholderBlurDataURL } from '@/lib/placeholder-blur';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

const PER_PAGE = 10;

// Revalidate paginated recipe pages every 6 hours
export const revalidate = 21600;
export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  const totalPages = Math.ceil(recipes.length / PER_PAGE);
  const params: { page: string }[] = [];
  for (let i = 2; i <= totalPages; i++) params.push({ page: String(i) });
  return params;
}

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  const pageNum = Number(params.page);
  if (Number.isNaN(pageNum) || pageNum < 2) {
    return buildMetadata({ title: 'Receitas', path: '/receitas' });
  }
  return buildMetadata({ title: `Receitas - Página ${pageNum}`, path: `/receitas/page/${pageNum}` });
}

export default async function ReceitasPaginatedPage({ params }: { params: { page: string } }) {
  const pageNum = Number(params.page);
  if (Number.isNaN(pageNum) || pageNum < 2) return null;
  const recipes = await getAllRecipes();
  const totalPages = Math.ceil(recipes.length / PER_PAGE) || 1;
  if (pageNum > totalPages) return null;
  const start = (pageNum - 1) * PER_PAGE;
  const pageItems = recipes.slice(start, start + PER_PAGE).map((r) => ({
    slug: r.slug,
    title: r.frontmatter.title,
  image: r.frontmatter.cover ?? r.frontmatter.image ?? '/images/placeholder-ebook.png',
  }));

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Receitas</h1>
        {pageItems.length === 0 ? (
          <p className="text-zinc-600 mt-6">Nenhuma receita nesta página.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((e) => (
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
        )}
        <nav aria-label="Paginação" className="mt-10 flex items-center justify-between text-sm">
          <div className="flex gap-2 items-center text-zinc-500">Página {pageNum} de {totalPages}</div>
          <div className="flex gap-2">
            {pageNum > 1 && (
              <Link href={pageNum === 2 ? '/receitas' : `/receitas/page/${pageNum - 1}`} className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-zinc-100">← Anterior</Link>
            )}
            {pageNum < totalPages && (
              <Link href={`/receitas/page/${pageNum + 1}`} className="inline-flex rounded border border-zinc-200 px-3 py-1.5 hover:bg-zinc-100">Próxima →</Link>
            )}
          </div>
        </nav>
      </Container>
    </Section>
  );
}
