import Container from './Container';
import Button from './Button';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { getHeroImage } from '@/lib/hero';

export default async function Hero() {
  // Destaque: último post do blog
  const posts = await getAllPosts();
  const latest = posts[0];
  const cover = latest?.frontmatter.cover || getHeroImage();

  return (
    <div className="relative">
      <Container className="py-12 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          {/* Coluna esquerda: Destaque do blog */}
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 bg-zinc-900 text-white min-h-[320px] md:min-h-[420px]">
            <Image
              src={cover}
              alt={latest ? latest.frontmatter.title : 'Destaque do blog'}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" aria-hidden="true" />
            <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-10">
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-200">Novo post</p>
              <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] drop-shadow-sm">
                {latest ? latest.frontmatter.title : 'Conteúdo em breve'}
              </h2>
              <div className="mt-6">
                {latest ? (
                  <Link href={`/blog/${latest.slug}`} className="inline-flex">
                    <Button variant="accent" size="lg" className="px-6 md:px-8 py-3 text-base">
                      Leia já →
                    </Button>
                  </Link>
                ) : (
                  <Link href="/blog" className="inline-flex">
                    <Button variant="accent" size="lg" className="px-6 md:px-8 py-3 text-base">Ver blog</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Coluna direita: Consultoria + E-book */}
          <div className="flex">
            <div className="relative flex-1 rounded-2xl ring-1 ring-black/5 bg-zinc-900 text-white p-6 md:p-8 lg:p-10">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">Consultoria e Aulas de Confeitaria Profissional</h1>
              <p className="mt-3 text-zinc-200 md:text-lg max-w-prose">
                Ajudamos confeiteiros(as) a padronizar receitas, precificar e vender mais.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contato" className="inline-flex">
                  <Button variant="accent" size="lg" className="px-6 md:px-8 py-3 text-base">Agendar consultoria</Button>
                </Link>
                <Link href="/ebooks" className="inline-flex">
                  <Button variant="accent" size="lg" className="px-6 md:px-8 py-3 text-base">Comprar e-book</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
