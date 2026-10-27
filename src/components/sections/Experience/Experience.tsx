import { experience } from '@/data/experience';
import { Section } from '@/components/layout';
import { Reveal, SectionHeading, TagList } from '@/components/ui';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        title="Experience"
        titleId="experience-title"
        meta="Dec 2023 — Jun 2026"
        lead="Two years of production work, plus the freelance year that taught me to own a system end to end."
      />

      <ol className={styles.timeline}>
        {experience.map((item, index) => (
          <li key={item.id} className={styles.entry}>
            <Reveal delay={index * 70} className={styles.entryInner}>
              <div className={styles.meta}>
                <p className={styles.period}>{item.period}</p>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.location}>{item.location}</p>
              </div>

              <div className={styles.content}>
                <h3 className={styles.role}>{item.role}</h3>
                {item.titleNote ? (
                  <p className={styles.titleNote}>{item.titleNote}</p>
                ) : null}

                <p className={styles.summary}>{item.summary}</p>

                <ul className={styles.highlights}>
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className={styles.highlight}>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <TagList
                  items={item.stack}
                  size="sm"
                  label={`Technologies used at ${item.company}`}
                />
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
