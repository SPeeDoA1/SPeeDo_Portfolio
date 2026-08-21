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

// Real Windows XP snaps a dropped icon to the nearest invisible grid cell
// instead of leaving it at a free pixel position.
export function snapToIconGrid(position: Position): Position {
  const col = Math.round((position.x - GRID_START.x) / ICON_CELL.width);
  const row = Math.round((position.y - GRID_START.y) / ICON_CELL.height);
  return {
    x: GRID_START.x + Math.max(0, col) * ICON_CELL.width,
    y: GRID_START.y + Math.max(0, row) * ICON_CELL.height,
  };
}
