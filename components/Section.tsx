import { cn } from '@/lib/utils';

export default function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-16', className)} {...props} />;
}
