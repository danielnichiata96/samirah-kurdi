import Link from 'next/link';
import Container from './Container';
import ActiveLink from './ActiveLink';
import { SocialLink } from './SocialIcon';
import Button from './Button';
import { getSocialUrls } from '@/lib/config';

export default function Header() {
  const socials = getSocialUrls();
  return (
  <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="h-16 flex items-center justify-between gap-4">
  <Link href="/" className="font-bold text-lg">
          <span className="font-display tracking-wide uppercase">SAMIRAH KURDI</span>
        </Link>
        <nav aria-label="Principal" className="hidden md:flex items-center gap-6 text-sm text-zinc-700">
          <ActiveLink href="/sobre">Sobre</ActiveLink>
          <ActiveLink href={'/receitas' as any}>Receitas</ActiveLink>
          <ActiveLink href="/ebooks">E-books</ActiveLink>
          <ActiveLink href="/blog">Blog</ActiveLink>
          <ActiveLink href="/servicos">Serviços</ActiveLink>
          <ActiveLink href="/contato">Contato</ActiveLink>
        </nav>
        <div className="flex items-center gap-2">
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
