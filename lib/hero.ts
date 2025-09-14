import fs from 'fs';
import path from 'path';

// Resolve imagem de hero apenas no build/server, evitando acessar fs dentro do componente.
let cachedHero: string | null = null;
export function getHeroImage() {
  if (cachedHero) return cachedHero;
  try {
    const candidate = path.join(process.cwd(), 'public', 'images', 'hero.jpg');
    if (fs.existsSync(candidate)) {
      cachedHero = '/images/hero.jpg';
    } else {
      cachedHero = '/images/hero.svg';
    }
  } catch {
    cachedHero = '/images/hero.svg';
  }
  return cachedHero;
}
