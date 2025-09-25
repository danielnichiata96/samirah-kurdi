"use client";

import { SiInstagram, SiTiktok, SiPinterest, SiWhatsapp } from 'react-icons/si';
import { cn } from '@/lib/utils';

export type Network = 'instagram' | 'tiktok' | 'pinterest' | 'whatsapp';

const ICONS: Record<Network, any> = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  pinterest: SiPinterest,
  whatsapp: SiWhatsapp,
};

const COLORS: Record<Network, string> = {
  instagram: '#E4405F',
  tiktok: '#000000',
  pinterest: '#E60023',
  whatsapp: '#25D366',
};

interface SocialIconProps {
  network: Network;
  href?: string;
  label?: string;
  className?: string;
  size?: number;
  disabled?: boolean;
}

export function SocialLink({ network, href, label, className, size = 18, disabled }: SocialIconProps) {
  const Icon = ICONS[network];
  const color = COLORS[network];
  const inner = (
    <span
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition-colors shadow-sm',
        !disabled && 'hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none grayscale',
        className
      )}
      role="img"
    >
      <Icon style={{ width: size, height: size }} />
    </span>
  );

  if (!href || disabled)
    return (
      <span aria-label={label || network} aria-disabled={disabled ? 'true' : 'true'}>
        {inner}
      </span>
    );
  return (
    <a
      href={href}
      aria-label={label || network}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-300 rounded-full"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span aria-disabled="false" aria-label={label || network}>
        {inner}
      </span>
    </a>
  );
}

export default SocialLink;
