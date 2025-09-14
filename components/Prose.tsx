import { cn } from '@/lib/utils';

export default function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('prose prose-zinc max-w-none', className)} {...props} />;
}
