# Samirah Site

Projeto Next.js 14 + TypeScript + TailwindCSS (App Router) para site de confeitaria.

## Tema / Design
Paleta atual em modo monocromático (preto, branco e cinzas) para estética clean. Antigas cores verde/rosa removidas. Ajustes principais:
- Variáveis CSS redefinidas em `styles/globals.css`.
- Botões agora neutros (`zinc` scale).
- Header / Footer fundo branco translúcido.
- Cores voltarão via imagens/fotografia de produtos.

## Requisitos
- Node.js >= 18.17

## Instalação

```sh
# com npm
npm install

# ou com pnpm
# pnpm install
```

## Desenvolvimento

```sh
npm run dev
```

Abra http://localhost:3000.

## Build

```sh
npm run build
npm start
```

## Variáveis de Ambiente
Veja `.env.example` e crie um `.env.local` com os valores.

## Deploy
Recomendado Vercel. Após importar o repositório, configure as variáveis de ambiente do `.env.example`.

### Hotmart (Checkout)
Para ativar o botão Comprar:

UTM passthrough: o componente `CheckoutButton` anexa parâmetros `utm_*` da URL atual ao link de checkout.

## Blog (MDX)
Os posts ficam em `content/blog/` e usam arquivos `.mdx` ou `.md` com *frontmatter*.

Template:

```md
title: "Título do post"
date: "2025-09-14"
excerpt: "Resumo curto para listagem."
cover: "/images/capa-exemplo.jpg"
tags: ["tag1", "tag2"]
draft: false

Conteúdo em Markdown/MDX (pode usar **negrito**, listas, blocos de citação, links, etc.).
```
## Receitas com layout estilizado

- Adicionamos um layout inspirado em páginas de receitas modernas (ex.: "jump to recipe" e cartão lateral com resumo).
- Para usar, crie arquivos em `content/recipes/*.mdx` com frontmatter estendido:

```
---
title: "Bolo de Chocolate Simples"
date: "2025-09-15"
excerpt: "Um bolo simples e gostoso, perfeito para iniciantes."
cover: "/images/placeholder-ebook.png"
tags: ["bolo", "chocolate", "caseiro"]
prepTime: "15 minutos"
cookTime: "35 minutos"
totalTime: "50 minutos"
servings: "12 fatias"
ingredients:
	- "2 ovos"
	- "1 xícara de açúcar"
instructions:
	- "Misture os ingredientes líquidos."
	- "Asse em forno a 180°C por 35 minutos."
---

Aqui vai a introdução e dicas da receita em MDX.
```

- O cartão lateral de receita (component `RecipeCard`) usa os campos acima automaticamente.
- Há um botão fixo de "Pular para a receita" (`JumpToRecipe`) que navega ao cartão com id `#receita`.

Fluxo para publicar:
1. Criar arquivo `slug-do-post.mdx` em `content/blog/` (o nome vira a URL `/blog/slug-do-post`).
2. Preencher `title`, `date` (YYYY-MM-DD) e opcionalmente `excerpt`, `cover`, `tags`.
3. Para esconder um post antes do lançamento: `draft: true` (não aparece em produção).
4. Commit + push → deploy automático.

Tags:
- Página geral: `/blog/tags`
- Página de uma tag: `/blog/tags/<tag>`

Sitemap inclui posts e páginas de tag automaticamente.

Imagens:
- Colocar em `public/images/` e referenciar com caminho absoluto, ex: `/images/foto.jpg`.
- Preferir proporção 16:9 para `cover`.

Boas práticas de escrita:
- Primeiro parágrafo = contexto direto (ganha snippet/SEO)
- Subtítulos (`##`) para seções
- Usar listas para procedimentos / passos
- Call to Action final (ex: link para `/contato` ou `/ebooks`)

