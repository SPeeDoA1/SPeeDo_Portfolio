import React, { createContext, useContext } from 'react';
import { useWindowManagerState, type WindowManagerApi } from '@/hooks/useWindowManager';

const WindowManagerContext = createContext<WindowManagerApi | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const manager = useWindowManagerState();
  return (
    <WindowManagerContext.Provider value={manager}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerApi {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return ctx;
}
