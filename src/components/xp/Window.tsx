import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import type { Position, Size } from '@/types/window';

interface WindowProps {
  title: string;
  isActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onMinimize: () => void;
  onMaximize: () => void;
  position: Position;
  onPositionChange: (position: Position) => void;
  isMaximized: boolean;
  icon: string;
  defaultSize?: Size;
}

export default function Window({
  title,
  isActive,
  onClose,
  children,
  onMinimize,
  onMaximize,
  position,
  onPositionChange,
  isMaximized,
  icon,
  defaultSize = { width: 600, height: 400 },
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>(defaultSize);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const handleTitleBarClick = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      onMaximize();
    }
    setLastClickTime(currentTime);
  };

  const startDrag = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if (e.target instanceof Element && e.target.closest('.window-controls')) return;

    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const onDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || isMaximized) return;

    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height - 40));

    onPositionChange({ x: newX, y: newY });
  }, [isDragging, isMaximized, dragOffset.x, dragOffset.y, size.width, size.height, onPositionChange]);

  const onResize = useCallback((e: MouseEvent) => {
    if (!isResizing || isMaximized || !windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    let newWidth = size.width;
    let newHeight = size.height;

    if (resizeDirection?.includes('e')) {
      newWidth = Math.max(300, Math.min(e.clientX - rect.left, window.innerWidth - rect.left));
    }
    if (resizeDirection?.includes('s')) {
      newHeight = Math.max(200, Math.min(e.clientY - rect.top, window.innerHeight - rect.top - 40));
    }

    setSize({
      width: newWidth,
      height: newHeight,
    });
  }, [isResizing, isMaximized, resizeDirection, size.width, size.height]);

  const stopResize = useCallback(() => {
    setIsResizing(false);
    setResizeDirection(null);
  }, []);
  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const startResize = useCallback((e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  }, [isMaximized]);

  useEffect(() => {
    if (isDragging || isResizing) {
      const handleMouseMove = isDragging ? onDrag : onResize;
      const handleMouseUp = isDragging ? stopDrag : stopResize;

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, onDrag, onResize, stopDrag, stopResize]);

  const handleMinimize = () => {
    const element = windowRef.current;
    if (!element) return;

    element.classList.add('minimize-window');
    setTimeout(() => {
      onMinimize();
      element.classList.remove('minimize-window');
    }, 200);
  };

  return (
    <div
      ref={windowRef}
      className={`
        absolute animate-window-open window-border
        ${isMaximized ? 'inset-0' : ''}
        ${isDragging ? 'cursor-grabbing' : ''}
        ${isActive ? '' : 'opacity-90'}
        transition-opacity duration-200
      `}
      style={isMaximized ? {} : {
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
      }}
    >
      {/* Title Bar */}
      <div
        className={`
          h-8 px-2 flex items-center justify-between cursor-grab
          ${isActive
            ? 'bg-gradient-to-r from-[#1E5799] via-[#2989D8] to-[#1E5799]'
            : 'bg-gradient-to-r from-[#969696] via-[#ADADAD] to-[#969696]'}
          rounded-t-lg select-none
        `}
        onMouseDown={startDrag}
        onClick={handleTitleBarClick}
      >
        <div className="flex items-center gap-2">
          <Image src={icon} alt={`${title} icon`} width={16} height={16} className="pixelated" />
          <span className="text-white text-sm font-bold">{title}</span>
        </div>
        <div className="flex gap-[1px] window-controls">
          <button
            onClick={handleMinimize}
            className="w-[22px] h-[22px] flex items-center justify-center bg-[#D1D1D1] hover:bg-[#E5E5E5] active:bg-[#CCCCCC] border border-[#FFFFFF99] rounded-sm"
          >
            <Image src="/icons/Minimize.png" alt="Minimize" width={22} height={22} className="w-full h-full" draggable={false} />
          </button>
          <button
            onClick={onMaximize}
            className="w-[22px] h-[22px] flex items-center justify-center bg-[#D1D1D1] hover:bg-[#E5E5E5] active:bg-[#CCCCCC] border border-[#FFFFFF99] rounded-sm"
          >
            <Image src="/icons/Maximize.png" alt="Maximize" width={22} height={22} className="w-full h-full" draggable={false} />
          </button>
          <button
            onClick={onClose}
            className="w-[22px] h-[22px] flex items-center justify-center bg-[#E81123] hover:bg-[#F65B69] active:bg-[#C13033] border border-[#FFFFFF99] rounded-sm"
          >
            <Image src="/icons/Exit.png" alt="Close" width={22} height={22} className="w-full h-full" draggable={false} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="h-6 bg-[#ECE9D8] border-b border-[#ACA899] px-2 flex items-center select-none">
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">File</span>
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">Edit</span>
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">View</span>
        <span className="text-sm text-[#444444] hover:underline cursor-default px-2">Help</span>
      </div>

      {/* Content */}
      <div className="bg-[#FFFFFF] flex-1 overflow-auto win-select">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => startResize(e, 'se')}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
            onMouseDown={(e) => startResize(e, 's')}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize"
            onMouseDown={(e) => startResize(e, 'e')}
          />
        </>
      )}
    </div>
  );
}
