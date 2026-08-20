"use client"

import React, { useState, useEffect } from 'react';
import { WindowManagerProvider } from '@/context/WindowManagerContext';
import Desktop from './xp/Desktop';
import WindowManager from './xp/WindowManager';
import Taskbar from './xp/Taskbar';
import StartMenu from './xp/StartMenu';

export default function Portfolio() {
  const [showStartMenu, setShowStartMenu] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (showStartMenu &&
          !target.closest('.start-button') &&
          !target.closest('.start-menu')) {
        setShowStartMenu(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [showStartMenu]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <WindowManagerProvider>
      <div className="fixed inset-0 overflow-hidden">
        <Desktop />
        <WindowManager />
        <Taskbar
          showStartMenu={showStartMenu}
          onToggleStartMenu={() => setShowStartMenu((prev) => !prev)}
          currentTime={currentTime}
        />
        {showStartMenu && <StartMenu onItemSelected={() => setShowStartMenu(false)} />}
      </div>
    </WindowManagerProvider>
  );
}
