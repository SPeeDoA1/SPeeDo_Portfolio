import Image from 'next/image';
import { useWindowManager } from '@/context/WindowManagerContext';
import { applications } from '@/lib/applications';

const ITEMS = [
  { id: 'resume', label: 'Resume.pdf', icon: '/icons/documents.png' },
  { id: 'about_me', label: 'About Me.txt', icon: '/icons/notepad.png' },
  { id: 'experience', label: 'Experience', icon: '/icons/documents.png' },
  { id: 'my_projects', label: 'Projects', icon: '/icons/projects.png' },
  { id: 'certifications', label: 'Certificates', icon: '/icons/Certificate.png' },
  { id: 'achievements', label: 'Achievements', icon: '/icons/Certificate.png' },
];

export default function MyDocumentsApp() {
  const { openWindow } = useWindowManager();

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      {ITEMS.map((item) => {
        const app = applications[item.id];
        return (
          <button
            key={item.id}
            onClick={() => app && openWindow(app.id, app.defaultSize)}
            className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-50"
          >
            <Image src={item.icon} alt="" width={40} height={40} className="pixelated" draggable={false} />
            <span className="text-xs text-center">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
