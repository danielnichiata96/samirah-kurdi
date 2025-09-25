import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SocialLink } from '@/components/SocialIcon';

describe('SocialLink', () => {
  it('renders disabled when no href', () => {
    render(<SocialLink network="whatsapp" label="WhatsApp" />);
    const wrapper = screen.getByLabelText(/whatsapp/i);
    // Outer wrapper span carries aria-disabled and contains inner icon span
    expect(wrapper).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies brand color via CSS variable on enabled link', () => {
    render(<SocialLink network="instagram" label="Instagram" href="https://instagram.com/x" />);
    const link = screen.getByRole('link', { name: /instagram/i });
    expect(link).toBeInTheDocument();
    // inner icon container should exist and carry hover classes for pink accent
    const wrapper = link.querySelector('span[aria-disabled="false"]');
    expect(wrapper).toBeTruthy();
    const inner = wrapper!.querySelector('span');
    expect(inner).toBeTruthy();
    expect(inner!.className).toMatch(/hover:bg-rose-50/);
  });
});
