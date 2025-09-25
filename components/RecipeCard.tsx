import React from 'react';
import { FiClock, FiUsers } from 'react-icons/fi';
import { cn } from '@/lib/utils';

type RecipeCardProps = {
  title?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  yieldText?: string;
  ingredients?: string[];
  instructions?: string[];
  className?: string;
};

export default function RecipeCard({
  title,
  prepTime,
  cookTime,
  totalTime,
  servings,
  yieldText,
  ingredients = [],
  instructions = [],
  className,
}: RecipeCardProps) {
  return (
    <section id="receita" className={cn('rounded-2xl border border-zinc-200 bg-white shadow-sm', className)}>
      <div className="border-b border-zinc-200 p-5 sm:p-6">
        <h2 className="text-xl font-semibold leading-tight">{title || 'Resumo da receita'}</h2>
  <div className="mt-3 grid [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] gap-3 text-sm text-zinc-700">
          {prepTime && (
            <div className="rounded-lg bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/60 min-h-[88px]">
              <div className="flex items-center gap-2 font-medium leading-snug text-zinc-800">
                <FiClock aria-hidden className="h-4 w-4 text-zinc-400" />
                <span>Preparo</span>
              </div>
              <div className="leading-relaxed break-words text-zinc-700">{prepTime}</div>
            </div>
          )}
          {cookTime && (
            <div className="rounded-lg bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/60 min-h-[88px]">
              <div className="flex items-center gap-2 font-medium leading-snug text-zinc-800">
                <FiClock aria-hidden className="h-4 w-4 text-zinc-400" />
                <span>Cozimento</span>
              </div>
              <div className="leading-relaxed break-words text-zinc-700">{cookTime}</div>
            </div>
          )}
          {totalTime && (
            <div className="rounded-lg bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/60 min-h-[88px]">
              <div className="flex items-center gap-2 font-medium leading-snug text-zinc-800">
                <FiClock aria-hidden className="h-4 w-4 text-zinc-400" />
                <span>Tempo total</span>
              </div>
              <div className="leading-relaxed break-words text-zinc-700">{totalTime}</div>
            </div>
          )}
          {(servings || yieldText) && (
            <div className="rounded-lg bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-200/60 min-h-[88px]">
              <div className="flex items-center gap-2 font-medium leading-snug text-zinc-800">
                <FiUsers aria-hidden className="h-4 w-4 text-zinc-400" />
                <span>Rendimento</span>
              </div>
              <div className="leading-relaxed break-words text-zinc-700">{servings || yieldText}</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <h3 className="mb-3 text-lg font-semibold">Ingredientes</h3>
          {ingredients?.length ? (
            <ul className="list-inside list-disc space-y-2 text-zinc-800">
              {ingredients.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-600">Inclua os ingredientes no frontmatter ou no conteúdo.</p>
          )}
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold">Modo de preparo</h3>
          {instructions?.length ? (
            <ol className="list-inside list-decimal space-y-3 text-zinc-800">
              {instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-zinc-600">Inclua o passo a passo no frontmatter ou no conteúdo.</p>
          )}
        </div>
      </div>
    </section>
  );
}
