import { navItems } from '@/data/navigation';
import { useScrollProgress } from '@/hooks';
import { cn } from '@/utils/cn';
import styles from './TraceRail.module.css';

interface TraceRailProps {
  activeId: string;
}

/**
 * A vertical route down the left edge with one node per section.
 * It doubles as a progress indicator: the line fills as you read, and the
 * node for the section you are in opens up. Hidden below 64rem, where the
 * header navigation covers the same job.
 */
export function TraceRail({ activeId }: TraceRailProps) {
  const progress = useScrollProgress();

  return (
    <nav className={styles.rail} aria-label="Page progress">
      <div className={styles.track} aria-hidden="true">
        <div
          className={styles.fill}
          style={{ transform: `scaleY(${Math.max(0.02, progress)})` }}
        />
      </div>

      <ul className={styles.nodes}>
        {navItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(styles.node, isActive && styles.nodeActive)}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.label}>{item.short}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
