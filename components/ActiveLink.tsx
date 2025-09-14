"use client";
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

type Props = LinkProps<string> & {
  children: ReactNode;
  className?: string;
  exact?: boolean;
  activeClassName?: string;
};

export default function ActiveLink({
  children,
  className,
  href,
  exact = false,
  activeClassName = 'text-zinc-900 font-medium',
  ...rest
}: Props) {
  const pathname = usePathname();
  const hrefStr = typeof href === 'string' ? href : (href as any).pathname || '';
  const isActive = exact ? pathname === hrefStr : pathname.startsWith(hrefStr) && hrefStr !== '/';
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={clsx('transition-colors hover:text-zinc-900', className, isActive && activeClassName)}
      {...rest}
    >
      {children}
    </Link>
  );
}
