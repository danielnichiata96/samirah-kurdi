import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckoutButton from '@/components/CheckoutButton';
import * as nav from 'next/navigation';

// Mock useSearchParams to simulate URL UTMs
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual<any>('next/navigation');
  let params = new URLSearchParams();
  return {
    ...actual,
    useSearchParams: () => params,
    // helper to update in tests
    __setParams: (p: Record<string, string>) => {
      params = new URLSearchParams(p);
    },
  };
});

// helper to set mocked params
const setParams = (p: Record<string, string>) => {
  (nav as any).__setParams(p);
};

describe('CheckoutButton', () => {
  beforeEach(() => setParams({}));

  it('appends UTM params when present', () => {
    setParams({ utm_source: 'ig', utm_medium: 'bio' });
    render(
      <CheckoutButton href="https://pay.example.com/x">
        Buy
      </CheckoutButton>
    );
    const a = screen.getByRole('link', { name: /buy/i });
    expect(a.getAttribute('href')).toContain('utm_source=ig');
    expect(a.getAttribute('href')).toContain('utm_medium=bio');
  });

  it('adds default UTMs when none provided', () => {
    render(
      <CheckoutButton href="https://pay.example.com/x">
        Buy
      </CheckoutButton>
    );
    const a = screen.getByRole('link', { name: /buy/i });
    expect(a.getAttribute('href')).toContain('utm_source=site');
    expect(a.getAttribute('href')).toContain('utm_medium=ebook-page');
  });

  it('does not duplicate UTMs if already present', () => {
    setParams({ utm_source: 'ig' });
    render(
      <CheckoutButton href="https://pay.example.com/x?utm_source=predefined">
        Buy
      </CheckoutButton>
    );
    const a = screen.getByRole('link', { name: /buy/i });
    expect(a.getAttribute('href')).toContain('utm_source=predefined');
    expect(a.getAttribute('href')).not.toContain('utm_source=ig');
  });
});
