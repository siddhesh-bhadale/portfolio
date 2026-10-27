import { profile } from '@/data/profile';
import { Section } from '@/components/layout';
import { Reveal, SectionHeading } from '@/components/ui';
import styles from './About.module.css';

const quickFacts = [
  { label: 'Based in', value: 'Thane, Mumbai, India' },
  { label: 'Notice', value: 'None — available now' },
  { label: 'Looking for', value: 'Backend or platform engineering' },
  { label: 'Open to', value: 'Hybrid, remote, relocation' },
  { label: 'Degree', value: 'B.E. Computer Engineering, SPPU' },
];

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading
        title="About"
        titleId="about-title"
        meta="Two minutes"
      />

      <div className={styles.layout}>
        <div className={styles.prose}>
          {profile.about.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 32)} delay={index * 70}>
              <p className={styles.paragraph}>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <dl className={styles.facts}>
            {quickFacts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
