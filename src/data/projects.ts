import type { ProjectEntry } from '@/types/content';
import { profile } from './profile';

export const projects: ProjectEntry[] = [
  {
    id: 'ninuva-ecosystem',
    title: 'Ninuva Ecosystem',
    description: 'Production SaaS Ecosystem',
    longDescription:
      'Four interconnected products — Menu, Cast, Zone, and Loyalty — each independently deployed but integrated into a common platform for hospitality and retail operators.',
    tech: ['React Native', 'Next.js', 'Convex', 'Docker', 'Self-hosting'],
    category: 'featured',
    links: [
      { label: 'ninuva.io', href: profile.ninuva.main },
      { label: 'cast.ninuva.io', href: profile.ninuva.cast },
      { label: 'menu.ninuva.io', href: profile.ninuva.menu },
    ],
  },
  {
    id: 'nineveh-elite',
    title: 'Nineveh Elite Management Software',
    description: 'End-to-end management software created for operational and administrative control.',
    tech: [],
    category: 'featured',
  },
  {
    id: 'privilege-land-attendance',
    title: 'Privilege Land Attendance System',
    description: 'Automated attendance system integrated with the BioTime API and biometric hardware.',
    longDescription: 'Replaced a manual attendance workflow serving approximately 250 employees.',
    tech: ['BioTime API', 'Biometric Hardware', 'Backend Integration', 'Automation'],
    category: 'featured',
  },
  {
    id: 'healthcare-diagnostic-app',
    title: 'Healthcare Diagnostic App',
    description: 'CAPAi Bootcamp — medical-specialty matching application.',
    longDescription:
      'Led a team of six to prototype a medical-specialty matching application with an interactive body-map interface, letting users who cannot read indicate symptoms visually.',
    tech: [],
    category: 'featured',
  },
  {
    id: 'rubber-duckey-v5',
    title: 'Rubber Duckey V5',
    description: '16 Ready-to-Use HID Scripts Built with Arduino',
    tech: ['Arduino', 'C++', 'Python', 'Bash'],
    category: 'earlier',
  },
  {
    id: 'ntu-exam-system',
    title: 'NTU Exam System',
    description: 'Elevating Exam and Homework Management for NTU Students',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    category: 'earlier',
  },
  {
    id: 'breach-tracker',
    title: 'BreachTracker',
    description: 'Detect Breaches, Secure Credentials, Take Control',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    category: 'earlier',
  },
  {
    id: 'sunway-kindergarten',
    title: 'SunWay KinderGarten',
    description: 'Smart Childcare, Attendance, and Financial Management',
    tech: ['React', 'NextJS', 'MySQL'],
    category: 'earlier',
  },
];
