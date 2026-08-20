import type { XPTheme, ThemeId } from '@/types/theme';

export const themes: Record<ThemeId, XPTheme> = {
  blue: {
    id: 'blue',
    name: 'Windows XP',
    titlebarActiveGradient: 'linear-gradient(to right, #1E5799, #2989D8, #1E5799)',
    titlebarInactiveGradient: 'linear-gradient(to right, #969696, #ADADAD, #969696)',
    taskbarGradient: 'linear-gradient(to right, #1E5799, #2989D8)',
    taskbarBorderColor: '#2573BC',
    startButtonGradient: 'linear-gradient(to bottom, #4C9A2A, #2D6A0F)',
    accentColor: '#2573BC',
    windowBorderColor: '#1E5799',
  },
  silver: {
    id: 'silver',
    name: 'Windows XP Silver',
    titlebarActiveGradient: 'linear-gradient(to right, #6D6D6D, #ABABAB, #6D6D6D)',
    titlebarInactiveGradient: 'linear-gradient(to right, #A9A9A9, #C6C6C6, #A9A9A9)',
    taskbarGradient: 'linear-gradient(to right, #7C7C7C, #ABABAB)',
    taskbarBorderColor: '#8C8C8C',
    startButtonGradient: 'linear-gradient(to bottom, #8C8C8C, #5A5A5A)',
    accentColor: '#8C8C8C',
    windowBorderColor: '#71708D',
  },
  olive: {
    id: 'olive',
    name: 'Windows XP Olive Green',
    titlebarActiveGradient: 'linear-gradient(to right, #6B7A3A, #98A857, #6B7A3A)',
    titlebarInactiveGradient: 'linear-gradient(to right, #A0A585, #C2C7A8, #A0A585)',
    taskbarGradient: 'linear-gradient(to right, #808A4E, #A6AD73)',
    taskbarBorderColor: '#7E8752',
    startButtonGradient: 'linear-gradient(to bottom, #8FA050, #5F6E2E)',
    accentColor: '#7E8752',
    windowBorderColor: '#586B36',
  },
  classic: {
    id: 'classic',
    name: 'Windows Classic',
    titlebarActiveGradient: 'linear-gradient(to right, #000080, #1084D0)',
    titlebarInactiveGradient: 'linear-gradient(to right, #808080, #808080)',
    taskbarGradient: 'linear-gradient(to right, #C0C0C0, #C0C0C0)',
    taskbarBorderColor: '#808080',
    startButtonGradient: 'linear-gradient(to bottom, #C0C0C0, #C0C0C0)',
    accentColor: '#000080',
    windowBorderColor: '#0A0A6E',
  },
};

export const themeList: XPTheme[] = Object.values(themes);
