PROMPT (cole no seu AI Agent)

Quero que você gere um projeto Next.js 14 (App Router) + TypeScript + TailwindCSS para o site da minha esposa, confeiteira e professora.

0) Identidade & variáveis

NOME DA MARCA: {NOME_MARCA} (ex.: “Confeitaria {SOBRENOME}`)

SLOGAN: {SLOGAN} (ex.: “Consultoria e Aulas de Confeitaria Profissional”)

CIDADE/ESTADO: {CIDADE_UF}

CONTATOS: WhatsApp {WHATSAPP}, Email {EMAIL}

REDES: Instagram {@INSTAGRAM}, YouTube {YOUTUBE_URL}

URL DE CHECKOUT E-BOOK: {URL_CHECKOUT_EBOOK} (Hotmart/Kiwify/Stripe)

URL DE AGENDAMENTO OPCIONAL: {URL_CALENDLY} (ou use formulário próprio)

1) Objetivo do site

Vender e-books, captar consultorias e matrículas em aulas.

Construir autoridade com blog e depoimentos.

Gerar leads via newsletter (Brevo/Mailchimp, usar webhook simples ou API nativa).

2) Funcionais obrigatórios

Pages/Rotas

/ (Home): Hero, CTA (“Agendar consultoria”, “Comprar e-book”), Seção Sobre, Serviços, Depoimentos, 3 posts recentes, captura de e-mail.

/sobre: Bio completa (10 anos de experiência, Sistema S), fotos.

/servicos: Cartões para Consultoria 1:1, Aulas (online/presencial), Pacotes. Botões: agendar ou abrir formulário.

/ebooks: Lista de e-books; cada card abre página de detalhes com botão Comprar (leva para {URL_CHECKOUT_EBOOK}).

/blog: lista paginada de posts (MDX).

/blog/[slug]: post MDX com TOC, destaque, SEO e rich snippets.

/contato: formulário (nome, email, mensagem) + WhatsApp.

/politica-de-privacidade e /termos.

Componentes

Header sticky com logo + nav + CTA.

Footer com contatos, mapa de site, redes.

Hero com imagem de fundo leve (placeholder) + 2 CTAs.

Cards (Serviços, E-books, Post).

Carrossel de Depoimentos (dados em JSON/YAML).

Formulário de newsletter (integração simples via fetch para endpoint /api/newsletter – mock com console.log e comentário de como ligar ao Brevo/Mailchimp).

Formulário de consultoria /api/consultoria salvando em arquivo JSON local ou Prisma (se DATABASE_URL existir).

Conteúdo

Blog em MDX (pasta content/posts) com 3 posts de exemplo focados em SEO para confeitaria (ex.: precificação, padronização de ficha técnica, erros comuns em brigadeiro gourmet).

Um e-book de exemplo (metadata apenas).

Loja digital

Página do e-book com: capa placeholder, sumário, “o que você vai aprender”, garantia e botão Comprar que abre {URL_CHECKOUT_EBOOK}.

SEO

next-seo ou metadata do App Router configurada (title, description, og:image).

Sitemap (/sitemap.xml) e robots.txt.

JSON-LD para: Organization, Product (e-book), Article.

Performance & A11y

Imagens com next/image, lazy, alt em todas.

Lighthouse 90+ (core vitals), fontes via next/font.

Analytics

GA4 com env NEXT_PUBLIC_GA_ID (se não houver, deixar mock).

Styles

Tailwind + design clean (tons neutros + 1 cor destaque {#COR_HEX}).

Componentes reutilizáveis (Button, Card, Section, Container, Input).

Infra

Deploy na Vercel.

.env.example com: NEXT_PUBLIC_GA_ID, NEWSLETTER_API_KEY?, DATABASE_URL?.

Scripts: dev, build, start, lint, typecheck.

CMS

Sem painel externo. Conteúdo via MDX e JSON (depoimentos/serviços). Deixe comentários no código mostrando como plugar Notion/Contentlayer depois.

3) Arquitetura & estrutura de pastas

Crie algo como:

/app
  /(site)
    /blog/[slug]/page.tsx
    /blog/page.tsx
    /ebooks/page.tsx
    /ebooks/[slug]/page.tsx
    /servicos/page.tsx
    /sobre/page.tsx
    /contato/page.tsx
    /layout.tsx
    /page.tsx
  /api
    /newsletter/route.ts
    /consultoria/route.ts
/components
  Button.tsx, Container.tsx, Section.tsx, Card.tsx, Header.tsx, Footer.tsx,
  Hero.tsx, ServiceCard.tsx, EbookCard.tsx, TestimonialCarousel.tsx,
  NewsletterForm.tsx, ContactForm.tsx, Prose.tsx
/content
  /posts/*.mdx
  /testimonials.json
  /ebooks.json
/lib
  seo.ts, schema.ts, utils.ts
/public
  /images (placeholders)
/styles
  globals.css

4) Conteúdo padrão (preencha com placeholders reais)

Depoimentos (3) com nome, cidade, foto placeholder.

3 posts MDX com H1-H3, imagens otimizadas, bloco de receita (ingredientes + modo de preparo), e CTA no final.

Página “E-book Brigadeiros Profissionais” com seções: “Para quem é”, “O que você vai aprender”, “Bônus”, “FAQ”, “Garantia 7 dias”.

5) Formulários (funcionando)

/api/newsletter:

Recebe { email }.

Se existir NEWSLETTER_API_KEY, enviar para serviço externo (deixar função mock e comentários).

Retornar JSON de sucesso/erro.

/api/consultoria:

Recebe { nome, email, whatsapp, objetivo, preferenciaDatas }.

Persistir em arquivo data/consultorias.json (ou Prisma se DATABASE_URL presente).

Enviar resposta de sucesso e exibir toast na UI.

6) UI/UX

CTA primário sempre visível (header e hero).

Seções com espaçamento “container mx-auto px-4 py-16”.

Estado de carregamento e erro nos formulários.

A11y: foco visível, labels, aria-live.

7) Exemplos de copy (use e adapte)

Hero.title: “Consultoria e Aulas de Confeitaria Profissional”

Hero.subtitle: “{NOME_MARCA} ajuda confeiteiros(as) a padronizar receitas, precificar e vender mais.”

CTA1: “Agendar Consultoria”

CTA2: “Comprar E-book”

Newsletter: “Receba receitas e dicas exclusivas no seu e-mail.”

8) Entregáveis

Projeto completo, compilando e rodando com pnpm (ou npm).

Instruções no README.md com: como rodar local, como configurar env, e como publicar na Vercel.

5 prints de telas (gerados via next-sitemap não; apenas instruções de captura manual).

Gere o código agora.