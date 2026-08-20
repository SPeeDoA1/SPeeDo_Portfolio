"use client"

import React, { useState, useEffect } from 'react';
import { WindowManagerProvider } from '@/context/WindowManagerContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Desktop from './xp/Desktop';
import WindowManager from './xp/WindowManager';
import Taskbar from './xp/Taskbar';
import StartMenu from './xp/StartMenu';
import RunDialog from './xp/RunDialog';
import ShutdownDialog, { type ShutdownAction } from './xp/ShutdownDialog';

type PowerState = 'on' | 'standby' | 'off' | 'restarting';
type BootPhase = 'unknown' | 'booting' | 'ready';

const BOOT_KEY = 'xp-portfolio:has-booted';

export default function Portfolio() {
  const [showStartMenu, setShowStartMenu] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showRunDialog, setShowRunDialog] = useState<boolean>(false);
  const [showShutdownDialog, setShowShutdownDialog] = useState<boolean>(false);
  const [powerState, setPowerState] = useState<PowerState>('on');
  const [bootPhase, setBootPhase] = useState<BootPhase>('unknown');

  useEffect(() => {
    let alreadyBooted = false;
    try {
      alreadyBooted = Boolean(sessionStorage.getItem(BOOT_KEY));
    } catch {
      alreadyBooted = true;
    }
    if (alreadyBooted) {
      setBootPhase('ready');
      return;
    }
    setBootPhase('booting');
    const timeout = setTimeout(() => {
      try {
        sessionStorage.setItem(BOOT_KEY, '1');
      } catch {
        // private browsing / storage disabled — booting once per tab is best-effort
      }
      setBootPhase('ready');
    }, 1300);
    return () => clearTimeout(timeout);
  }, []);

  const skipBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1');
    } catch {
      // ignore
    }
    setBootPhase('ready');
  };

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

  useEffect(() => {
    if (powerState !== 'restarting') return;
    const timeout = setTimeout(() => setPowerState('on'), 1400);
    return () => clearTimeout(timeout);
  }, [powerState]);

  const handleShutdownSelect = (action: ShutdownAction) => {
    setShowShutdownDialog(false);
    if (action === 'standby') setPowerState('standby');
    if (action === 'turnoff') setPowerState('off');
    if (action === 'restart') setPowerState('restarting');
  };

  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <div className="fixed inset-0 overflow-hidden">
          <Desktop />
          <WindowManager />
          <Taskbar
            showStartMenu={showStartMenu}
            onToggleStartMenu={() => setShowStartMenu((prev) => !prev)}
            currentTime={currentTime}
          />
          {showStartMenu && (
            <StartMenu
              onItemSelected={() => setShowStartMenu(false)}
              onOpenRun={() => setShowRunDialog(true)}
              onShutDown={() => setShowShutdownDialog(true)}
            />
          )}
          {showRunDialog && <RunDialog onClose={() => setShowRunDialog(false)} />}
          {showShutdownDialog && (
            <ShutdownDialog onClose={() => setShowShutdownDialog(false)} onSelect={handleShutdownSelect} />
          )}
          {powerState === 'standby' && (
            <div
              className="fixed inset-0 z-[300] bg-black/70 flex items-center justify-center cursor-pointer"
              onClick={() => setPowerState('on')}
            >
              <p className="text-white text-sm">Click to wake this computer.</p>
            </div>
          )}
          {powerState === 'off' && (
            <div
              className="fixed inset-0 z-[300] bg-black flex items-center justify-center cursor-pointer"
              onClick={() => setPowerState('on')}
            >
              <p className="text-white text-lg">It is now safe to close this portfolio.</p>
            </div>
          )}
          {powerState === 'restarting' && (
            <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center gap-3">
              <p className="text-white text-lg font-bold">SPeeDo XP</p>
              <p className="text-gray-400 text-xs">Restarting...</p>
            </div>
          )}
        </div>
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
