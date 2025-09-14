import Link from 'next/link';
import Container from './Container';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-[color:var(--surface)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--surface)]/60">
      <Container className="h-16 flex items-center justify-between gap-4">
  <Link href="/" className="font-bold text-lg"><span className="font-serif">Samirah Kurdi</span></Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-700">
          <Link href="/sobre">Sobre</Link>
          <Link href="/servicos">Serviços</Link>
          <Link href="/ebooks">E-books</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contato">Contato</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="#agendar"
            className="hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-brand text-white hover:opacity-90"
          >
            Agendar consultoria
          </Link>
        </div>
      </Container>
    </header>
  );
}
