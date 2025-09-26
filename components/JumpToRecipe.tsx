'use client';

import { cn } from '@/lib/utils';

export default function JumpToRecipe({ className }: { className?: string }) {
  const scrollToRecipe = () => {
    const element = document.getElementById('receita');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className={cn('sticky top-14 z-10 mx-auto w-full max-w-3xl px-4', className)}>
      <div className="rounded-full border border-pink-200 bg-pink-50/80 px-4 py-2 text-center text-sm text-pink-900 backdrop-blur supports-[backdrop-filter]:bg-pink-50/60">
        <button 
          onClick={scrollToRecipe}
          className="font-medium hover:underline cursor-pointer"
        >
          Pular para a receita ↓
        </button>
      </div>
    </div>
  );
}
