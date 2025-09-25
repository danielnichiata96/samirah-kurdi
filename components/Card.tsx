import { cn } from '@/lib/utils';

export default function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white/70 backdrop-blur-sm border border-zinc-200 shadow-sm rounded-lg p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus-within:shadow-md focus-within:-translate-y-0.5',
        'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-300',
        className
      )}
      {...props}
    />
  );
}
