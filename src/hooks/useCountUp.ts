import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseCountUpOptions {
  /** Only starts once this is true, so numbers animate when scrolled into view. */
  active: boolean;
  duration?: number;
}

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/** Animates 0 -> target once, then holds. Skipped entirely under reduced motion. */
export function useCountUp(
  target: number,
  { active, duration = 1400 }: UseCountUpOptions
): number {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      setValue(target * easeOutQuint(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, prefersReducedMotion]);

  return value;
}
