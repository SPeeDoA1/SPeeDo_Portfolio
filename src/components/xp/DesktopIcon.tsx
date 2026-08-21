import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Position } from '@/types/window';
import { snapToIconGrid } from '@/lib/desktopLayout';

interface DesktopIconProps {
  title: string;
  iconSrc: string;
  position: Position;
  onPositionChange: (position: Position) => void;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export default function DesktopIcon({
  title,
  iconSrc,
  position,
  onPositionChange,
  isSelected,
  onSelect,
  onOpen,
  onContextMenu,
}: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const latestPositionRef = useRef<Position>(position);

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    onSelect();
    movedRef.current = false;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    setIsDragging(true);
  };

  const onDrag = useCallback(
    (e: PointerEvent) => {
      movedRef.current = true;
      const newX = Math.max(0, e.clientX - dragOffset.current.x);
      const newY = Math.max(0, e.clientY - dragOffset.current.y - 40);
      const next = { x: newX, y: Math.max(0, newY) };
      latestPositionRef.current = next;
      onPositionChange(next);
    },
    [onPositionChange]
  );

  const stopDrag = useCallback(() => {
    setIsDragging(false);
    if (movedRef.current) {
      onPositionChange(snapToIconGrid(latestPositionRef.current));
    }
  }, [onPositionChange]);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', stopDrag);
    return () => {
      window.removeEventListener('pointermove', onDrag);
      window.removeEventListener('pointerup', stopDrag);
    };
  }, [isDragging, onDrag, stopDrag]);

  return (
    <button
      style={{ position: 'absolute', left: position.x, top: position.y }}
      className={`flex flex-col items-center gap-1 p-2 rounded w-24 group transition-colors touch-none ${
        isSelected ? 'bg-blue-500/40 outline outline-1 outline-dashed outline-white/80' : 'hover:bg-white/10'
      }`}
      onPointerDown={startDrag}
      onClick={(e) => {
        if (movedRef.current) {
          e.preventDefault();
          return;
        }
        onSelect();
      }}
      onDoubleClick={onOpen}
      onContextMenu={(e) => {
        e.preventDefault();
        onSelect();
        onContextMenu(e);
      }}
    >
      <Image
        src={iconSrc}
        alt={title}
        width={48}
        height={48}
        className="w-12 h-12 pixelated group-hover:scale-105 transition-transform"
        draggable={false}
      />
      <span className="text-white text-sm font-semibold text-shadow text-center">{title}</span>
    </button>
  );
}
