import Hero from '@/components/Hero';
import NewsletterForm from '@/components/NewsletterForm';
import Section from '@/components/Section';
import Container from '@/components/Container';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section>
        <Container>
          <h2 className="text-2xl font-semibold mb-4">Sobre</h2>
          <p className="text-zinc-600">
            Ajudo confeiteiros(as) a padronizar receitas, precificar e vender mais.
          </p>
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
