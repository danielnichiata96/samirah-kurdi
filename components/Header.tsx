import Link from 'next/link';
import Container from './Container';
import ActiveLink from './ActiveLink';

export default function Header() {
  return (
  <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="h-16 flex items-center justify-between gap-4">
  <Link href="/" className="font-bold text-lg">
          <span className="font-display tracking-wide uppercase">SAMIRAH KURDI</span>
        </Link>
        <nav aria-label="Principal" className="hidden md:flex items-center gap-6 text-sm text-zinc-700">
          <ActiveLink href="/sobre">Sobre</ActiveLink>
          <ActiveLink href="/servicos">Serviços</ActiveLink>
          <ActiveLink href="/ebooks">E-books</ActiveLink>
          <ActiveLink href="/blog">Blog</ActiveLink>
          <ActiveLink href="/contato">Contato</ActiveLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="#agendar"
            className="hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors border border-zinc-300 hover:bg-zinc-100"
          >
            Agendar consultoria
          </Link>
        </div>
      </Container>
    </header>
  );
}
