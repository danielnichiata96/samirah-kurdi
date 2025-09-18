import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SocialLink } from '@/components/SocialIcon';

describe('SocialLink', () => {
  it('renders disabled when no href', () => {
    render(<SocialLink network="whatsapp" label="WhatsApp" />);
    const link = screen.getByLabelText(/whatsapp/i);
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies per-network tint class', () => {
    render(<SocialLink network="instagram" label="Instagram" href="https://instagram.com/x" />);
    const link = screen.getByLabelText(/instagram/i);
    expect(link.className).toMatch(/E4405F|instagram/i);
  });
});
