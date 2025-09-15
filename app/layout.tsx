import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk, Bodoni_Moda } from 'next/font/google';
import '@/styles/globals.css';
import { getLocalBusinessJsonLd } from '@/lib/config';
import { defaultMetadata } from '@/lib/seo';

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

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-bodoni',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="pt-BR" className={`${fraunces.variable} ${spaceGrotesk.variable} ${bodoni.variable}`}>
      <body className="font-sans antialiased text-zinc-900">
        {children}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: conteúdo controlado
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
