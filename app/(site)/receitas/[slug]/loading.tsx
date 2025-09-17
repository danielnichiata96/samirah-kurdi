import Section from '@/components/Section';
import Container from '@/components/Container';

export default function ReceitaLoading() {
  return (
    <Section>
      <Container>
        <div className="animate-pulse max-w-3xl">
          <div className="h-8 w-1/2 bg-zinc-200 rounded mb-4" />
          <div className="h-44 w-full bg-zinc-200 rounded mb-6" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-zinc-200 rounded" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
