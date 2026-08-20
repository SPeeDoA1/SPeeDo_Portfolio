export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowInstance {
  id: string;
  position: Position;
  size: Size;
  isMaximized: boolean;
  isMinimized: boolean;
}

export interface WindowManagerState {
  windows: Record<string, WindowInstance>;
  order: string[];
  activeId: string | null;
}
