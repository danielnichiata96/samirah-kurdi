import Section from '@/components/Section';
import Container from '@/components/Container';
import EbookCard from '@/components/EbookCard';
import ebooks from '@/content/ebooks.json';
import { siteConfig } from '@/lib/config';

// Revalidate ebooks listing daily
export const revalidate = 86400;

export default function EbooksPage() {
  const checkout = siteConfig.commerce.checkoutEbook;
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-6">E-books</h1>
        {Array.isArray(ebooks) && ebooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ebooks.map((item) => (
              <EbookCard
                key={item.slug}
                titulo={item.titulo}
                descricao={item.descricao}
                preco={item.preco}
                capa={item.capa}
        href={(item as any).checkoutUrl || checkout || `/ebooks/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-zinc-600">Lista de e-books em breve.</p>
        )}
      </Container>
    </Section>
  );
}
