import Section from '@/components/Section';
import Container from '@/components/Container';
import Link from 'next/link';

export const revalidate = 0;

export default function EbookSuccessPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl font-bold">Compra confirmada!</h1>
          <p className="text-zinc-700">
            Obrigado pela confiança. Você receberá um e-mail com o link de download do e-book.
          </p>
          <p className="text-sm text-zinc-500">
            Dúvidas? <Link href="/contato" className="text-brand underline">fale conosco</Link>.
          </p>
          <Link href="/ebooks" className="inline-flex text-brand hover:underline">↩ Voltar para e-books</Link>
        </div>
      </Container>
    </Section>
  );
}
