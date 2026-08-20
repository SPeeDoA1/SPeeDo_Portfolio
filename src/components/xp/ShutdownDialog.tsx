import Image from 'next/image';

export type ShutdownAction = 'standby' | 'turnoff' | 'restart';

interface ShutdownDialogProps {
  onClose: () => void;
  onSelect: (action: ShutdownAction) => void;
}

const OPTIONS: { id: ShutdownAction; label: string; icon: string }[] = [
  { id: 'standby', label: 'Stand By', icon: '/icons/Minimize.png' },
  { id: 'turnoff', label: 'Turn Off', icon: '/icons/shutdown.png' },
  { id: 'restart', label: 'Restart', icon: '/icons/recent.png' },
];

export default function ShutdownDialog({ onClose, onSelect }: ShutdownDialogProps) {
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/40" onMouseDown={onClose}>
      <div
        className="window-border bg-[#ECE9D8] w-[420px] animate-window-open"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="h-7 px-2 flex items-center text-white text-sm font-bold rounded-t-lg"
          style={{ background: 'var(--xp-titlebar-active)' }}
        >
          Turn off computer
        </div>
        <div className="p-6 flex items-center justify-center gap-8">
          {OPTIONS.map((opt) => (
            <button key={opt.id} onClick={() => onSelect(opt.id)} className="flex flex-col items-center gap-2 group">
              <span className="w-16 h-16 flex items-center justify-center rounded bg-white border border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50">
                <Image src={opt.icon} alt="" width={32} height={32} className="pixelated" draggable={false} />
              </span>
              <span className="text-xs">{opt.label}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-end p-3 pt-0">
          <button onClick={onClose} className="xp-button px-4 py-1 text-xs rounded-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
