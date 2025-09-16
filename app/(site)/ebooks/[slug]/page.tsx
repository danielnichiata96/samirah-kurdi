import Image from 'next/image';
import Section from '@/components/Section';
import Container from '@/components/Container';
import ebooks from '@/content/ebooks.json';
import { siteConfig } from '@/lib/config';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import { buildMetadata, buildBreadcrumbJsonLd, buildProductJsonLd } from '@/lib/seo';

type Ebook = typeof ebooks[number];

export function generateStaticParams() {
  return (ebooks as Ebook[]).map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const ebook = (ebooks as Ebook[]).find(e => e.slug === params.slug);
  if (!ebook) return buildMetadata({ title: 'E-book', path: `/ebooks/${params.slug}` });
  const title = `${ebook.titulo} — E-book`;
  const description = ebook.descricao;
  return buildMetadata({
    title,
    description,
    path: `/ebooks/${ebook.slug}`,
    image: ebook.capa,
  });
}

export default function EbookDetailPage({ params }: { params: { slug: string } }) {
  const ebook = (ebooks as Ebook[]).find(e => e.slug === params.slug);
  if (!ebook) {
    return (
      <Section>
        <Container>
          <h1 className="text-3xl font-bold mb-4">E-book não encontrado</h1>
          <p className="text-zinc-600"><Link href="/ebooks" className="text-brand hover:underline">← Voltar</Link></p>
        </Container>
      </Section>
    );
  }

  const checkoutUrl = siteConfig.commerce.checkoutEbook || '/contato';
  const productJsonLd = buildProductJsonLd({
    slug: ebook.slug,
    name: ebook.titulo,
    description: ebook.descricao,
    image: ebook.capa,
    price: ebook.preco,
    url: checkoutUrl.startsWith('http') ? checkoutUrl : undefined,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', path: '/' },
    { name: 'E-books', path: '/ebooks' },
    { name: ebook.titulo, path: `/ebooks/${ebook.slug}` },
  ]);

  return (
  <>
      {/* Hero */}
      <Section className="pt-12 pb-6">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-sm uppercase tracking-wide text-zinc-500">E-book</p>
              <h1 className="text-4xl font-bold leading-tight"><span className="font-sans">{ebook.titulo}</span></h1>
              <p className="text-lg text-zinc-700 max-w-prose">{ebook.descricao}</p>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-semibold">
                  {ebook.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button size="lg">Comprar agora</Button>
                </a>
              </div>
              <p className="text-xs text-zinc-500">Download imediato • PDF • Atualizações menores incluídas</p>
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl ring-1 ring-black/5 order-1 lg:order-2 bg-white">
              <Image src={ebook.capa} alt={ebook.titulo} fill className="object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefícios */}
      {ebook.beneficios && (
        <Section className="py-12 bg-[color:var(--surface)]/60">
          <Container>
            <h2 className="text-2xl font-bold mb-6"><span className="font-sans">O que você ganha</span></h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {ebook.beneficios.map((b: string) => (
                <li key={b} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Público alvo */}
      {(ebook.publico || ebook.naoIndicado) && (
        <Section className="py-14">
          <Container>
            <div className="grid md:grid-cols-2 gap-10">
              {ebook.publico && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Para quem é</h3>
                  <ul className="space-y-2 text-sm">
                    {ebook.publico.map((p: string) => <li key={p} className="pl-4 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand">{p}</li>)}
                  </ul>
                </div>
              )}
              {ebook.naoIndicado && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Não indicado se</h3>
                  <ul className="space-y-2 text-sm">
                    {ebook.naoIndicado.map((n: string) => <li key={n} className="pl-4 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-400">{n}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Sumário */}
      {ebook.sumario && (
        <Section className="py-14 bg-white">
          <Container>
            <h2 className="text-2xl font-bold mb-6"><span className="font-sans">Sumário</span></h2>
            <ol className="space-y-2 text-sm list-decimal pl-6">
              {ebook.sumario.map((c: string) => <li key={c}>{c}</li>)}
            </ol>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      {ebook.faq && (
        <Section className="py-16 bg-[color:var(--surface)]/50">
          <Container>
            <h2 className="text-2xl font-bold mb-8"><span className="font-sans">Perguntas frequentes</span></h2>
            <div className="space-y-6">
              {ebook.faq.map((item: any) => (
                <div key={item.q} className="rounded-lg border border-zinc-200 bg-white p-5">
                  <h3 className="font-medium mb-2">{item.q}</h3>
                  <p className="text-sm text-zinc-700 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA final */}
      <Section className="py-20">
        <Container>
          <div className="rounded-2xl border border-zinc-200 p-8 md:p-12 bg-gradient-to-br from-brand/10 via-white to-white">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold leading-tight"><span className="font-sans">Pronto para padronizar seus brigadeiros?</span></h2>
              <p className="text-zinc-700 text-base">Garanta acesso imediato e comece hoje a produzir com consistência e margem clara.</p>
              <a
                href={checkoutUrl}
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-base font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Comprar agora
              </a>
              <p className="text-xs text-zinc-500">Precisa de algo mais avançado? <Link href="/contato" className="text-brand hover:underline">Fale sobre consultoria →</Link></p>
            </div>
          </div>
        </Container>
      </Section>

  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
