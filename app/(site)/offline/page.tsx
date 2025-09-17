import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';
import ReloadButton from '@/components/ReloadButton';

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
            <ReloadButton />
            <Link href="/" className="text-sm text-zinc-700 hover:underline">
              Página inicial
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
