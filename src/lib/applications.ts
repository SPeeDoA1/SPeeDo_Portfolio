import type { ApplicationDefinition } from '@/types/application';
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ContactApp from '@/components/apps/ContactApp';
import ExperienceApp from '@/components/apps/ExperienceApp';
import AchievementsApp from '@/components/apps/AchievementsApp';
import CertificationsApp from '@/components/apps/CertificationsApp';
import ResumeApp from '@/components/apps/ResumeApp';
import MyComputerApp from '@/components/apps/MyComputerApp';
import MyDocumentsApp from '@/components/apps/MyDocumentsApp';
import SystemPropertiesApp from '@/components/apps/SystemPropertiesApp';
import ControlPanelApp from '@/components/apps/ControlPanelApp';
import AddOrRemoveProgramsApp from '@/components/apps/AddOrRemoveProgramsApp';
import DisplayPropertiesApp from '@/components/apps/DisplayPropertiesApp';
import RecycleBinApp from '@/components/apps/RecycleBinApp';
import CommandPromptApp from '@/components/apps/CommandPromptApp';
import InternetExplorerApp from '@/components/apps/InternetExplorerApp';
import HelpSupportApp from '@/components/apps/HelpSupportApp';
import SearchApp from '@/components/apps/SearchApp';
import SecurityCenterApp from '@/components/apps/SecurityCenterApp';
import NetworkConnectionsApp from '@/components/apps/NetworkConnectionsApp';

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
    showOnDesktop: false,
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
    showOnDesktop: false,
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
  my_computer: {
    id: 'my_computer',
    title: 'My Computer',
    icon: '/icons/my_computer.png',
    component: MyComputerApp,
    defaultSize: { width: 680, height: 480 },
  },
  my_documents: {
    id: 'my_documents',
    title: 'My Documents',
    icon: '/icons/documents.png',
    component: MyDocumentsApp,
    defaultSize: { width: 560, height: 400 },
    showOnDesktop: false,
  },
  command_prompt: {
    id: 'command_prompt',
    title: 'Command Prompt',
    icon: '/icons/Command Prompt.png',
    component: CommandPromptApp,
    defaultSize: { width: 560, height: 380 },
  },
  internet_explorer: {
    id: 'internet_explorer',
    title: 'Internet Explorer',
    icon: '/icons/github.png',
    component: InternetExplorerApp,
    defaultSize: { width: 640, height: 460 },
  },
  recycle_bin: {
    id: 'recycle_bin',
    title: 'Recycle Bin',
    icon: '/icons/recycle_bin.png',
    component: RecycleBinApp,
    defaultSize: { width: 460, height: 320 },
  },
  system_properties: {
    id: 'system_properties',
    title: 'System Properties',
    icon: '/icons/my_computer.png',
    component: SystemPropertiesApp,
    defaultSize: { width: 460, height: 420 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
  control_panel: {
    id: 'control_panel',
    title: 'Control Panel',
    icon: '/icons/skills.png',
    component: ControlPanelApp,
    defaultSize: { width: 460, height: 300 },
    showOnDesktop: false,
  },
  display_properties: {
    id: 'display_properties',
    title: 'Display Properties',
    icon: '/icons/skills.png',
    component: DisplayPropertiesApp,
    defaultSize: { width: 420, height: 360 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
  add_remove_programs: {
    id: 'add_remove_programs',
    title: 'Add or Remove Programs',
    icon: '/icons/documents.png',
    component: AddOrRemoveProgramsApp,
    defaultSize: { width: 480, height: 360 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
  help_support: {
    id: 'help_support',
    title: 'Help and Support',
    icon: '/icons/documents.png',
    component: HelpSupportApp,
    defaultSize: { width: 480, height: 420 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
  search: {
    id: 'search',
    title: 'Search Companion',
    icon: '/icons/my_computer.png',
    component: SearchApp,
    defaultSize: { width: 380, height: 420 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
  security_center: {
    id: 'security_center',
    title: 'Security Center',
    icon: '/icons/skills.png',
    component: SecurityCenterApp,
    defaultSize: { width: 420, height: 400 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
  network_connections: {
    id: 'network_connections',
    title: 'Network Connections',
    icon: '/icons/my_network.png',
    component: NetworkConnectionsApp,
    defaultSize: { width: 420, height: 320 },
    showOnDesktop: false,
    showInStartMenu: false,
  },
};

export const applicationList: ApplicationDefinition[] = Object.values(applications);
export const desktopApplicationList: ApplicationDefinition[] = applicationList.filter(
  (app) => app.showOnDesktop !== false
);
