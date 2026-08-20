import { useState } from 'react';
import Image from 'next/image';
import { useWindowManager } from '@/context/WindowManagerContext';
import { applications } from '@/lib/applications';
import Dialog from './Dialog';

const COMMAND_MAP: Record<string, string> = {
  cmd: 'command_prompt',
  notepad: 'about_me',
  control: 'control_panel',
  resume: 'resume',
  certificates: 'certifications',
  certs: 'certifications',
  projects: 'my_projects',
  contact: 'contact',
  skills: 'my_skills',
  explorer: 'my_computer',
};

export default function RunDialog({ onClose }: { onClose: () => void }) {
  const { openWindow } = useWindowManager();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    const key = value.trim().toLowerCase();
    if (!key) return;
    const appId = COMMAND_MAP[key];
    const app = appId ? applications[appId] : undefined;
    if (app) {
      openWindow(app.id, app.defaultSize);
      onClose();
    } else {
      setError(value);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[150] flex items-center justify-center bg-black/10"
        onMouseDown={onClose}
      >
        <div
          className="window-border bg-[#ECE9D8] w-96 animate-window-open"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div
            className="h-7 px-2 flex items-center text-white text-sm font-bold rounded-t-lg"
            style={{ background: 'var(--xp-titlebar-active)' }}
          >
            Run
          </div>
          <div className="p-4 flex items-center gap-3">
            <Image src="/icons/my_computer.png" alt="" width={32} height={32} className="pixelated" draggable={false} />
            <p className="text-xs flex-1">Type the name of a program, and Windows will open it for you.</p>
          </div>
          <div className="px-4 flex items-center gap-2">
            <span className="text-xs">Open:</span>
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRun()}
              className="flex-1 border border-gray-400 px-2 py-1 text-xs"
            />
          </div>
          <div className="flex justify-end gap-2 p-4">
            <button onClick={handleRun} className="xp-button px-4 py-1 text-xs rounded-sm">
              OK
            </button>
            <button onClick={onClose} className="xp-button px-4 py-1 text-xs rounded-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
      {error !== null && (
        <Dialog
          title="Run"
          variant="error"
          message={`Windows cannot find '${error}'. Make sure you typed the name correctly, and then try again.`}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}
