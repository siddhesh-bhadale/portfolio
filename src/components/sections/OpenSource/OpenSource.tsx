import { openSource } from '@/data/openSource';
import { Section } from '@/components/layout';
import { Reveal, SectionHeading } from '@/components/ui';
import styles from './OpenSource.module.css';

export function OpenSource() {
  return (
    <Section id="open-source" labelledBy="open-source-title">
      <SectionHeading
        title="Open source"
        titleId="open-source-title"
        meta="1 upstream pull request"
        lead="An Android camera dependency needed modern native builds for 16 KB pages. My upstream PR remains under review and has been referenced by a downstream project."
      />

      {openSource.map((item, index) => (
        <Reveal key={item.id} delay={index * 60}>
          <article className={styles.card}>
            <header className={styles.header}>
              <p className={styles.repo}>
                {item.repo}
                <span className={styles.pr}>{item.pullRequest}</span>
              </p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.status}>{item.status}</p>
            </header>

            <div className={styles.body}>
              <p className={styles.summary}>{item.summary}</p>

              <ul className={styles.details}>
                {item.details.map((detail) => (
                  <li key={detail} className={styles.detail}>
                    {detail}
                  </li>
                ))}
              </ul>

              <a
                className={styles.link}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                Read the pull request on GitHub
              </a>
            </div>

            <dl className={styles.stats}>
              {item.stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={styles.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      ))}
    </Section>
  );
}
