import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { certifications } from '@/data/certifications';
import { achievements } from '@/data/achievements';
import { contactInfo } from '@/data/contact';
import { education } from '@/data/education';
import { useWindowManager } from '@/context/WindowManagerContext';
import { applications } from '@/lib/applications';
import type { AppComponentProps } from '@/types/application';

const FILESYSTEM: Record<string, string[]> = {
  'C:\\Portfolio': [
    'EXPERIENCE',
    'PROJECTS',
    'CERTIFICATES',
    'ACHIEVEMENTS',
    'ABOUT.TXT',
    'SKILLS.TXT',
    'CONTACT.VCF',
    'RESUME.PDF',
  ],
};

const DIR_APP_MAP: Record<string, string> = {
  EXPERIENCE: 'experience',
  PROJECTS: 'my_projects',
  CERTIFICATES: 'certifications',
  ACHIEVEMENTS: 'achievements',
  'ABOUT.TXT': 'about_me',
  'SKILLS.TXT': 'my_skills',
  'CONTACT.VCF': 'contact',
  'RESUME.PDF': 'resume',
};

export default function CommandPromptApp({ appId }: AppComponentProps) {
  const { closeWindow, openWindow } = useWindowManager();
  const [lines, setLines] = useState<string[]>(['Microsoft Windows XP [Version SPeeDo.2026]', '(C) SPeeDo Portfolio', '']);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('C:\\Portfolio');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const prompt = () => `${cwd}>`;

  const print = (text: string | string[]) => {
    const arr = Array.isArray(text) ? text : [text];
    setLines((prev) => [...prev, ...arr]);
  };

  const openApp = (id: string) => {
    const app = applications[id];
    if (app) openWindow(app.id, app.defaultSize);
  };

  const run = (raw: string) => {
    const trimmed = raw.trim();
    print(`${prompt()} ${raw}`);
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        print([
          'Available commands:',
          '  help          show this list',
          '  about         short bio',
          '  whoami        who you are talking to',
          '  experience    professional experience',
          '  projects      project list',
          '  skills        technical skills',
          '  certs         certifications',
          '  achievements  awards and competitions',
          '  contact       contact information',
          '  education     education background',
          '  ninuva        open the Ninuva project',
          '  github        open GitHub profile',
          '  linkedin      open LinkedIn profile',
          '  resume        open the resume',
          '  open <app>    open a graphical window (e.g. open projects)',
          '  dir / tree    list the portfolio filesystem',
          '  cd <dir>      change directory',
          '  cls / clear   clear the screen',
          '  date / time   current date / time',
          '  ver           version information',
          '  exit          close this window',
        ]);
        break;
      case 'about':
        print([profile.name, `${profile.title} / ${profile.secondaryTitle}`, profile.location]);
        break;
      case 'whoami':
        print(['ALI-SAAD\\speedo', '', profile.title, profile.secondaryTitle, 'Founder & Lead Developer — Ninuva']);
        break;
      case 'experience':
        experience.forEach((e) => print(`${e.organization} — ${e.role} (${e.period})`));
        break;
      case 'projects':
        projects.forEach((p) => print(`${p.title} — ${p.description}`));
        break;
      case 'skills':
        skillCategories.forEach((s) => print(`${s.category}: ${s.skills.join(', ')}`));
        break;
      case 'certs':
        certifications.forEach((c) => print(`${c.name} — ${c.issuer}`));
        break;
      case 'achievements':
        achievements.forEach((a) => print(`${a.title} — ${a.description}`));
        break;
      case 'contact':
        print([...contactInfo.emails, ...contactInfo.phones, contactInfo.location]);
        break;
      case 'education':
        print([
          education.institution,
          education.degree,
          education.department,
          `${education.status} · Expected ${education.expectedGraduation}`,
        ]);
        break;
      case 'ninuva':
        openApp('my_projects');
        print('Opening Ninuva Ecosystem...');
        break;
      case 'github':
        window.open(profile.github, '_blank', 'noopener,noreferrer');
        print(`Opening ${profile.github}`);
        break;
      case 'linkedin':
        window.open(profile.linkedin, '_blank', 'noopener,noreferrer');
        print(`Opening ${profile.linkedin}`);
        break;
      case 'resume':
        openApp('resume');
        print('Opening Resume...');
        break;
      case 'open': {
        const target = DIR_APP_MAP[arg.toUpperCase()] ?? arg.toLowerCase().replace(/\s+/g, '_');
        if (applications[target]) {
          openApp(target);
          print(`Opening ${applications[target].title}...`);
        } else {
          print(`Cannot open '${arg}'.`);
        }
        break;
      }
      case 'dir': {
        const items = FILESYSTEM[cwd] || [];
        print(['', ` Directory of ${cwd}`, '']);
        items.forEach((item) => {
          const isDir = Boolean(DIR_APP_MAP[item]) && !item.includes('.');
          print(isDir ? `<DIR>          ${item}` : `               ${item}`);
        });
        print('');
        break;
      }
      case 'tree': {
        print(cwd);
        const items = FILESYSTEM[cwd] || [];
        items.forEach((item, i) => {
          const branch = i === items.length - 1 ? '└───' : '├───';
          print(`${branch}${item}`);
        });
        break;
      }
      case 'cd':
        if (!arg || arg === '\\' || arg.toLowerCase() === 'c:\\') {
          setCwd('C:\\Portfolio');
        } else {
          print('The system cannot find the path specified.');
        }
        break;
      case 'cls':
      case 'clear':
        setLines([]);
        break;
      case 'date':
        print(new Date().toLocaleDateString());
        break;
      case 'time':
        print(new Date().toLocaleTimeString());
        break;
      case 'ver':
        print('SPeeDo XP [Version Portfolio.2026]');
        break;
      case 'exit':
        closeWindow(appId);
        break;
      case 'sudo':
        print([
          "'sudo' is not recognized as an internal or external command,",
          'operable program or batch file.',
          'This is Windows XP :)',
        ]);
        break;
      case 'hack':
        print(['Access denied.', '', 'Try:', 'skills security']);
        break;
      case 'matrix':
        print(['No.', 'This is Windows XP.']);
        break;
      default:
        print(`'${cmd}' is not recognized as an internal or external command,`);
        print('operable program or batch file.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    }
  };

  return (
    <div
      className="h-full bg-black text-[#C0C0C0] font-mono text-xs p-2 overflow-auto"
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex">
        <span>{prompt()}&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent outline-none text-[#C0C0C0] font-mono text-xs"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
