import type { Metadata } from 'next';
import { Space_Grotesk, DM_Serif_Display, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { getLocalBusinessJsonLd } from '@/lib/config';
import { defaultMetadata } from '@/lib/seo';

// Body font – Space Grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'Times New Roman', 'Times', 'serif'],
  adjustFontFallback: false,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="pt-BR" className={`${spaceGrotesk.variable} ${dmSerif.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
