import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export type PostFrontmatter = {
  title: string;
  date: string; // ISO
  excerpt?: string;
  cover?: string;
  image?: string;
  image2?: string;
  tags?: string[];
  draft?: boolean;
  category?: string; // e.g. Breakfast
  rating?: number; // 0..5
  reviews?: number; // count
  // Optional recipe-specific fields
  prepTime?: string; // e.g. "30 minutos"
  cookTime?: string; // e.g. "35 minutos"
  totalTime?: string; // e.g. "1h 05min"
  servings?: string; // e.g. "12 porções"
  yield?: string; // alternative to servings
  ingredients?: string[];
  instructions?: string[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');

const FrontmatterSchema = z.object({
  title: z.string().min(3).max(120),
  date: z.string().refine((d: string) => !Number.isNaN(Date.parse(d)), 'Data inválida'),
  excerpt: z.string().max(300).optional(),
  cover: z.string().url().or(z.string().startsWith('/')).optional(),
  image: z.string().url().or(z.string().startsWith('/')).optional(),
  image2: z.string().url().or(z.string().startsWith('/')).optional(),
  tags: z.array(z.string().min(1).max(30)).max(8).optional(),
  draft: z.boolean().optional(),
  category: z.string().max(50).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().nonnegative().optional(),
  // Recipe extras (all optional)
  prepTime: z.string().max(60).optional(),
  cookTime: z.string().max(60).optional(),
  totalTime: z.string().max(60).optional(),
  servings: z.string().max(60).optional(),
  yield: z.string().max(60).optional(),
  ingredients: z.array(z.string().min(1)).max(200).optional(),
  instructions: z.array(z.string().min(1)).max(400).optional(),
});

function validateFrontmatter(data: any, file: string) {
  const parse = FrontmatterSchema.safeParse(data);
  if (!parse.success) {
    const issues = parse.error.issues.map((i: any) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Frontmatter inválido em ${file}: ${issues}`);
  }
  return parse.data as PostFrontmatter;
}

export async function getAllPosts(options: { includeDrafts?: boolean } = {}): Promise<Post[]> {
  const { includeDrafts = process.env.NODE_ENV !== 'production' } = options;
  await fs.mkdir(BLOG_DIR, { recursive: true });
  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fm = validateFrontmatter(data, file);
      const slug = file.replace(/\.(md|mdx)$/i, '');
      return {
        slug,
        frontmatter: fm,
        content,
      };
    })
  );
  return posts
    .filter((p) => (includeDrafts ? true : !p.frontmatter.draft))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getPost(slug: string, options: { includeDrafts?: boolean } = {}): Promise<Post | null> {
  const { includeDrafts = process.env.NODE_ENV !== 'production' } = options;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
  const fm = validateFrontmatter(data, `${slug}.mdx`);
  if (fm.draft && !includeDrafts) return null;
  return { slug, frontmatter: fm, content };
  } catch (e) {
    const alt = path.join(BLOG_DIR, `${slug}.md`);
    try {
      const raw = await fs.readFile(alt, 'utf8');
    const { data, content } = matter(raw);
  const fm = validateFrontmatter(data, `${slug}.md`);
  if (fm.draft && !includeDrafts) return null;
  return { slug, frontmatter: fm, content };
    } catch (_) {
      return null;
    }
  }
}

// Recipes: separate loaders allowing recipes to live under content/recipes
export async function getAllRecipes(options: { includeDrafts?: boolean } = {}): Promise<Post[]> {
  const { includeDrafts = process.env.NODE_ENV !== 'production' } = options;
  await fs.mkdir(RECIPES_DIR, { recursive: true });
  const files = await fs.readdir(RECIPES_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(RECIPES_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const fm = validateFrontmatter(data, file);
      const slug = file.replace(/\.(md|mdx)$/i, '');
      return {
        slug,
        frontmatter: fm,
        content,
      };
    })
  );
  return posts
    .filter((p) => (includeDrafts ? true : !p.frontmatter.draft))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getRecipe(slug: string, options: { includeDrafts?: boolean } = {}): Promise<Post | null> {
  const { includeDrafts = process.env.NODE_ENV !== 'production' } = options;
  const filePath = path.join(RECIPES_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const fm = validateFrontmatter(data, `${slug}.mdx`);
    if (fm.draft && !includeDrafts) return null;
    return { slug, frontmatter: fm, content };
  } catch (e) {
    const alt = path.join(RECIPES_DIR, `${slug}.md`);
    try {
      const raw = await fs.readFile(alt, 'utf8');
      const { data, content } = matter(raw);
      const fm = validateFrontmatter(data, `${slug}.md`);
      if (fm.draft && !includeDrafts) return null;
      return { slug, frontmatter: fm, content };
    } catch (_) {
      return null;
    }
  }
}

export async function renderMdx(source: string) {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
      format: 'mdx',
    },
    parseFrontmatter: false,
  });
}
