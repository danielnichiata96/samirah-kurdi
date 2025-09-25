import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'pink';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none active:translate-y-px';
  
  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm',
    accent: 'bg-white text-zinc-900 border border-zinc-200 hover:border-rose-300 hover:bg-rose-50 shadow-sm',
    secondary: 'bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 shadow-sm',
    ghost: 'bg-transparent text-zinc-800 hover:bg-zinc-100',
    pink: 'bg-rose-300/60 text-rose-900 hover:bg-rose-300 shadow-sm',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-2xl',
  };
  
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
