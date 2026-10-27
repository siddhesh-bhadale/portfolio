import { useState } from 'react';
import { projects } from '@/data/projects';
import { Section } from '@/components/layout';
import { Reveal, SectionHeading } from '@/components/ui';
import { ProjectEntry } from './ProjectEntry';
import styles from './Work.module.css';

/**
 * Projects come before employment history: for two years of experience the
 * work itself carries more signal than the job titles around it.
 */
export function Work() {
  // Collapsed by default: four titles and taglines on one screen is a better
  // overview than one long case study pushing the rest below the fold.
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading
        title="Selected work"
        titleId="work-title"
        meta={`${projects.length} projects`}
        lead="Four systems, each opened up: the constraint that forced the design, what I actually built, and what it did once it was running. Expand any of them."
      />

      <div className={styles.projects}>
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 60}>
            <ProjectEntry
              project={project}
              isOpen={openId === project.id}
              onToggle={() =>
                setOpenId((current) => (current === project.id ? null : project.id))
              }
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
