import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Stop observing after the first intersection. Defaults to true. */
  once?: boolean;
  /** How much of the element must be visible, 0–1. */
  threshold?: number;
  /** Shrinks the viewport so reveals fire slightly before the edge. */
  rootMargin?: string;
}

/**
 * Returns a ref to attach and whether that element is on screen.
 * Used by every scroll reveal so there is exactly one observer pattern
 * in the codebase rather than one per component.
 */
export function useInView<T extends HTMLElement>({
  once = true,
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView } as const;
}
