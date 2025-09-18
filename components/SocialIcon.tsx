import { cn } from '@/lib/utils';

type Network = 'instagram' | 'tiktok' | 'pinterest' | 'whatsapp';

const icons: Record<Network, (props: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  instagram: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.2 0-3.5 0-4.8.1-1 .1-1.6.2-2 .3-.5.2-.8.3-1.1.6-.3.3-.5.6-.6 1.1-.1.4-.3 1-.3 2-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.6.3 2 .2.5.3.8.6 1.1.3.3.6.5 1.1.6.4.1 1 .3 2 .3 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c1-.1 1.6-.2 2-.3.5-.2.8-.3 1.1-.6.3-.3.5-.6.6-1.1.1-.4.3-1 .3-2 .1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.6-.3-2-.2-.5-.3-.8-.6-1.1-.3-.3-.6-.5-1.1-.6-.4-.1-1-.3-2-.3-1.3-.1-1.6-.1-4.8-.1Zm0 3.6a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Zm0 1.8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.9-2.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/>
    </svg>
  ),
  tiktok: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M21 8.1c-2.3 0-4.3-1.1-5.7-2.8v9.4a6.9 6.9 0 1 1-6.9-6.9c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1a4.2 4.2 0 1 0 4.2 4.2V2h2.6c.6 2.4 2.8 4.2 5.4 4.3V8.1Z"/>
    </svg>
  ),
  pinterest: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12.1 2C6.9 2 3 5.6 3 10.4c0 3.4 2 5.4 3.2 5.4.5 0 .8-1.3.8-1.6 0-.4-1-1.2-1-2.8 0-3.3 2.5-5.7 5.9-5.7 2.9 0 5.1 1.6 5.1 4.7 0 2.3-1 6.6-4.3 6.6-1.2 0-2.2-.9-1.9-2 .3-1.3.9-2.7.9-3.6 0-.8-.4-1.5-1.3-1.5-1 0-1.7 1-1.7 2.3 0 .8.3 1.3.3 1.3s-1.1 4.6-1.3 5.4c-.4 1.7-.1 3.8 0 4 .1.2.2.2.3.1.1-.1 1.6-2.2 2.1-3.9l.8-3.1c.4.8 1.6 1.4 2.9 1.4 3.8 0 6.5-3.4 6.5-7.9C20 5.5 16.6 2 12.1 2Z"/>
    </svg>
  ),
  whatsapp: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.8L0 24l6.4-1.7A12 12 0 1 0 20.5 3.5ZM12 21.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.8 1 1-3.7-.2-.4A9.8 9.8 0 1 1 12 21.8Zm5-7.1c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.2-.8.9-1 .9-.2.1-.4.1-.7 0-1.9-.9-3.1-3.4-3.2-3.6-.2-.2-.1-.5 0-.7.1-.2.1-.4.2-.6.1-.2 0-.4 0-.6 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.1.2 2.3 3.6 5.5 4.9.8.4 1.5.6 2 .8.8.2 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.8.3-.9.3-1.7.2-1.8-.1-.1-.3-.2-.6-.3Z"/>
    </svg>
  ),
};

export function SocialLink({ href, network, className, label }: { href?: string; network: Network; className?: string; label?: string }) {
  const Icon = icons[network];
  const disabled = !href;

  // Per-network tints (icon inherits via currentColor)
  const tint: Record<Network, string> = {
    instagram: 'text-[#E4405F] hover:bg-[#E4405F]/10',
    tiktok: 'text-black hover:bg-black/10',
    pinterest: 'text-[#E60023] hover:bg-[#E60023]/10',
    whatsapp: 'text-[#25D366] hover:bg-[#25D366]/10',
  };

  return (
    <a
      href={href || '#'}
      aria-label={label ?? network}
      target="_blank"
      rel="noopener"
      aria-disabled={disabled}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-transparent transition shadow-[0_2px_0_0_rgba(0,0,0,0.06)]',
        tint[network],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <Icon className="h-4 w-4 block" />
    </a>
  );
}

export default icons;
