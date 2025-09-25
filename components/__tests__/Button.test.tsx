import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
  });

  it('applies primary variant classes', () => {
    render(<Button variant="primary">CTA</Button>);
    const btn = screen.getByRole('button', { name: /cta/i });
    expect(btn.className).toMatch(/bg-zinc-900/);
  });
});
