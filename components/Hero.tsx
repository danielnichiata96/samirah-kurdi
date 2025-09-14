import Container from './Container';
import Button from './Button';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export default function Hero() {
  const candidate = path.join(process.cwd(), 'public', 'images', 'hero.jpg');
  const hasUserHero = fs.existsSync(candidate);
  const heroSrc = hasUserHero ? '/images/hero.jpg' : '/images/hero.svg';
  
  return (
    <div className="relative">
      <Container className="py-16 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Consultoria e Aulas de Confeitaria Profissional
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-lg">
                Ajudamos confeiteiros(as) a padronizar receitas, precificar e vender mais.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Button size="lg" className="px-8 py-4 text-base font-medium">
                Agendar Consultoria
              </Button>
              <Button variant="accent" size="lg" className="px-8 py-4 text-base font-medium">
                Comprar E-book
              </Button>
            </div>
          </div>
          <div className="relative aspect-[3/4] md:aspect-[2/3] w-full max-h-[var(--hero-max-h)] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
            <Image
              src={heroSrc}
              alt="Chef confeiteira trabalhando em bolo"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/0" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </div>
  );
}
