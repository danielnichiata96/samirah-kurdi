import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Avoid attempting to read source maps from Next.js vendor chunks and node_modules
      exclude: [
        '**/*.test.*',
        'next.config.*',
        'postcss.config.*',
        'tailwind.config.*',
        'scripts/**',
        '**/node_modules/**',
        '**/.next/**',
        '.next/**',
        '**/vendor-chunks/**',
      ],
    },
  },
  resolve: {
    alias: {
  '@': path.resolve(__dirname, '.'),
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxInject: `import React from 'react'`,
  },
});
