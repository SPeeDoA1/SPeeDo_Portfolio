import { useEffect } from 'react';
import { useWindowManager } from '@/context/WindowManagerContext';

export default function KeyboardShortcuts() {
  const { activeWindow, closeWindow } = useWindowManager();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'F4' && activeWindow) {
        e.preventDefault();
        closeWindow(activeWindow);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindow, closeWindow]);

  return null;
}
