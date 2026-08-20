import type { ExperienceEntry } from '@/types/content';

export const experience: ExperienceEntry[] = [
  {
    id: 'ninuva',
    organization: 'Ninuva',
    role: 'Founder & Lead Developer',
    period: '2026 – Present',
    summary:
      'Built and launched a self-hosted SaaS ecosystem covering digital menus, digital signage, customer rewards, and venue management.',
    highlights: [
      'Designed the architecture and shipped the full stack as sole developer through initial release',
      'React Native clients, Next.js web applications, and Convex services',
      'Integrated Samsung digital signage hardware',
      'Integrated Sunmi smart POS terminals',
      'Handled server migrations and automated volume backups',
      'Implemented load balancing and optimized storage',
      'Maintained self-hosted production infrastructure, sustaining approximately 98% uptime',
    ],
  },
  {
    id: 'athar',
    organization: 'Athar Company',
    role: 'Co-Founder & CEO',
    period: '2025 – 2026',
    summary:
      'Technology company delivering custom software solutions, including industrial electrical control panels.',
    highlights: [
      'Set technical direction across the company',
      'Owned client delivery, project scoping, deployment, and handover',
      'Worked across four projects',
    ],
  },
  {
    id: 'oyaps',
    organization: 'OYAPS Team',
    role: 'Founding Technical Member',
    period: '2023 – 2025',
    summary: 'Founding member covering technical development and defensive security operations.',
    highlights: ['SULY CyberCon 2025 finalist'],
  },
];
