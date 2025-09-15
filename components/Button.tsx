import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none';
  
  const variants: Record<NonNullable<Props['variant']>, string> = {
  /* Primary now matches the main home CTA: white, subtle border, offset shadow */
  primary: 'bg-white border border-zinc-300 text-zinc-900 shadow-[0_6px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(0,0,0,0.12)]',
  /* Accent becomes a slightly more subdued bordered button */
  accent: 'bg-zinc-100 border border-zinc-200 text-zinc-900 hover:bg-zinc-50',
  secondary: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300',
  ghost: 'bg-transparent text-zinc-800 hover:bg-zinc-100',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
