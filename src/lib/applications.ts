import type { ApplicationDefinition } from '@/types/application';
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';
import ExperienceApp from '@/components/apps/ExperienceApp';
import AchievementsApp from '@/components/apps/AchievementsApp';
import CertificationsApp from '@/components/apps/CertificationsApp';
import ResumeApp from '@/components/apps/ResumeApp';

const DEFAULT_SIZE = { width: 600, height: 400 };

export const applications: Record<string, ApplicationDefinition> = {
  about_me: {
    id: 'about_me',
    title: 'About Me',
    icon: '/icons/notepad.png',
    component: AboutApp,
    defaultSize: DEFAULT_SIZE,
  },
  my_projects: {
    id: 'my_projects',
    title: 'My Projects',
    icon: '/icons/projects.png',
    component: ProjectsApp,
    defaultSize: { width: 640, height: 480 },
  },
  experience: {
    id: 'experience',
    title: 'Experience',
    icon: '/icons/documents.png',
    component: ExperienceApp,
    defaultSize: { width: 620, height: 480 },
  },
  my_skills: {
    id: 'my_skills',
    title: 'Skills',
    icon: '/icons/skills.png',
    component: SkillsApp,
    defaultSize: DEFAULT_SIZE,
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    icon: '/icons/Certificate.png',
    component: AchievementsApp,
    defaultSize: DEFAULT_SIZE,
  },
  certifications: {
    id: 'certifications',
    title: 'Certificates',
    icon: '/icons/Certificate.png',
    component: CertificationsApp,
    defaultSize: { width: 500, height: 400 },
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    icon: '/icons/documents.png',
    component: ResumeApp,
    defaultSize: { width: 420, height: 340 },
    showOnDesktop: false,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: '/icons/Phone.png',
    component: ContactApp,
    defaultSize: DEFAULT_SIZE,
  },
};

export const applicationList: ApplicationDefinition[] = Object.values(applications);
export const desktopApplicationList: ApplicationDefinition[] = applicationList.filter(
  (app) => app.showOnDesktop !== false
);
