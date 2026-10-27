import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  children: ReactNode;
  /** Adds a hairline above the section. Off for the first one after the hero. */
  divided?: boolean;
  className?: string;
  labelledBy?: string;
}

/** Page section with the shared max width, gutters and vertical rhythm. */
export function Section({
  id,
  children,
  divided = true,
  className,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(styles.section, divided && styles.divided, className)}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
