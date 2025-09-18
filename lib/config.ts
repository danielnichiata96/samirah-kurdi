// Centraliza variáveis de ambiente com defaults seguros e documentação.
// Ajuste em .env.local ou no painel da Vercel. Nunca commitar segredos.

function str(name: string, def = '') {
  const v = process.env[name];
  return (typeof v === 'string' && v.trim().length > 0) ? v.trim() : def;
}

export const siteConfig = {
  baseUrl: str('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
  brand: {
    name: str('BRAND_NAME', 'Confeitaria'),
    slogan: str('BRAND_SLOGAN', 'Consultoria e Aulas de Confeitaria Profissional'),
  },
  contact: {
    whatsapp: str('CONTACT_WHATSAPP'), // formato livre: +55 11 9XXXX-XXXX
    email: str('CONTACT_EMAIL'),
  instagram: str('SOCIAL_INSTAGRAM'),
  tiktok: str('SOCIAL_TIKTOK'),
  pinterest: str('SOCIAL_PINTEREST'),
  addressLine: str('CONTACT_ADDRESS_LINE'),
  city: str('CONTACT_ADDRESS_CITY'),
  region: str('CONTACT_ADDRESS_REGION'),
  postalCode: str('CONTACT_ADDRESS_POSTAL_CODE'),
  country: str('CONTACT_ADDRESS_COUNTRY', 'BR'),
  latitude: str('CONTACT_LATITUDE'),
  longitude: str('CONTACT_LONGITUDE'),
  exposeFullAddress: str('CONTACT_EXPOSE_FULL_ADDRESS', 'false') === 'true',
  },
  commerce: {
    checkoutEbook: str('CHECKOUT_EBOOK_URL'),
  },
  newsletter: {
    apiKeyPresent: !!str('NEWSLETTER_API_KEY'),
  }
};

export function getInstagramHandle() {
  const raw = siteConfig.contact.instagram;
  if (!raw) return { handle: '', url: '' };
  const clean = raw.replace(/^@+/, '');
  return { handle: `@${clean}`, url: `https://instagram.com/${clean}` };
}

export function getSocialUrls() {
  const { instagram, tiktok, pinterest } = siteConfig.contact as any;
  const ig = instagram ? `https://instagram.com/${instagram.replace(/^@+/, '')}` : '';
  const tk = tiktok ? (tiktok.startsWith('http') ? tiktok : `https://www.tiktok.com/@${tiktok.replace(/^@+/, '')}`) : '';
  const pt = pinterest ? (pinterest.startsWith('http') ? pinterest : `https://www.pinterest.com/${pinterest.replace(/^@+/, '')}`) : '';
  return { instagram: ig, tiktok: tk, pinterest: pt };
}

export function getWhatsappLink() {
  const raw = siteConfig.contact.whatsapp;
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

export function getLocalBusinessJsonLd() {
  const { brand, contact, baseUrl } = siteConfig as any;
  const addrPresent = contact.addressLine && contact.city;
  const geoPresent = contact.latitude && contact.longitude;
  const data: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brand.name,
    description: brand.slogan,
    url: baseUrl,
  };
  if (contact.email) data.email = contact.email;
  if (contact.whatsapp) data.telephone = contact.whatsapp;
  if (contact.city || contact.region) {
    // Only include city/region unless explicitly allowed to expose full address
    data.address = contact.exposeFullAddress && addrPresent
      ? {
          '@type': 'PostalAddress',
          streetAddress: contact.addressLine,
          addressLocality: contact.city,
          addressRegion: contact.region,
          postalCode: contact.postalCode,
          addressCountry: contact.country || 'BR'
        }
      : {
          '@type': 'PostalAddress',
          addressLocality: contact.city,
          addressRegion: contact.region,
          addressCountry: contact.country || 'BR'
        };
  }
  if (geoPresent) {
    data.geo = { '@type': 'GeoCoordinates', latitude: contact.latitude, longitude: contact.longitude };
  }
  return data;
}
