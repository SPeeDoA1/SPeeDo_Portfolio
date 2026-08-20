import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeId, XPTheme } from '@/types/theme';
import { themes } from '@/data/themes';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';

interface ThemeApi {
  themeId: ThemeId;
  theme: XPTheme;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeApi | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(() =>
    loadFromStorage<ThemeId>(STORAGE_KEYS.theme, 'blue')
  );

  const theme = themes[themeId];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--xp-titlebar-active', theme.titlebarActiveGradient);
    root.style.setProperty('--xp-titlebar-inactive', theme.titlebarInactiveGradient);
    root.style.setProperty('--xp-taskbar-gradient', theme.taskbarGradient);
    root.style.setProperty('--xp-taskbar-border', theme.taskbarBorderColor);
    root.style.setProperty('--xp-start-gradient', theme.startButtonGradient);
    root.style.setProperty('--xp-accent', theme.accentColor);
    root.style.setProperty('--xp-window-border', theme.windowBorderColor);
  }, [theme]);

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
    saveToStorage(STORAGE_KEYS.theme, id);
  };

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
