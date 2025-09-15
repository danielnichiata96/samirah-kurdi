import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Receitas',
  description: 'Receitas visuais e passo a passo',
  path: '/receitas',
};

export default function ReceitasIndex() {
  const examples = [
    { slug: 'sample-receita', title: 'Bolo de Chocolate Simples', image: '/images/placeholder-article.jpg' },
    { slug: 'sample-receita', title: 'Pão de Forma', image: '/images/placeholder-article.jpg' },
    { slug: 'sample-receita', title: 'Cookie Crocante', image: '/images/placeholder-article.jpg' },
  ];

  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Receitas</h1>
        <p className="text-zinc-700 max-w-2xl">Página de receitas em formato visual — listas de ingredientes, passo a passo e notas. Cada card leva para a receita completa.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((e) => (
            <Link key={e.slug} href={`/receitas/${e.slug}`} className="block overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <div className="relative w-full h-44">
                <Image src={e.image} alt={e.title} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{e.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
