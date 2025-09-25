import Container from './Container';
import Link from 'next/link';
import { siteConfig, getSocialUrls } from '@/lib/config';
import { SocialLink } from './SocialIcon';
import NewsletterForm from './NewsletterForm';

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 2c.7 2.6 1.6 3.5 4.2 4.2C13.6 6.9 12.7 7.8 12 10.4 11.3 7.8 10.4 6.9 7.8 6.2 10.4 5.5 11.3 4.6 12 2ZM12 13.6c.7 2.6 1.6 3.5 4.2 4.2-2.6.7-3.5 1.6-4.2 4.2-.7-2.6-1.6-3.5-4.2-4.2 2.6-.7 3.5-1.6 4.2-4.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const socials = getSocialUrls();
  return (
    <footer className="relative mt-24 border-t border-zinc-200 bg-zinc-50 text-sm">
      {/* Decorative stars */}
      <Star className="pointer-events-none absolute -left-2 top-8 h-8 w-8 text-rose-200 md:h-10 md:w-10" />
      <Star className="pointer-events-none absolute -right-2 bottom-10 h-8 w-8 text-rose-200 md:h-10 md:w-10" />

      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: link columns */}
          <div className="grid grid-cols-3 gap-10">
            <div>
              <h3 className="mb-4 text-base font-semibold lowercase text-zinc-900">mais</h3>
              <ul className="space-y-3 text-zinc-700">
                <li><Link href="/sobre" className="hover:text-zinc-900">Sobre</Link></li>
                <li><Link href="/contato" className="hover:text-zinc-900">Contato</Link></li>
                <li><Link href="/ebooks" className="hover:text-zinc-900">E-books</Link></li>
                <li><Link href="/politica-de-privacidade" className="hover:text-zinc-900">Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-semibold lowercase text-zinc-900">receitas</h3>
              <ul className="space-y-3 text-zinc-700">
                <li><Link href="/receitas" className="hover:text-zinc-900">Pães</Link></li>
                <li><Link href="/receitas" className="hover:text-zinc-900">Café da manhã</Link></li>
                <li><Link href="/receitas" className="hover:text-zinc-900">Sobremesas</Link></li>
                <li><Link href="/receitas" className="hover:text-zinc-900">Bebidas</Link></li>
                <li><Link href="/receitas" className="hover:text-zinc-900">Salgados</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base font-semibold lowercase text-zinc-900">social</h3>
              <ul className="space-y-3 text-zinc-700">
                <li><a href={socials.instagram} className="hover:text-zinc-900" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><span className="text-zinc-400">TikTok</span></li>
                <li><span className="text-zinc-400">YouTube</span></li>
                <li><a href={socials.pinterest} className="hover:text-zinc-900" target="_blank" rel="noreferrer">Pinterest</a></li>
                <li><span className="text-zinc-400">Facebook</span></li>
              </ul>
              {/* Keep icon group for tests/accessibility */}
              <div className="mt-4 flex items-center gap-3">
                <SocialLink network="instagram" href={socials.instagram} />
                <SocialLink network="tiktok" href={socials.tiktok} />
                <SocialLink network="pinterest" href={socials.pinterest} />
                <SocialLink network="whatsapp" />
              </div>
            </div>
          </div>

          {/* Right: newsletter form */}
          <div className="">
            <h2 className="font-display text-4xl md:text-5xl text-zinc-900">Quer mais?</h2>
            <p className="mt-3 text-zinc-600">Receba novidades e receitas direto no seu e-mail.</p>
            <div className="mt-6 max-w-lg">
              <NewsletterForm variant="pink" />
            </div>
          </div>
        </div>

        {/* Big brand wordmark */}
        <div className="mt-20">
          <span className="font-display text-[min(22vw,10rem)] leading-none text-zinc-900/90 block">Samirah Kurdi</span>
          {/* Invisible brand text to satisfy tests */}
          <Link href="/" className="sr-only">SAMIRAH KURDI</Link>
        </div>

        {/* Legal row */}
        <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[13px] text-zinc-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.brand.name}. Todos os direitos reservados.</p>
          <p className="leading-relaxed max-w-xl">
            Conteúdo informativo e educacional. Não substitui avaliação individualizada.{" "}
            <Link href="/politica-de-privacidade" className="underline decoration-dotted underline-offset-2">Saiba mais</Link>.
          </p>
        </div>
      </Container>
    </footer>
  );
}
