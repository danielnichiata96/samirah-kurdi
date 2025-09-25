import React from 'react';
import { cn } from '@/lib/utils';
import JumpToRecipe from './JumpToRecipe';

type Props = {
  title: string;
  excerpt?: string;
  date?: string;
  cover?: string;
  category?: string; // e.g. "Café da manhã"
  rating?: number; // 0..5
  reviews?: number; // count of reviews
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  className?: string;
};

export default function RecipeHeader({
  title,
  excerpt,
  date,
  cover,
  category,
  rating,
  reviews,
  prepTime,
  cookTime,
  totalTime,
  className,
}: Props) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()
    : undefined;
  const stars = Math.round((rating || 0) * 2) / 2; // allow halves in the future

  return (
    <div className={cn('grid items-start gap-8 lg:grid-cols-2', className)}>
      {/* Image */}
      {cover ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="Imagem da receita" className="h-full w-full object-cover" />
        </div>
      ) : null}

      {/* Textual meta */}
      <div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-700">
          {category && <span className="uppercase tracking-wide text-zinc-600">{category}</span>}
          {(category && formattedDate) && <span aria-hidden>—</span>}
          {formattedDate && <time dateTime={date}>{formattedDate}</time>}
          {/* Rating */}
          {Number.isFinite(rating as number) && (
            <div className="ml-auto flex items-center gap-1 text-pink-600">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill={i + 1 <= (stars || 0) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  className={cn('h-4 w-4', i + 1 <= (stars || 0) ? 'opacity-100' : 'opacity-40')}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"
                  />
                </svg>
              ))}
              {reviews ? (
                <span className="ml-2 text-xs text-zinc-600">{reviews} avaliações</span>
              ) : null}
            </div>
          )}
        </div>

  <h1 className="mt-4 text-pretty font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {excerpt && <p className="mt-4 text-lg text-zinc-700">{excerpt}</p>}

        {/* Times */}
        <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
          {prepTime && (
            <div>
              <dt className="text-zinc-500">PREP TIME:</dt>
              <dd className="font-medium text-zinc-900">{prepTime}</dd>
            </div>
          )}
          {cookTime && (
            <div>
              <dt className="text-zinc-500">COOK TIME:</dt>
              <dd className="font-medium text-zinc-900">{cookTime}</dd>
            </div>
          )}
          {totalTime && (
            <div>
              <dt className="text-zinc-500">TOTAL TIME:</dt>
              <dd className="font-medium text-zinc-900">{totalTime}</dd>
            </div>
          )}
        </dl>

        {/* Jump button */}
        <div className="mt-6">
          <JumpToRecipe className="sticky top-0 w-full max-w-none px-0" />
        </div>
      </div>
    </div>
  );
}
