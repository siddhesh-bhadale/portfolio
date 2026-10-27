import type { SkillGroup, SkillLevel } from '@/types';

/**
 * Three bands instead of a 1–10 score. A percentage next to a language name
 * is unfalsifiable; "shipped production work with it" is something an
 * interviewer can actually probe.
 */
export const skillLevels: Record<SkillLevel, { label: string; description: string }> = {
  core: {
    label: 'Core',
    description: 'Daily driver. Production systems I own and debug under load.',
  },
  strong: {
    label: 'Strong',
    description: 'Shipped production work with it and would take it on again.',
  },
  working: {
    label: 'Working',
    description: 'Used on at least one shipped project. Productive, still deepening.',
  },
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'systems',
    title: 'Systems & networking',
    summary:
      'The layer I reach for first, and the reason the on-premises deployments work at all.',
    skills: [
      { name: 'Rust', level: 'strong', note: 'P2P transport, native desktop, UniFFI cores' },
      { name: 'libp2p', level: 'strong', note: 'Transports, relays, peer lifecycle' },
      { name: 'NAT traversal', level: 'strong', note: 'DCUtR hole punching, circuit relay' },
      { name: 'QUIC / TCP', level: 'strong' },
      { name: 'Tokio', level: 'strong' },
      { name: 'Noise / Yamux', level: 'working' },
      { name: 'UniFFI', level: 'strong', note: '4 Android ABIs, 3 iOS targets' },
      { name: 'WebRTC / WHIP', level: 'core', note: 'Low-latency multi-camera streaming' },
      { name: 'ONVIF / PTZ', level: 'strong', note: 'Remote camera control' },
      { name: 'Go2RTC / ZLMediaKit', level: 'strong' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    summary: 'Service boundaries, auth, and the data model underneath them.',
    skills: [
      { name: 'Node.js', level: 'core' },
      { name: 'Express', level: 'core' },
      { name: 'NestJS', level: 'strong' },
      { name: 'Go', level: 'strong' },
      { name: 'REST API design', level: 'core' },
      { name: 'WebSockets', level: 'core' },
      { name: 'Kong API Gateway', level: 'strong' },
      { name: 'Microservices', level: 'strong' },
      { name: 'Modular monolith', level: 'strong' },
      { name: 'Auth & RBAC', level: 'core' },
      { name: 'Multi-tenancy', level: 'strong' },
    ],
  },
  {
    id: 'data-infra',
    title: 'Data & infrastructure',
    summary: 'Schema design through to a release that is one command long.',
    skills: [
      { name: 'MongoDB', level: 'core', note: 'Schema design, indexing, aggregation pipelines' },
      { name: 'Redis', level: 'working' },
      { name: 'MySQL', level: 'working' },
      { name: 'Docker', level: 'strong' },
      { name: 'Docker Swarm', level: 'strong' },
      { name: 'Kubernetes', level: 'working', note: 'Migrated a live platform onto it' },
      { name: 'Linux', level: 'strong', note: 'Ubuntu and Debian, on-prem and air-gapped' },
      { name: 'Nginx', level: 'strong', note: 'Reverse proxy and TLS' },
      { name: 'systemd', level: 'working' },
      { name: 'Make & shell automation', level: 'strong' },
    ],
  },
  {
    id: 'clients',
    title: 'Clients',
    summary: 'Where the system meets a person, on whichever device they have.',
    skills: [
      { name: 'TypeScript', level: 'core' },
      { name: 'JavaScript (ES2022+)', level: 'core' },
      { name: 'React', level: 'core' },
      { name: 'React Native', level: 'core', note: 'Android and iOS, production apps' },
      { name: 'Redux', level: 'strong' },
      { name: 'Tauri', level: 'strong' },
      { name: 'Electron', level: 'working' },
      { name: 'Kotlin', level: 'working', note: 'Production exposure: native Android integration and build tooling' },
      { name: 'Swift', level: 'working', note: 'Production exposure: UniFFI/native iOS targets' },
    ],
  },
  {
    id: 'practice',
    title: 'Practice',
    summary: 'How the work actually gets planned, reviewed and shipped.',
    skills: [
      { name: 'Technical leadership', level: 'strong', note: 'Four-engineer team on TeamStream' },
      { name: 'Code review', level: 'strong' },
      { name: 'System design', level: 'strong' },
      { name: 'Jira (epics, sprints)', level: 'strong' },
      { name: 'Git', level: 'core' },
      { name: 'Performance profiling', level: 'strong' },
      { name: 'Monitoring & logging', level: 'strong' },
      { name: 'Stakeholder communication', level: 'strong' },
    ],
  },
];
