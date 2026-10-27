/* ------------------------------------------------------------------
   Domain types for every piece of portfolio content.
   Data files in src/data are typed against these, so a typo in content
   is a compile error rather than a rendering surprise.
   ------------------------------------------------------------------ */

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** Text shown when the URL itself is on display. */
  display: string;
}

export interface Profile {
  name: string;
  role: string;
  focus: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  headline: string[];
  intro: string;
  about: string[];
  resumeHref: string;
  conciseResumeHref: string;
  socials: SocialLink[];
}

export interface Metric {
  id: string;
  value: number;
  /** Rendered before the animated number, e.g. "+". */
  prefix?: string;
  /** Rendered after the animated number, e.g. "+" or " ms". */
  suffix?: string;
  label: string;
  note: string;
}

export type SkillLevel = 'core' | 'strong' | 'working';

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Optional one-line context for the tooltip / detail row. */
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  /** Job title as printed on employment documents, when it differs. */
  titleNote?: string;
  location: string;
  start: string;
  end: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  context: string;
  role: string;
  period: string;
  /** The user-facing problem, in plain language. */
  problem: string;
  /** What was actually built and why it was built that way. */
  approach: string[];
  outcome: string[];
  metrics: ProjectMetric[];
  stack: string[];
  links?: ProjectLink[];
  featured: boolean;
}

export interface OpenSourceItem {
  id: string;
  repo: string;
  title: string;
  pullRequest: string;
  href: string;
  summary: string;
  details: string[];
  stats: ProjectMetric[];
  status: string;
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  period: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** Short label used on the vertical rail. */
  short: string;
}
