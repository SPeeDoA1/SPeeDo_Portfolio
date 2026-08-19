import { profile } from './profile';
import type { ContactLink, ContactInfo } from '@/types/content';

export const contactLinks: ContactLink[] = [
  { label: 'GitHub Profile', href: profile.github, icon: '/icons/github.png' },
  { label: 'LinkedIn Profile', href: profile.linkedin, icon: '/icons/Linkedin.png' },
];

export const contactInfo: ContactInfo = {
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
};
