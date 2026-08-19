export interface ProjectEntry {
  title: string;
  description: string;
  tech: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}
