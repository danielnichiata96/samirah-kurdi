import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import Testimonials from '@/components/Testimonials';
import testimonials from '@/content/testimonials.json';

export const metadata: Metadata = {
  title: 'Consultoria e Serviços — Padronização, Precificação e Escala',
  description: 'Diagnóstico, plano de ação e implementação para confeiteiros(as) que querem padronizar, precificar e escalar produção com qualidade.',
  openGraph: {
    title: 'Consultoria e Serviços',
    description: 'Padronização, precificação e escala para sua confeitaria.',
    type: 'website'
  }
};

export default function ServicosPage() {
  const calendly = process.env.CALENDLY_URL; // may be undefined or external
  const primaryCTA = calendly ? (
    <a href={calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Agendar diagnóstico</a>
  ) : (
    <Link href="/contato" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Agendar diagnóstico</Link>
  );
  const pkgCTA = calendly ? (urlText?: string) => <a href={calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{urlText || 'Quero esse formato'}</a> : (urlText?: string) => <Link href="/contato" className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{urlText || 'Quero esse formato'}</Link>;
  const finalCTA = calendly ? (
    <a href={calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Agendar agora</a>
  ) : (
    <Link href="/contato" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-brand text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">Agendar agora</Link>
  );

  const faq = [
    { q: 'Preciso ter equipe?', a: 'Não necessariamente. Adaptamos ao estágio atual (solo ou equipe).' },
    { q: 'Atende online?', a: 'Sim. Sessões por videochamada, com materiais compartilhados.' },
    { q: 'Inclui planilhas?', a: 'Modelos base de fichas e custos em formatos editáveis.' },
    { q: 'Prazo típico?', a: 'Diagnóstico: 1 semana. Plano completo: 30–60 dias com checkpoints.' },
    { q: 'Contrato mínimo?', a: 'Não. Escopo definido por objetivo.' },
    { q: 'Emite nota?', a: 'Sim, mediante dados fornecidos.' }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        'name': `Consultoria em Confeitaria - ${siteConfig.brand.name}`,
        'url': siteConfig.baseUrl,
        'image': `${siteConfig.baseUrl}/images/avatar.svg`,
        'description': 'Consultoria para padronização, precificação e escala de produção em confeitaria.',
        'areaServed': 'Brasil',
        'provider': {
          '@type': 'Person',
          'name': siteConfig.brand.name
        },
        'offers': {
          '@type': 'Offer',
          'availability': 'https://schema.org/InStock',
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'priceCurrency': 'BRL',
            'price': '0',
            'description': 'Preço sob consulta conforme escopo.'
          }
        },
        'review': (testimonials as any[]).slice(0,3).map(t => ({
          '@type': 'Review',
          'reviewBody': t.depoimento,
          'author': { '@type': 'Person', 'name': t.nome },
          'name': 'Depoimento'
        }))
      },
      {
        '@type': 'FAQPage',
        'mainEntity': faq.map(item => ({
          '@type': 'Question',
          'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a
            }
        }))
      }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Hero */}
  <Section className="pt-14 pb-10">
        <Container>
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-wide text-zinc-500">Consultoria</p>
            <h1 className="text-4xl font-bold leading-tight"><span className="font-sans">Padronize. Precifique. Escale.</span></h1>
            <p className="text-lg text-zinc-700">Apoio estratégico e técnico para transformar produção artesanal em operação consistente e lucrativa.</p>
            <div className="flex flex-wrap gap-4">
              {primaryCTA}
              <Link href="/contato" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium border border-zinc-300 hover:bg-zinc-100">Falar primeiro</Link>
            </div>
            <p className="text-xs text-zinc-500">Sem compromisso. Direcionamos se a consultoria faz sentido.</p>
          </div>
        </Container>
      </Section>

      {/* Problemas */}
      <Section className="py-14 bg-[color:var(--surface)]/60">
        <Container>
          <h2 className="text-2xl font-bold mb-6"><span className="font-sans">Reconhece algum destes cenários?</span></h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            {[
              'Receitas variam a cada lote e faltam padrões.',
              'Não sabe exatamente o custo real de cada produto.',
              'Margem some em insumos e retrabalho.',
              'Escalar produção gera perda de qualidade.',
              'Equipe depende de “memória” em vez de processos claros.',
              'Fichas técnicas incompletas ou inexistentes.'
            ].map(p => (
              <div key={p} className="rounded-lg border border-zinc-200 bg-white p-4 leading-relaxed">{p}</div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Como funciona */}
      <Section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-10"><span className="font-sans">Como funciona</span></h2>
          <ol className="grid md:grid-cols-4 gap-6 text-sm">
            {[
              { t: '1. Diagnóstico', d: 'Mapeamos receitas, fluxo, gargalos e custos.' },
              { t: '2. Plano', d: 'Definição priorizada: padronização, fichas, custos, escalonamento.' },
              { t: '3. Implementação', d: 'Aplicação assistida de padrões, fichas e controles.' },
              { t: '4. Acompanhamento', d: 'Ajustes finos, métricas e preparação para escala.' }
            ].map(step => (
              <li key={step.t} className="relative rounded-lg border border-zinc-200 p-4 bg-white">
                <h3 className="font-medium mb-2">{step.t}</h3>
                <p className="text-zinc-700 leading-relaxed">{step.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Pacotes */}
      <Section className="py-16 bg-white">
        <Container>
          <h2 className="text-2xl font-bold mb-10"><span className="font-sans">Formatos</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nome: 'Diagnóstico Express',
                desc: 'Análise pontual + recomendações priorizadas em 1 encontro.',
                inclui: ['Questionário + envio de materiais', 'Sessão de 60–75 min', 'Checklist de prioridades'],
                indicacao: 'Quem quer clareza rápida.'
              },
              {
                nome: 'Plano Completo',
                desc: 'Padronização + fichas técnicas + precificação e fluxo operacional.',
                inclui: ['Mapeamento detalhado', 'Fichas técnicas base', 'Modelo de custos', 'Plano 30–60 dias'],
                indicacao: 'Quem precisa estruturar produção.'
              },
              {
                nome: 'Treinamento de Equipe',
                desc: 'Capacitação prática para consistência e ganho de produtividade.',
                inclui: ['Roteiro de treinamento', 'Execução assistida', 'Ajustes pós-implantação'],
                indicacao: 'Operações em crescimento.'
              }
            ].map(pkg => (
        <div key={pkg.nome} className="rounded-xl border border-zinc-200 p-6 bg-white flex flex-col">
                <h3 className="font-semibold text-lg mb-2"><span className="font-sans">{pkg.nome}</span></h3>
                <p className="text-sm text-zinc-700 leading-relaxed mb-4">{pkg.desc}</p>
                <ul className="text-xs space-y-1 mb-4">
          {pkg.inclui.map((i: string) => <li key={i} className="pl-3 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-900">{i}</li>)}
                </ul>
                <p className="text-xs text-zinc-500 mb-4">{pkg.indicacao}</p>
                <div className="mt-auto">{pkgCTA()}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Prova / Autoridade */}
      <Section className="py-16 bg-[color:var(--surface)]/60">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <h2 className="text-2xl font-bold"><span className="font-sans">Por que comigo?</span></h2>
              <ul className="space-y-3 text-sm leading-relaxed">
                {[`+7 anos em confeitaria e panificação`, `Docência no Senac desde 2022`, `Foco em processos reproducíveis e margem`, `Experiência em salão, delivery e eventos`].map(p => <li key={p} className="pl-4 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-900">{p}</li>)}
              </ul>
            </div>
            <div className="space-y-5">
              <h3 className="text-xl font-semibold">Resultados típicos</h3>
              <ul className="space-y-3 text-sm leading-relaxed">
                {['Redução de perdas em 10–25%', 'Melhora da margem por produto', 'Time treinado executando sem retrabalho', 'Clareza de prioridades para escalar'].map(r => <li key={r} className="pl-4 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-700">{r}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Depoimentos */}
      <Section className="py-16 bg-white">
        <Container>
          <h2 className="text-2xl font-bold mb-10"><span className="font-sans">Depoimentos</span></h2>
          <Testimonials limit={3} />
        </Container>
      </Section>

      {/* FAQ */}
  <Section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold mb-8"><span className="font-sans">Perguntas frequentes</span></h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
    {faq.map(f => (
              <div key={f.q} className="rounded-lg border border-zinc-200 p-5 bg-white">
                <h3 className="font-medium mb-2">{f.q}</h3>
                <p className="text-zinc-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Final */}
      <Section className="py-20">
        <Container>
          <div className="rounded-2xl border border-zinc-200 p-10 md:p-14 bg-gradient-to-br from-brand/10 via-white to-white">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-3xl font-bold leading-tight"><span className="font-sans">Pronto para estruturar sua produção?</span></h2>
              <p className="text-zinc-700">Agende um diagnóstico e receba clareza sobre próximos passos prioritários.</p>
              <div className="flex flex-wrap gap-4">
                {finalCTA}
                <Link href="/contato" className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium border border-zinc-300 hover:bg-zinc-100">Tirar dúvida</Link>
              </div>
              <p className="text-xs text-zinc-500">Sem compromisso inicial.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
