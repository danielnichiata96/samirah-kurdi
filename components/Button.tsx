import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-md';
  
  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-none',
    secondary: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300 shadow-none',
    accent: 'bg-white border border-zinc-300 text-zinc-900 hover:bg-zinc-100 shadow-none',
    ghost: 'bg-transparent text-zinc-800 hover:bg-zinc-100 shadow-none',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
