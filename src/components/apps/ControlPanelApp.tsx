import { useState } from 'react';
import Image from 'next/image';
import Dialog from '@/components/xp/Dialog';
import { useWindowManager } from '@/context/WindowManagerContext';
import { applications } from '@/lib/applications';

interface ControlPanelItem {
  id: string;
  title: string;
  icon: string;
  opensApp?: string;
  dialogMessage?: () => string;
}

const ITEMS: ControlPanelItem[] = [
  { id: 'appearance', title: 'Appearance and Themes', icon: '/icons/skills.png', opensApp: 'display_properties' },
  { id: 'system', title: 'System', icon: '/icons/my_computer.png', opensApp: 'system_properties' },
  {
    id: 'accounts',
    title: 'User Accounts',
    icon: '/icons/user.png',
    dialogMessage: () => 'Ali Saad Ezzaldeen is the only account on this system.',
  },
  {
    id: 'datetime',
    title: 'Date and Time',
    icon: '/icons/recent.png',
    dialogMessage: () => new Date().toLocaleString([], { dateStyle: 'full', timeStyle: 'short' }),
  },
  {
    id: 'sounds',
    title: 'Sounds and Audio Devices',
    icon: '/icons/Volume.png',
    dialogMessage: () => 'No sound scheme configured.',
  },
  { id: 'programs', title: 'Add or Remove Programs', icon: '/icons/documents.png', opensApp: 'add_remove_programs' },
];

export default function ControlPanelApp() {
  const { openWindow } = useWindowManager();
  const [dialog, setDialog] = useState<{ title: string; message: string } | null>(null);

  const handleClick = (item: ControlPanelItem) => {
    if (item.opensApp) {
      const app = applications[item.opensApp];
      if (app) openWindow(app.id, app.defaultSize);
      return;
    }
    if (item.dialogMessage) {
      setDialog({ title: item.title, message: item.dialogMessage() });
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className="flex flex-col items-center gap-2 p-3 rounded hover:bg-blue-50 text-center"
          >
            <Image src={item.icon} alt="" width={32} height={32} className="pixelated" draggable={false} />
            <span className="text-xs">{item.title}</span>
          </button>
        ))}
      </div>
      {dialog && (
        <Dialog title={dialog.title} message={dialog.message} variant="info" onClose={() => setDialog(null)} />
      )}
    </div>
  );
}
