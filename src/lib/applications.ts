import type { ApplicationDefinition } from '@/types/application';
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';

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
    defaultSize: DEFAULT_SIZE,
  },
  my_skills: {
    id: 'my_skills',
    title: 'Skills',
    icon: '/icons/skills.png',
    component: SkillsApp,
    defaultSize: DEFAULT_SIZE,
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
