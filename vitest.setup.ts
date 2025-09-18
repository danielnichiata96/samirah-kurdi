import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Basic mocks for Next.js modules used in tests
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props),
}));

// Router + navigation mocks
vi.mock('next/navigation', () => {
  let params = new URLSearchParams();
  return {
    __esModule: true,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => params,
    // helper for tests to update URLSearchParams
    __setParams: (p: Record<string, string>) => {
      params = new URLSearchParams(p);
    },
  };
});
