import React from 'react';
import Image from 'next/image';
import DesktopIcon from './DesktopIcon';
import { desktopApplicationList } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';

export default function Desktop() {
  const { openWindow } = useWindowManager();

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
          {desktopApplicationList.map((app) => (
            <DesktopIcon
              key={app.id}
              title={app.title}
              iconSrc={app.icon}
              onOpen={() => openWindow(app.id, app.defaultSize)}
              onOpenMaximized={() => openWindow(app.id, app.defaultSize, { maximized: true })}
            />
          ))}
        </div>
      </div>
    </>
  );
}
