import Section from '@/components/Section';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';

export default function ContatoPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-4">Contato</h1>
        <ContactForm />
      </Container>
    </Section>
  );
}
