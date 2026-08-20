import type { SkillCategory } from '@/types/content';

export const skillCategories: SkillCategory[] = [
  { category: 'Programming', skills: ['Python', 'C++', 'SQL', 'JavaScript', 'TypeScript', 'VHDL'] },
  { category: 'Frameworks & Platforms', skills: ['React Native', 'Next.js', 'Django', 'Convex'] },
  {
    category: 'Infrastructure',
    skills: ['Docker', 'Self-hosted Deployments', 'Load Balancing', 'Backup Automation', 'Apache Spark', 'MapReduce', 'BioTime API'],
  },
  {
    category: 'Cybersecurity',
    skills: ['Penetration Testing', 'Red Teaming', 'Blue Teaming', 'Active Directory Exploitation', 'Network Security', 'Digital Forensics', 'Nmap', 'Burp Suite'],
  },
  { category: 'Design', skills: ['Figma', 'Miro', 'Adobe Photoshop', 'Adobe Illustrator', 'Premiere Pro', 'After Effects'] },
];
