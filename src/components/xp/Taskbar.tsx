import React from 'react';
import Image from 'next/image';
import { applications } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';

interface TaskbarProps {
  showStartMenu: boolean;
  onToggleStartMenu: () => void;
  currentTime: string;
}

export default function Taskbar({ showStartMenu, onToggleStartMenu, currentTime }: TaskbarProps) {
  const { openWindows, activeWindow, minimizedWindows, restoreWindow } = useWindowManager();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 h-10 bg-gradient-to-r from-[#1E5799] to-[#2989D8]
                  border-t-[3px] border-[#2573BC] flex items-center px-1">
      {/* Start Button */}
      <button
        className={`start-button h-8 flex items-center gap-2 px-2 rounded-sm
          ${showStartMenu ? 'bg-[#2573BC]' : 'hover:bg-[#3C8ADB]'}
          transition-colors
        `}
        onClick={(e) => {
          e.stopPropagation();
          onToggleStartMenu();
        }}
      >
        <Image
          src="/icons/start.png"
          alt="Start"
          width={24}
          height={24}
          className="pixelated"
          draggable={false}
        />
        <span className="text-white font-bold">Start</span>
      </button>

      {/* Quick Launch */}
      <div className="border-l border-[#2573BC] mx-2 h-full" />

      {/* Open Windows */}
      <div className="flex-1 flex gap-1 overflow-x-auto">
        {openWindows.map((id) => {
          const app = applications[id];
          if (!app) return null;

          return (
            <button
              key={id}
              className={`
                flex-shrink-0 px-2 h-8 flex items-center gap-2 rounded-sm
                min-w-[120px] max-w-[200px]
                ${activeWindow === id ? 'bg-[#2573BC]' : 'hover:bg-[#3C8ADB]'}
                ${minimizedWindows.includes(id) ? 'opacity-70' : ''}
                transition-all duration-100
              `}
              onClick={() => restoreWindow(id)}
            >
              <Image
                src={app.icon}
                alt={app.title}
                width={16}
                height={16}
                className="w-4 h-4 pixelated"
                draggable={false}
              />
              <span className="text-white text-sm truncate">{app.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center h-full bg-gradient-to-r from-[#0F256E] to-[#0F256E] px-2">
        <Image
          src="/icons/Volume.png"
          alt="Start"
          width={24}
          height={24}
          className="pixelated"
          draggable={false}
        />
        <span className="text-white text-sm">{currentTime}</span>
      </div>
    </div>
  );
}
