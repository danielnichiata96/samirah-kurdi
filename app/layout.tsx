import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fraunces',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Confeitaria | Site',
  description: 'Consultoria e Aulas de Confeitaria Profissional',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased text-zinc-900">{children}</body>
    </html>
  );
}
