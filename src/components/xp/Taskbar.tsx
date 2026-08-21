import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { applications } from '@/lib/applications';
import { useWindowManager } from '@/context/WindowManagerContext';
import { isSoundMuted, playClick, setSoundMuted } from '@/lib/sound';

interface TaskbarProps {
  showStartMenu: boolean;
  onToggleStartMenu: () => void;
  currentTime: string;
  currentDate: string;
}

export default function Taskbar({ showStartMenu, onToggleStartMenu, currentTime, currentDate }: TaskbarProps) {
  const { openWindows, activeWindow, minimizedWindows, restoreWindow, openWindow } = useWindowManager();
  // Starts false on both server and first client render (hydration-safe),
  // then synced to the real persisted value after mount.
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isSoundMuted());
  }, []);

  const toggleMute = () => {
    const next = !isSoundMuted();
    setSoundMuted(next);
    setMuted(next);
    if (!next) playClick();
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 h-10 border-t-[3px] flex items-center px-1"
      style={{ background: 'var(--xp-taskbar-gradient)', borderTopColor: 'var(--xp-taskbar-border)' }}
    >
      {/* Start Button */}
      <button
        className={`start-button h-8 flex items-center gap-2 px-2 rounded-sm
          ${showStartMenu ? 'bg-[var(--xp-accent)]' : 'hover:bg-[var(--xp-accent)] hover:opacity-90'}
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
                ${activeWindow === id ? 'bg-[var(--xp-accent)]' : 'hover:bg-[var(--xp-accent)] hover:opacity-90'}
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
      <div className="flex items-center gap-2 h-full bg-gradient-to-r from-[#0F256E] to-[#0F256E] px-2">
        <button
          onClick={() => openWindow('security_center', applications.security_center.defaultSize)}
          title={'SPeeDo Security Center\nSystem protected'}
          className="text-sm leading-none hover:opacity-80"
        >
          🛡️
        </button>
        <button onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'} className="relative">
          <Image
            src="/icons/Volume.png"
            alt="Volume"
            width={24}
            height={24}
            className={`pixelated ${muted ? 'opacity-40' : ''}`}
            draggable={false}
          />
          {muted && (
            <span className="absolute inset-0 flex items-center justify-center text-red-500 text-xs font-bold">
              ×
            </span>
          )}
        </button>
        <span className="text-white text-sm" title={currentDate}>
          {currentTime}
        </span>
      </div>
    </div>
  );
}
