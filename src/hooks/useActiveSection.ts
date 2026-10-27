import { useEffect, useState } from 'react';

/**
 * Scroll-spy over a fixed list of section ids.
 *
 * Picks the last section whose top has passed an anchor line a third of the
 * way down the viewport. That reads more naturally than "most visible",
 * which flickers between two sections of very different heights.
 */
export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.34;
      let current = ids[0] ?? '';

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= anchor) {
          current = id;
        }
      }

      // At the very bottom the last section may never cross the anchor.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActiveId((previous) => (previous === current ? previous : current));
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
  }, [ids]);

  return activeId;
}
