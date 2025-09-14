import Section from '@/components/Section';
import Container from '@/components/Container';

export default function EbookDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-4">E-book: {params.slug}</h1>
        <p className="text-zinc-600">Detalhes do e-book em breve.</p>
      </Container>
    </Section>
  );
}
