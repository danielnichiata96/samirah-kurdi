import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';

export const metadata = {
  title: 'Você está offline',
  description: 'Sem conexão no momento. Tente novamente ou volte à página inicial.',
};

export default function OfflinePage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center py-10">
          <h1 className="text-3xl md:text-4xl font-bold">Você está offline</h1>
          <p className="mt-3 text-zinc-600">
            Não foi possível carregar os conteúdos porque sua conexão parece estar indisponível.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
              className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-white border border-zinc-300 text-zinc-900 shadow-[0_6px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(0,0,0,0.12)] px-5 py-3"
            >
              Tentar novamente
            </button>
            <Link href="/" className="text-sm text-zinc-700 hover:underline">
              Página inicial
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
