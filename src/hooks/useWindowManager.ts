import { useState } from 'react';
import type { Position } from '@/types/window';
import { getCascadePosition } from '@/lib/windowLayout';

export interface WindowManagerApi {
  openWindows: string[];
  activeWindow: string | null;
  windowPositions: Record<string, Position>;
  isMaximized: Record<string, boolean>;
  minimizedWindows: string[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  setWindowMaximized: (id: string, value: boolean) => void;
  moveWindow: (id: string, position: Position) => void;
}

export function useWindowManagerState(): WindowManagerApi {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowPositions, setWindowPositions] = useState<Record<string, Position>>({});
  const [isMaximized, setIsMaximized] = useState<Record<string, boolean>>({});
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
      setWindowPositions({
        ...windowPositions,
        [id]: getCascadePosition(openWindows.length),
      });
    }
    setActiveWindow(id);
    setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows([...minimizedWindows, id]);
    if (activeWindow === id) setActiveWindow(null);
  };

  const restoreWindow = (id: string) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(minimizedWindows.filter((w) => w !== id));
    }
    setActiveWindow(id);
  };

  const toggleMaximizeWindow = (id: string) => {
    setIsMaximized({ ...isMaximized, [id]: !isMaximized[id] });
  };

  const setWindowMaximized = (id: string, value: boolean) => {
    setIsMaximized({ ...isMaximized, [id]: value });
  };

  const moveWindow = (id: string, position: Position) => {
    setWindowPositions({ ...windowPositions, [id]: position });
  };

  return {
    openWindows,
    activeWindow,
    windowPositions,
    isMaximized,
    minimizedWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximizeWindow,
    setWindowMaximized,
    moveWindow,
  };
}
