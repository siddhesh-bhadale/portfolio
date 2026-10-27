import { useEffect, useState } from 'react';

/** Document scroll position as a 0–1 value, throttled to one frame. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progress;
}
