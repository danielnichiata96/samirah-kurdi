import Container from './Container';
import Link from 'next/link';

export default function Footer() {
  return (
  <footer className="border-t border-zinc-200 bg-white mt-16">
      <Container className="py-10 text-sm text-zinc-600">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Confeitaria. Todos os direitos reservados.</p>
          <nav className="flex gap-4">
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link href="/termos">Termos</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
