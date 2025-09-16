import { describe, it, expect } from 'vitest';
import { buildMetadata, buildArticleJsonLd, buildRecipeJsonLd } from '@/lib/seo';

describe('lib/seo', () => {
  it('buildMetadata returns title/description', () => {
    const meta = buildMetadata({ title: 'Title', description: 'Desc', path: '/x' });
    expect(meta.title).toContain('Title');
  const og: any = meta.openGraph;
  expect(og?.url).toContain('/x');
  });

  it('buildArticleJsonLd returns Article', () => {
    const json = buildArticleJsonLd({ slug: 'post', title: 'Post', date: '2024-01-01' });
    expect(json['@type']).toBe('Article');
    expect(json.headline).toBe('Post');
  });

  it('buildRecipeJsonLd returns Recipe', () => {
    const json = buildRecipeJsonLd({ slug: 'bolo', title: 'Bolo', date: '2024-01-01' });
    expect(json['@type']).toBe('Recipe');
    expect(json.name).toBe('Bolo');
  });
});
