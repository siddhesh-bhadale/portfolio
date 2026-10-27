import { useId } from 'react';
import type { Project } from '@/types';
import { TagList } from '@/components/ui';
import { cn } from '@/utils/cn';
import styles from './Work.module.css';

interface ProjectEntryProps {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * One project, collapsed to a summary line and opened on demand.
 *
 * The panel expands with a grid-template-rows transition rather than a
 * measured pixel height, so it stays correct when the text reflows.
 */
export function ProjectEntry({ project, isOpen, onToggle }: ProjectEntryProps) {
  const panelId = useId();

  return (
    <article className={cn(styles.project, isOpen && styles.projectOpen)}>
      <h3 className={styles.projectHeading}>
        <button
          type="button"
          className={styles.trigger}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className={styles.triggerText}>
            <span className={styles.projectName}>{project.name}</span>
            <span className={styles.projectTagline}>{project.tagline}</span>
          </span>

          <span className={styles.triggerMeta}>
            <span className={styles.metaLine}>{project.context}</span>
            <span className={styles.metaLine}>
              {project.role} · {project.period}
            </span>
          </span>

          <span className={styles.chevron} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6.5 8 10.5l4-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      <div id={panelId} className={styles.panel} role="region" aria-hidden={!isOpen}>
        <div className={styles.panelInner}>
          <div className={styles.panelGrid}>
            <div className={styles.panelMain}>
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>The problem</h4>
                <p className={styles.prose}>{project.problem}</p>
              </div>

              <div className={styles.block}>
                <h4 className={styles.blockTitle}>What I built</h4>
                <ul className={styles.bulletList}>
                  {project.approach.map((item) => (
                    <li key={item} className={styles.bullet}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Where it landed</h4>
                <ul className={styles.bulletList}>
                  {project.outcome.map((item) => (
                    <li key={item} className={styles.bullet}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className={styles.panelAside}>
              <dl className={styles.metrics}>
                {project.metrics.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <dt className={styles.metricLabel}>{metric.label}</dt>
                    <dd className={styles.metricValue}>{metric.value}</dd>
                  </div>
                ))}
              </dl>

              <div className={styles.stack}>
                <h4 className={styles.blockTitle}>Stack</h4>
                <TagList items={project.stack} size="sm" label={`${project.name} stack`} />
              </div>

              {project.links?.length ? (
                <ul className={styles.links}>
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className={styles.link}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
