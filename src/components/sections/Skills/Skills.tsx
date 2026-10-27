import { useMemo, useState } from 'react';
import { skillGroups, skillLevels } from '@/data/skills';
import type { SkillLevel } from '@/types';
import { Section } from '@/components/layout';
import { Reveal, SectionHeading } from '@/components/ui';
import { cn } from '@/utils/cn';
import styles from './Skills.module.css';

const LEVEL_ORDER: SkillLevel[] = ['core', 'strong', 'working'];

/**
 * Three honest bands instead of a percentage bar. Selecting a band dims
 * everything else, which turns the list into something you can actually
 * interrogate: "show me only what he owns in production".
 */
export function Skills() {
  const [activeLevel, setActiveLevel] = useState<SkillLevel | null>(null);

  const counts = useMemo(() => {
    const tally: Record<SkillLevel, number> = { core: 0, strong: 0, working: 0 };
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        tally[skill.level] += 1;
      }
    }
    return tally;
  }, []);

  const total = counts.core + counts.strong + counts.working;

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        title="Skills"
        titleId="skills-title"
        meta={`${total} across ${skillGroups.length} areas`}
        lead="Grouped by the job each one does, and banded by how far I have actually taken it. Filter by band to see only what I would be comfortable being interviewed on."
      />

      <Reveal>
        <div className={styles.legend} role="group" aria-label="Filter skills by band">
          {LEVEL_ORDER.map((level) => {
            const isActive = activeLevel === level;

            return (
              <button
                key={level}
                type="button"
                className={cn(styles.legendButton, isActive && styles.legendActive)}
                onClick={() => setActiveLevel(isActive ? null : level)}
                aria-pressed={isActive}
              >
                <span className={cn(styles.swatch, styles[`swatch-${level}`])} aria-hidden="true" />
                <span className={styles.legendText}>
                  <span className={styles.legendLabel}>
                    {skillLevels[level].label}
                    <span className={styles.legendCount}>{counts[level]}</span>
                  </span>
                  <span className={styles.legendDescription}>
                    {skillLevels[level].description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className={styles.groups}>
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 60} className={styles.group}>
            <div className={styles.groupHeader}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <p className={styles.groupSummary}>{group.summary}</p>
            </div>

            <ul className={styles.skills}>
              {group.skills.map((skill) => {
                const dimmed = activeLevel !== null && skill.level !== activeLevel;

                return (
                  <li key={skill.name}>
                    <span
                      className={cn(
                        styles.skill,
                        styles[`level-${skill.level}`],
                        dimmed && styles.dimmed
                      )}
                    >
                      <span className={styles.skillName}>{skill.name}</span>
                      {skill.note ? (
                        <span className={styles.skillNote}>{skill.note}</span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className={styles.caveat}>
          These bands describe my practical experience, not certifications or
          a claim of equal depth across every tool. Kotlin and Swift reflect
          production integration experience; my primary languages are TypeScript,
          JavaScript, Go and Rust.
        </p>
      </Reveal>
    </Section>
  );
}
