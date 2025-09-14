import type { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Confeitaria',
  description: 'Consultoria e Aulas de Confeitaria Profissional',
  openGraph: {
    title: 'Confeitaria',
    description: 'Consultoria e Aulas de Confeitaria Profissional',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
