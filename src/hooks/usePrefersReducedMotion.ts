import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Every animated component reads this before it starts a timeline.
 * Reduced motion means "show me the end state", not "show me nothing".
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
