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

export function getWhatsappLink() {
  const raw = siteConfig.contact.whatsapp;
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}
