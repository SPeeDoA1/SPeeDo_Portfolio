import React, { useState } from 'react';
import Image from 'next/image';
import { profile } from '@/data/profile';
import { applications } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';
import Dialog from './Dialog';

interface StartMenuProps {
  onItemSelected: () => void;
  onOpenRun: () => void;
  onShutDown: () => void;
}

interface ProgramLink {
  appId: string;
  label?: string;
}

const MAIN_LINKS: ProgramLink[] = [
  { appId: 'internet_explorer', label: 'Internet Explorer' },
  { appId: 'contact', label: 'Contact Ali' },
];

const PINNED_LINKS: ProgramLink[] = [
  { appId: 'my_projects' },
  { appId: 'command_prompt' },
  { appId: 'certifications' },
];

const ALL_PROGRAMS: { group: string; items: ProgramLink[] }[] = [
  { group: 'Portfolio Tools', items: [{ appId: 'command_prompt' }, { appId: 'resume', label: 'Resume Viewer' }, { appId: 'certifications' }] },
  { group: 'Developer Tools', items: [{ appId: 'my_projects', label: 'Projects' }, { appId: 'my_skills', label: 'Tech Stack' }] },
  { group: 'Accessories', items: [{ appId: 'about_me', label: 'About Me' }, { appId: 'experience' }, { appId: 'achievements' }] },
  {
    group: 'System',
    items: [
      { appId: 'control_panel' },
      { appId: 'system_properties', label: 'System Information' },
      { appId: 'security_center', label: 'Security Center' },
      { appId: 'network_connections', label: 'Network Connections' },
    ],
  },
];

function ProgramRow({ link, onOpen }: { link: ProgramLink; onOpen: (appId: string) => void }) {
  const app = applications[link.appId];
  if (!app) return null;
  return (
    <button
      className="w-full flex items-center gap-3 p-2 rounded hover:bg-[var(--xp-accent)]
               hover:text-white transition-colors"
      onClick={() => onOpen(app.id)}
    >
      <Image src={app.icon} alt={app.title} width={24} height={24} className="w-6 h-6 pixelated" draggable={false} />
      <span className="text-sm text-left">{link.label ?? app.title}</span>
    </button>
  );
}

export default function StartMenu({ onItemSelected, onOpenRun, onShutDown }: StartMenuProps) {
  const { openWindow, recentIds } = useWindowManager();
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [showLogOff, setShowLogOff] = useState(false);

  const open = (appId: string) => {
    const app = applications[appId];
    if (app) openWindow(app.id, app.defaultSize);
    onItemSelected();
  };

  return (
    <div
      className="absolute bottom-10 left-0 z-50 w-80 max-w-[calc(100vw-8px)] bg-white rounded-t-lg
                shadow-2xl start-menu origin-bottom"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      {/* User Profile Section */}
      <div
        className="h-20 p-4 rounded-t-lg flex items-center gap-4"
        style={{ background: 'var(--xp-titlebar-active)' }}
      >
        <Image src="/icons/user.png" alt="Start" width={60} height={60} className="pixelated rounded-full" draggable={false} />
        <span className="text-white font-bold">{profile.name} ({profile.handle})</span>
      </div>

      <div className="flex h-[400px]">
        {/* Left Column */}
        <div className="w-3/5 p-2 space-y-1 bg-white overflow-y-auto">
          {!showAllPrograms ? (
            <>
              {MAIN_LINKS.map((link) => (
                <ProgramRow key={link.appId} link={link} onOpen={open} />
              ))}
              <div className="border-t border-gray-200 my-1" />
              {PINNED_LINKS.map((link) => (
                <ProgramRow key={link.appId} link={link} onOpen={open} />
              ))}
              <div className="border-t border-gray-200 my-1" />
              <button
                className="w-full flex items-center justify-between p-2 rounded hover:bg-[var(--xp-accent)] hover:text-white transition-colors"
                onClick={() => setShowAllPrograms(true)}
              >
                <span className="text-sm text-left">All Programs</span>
                <span className="text-xs">▶</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full flex items-center gap-2 p-2 rounded hover:bg-[var(--xp-accent)] hover:text-white transition-colors text-xs font-bold"
                onClick={() => setShowAllPrograms(false)}
              >
                ◀ Back
              </button>
              {ALL_PROGRAMS.map((section) => (
                <div key={section.group}>
                  <div className="text-xs font-bold text-gray-500 px-2 pt-2 pb-1">{section.group}</div>
                  {section.items.map((link) => (
                    <ProgramRow key={link.appId} link={link} onOpen={open} />
                  ))}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/5 bg-[#EFF3F7] p-2 space-y-1 overflow-y-auto">
          {recentIds.length > 0 && (
            <>
              <div className="text-xs font-bold text-gray-500 px-2 pt-1 pb-1">My Recent Documents</div>
              {recentIds.map((id) => {
                const app = applications[id];
                if (!app) return null;
                return (
                  <button
                    key={id}
                    className="w-full text-left text-xs p-1.5 hover:bg-[var(--xp-accent)] hover:text-white rounded"
                    onClick={() => open(id)}
                  >
                    <div className="flex items-center gap-2">
                      <Image src={app.icon} alt="" width={18} height={18} className="pixelated" draggable={false} />
                      <span className="truncate">{app.title}</span>
                    </div>
                  </button>
                );
              })}
              <div className="border-t border-gray-300 my-1" />
            </>
          )}
          <button
            className="w-full text-left text-sm p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => open('my_documents')}
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/documents.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
              <span>My Documents</span>
            </div>
          </button>
          <button
            className="w-full text-left text-sm p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => open('my_computer')}
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/my_computer.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
              <span>My Computer</span>
            </div>
          </button>
          <div className="border-t border-gray-300 my-1" />
          <button
            className="w-full text-left text-sm p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => open('control_panel')}
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/skills.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
              <span>Control Panel</span>
            </div>
          </button>
          <button
            className="w-full text-left text-sm p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => open('help_support')}
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/documents.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
              <span>Help and Support</span>
            </div>
          </button>
          <button
            className="w-full text-left text-sm p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => open('search')}
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/my_computer.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
              <span>Search</span>
            </div>
          </button>
          <button
            className="w-full text-left text-sm p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => {
              onOpenRun();
              onItemSelected();
            }}
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/my_computer.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
              <span>Run...</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 bg-[#EFF3F7] p-2">
        <div className="flex justify-between">
          <button
            className="flex items-center gap-2 p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => setShowLogOff(true)}
          >
            <Image src="/icons/logoff.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
            <span className="text-sm">Log Off</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 hover:bg-[var(--xp-accent)] hover:text-white rounded"
            onClick={() => {
              onShutDown();
              onItemSelected();
            }}
          >
            <Image src="/icons/shutdown.png" alt="" width={24} height={24} className="pixelated" draggable={false} />
            <span className="text-sm">Turn Off Computer</span>
          </button>
        </div>
      </div>

      {showLogOff && (
        <Dialog
          title="Log Off Windows"
          variant="question"
          message={`This is a portfolio, not a shared machine — there's no one else to log off ${profile.name.split(' ')[0]} for.`}
          onClose={() => setShowLogOff(false)}
        />
      )}
    </div>
  );
}
