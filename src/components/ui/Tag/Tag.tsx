import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
  /** Visual weight. "quiet" is the default chip, "signal" carries the accent. */
  tone?: 'quiet' | 'signal' | 'outline';
  size?: 'sm' | 'md';
  title?: string;
}

/** A single technology or label chip. */
export function Tag({ children, tone = 'quiet', size = 'md', title }: TagProps) {
  return (
    <span className={cn(styles.tag, styles[tone], styles[size])} title={title}>
      {children}
    </span>
  );
}

/** Convenience wrapper so stack lists are consistent everywhere. */
export function TagList({
  items,
  tone = 'quiet',
  size = 'md',
  label,
}: {
  items: string[];
  tone?: 'quiet' | 'signal' | 'outline';
  size?: 'sm' | 'md';
  label?: string;
}) {
  return (
    <ul className={styles.list} aria-label={label ?? 'Technologies used'}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone} size={size}>
            {item}
          </Tag>
        </li>
      ))}
    </ul>
  );
}
