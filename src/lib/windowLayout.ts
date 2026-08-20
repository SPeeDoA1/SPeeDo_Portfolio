import type { Position, Size } from '@/types/window';

const TASKBAR_HEIGHT = 40;
const CASCADE_STEP = 30;
const CASCADE_WRAP = 8;
const CASCADE_BASE = 50;

export function getCascadePosition(openCount: number): Position {
  const offset = (openCount % CASCADE_WRAP) * CASCADE_STEP;
  return { x: CASCADE_BASE + offset, y: CASCADE_BASE + offset };
}

export function clampToViewport(
  position: Position,
  size: Size,
  viewport: Size,
  taskbarHeight: number = TASKBAR_HEIGHT
): Position {
  const maxX = Math.max(0, viewport.width - size.width);
  const maxY = Math.max(0, viewport.height - taskbarHeight - size.height);
  return {
    x: Math.min(Math.max(0, position.x), maxX),
    y: Math.min(Math.max(0, position.y), maxY),
  };
}
