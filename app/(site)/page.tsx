import Hero from '@/components/Hero';
import NewsletterForm from '@/components/NewsletterForm';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Sobre a Samirah */}
      <Section className="py-20">
        <Container>
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-start">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden ring-1 ring-black/5 bg-zinc-100">
              <Image
                src="/images/hero.jpg"
                alt="Samirah decorando um bolo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Olá, eu sou a Samirah</h2>
              <div className="mt-5 space-y-4 text-zinc-700 md:text-lg leading-relaxed">
                <p>
                  Sou confeiteira e professora de gastronomia no Senac de Marília (SP) desde 2022, com mais de 7 anos de
                  experiência nas áreas de confeitaria e panificação.
                </p>
                <p>
                  Ao longo da minha trajetória, desenvolvi um trabalho que une técnica profissional e didática acessível,
                  sempre com foco em padronização, otimização e qualidade.
                </p>
                <p>
                  Minha formação inclui a renomada escola de cozinha italiana ALMA, no coração da Emilia‑Romagna, onde pude
                  aprender de perto técnicas clássicas e modernas da confeitaria europeia.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Doçuras globais + destaques */}
      <Section className="py-20 bg-[color:var(--surface)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-4">
            {/* Texto introdutório */}
            <div className="md:col-span-1">
              <h3 className="text-2xl md:text-3xl font-bold">Doçuras globais</h3>
              <p className="mt-4 text-zinc-700">
                Sou apaixonada pelo mundo das sobremesas — tradicionais, brasileiras e com influências
                internacionais. Se você chegou até aqui, provavelmente está em busca de:
              </p>
            </div>

            {/* Grade com 3 itens */}
              <div className="md:col-span-3 grid gap-6 sm:grid-cols-3">
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg ring-1 ring-black/5 bg-zinc-100">
                  <Image src="/images/cards/card_1.png" alt="Doces para se inspirar" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-zinc-600 text-center">Novas receitas para se inspirar</p>
              </div>
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg ring-1 ring-black/5 bg-zinc-100">
                  <Image src="/images/cards/card_2.png" alt="Informações técnicas" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-zinc-600 text-center">Informações técnicas para aprimorar suas habilidades</p>
              </div>
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg ring-1 ring-black/5 bg-zinc-100">
                  <Image src="/images/cards/card_3.png" alt="Consultorias personalizadas" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-zinc-600 text-center">Consultorias personalizadas para o seu negócio</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Image Carousel */}
      <Section className="py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Conheça um pouco do meu trabalho
          </h2>
          <ImageCarousel />
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-2xl font-semibold mb-4">Receba novidades</h2>
          <NewsletterForm />
        </Container>
      </Section>
    </>
  );
}
