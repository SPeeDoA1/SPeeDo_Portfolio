import { profile } from './profile';

export const aboutContent = {
  heading: profile.name,
  subheading: `${profile.title} · ${profile.secondaryTitle}`,
  bioParagraphs: [
    'Final-year cybersecurity student and full-stack engineer focused on building real production systems from product design through frontend, backend, infrastructure, deployment, and security.',
    'Experienced with React Native, Next.js, Django, Convex, Docker and self-hosted infrastructure.',
    'Security background includes penetration testing, red teaming, blue teaming, Active Directory exploitation, network security and digital forensics.',
  ],
  quote: profile.quote,
};
