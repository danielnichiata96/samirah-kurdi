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
- Pegue o link de checkout do seu produto na Hotmart.
- Defina `CHECKOUT_EBOOK_URL` no `.env.local` ou use `checkoutUrl` por e-book em `content/ebooks.json`.
- Opcional: defina a URL de redirecionamento pós-compra em Hotmart para `/ebooks/sucesso`.

UTM passthrough: o componente `CheckoutButton` anexa parâmetros `utm_*` da URL atual ao link de checkout.

## Blog (MDX)
Os posts ficam em `content/blog/` e usam arquivos `.mdx` ou `.md` com *frontmatter*.

Template:

```md
---
title: "Título do post"
date: "2025-09-14"
excerpt: "Resumo curto para listagem."
cover: "/images/capa-exemplo.jpg"
tags: ["tag1", "tag2"]
draft: false
---

Conteúdo em Markdown/MDX (pode usar **negrito**, listas, blocos de citação, links, etc.).
```

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

