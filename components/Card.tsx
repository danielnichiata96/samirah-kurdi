import { cn } from '@/lib/utils';

export default function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border border-zinc-200 p-4 shadow-sm bg-white', className)} {...props} />;
}
