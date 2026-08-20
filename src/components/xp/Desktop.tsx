import React from 'react';
import Image from 'next/image';
import DesktopIcon from './DesktopIcon';
import { applicationList } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';

export default function Desktop() {
  const { openWindow, setWindowMaximized } = useWindowManager();

  return (
    <>
      <Image
        src="/bg.jpg"
        alt="Windows XP Background"
        fill
        className="object-cover"
        priority
        quality={100}
        draggable={false}
        unoptimized
      />
      <div className="absolute inset-0 z-10">
        <div className="grid grid-cols-1 auto-rows-min gap-6 p-6">
          {applicationList.map((app) => (
            <DesktopIcon
              key={app.id}
              title={app.title}
              iconSrc={app.icon}
              onOpen={() => openWindow(app.id)}
              onOpenMaximized={() => {
                openWindow(app.id);
                setWindowMaximized(app.id, true);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
