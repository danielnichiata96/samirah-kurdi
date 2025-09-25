import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
}

export default function Section({ className, size = 'md', ...props }: SectionProps) {
  const spacing =
    size === 'sm'
      ? 'py-8 md:py-12'
      : size === 'lg'
      ? 'py-16 md:py-24'
      : 'py-12 md:py-16';
  return <section className={cn(spacing, className)} {...props} />;
}
