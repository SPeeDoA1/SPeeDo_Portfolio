import type { Position, Size } from '@/types/window';

export const ICON_CELL: Size = { width: 96, height: 90 };
const GRID_START: Position = { x: 16, y: 16 };
const ROWS_PER_COLUMN = 6;

export function getDefaultIconPosition(index: number): Position {
  const col = Math.floor(index / ROWS_PER_COLUMN);
  const row = index % ROWS_PER_COLUMN;
  return {
    x: GRID_START.x + col * ICON_CELL.width,
    y: GRID_START.y + row * ICON_CELL.height,
  };
}
