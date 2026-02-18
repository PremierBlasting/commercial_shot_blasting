import { Link } from 'wouter';
import { usePrefetch } from '@/hooks/usePrefetch';
import { ReactNode } from 'react';

interface PrefetchLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A Link component that prefetches the target page on hover/focus.
 * This makes navigation feel instant by loading the JavaScript bundle
 * before the user clicks.
 */
export function PrefetchLink({ href, children, className, onClick }: PrefetchLinkProps) {
  const { prefetch, cancelPrefetch } = usePrefetch();

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      onMouseEnter={() => prefetch(href)}
      onMouseLeave={cancelPrefetch}
      onFocus={() => prefetch(href)}
      onBlur={cancelPrefetch}
    >
      {children}
    </Link>
  );
}
