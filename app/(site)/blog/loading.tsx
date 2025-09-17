import Section from '@/components/Section';
import Container from '@/components/Container';

export default function BlogLoading() {
  return (
    <Section>
      <Container>
        <div className="animate-pulse">
          <div className="h-8 w-40 bg-zinc-200 rounded mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4">
                <div className="h-44 w-full bg-zinc-200 rounded mb-4" />
                <div className="h-5 w-3/4 bg-zinc-200 rounded mb-2" />
                <div className="h-3 w-1/2 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
