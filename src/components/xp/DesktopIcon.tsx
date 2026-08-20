import React from 'react';
import Image from 'next/image';

interface DesktopIconProps {
  title: string;
  iconSrc: string;
  onOpen: () => void;
  onOpenMaximized: () => void;
}

export default function DesktopIcon({ title, iconSrc, onOpen, onOpenMaximized }: DesktopIconProps) {
  return (
    <button
      className="flex flex-col items-center gap-2 p-3 rounded-lg
                 hover:bg-white/10 active:bg-blue-500/30 group transition-colors
                 w-24"
      onClick={onOpen}
      onDoubleClick={onOpenMaximized}
    >
      <Image
        src={iconSrc}
        alt={title}
        width={48}
        height={48}
        className="w-12 h-12 pixelated group-hover:scale-105 transition-transform"
        draggable={false}
      />
      <span className="text-white text-sm font-semibold text-shadow text-center">
        {title}
      </span>
    </button>
  );
}
