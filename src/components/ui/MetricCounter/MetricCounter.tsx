import { useCountUp, useInView } from '@/hooks';
import { formatMetric } from '@/utils/format';
import type { Metric } from '@/types';
import styles from './MetricCounter.module.css';

interface MetricCounterProps {
  metric: Metric;
  /** Stagger between siblings, in milliseconds. */
  delay?: number;
}

/**
 * A single headline number. Counts up the first time it is scrolled into
 * view, then holds. The note underneath exists so the number is falsifiable
 * rather than decorative.
 */
export function MetricCounter({ metric, delay = 0 }: MetricCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 });
  const animated = useCountUp(metric.value, {
    active: inView,
    duration: 1200 + delay,
  });

  return (
    <div ref={ref} className={styles.metric}>
      <p className={styles.value}>
        {metric.prefix ? <span className={styles.affix}>{metric.prefix}</span> : null}
        <span className={styles.number}>{formatMetric(animated)}</span>
        {metric.suffix ? <span className={styles.affix}>{metric.suffix}</span> : null}
      </p>
      <p className={styles.label}>{metric.label}</p>
      <p className={styles.note}>{metric.note}</p>
    </div>
  );
}
