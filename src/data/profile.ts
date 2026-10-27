import type { Metric, Profile } from '@/types';

/** Filenames shown to recruiters when they download either resume from the site. */
export const resumeFileNames = {
  detailed: 'Siddhesh_Bhadale_Backend_Platform_Engineer_Resume_2Page.pdf',
  concise: 'Siddhesh_Bhadale_Backend_Platform_Engineer_Resume_1Page.pdf',
} as const;

export const profile: Profile = {
  name: 'Siddhesh Bhadale',
  role: 'Backend & Platform Engineer',
  focus: 'Distributed systems, networking and real-time infrastructure',
  location: 'Thane, Mumbai, India',
  email: 'siddheshbhadale@gmail.com',
  phone: '+91 77389 63715',
  availability: 'Available immediately',

  // Rendered as separate lines so the headline can be typeset as a unit.
  headline: ['I build backend systems', 'for places the', 'internet cannot reach.'],

  intro:
    'Backend and platform engineer with two years shipping production systems for port, customs and enterprise customers. Technical lead for a multi-service inspection platform and sole engineer for a Rust/libp2p connectivity layer that connects mobile and desktop clients to on-premises systems without exposed ports, public IPs or VPNs.',

  about: [
    'At EaseMyAI, I served as technical lead for TeamStream, a remote-inspection platform for port and customs operations. With a four-engineer team, I designed Node.js and Go backend services behind Kong and Nginx, the MongoDB data model, and deployments that moved from Docker Swarm to Kubernetes. The platform now runs at multiple port sites.',
    'I also designed and implemented a Rust/libp2p transport for restricted on-premises networks, with DCUtR hole punching, circuit-relay fallback, a local HTTP proxy, and a Node.js bootstrap service. I shipped the shared Rust core to four Android ABIs and three iOS targets through UniFFI and tested 40+ peer sessions under a controlled workload. Earlier, I delivered web and mobile products for 20+ freelance clients.',
    'I am looking for backend or platform engineering roles focused on distributed systems, networking, reliability and performance. Based in Thane, Mumbai, and available to start immediately.',
  ],

  resumeHref: `${import.meta.env.BASE_URL}${resumeFileNames.detailed}`,
  conciseResumeHref: `${import.meta.env.BASE_URL}${resumeFileNames.concise}`,

  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/siddhesh-bhadale',
      display: 'github.com/siddhesh-bhadale',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/siddhesh-bhadale-a3ab3b21a',
      display: 'linkedin.com/in/siddhesh-bhadale-a3ab3b21a',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:siddheshbhadale@gmail.com',
      display: 'siddheshbhadale@gmail.com',
    },
  ],
};

/** Four numbers that stand up to a follow-up question in an interview. */
export const metrics: Metric[] = [
  {
    id: 'concurrency',
    value: 200,
    label: 'UAT participants (approx.)',
    note: 'across 5 live inspection sessions with multiple camera feeds each, on one Mac mini M4 (24 GB)',
  },
  {
    id: 'peers',
    value: 40,
    suffix: '+',
    label: 'peer sessions tested',
    note: 'against a single on-premises server under a controlled P2P test workload',
  },
  {
    id: 'lines',
    value: 19.6,
    suffix: 'k',
    label: 'lines, written solo',
    note: 'Rust, TypeScript, Kotlin and Swift in the connectivity layer',
  },
  {
    id: 'clients',
    value: 20,
    suffix: '+',
    label: 'freelance clients',
    note: 'web and mobile products delivered end to end as sole engineer',
  },
];
