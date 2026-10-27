import { metrics, profile } from '@/data/profile';
import { ConnectionDiagram, MetricCounter } from '@/components/ui';
import styles from './Hero.module.css';

/**
 * The page-load moment lives here and nowhere else: the headline lines
 * uncover in sequence and the diagram starts its first cycle. Every other
 * animation on the site responds to something the visitor did.
 */
export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        {/* Each item is its own element so the flex gap survives when the
            divider is dropped on narrow screens. */}
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>{profile.availability}</span>
          <span className={styles.statusDivider} aria-hidden="true" />
          <span>{profile.location}</span>
        </p>

        <h1 id="hero-title" className={styles.title}>
          {profile.headline.map((line, index) => (
            <span key={line} className={styles.lineMask}>
              <span
                className={styles.line}
                style={{ animationDelay: `${120 + index * 110}ms` }}
              >
                {line}
              </span>
              {/* Kept for the mobile layout, where the lines run inline. */}
              {index < profile.headline.length - 1 ? ' ' : null}
            </span>
          ))}
        </h1>

        <div className={styles.body}>
          <div className={styles.summary}>
            <p className={styles.intro}>{profile.intro}</p>

            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#work">
                See the work
              </a>
              <a className={styles.secondaryAction} href={`mailto:${profile.email}`}>
                Email me
              </a>
            </div>

            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>Now</dt>
                <dd>Open to backend and platform roles</dd>
              </div>
              <div className={styles.fact}>
                <dt>Last</dt>
                <dd>Technical lead, EaseMyAI</dd>
              </div>
              <div className={styles.fact}>
                <dt>Depth</dt>
                <dd>Rust, Go, Node.js, Kubernetes</dd>
              </div>
            </dl>
          </div>

          <div className={styles.diagram}>
            <p className={styles.diagramIntro}>
              The problem I keep being handed, and how the transport I wrote
              solves it:
            </p>
            <ConnectionDiagram />
          </div>
        </div>

        <ul className={styles.metrics}>
          {metrics.map((metric, index) => (
            <li key={metric.id}>
              <MetricCounter metric={metric} delay={index * 90} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
