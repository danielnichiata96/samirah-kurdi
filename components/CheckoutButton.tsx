'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

function appendParams(base: string, params: URLSearchParams) {
  if (!params || Array.from(params.keys()).length === 0) return base;
  const hasQuery = base.includes('?');
  const sep = hasQuery ? '&' : '?';
  const s = params.toString();
  return s ? base + sep + s : base;
}

export default function CheckoutButton({ href, children, className, target = '_blank', rel = 'noopener noreferrer' }: Props) {
  const search = useSearchParams();

  const finalHref = useMemo(() => {
    try {
      const isExternal = /^https?:\/\//i.test(href);
      // If the base already has utm_ params, do not append to avoid duplicates.
      if (/utm_\w+=/i.test(href)) return href;
      const params = new URLSearchParams();
      const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
      let hasAny = false;
      keys.forEach((k) => {
        const v = search.get(k);
        if (v) {
          hasAny = true;
          params.set(k, v);
        }
      });
      if (!hasAny) {
        params.set('utm_source', 'site');
        params.set('utm_medium', 'ebook-page');
        params.set('utm_campaign', 'default');
      }
      return appendParams(href, params);
    } catch {
      return href;
    }
  }, [href, search]);

  const isExternal = /^https?:\/\//i.test(href);
  if (isExternal) {
    return (
      <a href={finalHref} target={target} rel={rel} className={className}>
        {children}
      </a>
    );
  }
  // Internal fallback
  return (
    <a href={finalHref} className={className}>
      {children}
    </a>
  );
}
