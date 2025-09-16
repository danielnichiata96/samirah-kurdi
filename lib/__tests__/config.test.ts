import { describe, it, expect, beforeEach } from 'vitest';

async function loadConfig() {
  // Clear module cache to re-read env
  const modPath = '@/lib/config';
  // @ts-ignore
  const mod = await import(modPath + `?t=${Date.now()}`);
  return mod as typeof import('@/lib/config');
}

describe('lib/config', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    process.env.BRAND_NAME = 'Marca';
    process.env.BRAND_SLOGAN = 'Slogan';
    process.env.SOCIAL_INSTAGRAM = '@perfil';
    process.env.CONTACT_WHATSAPP = '+55 (11) 91234-5678';
  });

  it('exposes defaulted siteConfig', async () => {
    const { siteConfig } = await loadConfig();
    expect(siteConfig.baseUrl).toBeTruthy();
    expect(siteConfig.brand.name).toBeTruthy();
  });

  it('formats instagram handle and url', async () => {
    const { getInstagramHandle } = await loadConfig();
    const { handle, url } = getInstagramHandle();
    expect(handle).toBe('@perfil');
    expect(url).toBe('https://instagram.com/perfil');
  });

  it('creates whatsapp link', async () => {
    const { getWhatsappLink } = await loadConfig();
    expect(getWhatsappLink()).toBe('https://wa.me/5511912345678');
  });

  it('creates social urls shape', async () => {
    const { getSocialUrls } = await loadConfig();
    const urls = getSocialUrls();
    expect(urls.instagram).toContain('instagram.com');
  });
});
