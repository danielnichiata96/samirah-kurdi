import Container from './Container';
import Link from 'next/link';
import { siteConfig, getInstagramHandle, getWhatsappLink, getSocialUrls } from '@/lib/config';
import { SocialLink } from './SocialIcon';

export default function Footer() {
  const socials = getSocialUrls();
  return (
  <footer className="border-t border-zinc-200 bg-white mt-16">
      <Container className="py-10 text-sm text-zinc-600">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xs">
            <p className="font-medium text-zinc-700">{siteConfig.brand.name}</p>
            {siteConfig.contact.addressLine && (
              <p className="not-italic">{siteConfig.contact.addressLine}{siteConfig.contact.city ? `, ${siteConfig.contact.city}` : ''}</p>
            )}
            {siteConfig.contact.email && (
              <p><a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">{siteConfig.contact.email}</a></p>
            )}
            {siteConfig.contact.whatsapp && (
              <p><a href={getWhatsappLink()} className="hover:underline" rel="nofollow noopener" target="_blank">{siteConfig.contact.whatsapp}</a></p>
            )}
            {getInstagramHandle().handle && (
              <p><a href={getInstagramHandle().url} className="hover:underline" target="_blank" rel="noopener">{getInstagramHandle().handle}</a></p>
            )}
            <p className="text-zinc-500 pt-2">© {new Date().getFullYear()} {siteConfig.brand.name}</p>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link href="/termos">Termos</Link>
            <span className="mx-2 h-4 w-px bg-zinc-300 hidden md:inline-block" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <SocialLink href={socials.pinterest} network="pinterest" label="Pinterest" />
              <SocialLink href={socials.tiktok} network="tiktok" label="TikTok" />
              <SocialLink href={socials.instagram} network="instagram" label="Instagram" />
            </div>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
