import { useEffect, useMemo, useReducer, useState } from 'react';
import type { Position, Size, WindowInstance, WindowManagerState } from '@/types/window';
import { getCascadePosition, clampToViewport } from '@/lib/windowLayout';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';

const DEFAULT_SIZE: Size = { width: 600, height: 400 };
const PERSIST_DEBOUNCE_MS = 400;

type Action =
  | { type: 'OPEN'; id: string; size?: Size; maximized?: boolean; initialPosition?: Position }
  | { type: 'CLOSE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'RESTORE'; id: string }
  | { type: 'TOGGLE_MAXIMIZE'; id: string }
  | { type: 'MOVE'; id: string; position: Position }
  | { type: 'RESIZE'; id: string; size: Size }
  | { type: 'REPOSITION_ALL'; viewport: Size };

const initialState: WindowManagerState = {
  windows: {},
  order: [],
  activeId: null,
};

function bringToFront(order: string[], id: string): string[] {
  if (order[order.length - 1] === id) return order;
  return [...order.filter((existing) => existing !== id), id];
}

function reducer(state: WindowManagerState, action: Action): WindowManagerState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows[action.id];
      if (existing) {
        return {
          ...state,
          windows: {
            ...state.windows,
            [action.id]: {
              ...existing,
              isMinimized: false,
              isMaximized: action.maximized ?? existing.isMaximized,
            },
          },
          order: bringToFront(state.order, action.id),
          activeId: action.id,
        };
      }
      const newInstance: WindowInstance = {
        id: action.id,
        position: action.initialPosition ?? getCascadePosition(state.order.length),
        size: action.size ?? DEFAULT_SIZE,
        isMaximized: !!action.maximized,
        isMinimized: false,
      };
      return {
        ...state,
        windows: { ...state.windows, [action.id]: newInstance },
        order: [...state.order, action.id],
        activeId: action.id,
      };
    }
    case 'CLOSE': {
      if (!state.order.includes(action.id)) return state;
      return {
        ...state,
        order: state.order.filter((id) => id !== action.id),
        activeId: state.activeId === action.id ? null : state.activeId,
      };
    }
    case 'FOCUS': {
      if (!state.windows[action.id]) return state;
      if (state.activeId === action.id && state.order[state.order.length - 1] === action.id) {
        return state;
      }
      return { ...state, order: bringToFront(state.order, action.id), activeId: action.id };
    }
    case 'MINIMIZE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...existing, isMinimized: true } },
        activeId: state.activeId === action.id ? null : state.activeId,
      };
    }
    case 'RESTORE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...existing, isMinimized: false } },
        order: bringToFront(state.order, action.id),
        activeId: action.id,
      };
    }
    case 'TOGGLE_MAXIMIZE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return {
        ...state,
        windows: { ...state.windows, [action.id]: { ...existing, isMaximized: !existing.isMaximized } },
      };
    }
    case 'MOVE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return { ...state, windows: { ...state.windows, [action.id]: { ...existing, position: action.position } } };
    }
    case 'RESIZE': {
      const existing = state.windows[action.id];
      if (!existing) return state;
      return { ...state, windows: { ...state.windows, [action.id]: { ...existing, size: action.size } } };
    }
    case 'REPOSITION_ALL': {
      let changed = false;
      const windows = { ...state.windows };
      for (const id of state.order) {
        const w = windows[id];
        if (!w || w.isMinimized || w.isMaximized) continue;
        const clamped = clampToViewport(w.position, w.size, action.viewport);
        if (clamped.x !== w.position.x || clamped.y !== w.position.y) {
          windows[id] = { ...w, position: clamped };
          changed = true;
        }
      }
      return changed ? { ...state, windows } : state;
    }
    default:
      return state;
  }
}

export interface WindowManagerApi {
  openWindows: string[];
  activeWindow: string | null;
  windowPositions: Record<string, Position>;
  windowSizes: Record<string, Size>;
  isMaximized: Record<string, boolean>;
  minimizedWindows: string[];
  recentIds: string[];
  openWindow: (id: string, defaultSize?: Size, opts?: { maximized?: boolean }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  moveWindow: (id: string, position: Position) => void;
  resizeWindow: (id: string, size: Size) => void;
}

export function useWindowManagerState(): WindowManagerApi {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [savedPositions] = useState<Record<string, Position>>(() =>
    loadFromStorage(STORAGE_KEYS.windowPositions, {})
  );
  const [recentIds, setRecentIds] = useState<string[]>(() => loadFromStorage(STORAGE_KEYS.recentApps, []));

  const openWindow: WindowManagerApi['openWindow'] = (id, defaultSize, opts) => {
    dispatch({
      type: 'OPEN',
      id,
      size: defaultSize,
      maximized: opts?.maximized,
      initialPosition: savedPositions[id],
    });
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((existing) => existing !== id)].slice(0, 5);
      saveToStorage(STORAGE_KEYS.recentApps, next);
      return next;
    });
  };

  const closeWindow = (id: string) => dispatch({ type: 'CLOSE', id });
  const minimizeWindow = (id: string) => dispatch({ type: 'MINIMIZE', id });
  const restoreWindow = (id: string) => dispatch({ type: 'RESTORE', id });
  const focusWindow = (id: string) => dispatch({ type: 'FOCUS', id });
  const toggleMaximizeWindow = (id: string) => dispatch({ type: 'TOGGLE_MAXIMIZE', id });
  const moveWindow = (id: string, position: Position) => dispatch({ type: 'MOVE', id, position });
  const resizeWindow = (id: string, size: Size) => dispatch({ type: 'RESIZE', id, size });

  // Viewport-resize safety net: keep every open window reachable.
  useEffect(() => {
    let frame = 0;
    const handleResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        dispatch({
          type: 'REPOSITION_ALL',
          viewport: { width: window.innerWidth, height: window.innerHeight },
        });
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Debounced position persistence, merged with previously-closed windows' saved spots.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const previous = loadFromStorage<Record<string, Position>>(STORAGE_KEYS.windowPositions, {});
      const merged = { ...previous };
      for (const id of state.order) {
        const w = state.windows[id];
        if (w) merged[id] = w.position;
      }
      saveToStorage(STORAGE_KEYS.windowPositions, merged);
    }, PERSIST_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [state.order, state.windows]);

  const windowPositions = useMemo(() => {
    const result: Record<string, Position> = {};
    for (const id of state.order) {
      const w = state.windows[id];
      if (w) result[id] = w.position;
    }
    return result;
  }, [state.order, state.windows]);

  const windowSizes = useMemo(() => {
    const result: Record<string, Size> = {};
    for (const id of state.order) {
      const w = state.windows[id];
      if (w) result[id] = w.size;
    }
    return result;
  }, [state.order, state.windows]);

  const isMaximized = useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const id of state.order) {
      const w = state.windows[id];
      if (w) result[id] = w.isMaximized;
    }
    return result;
  }, [state.order, state.windows]);

  const minimizedWindows = useMemo(
    () => state.order.filter((id) => state.windows[id]?.isMinimized),
    [state.order, state.windows]
  );

  return {
    openWindows: state.order,
    activeWindow: state.activeId,
    windowPositions,
    windowSizes,
    isMaximized,
    minimizedWindows,
    recentIds,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    toggleMaximizeWindow,
    moveWindow,
    resizeWindow,
  };
}
