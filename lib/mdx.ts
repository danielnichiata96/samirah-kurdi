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
  tags?: string[];
  draft?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const FrontmatterSchema = z.object({
  title: z.string().min(3).max(120),
  date: z.string().refine((d: string) => !Number.isNaN(Date.parse(d)), 'Data inválida'),
  excerpt: z.string().max(300).optional(),
  cover: z.string().url().or(z.string().startsWith('/')).optional(),
  image: z.string().url().or(z.string().startsWith('/')).optional(),
  tags: z.array(z.string().min(1).max(30)).max(8).optional(),
  draft: z.boolean().optional(),
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
