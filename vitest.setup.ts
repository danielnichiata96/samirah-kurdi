import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Basic mocks for Next.js modules used in tests
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props),
}));

// Router mock (minimal)
vi.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));
