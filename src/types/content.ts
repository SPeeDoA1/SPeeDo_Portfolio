export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: 'featured' | 'earlier';
  links?: { label: string; href: string }[];
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
  emails: string[];
  phones: string[];
  location: string;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  status: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  department: string;
  status: string;
  expectedGraduation: string;
}

export interface LanguageEntry {
  name: string;
  proficiency: string;
}
