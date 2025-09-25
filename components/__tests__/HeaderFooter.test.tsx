import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

describe('Header and Footer', () => {
  it('Header shows brand text and WhatsApp icon placeholder', () => {
    render(<Header />);
    expect(screen.getByText(/samirah kurdi/i)).toBeInTheDocument();
    const wa = screen.getAllByLabelText(/whatsapp/i)[0];
    expect(wa).toHaveAttribute('aria-disabled', 'true');
  });

  it('Footer shows brand text logo and social icons', () => {
    render(<Footer />);
    const brands = screen.getAllByText(/samirah kurdi/i);
    expect(brands.length).toBeGreaterThanOrEqual(1);
    const wa = screen.getAllByLabelText(/whatsapp/i)[0];
    expect(wa).toHaveAttribute('aria-disabled', 'true');
  });
});
