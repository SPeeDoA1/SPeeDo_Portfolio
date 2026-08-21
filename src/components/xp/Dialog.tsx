import { useEffect } from 'react';
import { playError, playNotify, playQuestion, playWarning } from '@/lib/sound';

interface DialogProps {
  title: string;
  message: string;
  variant?: 'info' | 'warning' | 'error' | 'question';
  onClose: () => void;
  confirmLabel?: string;
  onConfirm?: () => void;
  cancelLabel?: string;
}

const ICONS: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '⛔',
  question: '❓',
};

export default function Dialog({
  title,
  message,
  variant = 'info',
  onClose,
  confirmLabel = 'OK',
  onConfirm,
  cancelLabel = 'Cancel',
}: DialogProps) {
  useEffect(() => {
    if (variant === 'error') playError();
    else if (variant === 'warning') playWarning();
    else if (variant === 'question') playQuestion();
    else playNotify();
  }, [variant]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20"
      onMouseDown={onClose}
    >
      <div
        className="window-border bg-[#ECE9D8] w-80 animate-window-open"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="h-7 px-2 flex items-center text-white text-sm font-bold rounded-t-lg"
          style={{ background: 'var(--xp-titlebar-active)' }}
        >
          {title}
        </div>
        <div className="p-4 flex items-start gap-3">
          <span className="text-2xl leading-none">{ICONS[variant]}</span>
          <p className="text-sm flex-1 whitespace-pre-line">{message}</p>
        </div>
        <div className="flex justify-end gap-2 p-3 pt-0">
          {onConfirm && (
            <button onClick={onClose} className="xp-button px-4 py-1 text-sm rounded-sm">
              {cancelLabel}
            </button>
          )}
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className="xp-button px-4 py-1 text-sm rounded-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
