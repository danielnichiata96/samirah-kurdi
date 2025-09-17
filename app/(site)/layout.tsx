import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Confeitaria | Site',
    template: '%s | Confeitaria',
  },
  description: 'Consultoria e Aulas de Confeitaria Profissional',
  openGraph: {
    title: 'Confeitaria | Site',
    description: 'Consultoria e Aulas de Confeitaria Profissional',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
  <div className="min-h-screen flex flex-col bg-[color:var(--surface)] text-zinc-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
