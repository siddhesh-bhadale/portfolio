import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    id: 'easemyai',
    company: 'EaseMyAI',
    role: 'Junior Mobile Application Developer',
    titleNote:
      'Title on record. Actual scope was full-stack and platform: technical lead for TeamStream.',
    location: 'Thane, India',
    start: 'Dec 2024',
    end: 'Jun 2026',
    period: 'Dec 2024 — Jun 2026',
    summary:
      'Technical lead for TeamStream, a remote-inspection platform deployed at multiple port sites. Also developed its Rust/libp2p connectivity layer for restricted on-premises networks.',
    highlights: [
      'Technical lead for TeamStream. Ran requirement discovery, system architecture, tech-stack selection and several R&D cycles, then built and shipped the backend, the React web app and the React Native mobile apps with a four-engineer team.',
      'Designed the backend as independently deployable Node.js and Go services behind Kong and Nginx — authentication, RBAC, session scheduling, email and push notifications, recording and media-session orchestration — together with the MongoDB schema, indexes and aggregation pipelines for session and event data.',
      'Owned deployment end to end: containerised every service, ran the platform on Docker Swarm, then migrated it to Kubernetes. Make and shell automation turned a multi-step manual release into a single command.',
      'Supported UAT involving approximately 200 participants across 5 live-inspection sessions, each with multiple camera feeds, on a single Mac mini M4 (24 GB). The platform was showcased at the India AI Impact Summit 2026.',
      'Built the Rust/libp2p connectivity layer that let client apps reach on-premises servers without exposed ports or public IPs, unblocking rollout at sites where opening the network was not permitted.',
      'Reviewed pull requests, planned epics, stories and sprints in Jira, unblocked teammates and coordinated with stakeholders. Also delivered enterprise work across aviation, ports and logistics, including two React Native apps, an Electron desktop app and several web applications.',
    ],
    stack: [
      'Node.js',
      'Go',
      'Rust',
      'MongoDB',
      'Kong',
      'Nginx',
      'Docker Swarm',
      'Kubernetes',
      'React',
      'React Native',
    ],
  },
  {
    id: 'applied-cloud-computing',
    company: 'Applied Cloud Computing',
    role: 'Mobile Application Developer — Intern',
    location: 'Mumbai, India',
    start: 'Aug 2024',
    end: 'Dec 2024',
    period: 'Aug 2024 — Dec 2024',
    summary:
      'Built production features in investor and distributor mutual-fund applications for a top-10 Indian AMC.',
    highlights: [
      'Built production features for investor and distributor mutual-fund applications in React Native, integrating 34+ REST APIs for folio creation, SIP purchase and modification, and portfolio reporting.',
      'Integrated the Razorpay payment gateway across UPI, autopay, net banking and bank transfer, including the failure and reconciliation paths.',
    ],
    stack: ['React Native', 'TypeScript', 'Redux', 'REST', 'Razorpay'],
  },
  {
    id: 'freelance',
    company: 'Independent',
    role: 'Full Stack Developer — Freelance',
    location: 'Remote',
    start: 'Dec 2023',
    end: 'Jul 2024',
    period: 'Dec 2023 — Jul 2024',
    summary:
      'Twenty-plus web and mobile products as the only engineer, from first conversation to handover.',
    highlights: [
      'Delivered web and mobile products for 20+ clients as sole engineer, covering design, backend, deployment and handover.',
      'The largest deployment serves roughly 1,000 daily active users.',
    ],
    stack: ['React', 'React Native', 'Node.js', 'Express', 'MongoDB', 'Linux'],
  },
];
