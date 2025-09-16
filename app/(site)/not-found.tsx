import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center py-10">
          <p className="text-sm font-semibold tracking-wide text-rose-600">Erro 404</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">Página não encontrada</h1>
          <p className="mt-3 text-zinc-600">
            A página que você procura pode ter sido movida, renomeada ou nunca existiu.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-white border border-zinc-300 text-zinc-900 shadow-[0_6px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(0,0,0,0.12)] px-5 py-3"
            >
              Voltar para a página inicial
            </Link>
            <Link href="/blog" className="text-sm text-zinc-700 hover:underline">
              Ir para o Blog
            </Link>
            <Link href="/receitas" className="text-sm text-zinc-700 hover:underline">
              Ver Receitas
            </Link>
            <Link href="/contato" className="text-sm text-zinc-700 hover:underline">
              Falar com a Samirah
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
