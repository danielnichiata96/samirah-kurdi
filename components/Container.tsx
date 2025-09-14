import { cn } from '@/lib/utils';

export default function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container mx-auto px-4', className)} {...props} />;
}
