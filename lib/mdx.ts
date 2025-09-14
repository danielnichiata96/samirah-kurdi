import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export type PostFrontmatter = {
  title: string;
  date: string; // ISO
  excerpt?: string;
  cover?: string;
  tags?: string[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllPosts(): Promise<Post[]> {
  await fs.mkdir(BLOG_DIR, { recursive: true });
  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(md|mdx)$/i, '');
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    })
  );
  return posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    return { slug, frontmatter: data as PostFrontmatter, content };
  } catch (e) {
    const alt = path.join(BLOG_DIR, `${slug}.md`);
    try {
      const raw = await fs.readFile(alt, 'utf8');
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as PostFrontmatter, content };
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
