import type { ReactNode } from 'react';
import { Reveal } from '../Reveal';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  title: string;
  /** Matches the parent Section's labelledBy so the landmark is named. */
  titleId?: string;
  /** Short machine-ish fact about the section: a count, a date range. */
  meta?: string;
  lead?: ReactNode;
}

/**
 * Every section opens the same way: a rule, the title, and one piece of
 * information on the right. The rule is structural — it marks where one
 * part of the document ends and the next begins.
 */
export function SectionHeading({ title, titleId, meta, lead }: SectionHeadingProps) {
  return (
    <header className={styles.heading}>
      <Reveal variant="wipe" className={styles.titleRow}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {meta ? <p className={styles.meta}>{meta}</p> : null}
      </Reveal>
      {lead ? (
        <Reveal variant="rise" delay={80}>
          <p className={styles.lead}>{lead}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
