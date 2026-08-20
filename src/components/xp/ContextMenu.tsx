import { useEffect } from 'react';

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  useEffect(() => {
    const handleOutside = () => onClose();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const left = Math.min(x, typeof window !== 'undefined' ? window.innerWidth - 200 : x);
  const top = Math.min(y, typeof window !== 'undefined' ? window.innerHeight - items.length * 28 - 40 : y);

  return (
    <div
      className="fixed z-[180] bg-[#F1F1F1] border border-gray-400 shadow-lg py-1 min-w-[180px] text-sm"
      style={{ left, top }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item.separator ? (
          <div key={i} className="border-t border-gray-300 my-1" />
        ) : (
          <button
            key={i}
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              item.onClick?.();
              onClose();
            }}
            className={`w-full text-left px-4 py-1 ${
              item.disabled ? 'text-gray-400 cursor-default' : 'hover:bg-[var(--xp-accent)] hover:text-white'
            }`}
          >
            {item.label}
          </button>
        )
      )}
    </div>
  );
}
