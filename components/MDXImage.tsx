import Image from 'next/image';
import { ComponentProps } from 'react';

type MDXImageProps = ComponentProps<typeof Image>;

/**
 * Wrapper for Next.js Image component to be used in MDX content.
 * This component can be safely passed to next-mdx-remote.
 * @param props - Image component props
 * @returns Next.js Image component
 */
export default function MDXImage(props: MDXImageProps) {
  return <Image {...props} />;
}
