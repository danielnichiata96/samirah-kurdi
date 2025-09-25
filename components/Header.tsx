import Link from 'next/link';
import Container from './Container';
import ActiveLink from './ActiveLink';
import { SocialLink } from './SocialIcon';
import Button from './Button';
import { getSocialUrls } from '@/lib/config';

export default function Header() {
  const socials = getSocialUrls();
  const navLinkClass = "font-poppins uppercase tracking-[0.2em] text-[13px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 rounded-sm transition-colors";
  return (
  <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="h-16 flex items-center justify-between gap-4">
  <Link href="/" className="font-bold text-lg">
          <span className="font-display tracking-wide uppercase">SAMIRAH KURDI</span>
        </Link>
        <nav aria-label="Principal" className="hidden md:flex items-center gap-8 text-sm text-zinc-700">
          <ActiveLink className={navLinkClass} href="/sobre">Sobre</ActiveLink>
          <ActiveLink className={navLinkClass} href={'/receitas' as any}>Receitas</ActiveLink>
          <ActiveLink className={navLinkClass} href="/ebooks">E-books</ActiveLink>
          <ActiveLink className={navLinkClass} href="/blog">Blog</ActiveLink>
          <ActiveLink className={navLinkClass} href="/servicos">Serviços</ActiveLink>
          <ActiveLink className={navLinkClass} href="/contato">Contato</ActiveLink>
        </nav>
        <div className="flex items-center gap-2">
          {/* WhatsApp placeholder (disabled) */}
          <SocialLink network="whatsapp" label="WhatsApp" />
          <SocialLink href={socials.pinterest} network="pinterest" label="Pinterest" />
          <SocialLink href={socials.tiktok} network="tiktok" label="TikTok" />
          <SocialLink href={socials.instagram} network="instagram" label="Instagram" />
          <Link href="#agendar" className="hidden sm:inline-flex">
            <Button variant="accent" size="sm">Agendar consultoria</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
