import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks';
import { cn } from '@/utils/cn';
import styles from './Reveal.module.css';

export type RevealVariant = 'rise' | 'wipe' | 'fade';

interface RevealProps {
  children: ReactNode;
  /** Element rendered as the observed wrapper. Defaults to a div. */
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger in milliseconds. Keep under ~240 or it starts to feel slow. */
  delay?: number;
  /** Applied to the inner element, so layout classes still hit the content. */
  className?: string;
}

/**
 * One reveal implementation for the whole site, so timing and easing stay
 * consistent and there is a single place to tune them.
 *
 * The observed wrapper and the animated element are deliberately separate:
 * a clip-path that hides the element also hides it from IntersectionObserver,
 * so an element that clipped itself would never be told it had appeared.
 *
 * Under prefers-reduced-motion the CSS drops every transition, which leaves
 * the content in its final state immediately.
 */
export function Reveal({
  children,
  as: Wrapper = 'div',
  variant = 'rise',
  delay = 0,
  className,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Wrapper ref={ref} className={styles.root}>
      <div
        className={cn(
          styles.inner,
          styles[variant],
          inView && styles.visible,
          className
        )}
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {children}
      </div>
    </Wrapper>
  );
}
