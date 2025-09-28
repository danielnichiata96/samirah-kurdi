'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FaPrint } from 'react-icons/fa';
import Image from 'next/image';

type Props = {
  title?: string;
  cover?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  category?: string;
  ingredients?: string[];
  instructions?: string[];
  className?: string;
};

export default function RecipeSummary({
  title,
  cover,
  prepTime,
  cookTime,
  totalTime,
  servings,
  category,
  ingredients,
  instructions,
  className,
}: Props) {
  const handlePrint = () => {
    // Criar uma nova janela para impressão
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Conteúdo HTML otimizado para impressão
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receita - Impressão</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #000;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            h2 {
              color: #333;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            .recipe-info {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin: 20px 0;
              padding: 15px;
              background: #f5f5f5;
              border-radius: 8px;
            }
            .recipe-info div {
              text-align: center;
            }
            .recipe-info strong {
              display: block;
              font-size: 12px;
              text-transform: uppercase;
              color: #666;
              margin-bottom: 5px;
            }
            .recipe-info span {
              font-weight: bold;
              color: #000;
            }
            .ingredients {
              margin: 20px 0;
            }
            .ingredients ul {
              list-style: none;
              padding: 0;
            }
            .ingredients li {
              padding: 5px 0;
              border-bottom: 1px dotted #ccc;
            }
            .ingredients li:before {
              content: "• ";
              color: #666;
              font-weight: bold;
            }
            .instructions {
              margin: 20px 0;
            }
            .instructions ol {
              counter-reset: step-counter;
              padding: 0;
            }
            .instructions li {
              counter-increment: step-counter;
              padding: 10px 0;
              border-bottom: 1px dotted #ccc;
              position: relative;
              padding-left: 40px;
            }
            .instructions li:before {
              content: counter(step-counter);
              position: absolute;
              left: 0;
              top: 10px;
              background: #333;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: bold;
            }
            .separator {
              border-top: 1px solid #ccc;
              margin: 30px 0;
              text-align: center;
            }
            .separator:after {
              content: "●";
              background: white;
              padding: 0 10px;
              color: #ccc;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .recipe-info { background: #f9f9f9 !important; }
            }
          </style>
        </head>
        <body>
          <h1>${title || 'Receita'}</h1>
          <div style="margin-top:6px; display:flex; gap:12px; align-items:center;">
            <div style="font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#111">FEITO POR</div>
            <div style="font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#111">SAMIRAH KURDI</div>
          </div>
          
          ${category ? `<div style="font-size: 14px; color: #666; text-transform: uppercase; margin-bottom: 10px;">${category}</div>` : ''}
          
          <div class="recipe-info">
            ${prepTime ? `
              <div>
                <strong>Tempo de preparo</strong>
                <span>${prepTime}</span>
              </div>
            ` : ''}
            
            ${cookTime ? `
              <div>
                <strong>Tempo de cozimento</strong>
                <span>${cookTime}</span>
              </div>
            ` : ''}
            
            ${totalTime ? `
              <div>
                <strong>Tempo total</strong>
                <span>${totalTime}</span>
              </div>
            ` : ''}
            
            ${servings ? `
              <div>
                <strong>Rendimento</strong>
                <span>${servings}</span>
              </div>
            ` : ''}
          </div>

          ${ingredients && ingredients.length > 0 ? `
            <h2>Ingredientes</h2>
            <div class="ingredients">
              <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${instructions && instructions.length > 0 ? `
            <h2>Modo de preparo</h2>
            <div class="instructions">
              <ol>
                ${instructions.map(instruction => `<li>${instruction}</li>`).join('')}
              </ol>
            </div>
          ` : ''}

          <div class="separator"></div>
          <p style="text-align: center; color: #666; font-size: 12px;">
            Receita impressa em ${new Date().toLocaleDateString('pt-BR')}
          </p>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Aguardar o conteúdo carregar e abrir a impressão
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };
  return (
    <div className={cn(
      "bg-zinc-50 border border-zinc-200 rounded-2xl p-6 lg:p-8",
      className
    )}>
      {/* Header with Image and Title */}
      <div className="flex items-start gap-6 mb-8">
        {/* Recipe Image */}
        {cover && (
          <div className="flex-shrink-0">
            <div className="w-28 h-28 lg:w-36 lg:h-36 relative rounded-xl overflow-hidden">
              <Image
                src={cover}
                alt={title || 'Imagem da receita'}
                fill
                sizes="(max-width: 768px) 96px, 128px"
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Title and Category */}
        <div className="flex-1 min-w-0">
          {category && (
            <div className="text-sm font-medium text-pink-600 uppercase tracking-wide mb-2">
              {category}
            </div>
          )}
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-zinc-900 leading-tight">
                {title ? title : 'Resumo da receita'}
              </h2>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-xs font-bold tracking-wider text-zinc-900 uppercase">FEITO POR</span>
                <span className="text-xs font-medium tracking-wider text-pink-600 uppercase">SAMIRAH KURDI</span>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex flex-col items-center gap-1 px-3 py-2 text-sm font-medium text-pink-700 bg-white border border-pink-300 rounded-lg hover:bg-pink-50 hover:border-pink-400 transition-colors duration-200 ml-4 flex-shrink-0"
              title="Imprimir receita"
            >
              <div className="flex items-center gap-2">
                <FaPrint className="w-4 h-4" />
                <span className="hidden sm:inline">Imprimir</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Info Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {prepTime && (
          <div className="text-center">
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">
              Tempo de preparo
            </div>
            <div className="font-semibold text-zinc-900 text-sm lg:text-base">
              {prepTime}
            </div>
          </div>
        )}
        
        {cookTime && (
          <div className="text-center">
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">
              Tempo de cozimento
            </div>
            <div className="font-semibold text-zinc-900 text-sm lg:text-base">
              {cookTime}
            </div>
          </div>
        )}
        
        {totalTime && (
          <div className="text-center">
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">
              Tempo total
            </div>
            <div className="font-semibold text-zinc-900 text-sm lg:text-base">
              {totalTime}
            </div>
          </div>
        )}
        
        {servings && (
          <div className="text-center">
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">
              Rendimento
            </div>
            <div className="font-semibold text-zinc-900 text-sm lg:text-base">
              {servings}
            </div>
          </div>
        )}
      </div>

      {/* Ingredients Section */}
      {ingredients && ingredients.length > 0 && (
        <div className="mb-8">
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-zinc-900 mb-4">
            Ingredientes
          </h3>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-zinc-400 mr-3 mt-1">•</span>
                <span className="text-zinc-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructions Section */}
      {instructions && instructions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-zinc-900 mb-4">
            Modo de preparo
          </h3>
          <ol className="space-y-4">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-zinc-200 text-zinc-700 text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-zinc-700 leading-relaxed">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Decorative separator */}
      <div className="mt-8 pt-6 border-t border-zinc-200">
        <div className="flex items-center justify-center">
          <div className="h-1 w-16 bg-zinc-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
