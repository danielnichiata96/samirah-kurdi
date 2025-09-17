'use client';

import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';

export default function ReceitaError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center py-10">
          <p className="text-sm font-semibold tracking-wide text-rose-600">Falha ao carregar receita</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">Algo deu errado</h1>
          <p className="mt-3 text-zinc-600">Tente novamente em instantes. Se o problema persistir, volte para a lista de receitas.</p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <button onClick={() => reset()} className="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-white border border-zinc-300 text-zinc-900 shadow-[0_6px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(0,0,0,0.12)] px-5 py-3">Tentar novamente</button>
            <Link href="/receitas" className="text-sm text-zinc-700 hover:underline">Ver Receitas</Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
