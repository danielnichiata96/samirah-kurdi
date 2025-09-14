import type { Metadata } from 'next';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Samirah Kurdi — Confeitaria, Aulas e Consultoria',
  description:
    'Conheça a trajetória da confeiteira e professora Samirah Kurdi: técnica, produção e ensino — com foco em padronização, precificação e qualidade.',
  openGraph: {
    title: 'Sobre Samirah Kurdi — Confeitaria, Aulas e Consultoria',
    description:
      'Conheça a trajetória da confeiteira e professora Samirah Kurdi: técnica, produção e ensino — com foco em padronização, precificação e qualidade.',
    type: 'profile',
    locale: 'pt_BR',
  },
  twitter: { card: 'summary_large_image' },
};

function getHeroImage() {
  const portrait = path.join(process.cwd(), 'public', 'images', 'samirah-portrait.jpg');
  const heroJpg = path.join(process.cwd(), 'public', 'images', 'hero.jpg');
  if (fs.existsSync(portrait)) return '/images/samirah-portrait.jpg';
  if (fs.existsSync(heroJpg)) return '/images/hero.jpg';
  return '/images/hero.svg';
}

function getEnv(name: string) {
  return process.env[name]?.trim() || '';
}

function buildWhatsAppLink(rawPhone: string) {
  if (!rawPhone) return '';
  const digits = rawPhone.replace(/\D/g, '');
  // Basic wa.me link. Customize preset text if desired.
  return `https://wa.me/${digits}`;
}

function buildInstagram(handle: string) {
  if (!handle) return { handle: '', url: '' };
  const clean = handle.replace(/^@+/, '');
  return { handle: `@${clean}`, url: `https://instagram.com/${clean}` };
}

export default function SobrePage() {
  const heroSrc = getHeroImage();
  const whatsappRaw = getEnv('CONTACT_WHATSAPP');
  const email = getEnv('CONTACT_EMAIL');
  const ig = buildInstagram(getEnv('SOCIAL_INSTAGRAM'));
  const whatsappLink = buildWhatsAppLink(whatsappRaw);

  return (
    <>
      {/* Hero */}
      <Section className="pt-12 pb-6">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide text-zinc-500">Sobre</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="font-serif">Samirah Kurdi</span>
              </h1>
              <p className="text-zinc-600">Confeitaria • Consultoria</p>
              <p className="text-zinc-700 max-w-prose">
                Confeiteira e professora de gastronomia no Centro Universitário Senac (Marília–SP) desde 2022. Atuação com mais de 7 anos
                na confeitaria e panificação, unindo técnica de cozinha e didática — com foco em padronização, precificação e qualidade.
              </p>
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow ring-1 ring-black/5">
              <Image src={heroSrc} alt="Retrato de Samirah Kurdi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Body */}
      <Section className="pt-6">
        <Container>
          <Prose>
            <h2>Olá, eu sou a <strong>Samirah Kurdi</strong></h2>
            <p>
              Confeiteira e <strong>professora de gastronomia</strong> no Centro Universitário <strong>Senac (Marília–SP)</strong> desde 2022. Atuo há
              <strong> mais de 7 anos</strong> com confeitaria e panificação, unindo <strong>técnica de cozinha</strong> e <strong>didática</strong>: planejo e conduzo aulas teóricas e
              práticas, supervisiono projetos e cuido de <strong>padronização de receitas, controle de qualidade e gestão de insumos</strong>.
            </p>
            <blockquote>
              <p>
                Meu propósito é ajudar confeiteiros(as) a <strong>padronizar</strong>, <strong>precificar</strong> e <strong>ganhar produtividade</strong> — sem perder identidade
                autoral.
              </p>
            </blockquote>

            <hr />

            <h3>Experiência resumida</h3>
            <ul>
              <li>
                <strong>Docência</strong> — Centro Universitário Senac (Marília–SP, 2022–atual): planejamento de aulas práticas/teóricas, segurança dos
                alimentos, orientação de projetos e gestão de insumos.
              </li>
              <li>
                <strong>Confeitaria profissional</strong> — passagens por casas como <strong>Felice e Maria</strong> e <strong>Casaria SP</strong>, com base forte em
                <strong> confeitaria italiana</strong> (amaretti, pastiera di grano, entremets, petit-fours, bolos e sobremesas empratadas).
              </li>
              <li>
                <strong>Rotina de produção</strong> — atuação em salão, delivery e eventos, com foco em <strong>padrões, mise en place e consistência</strong>.
              </li>
            </ul>

            <hr />

            <h3>Formação &amp; cursos</h3>
            <ul>
              <li>
                <strong>Pós-graduação</strong> em <em>Técnicas de Confeitaria e Panificação</em> — <strong>Universidade Anhembi Morumbi</strong> (2022–2024).
              </li>
              <li>
                <strong>Tecnologia em Gastronomia</strong> — <strong>Centro Universitário Senac</strong> (2015–2017).
              </li>
              <li>
                Cursos livres: <strong>Confeiteiro Master</strong> (Escola Diego Lozano, 2019), <strong>Panettone de fermentação natural</strong> (2021) e
                <strong> Especial Levain</strong> (2023).
              </li>
            </ul>

            <hr />

            <h3>Como posso ajudar você ou seu negócio</h3>
            <ul>
              <li>
                <strong>Padronização de receitas</strong> e <strong>fichas técnicas</strong>.
              </li>
              <li>
                <strong>Precificação</strong> e <strong>controle de custos</strong>.
              </li>
              <li>
                <strong>Implantação de produção</strong> (fluxos, escala e qualidade).
              </li>
              <li>
                <strong>Treinamento de equipe</strong> e apoio em <strong>planos de aula</strong> para escolas/ateliers.
              </li>
            </ul>

            <blockquote>
              <p>
                Quer orientação prática e aplicada à sua realidade? Fale comigo para montar um plano de ação sob medida.
              </p>
            </blockquote>

            <hr />

            <h3>Fale comigo</h3>
            <ul>
              {whatsappLink ? (
                <li>
                  <strong>WhatsApp:</strong> <a href={whatsappLink}>Clique para conversar</a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <strong>E-mail:</strong> <a href={`mailto:${email}`}>{email}</a>
                </li>
              ) : null}
              {ig.url ? (
                <li>
                  <strong>Instagram:</strong> <a href={ig.url}>{ig.handle}</a>
                </li>
              ) : null}
            </ul>
          </Prose>

          {/* CTA */}
          <div className="mt-10 rounded-xl border border-zinc-200 bg-[color:var(--surface)] p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-semibold">Pronto para padronizar e escalar sua confeitaria?</p>
                <p className="text-sm text-zinc-600">Montamos um plano de ação sob medida.</p>
              </div>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-brand text-white hover:opacity-90"
              >
                Agendar consultoria
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
