'use client';

type Props = {
  className?: string;
};

export default function ReloadButton({ className }: Props) {
  return (
    <button
      onClick={() => typeof window !== 'undefined' && window.location.reload()}
      className={
        className ||
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand bg-white border border-zinc-300 text-zinc-900 shadow-[0_6px_0_0_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(0,0,0,0.12)] px-5 py-3'
      }
      type="button"
    >
      Tentar novamente
    </button>
  );
}
