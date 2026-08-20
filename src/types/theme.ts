export type ThemeId = 'blue' | 'silver' | 'olive' | 'classic';

export interface XPTheme {
  id: ThemeId;
  name: string;
  titlebarActiveGradient: string;
  titlebarInactiveGradient: string;
  taskbarGradient: string;
  taskbarBorderColor: string;
  startButtonGradient: string;
  accentColor: string;
  windowBorderColor: string;
}
